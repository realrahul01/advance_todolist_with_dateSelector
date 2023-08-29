import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [editInput, setEditInput] = useState('')
  const [date, setDate] = useState(null)
  //addTodoHandler add new todo
  const addTodoHandler = () => {
    setList([...list,
    {
      item: text,
      isEditing: false,
      isChecked: false,
      dueDate: date,
    },
    ])
    setText('')
  }
  console.log(list)
  const editHandler = (index) => {
    const items = [...list]
    items[index].isEditing = true
    setEditInput(items[index].item)
    setList(items)
  }

  const cancelHandler = (index) => {
    const items = [...list]
    items[index].isEditing = false
    setList(items)
  }

  const deleteHandler = (index) => {
    const items = [...list]
    items.splice(index, 1)
    setList(items)
  }

  const saveHandler = (index) => {
    let items = [...list]
    items[index].item = editInput
    items[index].isEditing = false
    setList(items)
  }

  const checkboxHandler = (index) => {
    let items = [...list]
    items[index].isChecked = !items[index].isChecked
    setList(items)
  }
// console.log(new Date().toGMTString())
let value = new Date()
  console.log(value)
let year = value.getFullYear()
let month = (value.getMonth() + 1)
if(month < 10){
  month = '0' + month
}
let day = value.getDate()
if(day < 10){
  day = '0' + day
}
let currentDate = `${year}-${month}-${day}`
  // console.log(currentDate)

// if(currentDate > date){
//   console.log('hello')
// }else{
//   console.log('no')
// }
  // const isDatePassed = currentDate > date;
  
  const listItem = list.map((e, index) => 
    (

    <div 
      key={index} 
      className={`${e.isChecked ? "box_style" : "item_style"} ${currentDate > e.dueDate? "date_style" : ""}`}
      >
      
      {!e.isEditing && (
        <>
          {e.item}
          <Button
            onClick={() => editHandler(index)}
            className="btn-sm my-2 mx-3" variant="primary">Edit
          </Button>
        </>
      )}
      {e.isEditing && (
        <>
          <input type='text' value={editInput} onChange={(e) => setEditInput(e.target.value)} />
          
          <Button
            onClick={() => saveHandler(index)}
            className="btn-sm mx-3 my-2" variant="success">Save
          </Button>
          
          <Button
            onClick={() => cancelHandler(index)}
            className="btn-sm mx-2 my-2" variant="warning">Cancel
          </Button>
        </>
      )}


      <input
        checked={e.isChecked} type="checkbox"
        onClick={() => checkboxHandler(index)}
      />
      <Button
        onClick={() => deleteHandler(index)}
        className="btn-sm mx-3" variant="danger">Delete
      </Button>
      {currentDate > e.dueDate && (
        <>
        {e.dueDate}
        <p>Due date is passed</p>
        </>
      )}
    </div>

  ))





  return (
    <div className="App">
      <h2>Todo-List</h2>
      <input
        type='text'
        placeholder="enter todo.." value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type='date'
        className="mx-2"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />
      <Button
        onClick={addTodoHandler}
        className="btn-sm mx-2" variant="outline-primary">Add Todo</Button>
      <div className="my-3">
        {listItem}
      </div>
    </div>
  );
}

export default App;