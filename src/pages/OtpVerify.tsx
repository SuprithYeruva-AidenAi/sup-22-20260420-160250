import { useNavigate } from 'react-router-dom'

export default function OtpVerify() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center font-[Noto_Sans]">
      <div className="flex flex-col items-center gap-[16px]">
        <p className="text-[20px] text-[#6e6e6e]">OTP Verification</p>
        <button onClick={() => navigate('/dashboard')} className="text-[#0d6efd] underline">Continue</button>
      </div>
    </div>
  )
}