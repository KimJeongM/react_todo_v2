import Checkbox from "./Checkbox";
import Category from "./Category";
import { changeDate } from "./util";
import { useCategory } from "./CategoryContext";
import { useTodo } from "./TodoContext";
import styles from '@/assets/components/css/todobox.module.css'; 

function TodoBox({item, editTodoHandler}){
    const {category, completed, date, id, title} = item;
    const {categoryItem} = useCategory();
    const {todoItem, setTodoItem} = useTodo(); 
    const categoryData = categoryItem.find((c) => c.name === category);
    if(!categoryData) return null; 
    const categoryColor = categoryData.color; 
    const onCheckClick = (done) =>{
        const changeTodo =  todoItem.map((item) => {
            if(item.id === id) return {...item, completed : done}
            return item; 
        }); 
        setTodoItem(changeTodo); 
    }
    
    return (
        <li className={styles["todobox"]} data-id={id}>
            <Category categoryTit={category} className={styles["category"]} cateColor={categoryColor} />
            <Checkbox onCheckClick={onCheckClick} completed={completed} id={`todo-${id}`} />
            
            <div 
                className={styles["todo-text"]}
                onClick={() =>editTodoHandler(item)}
            >
                <p className={styles["do"]}>{title}</p>
                <p className={styles["date"]}>{changeDate(date)}</p>
            </div>
        </li>
    )
}

export default TodoBox;