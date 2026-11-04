import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReturnBookButton from "@/components/borrow/ReturnBookButton";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { IBorrow } from "@/lib/types/borrow";

export const metadata: Metadata = {
  title: "My Borrows",
};

const MyBorrowsPage = async () => {
  const token = await getTokenFromServer();

  let borrows: IBorrow[] = [];
  let failed = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      borrows = await res.json();
    } else {
      failed = true;
    }
  } catch {
    failed = true;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeading
        eyebrow="Your reading list"
        title="My Borrows"
        description="Books you have borrowed. Please return them by the return date."
      />

      {failed ? (
        <p className="text-center text-muted-foreground">
          We could not load your borrows right now. Please try again in a
          moment.
        </p>
      ) : borrows.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground">
            You have not borrowed any book yet.
          </p>
          <Button
            className="mt-5 rounded-full px-8"
            render={<Link href="/books" />}
            nativeButton={false}
          >
            Browse Books
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrows.map((borrow) => (
                <TableRow key={borrow._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={borrow.bookImage}
                          alt={borrow.bookTitle}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <Link
                        href={`/books/${borrow.bookId}`}
                        className="font-semibold hover:text-primary"
                      >
                        {borrow.bookTitle}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(borrow.borrowDate)}</TableCell>
                  <TableCell>{formatDate(borrow.returnDate)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <ReturnBookButton
                        id={borrow._id}
                        title={borrow.bookTitle}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default MyBorrowsPage;
