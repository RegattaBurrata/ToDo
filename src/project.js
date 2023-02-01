


export default function Project(name) {
    const tasks = [];
    let id = 1;
    const addTask = (title, description, dueDate) => {
        tasks.push({ id, title, description, dueDate });
        id++;
    }
    const findTask = (id) => {
        return tasks.find(tasks => tasks.id === id)
    }
    const deleteTask = (id) => {
        const taskWithIdIndex = tasks.findIndex((task) => task.id === id)
        tasks.splice(taskWithIdIndex, 1)
    }
    return {addTask, findTask, deleteTask, tasks, name}
}