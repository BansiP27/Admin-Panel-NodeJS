var express = require('express');
var router = express.Router();

var db = require('../config/db');


// sub-category start
router.get('/subcategory_add', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  db.query("select category_name from tbl_category",function(err, db_rows){
    if(err) throw err;

  res.render('subcategory/subcategory_add', { myvalue: name, image: filename, db_rows_array:db_rows, email : email});
});
});


router.post('/subcategory_add', function(req, res, next)
{
  const mybodydata = {
    sub_category_name: req.body.sub_category_name,
    category_name: req.body.category_name
  }

  db.query('insert into tbl_subcategory set ?', mybodydata, function(err, result)
  {
    if(err)
    {
      console.log("Error in inserting data" + err.message);
    }
    else
    {
      res.redirect("/subcategory/subcategory_add");
    }
  });
});


router.get('/subcategory_display_table', function(req, res, next) 
{
  db.query("select * from tbl_subcategory ORDER BY sub_category_name", function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render('subcategory/subcategory_display_table', { db_rows_array : db_rows, myvalue : name, image : filename, email : email });
  });
});


router.get('/subcategory_edit/:id', function(req, res)
{
  var id = req.params.id;
  db.query("select * from tbl_subcategory where id = ?", [id], function(err, db_rows)
  {
    db.query("select * from tbl_category", function(err, db_category_rows){

    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render("subcategory/subcategory_edit", { db_rows_array : db_rows, db_category_rows_array: db_category_rows, myvalue : name, image : filename, email : email });
    });
  });
});


router.post('/subcategory_edit/:id', function(req, res)
{
  console.log("Edit ID is: " + req.params.id);

  var id = req.params.id;
  var sub_category_name = req.body.sub_category_name;
  var category_name = req.body.category_name;

  db.query("update tbl_subcategory set sub_category_name = ?, category_name = ? where id = ?",[sub_category_name, category_name, id], function(err, result)
  {
    if(err) throw err;
    console.log(result);
    res.redirect("/subcategory/subcategory_display_table");
  })
});


router.get('/subcategory_show/:id', function(req, res)
{
  var id = req.params.id;

  console.log('ID is ' + id);

  db.query("select * from tbl_subcategory where id = ?",[id], function(err, db_rows)
  {
    console.log(db_rows);
    if(err) throw err;

    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;

    res.render("subcategory/subcategory_show", {db_rows_array: db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/subcategory_delete/:id', function(req, res)
{
  var id = req.params.id;

  console.log("Deleted ID is " + id);

  db.query("delete from tbl_subcategory where id = ? ", [id], function(err, db_rows)
  {
    if(err) throw err;

    console.log("Record Deleted");

    res.redirect("/subcategory/subcategory_display_table");
  })
});
// subcategory ends



module.exports = router;