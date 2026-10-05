export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, security, loading }) => {

    if (!isOpen || !security) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
                .font-display { font-family: 'Space Grotesk', sans-serif; }
                .font-tag { font-family: 'JetBrains Mono', monospace; }
            `}</style>

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#10162A] shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-6 py-8 text-center">

                        {/* Warning Icon */}
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-500/25 bg-red-500/10">
                            <svg className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>

                        <h3 className="font-display mt-5 text-lg font-semibold text-white">
                            Delete Security
                        </h3>

                        <p className="mt-2.5 text-sm text-gray-400 leading-relaxed">
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-white">{security.name}</span>?
                            This action cannot be undone.
                        </p>

                        {/* Actions */}
                        <div className="mt-7 flex items-center justify-center gap-3">

                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-2.5 font-tag text-xs font-medium uppercase tracking-widest text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={onConfirm}
                                disabled={loading}
                                className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 font-tag text-xs font-medium uppercase tracking-widest text-red-400 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
