import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVisitorPass , verifyVisitor} from "../../api/visitor/visitorApi.js";

export const VisitorDetails = () => {

  const { token } = useParams();

  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchVisitor = async () => {

      try {

        const data = await getVisitorPass(token);

        console.log(
          "Security Visitor Data:",
          data
        );

        setVisitor(data.data);

      } catch (error) {

        console.error(
          "Failed to fetch visitor:",
          error
        );

        setError(
          error.message ||
          "Failed to load visitor details"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchVisitor();

  }, [token]);

  const handleVerify = async () => {

    try {

        const data = await verifyVisitor(token);

        console.log(
            "Visitor verified successfully:",
            data
        );

        const updatedData = await getVisitorPass(token);

        setVisitor(updatedData.data);

    } catch (error) {

        console.error(
            "Visitor verification failed:",
            error
        );

    }
};
  if (loading) {
    return (
      <div>
        Loading visitor details...
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
        Visitor not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">

      <div className="mx-auto w-full max-w-lg">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium tracking-widest text-blue-600">
            NIT CALICUT
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Visitor Details
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review visitor information before verification
          </p>
        </div>

        {/* Visitor Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

          {/* Visitor Header */}
          <div className="bg-slate-900 px-6 py-6 text-white">

            <p className="text-xs uppercase tracking-widest text-slate-400">
              Visitor
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {visitor.name}
            </h2>

            <div className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1">
              <span className="text-xs font-medium">
                {visitor.status}
              </span>
            </div>

          </div>

          {/* Details */}
          <div className="space-y-5 px-6 py-6">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Phone
              </p>

              <p className="mt-1 font-medium text-slate-800">
                {visitor.phone}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Purpose
              </p>

              <p className="mt-1 font-medium text-slate-800">
                {visitor.purpose}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Person to Visit
              </p>

              <p className="mt-1 font-medium text-slate-800">
                {visitor.person_to_visit}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Department
              </p>

              <p className="mt-1 font-medium text-slate-800">
                {visitor.department}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Visit Date
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {visitor.visit_date}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Check-in
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {visitor.check_in_time}
                </p>
              </div>

            </div>

            {/* Verification Information */}
            <div className="border-t border-slate-100 pt-5">

              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                Verification
              </p>

              <div className="space-y-2 text-sm">

                <p className="text-slate-700">
                  <span className="font-medium">
                    Verified By:
                  </span>{" "}
                  {visitor.verified_by_name || "Not verified"}
                </p>

                <p className="text-slate-700">
                  <span className="font-medium">
                    Verified At:
                  </span>{" "}
                  {visitor.verified_at || "Not verified"}
                </p>

              </div>

            </div>

            {/* Checkout Information */}
            <div className="border-t border-slate-100 pt-5">

              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                Checkout
              </p>

              <p className="text-sm text-slate-700">
                <span className="font-medium">
                  Checkout Time:
                </span>{" "}
                {visitor.check_out || "Not checked out"}
              </p>

            </div>

          </div>

          {/* Action */}
          {visitor.status === "Pending" && (
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">

<button
    type="button"
    onClick={handleVerify}
    className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
>
    Verify Visitor
</button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};