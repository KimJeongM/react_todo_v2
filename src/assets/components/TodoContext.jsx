import { createContext, useContext, useEffect, useState } from "react";
import { FetchData } from "./FetchData";

const TodoContext = createContext([]); 
const KEY = 'todo'; 

export function TodoProvider({children}){
    const [todoItem, _setTodoItem] = useState([]); 

    const setTodoItem = (updated) => {
        _setTodoItem(updated); 
        localStorage.setItem(KEY, JSON.stringify(updated))
    }
    
    const todoURL = '/todos.json'; 
    useEffect(()=>{
        const loadData = async () =>{
            const saved = localStorage.getItem(KEY); 
            if(saved){
                setTodoItem(JSON.parse(saved)); 
            }else{
                const todoJson = await FetchData(todoURL); 
                setTodoItem(todoJson.todos);
                localStorage.setItem(KEY, JSON.stringify(todoJson.todos))
            }
        }
        loadData();
    }, []); 

    const addTodo = (newTodoProp) =>{
        setTodoItem((prev) =>{
            const updated =  [...prev, {...newTodoProp}]; 
            localStorage.setItem(KEY, JSON.stringify(updated)); 
            return updated; 
        }); 
    }

    const removeTodo = (id) => {
        setTodoItem((prev) => {
            const updated = prev.filter((item) => item.id !== id); 
            localStorage.setItem(KEY, JSON.stringify(updated)); 
            return updated;
        }); 
    }

    return (
        <TodoContext.Provider  value={{todoItem, setTodoItem, addTodo, removeTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext);
