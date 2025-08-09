'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmailJobs', {
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
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EmailJobs');
  }
};