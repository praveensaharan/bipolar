"use client";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "./config";
import { useRouter } from "next/navigation";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          console.log(response);
        },
        "expired-callback": () => {
          console.log("expired");
        },
      }
    );
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+91${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP sent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
      alert("OTP confirmed");
      router.push("./dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!otpSent ? <div id="recaptcha-container"></div> : null}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="without country code"
        className="border p-2 rounded-md"
      />
      <input
        type="text"
        value={otp}
        onChange={handleOTPChange}
        placeholder="OTP"
        className="border p-2 rounded-md"
      />
      <button
        onClick={otpSent ? handleOTPSubmit : handleSendOtp}
        className={`bg-${
          otpSent ? "green" : "blue"
        }-500 text-white p-2 rounded-md`}
        style={{ backgroundColor: otpSent ? "green" : "blue" }}
      >
        {otpSent ? "Submit OTP" : "Send OTP"}
      </button>
    </div>
  );
}
