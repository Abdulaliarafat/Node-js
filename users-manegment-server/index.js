const express=require('express');
const app=express();
const cors=require('cors');
const port=process.env.PORT || 3000;
app.use(cors())
app.get('/',(req,res)=>{
    res.send('users server is running')
})
app.get('/users',(req,res)=>{
    res.send(users)
})

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charls", email: "charlie@example.com" }
];


app.listen(port,()=>{
    console.log(`users server in running port:${port}`);
})