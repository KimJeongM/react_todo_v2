import { useState } from "react"; 

export function useTodoSheet(){
    const [sheet, setSheet] = useState(null) //addTask | null;
    const [editingTodo, setEditingTodo] = useState(null) // null이면 추가 / 객체가 있으면 수정

    const addTodoHandler = () => {
        setEditingTodo(null); 
        setSheet('addTask');
    }

    const editTodoHandler = (item) =>{
        setEditingTodo(item); 
        setSheet('addTask');
    }

    const onClose = () =>{
        setEditingTodo(null); 
        setSheet(null);
    }

    return {sheet, editingTodo, addTodoHandler, editTodoHandler, onClose}
}