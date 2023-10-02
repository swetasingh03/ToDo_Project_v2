import React, { useState, useEffect, useRef } from 'react'
import noteImage from '../asset/images/notes.png'
import { FaPlus, FaRegEdit, FaTrashAlt } from "react-icons/fa";

// get data from localstorage through a function
function getLocalItems() {
    const taskList = localStorage.getItem('tasks');
    if (taskList) {
        return JSON.parse(localStorage.getItem('tasks'));
    } else {
        return []
    }
}

function TodoList() {

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState(getLocalItems());
    const [editIndex, setEditIndex] = useState(null);
    const formRef = useRef(null);

    // add data to localstorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask === "" || newTask === null) {
            alert('please fill the input box')
        } else {
            if (editIndex !== null) {
                const updatedTasks = tasks.slice();
                updatedTasks[editIndex] = newTask;
                setTasks(updatedTasks);
                setEditIndex(null);
            } else {
                setTasks([...tasks, newTask]);
            }
            setNewTask('');
        }
    }

    const handleEditTask = (index) => {
        setNewTask(tasks[index]);
        setEditIndex(index);
    };

    const handleRemoveTask = (index) => {
        const updatedTask = tasks.filter((_, i) => i !== index);
        setTasks(updatedTask)
    }


    return (
        <div className='todo-box'>
            <div className='todo-content-box'>
                <img src={noteImage} width="50px"></img>
                <h3 className='todo-h3' >Add Your List Here ✌️</h3>
                <div className='todo-input-box'>
                    <input type="text" placeholder='✌️Add Item....' className='todo-input' value={newTask} onChange={handleInputChange}></input>
                    <button className='todo-button' type="submit" onClick={handleAddTask}><FaPlus /><span>Add</span></button>
                </div>
                {tasks.map((data, index) => {
                    return (<div className='todo-list-box'>
                        <div className='todo-list' key={index}>
                            <div className='todo-list-content'>
                                <p>{data}</p>
                            </div>
                            <div className='todo-list-button'>
                                <FaRegEdit style={{ color: '#32ff4d' }} onClick={() => handleEditTask(index)} />
                                <FaTrashAlt style={{ color: 'red' }} onClick={() => handleRemoveTask(index)} />
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default TodoList