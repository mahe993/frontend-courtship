import { Box } from "@mui/material";
import React from "react";

const CourtshipRules = () => {
  return (
    <Box width="90%" m="auto">
      <Box component="p" fontWeight="bold">
        How it works! <em>(and some rules)</em>
      </Box>
      <hr />
      <Box component="p" textAlign="justify" fontStyle="italic">
        1. Signup/Login to your account if you have not, and set up payment
        details in your account page.
        <br />
        <br />
        2. Head on over to Courtyard to start browsing for available tennis
        courts and make your bookings!
        <br />
        <br />
        3. When you pay, the money is held with Courtship™. Payment will only be
        released to the renter after booking is completed.
        <br />
        <br />
        4. In the event of wet weather, the money will be refunded accordingly.
        <br />
        <br />
        5. As tennis courts are high in demand, the default cancellation policy
        is no refunds. Feel free to make your own arrangements with the renter!
        <br />
        <br />
        6. All listings will expire after a 2 week period. Check history to
        reactivate another 2 week long listing.
        <br />
        &nbsp;
      </Box>
    </Box>
  );
};

export default CourtshipRules;
