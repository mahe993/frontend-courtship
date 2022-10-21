import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Alert, Box, Snackbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { BACKEND_URL, returnFileSize, validateFileType } from "../constants";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const NewListingForm = ({ setOpenForm, setSnackBarOpen }) => {
  const [displayPictureFiles, setDisplayPictureFiles] = useState([]);

  // react-hook-form methods
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({ delayError: 500, mode: "onChange" });

  // post court listing
  const postCourtListing = async () => {
    try {
      // create new court row
      const res = await axios({
        method: "post",
        url: `${BACKEND_URL}/courts`,
        data: {
          courtName: getValues("courtName"),
          address: getValues("address"),
          description: getValues("description"),
          price: Number(getValues("price")),
          //userID get from auth0
          userId: `${2}`,
        },
      });
      // check if pictures avail for upload, if so update court row with pic url
      if (displayPictureFiles[0]) {
        const formData = new FormData();
        displayPictureFiles.forEach((pic) => formData.append("pictures", pic));
        try {
          const picRes = await axios({
            method: "post",
            url: `${BACKEND_URL}/firebase/courtpics/${res.data.id}`,
            data: formData,
          });
          console.log(picRes);
        } catch (err) {
          throw new Error(err);
        }
      }
      // close listing form
      setOpenForm(false);
      // open snackbar
      setSnackBarOpen(true);
    } catch (err) {
      throw new Error(err);
    }
  };

  // handleSubmit callback fns
  const onSubmit = (data) => {
    //post to DB
    postCourtListing();
  };
  const onError = (err) => {
    throw new Error(err);
  };

  // show picture preview of files to be uploaded and error validate max 5 pictures
  const fileUploadPreview = () => {
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
        fileArr.push(file);
      } else {
        return setError("courtPictures", {
          type: "custom",
          message: `${file.name} not a valid file type`,
        });
      }
    }
    setDisplayPictureFiles([...displayPictureFiles, ...fileArr]);
  };

  useEffect(() => {
    fileUploadPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("courtPictures")]);

  // reset form after successful submit
  useEffect(() => {
    reset();
    setDisplayPictureFiles([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

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
              width: 10%;
              min-width: 60px;
              text-align: end;
              font-size: 10px;
            `}
          >
            Name:
          </label>
          <input
            autoComplete="off"
            id="courtName"
            type="text"
            placeholder="Court Name"
            {...register("courtName", {
              required: "This field is required!",
            })}
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
              width: 10%;
              min-width: 60px;
              text-align: end;
              font-size: 10px;
            `}
          >
            Address:
          </label>
          <input
            autoComplete="off"
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
              width: 10%;
              min-width: 60px;
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
        <Box
          display="flex"
          gap={1}
          minWidth="40vw"
          width="60vw"
          alignItems="center"
          justifyContent="center"
        >
          <label
            htmlFor="price"
            css={css`
              width: 10%;
              min-width: 60px;
              text-align: end;
              font-size: 10px;
            `}
          >
            Price ($):
          </label>
          <input
            autoComplete="off"
            id="price"
            type="text"
            placeholder="$ per hour"
            {...register("price", {
              required: "This field is required!",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please only enter round numbers!",
              },
              max: {
                value: 999,
                message: "Highest possible charge is $999/hr",
              },
            })}
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
        {errors.price && (
          <Box fontSize={7} color="red" mt={-1} width="60vw" textAlign="center">
            {errors.price.message}
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
          displayPictureFiles.map((file, index) => {
            const path = URL.createObjectURL(file);
            const size = returnFileSize(file.size);
            return (
              <Box
                key={index}
                width="400px"
                alignItems="center"
                justifyContent="start"
                display="flex"
                gap={2}
              >
                <Box width="90px" display="flex" alignItems="center">
                  <img src={path} alt={file.name} width="90px" height="60px" />
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
                  <Box>Size: {size}</Box>
                </Box>
                <Box
                  ml="auto"
                  onClick={() => {
                    displayPictureFiles.splice(index, 1);
                    clearErrors("courtPictures");
                    setDisplayPictureFiles([...displayPictureFiles]);
                  }}
                  css={css`
                    cursor: pointer;
                  `}
                >
                  <CloseIcon />
                </Box>
              </Box>
            );
          })}
        <input type="submit" disabled={!isValid} />
      </Box>
    </form>
  );
};
export default NewListingForm;
