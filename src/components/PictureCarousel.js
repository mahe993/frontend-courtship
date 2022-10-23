import React from "react";
import Carousel from "react-material-ui-carousel";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const PictureCarousel = ({ pictures }) => {
  return (
    <Carousel
      autoPlay={false}
      animation="fade"
      sx={{ width: "100%", height: "100%" }}
      className="carousel"
      indicatorContainerProps={{
        style: {
          marginTop: "0px",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "lightgreen",
        },
      }}
      indicatorIconButtonProps={{
        style: {
          padding: "0px",
          color: "darkred",
          fontSize: "xs",
        },
      }}
      IndicatorIcon={
        <FiberManualRecordIcon sx={{ width: "10px", height: "10px" }} />
      }
    >
      {pictures.map((picture) => (
        <Box height="53vh" key={picture.firebasePath}>
          <img
            key={picture.firebasePath}
            src={picture.downloadUrl}
            alt="tennis court"
            css={css`
              width: 100%;
              height: 100%;
              padding: 0 auto;
            `}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default PictureCarousel;
