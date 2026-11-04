import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import DeleteBookDialog from "@/components/book/DeleteBookDialog";
import EditBookDialog from "@/components/book/EditBookDialog";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/formatDate";
import { IBook } from "@/lib/types/book";

export const metadata: Metadata = {
  title: "My Books",
};

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user.email ?? "";

  let books: IBook[] = [];
  let failed = false;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books?email=${encodeURIComponent(email)}`,
      { cache: "no-store" },
    );

    if (res.ok) {
      books = await res.json();
    } else {
      failed = true;
    }
  } catch {
    failed = true;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeading
        eyebrow="Your shelf"
        title="My Books"
        description="The books you have added. Edit the details or remove a book at any time."
      />

      {failed ? (
        <p className="text-center text-muted-foreground">
          We could not load your books right now. Please try again in a moment.
        </p>
      ) : books.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground">
            You have not added any book yet.
          </p>
          <Button
            className="mt-5 rounded-full px-8"
            render={<Link href="/add-book" />}
            nativeButton={false}
          >
            Add Your First Book
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={book.imageUrl}
                          alt={book.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <Link
                        href={`/books/${book._id}`}
                        className="font-semibold hover:text-primary"
                      >
                        {book.title}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{book.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {book.availableCopies} / {book.totalCopies}
                  </TableCell>
                  <TableCell>{formatDate(book.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <EditBookDialog book={book} />
                      <DeleteBookDialog id={book._id} title={book.title} />
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

export default MyBooksPage;
