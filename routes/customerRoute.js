const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const auth = require("../auth/auth");
const router = new express.Router();

// route for customer registration
router.post("/customer/register", function (req, res) {
  const username = req.body.username;
  Customer.findOne({ username: username }).then(function (customerData) {
    // if the username is in the database
    if (customerData != null) {
      res.json({ message: "Username already exists!" });
      return;
    }
    // now it means we are ready for registration
    const password = req.body.password;
    bcryptjs.hash(password, 10, function (e, hashed_pw) {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const username = req.body.username;
      
      

      const cdata = new Customer({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: hashed_pw,
       
        

      });
      cdata
        .save()
        .then(function () {
          res.json({ message: "Registered Success!", success: true });
        })
        .catch(function (e) {
          res.json(e);
        });
    });
  });
});

// login route - for customer
router.post("/customer/login", function (req, res) {
  const username = req.body.username;
  //Select * from customer where username = "admin"
  Customer.findOne({ username: username }).then(function (customerData) {
    // console.log(customerData);
    if (customerData === null) {
      return res.json({ message: "invalid" ,success:false});
    }
    // need to check password
    const password = req.body.password;
    bcryptjs.compare(password, customerData.password, function (e, result) {
      //true - correct pw, false = incorrect pw
      if (result === false) {
        return res.json({ message: "Invalid",success:false });
      }
      // ticket generate - jsonwebtoken
      const token = jwt.sign({ cusId: customerData._id }, "anysecretkey");
      res.json({ token: token, message: "success",userId: customerData._id, success:true,username: username });
    });
  });
});





module.exports = router;
