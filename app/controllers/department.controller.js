const { Sequelize } = require('../models');
const db = require('../models');
const Department = db.departments;
const Employee = db.employees;
const Op = db.Sequelize.Op;

// Create and Save a new Department
exports.create = (req,res) => {
  //validate Request
  if(!req.body.title){
      res.status(404).send({ message: "Content cannot be empty" });
      return;
  }

  //Create Department
  const department = {
      title : req.body.title
  };

  //Save department in database
  Department.create(department).then(data => {
      res.send(data);
  }).catch(error => {
      res.status(500).send({ message: "Some error occur while creating database" });
  })
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Department.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving departments."
        });
      });
};

// Find a single Department with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findByPk(id).then(data => {
      if(data){
          res.send(data)
      }else{
          res.status(404).send({ message: "No Department Found" })
      }
  }).catch(error => {
      res.status(500).send({ message: "Some error occurred while retrieving departments" })
  })
};

// Update a Department by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Department.update(req.body, {where: {id: id}}).then(num => {
        if(num == 1){
            res.send({ message: "Department updated successfully "});
        }else{
            res.status(404).send({ message: "Error occur while updating the department"})
        }
    }).catch(error => {
        res.status(500).send({ message: "Some error occur while updating the department" })
    })
  
};

// Delete a Department with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Department.destroy({where: {id: id}}).then(num => {
      if(num == 1){
          res.send({ message:`${num} Department were deleted successfully!` });
      }else{
        res.status(404).send({ message: "Error in deleting the department" })
      }
  }).catch(error => {
      res.status(500).send({ message: "Some error while deleting the department" })
  })
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
    Department.destroy({ 
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Departments were deleted successfully!`})
    }).catch(error => {
        res.status(500).send({ message: "Some error in deleting all departments" });
    })
};