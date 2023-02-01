
const projectList = document.querySelector('.project-items')


export default function displayNewProject(project) {
    const projectListHash = document.createElement('div');
    projectListHash.classList.add('icon-size');
    projectListHash.textContent = '#';
    const projectListItem = document.createElement('p');
    projectListItem.classList.add('project-name');
    projectListItem.setAttribute('data-project', `${project.projectId}`)
    projectListItem.innerText = project.projectName;

    projectList.appendChild(projectListHash);
    projectList.appendChild(projectListItem);
}
