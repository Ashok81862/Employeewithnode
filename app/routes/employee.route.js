module.exports = app => {
    const employees = require('../controllers/employee.controller.js');

    var router = require("express").Router();

    //Create new Employee
    router.post('/', employees.create);

    // //Get all employees
    router.get('/', employees.findAll);

    // //Get single employee
    router.get("/:id", employees.findOne);

    // //Update Single employee
    router.put("/:id", employees.update);

    // //Delete single employee
    router.delete("/:id", employees.delete);

    // //Delete all employees
    router.delete("/", employees.deleteAll);

    app.use('/api/employees', router);
}