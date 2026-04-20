import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center font-[Noto_Sans]">
      <div className="flex flex-col items-center gap-[16px]">
        <p className="text-[20px] text-[#6e6e6e]">Forgot Password</p>
        <button onClick={() => navigate('/login')} className="text-[#0d6efd] underline">Back to Login</button>
      </div>
    </div>
  )
}