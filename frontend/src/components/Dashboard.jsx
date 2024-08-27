import React, { useState } from "react";
import UploadFile from "./UploadFile";
import FileList from "./FileList";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import { isTokenExpired, removeToken } from "../utils/tokenUtils";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [refreshFiles, setRefreshFiles] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeToken();
    dispatch(logout());
    window.location.href = "/login";
  };

  if (!user) return <div>Please log in to access this page.</div>;
  if (isTokenExpired()) {
    handleLogout();
    return <div>Session expired. Please log in again.</div>;
  }
  const handleFileUploadSuccess = () => {
    setRefreshFiles((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card">
          <UploadFile onSuccess={handleFileUploadSuccess} />
          <div className="my-4">
            <FileList refreshFiles={refreshFiles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
