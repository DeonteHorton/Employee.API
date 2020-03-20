const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./app/routes/router');

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server at http://localhost:${PORT}`);
})

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//All routes

app.get('/',(req,res)=>{
    res.json({
    "All people":"http://localhost:3006/api/people",
      "Find by gender":"http://localhost:3006/api/people/gender/gender",
      "Find by First name": "http://localhost:3006/api/people/by_fname/fname",
      "Find by Last name": "http://localhost:3006/api/people/by_lname/lname"
    })
});
app.post('/post',(req,res)=>{
    console.log(req.body);
    res.json(req.body)
})

app.use('/api',router)