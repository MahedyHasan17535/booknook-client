import Link from "next/link";
import { Baby, FlaskConical, Landmark, Shapes, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const topCategories = [
  { name: "Fiction", icon: Sparkles, text: "Stories and novels" },
  { name: "Science", icon: FlaskConical, text: "Facts and discoveries" },
  { name: "History", icon: Landmark, text: "Tales from the past" },
  { name: "Kids", icon: Baby, text: "Fun for little readers" },
  { name: "Others", icon: Shapes, text: "Everything else" },
];

export function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Find your genre"
        title="Top Categories"
        description="Pick a category to see the books that match your mood."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {topCategories.map((category, index) => (
          <FadeIn key={category.name} delay={index * 0.06} className="h-full">
            <Link
              href={`/books?category=${category.name}`}
              className="group flex h-full flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <category.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.text}
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
