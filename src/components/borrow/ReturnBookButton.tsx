"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const ReturnBookButton = ({ id, title }: { id: string; title: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReturnBook = async () => {
    setLoading(true);

    try {
      const token = await getTokenFromClient();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not return this book!");
        return;
      }

      toast.success(`"${title}" returned. Thank you!`);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="rounded-full"
      onClick={handleReturnBook}
      disabled={loading}
    >
      {loading ? <Spinner /> : <RotateCcw />}
      Return Book
    </Button>
  );
};

export default ReturnBookButton;
