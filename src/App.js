import Header from './components/header';
import Tasks from './components/Tasks';
import React from 'react';
import AddTask from './components/AddTask';
import {useState,useEffect} from 'react';

function App() {
  const [showAdd,setShowAddTask]=useState(false);
  const [tasks,setTasks]=useState([])
  
  useEffect(()=>{
     const getTask = async () => {
          const tasksfromServer = await fetchTasks()
          setTasks(tasksfromServer)
     }
     getTask()
    },[])
  //fetch the task
  const fetchTasks = async ()=> {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json(); 
    return data; 
  }

  //Add Task
  const addTask = async(task)=>{
    // const id = (tasks.length)+1;
    // const newTask = {id,...task}
    // setTasks([...tasks,newTask]); 
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type' : 'application/json'
      },
      body:JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks,data]);
  }

  //Delete
  const deleteTask = async (id)=>{
     await fetch(`http://localhost:5000/tasks/${id}`,{
       method:'DELETE'
     })
     
    setTasks(tasks.filter((task)=> task.id !==id))
  }
  //Toggle Reminder
  const toggleReminder =(id)=>{
    setTasks(tasks.map((task)=> task.id === id ? {...task,reminder:!task.reminder}:task))
  }
  return (
    <div className="container">
       <Header onAdd={()=>setShowAddTask(!showAdd)} btnText={showAdd}/>
       {showAdd && <AddTask onAdd={addTask}/>}
       { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks'}
    </div>
  );
} 
export default App;