module.exports = (sequelize, DataType) => {
    const User = sequelize.define("users", {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataType.STRING,
            allowNull: false
        },
        last_name: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
        ranking: {
            type: DataType.INTEGER,
            allowNull: false
        },
        licence_number: {
            type: DataType.INTEGER,
            allowNull: false
        },
        confirmed: {
            type: DataType.BOOLEAN,
            defaultValue: false
        }
    });

    return User;
};