import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBook } from "@/lib/types/book";

const BookCard = ({ book }: { book: IBook }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Book image */}
      <div className="relative aspect-4/5 w-full bg-muted">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="w-fit">
          {book.category}
        </Badge>
        <h3 className="mt-3 line-clamp-1 text-xl font-bold tracking-tight">
          {book.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          by {book.author}
        </p>

        <Button
          className="mt-5 w-full rounded-full"
          render={<Link href={`/books/${book._id}`} />}
          nativeButton={false}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
