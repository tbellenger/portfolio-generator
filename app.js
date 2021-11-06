const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const prompts = [
    {
        name: 'userName',
        message: 'Enter your name:',
    },
    {
        name: 'githubId',
        message: 'Enter your github ID:'
    },
    {
        name: 'about',
        message: 'Provide some information about yourself:'
    }
];
const projectPrompts = [
    {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
    },
    {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
    },
    {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
    }
];
const projects = {
    answerData: {},
    projectData: []
}
const projectP = data => {
    inquirer.prompt(projectPrompts)
        .then()
        .then((answers)=>{
            data.projectData.push(answers);
            if (answers.confirmAddProject) {
                return projectP(data);
            } else {
                return data;
            }
        }) 
}
inquirer.prompt(prompts)
    .then()
    .then((answers) => {
        projects.answerData = answers;
        let data = projectP(projects);
        console.log(data);
        let page = generatePage(answers.userName, answers.githubId, answers.about);
        fs.writeFile('index.html', page, err => {
            if (err) throw err;
        
            console.log('Portfolio complete! Check out index.html to see the output!');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log('prompt couldnt be rendered');
        } else {
            console.log('somethign went wrong');
        }
    });






