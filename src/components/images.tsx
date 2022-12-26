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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import { useState } from "react";
import { toast } from "react-toastify";

const Input = styled("input")({
  display: "none",
});

const coloumns = [
  { value: "1fr 1fr 1fr 1fr 1fr", number: 5, width: "15vw", height: "20vh" },
  {
    value: "1fr 1fr 1fr 1fr 1fr 1fr",
    number: 6,
    width: "12vw",
    height: "20vh",
  },
  {
    value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    number: 7,
    width: "10vw",
    height: "18vh",
  },
  {
    value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    number: 8,
    width: "8vw",
    height: "16vh",
  },
  {
    value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    number: 9,
    width: "6vw",
    height: "10vh",
  },
  {
    value: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    number: 10,
    width: "6vw",
    height: "10vh",
  },
];

export default function Images({
  isDark,
  setMyImage,
  myImage,
}: {
  isDark: boolean;
  setMyImage: React.Dispatch<React.SetStateAction<any[]>>;
  myImage: any[];
}) {
  const [fileUrl, setFileUrl] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [imageZoom, setImageZoom] = useState<any>();

  const [coloumnsFr, setColumnsFr] = useState<{
    fr: string;
    width: string;
    height: string;
  }>({
    fr: "1fr 1fr 1fr 1fr 1fr",
    width: "15vw",
    height: "20vh",
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
                width: String(d?.width),
                height: String(d?.height),
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

      <Box display="grid" gridTemplateColumns={coloumnsFr?.fr} gap={1}>
        {myImage?.map((v: any, index: any) => {
          if (fileUrl) {
            setMyImage([...myImage, { src: fileUrl.avatar }]);
            setFileUrl(undefined);
          }
          return (
            <Box
              key={index}
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
                  width: coloumnsFr?.width,
                  height: coloumnsFr?.height,
                  border: isDark ? "solid 4px #FFFFFF" : "solid 2px #000000",
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
                    setMyImage(myImage.filter((a) => a.src !== v.src));
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
            <AddIcon color="primary" sx={{ width: "80px", height: "80px" }} />
          </Box>
        </label>
      </Box>
    </>
  );
}
