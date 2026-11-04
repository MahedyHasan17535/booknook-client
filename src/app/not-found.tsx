import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const NotFound = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
      <p className="text-8xl font-bold tracking-tight text-primary">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
        This page is missing from our shelves
      </h1>
      <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
        The page you are looking for does not exist or has been moved. Let us
        take you back to the library.
      </p>
      <Button
        className="mt-8 rounded-full px-8"
        size="lg"
        render={<Link href="/" />}
        nativeButton={false}
      >
        Back to Home
      </Button>
    </section>
  );
};

export default NotFound;
