import React from "react";
import TodoItem from "./components/TodoItem";

interface TodoAppProps {}
interface TodoAppState {
  todoItems: string[];
  newTodo: string;
}

class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps) {
    super(props);
    
    this.state = {
      todoItems: [],
      newTodo: "",
    };
  }

  handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: e.target.value,
    });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(this.state.newTodo == "")
      return;
    const items = this.state.todoItems.concat(this.state.newTodo)

    this.setState({
      todoItems: items,
      newTodo: "",
    })
  }

  handleDelete = (idx:number) => {
    const items = this.state.todoItems;

    items.splice(idx, 1);
    this.setState({
      todoItems: items,
      newTodo: "",
    })
  }

  render() {
    return (
      <div className = "divclass">
        <h3>TO DO LIST</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo" className="headerclass">당신의 계획을 기록하세요</label> <br />
          <input type="text" placeholder="계획 내용 입력" id="new-todo" value={this.state.newTodo} onChange={this.handleNewTodo} /> <br />
          <button>#{this.state.todoItems.length + 1}번째 계획 기록</button>
        </form>
        {
          this.state.todoItems.map((item, idx) => (
            <div>
              <TodoItem name={item} key={idx}/>
              <div className="checkbtn" onClick={(e) => {
                e.preventDefault();
                this.handleDelete(idx);
              }}>✅</div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default TodoApp;