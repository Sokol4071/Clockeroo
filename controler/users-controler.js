const { error } = require('console');
const { getAllProjects } = require('../operations/projects');
const projects = require('../operations/projects');
const userops = require('../operations/users');

exports.signup = async (req, res, next) => {
    let formData=[];
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
                name: formData.username.value,
                email: formData.email.value,
                password: formData.password.value
            };
            let user = await userops.CreateUser(input);
            console.log(user);
            console.log(input);
            
            res.render('login', {
            title: 'login',
            currentPage: 'login',
            formData: formData
        });  
        } else {
            console.log(formData);
            res.render('signup', {
                title: 'signup',
                currentPage: 'signup',
                formData: formData
        
            });
        }
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
            formData.username.errorMsg = 'Username must be at least 3 characters long';
        }
        if(username == getAllUsers().name){
            formData.username.valid = false;
            formData.valid = false;
            formData.username.errorMsg = 'Username already exists';
        }
        if (email == getAllUsers().email){
            formData.email.valid = false;
            formData.valid = false;
            formData.email.errorMsg = 'Email already exists';
        }
        if (!email.includes('@')) {
            formData.email.valid = false;
            formData.valid = false;
            formData.email.errorMsg = 'Email must be valid';
        }
        if (email == getAllUsers().email){
            formData.email.valid = false;
            formData.valid = false;
            formData.email.errorMsg = 'Email already exists';
        }

        if (password.length < 6 ) {
            formData.password.valid = false;
            formData.valid = false;
            formData.password.errorMsg = 'Password must be at least 6 characters long';
        }
      
        if (password !== repeatPassword) {
            formData.repeatPassword.valid = false;
            formData.valid = false;
            formData.repeatPassword.errorMsg = 'Passwords do not match';
        }
        return formData;
    }
exports.logger= async(req,res,next) => {
    let formData=[];
    res.render('login', {
    title: 'login',
    currentPage: 'login',
    formData: formData
});
}
exports.login = async (req, res, next) => {
    let users= await userops.getAllUsers();
    let formData = validateloginData(req.body);
    
    if (formData.valid) {
        let input = {
            name: formData.username.value,
            password: formData.password.value
        };
        let user = await userops.loginUser(input);
        let projects = getAllProjects(user.user_id);
        
        res.redirect('../projects');
                      
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
        valid: true,
        username: {
            value: username,
            valid: true
        },
        password: {
            value: password,
            valid: true
        }
    }
    
    return formData;
}




    


