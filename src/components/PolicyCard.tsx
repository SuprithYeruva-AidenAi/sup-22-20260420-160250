import type { PolicyData, ProductCode, TravelSpecific, HomeSpecific, MotorSpecific, PASpecific } from '@/api/mappers/policyMapper'

interface PolicyCardProps {
  productCode: ProductCode
  data: PolicyData | undefined
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

const PRODUCT_LABELS: Record<ProductCode, string> = {
  TR01: 'Travel Insurance',
  HM01: 'Home Insurance',
  MO01: 'Motor Insurance',
  PA01: 'Personal Accident',
}

const CARD_COLORS: Record<ProductCode, string> = {
  TR01: 'bg-blue-50 border-blue-300',
  HM01: 'bg-[#d8ffe2] border-green-300',
  MO01: 'bg-orange-50 border-orange-300',
  PA01: 'bg-purple-50 border-purple-300',
}

function StatusBadge({ status }: { status: PolicyData['status'] }) {
  const styles: Record<PolicyData['status'], string> = {
    'In Force': 'bg-green-100 text-green-800',
    'Expired': 'bg-yellow-100 text-yellow-800',
    'Not Covered': 'bg-gray-100 text-gray-700',
  }
  return (
    <span
      className={`px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium font-[Noto_Sans] ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function ProductSpecificField({
  productCode,
  productSpecific,
}: {
  productCode: ProductCode
  productSpecific: PolicyData['productSpecific']
}) {
  if (!productSpecific) return null

  switch (productCode) {
    case 'TR01': {
      const s = productSpecific as TravelSpecific
      if (!s.tripType) return null
      return (
        <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
          <span className="font-medium">Trip Type: </span>{s.tripType}
        </div>
      )
    }
    case 'HM01': {
      const s = productSpecific as HomeSpecific
      if (!s.insuredAddress) return null
      return (
        <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
          <span className="font-medium">Address: </span>{s.insuredAddress}
        </div>
      )
    }
    case 'MO01': {
      const s = productSpecific as MotorSpecific
      if (!s.vehiclePlateNumber) return null
      return (
        <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
          <span className="font-medium">Plate: </span>{s.vehiclePlateNumber}
        </div>
      )
    }
    case 'PA01': {
      const s = productSpecific as PASpecific
      if (!s.helperName) return null
      return (
        <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
          <span className="font-medium">Insured: </span>{s.helperName}
        </div>
      )
    }
    default:
      return null
  }
}

export default function PolicyCard({
  productCode,
  data,
  isLoading,
  isError,
  refetch,
}: PolicyCardProps) {
  const cardColor = CARD_COLORS[productCode]
  const productLabel = PRODUCT_LABELS[productCode]

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={`rounded-[12px] border-2 p-[20px] shadow-sm ${cardColor} animate-pulse`}>
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <div className="h-[18px] bg-gray-200 rounded w-2/3" />
            <div className="h-[22px] bg-gray-200 rounded w-1/4" />
          </div>
          <div className="h-[14px] bg-gray-200 rounded w-full" />
          <div className="h-[14px] bg-gray-200 rounded w-3/4" />
          <div className="h-[14px] bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="rounded-[12px] border-2 border-red-300 bg-red-50 p-[20px] shadow-sm">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#212121] font-[Noto_Sans]">
              {productLabel}
            </h3>
            <span className="text-[12px] text-[#8d8d8d] font-[Noto_Sans]">{productCode}</span>
          </div>
          <p className="text-[14px] text-[#dc3545] font-[Noto_Sans]">
            Unable to load policy data.
          </p>
          <button
            onClick={() => refetch()}
            className="flex items-center justify-center px-[12px] py-[8px] w-full bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="text-[14px] font-medium text-white font-[Noto_Sans]">Retry</span>
          </button>
        </div>
      </div>
    )
  }

  // Not Covered state
  if (!data || data.status === 'Not Covered') {
    return (
      <div className={`rounded-[12px] border-2 p-[20px] shadow-sm ${cardColor}`}>
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-[#212121] font-[Noto_Sans]">
              {productLabel}
            </h3>
            <StatusBadge status="Not Covered" />
          </div>
          <p className="text-[14px] text-[#6e6e6e] font-[Noto_Sans]">
            You don&apos;t have an active {productLabel.toLowerCase()} policy.
          </p>
          <button
            onClick={() => {}}
            className="flex items-center justify-center px-[12px] py-[8px] w-full bg-white border border-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="text-[14px] font-medium text-[#005eb8] font-[Noto_Sans]">Get a quote</span>
          </button>
        </div>
      </div>
    )
  }

  // Success state
  return (
    <div className={`rounded-[12px] border-2 p-[20px] shadow-sm ${cardColor}`}>
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-[#212121] font-[Noto_Sans]">
            {data.planName ?? productLabel}
          </h3>
          <StatusBadge status={data.status} />
        </div>

        {data.policyNumber && (
          <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
            <span className="font-medium">Policy No: </span>{data.policyNumber}
          </div>
        )}

        {data.customerName && (
          <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
            <span className="font-medium">Insured: </span>{data.customerName}
          </div>
        )}

        {(data.startDate || data.expiryDate) && (
          <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
            {data.startDate && (
              <span><span className="font-medium">From: </span>{data.startDate}</span>
            )}
            {data.startDate && data.expiryDate && <span className="mx-1">–</span>}
            {data.expiryDate && (
              <span><span className="font-medium">To: </span>{data.expiryDate}</span>
            )}
          </div>
        )}

        <ProductSpecificField
          productCode={productCode}
          productSpecific={data.productSpecific}
        />
      </div>
    </div>
  )
}
