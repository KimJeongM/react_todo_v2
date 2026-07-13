import { useState } from "react";
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import { useCategory } from "./CategoryContext";

function CategorySheet({initCategory='',  dataSend}){
    console.log(initCategory)
    const [selectedCategory, setSelectedCategory] = useState(initCategory); 
    const {categoryItem} = useCategory(); 
    return ( 
        <BottomSheet >
            <ul className="cate-list">
                {
                    categoryItem.map((item) => (
                        <li className="cate-item" style={{'--bg':item.color}} key={item.id}>
                            <label htmlFor={item.id}>
                                <input 
                                    type="radio" 
                                    id={item.id} 
                                    name="category" 
                                    checked={item.name === selectedCategory} 
                                    onChange={()=>setSelectedCategory(item.name)}
                                />
                                <span className="cate-text">{item.name}</span>
                                <span className="check">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animated-check"/>
                                    </svg>
                                </span>
                            </label>
                        </li>
                    ))
                }
            </ul>
            <div className="bottom-btn-area">
                <Button 
                    className="outline2" 
                    color="red" 
                    disabled={!selectedCategory}
                    onClick={()=>dataSend(selectedCategory)}
                >OK</Button>
            </div>
        </BottomSheet>
    )
}

export default CategorySheet;