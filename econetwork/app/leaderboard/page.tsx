"use client";

import { useGlobalContext } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [items, setItems] = useState<any[]>([]);
  const { recyclingItemsArr } = useGlobalContext()!;

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-green">
      <section className="py-8">
        <h1 className="text-3xl font-bold text-white">Leaderboards</h1>
      </section>
    </div>
  );
}
