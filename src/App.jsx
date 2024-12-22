import { useRef, useState, useEffect } from 'react'
import './App.css'
import Todotab from './components/todo'

function App() {
  const [todoval, settodoval] = useState("")
  const [todo, settodo] = useState([])
  const [checkedtodos, setcheckedtodos] = useState([])
  const [comtodo, setcomtodo] = useState(false)
  useEffect(() => {
    let alltodos = JSON.parse(localStorage.getItem("todos"))
    if (alltodos) {
      settodo(alltodos); // Parse the stored todos and set state
    }
    let allctodos = JSON.parse(localStorage.getItem("ctodos"))
    if (allctodos) {
      setcheckedtodos(allctodos); // Parse the stored todos and set state
    }
  }, [])
  function todoupdate(e, v, key) {
    const updatedTodos = todo.map((item) => {
      if (item.id === key) {
        return { ...item, text: e }; // Return a new object with the updated text
      }
      return item;
    });
    settodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    v(!v); // Close the editing mode
  }

  const Handlechange = (e) => {
    settodoval(e.target.value)

  }
  const addtodo = async (e) => {
    let response = await fetch("https://www.uuidtools.com/api/generate/v4")
    let data = await response.text()
    if (todoval != "") {
      const todoar = {
        id: data,
        text: todoval,
      }
      let pre_todo = [...todo, todoar]
      localStorage.setItem("todos", JSON.stringify(pre_todo))
      settodo(pre_todo)
      settodoval("")
    }
  }

  function deltodo(e) {
    const updatedTodos = todo.filter((item) => item.id !== e);
    // Update the state and localStorage
    settodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function delcomtodos(e) {
    // Filter out the completed todo from checkedtodos
    const updatedCheckedTodos = checkedtodos.filter((item) => item.id !== e);
    // Update the state and localStorage
    setcheckedtodos(updatedCheckedTodos);
    localStorage.setItem("ctodos", JSON.stringify(updatedCheckedTodos));
  }
  
  function checkedtodo(e) {
    // Find the completed todo
    const completedTodo = todo.find((item) => item.id === e);
    if (completedTodo) {
      // Check if the item already exists in checkedtodos to prevent duplicates
      if (!checkedtodos.some((item) => item.id === completedTodo.id)) {
        const updatedCheckedTodos = [...checkedtodos, completedTodo];
        setcheckedtodos(updatedCheckedTodos);
        localStorage.setItem("ctodos", JSON.stringify(updatedCheckedTodos));
      }
    }
  
    // Filter out the completed todo from the main todo list
    const updatedTodos = todo.filter((item) => item.id !== e);
    settodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  




  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>
      <div className="container flex justify-center items-center h-screen w-full  ">
        <div className="mainbox bg-transparent backdrop-blur-xl border-2 rounded-2xl w-5/6 h-5/6 m-16 p-3 sm:w-2/3 sm:h-5/6">
          <nav className='w-full my-4 text-center'>
            <h1 className='text-5xl text-white'>Todo List </h1>
          </nav>
          <div className="add flex flex-col gap-3 my-4 mx-2 sm:flex-row sm:items-center">
            <h1 className="text-lg font-medium text-white ">Add a new todo:</h1>
            <input
              type="text"
              placeholder="Enter your task"
              className="rounded-lg flex-grow px-3 py-2  input-todo outline-none "
              value={todoval}
              onChange={Handlechange}
            />
            <button className="text-white bg-blue-600 px-3 py-2  hover:bg-blue-700 rounded-lg" onClick={addtodo}>Add</button>
          </div>
          <div className="done-todo flex gap-3 my-6 mx-2">
            <input type="checkbox" name="" id="" onChange={() => {
              setcomtodo(!comtodo)
              console.log();



            }
            } />
            <h1 className='text-white font-medium text-sm'>Show Completed Todos</h1>
          </div>
          <div className="line"></div>
          <div className="todos flex-grow mx-2">
            <h1 className='text-xl my-2 text-white font-medium underline underline-offset-2'>Your Todos</h1>
            <div className='overflow-y-auto h-60 sm:h-96'> {/* Set a height limit here */}
              {comtodo ? (checkedtodos.map((e) => {
                return (
                  <Todotab key={e.id} details={e} todoupdate={todoupdate} deltodo={deltodo} checkedtodo={checkedtodo} showchecked={true} delcomtodos={delcomtodos} />
                )
              })) : (todo.map((e) => {
                return (
                  <Todotab key={e.id} details={e} todoupdate={todoupdate} deltodo={deltodo} checkedtodo={checkedtodo} showchecked={false} />
                )
              }))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
