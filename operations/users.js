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
            connection.query('SELECT * FROM user WHERE username = ?', [username], (err, rows) => { 
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
            
        });
    });
}
login = (username, password) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, rows) => {  
            if (err) {
                reject(err);
                console.log(err);
            } else {
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
    login

}