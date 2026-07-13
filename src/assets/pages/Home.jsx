import Layout from "../components/Layout";
import LogoHeader from "../components/LogoHeader";
import { useState, useEffect } from "react";
import { useCategory } from "../components/CategoryContext";
import { useTodo } from "../components/TodoContext";
import { getToday } from "../components/util";
import TodoBox from "../components/TodoBox";
import EmptySetting from "../components/EmptySetting";
import '@/assets/pages/css/page.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode'; 
import Button from "../components/Button";
import { addZero } from "../components/util";
import { useTodoSheet } from "../components/useTodoSheet";
import { useCalendarDate } from "../components/useCalendarDate";
import { AnimatePresence } from "framer-motion";
import AddTask from "../components/AddTask";
import { useNavigate } from "react-router-dom";

const date = new Date();
function Home(){
    const {categoryItem, isLoaded} = useCategory();
    const {todoItem, setTodoItem, addTodo, removeTodo} = useTodo();
    const {sheet, editingTodo, addTodoHandler, editTodoHandler, onClose} = useTodoSheet();
    const {clickDate} = useCalendarDate(); 
    const [termFilter, setTermFilter] = useState('today'); 
    const today = Object.values(getToday()).join('-');
    const {start, end} = getTermRange(termFilter); 
    const termTodo = todoItem.filter((item) => item.date >= start && item.date <= end); // [수정] todayTodo -> termTodo, item.date === today -> 범위 비교
    const homeCategoryItem = [{ "id": 0, "name": "All" }, ...categoryItem]; 
    const [activeId, setActiveId] = useState(homeCategoryItem[0]?.id); 
    const filterTodo = (activeId === 0)? termTodo : termTodo.filter((todo) => todo.category === homeCategoryItem.find(c => c.id === activeId).name)
    const categoryClick = (id) => setActiveId(id); 
    const greeting = getGreeting();
    const navigate = useNavigate(); 

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
    useEffect(()=>{
        if(categoryItem.length === 0 && isLoaded){
            navigate('/category'); 
        }
        console.log('----------------', categoryItem)
    }, [categoryItem, navigate])
    


    return (
        <Layout headerContent={<LogoHeader />}>
            <div className="home-text-wrap">
                <p className="home-date">{today.replaceAll('-', '. ')}</p>
                <p className="home-text">
                    <span>{greeting}</span>.<br/>                    
                    Check your task
                </p>
            </div>
            {categoryItem.length > 0 ? 
            <>
                <div className="category-wrap">
                    <Swiper spaceBetween={8} slidesPerView="auto" modules={[FreeMode]} freeMode={true} style={{ width: '100%' }} > {/*   */}
                    {
                        homeCategoryItem.map((item) =>( 
                                <SwiperSlide key={item.id} >
                                    <Button 
                                        variant="outline" 
                                        active={activeId === item.id}
                                        onClick={() => categoryClick(item.id)}
                                    >
                                        {item.name}
                                    </Button>
                                </SwiperSlide>
                            )
                        )
                    }
                    </Swiper>
                </div>
                <div className="term-filter-wrap">
                    {
                        ['today', 'week', 'month'].map((item, index) => (
                            <Button 
                                key={index} 
                                className={termFilter == item? 'active' : ''}
                                onClick={()=>setTermFilter(item)}
                            >{item}</Button>
                        ))
                    }
                </div>
                <div className="today-wrap">
                    <div className="todobox-wrap">
                        {
                            filterTodo.length > 0? 
                            <ul className="todobox-list">
                                { filterTodo.map((item) => <TodoBox item={item} key={item.id} editTodoHandler={editTodoHandler} />)}
                            </ul>
                            : <EmptySetting/>
                        }
                    </div>
                </div>
            </>
            : <EmptySetting />
            } 
            <Button 
                className="large-circle plus"  
                color="violet"
                onClick={addTodoHandler}
            >
                <span className="icon">
                    <img src="/src/assets/components/img/add2.svg" alt="" />
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
    )
}

function getGreeting(){
    const hour = date.getHours(); 
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Still up?'; // 21시~새벽 5시
}

function getTermRange(term){
    if(term === 'today'){
        const str = Object.values(getToday()).join('-');
        return {start : str, end : str}
    }

    if(term === 'week'){
        const day = date.getDay(); // 0(일)~6(토)
        const monday = new Date(date);
        monday.setDate(date.getDate() - ((day + 6) % 7)); // 이번 주 월요일
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        return { start: formatDate(monday), end: formatDate(sunday) };
    }

    if(term === 'month'){
        const first = new Date(date.getFullYear(), date.getMonth(), 1); 
        const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return {start : formatDate(first), end : formatDate(last)}
    }
}

function formatDate(d){
    const y = d.getFullYear(); 
    const m = addZero(d.getMonth() + 1); 
    const day = addZero(d.getDate()); 
    return `${y}-${m}-${day}`; 
}
export default Home