import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import fileDownload from "react-file-download";
import handleUnauthorized from "../utils/handleUnauthorized";

const FileList = ({ refreshFiles }) => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dashboard/files`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setFiles(response.data.files);
      } catch (error) {
        handleUnauthorized(error, dispatch);
      }
    };

    fetchFiles();
  }, [dispatch, refreshFiles]);

  const downloadFile = async (filename) => {
    try {
      const response = await axios({
        url: `${apiUrl}/dashboard/files/${filename}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fileDownload(response.data, filename);
    } catch (error) {
      handleUnauthorized(error, dispatch);
    }
  };

  const deleteFile = async (filename) => {
    try {
      await axios.delete(`${apiUrl}/dashboard/files/${filename}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setFiles(files.filter((file) => file.filename !== filename));
    } catch (error) {
      handleUnauthorized(error, dispatch);
    }
  };

  return (
    <div className="">
    <div className="">
        <div className="header">
            {/* <h2>File List</h2> */}
        </div>
        <ul>
            {files.map((file) => (
                <li key={file.filename} className="d-flex justify-space-between gap-2">
                    {file.filename}
                    <div>
                        <button
                            onClick={() => downloadFile(file.filename)}
                            className="btn btn-secondary"
                        >
                            Download
                        </button>
                        <button
                            onClick={() => deleteFile(file.filename)}
                            className="btn btn-secondary"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
</div>
  );
};

export default FileList;
