import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getAllSecurity, createSecurity, updateSecurity, deleteSecurity } from "../../api/admin/adminApi";
import { SecurityFormModal } from "../common/SecurityFormModal";
import { DeleteConfirmModal } from "../common/DeleteConfirmModal";

const GlobalStyles = () => (
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
    @keyframes spin-slow { to { transform: rotate(360deg); } }
    .spin-slow { animation: spin-slow 1s linear infinite; }
  `}</style>
);

export const SecurityManagementComponent = () => {

  const [securityList, setSecurityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState("");

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // success/error toast
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const fetchSecurity = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllSecurity();
      setSecurityList(data.data);
    } catch (error) {
      setError(error.message || "Failed to fetch security list");
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchSecurity();
  }, []);

  /* ---- GSAP entrance + stagger refs ---- */
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
    if (loading || securityList.length === 0) return;

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
  }, [securityList, loading]);

  /* ---- Formatters ---- */
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  /* ---- Handlers ---- */

  // Open create modal
  const handleOpenCreate = () => {
    setSelectedSecurity(null);
    setIsFormModalOpen(true);
  };

  // Open edit modal
  const handleOpenEdit = (security) => {
    setSelectedSecurity(security);
    setIsFormModalOpen(true);
  };

  // Open delete modal
  const handleOpenDelete = (security) => {
    setSelectedSecurity(security);
    setIsDeleteModalOpen(true);
  };

  // Create or Update
  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      if (selectedSecurity) {
        // Update
        await updateSecurity(selectedSecurity.id, formData);
        showToast("Security updated successfully");
      } else {
        // Create
        await createSecurity(formData);
        showToast("Security created successfully");
      }

      setIsFormModalOpen(false);
      setSelectedSecurity(null);
      await fetchSecurity();

    } catch (error) {
      showToast(error.message || "Something went wrong", "error");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete
  const handleDeleteConfirm = async () => {
    try {
      setFormLoading(true);
      await deleteSecurity(selectedSecurity.id);
      showToast("Security deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedSecurity(null);
      await fetchSecurity();
    } catch (error) {
      showToast(error.message || "Failed to delete security", "error");
    } finally {
      setFormLoading(false);
    }
  };

  /* ---- Loading state ---- */
  if (initialLoad) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0E1A] px-4">
        <GlobalStyles />
        <div className="hazard-strip absolute top-0 inset-x-0 h-[3px]"></div>
        <div className="flex flex-col items-center gap-4">
          <div className="spin-slow h-9 w-9 rounded-full border-2 border-white/10 border-t-[#C9A227]"></div>
          <span className="font-tag text-xs tracking-widest text-gray-500 uppercase">
            Loading security personnel...
          </span>
        </div>
      </div>
    );
  }

  /* ---- Error state ---- */
  if (error) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0E1A] px-4">
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

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_50%,transparent_100%)]"></div>

      {/* Toast notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-[60] rounded-xl border px-5 py-3 shadow-lg transition-all duration-300 ${
          toast.type === "error"
            ? "border-red-500/30 bg-red-500/10 text-red-400"
            : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
        }`}>
          <span className="font-tag text-xs tracking-widest uppercase">
            {toast.message}
          </span>
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="inline-flex items-center gap-2 font-tag text-[10px] tracking-widest text-[#D9B84A] uppercase sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9B84A] animate-pulse"></span>
              NIT Calicut · Admin Console
            </div>

            <h1 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Security Management
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Add, edit, and manage security personnel
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="corner-mark group inline-flex items-center gap-2.5 rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-3 font-tag text-xs font-medium uppercase tracking-widest text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20 self-start sm:self-auto"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Security
          </button>

        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10162A] lg:block">

          <table className="w-full text-left">

            <thead className="border-b border-white/[0.07]">
              <tr>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Name</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Email</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Phone</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500">Created</th>
                <th className="px-5 py-3.5 font-tag text-[10px] font-medium uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>

              {securityList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-500">
                    No security personnel found. Click "Add Security" to create one.
                  </td>
                </tr>
              )}

              {securityList.map((security) => (

                <tr
                  key={security.id}
                  ref={registerRow}
                  className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02]"
                >

                  <td className="px-5 py-3.5 text-sm font-medium text-gray-200">
                    {security.name}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {security.email}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {security.phone}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-gray-400 whitespace-nowrap">
                    {formatDate(security.created_at)}
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">

                      {/* Edit */}
                      <button
                        onClick={() => handleOpenEdit(security)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A227]/25 bg-[#C9A227]/10 text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20"
                        title="Edit"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleOpenDelete(security)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
                        title="Delete"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile / tablet card list */}
        <div className="flex flex-col gap-3.5 lg:hidden">

          {securityList.length === 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#10162A] px-5 py-10 text-center text-sm text-gray-500">
              No security personnel found. Tap "Add Security" to create one.
            </div>
          )}

          {securityList.map((security) => (
            <div
              key={security.id}
              ref={registerCard}
              className="rounded-2xl border border-white/[0.08] bg-[#10162A] px-5 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display truncate text-base font-semibold text-white">
                    {security.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {security.email}
                  </p>
                </div>
                <span className="shrink-0 rounded-sm border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 font-tag text-[9px] font-medium uppercase tracking-widest text-emerald-300">
                  Active
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-dashed border-white/10 pt-3.5">
                <div>
                  <p className="font-tag text-[9px] uppercase tracking-widest text-gray-500">Phone</p>
                  <p className="mt-1 text-sm text-gray-300">{security.phone}</p>
                </div>
                <div>
                  <p className="font-tag text-[9px] uppercase tracking-widest text-gray-500">Created</p>
                  <p className="mt-1 text-sm text-gray-300">{formatDate(security.created_at)}</p>
                </div>
              </div>

              {/* Mobile actions */}
              <div className="mt-3.5 flex items-center gap-2 border-t border-dashed border-white/10 pt-3.5">
                <button
                  onClick={() => handleOpenEdit(security)}
                  className="flex-1 rounded-lg border border-[#C9A227]/25 bg-[#C9A227]/10 px-3 py-2 font-tag text-[10px] font-medium uppercase tracking-widest text-[#D9B84A] transition-colors hover:bg-[#C9A227]/20"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleOpenDelete(security)}
                  className="flex-1 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 font-tag text-[10px] font-medium uppercase tracking-widest text-red-400 transition-colors hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

        {/* Footer note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-center">
          <p className="font-tag text-[10px] tracking-widest text-gray-600 uppercase sm:text-[11px]">
            Total: {securityList.length} security personnel
          </p>
        </div>

      </div>

      {/* Modals */}
      <SecurityFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedSecurity(null);
        }}
        onSubmit={handleFormSubmit}
        security={selectedSecurity}
        loading={formLoading}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSecurity(null);
        }}
        onConfirm={handleDeleteConfirm}
        security={selectedSecurity}
        loading={formLoading}
      />

    </div>
  );
};
