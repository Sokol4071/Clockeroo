var mysqlConfig = require('../connection/mysql');
var connection = mysqlConfig.connection;

getAllProjects = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM projects' ,(err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
                
            }
        });
    });
}
getProjectbyId = (pid) => {
    return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM projects WHERE project_id = ?', [pid], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows[0]);
                console.log(rows[0]);
            }
        });
    });
}
UpdateTime = (id, time) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE projects SET time = ? WHERE project_id = ?', [time, id], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}
UpdateStatusToFinished = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE projects SET status = ? WHERE project_id = ?', ['Finished', id], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}
UpdateStatusToPostponed = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE projects SET status = ? WHERE project_id = ?', ['Postponed', id], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
}
DeleteProject = (pid) => {
    return new Promise((resolve, reject) => {
        let sql = "DELETE FROM projects WHERE project_id = " + pid;
        connection.query(sql, (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
                console.log(rows);
            }
        });
    });
}
CreateProject = (name, description) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO projects (user_id,project_name, project_description,status) VALUES (?,?,?,?)', ['1',name, description,'Ongoing'], (err, rows) => {
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
    getProjectbyId: getProjectbyId,
    getAllProjects: getAllProjects,
    UpdateTime: UpdateTime,
    UpdateStatusToFinished: UpdateStatusToFinished,
    UpdateStatusToPostponed: UpdateStatusToPostponed,
    DeleteProject: DeleteProject,
    CreateProject: CreateProject,
    
}