const dbConfig = require('../../db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    operatorsAliases : false,
    pool : {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.departments = require("./department.model.js")(sequelize, Sequelize);

db.employees = require("./employee.model.js")(sequelize,Sequelize);

db.departments.hasMany(db.employees, { as: "employees"});

db.employees.belongsTo(db.departments, { foreignKey:"departmentId", as: "department"});

module.exports = db;