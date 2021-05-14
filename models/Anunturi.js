module.exports = (sequelize, DataTypes) => {
    const Anunturi = sequelize.define("Anunturi", {
        user_f: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_l: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        txt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Anunturi;
};