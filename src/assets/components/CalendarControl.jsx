import Button from "./Button";

function CalendarControl({dateInfo, onPrev, onNext}){
    const {month, year} = dateInfo;

    return (
        <div className="calendar-header">
            <div className="current">
                {`${year}. ${month + 1}.`}
            </div>
            <div className="calendar-ctl">
                <Button variant="outline" shape="circle" aria-label="이전" className="calendarCtl" onClick={onPrev}><span className="icon"><img src="/src/assets/components/img/arrow-left.svg" /></span></Button>
                <Button variant="outline" shape="circle" aria-label="이후" onClick={onNext}><span className="icon"><img src="/src/assets/components/img/arrow-right.svg" /></span></Button>
            </div>
        </div>
        
    )
}
export default CalendarControl;