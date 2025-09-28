"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-midnightblue text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
