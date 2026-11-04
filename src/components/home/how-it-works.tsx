import { BookMarked, BookPlus, RotateCcw } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    icon: BookPlus,
    title: "Add a book",
    text: "Share a book from your own shelf. Add a title, a cover and a few lines about it.",
  },
  {
    icon: BookMarked,
    title: "Borrow a book",
    text: "Find a book you like and borrow it with one click. You can keep it for seven days.",
  },
  {
    icon: RotateCcw,
    title: "Return a book",
    text: "Finished reading? Return the book from My Borrows so the next reader can enjoy it.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-secondary/60 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Simple and quick"
          title="How Borrowing Works"
          description="Three easy steps are all you need to be part of the BookNook community."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.1} className="h-full">
              <div className="h-full rounded-xl border border-border bg-card p-8 text-center shadow-sm">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="size-6" />
                </span>
                <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
