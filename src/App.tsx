import {
  Box,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import image1 from "./assets/1.jpeg";
import image2 from "./assets/2.jpeg";
import image3 from "./assets/3.jpeg";
import image4 from "./assets/4.jpeg";
import image5 from "./assets/5.jpeg";
import image6 from "./assets/6.jpeg";
import image7 from "./assets/7.jpeg";
import image8 from "./assets/8.jpeg";
import image9 from "./assets/9.jpeg";
import image10 from "./assets/10.jpeg";
import image11 from "./assets/11.jpeg";
import image12 from "./assets/12.jpeg";
import image13 from "./assets/13.jpeg";
import image14 from "./assets/14.jpeg";
import image15 from "./assets/15.jpeg";
import image16 from "./assets/16.jpeg";
import image17 from "./assets/17.jpeg";
import image18 from "./assets/18.jpeg";
import { useState } from "react";
import { height } from "@mui/system";

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

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function App() {
  const [fileUrl, setFileUrl] = useState<any>();

  const [coloumnsFr, setColumnsFr] = useState<{ fr: string; size: string }>({
    fr: "1fr 1fr 1fr 1fr 1fr",
    size: "180px",
  });

  return (
    <Formik
      initialValues={{
        gallery: [
          { src: image1 },
          { src: image2 },
          { src: image3 },
          { src: image4 },
          { src: image5 },
          { src: image6 },
          { src: image7 },
          { src: image8 },
          { src: image9 },
          { src: image10 },
          { src: image11 },
          { src: image12 },
          { src: image13 },
          { src: image14 },
          { src: image15 },
          { src: image16 },
          { src: image17 },
          { src: image18 },
        ],
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      enableReinitialize={true}
      render={({ values, setFieldValue, handleSubmit }) => (
        <Form style={{ width: "100%" }}>
          <Box p={2} display="flex" justifyContent="center">
            <FormControl>
              <InputLabel id="demo-simple-select-label">
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
                sx={{ width: "200px", height: "60px" }}
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
              <Box
                // display="flex" p={4} flexWrap="wrap" gap={2}
                display="grid"
                gridTemplateColumns={coloumnsFr?.fr}
                // flex={3}
                // py={4}
                gap={2}
              >
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
                      // width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                      height="100%"
                      position="relative"
                    >
                      <img
                        src={v?.src}
                        alt=""
                        width={coloumnsFr?.size}
                        height={coloumnsFr?.size}
                      />
                      <Box
                        onClick={() => arrayHelpers.remove(index)}
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
                        <DeleteIcon sx={{ width: "60px", height: "60px" }} />
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
                    <AddIcon sx={{ width: "80px", height: "80px" }} />
                  </Box>
                </label>
              </Box>
            )}
          />
        </Form>
      )}
    />
  );
}

export default App;
