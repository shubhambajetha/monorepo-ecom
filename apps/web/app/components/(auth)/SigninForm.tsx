'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, Mail} from 'lucide-react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const getPasswordStrength = (val: string) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(password);

  const strengthColor = (index: number) => {
    if (index >= strengthScore) return 'bg-gray-200';
    if (strengthScore === 1) return 'bg-red-400';
    if (strengthScore === 2) return 'bg-amber-400';
    if (strengthScore === 3) return 'bg-emerald-400';
    return 'bg-emerald-600';
  };

  const inputClass =
    'w-full h-12 rounded-full  px-4 pr-12 text-sm text-gray-900 !px-6 placeholder:!px-3 text-gray-500 outline-none  transition-all duration-200 border border-gray-300 hover:border-gray-400';

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gray-50 font-[Sora,sans-serif]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 !p-10 sm:!p-6 space-y-10 ">
        <div className="text-center space-y-3 !mb-2">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-gray-500  mx-auto flex item-center justify-center leading-relaxed">
            Join now for a faster, smarter experience and manage everything in one place
          </p>
        </div>

        {/* Email */}
        <div className="space-y-4 !mb-3">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="john@example.com"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-4 !mb-3">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {password.length > 0 && (
            <div className="flex gap-1 mt-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1 flex-1 rounded ${strengthColor(i)}`} />
              ))}
            </div>
          )}
        </div>


        {/* Remember */}
        <div className="flex items-center justify-between mt-2">
          <label className="flex items-center gap-2.5 cursor-pointer select-none group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="peer sr-only"
              />
              <div className="w-4 h-4 rounded border border-gray-300 bg-gray-50 peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-all duration-150 flex items-center justify-center">
                {rememberMe && (
                  <svg width="9" height="9" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
              Remember me
            </span>
          </label>

          <Link
            href="/auth/forgetpassword"
            className="text-xs text-emerald-600 font-medium hover:text-emerald-700 hover:underline underline-offset-2 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-4 !mt-3 !mb-2 transition">
          Create account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 !mb-3">
          <button className="w-full h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-150 flex items-center justify-center gap-2.5 text-sm font-medium text-gray-700 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <button className="w-full h-11 rounded-full border border-gray-800 bg-gray-900 hover:bg-gray-800 transition-all duration-150 flex items-center justify-center gap-2.5 text-sm font-medium text-white shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="shrink-0">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          new to here login?{' '}
          <Link href="/auth/signup" className="text-emerald-600 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
