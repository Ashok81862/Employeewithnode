module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
      title: {
        type: Sequelize.STRING
      }
    });
  
    return Department;
};