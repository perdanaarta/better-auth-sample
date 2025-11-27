'use client';

import auth from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { data: session, isPending } = auth.useSession();

    if (!isPending && !session) {
        router.replace("/auth");
        return null;
    }

    if (isPending) {
        return <p>Loading...</p>;
    }

    var user = session!.user;

    return (
        <main>
            <h1>Dashboard</h1>
            <p>Welcome, {user.email}</p>
            <p>{user.name}</p>
            <p>{user.id}</p>
        </main>
    )
}
