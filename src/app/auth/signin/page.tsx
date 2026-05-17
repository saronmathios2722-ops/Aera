'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-aureve-cream">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm">
        <h1 className="text-3xl font-serif text-aureve-charcoal mb-6 text-center">Auréve</h1>
        <p className="text-sm text-gray-500 mb-8 text-center font-sans">Enter your email to start your fashion journey</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@aureve.com"
              className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
