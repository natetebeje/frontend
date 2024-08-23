// JobList.js
import React from 'react';
import axios from 'axios';

function JobList({ jobs }) {
    const applyToJob = async (jobId) => {
        try {
            await axios.post(`http://localhost:8000/apply-job/${jobId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error applying to job:', error);
            alert('Failed to submit application. Please try again.');
        }
    };

    return (
        <div className="job-list">
            <h2>Recent Job Matches</h2>
            {jobs.map(job => (
                <div key={job.job_id} className="job-item">
                    <h3>{job.title}</h3>
                    <p>Company: {job.company}</p>
                    <p>Match Score: {job.match_score}</p>
                    <p>Remote: {job.is_remote ? 'Yes' : 'No'}</p>
                    <p>Matching Skills: {job.matching_skills.join(', ')}</p>
                    <button onClick={() => applyToJob(job.job_id)}>Apply</button>
                </div>
            ))}
        </div>
    );
}

export default JobList;
