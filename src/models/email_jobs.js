'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailJobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailJobs.init({
    id:{
      type:Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    queue_name: {
      type:Sequelize.STRING
    },
    job_id:{
      type:Sequelize.STRING,
    },
    to_address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(50),
      defaultValue: 'pending',
    },
    attempts: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    max_attempts: {
      type: Sequelize.INTEGER,
      defaultValue: 3,
    },
    result: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    error: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
   
    
  }, {
    sequelize,
    modelName: 'EmailJobs',
    tableName: 'EmailJobs',
    timestamps: false,
  });
  return EmailJobs;
};