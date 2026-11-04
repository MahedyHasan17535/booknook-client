import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { formatDate } from "@/lib/formatDate";

export const metadata: Metadata = {
  title: "My Profile",
};

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <section className="mx-auto max-w-md px-6 py-12">
      <div className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <Avatar className="size-24">
          <AvatarImage
            src={user?.image ?? undefined}
            alt={user?.name}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback className="text-3xl">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <h1 className="mt-5 text-3xl font-bold tracking-tight">{user?.name}</h1>
        <p className="mt-1 text-muted-foreground">{user?.email}</p>
        {user?.createdAt && (
          <p className="mt-4 text-sm text-muted-foreground">
            Member since {formatDate(new Date(user.createdAt).toISOString())}
          </p>
        )}

        <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
          <Button
            className="rounded-full"
            render={<Link href="/my-books" />}
            nativeButton={false}
          >
            My Books
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            render={<Link href="/my-borrows" />}
            nativeButton={false}
          >
            My Borrows
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
