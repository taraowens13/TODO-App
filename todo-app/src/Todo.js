import React from 'react'
let todoList = [
    {
       id: 1,
       completed: true,
       description: "Complete this task"
    },
    {
       id: 2,
       completed: true,
       description: "Complete this task"
    }
 ]
 
 export default class Todo extends React.Component {
    constructor(props) {
       super(props)
       let inputRef = React.createRef()
       let checkRef = React.createRef()
       let filterRef = React.createRef()
       this.state = {todoList,curId:todoList.length+1,inputRef,checkRef,filtered:false,filterRef}
    }
    completeItem = (itemId) => {
       this.setState((prevState) => {
          let prevList = prevState.todoList
          let itemIndex = prevList.findIndex((item) => item.id === itemId)
          prevList[itemIndex].completed = !prevList[itemIndex].completed
          return {todoList:prevList}
       })
    }
    handleKeyPress = (event) => {
       console.log("Pressed")
       console.log(event.key)
       if (event.key === "Enter") {
          this.addTodoItem()
       }
    }
    addTodoItem = () => {
       let prevValue = this.state.inputRef.current.value
       this.setState(prevState => ({
          todoList: [...prevState.todoList,
             { completed: false, description: prevValue, id: prevState.curId }],
          curId:prevState.curId+1
       }))
       this.state.inputRef.current.value = ""
    }
 render() {
    let todoList = this.state.todoList
    if(this.state.filtered) {
       todoList = todoList.filter(item => !item.completed)
    }
       todoList = todoList.map((item) => (
       <div key={item.id}>
          <label>
                <input ref={this.state.checkRef} type="checkbox" onChange={() => this.completeItem(item.id)} defaultChecked= {item.completed ? "checked=true" : undefined}></input>
                <span style={item.completed ? {textDecoration: "line-through"} : undefined}>{item.description}</span>
          </label>
       </div>
       ))
 
    return ( <>
    <div id="task-box">
       <h1>Today's tasks</h1>
          <label>
             <input ref={this.state.filterRef} type="checkbox"
             onChange={(e) => this.setState((prev) => ({ filtered: !this.state.filtered }))}
             defaultChecked= {false}></input>
          Remove completed tasks
          </label>
          <hr></hr>
       <div style={{padding:"5px"}}>   
          {todoList}
       </div>
       <br></br>
       <input onKeyPress={(event) => this.handleKeyPress(event)} ref={this.state.inputRef} ></input>
       <button onClick={() => this.addTodoItem()}>Add a task</button>
       </div>
    </>
 )
 }
 }