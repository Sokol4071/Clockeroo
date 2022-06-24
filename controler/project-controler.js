const { error } = require('console');
const projectops = require('../operations/projects');

exports.index = async (req, res, next) => {
    try {
        let projects = await projectops.getAllProjects(user_id);
            res.render('projects', {
            title: 'Projects',
            currentPage: 'projects', 
            projects: projects
        }); 
    } catch (error) {
        console.log(error);
    }
}
exports.show = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = id.replace( /[^\d].*/, '' );

        id = Number(id);

        if(typeof id != 'number'){
            Error('Invalid id');
        }
        
        let project = await projectops.getProjectbyId(req.params.id);

        if(!project){
            Error(404, 'Project not found');
                         
                }
            res.render('project', {
            title: 'Projectspec',
            currentPage: 'project',
            id: req.params.id,
            project: project    
        });
    } catch (error) {
        console.log(error);
    }
}
exports.add = async function (req, res, next) { 
    let formData = {}

    res.render('add-project', {
        title: 'Add Project',
        currentPage: 'projects',
        formData: formData
    });
}
exports.create = async function(req, res, next) {
   
        let formData = validateAndCreateMovieFormData(req.body);
        if(formData.valid){

            let input = {
                name: formData.title.value,
                description: formData.description.value
            };
    
        let project = await projectops.CreateProject(input);
        console.log(movie);
        console.log(input);
        res.redirect('/projects');
        }
        else{
            res.render('add-project', {
                title: 'Add Project',
                currentPage: 'projects',
            });
       
    }  
}
    function validateAndCreateMovieFormData(body){

        let title = body.title;
        let description = body.description;
        
    
        let formData = {
            valid: true,
            title: {
                value: title, 
            },
            description: {
                value: description
            }
        };
    
        if(!title || title.length < 5){
            formData.title = {
                value: title,
                valid: false,
                errorMsg: 'Enter a valid title'
            }
    
            formData.valid = false;
        }
    
        if(!description || description.length < 10){
            formData.description = {
                value: description,
                valid: false,
                errorMsg: 'Enter valid description'
            }
    
            formData.valid = false;
        }
    
        
    
        return formData;
    }
 
exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = id.replace( /[^\d].*/, '' );
        id = Number(id); 
        if(typeof id != 'number'){
            Error('Invalid id');
        }
        let project = await projectops.DeleteProject(id);

        if(!project){
            Error(404, 'Project not found');
        }

        res.redirect('/projects');
    } catch (error) {
        console.log(error);
    }
}


    