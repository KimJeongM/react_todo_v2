import { lazy, useMemo, useState } from "react";
import { useTodo } from "../components/TodoContext";
import { useCategory } from "../components/CategoryContext";
import Layout from "../components/Layout";
import CalendarControl from "../components/CalendarControl";
import CalendarComp from "../components/CalendarComp";
import TodoBox from "../components/TodoBox";
import EmptySetting from "../components/EmptySetting";
import Button from "../components/Button";
import '@/assets/components/css/calendar.css'; 
import { useCalendarDate } from "../components/useCalendarDate";
import AddTask from "../components/AddTask";
import { AnimatePresence } from "framer-motion";
import { useTodoSheet } from "../components/useTodoSheet";
import { images } from "../components/images";

function Calendar(){
    const {categoryItem} = useCategory();
    const {sheet, editingTodo, addTodoHandler, editTodoHandler, onClose} = useTodoSheet();
    const {todoItem, setTodoItem, addTodo, removeTodo} = useTodo();
    const {current, clickDate, onPrev, onNext, dateTodo} = useCalendarDate(); 
    const todosByDate = useMemo(()=>{
        return todoItem.reduce((acc, todo)=>{
            const date = new Date(todo.date); 
            if(date.getFullYear() === current.year && date.getMonth() === current.month){
                const d = date.getDate();
                if(!acc[d]) acc[d] = [];
                acc[d].push(todo)
            }
            return acc
        }, {})
    }, [todoItem, current]); 
    const selectedTodos = todosByDate[new Date(clickDate).getDate()];

    const bottomSheetDataHandler = (info)=>{
        if(!editingTodo){
            addTodo(info)
        }else{
            const updateDate = todoItem.map((item) => (editingTodo.id === item.id)? {...editingTodo, ...info} : {...item});
            setTodoItem(updateDate);
        }
        onClose();
    }
    const removeTodoHandler = (item) =>{
        removeTodo(item); 
        onClose();
    }
    return (
        <Layout headerContent={<CalendarControl dateInfo={current} onPrev={onPrev} onNext={onNext} />}>
            <CalendarComp 
                now={current} 
                propCategoryItem={categoryItem} 
                clickDate={clickDate} 
                onDateClick={dateTodo} 
                todosByDate={todosByDate}
            />
            <div className="task-wrap">
                <p className="task-title">Your Task</p>
                {
                    selectedTodos? 
                    <ul className="todobox-list">
                        {selectedTodos.map((item) => <TodoBox  item={item} key={item.id} editTodoHandler={editTodoHandler} />)}
                    </ul> 
                    : <EmptySetting />
                }
            </div>
            <Button 
                className="large-circle plus"  
                color="violet"
                onClick={addTodoHandler}
            >
                <span className="icon">
                    <img src={images.add2} alt="" />
                </span>
            </Button>
            <AnimatePresence >
                {
                    sheet === 'addTask' 
                        && <AddTask 
                                onClose={() => onClose()} 
                                clickDate={clickDate}
                                bottomSheetDataHandler={bottomSheetDataHandler}
                                editingTodo={editingTodo}
                                removeTodoHandler={removeTodoHandler}
                            />
                }
            </AnimatePresence>
        </Layout>
    );
}
export default Calendar; 