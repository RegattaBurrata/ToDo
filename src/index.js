import Project from "./create-task";

const newProject = Project();

newProject.addTask('send email', 'send an email to this person', '08.09.23');
newProject.addTask('grocery store', 'go to the store', '08.10.23');
newProject.addTask('Do other stuff', 'make this app', '08.10.23');

console.log(newProject.tasks);

newProject.findTask(2);

newProject.deleteTask(2);
