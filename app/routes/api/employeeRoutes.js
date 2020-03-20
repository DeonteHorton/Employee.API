const daoClass = require('../../dao/employeeDao');
const Dao = new daoClass();

const express = require('express');
const router = express.Router();

// /api/cars/
router.get('/', (req, res) => {

    Dao.findAllPeople(req,res)
  });
  router.get('/removed', (req, res) => {

    Dao.findDeletedPeople(req,res)
  });
  
  router.get('/gender/:gender', (req, res) => {
  
    Dao.findByGender(req,res,req.params.gender)
  })
  
  
  router.get(`/by_fname/:fname`, (req, res) => {
  
    Dao.findByFirstName(req,res,req.params.fname)
  });
  
  router.get(`/by_lname/:lname`, (req, res) => {
  
    Dao.findByLastName(req,res,req.params.lname)
  });

  router.get(`/by_id/:id`, (req, res) => {
  
    Dao.findById(req,res,req.params.id)
  });
// /api/employee/post
  router.post('/update/:id',(req,res)=>{
    console.log(req.body);
    //res.json(req.body)
    Dao.updateById(req,res,req.params.id);
})
router.post('/delete/:id',(req,res)=>{
  console.log(req.params.id);
  //res.json(req.body)
  Dao.deleteById(req,res);
})
router.post('/undelete/:id',(req,res)=>{
  console.log(req.params.id);
  //res.json(req.body)
  Dao.unDeleteById(req,res);
})
router.post('/create',(req,res)=>{
  console.log(req.body);
  //res.json(req.body)
  Dao.create(req,res);
})

module.exports = router;