"use client";
import Login from "./login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const auth = getAuth(app);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("./dashboard");
      }
    });
  }, [auth, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Firebase OTP Authentication</h1>
      <Login />
    </main>
  );
}
