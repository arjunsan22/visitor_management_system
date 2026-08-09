import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";


import { getVisitorPass } from "../../api/visitor/visitorApi.js";

export const VisitorPass = () => {

  const { token } = useParams();

  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchPass = async () => {

      try {

        const data = await getVisitorPass(token);

        setVisitor(data.data);

      } catch (error) {

        console.error(
          "Failed to fetch visitor pass:",
          error
        );

        setError(
          error.message || "Failed to load visitor pass"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchPass();

  }, [token]);

  if (loading) {
    return (
      <div>
        Loading visitor pass...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  if (!visitor) {
    return (
      <div>
        Visitor pass not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">


      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-6 text-center">

          <p className="text-sm font-medium tracking-widest text-blue-600">
            NIT CALICUT
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Visitor Pass
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Keep this pass available during your visit
          </p>

        </div>

        {/* Pass Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* Card Header */}
          <div className="bg-slate-900 px-6 py-5 text-white">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Visitor
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  {visitor.name}
                </h2>
              </div>

              <div className="rounded-full bg-white/10 px-3 py-1">
                <span className="text-xs font-medium">
                  PASS
                </span>
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="space-y-5 px-6 py-6">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Purpose
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {visitor.purpose}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Person to Visit
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {visitor.person_to_visit}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Department
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {visitor.department}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Visit Date
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {visitor.visit_date}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Check-in
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {visitor.check_in_time}
                </p>
              </div>

            </div>
            {/* QR Code */}
            <div className="border-t border-slate-100 pt-5">

              <div className="text-center">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Visitor Pass QR
                </p>

                <div className="mt-4 flex justify-center">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <QRCodeSVG
                      value={`${window.location.origin}/pass/${visitor.pass_token}`}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Scan this QR code at the security gate
                </p>

              </div>

            </div>
            {/* Status */}
            <div className="border-t border-slate-100 pt-5">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Current Status
              </p>

              <div className="mt-2 inline-flex rounded-full bg-amber-50 px-4 py-2">
                <span className="text-sm font-semibold text-amber-700">
                  {visitor.status}
                </span>
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-dashed border-slate-200 px-6 py-4 text-center">

            <p className="text-xs text-slate-400">
              Please present this pass at the security gate
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};