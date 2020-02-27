const router = require('express').Router();

//Users Schema Imported Here
const userSchema = require('../schema/user.schema');

//Method To Render Manage Users Page
router.get('/manageUsers', function (req, res) {

    userSchema.find(function (err, users) {
        if(err)
            throw err;
        else
            res.render('ManageUsers/index', {Users: users});
    })

});

//Method To Render Create User Page
router.get('/createUser', function (req, res) {
    res.render("ManageUsers/userForm");
});

//Method To Create New User
router.post("/createUser", function (req, res) {
    let newUser = new userSchema(req.body);
    newUser.save(function (err) {
        if(err)
            throw err;
        else
            res.redirect('/manageUsers');
    })
});

module.exports = router;