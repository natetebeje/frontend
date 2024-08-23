import React, { useState } from 'react';
import axios from 'axios';

function ResumeUpload({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/upload-resume/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Resume uploaded successfully');
            setLoading(false);
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            setMessage('Error uploading resume: ' + (error.response?.data?.detail || error.message));
            setLoading(false);
            console.error('Error:', error);
        }
    };

    return (
        <div className="resume-upload">
            <h3>Upload Resume</h3>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept=".pdf" />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
        </div>
    );
}

export default ResumeUpload;