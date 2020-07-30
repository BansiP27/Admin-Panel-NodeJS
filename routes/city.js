var express = require('express');
var router = express.Router();

var db = require('../config/db');


// city start
router.get('/city_add', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  res.render('city/city_add', { myvalue: name, image: filename, email : email});
});


router.post('/city_add', function(req, res, next)
{
  const mybodydata = {
    city_name: req.body.city_name
  }

  db.query('insert into tbl_city set ?', mybodydata, function(err, result)
  {
    if(err)
    {
      console.log("Error in inserting data" + err.message);
    }
    else
    {
      res.redirect("/city/city_add");
    }
  });
});


router.get('/city_display_table', function(req, res, next) 
{
  db.query("select * from tbl_city ORDER BY city_name", function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render('city/city_display_table', { db_rows_array : db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/city_edit/:id', function(req, res)
{
  console.log("Edit id is: " + req.params.id);

  var id = req.params.id;
  db.query("select * from tbl_city where id = ?", [id], function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render("city/city_edit", { db_rows_array: db_rows, myvalue : name, image : filename, email : email });
  });
});


router.post('/city_edit/:id', function(req, res)
{
  console.log("Edit ID is: " + req.params.id);

  var id = req.params.id;
  var city_name = req.body.city_name;

  db.query("update tbl_city set city_name = ? where id = ?",[city_name, id], function(err, respond)
  {
    if(err) throw err;
    res.redirect("/city/city_display_table");
  })
});


router.get('/city_show/:id', function(req, res)
{
  var showid = req.params.id;

  console.log('ID is ' + showid);

  db.query("select * from tbl_city where id = ?",[showid], function(err, db_rows)
  {
    console.log(db_rows);
    if(err) throw err;

    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;

    res.render("city/city_show", {db_rows_array: db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/city_delete/:id', function(req, res)
{
  var deleteid = req.params.id;

  console.log("Deleted ID is " + deleteid);

  db.query("delete from tbl_city where id = ? ", [deleteid], function(err, db_rows)
  {
    if(err) throw err;

    // console.log(db_rows);
    console.log("Record Deleted");

    res.redirect("/city/city_display_table");
  })
});
// city end


module.exports = router;