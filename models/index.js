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
    .then((err) => {
        if (err) {
            console.log('An error occured while creating table ');
        } else {
            console.log('Tables created successfully');
        }
    });


function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var randPerson = "person"+randomIntInc(1,1000);

var user = UserModel.build({
    username: randPerson,
    password: randomIntInc(1,1000) + randPerson
});

// to save >> POST
user.save().then(err => err ? 'Error in inserting' : 'User inserted');

// to read >> GET
findUsername= (data, success, fail) => {
    UserModel
        .find({
            where: {
                username: data.userToFind
            }
        })
        .then((data, err) => {
            if (err) {
                console.log(err);
            }
            if (!data) {
                console.log('User cannot found!')
            }
            else {
                console.log('User found: ');
                console.log(`Username: ${data.username} & Pass: ${data.password}`);
            }
        });
};
findUsername({userToFind: "person334"});

// to update >> PUT
updateUsername = (data, success, fail) =>
{
    UserModel
        .find({where: {username: data.userToUpdate}})
        .then(data => {
            // if (!data) {
            //     console.log('User cannot found!')
            // }
            if (data) {
                console.log('User found: ');
                console.log(`Username: ${data.username} & Pass: ${data.password}`);
                data
                    .updateAttributes({
                        password: 'updated'
                    })
                    .then ((dataupdate, err) => {
                        if (err) {
                            console.log(err);
                        }
                        if (!dataupdate) {
                            console.log('User cannot be updated!')
                        } else {
                            console.log('User updated successfully.')
                        }

                    })
                    // .success(dataupdate => { console.log("Success on update: ", dataupdate) })
            }
        }).catch(err => console.trace(err));
};

 updateUsername({userToUpdate:"person334"});

// to delete >> DELETE

// export connection
module.exports.sequelize = sequelize;