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