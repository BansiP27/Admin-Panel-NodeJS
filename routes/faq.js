var express = require('express');
var router = express.Router();

var db = require('../config/db');


// FAQ start
router.get('/faq_add', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  res.render('faq/faq_add', { myvalue: name, image: filename, email : email});
});


router.post('/faq_add', function(req, res, next)
{
  const mybodydata = {
    faq_question: req.body.faq_question,
    faq_answer: req.body.faq_answer

  }

  db.query('insert into tbl_faq set ?', mybodydata, function(err, result)
  {
    if(err)
    {
      console.log("Error in inserting data" + err.message);
    }
    else
    {
      res.redirect("/faq/faq_add");
    }
  });
});


router.get('/faq_display_table', function(req, res, next) 
{
  db.query("select * from tbl_faq", function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render('faq/faq_display_table', { db_rows_array : db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/faq_edit/:id', function(req, res)
{
  console.log("Edit id is: " + req.params.id);

  var id = req.params.id;
  db.query("select * from tbl_faq where id = ?", [id], function(err, db_rows)
  {
    if(err) throw err;
    // console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render("faq/faq_edit", { db_rows_array: db_rows, myvalue : name, image : filename, email : email });
  });
});


router.post('/faq_edit/:id', function(req, res)
{
  console.log("Edit ID is: " + req.params.id);

  var id = req.params.id;
  var faq_question = req.body.faq_question;
  var faq_answer = req.body.faq_answer;

  db.query("update tbl_faq set faq_question = ?, faq_answer = ? where id = ?",[faq_question, faq_answer, id], function(err, respond)
  {
    if(err) throw err;
    res.redirect("/faq/faq_display_table");
  })
});


router.get('/faq_show/:id', function(req, res)
{
  var showid = req.params.id;

  console.log('ID is ' + showid);

  db.query("select * from tbl_faq where id = ?",[showid], function(err, db_rows)
  {
    console.log(db_rows);
    if(err) throw err;

    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;

    res.render("faq/faq_show", {db_rows_array: db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/faq_delete/:id', function(req, res)
{
  var deleteid = req.params.id;

  console.log("Deleted ID is " + deleteid);

  db.query("delete from tbl_faq where id = ? ", [deleteid], function(err, db_rows)
  {
    if(err) throw err;

    // console.log(db_rows);
    console.log("Record Deleted");

    res.redirect("/faq/faq_display_table");
  })
});
// FAQ end



module.exports = router;