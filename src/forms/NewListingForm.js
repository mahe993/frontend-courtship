import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { returnFileSize, validateFileType } from "../constants";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";

const NewListingForm = () => {
  const [displayPictureFiles, setDisplayPictureFiles] = useState([]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    resetField,
    formState: { errors, isValid },
  } = useForm({ delayError: 800, mode: "onChange" });

  const onSubmit = (data) => console.log(getValues("courtPictures"));

  const onError = (err) => console.log(err);

  useEffect(() => {
    clearErrors("courtPictures");
    const pictureFiles = watch("courtPictures");
    const fileArr = [];
    if (pictureFiles.length > 5) {
      return setError("courtPictures", {
        type: "custom",
        message: "Maximum number of file uploads is 5.",
      });
    }
    if (displayPictureFiles.length + pictureFiles.length > 5) {
      return setError("courtPictures", {
        type: "custom",
        message: `You can only add ${5 - displayPictureFiles.length} more!`,
      });
    }
    for (const file of pictureFiles) {
      if (validateFileType(file)) {
        fileArr.push({
          name: file.name,
          size: returnFileSize(file.size),
          path: URL.createObjectURL(file),
        });
      } else {
        return setError("courtPictures", {
          type: "custom",
          message: `${file.name} not a valid file type`,
        });
      }
    }
    setDisplayPictureFiles([...displayPictureFiles, ...fileArr]);
  }, [watch("courtPictures")]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <label
            htmlFor="courtName"
            css={css`
              min-width: 20%;
              text-align: end;
              font-size: 10px;
            `}
          >
            Name:
          </label>
          <input
            id="courtName"
            type="text"
            placeholder="Court Name"
            {...register("courtName", { required: "This field is required!" })}
            css={css`
              padding: 3px;
              font-size: 10px;
              min-width: 75%;
              ::placeholder {
                font-size: 10px;
                font-style: italic;
              }
            `}
          />
        </Box>
        {errors.courtName && (
          <Box
            fontSize={7}
            color="red"
            mt={-1}
            width="60vw"
            pl="14.5vw"
            textAlign="start"
          >
            {errors.courtName.message}
          </Box>
        )}
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <label
            htmlFor="address"
            css={css`
              min-width: 20%;
              text-align: end;
              font-size: 10px;
            `}
          >
            Address:
          </label>
          <input
            id="address"
            type="text"
            placeholder="Teban Gardens BLK 150 #01-123 S123456"
            {...register("address", { required: "This field is required!" })}
            css={css`
              font-size: 10px;
              min-width: 75%;
              padding: 3px;
              ::placeholder {
                font-size: 10px;
                font-style: italic;
              }
            `}
          />
        </Box>
        {errors.address && (
          <Box
            fontSize={7}
            color="red"
            mt={-1}
            width="60vw"
            pl="14.5vw"
            textAlign="start"
          >
            {errors.address.message}
          </Box>
        )}
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <label
            htmlFor="description"
            css={css`
              min-width: 20%;
              text-align: end;
              font-size: 10px;
            `}
          >
            Description:
          </label>
          <textarea
            id="description"
            rows={5}
            cols={25}
            placeholder={`Give a short description of the court!\n\nE.g. surface type/condition/specific details to get to the court etc!`}
            {...register("description", {
              required: "This field is required!",
            })}
            css={css`
              padding: 3px;
              resize: none;
              font-size: 10px;
              min-width: 75%;
              ::placeholder {
                font-size: 10px;
                font-style: italic;
              }
            `}
          />
        </Box>
        {errors.description && (
          <Box
            fontSize={7}
            color="red"
            mt={-1}
            width="60vw"
            pl="14.5vw"
            textAlign="start"
          >
            {errors.description.message}
          </Box>
        )}
        <Box>
          <label
            htmlFor="courtPictures"
            css={css`
              font-size: 10px;
              cursor: pointer;
            `}
          >
            <input
              accept=".jpg, .jpeg, .png"
              id="courtPictures"
              multiple
              type="file"
              onChange={(e) => console.log(e.target.files)}
              {...register("courtPictures")}
              css={css`
                display: none;
                font-size: 10px;
              `}
              disabled={displayPictureFiles.length === 5}
            />
            Add tennis court pictures <EditIcon fontSize="inherit" /> (max. 5)
          </label>
          {/* validate file count <=5 on change */}
        </Box>
        {errors.courtPictures && (
          <Box
            fontSize={7}
            color="red"
            mt={-1}
            width="175px"
            textAlign="center"
          >
            {errors.courtPictures.message}
          </Box>
        )}
        {displayPictureFiles[0] &&
          displayPictureFiles.map((file, index) => (
            <Box
              key={index}
              width="400px"
              alignItems="center"
              justifyContent="start"
              display="flex"
              gap={2}
            >
              <Box width="90px" display="flex" alignItems="center">
                <img
                  src={file.path}
                  alt={file.name}
                  width="90px"
                  height="60px"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                minWidth="50%"
                fontSize={8}
              >
                <Box>
                  Name: {file.name.slice(0, 50)}
                  {file.name.slice(50) && "..."}
                </Box>
                <Box>Size: {file.size}</Box>
              </Box>
              <Box
                ml="auto"
                onClick={() => {
                  displayPictureFiles.splice(index, 1);
                  clearErrors("courtPictures");
                  setDisplayPictureFiles([...displayPictureFiles]);
                }}
              >
                <CloseIcon />
              </Box>
            </Box>
          ))}
        <input type="submit" disabled={!isValid} />
      </Box>
    </form>
  );
};
export default NewListingForm;
