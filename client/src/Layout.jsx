import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Toaster } from "react-hot-toast";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#0C0A09", // replace '#yourColor' with your desired color
    },
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {
        <div className="font-roboto min-h-screen w-full flex-col">
          <Toaster position="bottom-right" />
          <div>
            <Navbar />
          </div>
          <Divider />
          <Outlet />
        </div>
      }
    </ThemeProvider>
  );
}
