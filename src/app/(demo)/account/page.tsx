"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { removeLoggedInCookie } from "@/utils/authCookie";
import { useRouter } from 'next/navigation'; // Utilisez useRouter pour la redirection

export default function Account() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un nombre et un caractère spécial.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      removeLoggedInCookie
      router.push('/login');
      setMessage("Password updated successfully.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Change Password</h1>
      <div className="w-full max-w-md">
        <label className="block text-sm font-medium text-white-700">New Password</label>
        <input
          type="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-50 focus:border-zinc-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="block text-sm font-medium text-white-700 mt-4">Confirm Password</label>
        <input
          type="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-50 focus:border-zinc-500 sm:text-sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleChangePassword}
          className="mt-4 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-zinc-50 hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
        >
          Change Password
        </button>
        {message && <p className="mt-2 text-red-600">{message}</p>}
      </div>
    </div>
  );
}
