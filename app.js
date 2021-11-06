const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const qName = {
    name: 'userName',
    message: 'Enter your name:',
}
const qGithub = {
    name: 'githubId',
    message: 'Enter your github ID:'
}

inquirer.prompt([qName, qGithub])
    .then((answers) =>{
        let page = generatePage(answers.userName, answers.githubId);
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






