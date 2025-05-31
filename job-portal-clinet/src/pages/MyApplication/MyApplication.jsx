import React, { Suspense } from 'react';
import ApplicationStac from './ApplicationStac';
import ApplicationList from './ApplicationList';
import useAuth from '../../Hooks/UseAuth';
import { myApplicationPromise } from '../../API/Application';

const MyApplication = () => {
    const {user}=useAuth()
    return (
        <div>
            <ApplicationStac></ApplicationStac>
           <Suspense fallback={'loading........'}>
             <ApplicationList myApplicationPromise={myApplicationPromise(user.email)}></ApplicationList>
           </Suspense>
        </div>
    );
};

export default MyApplication;