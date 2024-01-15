"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { getCount, setCount } from "@/lib/db";

export default function Home() {
  const [localCount, setLocalCount] = useState<number | null>(null);
  const isInitializing = localCount === null;
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    (async () => {
      const dbCount = await getCount();
      if (dbCount) setLocalCount(dbCount);
    })();
  }, []);

  const handleClick = () =>
    startTransition(async () => {
      setLocalCount(await setCount((localCount ?? 0) + 1));
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      count: {localCount ?? "loading..."} {isPending && "updating..."}
      <Button disabled={isPending || isInitializing} onClick={handleClick}>
        increment
      </Button>
    </main>
  );
}
