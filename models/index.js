let Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

// initialize database connection
const sequelize = new Sequelize('webapp', 'userMA3', 'passMA3', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
        timestamps: true,
        underscored: false
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// drop all tables in the database 'webapp'
// sequelize.drop();

// const FamilyUser = sequelize.import('../models/familyUser');
var UserModel = sequelize.import('userModel');
// var Account = sequelize.import('account');
// var FamilyUserAccount = sequelize.define('familyUserAccount', {
//         accountType: DataTypes.STRING,
//     });
//

// FamilyUser.belongsToMany(Account, {through: FamilyUserAccount});
// Account.belongsToMany(FamilyUser, {through: FamilyUserAccount});

sequelize.sync()
    .then(() => {
        console.log('Tables created successfully.');
    })
    .catch(err => console.log(err));

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var randPerson = "person" + randomIntInc(1, 1000);

var user = UserModel.build({
    username: randPerson,
    password: randomIntInc(1, 1000) + randPerson
});

// to save >> POST
user.save().then(err => err ? 'Error in inserting' : 'User inserted');

// to read >> GET
findUsername = (user) => {
    UserModel
        .find({
            where: {
                username: user.userToFind
            }
        })
        .then((data) => {
            if (data) {
                console.log(`User found: \n\t Username: ${data.username} & Pass: ${data.password}`);
                return data;
            }
            else {
                console.log('User cannot found!')
            }
        })
        .catch(err => console.log(err));
};
// let user2=findUsername({userToFind: "person334"});
// console.log("findUsername OK..." + user2.username);

// to update >> PUT
updateUsername = (user) => {
    UserModel
        .find({where: {username: user.userToUpdate}})
        .then(data => {
            if (!data) {
                console.log('User cannot be found!')
            }
            else {
                console.log('User found: ');
                console.log(`Username: ${data.username} & Pass: ${data.password}`);
                data
                    .updateAttributes({
                        password: 'updated112'
                    })
                    .then((dataupdate) => {
                        dataupdate ?
                            console.log(`User's password updated successfully: ${dataupdate.username} & ${dataupdate.password}`) :
                            console.log('User cannot be updated!')
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.trace(err));
};
// updateUsername({userToUpdate: "person7"});

// to delete >> DELETE
deleteUser = (user) => {

    UserModel
        .find({where: {username: user.usernameToDelete}})
        .then(data => {
            if (!data) {
                console.log('User cannot be found!')
            }
            else {
                console.log('User found: ');
                console.log(`Username: ${data.username} & Pass: ${data.password}`);
                deletedName = data.username;
                deletedPass = data.password;
                data
                    .destroy()
                    .then((datadelete) => {
                        datadelete ?
                            console.log(`User's deleted successfully: ${datadelete.username} & ${datadelete.password}`) :
                            console.log('User cannot be deleted!')
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.trace(err));
};
// deleteUser({usernameToDelete: "person51"});

// export connection
module.exports.sequelize = sequelize;