import Project from "./project";
import displayNewProject from "./display-projects";

const projectList = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input');
const projectContent = document.querySelector('.main-content');
const projectHeader = document.querySelector('.main-header');

newProjectForm.addEventListener('submit', createProject);


const LOCAL_STORAGE_PROJECT_KEY = 'task.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedProjectId'
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);

projectList.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'p') {
        selectedProjectId = e.target.dataset.projectId;
        saveAndRender();
    }
})

function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId);
}

function saveAndRender() {
    save();
    render();
}

function render() {
    clearElement(projectList);
    projects.forEach(pro => {
        const projectListHash = document.createElement('div');
        projectListHash.classList.add('icon-size');
        projectListHash.textContent = '#';
        if (pro.id === selectedProjectId) {
            projectListHash.classList.add('active')
        };
        projectList.appendChild(projectListHash);

        const projectListItem = document.createElement('p');
        projectListItem.dataset.projectId = pro.id;
        projectListItem.classList.add('project-name');
        projectListItem.innerText = pro.name;
        if (pro.id === selectedProjectId) {
            projectListItem.classList.add('active')
        };
        projectList.appendChild(projectListItem);
    })
}
 //clear out and refresh all projects from sidebar everytime one is added
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render();
// localStorage.clear();

function createProject(e) {
    e.preventDefault();

    const projectName = newProjectInput.value;
    if (projectName === null || projectName === '') return
    const project = makeAProject(projectName)
    projects.push(project);

    //reset input box
    newProjectInput.value = null;

    //render
    saveAndRender();
}

function makeAProject(name) {
    return {id: Date.now().toString(), name: name, tasks: []}
}

// function selectProject(e) {
//     const idOfSelectedProject = e.currentTarget.dataset.project;
//     const selectedProject = projects.find(project => project.projectId == idOfSelectedProject);
    
//     selectedProject.addTask('send email', 'send an email to this person', '08.09.23');
//     selectedProject.tasks.forEach(task => {
//         const taskContent = document.createElement('div');
//         taskContent.textContent = `${task.title} ${task.description} ${task.dueDate}`;
//         projectContent.appendChild(taskContent)
//     });
    // selectedProject.tasks.forEach(task => console.log(`${task.title} ${task.description} ${task.dueDate}`));

    // const selectedTasks = selectedProject.tasks;
    // console.log(selectedTasks.description)
        
    //     projectHeader.innerHTML = `<div class="project-title-content">${currentProject.project.projectName}</div>`;
    //     console.log(currentProject.project.tasks);
    //     projectContent.innerHTML = `<div> ${currentProject.project.title} </div><div> ${currentProject.project.description} </div><div> ${currentProject.project.dueDate} </div>`;
    // }

// function logTest() {
//     projects[0].addTask('send email', 'send an email to this person', '08.09.23');
//     logTest2();
// }

// function logTest2() {
//     console.log(projects[0].tasks)
// }

// newProject.addTask('send email', 'send an email to this person', '08.09.23');
// newProject.addTask('grocery store', 'go to the store', '08.10.23');
// newProject.addTask('Do other stuff', 'make this app', '08.10.23');

// console.log(newProject.tasks);

// newProject.deleteTask(2);

// console.log(newProject.tasks)