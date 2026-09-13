import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getVisitors } from "../../api/admin/adminApi";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-tag { font-family: 'JetBrains Mono', monospace; }
    .hazard-strip {
      background-image: repeating-linear-gradient(135deg, #C9A227 0 10px, transparent 10px 20px);
      opacity: 0.45;
    }
    .vms-field input,
    .vms-field select {
      width: 100%;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.5rem;
      padding: 0.7rem 1rem;
      color: #EDEFF5;
      font-size: 0.875rem;
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
      background-position: right 0.85rem center;
      background-size: 1rem;
      padding-right: 2.5rem;
    }
    .vms-field select option { background: #10162A; color: #EDEFF5; }
    .vms-field input[type="date"] { color-scheme: dark; }
    @keyframes spin-slow { to { transform: rotate(360deg); } }
    .spin-slow { animation: spin-slow 1s linear infinite; }
  `}</style>
);

export const Visitors = () => {

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search change after debounce
    }, 1000);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {

    const fetchVisitors = async () => {

      try {

        setLoading(true);
        setError("");

        const data = await getVisitors({
          page,
          search: debouncedSearch,
          department,
          status,
          visit_date: visitDate,
        });

        setVisitors(data.data.data);
        if (data.data.pagination) {
          setTotalPages(data.data.pagination.totalPages);
        }

      } catch (error) {

        setError(
          error.message || "Failed to fetch visitors"
        );

      } finally {

        setLoading(false);
        setInitialLoad(false);

      }
    };

    fetchVisitors();

  }, [page, debouncedSearch, department, status, visitDate]);

  /* ---- Presentation only: GSAP entrance + stagger refs ---- */
  const filtersRef = useRef(null);
  const rowRefs = useRef([]);
  const cardRefs = useRef([]);

  rowRefs.current = [];
  cardRefs.current = [];
  const registerRow = (el) => {
    if (el && !rowRefs.current.includes(el)) rowRefs.current.push(el);
  };
  const registerCard = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    if (filtersRef.current) {
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {

    if (loading || visitors.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [...rowRefs.current, ...cardRefs.current],
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.05,
        }
      );
    });

    return () => ctx.revert();

  }, [visitors, loading]);

  /* ---- Presentation only: status badge color mapping ---- */
  const statusStyle = (value) => {
    if (value === "Pending") {
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    }
    if (value === "Verified") {
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    }
    if (value === "Checked Out") {
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    }
    return "border-[#C9A227]/30 bg-[#C9A227]/10 text-[#D9B84A]";
  };

  if (initialLoad) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4">
        <GlobalStyles />
        <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
        <div className="flex flex-col items-center gap-4">
          <div className="spin-slow h-9 w-9 rounded-full border-2 border-white/10 border-t-[#C9A227]"></div>
          <span className="font-tag text-xs tracking-widest text-gray-500 uppercase">
            Loading visitors...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0E1A] px-4">
        <GlobalStyles />
        <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
        <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#10162A] px-6 py-8 text-center">
          <p className="text-sm font-medium text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0E1A] px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:pt-16">

      <GlobalStyles />

      <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_50%,transparent_100%)]"></div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-2 font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A] animate-pulse"></span>
            NIT Calicut · Admin Console
          </div>

          <h1 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Visitors
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Browse, filter, and review all registered visitors
          </p>
        </div>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="mb-6 rounded-2xl border border-white/[0.08] bg-[#10162A] p-4 sm:p-5"
        >
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="vms-field sm:col-span-2 lg:col-span-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search visitors..."
              />
            </div>

            <div className="vms-field">
              <select
                value={department}
                onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Electronics and Communication">Electronics and Communication</option>
                <option value="Administration">Administration</option>
                <option value="Library">Library</option>
                <option value="CCC">CCC</option>
                <option value="CDIA">CDIA</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="vms-field">
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>

            <div className="vms-field">
              <input
                type="date"
                value={visitDate}
                onChange={(e) => { setVisitDate(e.target.value); setPage(1); }}
              />
            </div>

          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10162A] lg:block">

          <table className="w-full text-left">

            <thead className="border-b border-white/[0.07]">
              <tr>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Name</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Email</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Phone</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Purpose</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Department</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Visit Date</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Status</th>
              </tr>
            </thead>

            <tbody>

              {visitors.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-gray-500">
                    No visitors found.
                  </td>
                </tr>
              )}

              {visitors.map((visitor) => (

                <tr
                  key={visitor.id}
                  ref={registerRow}
                  className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]"
                >

                  <td className="px-5 py-3.5 text-sm font-medium text-gray-200">
                    {visitor.name}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {visitor.email}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {visitor.phone}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {visitor.purpose}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {visitor.department}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {visitor.visit_date}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-sm border px-2.5 py-1 font-tag text-[10px] font-medium uppercase tracking-widest ${statusStyle(visitor.status)}`}>
                      {visitor.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile / tablet card list */}
        <div className="flex flex-col gap-3.5 lg:hidden">

          {visitors.length === 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#10162A] px-5 py-10 text-center text-sm text-gray-500">
              No visitors found.
            </div>
          )}

          {visitors.map((visitor) => (
            <div
              key={visitor.id}
              ref={registerCard}
              className="rounded-2xl border border-white/[0.08] bg-[#10162A] px-5 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display truncate text-base font-semibold text-white">
                    {visitor.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {visitor.email}
                  </p>
                </div>
                <span className={`shrink-0 rounded-sm border px-2 py-1 font-tag text-[9px] font-medium uppercase tracking-widest ${statusStyle(visitor.status)}`}>
                  {visitor.status}
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-dashed border-white/10 pt-3.5">
                <div>
                  <p className="font-tag text-[9px] uppercase tracking-widest text-gray-500">Phone</p>
                  <p className="mt-1 text-sm text-gray-300">{visitor.phone}</p>
                </div>
                <div>
                  <p className="font-tag text-[9px] uppercase tracking-widest text-gray-500">Visit Date</p>
                  <p className="mt-1 text-sm text-gray-300">{visitor.visit_date}</p>
                </div>
                <div>
                  <p className="font-tag text-[9px] uppercase tracking-widest text-gray-500">Department</p>
                  <p className="mt-1 text-sm text-gray-300">{visitor.department}</p>
                </div>
                <div>
                  <p className="font-tag text-[9px] uppercase tracking-widest text-gray-500">Purpose</p>
                  <p className="mt-1 text-sm text-gray-300">{visitor.purpose}</p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Pagination */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="corner-mark rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-2.5 font-tag text-xs font-medium uppercase tracking-widest text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-gray-600"
          >
            Previous
          </button>

          <span className="font-tag text-xs tracking-widest text-gray-500 uppercase">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-2.5 font-tag text-xs font-medium uppercase tracking-widest text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-gray-600"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};