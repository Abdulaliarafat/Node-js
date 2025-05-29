import React from 'react';
import { Link, useParams } from 'react-router';
import useAuth from '../../Hooks/UseAuth';


const JobApplay = () => {
    const { user } = useAuth()
    const job = useParams();
    console.log(user)
    const handleApplyForm=(e)=>{
        e.preventDefault()
        const form=e.target;
        const linkdin=form.linkdin.value;
        const github=form.github.value;
        const resume=form.resume.value;
         console.log(linkdin,github,resume)
    }
    return (
        <div className='max-w-4xl mx-auto'>
            <h1 className="text-4xl mb-5">Apply for this job : <Link className='text-blue-500' to={`/jobDetails/${job}`}>JOB</Link></h1>
            <form onSubmit={handleApplyForm}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 space-y-3 my-5">

                    <label className="label ml-40">LinkdIn link</label>
                    <input type="url" name='linkdin' className="input w-xl mx-auto p-5" placeholder="LinkdIn profile link" />

                    <label className="label ml-40">Github link</label>
                    <input type="url" name='github' className="input w-xl mx-auto p-5" placeholder="Github link" />

                    <label className="label ml-40">Resume link</label>
                    <input type="url" name='resume' className="input w-xl mx-auto p-5" placeholder="Resume link" />
                    <input type="submit"  className='btn btn-primary w-sm mx-auto' value="Apply" />
                </fieldset>
            </form>
        </div>
    );
};

export default JobApplay;