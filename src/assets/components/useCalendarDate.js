import { addZero } from "./util";
import { useState } from "react";

const TODAY = new Date(); 

export function useCalendarDate(initDate){
    const base = initDate? new Date(initDate) : TODAY; 
    const [current, setCurrent] = useState(() => ({year : base.getFullYear(), month : base.getMonth()}))
    const [clickDate, setClickDate] = useState(`${base.getFullYear()}-${addZero(base.getMonth() + 1)}-${addZero(base.getDate())}`); 
    
    const adjustDate = (month) => {
        const corrected = new Date(current.year, month); 
        const showDate = (corrected.getMonth() === TODAY.getMonth()) ? TODAY.getDate() : 1
        setCurrent({year : corrected.getFullYear(), month : corrected.getMonth()});
        setClickDate(`${corrected.getFullYear()}-${addZero(corrected.getMonth() + 1)}-${addZero(showDate)}`)
    }

    const onPrev = () =>  adjustDate(current.month - 1);
    const onNext = () => adjustDate(current.month + 1);

    const dateTodo = (day) => {
        if(!day.current) return ;
        const fullDate = `${current.year}-${addZero(current.month + 1)}-${addZero(day.date)}`; 
        setClickDate(fullDate); 
    }

    return {current, clickDate, onPrev, onNext, dateTodo}
}