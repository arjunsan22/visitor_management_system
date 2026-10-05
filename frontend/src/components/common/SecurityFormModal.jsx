import { useState, useEffect } from "react";
import { securitySchema, updateSecuritySchema } from "../../schemas/securitySchema.js";

export const SecurityFormModal = ({ isOpen, onClose, onSubmit, security, loading }) => {

    const isEditMode = !!security;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (security) {
            setFormData({
                name: security.name || "",
                email: security.email || "",
                phone: security.phone || "",
                password: "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
            });
        }

        setErrors({});

    }, [security, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const schema = isEditMode ? updateSecuritySchema : securitySchema;

        const dataToValidate = isEditMode
            ? { name: formData.name, email: formData.email, phone: formData.phone }
            : formData;

        const result = schema.safeParse(dataToValidate);

        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0];
                fieldErrors[fieldName] = issue.message;
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        await onSubmit(result.data);
    };

    if (!isOpen) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
                .font-display { font-family: 'Space Grotesk', sans-serif; }
                .font-tag { font-family: 'JetBrains Mono', monospace; }
                .modal-field input {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 0.5rem;
                    padding: 0.7rem 1rem;
                    color: #EDEFF5;
                    font-size: 0.875rem;
                    transition: border-color 0.2s ease, background-color 0.2s ease;
                }
                .modal-field input::placeholder { color: #6B7280; }
                .modal-field input:focus {
                    outline: none;
                    border-color: #C9A227;
                    background: rgba(255,255,255,0.05);
                    box-shadow: 0 0 0 3px rgba(201,162,39,0.15);
                }
                .modal-label {
                    display: block;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10.5px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #8A93AC;
                    margin-bottom: 0.5rem;
                }
            `}</style>

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#10162A] shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 text-[#D9B84A]">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="font-tag text-[11px] tracking-widest text-gray-400 uppercase">
                                {isEditMode ? "Edit Security" : "Add Security"}
                            </span>
                        </div>

                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-6">

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            {/* Name */}
                            <div className="modal-field sm:col-span-2">
                                <label className="modal-label" htmlFor="security-name">
                                    Name
                                </label>
                                <input
                                    id="security-name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="modal-field">
                                <label className="modal-label" htmlFor="security-email">
                                    Email
                                </label>
                                <input
                                    id="security-email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="modal-field">
                                <label className="modal-label" htmlFor="security-phone">
                                    Phone
                                </label>
                                <input
                                    id="security-phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Password - only for create */}
                            {!isEditMode && (
                                <div className="modal-field sm:col-span-2">
                                    <label className="modal-label" htmlFor="security-password">
                                        Password
                                    </label>
                                    <input
                                        id="security-password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* Actions */}
                        <div className="mt-7 flex items-center justify-end gap-3 border-t border-dashed border-white/10 pt-5">

                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-2.5 font-tag text-xs font-medium uppercase tracking-widest text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2.5 font-tag text-xs font-medium uppercase tracking-widest text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? (isEditMode ? "Updating..." : "Creating...")
                                    : (isEditMode ? "Update" : "Create")
                                }
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};
