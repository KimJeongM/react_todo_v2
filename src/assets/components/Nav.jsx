import { NavLink, useLocation } from "react-router-dom";
import { useCategory } from "../components/CategoryContext";
import MakingCategoryAlert from "./MakingCategoryAlert";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

function Nav(){
    const location = useLocation(); 
    const {categoryItem} = useCategory();
    const [alert, setAlert] = useState(false)
    
    const active = (()=>{
        const name = location.pathname.replace('/', '').toLowerCase(); 
        return name.length === 0? 'home' : name;
    })(); /* home, calendar,  category, graph*/

    const onClose = () =>setAlert(false)
    

    const navItems = [
        { to: "/", label: "home" },
        { to: "/calendar", label: "calendar" },
        { to: "/category", label: "category" },
        { to: "/graph", label: "graph" },
    ];
 /* 
 category를 제외한 나머지 메뉴를 누를때는 alert을 띄워서 카테고리를 만들게 유도한다. 
 */
    const handleLockedClick = ()=>{
        setAlert(true); 
    }
    
    return (
        <nav className="nav">
            <ul className="nav-list">
                {
                    navItems.map((nav)=>{
                        const disabled = categoryItem.length === 0 && nav.label !== 'category'; 
                        return (
                            <li className={`item ${active === nav.label? 'active' : ''}`} key={nav.label}>
                                {
                                    disabled?  
                                    (<button 
                                        className="nav-btn"
                                        onClick={handleLockedClick}
                                        >
                                        <span className="icon">
                                            <img src={`/src/assets/components/img/nav_${nav.label}.svg`} alt="" />
                                        </span>
                                        <span className="item-text">{nav.label}</span>
                                    </button>) : 
                                    <NavLink 
                                        to={nav.to} 
                                        className="nav-btn"
                                    >
                                        <span className="icon">
                                            <img src={`/src/assets/components/img/nav_${nav.label}.svg`} alt="" />
                                        </span>
                                        <span className="item-text">{nav.label}</span>
                                    </NavLink>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            <AnimatePresence mode="wait">
                {alert && <MakingCategoryAlert onClose={onClose} />}
            </AnimatePresence>
            
        </nav>
    )
}

export default Nav;