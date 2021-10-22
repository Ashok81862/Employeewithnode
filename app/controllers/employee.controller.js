const db = require('../models');
const Department = db.departments;
const Employee = db.employees;
const Op = db.Sequelize.Op;

//Create and Save new Employee
exports.create = (req,res) => {
    //Validate Request
    if(!req.body.name){
        res.status(404).send({ message: "Content cannot be empty"});
        return;
    }

    //Create Employee
    const employee = {
        name: req.body.name,
        departmentId : req.body.departmentId,
        address : req.body.address,
        email : req.body.email,
    }

    //Save employee in database
    Employee.create(employee).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({ message: "Some error occur in creating new employee" });
    })
};

//Retrieve all employees from the database
exports.findAll = (req,res) => {
    const name = req.query.name;
    var condition = name ? { name: {[Op.like]: `%${name}` }}:null;

    Employee.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send({message:err.message || "Some error occurred while retrieving employees"})
    });
}

//Find a Single Employee with an id
exports.findOne = (req,res) => {
    const id = req.params.id;

    Employee.findByPk(id).then(data => {
        if(data){
            res.send(data)
        }else{
            res.status(404).send({ message: "No Employee Found" })
        }
    }).catch(error => {
        res.status(500).send({ message: "Some error occurred while retrieving employees" })
    })
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Employee.update(req.body, {where: {id: id}}).then(num => {
        if(num == 1){
            res.send({ message: "Employee updated successfully "});
        }else{
            res.status(404).send({ message: "Error occur while updating the Employee"})
        }
    }).catch(error => {
        res.status(500).send({ message: "Some error occur while updating the Employee" })
    })
  
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({where: {id: id}}).then(num => {
      if(num == 1){
          res.send({ message:`${num} Employee were deleted successfully!` });
      }else{
        res.status(404).send({ message: "Error in deleting the Employee" })
      }
  }).catch(error => {
      res.status(500).send({ message: "Some error while deleting the Employee" })
  })
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
    Employee.destroy({ 
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Employees were deleted successfully!`})
    }).catch(error => {
        res.status(500).send({ message: "Some error in deleting all Employees" });
    })
};

