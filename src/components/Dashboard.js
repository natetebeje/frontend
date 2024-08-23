import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResumeUpload from './ResumeUpload';
import JobList from './JobList';
import ApplicationList from './ApplicationList';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/dashboard/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setDashboardData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    const recentJobMatches = dashboardData?.recent_job_matches || [];
    const recentApplications = dashboardData?.recent_applications || [];
    const applicationStats = dashboardData?.application_stats || {};
    const unreadNotificationsCount = dashboardData?.unread_notifications_count ?? 0;

    return (
        <div className="dashboard">
            <h1>Job Application System</h1>
            <ResumeUpload onUploadSuccess={fetchDashboardData} />
            <JobList jobs={recentJobMatches} />
            <ApplicationList applications={recentApplications} />
            <div className="stats">
                <h2>Application Stats</h2>
                {Object.entries(applicationStats).map(([status, count]) => (
                    <p key={status}>{status}: {count}</p>
                ))}
            </div>
            <div className="notifications">
                <h2>Notifications</h2>
                <p>You have {unreadNotificationsCount} unread notifications</p>
            </div>
        </div>
    );
}

export default Dashboard;
