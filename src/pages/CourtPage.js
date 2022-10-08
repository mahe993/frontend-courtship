import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const CourtPage = () => {
  const [court, setCourt] = useState();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCourt();
  }, []);

  const getCourt = async () => {
    try {
      const res = await axios({
        url: `${BACKEND_URL}/courtyard/court${params.courtId}`,
      });
      setCourt(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return <div>CourtPage</div>;
};

export default CourtPage;
