var express = require('express');
var nodemailer = require("nodemailer");

var db = require('../config/db');
var router = express.Router();

router.post('/', function(req, res, next)
{
  var fileobj = req.files.filename;
  var filename = fileobj.name;
  var name = req.body.name;
  var email = req.body.email;
  
  const mybodydata = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    filename: filename  
  }

  req.session.email = email;
  req.session.name = name;
  req.session.filename = filename;

  db.query('insert into tbl_user_master set ?', mybodydata, function(err, result)
  {
       if(err)
       {  
          console.log("<-----Error in Inserting Record-----> " + err.message);
       }
       else
       {
          fileobj.mv("public/uploads/" + filename, function(err)
          {
         if(err)
         {
            return res.status(500).send(err);
         }
         
         else
         {
            res.redirect('/signup_response');
         }
         });
       }
  });
});


router.get('/', function(req, res, next) {
  res.render('signup');
});


router.get('/signup_response', function(req, res, next)
{
  var name = req.session.name;

  res.render('signup_response', { myvalue: name });
});


router.get('/login', function(req, res, next)
{
  res.render('login');
});


router.post('/login', function(req, res, next)
{
  var email = req.body.email;
  var password = req.body.password;

  req.session.email = email;

  db.query("select * from tbl_user_master", function(err, db_rows_array)
  {
  for(var i=0, len=db_rows_array.length; i<len; i++)
  {
      if(db_rows_array[i].email == email && db_rows_array[i].password == password)
      {
        var name = db_rows_array[i].name;
        req.session.name = name;
        res.redirect('/login_process');
        return;
      }
  }
  res.redirect('/login_response');
  });  
});


router.get('/login_response', function(req, res, next)
{
  var username = "Your ID details are incorrect";

  res.render('login_response', { myvalue: username });
});


router.get('/forgot_password', function(req, res, next)
{
  res.render('forgot_password');
});


router.post('/forgot_password', function(req, res, next)
{
  var email = req.body.email;
  user = email;

  db.query('select password from tbl_user_master where email = ?', [email], function(err, result)
  {
    if(err){
      console.log("Error in inserting data" + err.message);
    }
    else{
      msg = "Your password is " + result[0].password;
      res.redirect("/forgot_password_process");
    }
  });
});


router.get('/forgot_password_process', function(req, res, next)
{
  async function main() 
  {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "bansi.patel.2691997@gmail.com",
        pass: "Incorrect*123"
      }
    });
  
    let info = await transporter.sendMail({
      // from: '<foo@example.com>',
      to: user,
      subject: "Password Details",
      text: "Hello",  
      html: msg
    });

    console.log("Message sent: %s", info.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  main().catch(console.error);

  res.redirect("/login");
});


router.get('/login_process', function(req, res, next)
{
  var email = req.session.email;

    db.query("select name, filename from tbl_user_master where email = ?",[email], function(err, result)
    {
      if(err)
      {
        console.log(err.message);
        res.redirect("/login");
      }
      else{
      var name = result[0].name;
      var filename = result[0].filename;
      console.log(filename);
      console.log(name);
      req.session.name = name;
      req.session.filename = filename;
      res.redirect("/homepage");
      }
    });
});

router.get('/homepage', function(req, res, next)
{
  var name = req.session.name;
  var filename = req.session.filename;
  var email = req.session.email;

  res.render('homepage',{ myvalue: name , image: filename, email : email});
});


// router.post('/homepage', function(req, res, next){

//   var name = req.session.name;
//   var filename = req.session.filename;
//   var email = req.session.email;
  
//   if(name != 0)
//   {
//     res.redirect("/homepage");
//   }
//   else{
//     res.redirect("/login");
//   }
// });


router.get('/settings', function(req, res, next)
{
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  res.render('settings', { myvalue: name, image: filename, email : email});
});


router.get('/change_password', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  res.render('change_password', { myvalue: name, image: filename, email : email});
});


router.post('/change_password', function(req,res)
{
  var email = req.session.email;
  var old_password = req.body.old_password;
  var new_password = req.body.new_password;
  var confirm_new_password = req.body.confirm_new_password;

if(old_password)
{
  if(new_password == confirm_new_password)
  {
    db.query("update tbl_user_master set password = ? where email = ?", [new_password, email], function(err, respond)
    {
      if(err) throw err;

      res.redirect("/homepage");
    });
  }
  else
  {
    console.log("error in changing password");
    res.redirect("/homepage");
  }
}
});


router.get('/logout', function(req, res, next)
{  
  req.session.destroy(function(err)
  {
  res.redirect('/login');
  })
});


module.exports = router;