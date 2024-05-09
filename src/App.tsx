import { Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage/HomePage";
import MainLayout from "./Layout/MainLayout";
import LoginPage from "./Page/Login/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeePage from "./Page/EmployeePage/EmployeePage";
import AddEmployeePage from "./Page/AddEmployeePage/AddEmployeePage";
import ViewEmployeePage from "./Page/ViewEmployeePage/ViewEmployeePage";
import ChangePasswordPage from "./Page/ChangePasswordPage/ChangePasswordPage";
import ForgetPasswordPage from "./Page/ForgetPassword/ForgetPasswordPage";
import AuthenticateLayout from "./Layout/AuthenticateLayout";
import PerfomancePage from "./Page/Perfomance/PerfomancePage";
import AttendancePage from "./Page/Attendance/AttendancePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/employee/add" element={<AddEmployeePage />} />
          <Route path="/employee/:id" element={<ViewEmployeePage />} />
          <Route path="/password/change" element={<ChangePasswordPage />} />
          <Route path="/perfomance" element={<PerfomancePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Route>
        <Route path="/" element={<AuthenticateLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/password/forget" element={<ForgetPasswordPage />} />
        </Route>
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
