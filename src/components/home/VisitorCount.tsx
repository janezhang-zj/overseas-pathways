"use client";

import { useEffect, useState } from "react";

const API_URL = "https://overseas-pathways-experiences.262617886.workers.dev/api/visitors";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = "pw_visited";
    const visited = sessionStorage.getItem(sessionKey);

    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        setCount(data.count);
        if (!visited) {
          // 每个 session 只计数一次
          fetch(API_URL, { method: "POST" })
            .then((r) => r.json())
            .then((d) => setCount(d.count))
            .catch(() => {});
          sessionStorage.setItem(sessionKey, "1");
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="text-xs text-earth-400">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-moss-400 mr-1.5 animate-pulse" />
      已有 {count.toLocaleString()} 人使用过
    </span>
  );
}
