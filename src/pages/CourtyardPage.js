import React, { useEffect, useState } from "react";
import Listing from "../components/Listing.js";
import axios from "axios";

const CourtyardPage = () => {
  const [allCourts, setAllCourts] = useState();

  useEffect(() => {
    //get all courts. on backend set findbypk(where: expiry: [op.gte]today)
    //setAllCourts() to that value
  }, []);

  return <Listing listings={allCourts} />;
};

export default CourtyardPage;
