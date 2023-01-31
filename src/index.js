import Project from "./project";

const addProject = document.querySelector('.new-project-form');
const projectList = document.querySelector('.project-items')

addProject.addEventListener('submit', createProject);

const projects = [];
let projectIdCounter = 1;

function createProject(e) {
    e.preventDefault();

    //create project with name from input box and id from projectIdCounter
    const newProject = Project(e.target.projectName.value, projectIdCounter);
    projects.push(newProject);
    projectIdCounter++;

    //reset input box
    e.target.projectName.value = '';

    const projectListHash = document.createElement('div');
    projectListHash.classList.add('icon-size');
    projectListHash.textContent = '#';
    const projectListItem = document.createElement('p');
    projectListItem.classList.add('project-name');
    projectListItem.setAttribute('data-project', `${newProject.projectId}`)
    projectListItem.innerText = newProject.projectName;

    projectList.appendChild(projectListHash);
    projectList.appendChild(projectListItem);



    newProject.addTask()
}




// newProject.addTask('send email', 'send an email to this person', '08.09.23');
// newProject.addTask('grocery store', 'go to the store', '08.10.23');
// newProject.addTask('Do other stuff', 'make this app', '08.10.23');

// console.log(newProject.tasks);

// newProject.deleteTask(2);

// console.log(newProject.tasks)