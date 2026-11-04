import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <section className="mx-auto max-w-md px-6 py-12">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
};

export default LoginPage;
