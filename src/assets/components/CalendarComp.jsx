import '@/assets/components/css/calendar.css'; 

const TODAY = new Date();
function CalendarComp({now, onDateClick, clickDate, todosByDate, propCategoryItem}){
    const categoryItem = propCategoryItem || []; 
    const current = now 

    const renderWeeks = () => {
        const {month, year} = current;
        const firstDay = new Date(year, month, 1).getDay(); 
        const lastDate = new Date(year, month + 1, 0).getDate(); 
        const prevLastDate = new Date(year, month, 0).getDate();

        const cells = [
            ...Array(firstDay).fill(null).map((_, i) => ({
                date : prevLastDate - firstDay + 1 + i, 
                current : false
            })),
            ...Array.from({length : lastDate}, (_, i) => ({
                date : i + 1, 
                current : true
            }))
        ]
        while(cells.length % 7 !== 0) {
            cells.push({
                date : cells.length - lastDate - firstDay + 1, 
                current : false
            })
        }
        const weeks = []; 
        for(let i = 0; i < cells.length; i += 7){
            weeks.push(cells.slice(i, i + 7));
        }
        return weeks
    }
    const weekArray = renderWeeks(); 

    return (
        <div className="calendar-wrap">
            <div className="calendar-header">
                <div className="week">
                    {
                        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d=>(
                            <div className="date" key={d}>{d}</div>
                        ))
                    }
                </div>
            </div>
            <div className="calendar-body">
                {weekArray.map((week, wi) => (
                    <div className="week" key={wi}>
                        {week.map((day, di) => {
                            const today = day.current 
                            && TODAY.getFullYear() === current.year 
                            && TODAY.getMonth() === current.month 
                            && TODAY.getDate() === day.date;
                            const clickedDate = day.current
                                                        && new Date(clickDate).getFullYear() ===  current.year 
                                                        && new Date(clickDate).getMonth() === current.month
                                                        && new Date(clickDate).getDate() === day.date;
                            
                            return (
                                <div key={di} className={`day ${today? 'is-today' : ''} ${clickedDate? 'click-date' : ''}`} style={{color:day.current? '' : '#7b7b7b'}}  onClick={()=>{onDateClick?.(day)}}>
                                    <span className="date-num">{day.date}</span>
                                    {todosByDate && (<div className="todo-point">
                                        {
                                            (()=>{
                                                const todoCategoryId = [...Array.from(new Set( day.current ? (todosByDate[day.date]||[]).map((todo) => todo.categoryId) : []))]; 
                                                const points = todoCategoryId.map((id)=>{
                                                    const category =  categoryItem.find((item) => Number(item.id) === Number(id)); 
                                                    if(!category) return null; 
                                                    const pointStyle ={"background" : category.color}
                                                    return <span className="point" style={pointStyle} arialable={category.name} key={category.id}></span>
                                                }); 
                                                return points;
                                            })()
                                        }
                                    </div>)}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CalendarComp; 