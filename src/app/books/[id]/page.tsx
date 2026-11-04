import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BorrowDialog from "@/components/borrow/BorrowDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { IBook } from "@/lib/types/book";

export const metadata: Metadata = {
  title: "Book Details",
};

const BookDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const token = await getTokenFromServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404 || res.status === 400) {
    notFound();
  }

  if (!res.ok) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-muted-foreground">
          We could not load this book right now. Please try again in a moment.
        </p>
      </section>
    );
  }

  const book: IBook = await res.json();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <Button
        variant="ghost"
        className="mb-6 rounded-full"
        render={<Link href="/books" />}
        nativeButton={false}
      >
        <ArrowLeft />
        Back to All Books
      </Button>

      <div className="grid gap-10 md:grid-cols-[minmax(0,380px)_1fr]">
        {/* Book image */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill
            priority
            sizes="(min-width: 768px) 380px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Book information */}
        <div>
          <Badge variant="secondary">{book.category}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            {book.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>

          <p className="mt-6 leading-relaxed">{book.description}</p>

          <div className="mt-8 grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Added by</p>
              <p className="font-semibold">{book.userName}</p>
              <p className="text-sm text-muted-foreground">{book.userEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Added on</p>
              <p className="font-semibold">{formatDate(book.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Copies available</p>
              <p className="font-semibold">
                {book.availableCopies} of {book.totalCopies}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <BorrowDialog book={book} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;
