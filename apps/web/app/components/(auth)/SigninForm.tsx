'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from 'lucide-react';

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path
      fill="#4285F4"
      d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.52-1.74 4.45-5.27 4.45-3.17 0-5.75-2.62-5.75-5.86s2.58-5.86 5.75-5.86c1.81 0 3.02.77 3.72 1.44l2.54-2.47C16.78 4.24 14.66 3.2 12.17 3.2 7.2 3.2 3.17 7.24 3.17 12.2s4.03 9 9 9c5.2 0 8.65-3.65 8.65-8.8 0-.59-.06-1.03-.15-1.3Z"
    />
    <path fill="#34A853" d="M3.17 7.24 5.62 9.04c.66-1.96 2.52-3.39 4.9-3.39 1.81 0 3.02.77 3.72 1.44l2.54-2.47C16.78 4.24 14.66 3.2 12.17 3.2c-3.5 0-6.49 2.01-8 4.04Z" />
    <path fill="#FBBC05" d="M3.17 12.2c0 1.57.39 3.04 1.09 4.34l2.84-2.2a5.95 5.95 0 0 1 0-4.28l-2.84-2.2a8.9 8.9 0 0 0-1.09 4.34Z" />
    <path fill="#EA4335" d="M12.17 21.2c2.43 0 4.47-.8 5.97-2.19l-2.76-2.26c-.75.53-1.74.9-3.21.9-2.45 0-4.53-1.66-5.27-3.9l-2.84 2.2c1.5 2.97 4.59 5.25 8.11 5.25Z" />
  </svg>
);

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const baseInputClass =
    'w-full rounded-xl border border-[#d4ddd2] bg-[#fdfefd] py-3 pl-10 pr-4 text-sm text-[#10231f] placeholder:text-[#7f8f87] transition focus:border-[#1e7a67] focus:outline-none focus:ring-4 focus:ring-[#1e7a67]/10';

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_15%,#e9f6ea_0%,#f6f8f3_45%,#eef3ec_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="auth-float absolute -left-16 -top-12 h-40 w-40 rounded-full bg-[#f4c96f]/30 blur-2xl sm:h-56 sm:w-56" />
        <div className="auth-float auth-float-slow absolute -right-12 bottom-12 h-48 w-48 rounded-full bg-[#63b09b]/25 blur-2xl sm:h-64 sm:w-64" />
      </div>

      <div className="auth-fade-up relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[30px] border border-[#d5ddd5] bg-[#f4f7f1] shadow-[0_28px_90px_rgba(16,35,31,0.16)] lg:grid-cols-[1.05fr_1fr]">
        <aside className="hidden flex-col justify-between bg-gradient-to-br from-[#133f3a] via-[#20534a] to-[#3f6b54] p-10 text-[#edf8ef] lg:flex">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
              <Sparkles size={14} />
              Welcome Back
            </div>
            <h1 className="text-4xl font-semibold leading-tight">Your store dashboard is waiting.</h1>
            <p className="mt-4 max-w-sm text-sm text-[#d8e7dc]">
              Sign in to manage orders, products, and customer conversations in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-[#e4efe7]">
            Keep your momentum. Most sellers review performance and fulfill orders from this screen every day.
          </div>
        </aside>

        <div className="bg-white !p-6 sm:!p-6">
          <div className="mb-8 lg:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#2a6f63]">Sign in</p>
            <h2 className="text-2xl font-semibold text-[#10231f] sm:text-3xl">Welcome back</h2>
            <p className="mt-2 text-sm text-[#61746c]">Use your account details to continue.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#4f6a61]">
              Email
              <span className="relative mt-2 block">
                <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6f8a80]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@store.com"
                  className={baseInputClass}
                />
              </span>
            </label>

            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#4f6a61]">
              Password
              <span className="relative mt-2 block">
                <LockKeyhole
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6f8a80]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${baseInputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6f8a80] transition hover:text-[#20574b]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-[#5a7067]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#9db1a8] text-[#1e7a67] focus:ring-[#1e7a67]/20"
                />
                Remember me
              </label>
              <Link href="#" className="font-semibold text-[#1e7a67] hover:text-[#14473f]">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1a6a5d] to-[#2f8a5d] px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:shadow-[0_12px_28px_rgba(26,106,93,0.32)]"
            >
              Sign in
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#d9e3dc]" />
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a9d93]">Or</span>
              <div className="h-px flex-1 bg-[#d9e3dc]" />
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d4ddd2] bg-white px-4 py-2.5 text-sm font-semibold text-[#37554e] transition hover:border-[#b8cbc0] hover:bg-[#f7fbf9]"
            >
              <GoogleLogo />
              Continue with Google
            </button>

            <p className="text-center text-sm text-[#60746b]">
              Need an account?{' '}
              <Link href="/auth/signup" className="font-semibold text-[#1e7a67] hover:text-[#14473f]">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SigninForm;
