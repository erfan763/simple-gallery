import * as React from "react";

import Drawer from "@mui/material/Drawer";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type Anchor = "right";

export default function CustomeDrawer({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <Box sx={{}}>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            sx={{
              border: "2px solid",
              width: "40px",
              height: "40px",
              borderRadius: "5px",
            }}
            color="primary"
            aria-label="setting"
          >
            <SettingsIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              borderRadius: "10px",
              ".MuiDrawer-paper": {
                borderRadius: "15px 0px 0 15px",
                bgcolor: isDark ? "rgb(10, 25, 41)" : "#FFFFFF",
              },
            }}
          >
            <Box width={250}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <Typography color={isDark ? "#FFFFFF" : "unset"}>
                  Settings
                </Typography>

                <IconButton
                  onClick={toggleDrawer(anchor, false)}
                  color="primary"
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
            </Box>
            <Typography fontSize="0.8rem" color="rgb(111, 126, 140)" p={2}>
              Mode
            </Typography>
            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                sx={{
                  m: 0,
                  borderRadius: "10px 0px 0px 10px",
                  bgcolor: !isDark ? "rgb(240, 247, 255)" : "unset",
                  color: isDark ? "rgb(62, 80, 96)" : "primary",
                  borderColor: isDark ? "rgb(62, 80, 96)" : "primary",
                  "&:hover": {
                    bgcolor: !isDark ? "rgb(240, 247, 255)" : "unset",
                  },
                }}
                startIcon={<LightModeIcon />}
                onClick={() => setIsDark(false)}
              >
                Light
              </Button>
              <Button
                variant="outlined"
                sx={{
                  m: 0,
                  borderRadius: "0px 10px 10px 0px",
                  bgcolor: isDark ? "rgb(19, 47, 76)" : "unset",
                  color: !isDark ? "rgb(62, 80, 96)" : "primary",
                  borderColor: !isDark ? "rgb(62, 80, 96)" : "primary",
                  "&:hover": {
                    bgcolor: isDark ? "rgb(19, 47, 76)" : "unset",
                  },
                }}
                startIcon={<DarkModeIcon />}
                onClick={() => setIsDark(true)}
              >
                Dark
              </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
