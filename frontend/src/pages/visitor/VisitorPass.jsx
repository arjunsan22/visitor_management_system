import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>

      <h1>Visitor Pass</h1>

      <p>
        Name: {visitor.name}
      </p>

      <p>
        Purpose: {visitor.purpose}
      </p>

      <p>
        Person to Visit: {visitor.person_to_visit}
      </p>

      <p>
        Department: {visitor.department}
      </p>

      <p>
        Visit Date: {visitor.visit_date}
      </p>

      <p>
        Check-in Time: {visitor.check_in_time}
      </p>

      <p>
        Status: {visitor.status}
      </p>

    </div>
  );
};