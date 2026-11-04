"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { IBook } from "@/lib/types/book";

const BorrowDialog = ({ book }: { book: IBook }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const notAvailable = book.availableCopies < 1;

  // a user who is not logged in is sent to login and comes back here
  const handleOpenChange = (value: boolean) => {
    if (value && !user) {
      toast.error("Please login to borrow this book!");
      router.push(`/login?callbackUrl=/books/${book._id}`);
      return;
    }

    setOpen(value);
  };

  const handleBorrow = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = await getTokenFromClient();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: book._id }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not borrow this book!");
        return;
      }

      toast.success("Book borrowed! You can find it in My Borrows.");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            size="lg"
            className="rounded-full px-8"
            disabled={notAvailable}
          />
        }
      >
        <BookOpen />
        {notAvailable ? "Not Available" : "Borrow This Book"}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow &quot;{book.title}&quot;</DialogTitle>
          <DialogDescription>
            You can keep this book for 7 days. Please return it on time so
            others can read it too.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBorrow} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="borrow-name">Your Name</Label>
            <Input
              id="borrow-name"
              value={user?.name ?? ""}
              readOnly
              className="bg-muted"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="borrow-email">Your Email</Label>
            <Input
              id="borrow-email"
              value={user?.email ?? ""}
              readOnly
              className="bg-muted"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="rounded-full" disabled={loading}>
              {loading && <Spinner />}
              Confirm Borrow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowDialog;
