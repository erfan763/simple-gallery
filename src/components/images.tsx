import {
  Avatar,
  Box,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { FieldArray } from "formik";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import { useState } from "react";
import { TonalitySharp } from "@mui/icons-material";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});

const coloumns = [
  { value: "1fr 1fr 1fr 1fr 1fr", number: 5, size: "180px" },
  { value: "1fr 1fr 1fr 1fr 1fr 1fr", number: 6, size: "150px" },
  { value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr", number: 7, size: "140px" },
  { value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", number: 8, size: "130px" },
  { value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", number: 9, size: "120px" },
  {
    value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    number: 10,
    size: "110px",
  },
  {
    value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    number: 11,
    size: "80px",
  },
];

export default function Images({
  values,
  setFieldValue,
  isDark,
}: {
  values: {
    gallery: {
      src: string;
    }[];
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  isDark: boolean;
}) {
  const [fileUrl, setFileUrl] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [imageZoom, setImageZoom] = useState<any>();

  const [coloumnsFr, setColumnsFr] = useState<{ fr: string; size: string }>({
    fr: "1fr 1fr 1fr 1fr 1fr",
    size: "180px",
  });

  const handleClose = () => {
    setOpen(false);
    setImageZoom(undefined);
  };
  const handleOpen = (i: any) => {
    setOpen(true);
    setImageZoom(i);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Avatar
          variant="rounded"
          src={imageZoom}
          sx={{ width: "500px", height: "500px" }}
        />
      </Dialog>
      <Box
        p={2}
        sx={{ ".css-yf8vq0-MuiSelect-nativeInput": { borderColor: "#1976d2" } }}
        display="flex"
        justifyContent="center"
      >
        <FormControl
          sx={{
            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#FFFFFF" : "unset",
            },
            ".css-luqecx-MuiFormControl-root .css-1d3z3hw-MuiOutlinedInput-notchedOutline":
              {
                "&:hover": {
                  borderColor: isDark ? "#FFFFFF" : "unset",
                },
                borderColor: isDark ? "#FFFFFF" : "unset",
              },
          }}
        >
          <InputLabel
            id="demo-simple-select-label"
            sx={{ color: isDark ? "rgba(255, 255, 255, 0.7)" : "" }}
            // sx={{ color: isDark ? "primary" : "unset" }}
          >
            Image per row
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={coloumnsFr.fr}
            onChange={(e) => {
              const d = coloumns?.find((i) => i?.value === e.target.value);
              setColumnsFr({
                fr: String(e.target.value),
                size: String(d?.size),
              });
            }}
            label="image per row"
            sx={{
              width: "200px",
              height: "60px",
              ".MuiSelect-outlined": { color: isDark ? "#FFFFFF" : "unset" },
            }}
          >
            {coloumns?.map((i, idx) => {
              return <MenuItem value={i?.value}>{i?.number}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <FieldArray
        name="gallery"
        render={(arrayHelpers) => (
          <Box display="grid" gridTemplateColumns={coloumnsFr?.fr} gap={2}>
            {values?.gallery.map((v: any, index) => {
              if (fileUrl) {
                setFieldValue(
                  `gallery[${values?.gallery?.length - 1}].src`,
                  fileUrl?.avatar
                );
                setFileUrl(undefined);
              }
              return (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                  height="100%"
                  position="relative"
                >
                  <Avatar
                    src={v?.src}
                    alt=""
                    sx={{
                      width: coloumnsFr?.size,
                      height: coloumnsFr?.size,
                      border: isDark
                        ? "solid 4px #FFFFFF"
                        : "solid 2px #000000",
                      boxShadow: "0 1px 3px rgba(34, 25, 25, 0.4)",
                    }}
                    variant="rounded"
                  />
                  <Box
                    sx={{
                      "&:hover": {
                        zIndex: 10,
                        opacity: 1,
                        cursor: "pointer",
                      },
                      opacity: 0,
                    }}
                    top="0"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    position="absolute"
                  >
                    <Box
                      onClick={() => {
                        arrayHelpers.remove(index);
                        toast.success("Image deleted successfully");
                      }}
                    >
                      <DeleteIcon sx={{ width: "45px", height: "45px" }} />
                    </Box>
                    <Box onClick={() => handleOpen(v.src)}>
                      <ZoomInIcon sx={{ width: "45px", height: "45px" }} />
                    </Box>
                  </Box>
                </Box>
              );
            })}
            <label htmlFor="h">
              <Input
                accept="image/*"
                id="h"
                name="files"
                multiple
                type="file"
                color="info"
                onChange={(e: any) => {
                  const avatar = e.target.files && e.target.files[0];
                  const imageUrl = URL.createObjectURL(avatar);
                  setFileUrl({ avatar: imageUrl });
                  arrayHelpers.push({ src: "" });
                  toast.success("Image added successfully");
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <AddIcon
                  color="primary"
                  sx={{ width: "80px", height: "80px" }}
                />
              </Box>
            </label>
          </Box>
        )}
      />
    </>
  );
}
