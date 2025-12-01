"use client";
import { useEffect, useState } from "react";

export default function HomeClient() {
    const [data, setData] = useState<{ authenticated: boolean } | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
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
            ) : data.authenticated ? (
                <p>Logged in</p>
            ) : (
                <p>Not logged in</p>
            )}
        </main>
    );
}
