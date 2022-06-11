const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

module.exports.verifyCustomer = function (req, res, next) {

    try {
        const tokens = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(tokens, "anysecretkey");
        console.log(data.cusId);
        Customer.findOne({ _id: data.cusId })
            .then(function (result) {
                // console.log(result);
                req.CustomerInfo = result;
                next();
            })
            .catch(function (e) {
                res.json({ error: e })
            })

    }
    catch (e) {
        res.json({ error: "Invalid Access" })
    }



    module.exports.verifyUser = function (req, res, next) {

        try {
            const tokens = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(tokens, "anysecretkey");
            console.log(data.useId);
            User.findOne({ _id: data.useId })
                .then(function (result) {
                    req.UserInfo = result;
                    next();
                })
                .catch(function (e) {
                    res.json({ error: e })
                })

        }
        catch (e) {
            res.json({ error: "Invalid Access" })
        }

    }
}