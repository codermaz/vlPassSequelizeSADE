module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'UserModel',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }

        },
        {
            tableName: 'UserModel'
        }
    );
};