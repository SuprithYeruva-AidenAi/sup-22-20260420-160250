import { useNavigate } from 'react-router-dom'

const UOI_LOGO = 'https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PSA09KnD8BDeEeZZ6cI~VtwcDg22Moj9P1AO5xeTXiY2OJx-KvohRLWP4pKNn82Yr9ydUl6NcjVgbc1hOwTD-Rywd-d1OnxemrSTgf0-pXlYz2parVqr49Sw1Gd3dnsRg-BLI3dWeI-TMa4dM1GVL74lZlH3ygrKx6Pyviq5vT9DPYqXEAmP0yu0I2USnzJAuFiD3vJXUmm2IbHEPc~ku69IKXveWcnCROgUSCdGQACnO4zfr-rq1g5~bkr-vOTF8SXKiVIeC8AwGjYJngONCgc41BfkoJhM1VotERpKTJfol4vxIaO~zccPFywRiKydECQS7nU0gULQlDtMU-VHFw__'
const HERO_IMG = 'https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H00wquIZQgvNNauemHlj5DS3GK9TQAHVTFPNXuJuio2vZU5gpckw6RlTXCJ823SDilRVgzDpfSCNaWJtD71lVVCcPCWD2hlxHiScyTmkLpBPch4FP73XZgwU6SbM3bQ4IF42KFXQhbwlGeNjF0DHI2OAC2QNznkgUIi2EoyN~xUvI89J2yvyDRBfQOhswbKQDpfGT-pJgS5ry6aPd6efpRVieEXts4SodSQFVVr8hWXZnzknSJGqIp~YY08O9D0xFIbL0MtGdRKmWxrMoflt42EistrpuQjVlPlZqC39pSxtEQpDutH7pGmmamaRVcxNzhCxKM91shYxIoZL5khiAw__'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - dashboard content */}
      <div className="w-full md:flex-1 flex flex-col justify-center items-center p-[24px] md:p-[32px] bg-white bg-gradient-to-b from-[#005eb8]/7 to-[#5c55eb]/7">
        <div className="w-full max-w-[800px] bg-white/70 bg-[radial-gradient(circle,_rgba(255,255,255,0.56)_0%,_rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] flex flex-col gap-[32px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-[12px] w-full">
            <img src={UOI_LOGO} alt="UOI Logo" className="w-[100px] h-[50px]" />
            <h1 className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">
              Your Dashboard
            </h1>
            <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">
              Overview of your policies and coverage
            </p>
          </div>

          {/* Policy Coverage Cards */}
          <div className="flex flex-col gap-[16px] w-full">
            <h2 className="text-[20px] font-bold text-[#212121] font-[Noto_Sans]">
              Your Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
              {/* Travel Insurance */}
              <div className="rounded-[12px] border-2 border-blue-300 bg-blue-50 p-[20px] shadow-sm">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-[#212121] font-[Noto_Sans]">
                      Travel Insurance
                    </h3>
                    <span className="px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium font-[Noto_Sans] bg-gray-100 text-gray-700">
                      Not Covered
                    </span>
                  </div>
                  <p className="text-[14px] text-[#6e6e6e] font-[Noto_Sans]">
                    You don&apos;t have an active travel insurance policy.
                  </p>
                  <button className="flex items-center justify-center px-[12px] py-[8px] w-full bg-white border border-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity">
                    <span className="text-[14px] font-medium text-[#005eb8] font-[Noto_Sans]">Get a quote</span>
                  </button>
                </div>
              </div>

              {/* Home Insurance */}
              <div className="rounded-[12px] border-2 border-green-300 bg-[#d8ffe2] p-[20px] shadow-sm">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-[#212121] font-[Noto_Sans]">
                      Home Insurance
                    </h3>
                    <span className="px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium font-[Noto_Sans] bg-green-100 text-green-800">
                      In Force
                    </span>
                  </div>
                  <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
                    <span className="font-medium">Policy No: </span>HM123456789
                  </div>
                  <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
                    <span className="font-medium">From: </span>01/01/2024<span className="mx-1">–</span><span className="font-medium">To: </span>31/12/2024
                  </div>
                </div>
              </div>

              {/* Motor Insurance */}
              <div className="rounded-[12px] border-2 border-orange-300 bg-orange-50 p-[20px] shadow-sm">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-[#212121] font-[Noto_Sans]">
                      Motor Insurance
                    </h3>
                    <span className="px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium font-[Noto_Sans] bg-yellow-100 text-yellow-800">
                      Expired
                    </span>
                  </div>
                  <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
                    <span className="font-medium">Policy No: </span>MO987654321
                  </div>
                  <div className="text-[13px] text-[#6e6e6e] font-[Noto_Sans]">
                    <span className="font-medium">Plate: </span>SBA1234A
                  </div>
                  <button className="flex items-center justify-center px-[12px] py-[8px] w-full bg-white border border-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity">
                    <span className="text-[14px] font-medium text-[#005eb8] font-[Noto_Sans]">Renew policy</span>
                  </button>
                </div>
              </div>

              {/* Personal Accident */}
              <div className="rounded-[12px] border-2 border-purple-300 bg-purple-50 p-[20px] shadow-sm">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-[#212121] font-[Noto_Sans]">
                      Personal Accident
                    </h3>
                    <span className="px-[8px] py-[4px] rounded-[6px] text-[12px] font-medium font-[Noto_Sans] bg-gray-100 text-gray-700">
                      Not Covered
                    </span>
                  </div>
                  <p className="text-[14px] text-[#6e6e6e] font-[Noto_Sans]">
                    You don&apos;t have an active personal accident policy.
                  </p>
                  <button className="flex items-center justify-center px-[12px] py-[8px] w-full bg-white border border-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity">
                    <span className="text-[14px] font-medium text-[#005eb8] font-[Noto_Sans]">Get a quote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-[16px] w-full">
            <button
              onClick={() => navigate('/create-account')}
              className="flex items-center justify-center px-[16px] py-[12px] gap-[10px] w-full h-[42px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white font-[Noto_Sans]">
                Manage Policies
              </span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center px-[16px] py-[12px] gap-[10px] w-full h-[42px] bg-white rounded-[8px] border border-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-[#005eb8] font-[Noto_Sans]">
                View Claims
              </span>
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-col gap-[12px] w-full max-w-[800px] mt-[24px]">
          <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
            Need help?{' '}
            <a href="mailto:help@uoi.com.sg" className="text-[#0d6efd]">
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* Right side - hero image */}
      <div className="hidden md:block md:flex-1">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}