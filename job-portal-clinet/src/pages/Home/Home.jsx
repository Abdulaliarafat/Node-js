import React from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';
const jobsPromise=fetch('http://localhost:3000/jobs').then(res=>res.json())
const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HotJobs jobsPromise={jobsPromise}></HotJobs>
        </div>
    );
};

export default Home;