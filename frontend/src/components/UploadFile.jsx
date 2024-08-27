import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = ({onSuccess}) => {
    const [file, setFile] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`${apiUrl}/dashboard/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setFile(null);
            alert("File Uploaded Successfully");
            onSuccess();
        } catch (error) {
            alert('Error uploading file');
        }
    };

    return (
        <div className="">
            <div className="">
                <div className="header">
                    <h2>Upload File</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-column">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="input"
                    />
                    <button type="submit" className="btn btn-primary">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadFile;