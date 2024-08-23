
// ApplicationList.js
import React from 'react';

function ApplicationList({ applications }) {
    return (
        <div className="application-list">
            <h2>Recent Applications</h2>
            {applications.map(app => (
                <div key={app.id} className="application-item">
                    <p>Job ID: {app.job_id}</p>
                    <p>Status: {app.status}</p>
                    <p>Applied Date: {new Date(app.applied_date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

export default ApplicationList;