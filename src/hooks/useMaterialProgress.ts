"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { getItem, setItem } from "@/lib/storage";

export type MaterialStatus = "todo" | "done";

export function useMaterialProgress(pathwaySlug: string) {
  const key = `materials_${pathwaySlug}`;
  const [statuses, setStatuses] = useState<Record<string, MaterialStatus>>({});

  useEffect(() => {
    setStatuses(getItem<Record<string, MaterialStatus>>(key, {}));
  }, [key]);

  const toggle = useCallback(
    (materialId: string) => {
      setStatuses((prev) => {
        const next: Record<string, MaterialStatus> = {
          ...prev,
          [materialId]: prev[materialId] === "done" ? "todo" : "done",
        };
        setItem(key, next);
        return next;
      });
    },
    [key]
  );

  const progress = useMemo(() => {
    const ids = Object.keys(statuses);
    if (ids.length === 0) return 0;
    const done = ids.filter((id) => statuses[id] === "done").length;
    return Math.round((done / ids.length) * 100);
  }, [statuses]);

  return { statuses, toggle, progress };
}
