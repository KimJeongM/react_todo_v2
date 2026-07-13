import Layout from "../components/Layout";
import { useCategory } from "../components/CategoryContext";
import { useEffect, useMemo, useRef } from "react";
import Button from "../components/Button";
import GraphHeader from "../components/GraphHeader";
import { useCalendarDate } from "../components/useCalendarDate";
import { addZero } from "../components/util";
import { useTodo } from "../components/TodoContext";


function Graph(){
    const {categoryItem} = useCategory();
    const {todoItem} = useTodo();
    const {current, onPrev, onNext} = useCalendarDate(); 
    const thisMonthTodo = todoItem.filter((item)=>{
        const date = new Date(item.date); 
        return (current.year === date.getFullYear() &&  current.month === date.getMonth())
    }); 
    

    const group = useMemo(()=>{
        let categoryObj = {}
        console.log(categoryItem)
        categoryItem.forEach((item) => categoryObj[item.name] = {done : 0, total : 0}); 
        const thisMonthGroup = (thisMonthTodo ?? []).reduce((acc, todo)=>{
            const category = todo.category;
            if(!acc[category])  acc[category] = {done : 0, total : 0} ;
            acc[category].total += 1; 
            if(todo.completed) acc[category].done += 1; 
            return acc
        }, {}); 
        return {...categoryObj, ...thisMonthGroup}
    }, [thisMonthTodo, categoryItem]); 
    
    const graphUnit = (()=>{
        const max = Math.max(...Object.values(group ?? {}).map(item=>item.total)) ; 
        return max > 0 ? (100 / max) : 0
    })(); 

    const totalDone = Object.values(group ?? {}) .reduce((acc, {done}) => acc + done, 0); 
    const total = Object.values(group ?? {}) .reduce((acc, {total}) => acc + total, 0); 
    const barH = 120; /*  높이값은 고정이나 이걸 상태관리로 돌려야 되나.. */
    

    return(
        <Layout headerContent={<GraphHeader/>}>
            <div className="graph-wrap">
                    <div className="graph-controller">
                        <p className="date">{`${current.year}.${addZero(current.month + 1)}`}</p>
                        <div className="graph-ctl">
                            <Button variant="outline" shape="circle" aria-label="이전"  onClick={() => onPrev()}>
                                <span className="icon"><img src="/src/assets/components/img/arrow-left.svg" /></span>
                            </Button>
                            <Button variant="outline" shape="circle" aria-label="이후" onClick={() => onNext()} >
                                <span className="icon"><img src="/src/assets/components/img/arrow-right.svg" /></span>
                            </Button>
                        </div>
                    </div>
                    <div className="graph-container">
                        {
                            graphUnit <= 0? 
                            (
                            <div className="graph-empty-box">
                                <p className="empty-text">아직 할 일이 없어요. <br />하나씩 추가하고 완료해보세요</p>
                            </div>
                            ) : 
                            (
                                <>
                                    <div className="complete-box">
                                       {/*  <span className="complete-index">{totalDone}</span> */}
                                        <span className="complete-text">Completed task</span>
                                    </div>
                                    <div className="graph-inner">
                                        <div className="bar-group">
                                            {
                                                categoryItem.map((item, index) => {
                                                    console.log()
                                                    const h = Math.floor(barH * (graphUnit / 100) * group?.[item.name]?.total )
                                                    return (
                                                        <div className="bar-item" style={{'--category-color' : `${item.color}`}} key={index}>
                                                            <span className="bar-count">{`${group?.[item.name]?.done}/${group?.[item.name]?.total}`}</span>
                                                            <div className="bar" style={{'height' : `${h}px`}}>
                                                                <span className="inner-bar" style={{'height' : `${(group?.[item.name]?.done/group?.[item.name]?.total)*100}%`}}></span>
                                                            </div>
                                                            <div className="text"><span className="bar-label">{item.name}</span></div>
                                                        </div>
                                                    )
                                                }
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className="task-index-container">
                        <div className="index-box">
                            <p className="index">{totalDone}</p>
                            <p className="index-item">Completed Takes</p>
                        </div>
                         <div className="index-box">
                            <p className="index">{`${total - totalDone}`}</p>
                            <p className="index-item">Pending Task</p>
                        </div>
                    </div>
            </div>
        </Layout>
    );
}

export default Graph;