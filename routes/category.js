var express = require('express');
var router = express.Router();

var db = require('../config/db');


// category start
router.get('/category_add', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  res.render('category/category_add', { myvalue: name, image: filename, email : email});
});


router.post('/category_add', function(req, res, next)
{
  const mybodydata = {
    category_name: req.body.category_name
  }

  db.query('insert into tbl_category set ?', mybodydata, function(err, result)
  {
    if(err)
    {
      console.log("Error in inserting data" + err.message);
    }
    else
    {
      res.redirect("/category/category_add");
    }
  });
});


router.get('/category_display_table', function(req, res, next) 
{
  db.query("select * from tbl_category ORDER BY category_name", function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render('category/category_display_table', { db_rows_array : db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/category_edit/:id', function(req, res)
{
  console.log("Edit id is: " + req.params.id);

  var id = req.params.id;
  db.query("select * from tbl_category where id = ?", [id], function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render("category/category_edit", { db_rows_array: db_rows, myvalue : name, image : filename, email : email });
  });
});


router.post('/category_edit/:id', function(req, res)
{
  console.log("Edit ID is: " + req.params.id);

  var id = req.params.id;
  var category_name = req.body.category_name;

  db.query("update tbl_category set category_name = ? where id = ?",[category_name, id], function(err, respond)
  {
    if(err) throw err;
    res.redirect("/category/category_display_table");
  })
});


router.get('/category_show/:id', function(req, res)
{
  var showid = req.params.id;

  console.log('ID is ' + showid);

  db.query("select * from tbl_category where id = ?",[showid], function(err, db_rows)
  {
    console.log(db_rows);
    if(err) throw err;

    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;

    res.render("category/category_show", {db_rows_array: db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/category_delete/:id', function(req, res)
{
  var deleteid = req.params.id;

  console.log("Deleted ID is " + deleteid);

  db.query("delete from tbl_category where id = ? ", [deleteid], function(err, db_rows)
  {
    if(err) throw err;

    // console.log(db_rows);
    console.log("Record Deleted");

    res.redirect("/category/category_display_table");
  })
});
// category end


module.exports = router;