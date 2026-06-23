'use client';

import React, { useState } from 'react';

const STEPS = { EMAIL: 1, OTP: 2, RESET: 3, SUCCESS: 4 };

const Forgetpassword = () => {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setStep(STEPS.OTP);
      setLoading(false);
    }, 800);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setStep(STEPS.RESET);
      setLoading(false);
    }, 800);
  };

  const handleResetPassword = async () => {
    if (!password) return;
    setLoading(true);
    setTimeout(() => {
      setStep(STEPS.SUCCESS);
      setLoading(false);
    }, 800);
  };

  const inputBase =
    '!w-full bg-gray-50 border border-gray-300 rounded-xl !py-3 !px-4 text-gray-900 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors duration-200 placeholder:text-gray-400';
  const primaryBtn =
    '!w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white font-bold rounded-xl !py-3.5 text-sm tracking-wide transition-all duration-200 flex items-center justify-center !gap-2 cursor-pointer disabled:cursor-not-allowed';

  const StepIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-400">
      {children}
    </div>
  );

  const Spinner = () => (
    <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
  );

  const EyeIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className="!min-h-screen !w-full flex items-center justify-center !px-4 !py-12 bg-gray-50">
      <div className="!w-full !max-w-md">
        {/* ── Card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl !p-10 shadow-lg">
          {/* Step Indicator */}
          {/* <div className="flex items-center justify-center !mb-10">
            {stepLabels.map((label, i) => {
              const s = i + 1;
              const active = step === s;
              const done = step > s;
              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center !gap-1.5">
                    <div
                      className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold border transition-all duration-300
                      ${
                        done
                          ? 'bg-gray-100 border-gray-300 text-gray-600'
                          : active
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-transparent border-gray-300 text-gray-400'
                      }
                    `}
                    >
                      {done ? '✓' : s}
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-widest font-medium transition-colors duration-300
                      ${active ? 'text-blue-600' : 'text-gray-400'}
                    `}
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className={`h-px !w-10 !mx-1 !mb-5 transition-colors duration-300 ${step > s ? 'bg-gray-300' : 'bg-gray-200'}`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div> */}

          {/* ── STEP 1: EMAIL ── */}
          {step === STEPS.EMAIL && (
            <div className="flex flex-col">
              {/* <StepIcon>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </StepIcon> */}

              <h1 className="text-gray-900 text-[22px] font-bold tracking-tight !mb-2 !leading-snug">
                Forgot Password?
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed !mb-8">
                Enter your email and we&apos;ll send you a 6-digit verification code.
              </p>

              <form onSubmit={handleSendOtp} className="flex flex-col !gap-5">
                <div className="flex flex-col !gap-2">
                  <label className="text-gray-700 text-[11px] uppercase tracking-widest font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputBase}
                  />
                </div>

                <button type="submit" disabled={loading} className={primaryBtn}>
                  {loading && <Spinner />}
                  {loading ? 'Sending…' : 'Send Code →'}
                </button>
              </form>
            </div>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === STEPS.OTP && (
            <div className="flex flex-col">
              <StepIcon>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </StepIcon>

              <h2 className="text-gray-900 text-[22px] font-bold tracking-tight !mb-2">
                Check Your Inbox
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed !mb-8">
                We sent a 6-digit code to <span className="text-blue-600 font-medium">{email}</span>
              </p>

              <div className="flex flex-col !gap-2 !mb-5">
                <label className="text-gray-700 text-[11px] uppercase tracking-widest font-semibold">
                  Verification Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="!w-full bg-gray-50 border border-gray-300 rounded-xl !py-3.5 !px-4 text-gray-900 text-center text-2xl font-bold tracking-[12px] !pl-8 outline-none focus:border-blue-500 transition-colors duration-200 placeholder:text-gray-400 placeholder:tracking-normal placeholder:text-base"
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className={`${primaryBtn} !mb-4`}
              >
                {loading && <Spinner />}
                {loading ? 'Verifying…' : 'Verify Code →'}
              </button>

              <button
                onClick={() => {}}
                className="text-gray-500 hover:text-gray-700 text-sm text-center transition-colors !py-1 !leading-relaxed"
              >
                Didn&apos;t receive it? <span className="text-blue-600 font-semibold">Resend</span>
              </button>
            </div>
          )}

          {/* ── STEP 3: RESET ── */}
          {step === STEPS.RESET && (
            <div className="flex flex-col">
              <StepIcon>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </StepIcon>

              <h2 className="text-gray-900 text-[22px] font-bold tracking-tight !mb-2">
                New Password
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed !mb-8">
                Choose a strong password you haven&apos;t used before.
              </p>

              <div className="flex flex-col !gap-2 !mb-5">
                <label className="text-gray-700 text-[11px] uppercase tracking-widest font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!w-full bg-gray-50 border border-gray-300 rounded-xl !py-3 !pl-4 !pr-12 text-gray-900 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors duration-200 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleResetPassword}
                disabled={loading || !password}
                className={primaryBtn}
              >
                {loading && <Spinner />}
                {loading ? 'Updating…' : 'Set Password →'}
              </button>
            </div>
          )}

          {step === STEPS.SUCCESS && (
            <div className="flex flex-col items-center text-center">
              <div className="!w-16 !h-16 rounded-full bg-[#0d1f17] border border-[#142419] flex items-center justify-center !mb-6">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="text-[#eeeef5] text-[22px] font-bold tracking-tight !mb-2">
                All Done!
              </h2>
              <p className="text-[#48485e] text-sm leading-relaxed !mb-8 !max-w-xs">
                Your password has been updated. You can now sign in with your new credentials.
              </p>

              <button onClick={() => setStep(STEPS.EMAIL)} className={primaryBtn}>
                Back to Sign In
              </button>
            </div>
          )}
        </div>

        {/* Bottom hint */}
        <p className="text-center text-[#28283a] text-xs !mt-5">
          Remember your password?{' '}
          <button className="text-[#44445a] hover:text-[#8080a0] transition-colors font-medium">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Forgetpassword;
