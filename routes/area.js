var express = require('express');
var router = express.Router();

var db = require('../config/db');


// area start
router.get('/area_add', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  db.query("select city_name from tbl_city",function(err, db_rows)
  {
    if(err) throw err;

  res.render('area/area_add', { myvalue: name, image: filename, db_rows_array: db_rows, email: email});
  });
});


router.post('/area_add', function(req, res, next)
{
  const mybodydata = {
    area_name: req.body.area_name,
    city_name: req.body.city_name
  }

  db.query('insert into tbl_area set ?', mybodydata, function(err, result)
  {
    if(err)
    {
      console.log("Error in inserting data" + err.message);
    }
    else
    {
      res.redirect("/area/area_add");
    }
  });
});


router.get('/area_display_table', function(req, res, next) 
{
  db.query("select * from tbl_area ORDER BY area_name", function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render('area/area_display_table', { db_rows_array: db_rows, myvalue: name, image: filename, email: email });
  });
});


router.get('/area_edit/:id', function(req, res)
{
  var id = req.params.id;
  db.query("select * from tbl_area where id = ?", [id], function(err, db_rows)
  {
    db.query("select * from tbl_city", function(err, db_city_rows)
    {
      if(err) throw err;
    
      var filename = req.session.filename;
      var name = req.session.name;
      var email = req.session.email;
    
      res.render("area/area_edit", { db_rows_array: db_rows, db_city_rows_array: db_city_rows, myvalue: name, image: filename, email: email });
    });
  });
});


router.post('/area_edit/:id', function(req, res)
{
  console.log("Edit ID is: " + req.params.id);

  var id = req.params.id;
  var area_name = req.body.area_name;
  var city_name = req.body.city_name;

  db.query("update tbl_area set area_name = ?, city_name = ? where id = ?", [area_name, city_name, id], function(err, result)
  {
    if(err) throw err;
    
    res.redirect("/area/area_display_table");
  })
});


router.get('/area_show/:id', function(req, res)
{
  var id = req.params.id;

  console.log('ID is ' + id);

  db.query("select * from tbl_area where id = ?",[id], function(err, db_rows)
  {
    console.log(db_rows);
    if(err) throw err;

    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;

    res.render("area/area_show", {db_rows_array: db_rows, myvalue: name, image: filename, email: email});
  });
});


router.get('/area_delete/:id', function(req, res)
{
  var id = req.params.id;

  console.log("Deleted ID is " + id);

  db.query("delete from tbl_area where id = ? ", [id], function(err, db_rows)
  {
    if(err) throw err;

    console.log("Record Deleted");

    res.redirect("/area/area_display_table");
  })
});
// area ends


module.exports = router;