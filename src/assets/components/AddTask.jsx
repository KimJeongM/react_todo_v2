import { Suspense, lazy, useMemo, useState } from "react";
import BottomSheetWrap from "./BottomSheetWrap";
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import { AnimatePresence } from "framer-motion";
import { generateId } from "./util";
import { images } from "../components/images";

const CategorySheet = lazy(() => import('./CategorySheet'));
const DateSheet = lazy(()=> import('./DateSheet')); 
const TimeSheet = lazy(() => import('./TimeSheet'));

function AddTask({onClose, bottomSheetDataHandler, editingTodo, removeTodoHandler}){
    const [sheet, setSheet] = useState('addTask'); // null | 'addTask' | 'category' | 'date' | 'time'
    const closeAll = () =>{
        setSheet(null);
       onClose?.();
    }

    const [todoText, setTodoText] = useState(editingTodo?.title ?? ''); 
    const [initCategory, setInitCategory] = useState(editingTodo?.category ?? ''); 
    const [initDate, setInitDate] = useState(editingTodo?.date ?? ''); /* 2026-02-02 */
    const [initTime, setInitTime] = useState(editingTodo?.alarm ?? '') /* 13:50 */
    const isValid = useMemo(()=>{
        return !!initCategory && !!initDate && todoText.trim().length > 0; 
    }, [initCategory, initDate, todoText])

    const categorySend = (categoryName) => {
        setInitCategory(categoryName); 
        setSheet('addTask');
    }
    const dateSend = (date) => {
        setInitDate(date); 
        setSheet('addTask')
    }
    const timeSend = (time) => {
        setInitTime(time); 
        setSheet('addTask')
    }
    const timeDelete = ()=>{
        /* 알림이 있다면 지운다. */
        setInitTime('');  // 빈공백이 null
        setSheet('addTask'); 
    }
    const tossTaskData = () =>{
        const newData =  {
            id : editingTodo? editingTodo.id : generateId(), 
            title : todoText, 
            category : initCategory, 
            date : initDate, 
            alarm : initTime,  
            completed : editingTodo? editingTodo.completed : false, 
            categoryId : editingTodo? editingTodo.categoryId : generateId()
        }
        closeAll();
        bottomSheetDataHandler(newData);
    }
    return(
        <BottomSheetWrap addTodoData todoInfo onClose={closeAll} initCategory="" initDate="" initTime="" >
            <Suspense fallback={null}>
                <AnimatePresence mode="wait">
                    {sheet === 'addTask' && (
                        <BottomSheet key="addTask" onClose={closeAll}>
                            <div className="text-area-wrap"  >
                                <textarea className={'text-area'} placeholder="input new task here..."  value={todoText}
                                onChange={(e) => setTodoText(e.target.value)}>
                                </textarea>
                            </div>
                            <div className="data-show">
                                {initDate && <p>date  : {initDate}</p>}
                                {initTime && <p>time  : {initTime}</p>}
                            </div>
                            <div className="toolbar">
                                <Button 
                                    onClick={() => setSheet('category')} 
                                    className="category-btn"
                                >
                                    <span className="category-name">{initCategory === ''? '카테고리 선택' : initCategory}</span>
                                </Button>
                                <Button 
                                    onClick={() => setSheet('date')} 
                                    shape="circle" 
                                >
                                    <span className="icon"><img src={images.icoCalendar} /></span>
                                </Button>
                                <Button 
                                    onClick={() => setSheet('time')} 
                                    shape="circle"
                                >
                                    <span className="icon"><img src={images.icoClock} /></span>
                                </Button>
                            </div>
                            <div className="bottom-btn-area">
                               {
                                    editingTodo 
                                        && <Button className="outline2" 
                                            onClick={()=>{
                                                removeTodoHandler(editingTodo.id);
                                                closeAll();
                                            }}
                                        >Delete</Button>
                                }
                                <Button 
                                    className="outline2" 
                                    color="red" 
                                    disabled={!isValid} 
                                    onClick={()=>tossTaskData()}
                                >
                                    {editingTodo? 'Edit' : 'Add'}
                                </Button>
                            </div>
                        </BottomSheet>
                    )}
                    {sheet === 'category' && (
                        <CategorySheet 
                            key="category" 
                            dataSend={categorySend}
                            initCategory={initCategory}
                        />
                    )}
                    {sheet === 'date' && (
                        <DateSheet 
                            key="date" 
                            dataSend={dateSend}
                            initDate={initDate}
                            /* initDate="2026-06-30" */
                        />
                    )}
                    {sheet === 'time' && (
                        <TimeSheet 
                            key="time"
                            dataSend={timeSend}
                            timeDelete={timeDelete}
                            initTime={initTime}
                        />
                    )}
                </AnimatePresence>
            </Suspense>
        </BottomSheetWrap>
    );
}

export default AddTask