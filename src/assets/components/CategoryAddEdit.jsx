import { useState } from "react";
import '@/assets/components/css/category-admin.css'; 
import Input from "./Input";
import Button from "./Button";
import { generateId } from "./util";

function CategoryAddEdit({editCategory, getCategoryData, setCategoryNextStep}){
    const [categoryTitle, setCategoryTitle] = useState(() => editCategory?.name ?? '' ); 
    const [categoryColor, setCategoryColor] = useState(editCategory?.color ?? '#808080'); 

    const colorArray = [
        '#808080', '#282F59', '#1E2F97', '#2857A9', '#0076FE', '#1AA7EC',
        '#B964F5', '#785CB3', '#7400AB', '#797EF6', '#4C13FE', '#6236FF',
        '#309399', '#46A062', '#346F75', '#8DC540', '#00D53F', '#818A4B',
        '#FA9B89', '#FF6DC2', '#FF2C9D', '#EC7480', '#F54E5F', '#CC2F4A',
        '#FBCE35', '#FF910C', '#EB6B2A', '#DC9B1D', '#9C7856', '#734523',
        '#00A8A8', '#00C0A7', '#05DF91', '#41D9E7', '#64C3C9', '#70A3DC',
        '#FE6A9A', '#FF93B5', '#FCB2CB', '#C6D757', '#95BB8C', '#608C4D',
        '#776F86', '#81939D', '#A69B97', '#CFB290', '#B8666C', '#62223C',
        '#180E31', '#27193C', '#46315C', '#695078', '#8E7698', '#B2A3BA',
        '#0F2C1A', '#035441', '#036954', '#059677', '#06AE8B', '#5EC1A2',
        '#182486', '#2F41A7', '#3F54BF', '#5C6DC9', '#7888D3', '#A0AADF',
        '#490083', '#581ECA', '#4B40E4', '#305DF6', '#0079F8', '#0092F5',
        '#DA2864', '#EC6091', '#E37B9C', '#61C5C3', '#16A5A3', '#0D687B',
        '#12020C', '#391022', '#61292A', '#854D4C', '#AC867B', '#C3AE9B',
    ];
    return (
        <div className="category-add-wrap">
            <div className="category-title">
                <div className="category-label">카테고리 이름</div>
                <Input 
                    placeholder="Input category name"
                    value={categoryTitle}
                    onChange={(e)=>{setCategoryTitle(e.target.value)}}
                 />
            </div>
            <div className="category-color">
                <div className="category-label">색상 선택</div>
                <ul className="color-grid">
                    {
                        colorArray.map((item) => (
                            <li className="color-item" style={{'--category-bg' : item}} key={item}>
                                <label htmlFor={item} className="color-label" >
                                    <input 
                                        type="radio" 
                                        name="color" 
                                        id={item} 
                                        checked={categoryColor === item} 
                                        onChange={()=>setCategoryColor(item)}
                                    />
                                </label>
                            </li> 
                        ))
                    }
                </ul>
            </div>
            <div className="btn-area">
                <Button 
                    color="red" size="lar"
                    disabled={!(categoryTitle.length > 0)}
                    onClick={()=>{
                        const newCategoryData = editCategory? ({...editCategory, color:categoryColor, name : categoryTitle})
                            :  ({id :generateId() , color:categoryColor, name : categoryTitle})
                        getCategoryData(newCategoryData);
                        setCategoryNextStep(false)
                    }}
                >Save</Button>
            </div>
        </div>
    );
}

export default CategoryAddEdit