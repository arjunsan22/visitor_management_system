import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth/authApi.js";
import { useAuth } from "../../context/AuthContext";

/* ---------- small inline icons (no extra dependency) ---------- */
const Icon = ({ children, className = "h-4 w-4" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        {children}
    </svg>
);

const MailIcon = () => (
    <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
    </Icon>
);
const LockIcon = () => (
    <Icon>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Icon>
);
const EyeIcon = () => (
    <Icon>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
    </Icon>
);
const EyeOffIcon = () => (
    <Icon>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2" />
        <path d="M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7c1.6 0 3-.4 4.3-1" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </Icon>
);
const SignInIcon = () => (
    <Icon>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <path d="m10 17 5-5-5-5" />
        <path d="M15 12H3" />
    </Icon>
);
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9a6 6 0 1 1 0-12c1.9 0 3.2.8 3.9 1.5l2.7-2.6A9.8 9.8 0 0 0 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4 9.6-9.8 0-.7-.1-1.2-.2-1.9H12Z" />
        <path fill="#34A853" d="M3.2 7.3l3.2 2.4A6 6 0 0 1 12 6c1.9 0 3.2.8 3.9 1.5l2.7-2.6A9.8 9.8 0 0 0 12 2 10 10 0 0 0 3.2 7.3Z" opacity="0" />
        <path fill="#FBBC05" d="M6.4 14.1a6 6 0 0 1 0-4.4L3.2 7.3a10 10 0 0 0 0 9.4l3.2-2.6Z" />
        <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.1-2.5c-.9.6-2 1-3.5 1a6 6 0 0 1-5.6-4l-3.2 2.5A10 10 0 0 0 12 22Z" />
        <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.2-.2-1.9H12v3.9h5.5a4.7 4.7 0 0 1-2 3.1l3.1 2.5c1.8-1.7 3-4.2 3-7.6Z" />
    </svg>
);

const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-10 pr-3 text-sm text-white " +
    "placeholder-neutral-500 outline-none transition " +
    "hover:border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/10";

/* Dark navy background with a faint grid and a soft vignette */
const gridBackground = {
    backgroundColor: "#0a0e17",
    backgroundImage: [
        "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
        "linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px)",
        "linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
    ].join(", "),
    backgroundSize: "100% 100%, 48px 48px, 48px 48px",
};

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await login(
                formData.email,
                formData.password
            );
            loginUser(data.data);

            console.log(
                "Login successful:",
                data
            );

            if (data.data.role === "security") {
                navigate("/security/dashboard");
            } else if (data.data.role === "admin") {
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.error(
                "Login failed:",
                error
            );

            setError(
                error.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    // TODO: connect to your Google OAuth flow
    const handleGoogleLogin = () => {
        // window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <div className="flex min-h-screen bg-[#0a0e17] text-white">
            {/* ---------------- Left: form ---------------- */}
            <div
                style={gridBackground}
                className="relative flex w-full flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-10 lg:w-1/2 lg:px-16 xl:px-24"
            >
               

                {/* Form */}
                <main className="flex flex-1 items-center justify-center py-10">
                    <div className="w-full max-w-sm">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                        <p className="mt-2 text-sm text-neutral-400">
                            Sign in with your institute Google account to access services.
                        </p>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium transition hover:border-white/20 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        >
                            <GoogleIcon />
                            Login with Google
                        </button>

                        <div className="my-6 flex items-center gap-4 text-xs text-neutral-500">
                            <span className="h-px flex-1 bg-white/10" />
                            or
                            <span className="h-px flex-1 bg-white/10" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-2 block text-xs font-semibold text-neutral-200">
                                    Email address
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-500">
                                        <MailIcon />
                                    </span>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="password" className="text-xs font-semibold text-neutral-200">
                                        Password
                                    </label>
                
                                </div>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-500">
                                        <LockIcon />
                                    </span>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        
                                        autoComplete="current-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className={`${inputClass} pr-11`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-neutral-500 transition hover:text-white focus:outline-none focus-visible:text-white"
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            <div aria-live="polite">
                                {error && (
                                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                                        {error}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e17] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <SignInIcon />
                                        Sign in
                                    </>
                                )}
                            </button>
                        </form>

                    
                    </div>
                </main>

                <footer className="text-center text-[11px] text-neutral-500 sm:text-left">
                    © {new Date().getFullYear()} National Institute of Technology Calicut. All rights reserved.
                </footer>
            </div>

            {/* ---------------- Right: banner (desktop only) ---------------- */}
            <div className="relative hidden bg-[#0a0e17] lg:block lg:w-1/2">
                <img
                    src="/nitc-login-img2.png"
                    alt="NIT Calicut campus"
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 xl:p-10">
                    <p className="text-xs font-semibold tracking-wide text-neutral-300">NIT Calicut</p>
                    <h2 className="mt-1 max-w-sm text-xl font-semibold leading-snug">
                        Welcome back to the Visitor Management System
                    </h2>
                </div>
            </div>
        </div>
    );
};