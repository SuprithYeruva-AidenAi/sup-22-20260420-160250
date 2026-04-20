import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'

export default function CreateAccount() {
  const navigate = useNavigate()
  const [nric, setNric] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate account creation
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - create account form */}
      <div className="w-full md:flex-1 flex flex-col justify-center items-center p-[24px] md:p-[32px] bg-white bg-gradient-to-b from-[#005eb8]/7 to-[#5c55eb]/7">
        <div className="w-full max-w-[420px] bg-white/70 bg-[radial-gradient(circle,_rgba(255,255,255,0.56)_0%,_rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] flex flex-col gap-[32px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-[12px] w-full">
            <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PSA09KnD8BDeEeZZ6cI~VtwcDg22Moj9P1AO5xeTXiY2OJx-KvohRLWP4pKNn82Yr9ydUl6NcjVgbc1hOwTD-Rywd-d1OnxemrSTgf0-pXlYz2parVqr49Sw1Gd3dnsRg-BLI3dWeI-TMa4dM1GVL74lZlH3ygrKx6Pyviq5vT9DPYqXEAmP0yu0I2USnzJAuFiD3vJXUmm2IbHEPc~ku69IKXveWcnCROgUSCdGQACnO4zfr-rq1g5~bkr-vOTF8SXKiVIeC8AwGjYJngONCgc41BfkoJhM1VotERpKTJfol4vxIaO~zccPFywRiKydECQS7nU0gULQlDtMU-VHFw__" alt="UOI Logo" className="w-[100px] h-[50px]" />
            <h1 className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">
              Create Account
            </h1>
            <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">
              Check that information you provide is accurate before proceeding.
            </p>
          </div>

          {/* Create Account Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] w-full">
            <div className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <label className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">
                  NRIC/FIN
                </label>
                <input
                  type="text"
                  value={nric}
                  onChange={(e) => setNric(e.target.value)}
                  placeholder="S1234567A"
                  className="flex items-center px-[16px] py-[12px] gap-[10px] w-full h-[42px] bg-white border border-[#e0e0e0] rounded-[8px] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#005eb8]"
                  required
                />
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">
                  Date of Birth
                </label>
                <div className="relative w-full">
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="flex items-center px-[16px] py-[12px] gap-[10px] w-full h-[42px] bg-white border border-[#e0e0e0] rounded-[8px] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] focus:outline-none focus:border-[#005eb8] pr-[48px]"
                    required
                  />
                  <Calendar className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-[#8d8d8d] w-[20px] h-[20px] pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label className="text-[14px] font-medium leading-[21px] text-[#212121] font-[Noto_Sans]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex items-center px-[16px] py-[12px] gap-[10px] w-full h-[42px] bg-white border border-[#e0e0e0] rounded-[8px] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] placeholder:text-[#8d8d8d] focus:outline-none focus:border-[#005eb8]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-[16px] py-[12px] gap-[10px] w-full h-[42px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white font-[Noto_Sans]">
                {loading ? 'Creating Account...' : 'Next'}
              </span>
            </button>
          </form>

          {/* Footer links */}
          <div className="flex flex-col gap-[12px] w-full">
            <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#0d6efd] hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-[4px] w-full max-w-[420px] mt-[24px]">
          <p className="text-[12px] leading-[18px] text-center text-[#8d8d8d] font-[Noto_Sans]">
            Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.
          </p>
          <p className="text-[12px] leading-[18px] text-center text-[#8d8d8d] font-[Noto_Sans]">
            All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Right side - hero image */}
      <div className="hidden md:block md:flex-1">
        <img src="https://s3-alpha-sig.figma.com/img/90aa/8c19/1f2ecc6a64848f091502ba38538ac902?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OWGig3V~d8hOY-JIHNNIHe3-bgR82YfPnPWDkgYNo02Vj6qsMrb5blHKAfuhn1nwWdT0mrqiXtasKfN-4tHQedKgqb0fb7~GBIa8RhOAUSUe6lmnRHD~gfww06JzBj41RJNbuF7busGmrl~JQHjo2Q53uK9khlUMV7YxYmVvoEzOa0RvbgwEYbqYItKOHQ8u0LPyRsGJi31jVHjBiTE9cSjixMj2nYcd93Z1nOinJ5hOlW7-cBttRYEJQT2x-GVnsN0Mybumu-buG1nzMl-RBo1OL6SG43BVA0Z~95D4OzHgYenPpQnL~353ffjk70g-D4UgnUCi9QLVqVmShB4E8Q__" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}