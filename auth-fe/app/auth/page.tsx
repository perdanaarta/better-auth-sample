"use client";

import { useState } from "react";
import auth from "@/lib/auth";

export default function AuthPage() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setErr("");

        const res =
            mode === "signin"
                ? await auth.signIn.email({ email, password })
                : await auth.signUp.email({ name: email, email, password });

        setLoading(false);

        if (res.error) {
            setErr(res.error.message || "Something went wrong");
            return;
        }

        // Redirect after success
        window.location.href = "/";
    }

    return (
        <div style={{ maxWidth: 360, margin: "60px auto", fontFamily: "sans-serif" }}>
            <h2 style={{ marginBottom: 20, textTransform: "capitalize" }}>
                {mode === "signin" ? "Sign In" : "Sign Up"}
            </h2>

            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                />

                {err && <p style={{ color: "red" }}>{err}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: 10,
                        borderRadius: 6,
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {loading
                        ? mode === "signin"
                            ? "Signing In..."
                            : "Signing Up..."
                        : mode === "signin"
                            ? "Sign In"
                            : "Sign Up"}
                </button>
            </form>

            <div style={{ marginTop: 20, textAlign: "center" }}>
                {mode === "signin" ? (
                    <p>
                        Don’t have an account?{" "}
                        <button
                            onClick={() => setMode("signup")}
                            style={{
                                color: "blue",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Sign Up
                        </button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <button
                            onClick={() => setMode("signin")}
                            style={{
                                color: "blue",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Sign In
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}
