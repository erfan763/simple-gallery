import { Form, Formik } from "formik";

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

import Images from "./components/images";
import { Box, Divider } from "@mui/material";

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import CustomeDrawer from "./components/CustomeDrawer";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <>
      <ToastContainer style={{ width: "auto" }} position="top-right" />
      <Box>
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
          render={({ values, setFieldValue }) => (
            <Form
              style={{
                width: "100%",
                background: isDark ? "rgb(10, 25, 41)" : "unset",
                margin: 0,
                paddingBottom: 50,
                minHeight: "100vh",
              }}
            >
              {/* <Switch defaultChecked /> */}
              <Box dir="rtl" display="flex" height="64px" px={6} pt={2}>
                <CustomeDrawer isDark={isDark} setIsDark={setIsDark} />
              </Box>
              <Divider />

              <Images
                isDark={isDark}
                values={values}
                setFieldValue={setFieldValue}
              />
            </Form>
          )}
        />
      </Box>
    </>
  );
}

export default App;
