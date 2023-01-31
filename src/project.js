


export default function Project(projectName, projectId) {
    const tasks = [];
    let idCounter = 1;
    const addTask = (title, description, dueDate) => {
        tasks.push({ id: idCounter, title, description, dueDate });
        idCounter++;
    }
    const findTask = (id) => {
        return tasks.find(tasks => tasks.id === id)
    }
    const deleteTask = (id) => {
        const taskWithIdIndex = tasks.findIndex((task) => task.id === id)
        tasks.splice(taskWithIdIndex, 1)
    }
    return {addTask, findTask, deleteTask, tasks, projectName, projectId}
}