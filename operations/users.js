var mysqlConfig = require('../connection/mysql');
var connection = mysqlConfig.connection;

getUserid = (email) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT user_id FROM user WHERE email = ?', [email], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}
CreateUser= (input) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO user SET ?', [input], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}
getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user' , (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}
getUserbyUsername = (username) => {
    return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE name = ?', [username], (err, rows) => { 
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
            
        });
    });
}
loginUser = (name, password) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE name = ? AND password = ?', [{name},{password}], (err, rows) => {  
            if (err) {
                reject(err);
                console.log(err);
            } else {
                console.log(rows);
                resolve(rows);  
            }
        });
    });
}


                




module.exports = {
    getUserid,
    CreateUser,
    getAllUsers,
    getUserbyUsername,
    loginUser

}
