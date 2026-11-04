import type { Metadata } from "next";
import AddBookForm from "@/components/book/AddBookForm";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Add Book",
};

const AddBookPage = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading
        eyebrow="Share a story"
        title="Add a New Book"
        description="Fill in the details below and your book will appear in the library."
      />
      <AddBookForm />
    </section>
  );
};

export default AddBookPage;
