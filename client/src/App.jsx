import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Learn } from "./pages/Learn";
import { Register } from "./pages/Register";
import { Practice } from "./pages/Practice";
import PracticeDetails from "./pages/PracticeDetails";
import Layout from "./Layout";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/practice" element={<Practice />} />
              <Route
                path="/practiceDetails/:id"
                element={<PracticeDetails />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
