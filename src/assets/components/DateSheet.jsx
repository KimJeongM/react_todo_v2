import BottomSheet from "./BottomSheet";
import CalendarComp from "./CalendarComp";
import Button from "./Button";
import CalendarControl from "./CalendarControl";
import { useCalendarDate } from "./useCalendarDate";

function DateSheet({initDate, dataSend}){
    const {current, clickDate, onPrev, onNext, dateTodo} = useCalendarDate(initDate); 
    return (
        <BottomSheet>
            <>
                <CalendarControl 
                    dateInfo={current} 
                    onPrev={onPrev} 
                    onNext={onNext} 
                />
                <CalendarComp 
                    now={current}
                    clickDate={clickDate} 
                    onDateClick={dateTodo}  
                />
                <div className="bottom-btn-area">
                    <Button 
                        className="outline2" 
                        color="red" 
                        onClick={()=> dataSend(clickDate)}
                    >OK</Button>
                </div>
            </>
        </BottomSheet>
    )
}



export default DateSheet; 