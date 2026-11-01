
import { useState } from "react";
import { supabase } from "../lib/supabase";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
        const { error: loginError } =
            await supabase.auth.signInWithPassword({
            email,
            password,
            });

        if (loginError) throw loginError;
        } catch (err) {
        setError(err.message || "Unable to sign in.");
        } finally {
        setLoading(false);
        }
    }

    return (
        <main className="login-page">
        <div className="login-card">
            <div className="login-icon">🌳</div>

            <h1>Family Heritage Tree</h1>
            <p className="login-subtitle">
            Interactive Portfolio Demonstration
            </p>

            <div className="demo-notice">
            This application uses fictional family
            information for demonstration purposes.
            </div>

            <form onSubmit={handleLogin}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && (
                <p className="login-error" role="alert">
                {error}
                </p>
            )}

            <button type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
            </button>
            </form>

            <p className="login-footer">
            Built with React, Supabase, and React Flow
            </p>
        </div>
        </main>
    );
}
