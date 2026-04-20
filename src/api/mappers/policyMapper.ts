export type ProductCode = 'TR01' | 'HM01' | 'MO01' | 'PA01'

export interface PolicyData {
  policyNumber: string | null
  planName: string | null
  planCode: string | null
  startDate: string | null
  expiryDate: string | null
  statusLabel: string | null
  customerName: string | null
  status: 'In Force' | 'Expired' | 'Not Covered'
  productSpecific: TravelSpecific | HomeSpecific | MotorSpecific | PASpecific | null
}

export interface TravelSpecific {
  tripType: string | null
}

export interface HomeSpecific {
  insuredAddress: string | null
}

export interface MotorSpecific {
  vehiclePlateNumber: string | null
}

export interface PASpecific {
  helperName: string | null
}

// Raw record shape (unknown fields come from API)
export interface RawPolicyRecord {
  PolicyNo?: string | null
  ProductName?: string | null
  PlanCode?: string | null
  EffectiveDate?: string | null
  ExpiryDate?: string | null
  PolicyStatus?: number | null
  PolicyStatus_CodeDesc?: string | null
  PolicyCustomerList?: Array<{ CustomerName?: string | null }> | null
  PolicyLobList?: Array<{
    PolicyRiskList?: Array<{
      LocAdd?: string | null
      BizUniqueNo?: string | null
      PAInsuredList?: Array<{ Name?: string | null }> | null
    }> | null
  }> | null
  PolicyType_CodeDesc?: string | null
}

export function deriveStatus(
  rawRecords: RawPolicyRecord[]
): 'In Force' | 'Expired' | 'Not Covered' {
  if (!rawRecords || rawRecords.length === 0) return 'Not Covered'

  const activeRecord = rawRecords.find((r) => r.PolicyStatus === 2)
  const record = activeRecord ?? rawRecords[0]

  if (!record) return 'Not Covered'

  const statusDesc = record.PolicyStatus_CodeDesc?.toLowerCase() ?? ''
  if (record.PolicyStatus === 2 || statusDesc.includes('in force') || statusDesc.includes('active')) {
    return 'In Force'
  }
  if (statusDesc.includes('expir')) {
    return 'Expired'
  }
  return 'Not Covered'
}

function buildProductSpecific(
  record: RawPolicyRecord,
  productCode: ProductCode
): TravelSpecific | HomeSpecific | MotorSpecific | PASpecific | null {
  switch (productCode) {
    case 'TR01':
      return { tripType: record.PolicyType_CodeDesc ?? null }
    case 'HM01':
      return {
        insuredAddress:
          record.PolicyLobList?.[0]?.PolicyRiskList?.[0]?.LocAdd ?? null,
      }
    case 'MO01':
      return {
        vehiclePlateNumber:
          record.PolicyLobList?.[0]?.PolicyRiskList?.[0]?.BizUniqueNo ?? null,
      }
    case 'PA01':
      return {
        helperName:
          record.PolicyLobList?.[0]?.PolicyRiskList?.[0]?.PAInsuredList?.[0]?.Name ?? null,
      }
    default:
      return null
  }
}

export function mapPolicyResponse(
  rawRecords: RawPolicyRecord[],
  productCode: ProductCode
): PolicyData {
  if (!rawRecords || rawRecords.length === 0) {
    return {
      policyNumber: null,
      planName: null,
      planCode: null,
      startDate: null,
      expiryDate: null,
      statusLabel: null,
      customerName: null,
      status: 'Not Covered',
      productSpecific: null,
    }
  }

  const record = rawRecords.find((r) => r.PolicyStatus === 2) ?? rawRecords[0]

  return {
    policyNumber: record.PolicyNo ?? null,
    planName: record.ProductName ?? null,
    planCode: record.PlanCode ?? null,
    startDate: record.EffectiveDate ?? null,
    expiryDate: record.ExpiryDate ?? null,
    statusLabel: record.PolicyStatus_CodeDesc ?? null,
    customerName: record.PolicyCustomerList?.[0]?.CustomerName ?? null,
    status: deriveStatus(rawRecords),
    productSpecific: buildProductSpecific(record, productCode),
  }
}
