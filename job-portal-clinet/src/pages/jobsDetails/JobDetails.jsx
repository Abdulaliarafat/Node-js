import React from 'react';
import { Link, useLoaderData } from 'react-router';

const JobDetails = () => {
    const {title,_id,company}=useLoaderData()
    return (
        <div>
           <h1 className="text-xl font-bold">{company}</h1>
           <Link to={`/jobApplay/${_id}`} className="btn btn-primary">Applay now</Link>
        </div>
    );
};

export default JobDetails;