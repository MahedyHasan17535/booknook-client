"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { categories } from "@/lib/categories";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { uploadImage } from "@/lib/uploadImage";

const initialForm = {
  title: "",
  author: "",
  category: "",
  description: "",
  totalCopies: "1",
};

const AddBookForm = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.category) {
      toast.error("Please select a category!");
      return;
    }

    if (!image) {
      toast.error("Please choose a book image!");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);
      const token = await getTokenFromClient();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          totalCopies: Number(form.totalCopies),
          imageUrl,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not add the book!");
        return;
      }

      toast.success("Book added successfully!");
      router.push("/my-books");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-xl border border-border bg-card p-6 shadow-sm md:grid-cols-2 md:p-8"
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="The Alchemist"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="author">Author Name</Label>
        <Input
          id="author"
          required
          value={form.author}
          onChange={(e) => update("author", e.target.value)}
          placeholder="Paulo Coelho"
        />
      </div>

      <div className="grid gap-2">
        <Label>Category</Label>
        <Select
          value={form.category}
          onValueChange={(value) => update("category", value ?? "")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="totalCopies">Total Copies</Label>
        <Input
          id="totalCopies"
          type="number"
          min={1}
          required
          value={form.totalCopies}
          onChange={(e) => update("totalCopies", e.target.value)}
        />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="image">Book Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          required
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Write a few lines about this book..."
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="userName">Your Name</Label>
        <Input
          id="userName"
          value={user?.name ?? ""}
          readOnly
          className="bg-muted"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="userEmail">Your Email</Label>
        <Input
          id="userEmail"
          value={user?.email ?? ""}
          readOnly
          className="bg-muted"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="rounded-full md:col-span-2"
        disabled={loading}
      >
        {loading && <Spinner />}
        Add Book
      </Button>
    </form>
  );
};

export default AddBookForm;
