import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <section className="mx-auto max-w-md px-6 py-12">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
