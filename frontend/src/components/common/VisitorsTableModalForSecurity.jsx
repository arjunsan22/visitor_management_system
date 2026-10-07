import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVisitors } from "../../api/admin/adminApi";
import { ReusableSpinner } from "./ReusableSpinner";

export const VisitorsTableModalForSecurity = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayDateString();

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch visitors for today
  const fetchVisitors = async () => {
    if (!isOpen) return;

    try {
      setLoading(true);
      setError("");

      const res = await getVisitors({
        page,
        limit: 8,
        search: debouncedSearch,
        department,
        status,
        visit_date: todayStr,
      });

      const items = res?.data?.data || [];
      setVisitors(items);

      if (res?.data?.pagination) {
        setTotalPages(res.data.pagination.totalPages || 1);
        setTotalCount(res.data.pagination.totalRecords || items.length);
      }
    } catch (err) {
      console.error("Failed to load today visitors:", err);
      setError(err.message || "Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVisitors();
    }
  }, [isOpen, page, debouncedSearch, department, status]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const statusStyle = (itemStatus) => {
    switch (itemStatus) {
      case "Verified":
        return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
      case "Checked Out":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      case "Pending":
      default:
        return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "—";
    try {
      const [h, m] = timeStr.split(":");
      const hour = parseInt(h, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${m} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  const handleOpenVisitor = (token) => {
    if (!token) return;
    onClose();
    navigate(`/security/visitor/${token}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-5 backdrop-blur-md">
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E1322] shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#141B31] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/15 text-[#D9B84A] border border-[#C9A227]/25">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold text-white sm:text-xl">
                  Today's Visitors
                </h2>
                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-400/20">
                  {totalCount} Total
                </span>
              </div>
              <p className="font-tag text-[11px] text-gray-400">
                Date: {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="border-b border-white/[0.06] bg-[#11172A] px-5 py-3 sm:px-6">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search name, phone, purpose..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-gray-200 placeholder-gray-500 transition-colors focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
              />
            </div>

            {/* Department */}
            <div>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-white/10 bg-[#141B31] py-2 px-3 text-xs text-gray-200 transition-colors focus:border-[#C9A227] focus:outline-none"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-white/10 bg-[#141B31] py-2 px-3 text-xs text-gray-200 transition-colors focus:border-[#C9A227] focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <ReusableSpinner text="Loading today's visitors..." />
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-sm text-red-300">
              {error}
            </div>
          ) : visitors.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">No visitors found for today</h3>
              <p className="mt-1 text-xs text-gray-500">
                {search || department || status
                  ? "Try clearing your filters to see more results."
                  : "No visitor passes have been scheduled for today."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden overflow-x-auto rounded-xl border border-white/[0.08] bg-[#11172A] md:block">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/[0.06] bg-white/[0.02]">
                    <tr>
                      <th className="px-4 py-3 font-tag text-[10px] font-medium uppercase tracking-wider text-gray-400">Visitor</th>
                      <th className="px-4 py-3 font-tag text-[10px] font-medium uppercase tracking-wider text-gray-400">Phone</th>
                      <th className="px-4 py-3 font-tag text-[10px] font-medium uppercase tracking-wider text-gray-400">Purpose</th>
                      <th className="px-4 py-3 font-tag text-[10px] font-medium uppercase tracking-wider text-gray-400">Department</th>
                      <th className="px-4 py-3 font-tag text-[10px] font-medium uppercase tracking-wider text-gray-400">Time</th>
                      <th className="px-4 py-3 font-tag text-[10px] font-medium uppercase tracking-wider text-gray-400">Status</th>
                      <th className="px-4 py-3 text-right font-tag text-[10px] font-medium uppercase tracking-wider text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {visitors.map((visitor) => (
                      <tr key={visitor.id} className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] font-semibold text-gray-300">
                              {visitor.name?.charAt(0)?.toUpperCase() || "V"}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-white">{visitor.name}</p>
                              <p className="truncate text-[10px] text-gray-500">{visitor.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-300 font-tag text-[11px] whitespace-nowrap">
                          {visitor.phone || "—"}
                        </td>
                        <td className="px-4 py-3.5 text-gray-300 max-w-[150px] truncate" title={visitor.purpose}>
                          {visitor.purpose || "—"}
                        </td>
                        <td className="px-4 py-3.5 text-gray-400 whitespace-nowrap">
                          {visitor.department || "—"}
                        </td>
                        <td className="px-4 py-3.5 text-gray-300 font-tag text-[11px] whitespace-nowrap">
                          {formatTime(visitor.check_in_time)}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className={`inline-flex rounded-sm border px-2 py-0.5 font-tag text-[10px] font-medium uppercase tracking-wider ${statusStyle(visitor.status)}`}>
                            {visitor.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleOpenVisitor(visitor.pass_token)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 px-3 py-1.5 font-tag text-[10px] font-semibold tracking-wider text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20"
                          >
                            <span>DETAILS</span>
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {visitors.map((visitor) => (
                  <div key={visitor.id} className="rounded-xl border border-white/[0.08] bg-[#11172A] p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">{visitor.name}</p>
                        <p className="text-xs text-gray-400">{visitor.phone}</p>
                      </div>
                      <span className={`rounded-sm border px-2 py-0.5 font-tag text-[10px] font-medium uppercase ${statusStyle(visitor.status)}`}>
                        {visitor.status}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 space-y-1 border-t border-white/[0.04] pt-2">
                      <p><span className="text-gray-500">Dept:</span> {visitor.department}</p>
                      <p><span className="text-gray-500">Purpose:</span> {visitor.purpose}</p>
                      <p><span className="text-gray-500">Time:</span> {formatTime(visitor.check_in_time)}</p>
                    </div>

                    <div className="border-t border-white/[0.04] pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleOpenVisitor(visitor.pass_token)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 px-3 py-1.5 font-tag text-xs font-semibold text-[#D9B84A] hover:bg-[#C9A227]/20"
                      >
                        <span>VIEW PASS</span>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#141B31] px-5 py-3 sm:px-6">
          <div className="text-xs text-gray-400 font-tag">
            Page {page} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
