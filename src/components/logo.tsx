import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <BookOpen className="size-5" />
      </span>
      <span className="text-2xl font-bold tracking-tight">BookNook</span>
    </Link>
  );
}
