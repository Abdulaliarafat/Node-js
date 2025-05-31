import React, { Suspense } from 'react';
import useAuth from '../../Hooks/UseAuth';
import JobLists from './JobLists';
import { JobsCreatedByPromise } from '../../API/JobAPI';

const MyPostedJobs = () => {
     const {user}=useAuth()
    return (
        <div>
           <Suspense fallback={'loading....'}>
             <JobLists JobsCreatedByPromise={JobsCreatedByPromise(user.email)}></JobLists>
           </Suspense>
        </div>
    );
};

export default MyPostedJobs;