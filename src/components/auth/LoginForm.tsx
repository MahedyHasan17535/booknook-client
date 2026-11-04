"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // the page the user wanted before login (only same-site paths are allowed)
  const rawCallbackUrl = searchParams.get("callbackUrl") ?? "/";
  const callbackUrl =
    rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//")
      ? rawCallbackUrl
      : "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (callbackUrl !== "/") {
      toast.error("Please login to continue!", { id: "login-required" });
    }
  }, [callbackUrl]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      ...user,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Email or password is wrong!");
      return;
    }

    if (data) {
      toast.success("Logged in successfully!");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleForgotPassword = () => {
    toast("Password reset is coming soon!", { icon: "🔒" });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
      <h1 className="text-center text-3xl font-bold tracking-tight">
        Welcome Back
      </h1>
      <p className="mt-2 text-center text-muted-foreground">
        Login to borrow books and manage your shelf.
      </p>

      <form onSubmit={handleLogin} className="mt-8 grid gap-4">
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
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Your password"
              className="pr-10"
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
        </div>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-fit text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>

        <Button
          type="submit"
          size="lg"
          className="rounded-full"
          disabled={loading}
        >
          {loading && <Spinner />}
          Login
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        OR
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton callbackURL={callbackUrl} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to BookNook?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
