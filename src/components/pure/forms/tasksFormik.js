import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LEVELS } from "../../../models/levels.enum";
import { Task } from "../../../models/task.class";
import "../../../styles/taskFormik.scss";
const taskSchema = Yup.object().shape({
    name: Yup.string().required("Task name is required"),
    description: Yup.string().required("Task description is required"),
    level: Yup.string().oneOf(
        [LEVELS.NORMAL, LEVELS.URGENT, LEVELS.BLOCKING],
        "You must select a Level: Normal / Urgent / Blocking"
    ),
});
const TasksFormik = ({ add, length }) => {
    const initialValues = {
        name: "",
        description: "",
        completed: false,
        level: "",
    };

    function addTask(values) {
        console.log(values.name);

        const newTask = new Task(
            values.name,
            values.description,
            false,
            values.level
        );
        add(newTask);
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={taskSchema}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                addTask(values);
            }}
        >
            {({
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
            }) => (
                <Form
                    style={{
                        marginLeft: "20px",
                    }}
                >
                    <div className="fields-container">
                        <label htmlFor="name">Name</label>
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Task name"
                            className="margin-field"
                        />
                        {errors.name && touched.name && (
                            <ErrorMessage name="name" component="div" />
                        )}
                    </div>
                    <div className="fields-container">
                        <label htmlFor="description">Description</label>
                        <Field
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Task description"
                            className="margin-field"
                        />
                        {errors.description && touched.description && (
                            <ErrorMessage name="description" component="div" />
                        )}
                    </div>

                    <div className="fields-container">
                        <label htmlFor="level">Level</label>
                        <Field
                            as="select"
                            name="level"
                            className="margin-field"
                        >
                            <option value={LEVELS.NORMAL}>Normal</option>
                            <option value={LEVELS.URGENT}>Urgent</option>
                            <option value={LEVELS.BLOCKING}>Blocking</option>
                        </Field>
                    </div>
                    <button type="submit" className="btn btn-success">
                        {length === 0 ? "Create task" : "Add task"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default TasksFormik;
