import { useState } from "react";
import { visitorSchema } from "../../schemas/visitorSchema.js";
import { createVisitor } from "../../api/visitor/visitorApi.js";
import { useNavigate } from "react-router-dom";

export const VisitorForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        purpose: "",
        person_to_visit: "",
        department: "",
        visit_date: "",
        check_in_time: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = visitorSchema.safeParse(formData);

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

        try {

            const data = await createVisitor(result.data);

            const passToken = data.data.pass_token;

            localStorage.setItem(
                "visitorPassToken",
                passToken
            );

            console.log(
                "Visitor created successfully:",
                data
            );

            navigate(`/pass/${passToken}`);

        } catch (error) {

            console.error(
                "Visitor creation failed:",
                error
            );

        }
    };

    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-[#0A0E1A] px-4 py-16 sm:px-6 lg:px-12">

            {/* Shared design-system tokens (same as HeroSection) */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

                .font-display { font-family: 'Space Grotesk', sans-serif; }
                .font-tag { font-family: 'JetBrains Mono', monospace; }

                .hazard-strip {
                    background-image: repeating-linear-gradient(135deg, #C9A227 0 10px, transparent 10px 20px);
                    opacity: 0.45;
                }

                .corner-mark { position: relative; }
                .corner-mark::before, .corner-mark::after {
                    content: ''; position: absolute; width: 12px; height: 12px; pointer-events: none;
                    border-color: #C9A227; opacity: 0.7;
                }
                .corner-mark::before { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
                .corner-mark::after { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

                .vms-field input,
                .vms-field select {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 0.375rem;
                    padding: 0.75rem 1rem;
                    color: #EDEFF5;
                    font-size: 0.9rem;
                    transition: border-color 0.2s ease, background-color 0.2s ease;
                }
                .vms-field input::placeholder { color: #6B7280; }
                .vms-field input:focus,
                .vms-field select:focus {
                    outline: none;
                    border-color: #C9A227;
                    background: rgba(255,255,255,0.05);
                    box-shadow: 0 0 0 3px rgba(201,162,39,0.15);
                }
                .vms-field select {
                    appearance: none;
                    -webkit-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238A93AC'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.9rem center;
                    background-size: 1rem;
                    padding-right: 2.5rem;
                }
                .vms-field select option {
                    background: #10162A;
                    color: #EDEFF5;
                }
                .vms-field input[type="date"],
                .vms-field input[type="time"] {
                    color-scheme: dark;
                }
                .vms-label {
                    display: block;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10.5px;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #8A93AC;
                    margin-bottom: 0.5rem;
                }
            `}</style>

            <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_60%,transparent_100%)]"></div>

            <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-[#10162A] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.45)]">

                {/* Header meta bar */}
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-6 py-3.5 sm:px-8">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#D9B84A]">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <span className="font-tag text-[11px] tracking-widest text-gray-400 uppercase">Visitor Registration Form</span>
                    </div>
                    <span className="hidden sm:inline font-tag text-[10px] tracking-widest text-gray-500 uppercase">Fields Required *</span>
                </div>

                {/* Heading */}
                <div className="px-6 pt-8 sm:px-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                        New Visitor
                        <span className="block h-[3px] w-12 bg-[#C9A227] mt-3 rounded-full"></span>
                    </h2>
                    <p className="mt-3 text-sm text-gray-400 max-w-md">
                        Provide accurate details for gate clearance and record verification.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-8"
                >

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">

                        {/* Name */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="name">
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="phone">
                                Phone
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Purpose */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="purpose">
                                Purpose
                            </label>

                            <input
                                id="purpose"
                                name="purpose"
                                type="text"
                                value={formData.purpose}
                                onChange={handleChange}
                                placeholder="Purpose of visit"
                            />
                            {errors.purpose && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.purpose}
                                </p>
                            )}
                        </div>

                        {/* Person to Visit */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="person_to_visit">
                                Person to Visit
                            </label>

                            <input
                                id="person_to_visit"
                                name="person_to_visit"
                                type="text"
                                value={formData.person_to_visit}
                                onChange={handleChange}
                                placeholder="Enter person to visit"
                            />
                            {errors.person_to_visit && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.person_to_visit}
                                </p>
                            )}
                        </div>

                        {/* Department */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="department">
                                Department
                            </label>

                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select department
                                </option>

                                <option value="Computer Science">
                                    Computer Science
                                </option>

                                <option value="Civil Engineering">
                                    Civil Engineering
                                </option>

                                <option value="Mechanical Engineering">
                                    Mechanical Engineering
                                </option>

                                <option value="Electrical Engineering">
                                    Electrical Engineering
                                </option>

                                <option value="Electronics and Communication">
                                    Electronics and Communication
                                </option>

                                <option value="Administration">
                                    Administration
                                </option>

                                <option value="Library">
                                    Library
                                </option>

                                <option value="CCC">
                                    CCC
                                </option>

                                <option value="CDIA">
                                    CDIA
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                            {errors.department && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.department}
                                </p>
                            )}
                        </div>

                        {/* Visit Date */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="visit_date">
                                Visit Date
                            </label>

                            <input
                                id="visit_date"
                                name="visit_date"
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                value={formData.visit_date}
                                onChange={handleChange}
                            />
                            {errors.visit_date && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.visit_date}
                                </p>
                            )}
                        </div>

                        {/* Check-in Time */}
                        <div className="vms-field">
                            <label className="vms-label" htmlFor="check_in_time">
                                Check-in Time
                            </label>

                            <input
                                id="check_in_time"
                                name="check_in_time"
                                type="time"
                                value={formData.check_in_time}
                                onChange={handleChange}
                            />
                            {errors.check_in_time && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.check_in_time}
                                </p>
                            )}
                        </div>

                    </div>

                    <div className="mt-9 flex items-center justify-between gap-4 border-t border-dashed border-white/10 pt-6">
                        <span className="font-tag text-[10px] tracking-widest text-gray-500 uppercase hidden sm:inline">
                            Verified On Submission
                        </span>

                        <button
                            type="submit"
                            className="corner-mark group inline-flex items-center gap-3 border-l-2 border-[#C9A227] bg-white/[0.03] px-6 py-3.5 transition-colors duration-200 hover:bg-white/[0.06] ml-auto sm:ml-0 cursor-pointer"
                        >
                            <span className="font-display text-sm font-semibold text-white tracking-wide">
                                Submit
                            </span>
                            <svg className="h-4 w-4 text-[#D9B84A] transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};