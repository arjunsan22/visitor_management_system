import { useEffect, useState } from "react";
import { getVisitors } from "../../api/admin/adminApi";

export const Visitors = () => {

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchVisitors = async () => {

      try {

        setLoading(true);
        setError("");

        const data = await getVisitors();

        console.log("Visitors:", data);

        setVisitors(data.data.data);

      } catch (error) {

        console.error(
          "Failed to fetch visitors:",
          error
        );

        setError(
          error.message || "Failed to fetch visitors"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchVisitors();

  }, []);

  if (loading) {
    return <div>Loading visitors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">

      <h1 className="mb-6 text-2xl font-bold">
        Visitors
      </h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="w-full text-left">

          <thead className="border-b bg-slate-50">

            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Visit Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {visitors.map((visitor) => (

              <tr
                key={visitor.id}
                className="border-b"
              >

                <td className="px-4 py-3">
                  {visitor.name}
                </td>

                <td className="px-4 py-3">
                  {visitor.email}
                </td>

                <td className="px-4 py-3">
                  {visitor.phone}
                </td>

                <td className="px-4 py-3">
                  {visitor.purpose}
                </td>

                <td className="px-4 py-3">
                  {visitor.department}
                </td>

                <td className="px-4 py-3">
                  {visitor.visit_date}
                </td>

                <td className="px-4 py-3">
                  {visitor.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};