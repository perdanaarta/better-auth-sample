'use client';

import auth from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState<{ user: {name: string, email: string} } | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/me", {
            credentials: "include",
        })
            .then(r => r.json())
            .then(r => {
                setData(r);
                console.log(r) 
            });
    }, []);

    return (
        <main>
            <h1>Data</h1>

            {!data ? (
                <p>Loading...</p>
            ) : data.user ? (
                <p>Welcome, {data.user.name} </p>
            ) : (
                <p>Not logged in</p>
            )}
        </main>
    );
}
