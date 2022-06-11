const express = require("express");

const app = express();
app.use(express.static(__dirname+'/images'));

const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended : true}));

require("./database/db");

const customerRoute = require("./routes/customerRoute");
app.use(customerRoute);



app.listen("3000");