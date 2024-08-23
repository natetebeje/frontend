import React from 'react';
   import { useParams } from 'react-router-dom';

   function JobApplication() {
     const { jobId } = useParams();

     return (
       <div>
         <h1>Job Application</h1>
         <p>This is a placeholder for the job application component for job ID: {jobId}</p>
       </div>
     );
   }

   export default JobApplication;