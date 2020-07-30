var express = require('express');
var router = express.Router();

var db = require('../config/db');


// feedback start
router.get('/feedback_add', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  db.query("select sub_category_name from tbl_subcategory",function(err, db_rows){
    if(err) throw err;

  res.render('feedback/feedback_add', { myvalue: name, db_rows_array:db_rows, image: filename, email : email});
});  
});


router.post('/feedback_add', function(req, res, next)
{
  const mybodydata = {
    feedback_message: req.body.feedback_message,
    feedback_date: req.body.feedback_date,
    user_rating: req.body.user_rating,
    user_name: req.body.user_name
  }

  db.query('insert into tbl_feedback set ?', mybodydata, function(err, result)
  {
    if(err)
    {
      console.log("Error in inserting data" + err.message);
    }
    else
    {
      res.redirect("/feedback/feedback_add");
    }
  });
});


router.get('/feedback_display_table', function(req, res, next) 
{
  db.query("select * from tbl_feedback", function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render('feedback/feedback_display_table', { db_rows_array : db_rows, myvalue : name, image : filename, email : email });
  });
});


router.get('/feedback_edit/:id', function(req, res)
{
  var id = req.params.id;
  db.query("select * from tbl_feedback where id = ?", [id], function(err, db_rows)
  {
    if(err) throw err;
    // console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render("feedback/feedback_edit", { db_rows_array : db_rows, myvalue : name, image : filename, email : email });
    });
});


router.post('/feedback_edit/:id', function(req, res)
{
  console.log("Edit ID is: " + req.params.id);

  var id = req.params.id;
  var feedback_message = req.body.feedback_message;
  var feedback_date = req.body.feedback_date;
  var user_rating = req.body.user_rating;
  var user_name = req.body.user_name;

  db.query("update tbl_feedback set feedback_message = ?, feedback_date = ?, user_rating =?, user_name = ? where id = ?",[feedback_message, feedback_date, user_rating, user_name, id], function(err, result)
  {
    if(err) throw err;
    console.log(result);
    res.redirect("/feedback/feedback_display_table");
  });
});


router.get('/feedback_show/:id', function(req, res)
{
  var id = req.params.id;

  console.log('ID is ' + id);

  db.query("select * from tbl_feedback where id = ?",[id], function(err, db_rows)
  {
    console.log(db_rows);
    if(err) throw err;

    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;

    res.render("feedback/feedback_show", {db_rows_array: db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/feedback_delete/:id', function(req, res)
{
  var id = req.params.id;

  console.log("Deleted ID is " + id);

  db.query("delete from tbl_feedback where id = ? ", [id], function(err, db_rows)
  {
    if(err) throw err;

    console.log("Record Deleted");

    res.redirect("/feedback/feedback_display_table");
  })
});
// feedback ends


module.exports = router;