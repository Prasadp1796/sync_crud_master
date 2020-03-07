const router = require('express').Router();

//Users Schema Imported Here
const userSchema = require('../schema/user.schema');
const departmentSchema = require('../schema/department.schema');

//Method To Render Manage Users Page
router.get('/manageUsers', function (req, res) {
    userSchema.aggregate([
        {
            "$lookup": {
                "from": "departments",
                "localField": "departmentId",
                "foreignField": "_id",
                "as": "department"
            }
        },
        {
            "$project": {
                _id: 1,
                first_name: 1,
                last_name: 1,
                email: 1,
                contact: 1,
                departmentId: 1,
                departmentName: {$arrayElemAt: ["$department.departmentName",0]}
            }
        }

    ]).exec(function (err, data) {
        if(err)
            throw err;
        else
            res.render('ManageUsers/index', {Users: data});
    });

    // userSchema.find(function (err, users) {
    //     if (err)
    //         throw err;
    //     else {
    //         res.render('ManageUsers/index', {Users: users});
    //     }
    // })

});

//Method To Render Create User Page
router.get('/createUser', function (req, res) {
    departmentSchema.find(function (err, depts) {
        if(err)
            throw err;
        else
            res.render("ManageUsers/userForm", {departments: depts})
    })
});


//Method To Create New User
router.post("/createUser", function (req, res) {
    console.log(req.body);
    let newUser = new userSchema(req.body);
    newUser.save(function (err) {
        if (err)
            throw err;
        else
            res.redirect('/manageUsers');
    })
});


//Method To Edit User Details
router.route("/editUser").get(function (req, res) {
    userSchema.findOne({_id: req.query.UserID}, function (err, user) {
        if (err)
            throw err;
        else
            res.render("ManageUsers/editForm", {User: user});
    });

}).post(function (req, res) {
    userSchema.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, {useFindAndModify: true}, function (err) {
        if (err)
            throw err;
        else
            res.redirect("/manageUsers");
    })
});

//Method To Delete User
router.get('/deleteUser', function (req, res) {
    userSchema.findOneAndRemove({_id: req.query.UserID}, {useFindAndModify: true}, function (err) {
        if (err)
            throw err;
        else
            res.redirect("/manageUsers");
    })
});

module.exports = router;