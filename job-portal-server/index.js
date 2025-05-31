const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g02ycwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const jodsCollection=client.db("jobPortal").collection('jobs')

    const applicationCollection=client.db("jobPortal").collection('applications')

    app.get('/jobs',async(req,res)=>{
        const email=req.query.email;
        const query={}
        if(email){
          query.hr_email=email;
        }
        const result= await jodsCollection.find(query).toArray()
        res.send(result)
    })
    app.get('/jobs/applications',async(req,res)=>{
      const email=req.query.email;
      const query={hr_email:email}
      const jobs=await jodsCollection.find(query).toArray()
      // not right way
      for(const job of jobs){
        const applicationQuery={jobId:job._id.toString()};
        const applicationCount=await applicationCollection.countDocuments(applicationQuery)
        job.application_count=applicationCount
      }
      res.send(jobs)
    })
    app.get('/jobs/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const result=await jodsCollection.findOne(query);
      res.send(result);
    })
    app.post('/jobs',async(req,res)=>{
      const newJobs=req.body;
      console.log(newJobs)
      const result=await jodsCollection.insertOne(newJobs);
      res.send(result);
    })
    // job application API
    app.get('/applications',async(req,res)=>{
      const email=req.query.email;
      const query={
        applicant: email
      }
      const result=await applicationCollection.find(query).toArray();
      // bad way....
      for(const application of result){
        const jobId=application.jobId;
        const jobquery={_id:new ObjectId(jobId)};
        const job=await jodsCollection.findOne(jobquery);
        application.company=job.company
        application.title=job.title
        application.company_logo=job.company_logo
      }
      res.send(result)
    })
    // get for count application.
    app.get('/applications/job/:job_id',async(req,res)=>{
      const job_id=req.params.job_id;
      console.log(job_id);
      const query={jobId:job_id};
      const result=await applicationCollection.find(query).toArray();
      res.send(result);
    })
    app.post('/applications',async(req,res)=>{
    const application=req.body;
    console.log(application)
    const result=await applicationCollection.insertOne(application);
    res.send(result)
    })
    app.patch('/applications/:id',async(req,res)=>{
      const id=req.params.id;
      const filter={_id:new ObjectId(id)};
      const updateDoc={
        $set:{
          status:req.body.status
        }
      }
      const result=await applicationCollection.updateOne(filter,updateDoc);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment.You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('job prortal is ready to work');
});
app.listen(port,()=>{
    console.log(`Carrear code server is running on :${port}`);
});
