module.exports = app => {
    const departments = require('../controllers/department.controller.js');

    var router = require("express").Router();

    //Create new Department
    router.post("/",departments.create);

    //Get all Departments
    router.get("/",departments.findAll);

    //Get single department
    router.get("/:id", departments.findOne);

    //Update single department
    router.put("/:id", departments.update);

    //Delete single department
    router.delete("/:id", departments.delete);

    //Delete all departments
    router.delete("/", departments.deleteAll);

    app.use('/api/departments', router);
};