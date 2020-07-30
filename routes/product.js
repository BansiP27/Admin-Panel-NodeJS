var express = require('express');
var router = express.Router();

var db = require('../config/db');


// product start
router.get('/product_add', function(req, res, next)
{ 
  var filename = req.session.filename;
  var name = req.session.name;
  var email = req.session.email;

  db.query("select sub_category_name from tbl_subcategory",function(err, db_rows){
    if(err) throw err;

  res.render('product/product_add', { myvalue: name, image: filename, db_rows_array:db_rows, email : email});
});
});


router.post('/product_add', function(req, res, next)
{
  var fileobj = req.files.product_image;
  var product_image = fileobj.name;

  const mybodydata = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_image: product_image,
    sub_category_name: req.body.sub_category_name
  }

  db.query('insert into tbl_product set ?', mybodydata, function(err, result)
  {
    if(err)
       {  
          console.log("Error in Inserting Record: " + err.message);
       }
       else
       {
          fileobj.mv("public/products/" + product_image, function(err)
          {
            if(err)
            {
              return res.status(500).send(err);
            }
        
            else
            {
              res.redirect("/product/product_add");
            }
          });
       }
  });
});


router.get('/product_display_table', function(req, res, next) 
{
  db.query("select * from tbl_product ORDER BY product_name", function(err, db_rows)
  {
    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render('product/product_display_table', { db_rows_array : db_rows, myvalue : name, image : filename, email : email });
  });
});


router.get('/product_edit/:id', function(req, res)
{
  var id = req.params.id;
  db.query("select * from tbl_product where id = ?", [id], function(err, db_rows)
  {
    db.query("select * from tbl_subcategory", function(err, db_sub_category_rows){

    if(err) throw err;
    console.log(db_rows);
    
    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;
    
    res.render("product/product_edit", { db_rows_array : db_rows, db_sub_category_rows_array: db_sub_category_rows, myvalue : name, image : filename, email : email });
    });
  });
});


router.post('/product_edit/:id', function(req, res)
{
  console.log("Edit ID is: " + req.params.id);
  var fileobj = req.files.product_image;
  var product_image = fileobj.name;

  var id = req.params.id;
  var product_name = req.body.product_name;
  var product_description = req.body.product_description;
  var product_price = req.body.product_price;
  product_image = product_image;
  var sub_category_name = req.body.sub_category_name;

  db.query("update tbl_product set product_name = ?, product_description = ?, product_price =?, product_image = ?, sub_category_name = ? where id = ?",[product_name, product_description, product_price, product_image, sub_category_name, id], function(err, result)
  {
    if(err)
       {  
          console.log("Error in Inserting Record: " + err.message);
       }
       else
       {
          fileobj.mv("public/products/" + product_image, function(err)
          {
            if(err)
            {
              return res.status(500).send(err);
            }
        
            else
            {
              res.redirect("/product/product_display_table");
            }
          });
       }
  });
});


router.get('/product_show/:id', function(req, res)
{
  var id = req.params.id;

  console.log('ID is ' + id);

  db.query("select * from tbl_product where id = ?",[id], function(err, db_rows)
  {
    console.log(db_rows);
    if(err) throw err;

    var filename = req.session.filename;
    var name = req.session.name;
    var email = req.session.email;

    res.render("product/product_show", {db_rows_array: db_rows, myvalue : name, image : filename, email : email});
  });
});


router.get('/product_delete/:id', function(req, res)
{
  var id = req.params.id;

  console.log("Deleted ID is " + id);

  db.query("delete from tbl_product where id = ? ", [id], function(err, db_rows)
  {
    if(err) throw err;

    console.log("Record Deleted");

    res.redirect("/product/product_display_table");
  })
});
// product ends




module.exports = router;