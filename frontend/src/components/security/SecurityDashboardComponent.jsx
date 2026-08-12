import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SecurityDashboardComponent = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">

      <div className="mx-auto w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-medium tracking-widest text-blue-600">
            NIT CALICUT
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Welcome back, {user?.name} 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and verify today's visitors
          </p>

        </div>

        {/* Scanner Card */}
        <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-xl">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
            📷
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            Scan Visitor Pass
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Scan the visitor's QR code to view their details
            and verify their entry.
          </p>

          <button
            type="button"
            onClick={() => navigate("/security/scanner")}
            className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Open Scanner →
          </button>

        </div>

      </div>

    </div>
  );
};