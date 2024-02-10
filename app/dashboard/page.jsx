"use client";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useRouter } from "next/navigation";
import { app } from "../config";

export default function dashboard() {
  const auth = getAuth(app);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        LogOut
      </button>
    </main>
  );
}
