import { Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage/HomePage";
import MainLayout from "./Layout/MainLayout";
import LoginPage from "./Page/Login/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeePage from "./Page/EmployeePage/EmployeePage";
import AddEmployeePage from "./Page/AddEmployeePage/AddEmployeePage";
import ViewEmployeePage from "./Page/ViewEmployeePage/ViewEmployeePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/employee/add" element={<AddEmployeePage />} />
          <Route path="/employee/:id" element={<ViewEmployeePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
