const { error } = require('console');
const projects = require('../operations/projects');
const userops = require('../operations/users');

exports.signup = async (req, res, next) => {
    let formData = {};
    res.render('signup', {
        title: 'Signup',
        currentPage: 'signup',
        formData: formData
    });
}


exports.createuser = async (req, res, next) => {
        let users= await userops.getAllUsers();
            

        let formData = validateAndCreateUserFormData(req.body);
        if (formData.valid) {
            let input = {
                username: formData.username.value,
                email: formData.email.value,
                password: formData.password.value
            };
            let user = await userops.CreateUser(input);
            console.log(user);
            console.log(input);
            res.render('/projects', {
                title: 'projects',
                currentPage: 'projects',
                formData: formData,
                projects: projects.getAllProjects(user.user_id)
            });
        } else {
            res.render('signup', {
                title: 'signup',
                currentPage: 'signup',
                formData: formData
        
            });
        }
    
    function validateAndCreateUserFormData(body) {
        let username = body.username;
        let email = body.email;
        let password = body.password;
        let repeatPassword = body.repeatPassword;
        let formData = {
            valid: true,
            username: {
                value: username,
                valid: true
            },
            email: {
                value: email,
                valid: true
            },
            password: {
                value: password,
                valid: true
            },
            repeatPassword: {
                value: repeatPassword,
                valid: true
            }
        };
        if (username.length < 3) {
            formData.username.valid = false;
            formData.valid = false;
            errorMsg = 'Username must be at least 3 characters long';
        }
        if(username == getAllUsers().username){
            formData.username.valid = false;
            formData.valid = false;
            errorMsg = 'Username already exists';
        }
        if (email == getAllUsers().email){
            formData.email.valid = false;
            formData.valid = false;
            errorMsg = 'Email already exists';
        }
        if (!email.includes('@')) {
            formData.email.valid = false;
            formData.valid = false;
            errorMsg = 'Email must be valid';
        }
        if (email == getAllUsers().email){
            formData.email.valid = false;
            formData.valid = false;
            errorMsg = 'Email already exists';
        }

        if (password.length < 6 ) {
            formData.password.valid = false;
            formData.valid = false;
            errorMsg = 'Password must be at least 6 characters long';
        }
        if (password!=("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$")) {
            formData.password.valid = false;
            formData.valid = false;
            errorMsg = 'Password must contain at least one lowercase letter,one uppercase letter,one number';
        }
        if (password !== repeatPassword) {
            formData.repeatPassword.valid = false;
            formData.valid = false;
            errorMsg = 'Passwords do not match';
        }
        if (!formData.valid) {
            formData.errorMsg = errorMsg;
        }
        return formData;
    }
    
}
exports.login = async (req, res, next) => {
    let users= await userops.getAllUsers();
    let formData = validateloginData(req.body);
    if (formData.valid) {
        let input = {
            username: formData.username.value,
            password: formData.password.value
        };
        let user = await userops.login(input);
        console.log(user);
        console.log(input);
        res.render('/projects', {
            title: 'projects',
            currentPage: 'projects',
            formData: formData,
            projects: projects.getAllProjects(user.user_id)
        });
                      
    } else {
        res.render('login', {
            title: 'login',
            currentPage: 'login',
            formData: formData
        });
    }
}
function validateloginData(body) {
    let username = body.username;
    let password = body.password;
    let formData = {
        valid: false,
        username: {
            value: username,
            valid: false
        },
        password: {
            value: password,
            valid: false
        }
    };
    if (username == getAllUsers().username){
        formData.username.valid = true;
        formData.valid = true;}
        else{
            formData.username.valid = false;
            formData.valid = false;
            errorMsg = 'Username does not exist';

        }
    if (password == getUserbyUsername(username).password){
        formData.password.valid = true;
        formData.valid = true;}
        else{
            formData.password.valid = false;
            formData.valid = false;
            errorMsg = 'Password does not match';

    }
    if (!formData.valid) {
        formData.errorMsg = errorMsg;
    }
    return formData;
}



    


