const router = require('express').Router();

const departmentSchema = require('../schema/department.schema');

//Method To Render Manage Departments Page\
router.get("/manageDepartments", function (req, res) {
    departmentSchema.find(function (err, depts) {
        if(err)
            throw err;
        else
            res.render("ManageDepartments/index", {departments: depts});
    });

});

//Router For Creating Department
router.route('/createDepartment').get(function (req, res) {
    res.render("ManageDepartments/createDepartment");
}).post(function (req, res) {
    let newDept = new departmentSchema(req.body);
    newDept.save(function (err) {
        if(err)
            throw err;
        else
            res.redirect("/manageDepartments");
    })
});

//Method To Delete Department
router.get('/deletDepartment/:deptId', function (req, res) {
    departmentSchema.findOneAndRemove({_id: req.params.deptId}, function (err) {
        if(err)
            console.log(err);
        else
            res.redirect('/manageDepartments');
    })

})

module.exports = router;