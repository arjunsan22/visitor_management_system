import { useEffect, useState } from "react";
import { getVisitors } from "../../api/admin/adminApi";

export const Visitors = () => {

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const fetchVisitors = async () => {

      try {

        setLoading(true);
        setError("");

        const data = await getVisitors({
          page,
          search,
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

      }
    };

    fetchVisitors();

  }, [page, search, department, status, visitDate]);

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
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search visitors..."
          className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <div className="mb-6">
        <select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
          className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
      <div className="mb-6">
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
          <option value="Checked Out">Checked Out</option>
        </select>
      </div>
      <div className="mb-6">
        <input
          type="date"
          value={visitDate}
          onChange={(e) => { setVisitDate(e.target.value); setPage(1); }}
          className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
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

      <div className="mt-6 flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-slate-600 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

    </div>
  );
};