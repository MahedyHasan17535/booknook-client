import type { Metadata } from "next";
import Link from "next/link";
import BookCard from "@/components/book/BookCard";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/lib/categories";
import { IBook } from "@/lib/types/book";

export const metadata: Metadata = {
  title: "All Books",
};

const BooksPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;

  let books: IBook[] = [];
  let failed = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
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

  const activeCategory =
    category && categories.includes(category) ? category : "";
  const filteredBooks = activeCategory
    ? books.filter((book) => book.category === activeCategory)
    : books;

  const chipClass = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card hover:bg-accent"
    }`;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeading
        eyebrow="Our collection"
        title="All Books"
        description="Every book shared by the BookNook community, newest first."
      />

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <Link href="/books" className={chipClass(!activeCategory)}>
          All
        </Link>
        {categories.map((item) => (
          <Link
            key={item}
            href={`/books?category=${item}`}
            className={chipClass(activeCategory === item)}
          >
            {item}
          </Link>
        ))}
      </div>

      {failed ? (
        <p className="text-center text-muted-foreground">
          We could not load the books right now. Please try again in a moment.
        </p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No books found in this category yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BooksPage;
