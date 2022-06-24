import React, { useEffect, useState } from "react";
import { Task } from "../../models/task.class";
import { LEVELS } from "../../models/levels.enum";
import TaskComponent from "../pure/task";
import "../../styles/task.scss";
import TasksFormik from "../pure/forms/tasksFormik";

const TaskListComponent = () => {
    const defaultTask1 = new Task(
        "Example 1",
        "Default description 1",
        true,
        LEVELS.NORMAL
    );

    const defaultTask2 = new Task(
        "Example 2",
        "Default description 2",
        false,
        LEVELS.URGENT
    );

    const defaultTask3 = new Task(
        "Example 3",
        "Default description 3",
        false,
        LEVELS.BLOCKING
    );

    const [tasks, setTasks] = useState([
        defaultTask1,
        defaultTask2,
        defaultTask3,
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Task state have been modified");
        // TODO: Control data request
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => {
            console.log("TaskList component is going to unmount");
        };
    }, [tasks]);

    function completeTask(task) {
        console.log(`Complete this task`, task);
        const index = tasks.indexOf(task);
        const tempTask = [...tasks];
        tempTask[index].completed = !tempTask[index].completed;
        setTasks(tempTask);
    }

    function deleteTask(task) {
        console.log(`Delete this task`, task);
        const index = tasks.indexOf(task);
        const tempTask = [...tasks];
        tempTask.splice(index, 1);
        setTasks(tempTask);
    }

    function addTask(task) {
        const tempTask = [...tasks];
        tempTask.push(task);
        setTasks(tempTask);
    }

    const TaskTable = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <TaskComponent
                            key={index}
                            task={task}
                            complete={completeTask}
                            remove={deleteTask}
                        />
                    ))}
                </tbody>
            </table>
        );
    };
    return (
        <div className="col-12">
            <div className="card">
                <div className="card-header p-3">
                    <h5>Your Tasks:</h5>
                </div>
                <div
                    className="card-body"
                    data-mdb-perfect-scrollbar="true"
                    style={{ position: "relative", high: "400px" }}
                >
                    {loading ? (
                        <p>Loading Tasks..</p>
                    ) : tasks.length !== 0 ? (
                        <TaskTable />
                    ) : (
                        <div>
                            <h3>You have not tasks</h3>
                        </div>
                    )}
                </div>
            </div>
            <TasksFormik add={addTask} length={tasks.length} />
        </div>
    );
};

export default TaskListComponent;
