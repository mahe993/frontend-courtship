import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import Manifesto from "../components/Manifesto";
import map from "../assets/images/map.png";
import federer from "../assets/images/federer.png";
import djoko from "../assets/images/djoko.png";
import nadal from "../assets/images/nadal.png";
import mahe from "../assets/images/mahe.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import instagram from "../assets/images/instagram.png";
import youtube from "../assets/images/youtube.png";
import facebook from "../assets/images/facebook.png";
import linkedin from "../assets/images/linkedin.png";

const AboutUsPage = () => {
  const cards = [
    { url: federer, title: "DIRECTOR", desc: "Retired couple months ago!" },
    {
      url: djoko,
      title: "CEO",
      desc: "The youngest of our 3 legendary C-suite!",
    },
    { url: nadal, title: "CTO", desc: "About to retire" },
    { url: mahe, title: "FOUNDER", desc: "Founder of this operation!" },
  ];

  return (
    <>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={2}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <Manifesto />
      </Box>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={2}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <h1>Location</h1>
        <Box
          pt={1}
          pb={1}
          width="90%"
          m="auto"
          display="flex"
          gap={2}
          justifyContent="center"
        >
          <Box width="200px">
            <img src={map} alt="map" width="100%" />
          </Box>
          <Box textAlign="start">
            This is where our HQ is situated!
            <br />
            Feel free to drop by whenever!
            <br />
            <br />
            You can take an aeroplane to Mexico/Guatamela,
            <br />
            Hop on to any ferry which is available.
            <br />
            <br />
            Quote "Courtship" to get 50% off your ferry ride!
          </Box>
        </Box>
      </Box>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={2}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
      >
        <h1>Team</h1>
        <Box
          width="90%"
          m="auto"
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
          pb={1}
          pt={1}
        >
          {cards.map((card, i) => (
            <Box key={i}>
              <Card sx={{ maxWidth: 150, minHeight: 260 }}>
                <CardMedia component="img" image={card.url} alt="faces" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        width="75%"
        textAlign="center"
        m="auto"
        mt={2}
        borderRadius="10px"
        bgcolor="rgba(0, 0, 0, 0.4)"
        minWidth="345px"
        mb={2}
      >
        <h1>Socials</h1>
        <Box
          width="90%"
          m="auto"
          display="flex"
          justifyContent="center"
          pt={1}
          gap={8}
          flexWrap="wrap"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
            flexDirection="column"
          >
            <LinkedInIcon fontSize="large" />
            <Box width={70}>
              <img src={linkedin} alt="qrcode" width="100%" />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
            flexDirection="column"
          >
            <InstagramIcon fontSize="large" />
            <Box width={70}>
              <img src={instagram} alt="qrcode" width="100%" />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
            flexDirection="column"
          >
            <YouTubeIcon fontSize="large" />
            <Box width={70}>
              <img src={youtube} alt="qrcode" width="100%" />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
            flexDirection="column"
          >
            <FacebookIcon fontSize="large" />
            <Box width={70}>
              <img src={facebook} alt="qrcode" width="100%" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AboutUsPage;
