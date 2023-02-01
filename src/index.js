import Project from "./project";
import displayNewProject from "./display-projects";

const addProjectButtons = document.querySelectorAll('.add-project')
const projectList = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input');

const projectHeader = document.querySelector('[data-project-title]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template')

const newTaskForm = document.querySelector('[data-new-task-form')
const newTaskInput = document.querySelector('[data-new-task-input')

addProjectButtons.forEach(button => {
    button.addEventListener('click', () => {
        newProjectForm.style.display = 'grid';
    })
});

newProjectForm.addEventListener('submit', createProject);

newTaskForm.addEventListener('submit', createTask)

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

projectList.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'img') {
        projects = projects.filter(project => project.id !== e.target.dataset.deleteProjectButton);
        saveAndRender();
    }
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedProject = projects.find(project => project.id === selectedProjectId)
        const selectedTask = selectedProject.tasks.find(task => task.id = e.target.id)
        selectedTask.complete = e.target.checked;
        save()
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
    renderProjects();

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    if (selectedProjectId == null) {
        return
    } else {
        projectHeader.innerText = selectedProject.name;
    }
    
    clearElement(tasksContainer);
    renderTasks(selectedProject);
}

function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderProjects() {
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

        const projectTrashIcon = document.createElement('img');
        projectTrashIcon.src = './assets/trash.svg'
        projectTrashIcon.dataset.deleteProjectButton = pro.id;
        projectList.appendChild(projectTrashIcon);

        newProjectForm.style.display = 'none';
        
    })
}

 //clear out and refresh all projects from sidebar everytime one is added
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render();

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

function createTask(e) {
    e.preventDefault();
    const taskName = newTaskInput.value;
    if (taskName === null || taskName === '') return
    const task = makeATask(taskName)
    newTaskInput.value = null;
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    selectedProject.tasks.push(task)
    saveAndRender();
}

function makeAProject(name) {
    return {
        id: Date.now().toString(), name: name, tasks: []
    }
}

function makeATask(name) {
    return {
        id: Date.now().toString(), name: name, complete: false
    }
}


window.localStorage.clear();