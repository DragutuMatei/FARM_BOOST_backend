module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,

    },
    email: {
      type: DataTypes.STRING,
    },
    tel: {
      type: DataTypes.STRING,
    },
    emailP: {
      type: DataTypes.STRING,
    },
    locatie: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  Users.associate = (models) => {
    Users.hasMany(models.Anunturi, {
      onDelete: "cascade"
    })
  };


  return Users;
};