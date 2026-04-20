import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Pencil } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [nric, setNric] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogin = () => {
    if (!nric || !password) {
      setError('Please enter your NRIC/FIN and password')
      return
    }
    if (password === 'abcdef') {
      setError('Wrong password')
      return
    }
    if (nric === 'S1234567A' && password.length > 5) {
      setShowOtp(true)
      return
    }
    setTimeout(() => navigate('/dashboard'), 500)
  }

  const handleOtpVerify = () => {
    setTimeout(() => navigate('/dashboard'), 500)
  }

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
  }

  const handleSendEmail = () => {
    setSuccessMessage('Password reset email sent.')
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
      setShowForgotPassword(false)
      setShowResetPassword(true)
    }, 2000)
  }

  const handleResetConfirm = () => {
    setSuccessMessage('Password updated successfully.')
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
      setShowResetPassword(false)
      setShowForgotPassword(false)
      setShowOtp(false)
    }, 2000)
  }

  const handleBack = () => {
    if (showResetPassword) {
      setShowResetPassword(false)
      setShowForgotPassword(false)
    } else if (showForgotPassword) {
      setShowForgotPassword(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      {showSuccessToast && (
        <div className="fixed top-[24px] left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="w-[16px] h-[16px] bg-green-500 rounded-full" />
          <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">{successMessage}</span>
        </div>
      )}

      <div className="flex-1 flex flex-row">
        <div className="flex-1 flex flex-col justify-center items-center p-[24px] md:p-[48px] bg-white bg-gradient-to-b from-[#005eb8]/7 to-[#5c55eb]/7">
          <div className="w-full max-w-[420px] bg-white/70 rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] flex flex-col gap-[32px]">

            {(showForgotPassword || showResetPassword) && (
              <div className="flex items-center gap-[4px] cursor-pointer" onClick={handleBack}>
                <svg className="w-[20px] h-[20px]" fill="none" stroke="#6e6e6e" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">
                  {showResetPassword ? 'Back to Login' : 'Back'}
                </span>
              </div>
            )}

            <div className="flex flex-col items-center gap-[12px] w-full">
              <img
                src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PSA09KnD8BDeEeZZ6cI~VtwcDg22Moj9P1AO5xeTXiY2OJx-KvohRLWP4pKNn82Yr9ydUl6NcjVgbc1hOwTD-Rywd-d1OnxemrSTgf0-pXlYz2parVqr49Sw1Gd3dnsRg-BLI3dWeI-TMa4dM1GVL74lZlH3ygrKx6Pyviq5vT9DPYqXEAmP0yu0I2USnzJAuFiD3vJXUmm2IbHEPc~ku69IKXveWcnCROgUSCdGQACnO4zfr-rq1g5~bkr-vOTF8SXKiVIeC8AwGjYJngONCgc41BfkoJhM1VotERpKTJfol4vxIaO~zccPFywRiKydECQS7nU0gULQlDtMU-VHFw__"
                alt="UOI Logo"
                className="w-[100px] h-[50px]"
              />
              <h1 className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">
                {showOtp ? 'Logging in on a new device?' :
                 showForgotPassword ? 'Forgot Password' :
                 showResetPassword ? 'Reset Password' :
                 'Welcome to UOI Customer Portal'}
              </h1>
              <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">
                {showOtp ? "We've sent a one-time password (OTP) to ch****@gmail.com" :
                 showForgotPassword ? "Enter your account's email address and we'll send you an email to reset password" :
                 showResetPassword ? 'Check that information you provide is accurate before proceeding.' :
                 'Manage all your policies in one portal.'}
              </p>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              {showOtp && (
                <>
                  <div className="flex flex-col gap-[12px] w-full">
                    <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Enter Code</span>
                    <div className="flex items-center px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]">
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="098721"
                        className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                      />
                    </div>
                  </div>
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">
                    Didn't receive a code? <span className="text-[#0d6efd] cursor-pointer">Resend</span>
                  </span>
                </>
              )}

              {showForgotPassword && !showResetPassword && (
                <div className="flex flex-col gap-[12px] w-full">
                  <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Email</span>
                  <div className="flex items-center px-[16px] py-[12px] gap-[8px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="chriswong@gmail.com"
                      className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                    />
                  </div>
                </div>
              )}

              {showResetPassword && (
                <div className="flex flex-col gap-[16px] w-full">
                  <div className="flex flex-col gap-[12px] w-full">
                    <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">New Password</span>
                    <div className="flex items-center justify-between px-[16px] py-[12px] gap-[8px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="arC01#$12?_"
                        className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                      />
                      <Pencil className="w-[24px] h-[24px] cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px] w-full">
                    <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Confirm Password</span>
                    <div className="flex items-center justify-between px-[16px] py-[12px] gap-[8px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="arC01#$12?_"
                        className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                      />
                      <Pencil className="w-[24px] h-[24px] cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                    </div>
                  </div>
                </div>
              )}

              {!showOtp && !showForgotPassword && !showResetPassword && (
                <>
                  <div className="flex flex-col gap-[12px] w-full">
                    <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">NRIC/FIN</span>
                    <div className="flex items-center px-[16px] py-[12px] gap-[8px] w-full h-[48px] bg-white rounded-[8px] border border-[#000000]">
                      <input
                        type="text"
                        value={nric}
                        onChange={(e) => setNric(e.target.value)}
                        placeholder="S1234567A"
                        className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex flex-col gap-[12px] w-full">
                      <Lock className="w-[20px] h-[20px] text-[#212121]" />
                      <div className={`flex items-center justify-between px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border ${error === 'Wrong password' ? 'border-[#dc3545]' : 'border-[#000000]'}`}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="flex-1 text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] bg-transparent border-none outline-none"
                        />
                        <Pencil className="w-[24px] h-[24px] cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                      </div>
                    </div>
                    {error === 'Wrong password' && (
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[16px] h-[16px] bg-red-500 rounded-full" />
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">Wrong password</span>
                      </div>
                    )}
                  </div>
                  <span
                    className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans] cursor-pointer"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </span>
                </>
              )}
            </div>

            <button
              onClick={
                showOtp ? handleOtpVerify :
                showForgotPassword && !showResetPassword ? handleSendEmail :
                showResetPassword ? handleResetConfirm :
                handleLogin
              }
              className="flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white font-[Noto_Sans]">
                {showOtp ? 'Verify' :
                 showForgotPassword && !showResetPassword ? 'Send Email' :
                 showResetPassword ? 'Confirm' :
                 'Login'}
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
            <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
              Don't have an account?{' '}
              <span
                className="text-[#0d6efd] cursor-pointer"
                onClick={() => navigate('/create-account')}
              >
                Create an account
              </span>
            </p>
            <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
              If you're experiencing login issues, please contact us at help@uoi.com.sg.
            </p>
          </div>
        </div>

        <div className="hidden md:block flex-1">
          <img
            src="https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H00wquIZQgvNNauemHlj5DS3GK9TQAHVTFPNXuJuio2vZU5gpckw6RlTXCJ823SDilRVgzDpfSCNaWJtD71lVVCcPCWD2hlxHiScyTmkLpBPch4FP73XZgwU6SbM3bQ4IF42KFXQhbwlGeNjF0DHI2OAC2QNznkgUIi2EoyN~xUvI89J2yvyDRBfQOhswbKQDpfGT-pJgS5ry6aPd6efpRVieEXts4SodSQFVVr8hWXZnzknSJGqIp~YY08O9D0xFIbL0MtGdRKmWxrMoflt42EistrpuQjVlPlZqC39pSxtEQpDutH7pGmmamaRVcxNzhCxKM91shYxIoZL5khiAw__"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-[24px] py-[16px] w-full h-[53px] bg-[#005eb8]">
        <span className="text-[14px] leading-[21px] text-white font-[Noto_Sans]">
          Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.
        </span>
        <span className="text-[14px] leading-[21px] text-right text-white font-[Noto_Sans]">
          All Rights Reserved.
        </span>
      </div>
    </div>
  )
}