import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Layout from "./layout/layout";
import AddCourses from "./page/AddCourses";
import AddLessons from "./page/AddLessons";
import Users from "./page/Users";
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />}> */}
      <Route index element={<Login />}></Route>
      <Route path="/" element={<Layout />}>
        <Route path="/addCourses" element={<AddCourses />} />
        <Route path="addCourses/addLessons/:id" element={<AddLessons />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
