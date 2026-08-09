import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getVisitorPass } from "../../api/visitor/visitorApi.js";

export const VisitorPass = () => {

  const { token } = useParams();

  useEffect(() => {

    const fetchPass = async () => {

      try {

        const data = await getVisitorPass(token);

        console.log(
          "Visitor pass data:",
          data
        );
      } catch (error) {

        console.error(
          "Failed to fetch visitor pass:",
          error
        );

      }
    };

    fetchPass();

  }, [token]);

  return (
    <div>
      <h1>Visitor Pass</h1>
    </div>
  );
};