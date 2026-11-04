"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

// uppercase letter, lowercase letter and at least 6 characters
const getPasswordError = (password: string) => {
  if (!/[A-Z]/.test(password)) {
    return "Password must have an uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must have a lowercase letter.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  return "";
};

const RegisterForm = () => {
  const router = useRouter();

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const error = getPasswordError(user.password);

    if (error) {
      setPasswordError(error);
      toast.error(error);
      return;
    }

    setLoading(true);

    const { data, error: registerError } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image || undefined,
    });

    setLoading(false);

    if (registerError) {
      toast.error(registerError.message || "Could not create your account!");
      return;
    }

    if (data) {
      toast.success("Account created! Please login.");
      router.push("/login");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
      <h1 className="text-center text-3xl font-bold tracking-tight">
        Create an Account
      </h1>
      <p className="mt-2 text-center text-muted-foreground">
        Join BookNook and start sharing and borrowing books.
      </p>

      <form onSubmit={handleRegister} className="mt-8 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image">Photo URL</Label>
          <Input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/your-photo.jpg"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a password"
              className="pr-10"
              aria-invalid={passwordError ? true : undefined}
              onChange={(e) => setPasswordError(getPasswordError(e.target.value))}
            />
            <button
              type="button"
              onClick={() => setShowPassword((show) => !show)}
              aria-label="Show or hide password"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {passwordError ? (
            <p className="text-sm text-destructive">{passwordError}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Use an uppercase letter, a lowercase letter and at least 6
              characters.
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="rounded-full"
          disabled={loading}
        >
          {loading && <Spinner />}
          Register
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        OR
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
