const pool = require('../config/dbconfig')

class EmployeeDao {
  constructor(){
      this.pool = pool
  }
  updateById(req,res){
    let fields = Object.keys(req.body);
    let values = Object.values(req.body);

    // if no id: return 
    // if no data to update : return
    // if id but no data : return
    if (!req.params.id) {
      res.json({
        "error":true,
        "message":'Missing ID'
      })
    } else if (fields.length == 0){
      res.json({
        "error":true,
        "message":'No fields to update'
      })
    }


    let sql = `UPDATE people SET ${fields.join('=?,')} = ?,updated_at=NOW() Where id = ?`
    this.pool.query(sql,[...values,req.params.id], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  
  }

  create(req,res){
    // required min data
    if (!req.body.fname || !req.body.lname) {
      res.json({
        "error":true,
        "message":"Missing Data"
      })
    };

    let fields = Object.keys(req.body);
    let values = Object.values(req.body);
          
      
    let sql = `INSERT into people (${fields.join(',')}) values (${Array(values.length - 1).fill('?').join(',')},CURRENT_TIMESTAMP())`

    this.pool.query(sql,values,
      function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  
  }
  
  run = (req,res,sql)  => {
    pool.query(sql,function (error,rows) {
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  };

  findAllPeople(req,res){
    let sql ='SELECT * from people where deleted_at is NULL';
    
    this.pool.query(sql, function (error,rows){
        if (error) {
          res.json({
            "error":true,
            "message":error
          })
        };
        res.json(rows)
    })
  }
  findDeletedPeople(req,res){
    let sql ='SELECT * from people where deleted_at IS NOT NULL';

    this.pool.query(sql, function (error,rows){
        if (error) {
          res.json({
            "error":true,
            "message":error
          })
        };
        res.json(rows)
    })
  }
  
  findByGender(req,res,gender){
    let sql =`SELECT * from people where gender = ? AND deleted_at is NULL`

    this.pool.query(sql,[gender], function (error,rows){
        if (error) {
          res.json({
            "error":true,
            "message":error
          })
        };
        res.json(rows)
    })
  }


  findByFirstName(req,res,fname){
    let sql = `SELECT * from people WHERE fname = ? AND deleted_at is NULL`;

    this.pool.query(sql,[fname], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }

  findByLastName(req,res,lname){
    let sql = `SELECT * from people WHERE lname = ? AND deleted_at is NULL`;

    this.pool.query(sql,[lname], function (error,rows){
      if (error) {
          res.json({
            "error":true,
            "message":error
          })
      };
      res.json(rows)
    })
  }
  findById(req,res,id){
    let sql = `SELECT * from people WHERE id = ? AND deleted_at is NULL`;

    this.pool.query(sql,[id], function (error,rows){
      if (error) {
          res.json({
            "error":true,
            "message":error
          })
      };
      res.json(rows)
    })
  }
  deleteById(req,res){
    let sql = `UPDATE people set deleted_at = NOW() WHERE id = ?`;

    this.pool.query(sql,[req.params.id], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }

  unDeleteById(req,res,id){
    let sql = `UPDATE people set deleted_at = NULL WHERE id = ?`;

    this.pool.query(sql,[req.params.id], function (error,rows){
      if (error) {
        res.json({
          "error":true,
          "message":error
        })
      };
      res.json(rows)
    })
  }
    
}
  
module.exports = EmployeeDao;