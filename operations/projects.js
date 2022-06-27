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
getProjectbyId = (id) => {
    return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM projects WHERE project_id = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
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
UpdateStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE projects SET status = ? WHERE project_id = ?', [status, id], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}
DeleteProject = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM projects WHERE project_id = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}
CreateProject = (user_id,name, description) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO projects (user_id,project_name, project_description,status,time,start_date,end_date) VALUES (?,?, ?,Ongoing,0,1,NULL)', [user_id,name, description], (err, rows) => {
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
    UpdateStatus: UpdateStatus,
    DeleteProject: DeleteProject,
    CreateProject: CreateProject,
    
}