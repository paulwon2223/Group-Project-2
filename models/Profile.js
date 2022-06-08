const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Profile extends Model {}

Profile.init({
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [50],
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "profile",
});

module.exports = Profile;