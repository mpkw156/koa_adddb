'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};