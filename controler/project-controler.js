const { error } = require('console');
const projectops = require('../operations/projects');
const userops = require('../operations/users')

exports.index = async (req, res, next) => {
    try {
        let formData=[];
        let projects = await projectops.getAllProjects();
            res.render('projects', {
            title: 'Projects',
            currentPage: 'projects', 
            projects: projects,
            formData:formData
        }); 
    } catch (error) {
        console.log(error);
    }
}
exports.show = async function (req, res, next){
   
        let id = req.params.id;

        id = id.replace( /[^\d].*/, '' );

        id = Number(id);
        

        if(typeof id != 'number'){
            Error('Invalid id');
        }
   
       
        let project = await projectops.getProjectbyId(id);
        console.log(project)
                res.render('project', {
                    title: 'Projectspec',
                    currentPage: 'project',
                    project
                   
                });
               
      
    
}
exports.add = async function (req, res, next) { 
    let formData = {};
        res.render('add-project', {
        title: 'Add Project',
        currentPage: 'projects',
        formData: formData,
        
    });
}
exports.create = async function(req, res, next) {
      
        
        let formData = validateAndCreateProjectFormData(req.body);
        
      
        if(formData.valid){

            let input = {
            
                title: formData.title.value,
                description: formData.description.value
            };
        let projects= await projectops.getAllProjects();
        let project = await projectops.CreateProject(input.title,input.description);
        console.log(project);
        console.log(input);
        res.render('projects', {
            title: 'projects',
            currentPage: 'projects',
            formData: formData,
            projects: projects
                       
        });
     }
       
        else{

            res.render('add-project', {
                title: 'Add Project',
                currentPage: 'projects',
                formData: formData
                
            });
       
    }  
}
    function validateAndCreateProjectFormData(body){

        let title = body.title;
        let description = body.description;
        
    
        let formData = {
            valid: true,
            title: {
                value: title,
                
            },
            description: {
                value: description,
                
            }
        };
    
        if(title.length < 5){
            formData.title = {
                value: title,
                valid: false,
               
            }

            formData.title.errorMsg='Enter a valid title';
            formData.valid = false;
        }
    
        if(description.length < 10){
            formData.description = {
                value: description,
                valid: false,
               
            }
            formData.description.errorMsg='Enter valid description';
            formData.valid = false;
            
        }
    
        
    
        return formData;
    }
 
exports.delete = async function(req, res, next) {
    
        let id = req.params.id;
       
        projectops.DeleteProject(id);
        res.redirect('/projects');
  
}


    