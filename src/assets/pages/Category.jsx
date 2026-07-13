import Layout from "../components/Layout";
import '@/assets/components/css/category-admin.css';
import { useCategory } from "../components/CategoryContext";
import { useTodo } from "../components/TodoContext";
import Button from "../components/Button";
import CategoryHeader from "../components/CategoryHeader";
import { lazy, useState, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import EmptyCategory from "../components/EmptyCategory";
import { useLocation } from "react-router-dom";

const DeleteAlert = lazy(()=>import('../components/DeleteAlert')); 
const CategoryAddEdit = lazy(()=>import('../components/CategoryAddEdit'))

function Category(){
    const {categoryItem, setCategoryItem, addCategory, removeCategory} = useCategory();
    const location = useLocation();
    const {todoItem, setTodoItem, removeTodo} = useTodo(); 
    const [alertShow, setAlertShow] = useState(false);
    const [delCategory, setDelCategory] = useState('');  
    const [categoryNextStep, setCategoryNextStep] = useState(location.state?.categoryNextStep ?? false); 
    const [editCategory, setEditCategory] = useState(null);

    useEffect(()=>{
        
        if (location.state?.categoryNextStep) {
            setCategoryNextStep(true);
        }
    }, [location.state])
    const getCategoryData = (category) => {
        if(editCategory){
            const newCategory = categoryItem.map((item) => (item.id === category.id)?  {...item, ...category} : {...item})
            setCategoryItem(newCategory); 
        }else{
            addCategory(category); 
        }
        setEditCategory(null); 
    }

    const delCategoryHandler = (categoryId) => {
        const newTodo = todoItem.filter((item)=>item.categoryId !== categoryId); 
        setTodoItem(newTodo); 
        removeCategory(categoryId); 
    }
   

    return (
        <Layout headerContent={<CategoryHeader categoryNextStep={categoryNextStep} setCategoryNextStep={setCategoryNextStep} />}>
            {
                categoryNextStep ? (
                    <div className="category-add-edit">
                        <CategoryAddEdit editCategory={editCategory} getCategoryData={getCategoryData} setCategoryNextStep={setCategoryNextStep} />
                    </div>)
                    : (
                        (
                            <div className="category-admin-wrap">
                                <div className="cate-wrap">
                                   { 
                                        categoryItem.length > 0 ? 
                                        (
                                            <div className="cate-container">
                                                <div className="category-subtitle">
                                                    전체 카테고리 ({categoryItem.length})
                                                </div>
                                                <ul className="category-list">
                                                    { 
                                                        categoryItem.map((category)=>{
                                                            const length = todoItem.filter((item)=> category.name === item.category).length;
                                                            return (
                                                            <li className="category-item" key={category.id}>
                                                                <div className="category-info">
                                                                    <span className="color-dot" style={{'backgroundColor' : category.color}}></span>
                                                                    <span className="category-name">
                                                                        {category.name} 
                                                                        <span className="category-count">{length}</span>
                                                                    </span>
                                                                </div>
                                                                <div className="category-actions">
                                                                    <Button 
                                                                        className="sm" 
                                                                        shape="circle" 
                                                                        ariaLable="edit"
                                                                        onClick={()=>{
                                                                            setCategoryNextStep(true); 
                                                                            setEditCategory(category); 
                                                                        }}
                                                                    >
                                                                        <img src="/src/assets/components/img/edit.svg" alt="" />
                                                                    </Button>
                                                                    <Button 
                                                                        className="sm" 
                                                                        shape="circle"
                                                                        ariaLable="delete"
                                                                        onClick={()=>{
                                                                            setAlertShow(true); 
                                                                            setDelCategory(category);
                                                                        }}
                                                                    >
                                                                        <img src="/src/assets/components/img/trash.svg" alt="" />
                                                                    </Button>
                                                                </div>
                                                            </li>
                                                        )})
                                                    }
                                                </ul>
                                            </div>
                                        ) : 
                                        (
                                            <EmptyCategory />
                                        )
                                    }
                                    <Button 
                                        className="category-add-btn" 
                                        size="lar"
                                        onClick={()=>setCategoryNextStep(true)}
                                    >
                                        <span className="add-icon"><img src="/src/assets/components/img/add.svg" alt="" /></span>Create new category
                                        <svg width="100%" height="100%">
                                            <rect width="100%" height="100%" fill="none" rx="16" ry="16"
                                                stroke="#616161" strokeWidth="1"
                                                strokeDasharray="6,4" />  
                                        </svg>
                                    </Button>
                                </div>
                                <AnimatePresence mode="wait">
                                    { alertShow && <DeleteAlert 
                                        delCategory={delCategory} 
                                        onClose={()=> setAlertShow(false)}
                                        delCategoryHandler={delCategoryHandler}
                                    />}
                                </AnimatePresence>
                            </div>
                        ) 
                        
                 )
            }
            
            
        </Layout>
        
    )
}

export default Category; 