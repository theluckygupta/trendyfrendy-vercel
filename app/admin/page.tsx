"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser("admin");
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Admin Panel Working
      </h1>
    </main>
  );
}