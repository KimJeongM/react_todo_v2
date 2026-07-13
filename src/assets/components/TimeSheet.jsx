import { useState } from "react";
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import '@/assets/components/css/time.css';

function TimeSheet({initTime, timeDelete, dataSend}){
    const timeArray = initTime?.split(':'); 
    const nowHour = (initTime)? Number(timeArray[0]) : new Date().getHours(); 
    const nowMinute = (initTime)? Number(timeArray[timeArray.length - 1]) : new Date().getMinutes(); 


    const [meridiem, setMeridiem] = useState(nowHour>=12? 'PM' : 'AM'); 
    const [hour, setHour] = useState(()=>{
        const h = nowHour % 12;
        return h === 0 ? 12 : h; 
    }); 
    const [minute, setMinute] = useState(()=>Math.floor(nowMinute / 5) * 5);

    return (
        <BottomSheet>
            <div className="time-sheet">
                <div className="ampm-toggle">
                    <Button 
                        className={`ampm-btn ${meridiem === 'AM' ? 'is-active' : ''}`}
                        onClick={()=> setMeridiem('AM')} 
                    >오전</Button>
                    <Button 
                        className={`ampm-btn ${meridiem === 'PM' ? 'is-active' : ''}`}
                        onClick={()=>setMeridiem('PM')}
                    >오후</Button>
                </div>
                <div className="time-section">
                    <div className="time-section-label">시</div>
                    <div className="time-grid">
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(h => (
                            <Button key={h} 
                                className={`time-cell ${hour === h ? 'is-selected' : ''}`}
                                onClick={()=>setHour(h)}
                            >
                                {h}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="time-section">
                    <div className="time-section-label">분</div>
                    <div className="time-grid">
                        {[0,5,10,15,20,25,30,35,40,45,50,55].map(m => (
                            <Button key={m} 
                                className={`time-cell ${minute === m ? 'is-selected' : ''}`}
                                onClick={()=>setMinute(m)}
                            >
                                {String(m).padStart(2, '0')}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom-btn-area">
                <Button className="outline2" onClick={() => timeDelete()}>Alert Delete</Button>
                <Button 
                    className="outline2" 
                    color="red"
                    onClick={()=> {
                        const calH = meridiem == 'PM' ? hour + 12 : hour;
                        dataSend(`${calH}:${minute}`)
                    }}
                >
                    OK
                </Button>
            </div>
        </BottomSheet>
    );
}

export default TimeSheet; 