import Link from "next/link";
import BookCard from "@/components/book/BookCard";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { IBook } from "@/lib/types/book";

export function NewArrivalsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex min-h-72 flex-col items-center justify-center gap-3">
        <Spinner className="size-10 text-primary" />
        <p className="text-sm text-muted-foreground">Loading new arrivals...</p>
      </div>
    </section>
  );
}

export async function NewArrivals() {
  let books: IBook[] = [];
  let failed = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, {
      cache: "no-store",
    });

    if (res.ok) {
      books = await res.json();
    } else {
      failed = true;
    }
  } catch {
    failed = true;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Fresh on the shelf"
        title="New Arrivals"
        description="The latest books added by our readers. Pick one and start reading today."
      />

      {failed ? (
        <p className="text-center text-muted-foreground">
          We could not load the books right now. Please try again in a moment.
        </p>
      ) : books.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground">
            No books yet. Be the first one to add a book!
          </p>
          <Button
            className="mt-5 rounded-full px-8"
            render={<Link href="/add-book" />}
            nativeButton={false}
          >
            Add a Book
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <FadeIn key={book._id} delay={(index % 3) * 0.08} className="h-full">
                <BookCard book={book} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="rounded-full px-8"
              render={<Link href="/books" />}
              nativeButton={false}
            >
              See All Books
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
