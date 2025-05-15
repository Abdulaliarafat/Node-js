const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(cors());
app.use(express.json());
// user:simpleDBuser
// pass:YAidU2aFWzlXRSoi
const uri = "mongodb+srv://simpleDBuser:YAidU2aFWzlXRSoi@cluster0.g02ycwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
        await client.connect();

        const userCollection=client.db('userdb').collection('user');

        app.get('/users', async(req,res)=>{
            const cursor=userCollection.find();
            const result=await cursor.toArray()
            res.send(result)
        })
        app.post('/users',async(req,res)=>{
            const newUser=req.body;
            const result=await userCollection.insertOne(newUser)
            res.send(result)
        })
        app.delete('/users/:id',(req,res)=>{
            console.log(req.params)
            const id=req.params.id
            console.log(id)
        })
        // ........optional just for confirmation is server running.........
        // await client.db('admin').command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('simple curd server is running')
})
app.listen(port, () => {
    console.log(`simple curd server running in port:${port}`)
})