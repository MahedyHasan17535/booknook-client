"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { categories } from "@/lib/categories";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { uploadImage } from "@/lib/uploadImage";
import { IBook } from "@/lib/types/book";

const getInitialForm = (book: IBook) => ({
  title: book.title,
  author: book.author,
  category: book.category,
  description: book.description,
  totalCopies: String(book.totalCopies),
});

const EditBookDialog = ({ book }: { book: IBook }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(getInitialForm(book));
  const [image, setImage] = useState<File | null>(null);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  // always start with the saved data of the book
  const handleOpenChange = (value: boolean) => {
    if (value) {
      setForm(getInitialForm(book));
      setImage(null);
    }
    setOpen(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const imageUrl = image ? await uploadImage(image) : book.imageUrl;
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            totalCopies: Number(form.totalCopies),
            imageUrl,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not update the book!");
        return;
      }

      toast.success("Book updated successfully!");
      setOpen(false);
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" className="rounded-full" />}
      >
        <Pencil />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Change the details of your book and save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Book Title</Label>
            <Input
              id="edit-title"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-author">Author Name</Label>
            <Input
              id="edit-author"
              required
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
              <Label htmlFor="edit-copies">Total Copies</Label>
              <Input
                id="edit-copies"
                type="number"
                min={1}
                required
                value={form.totalCopies}
                onChange={(e) => update("totalCopies", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-image">Book Image (optional)</Label>
            <Input
              id="edit-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-muted-foreground">
              Leave it empty to keep the current image.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-description">Short Description</Label>
            <Textarea
              id="edit-description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="rounded-full" disabled={loading}>
              {loading && <Spinner />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
