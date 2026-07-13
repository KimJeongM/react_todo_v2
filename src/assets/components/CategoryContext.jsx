import { createContext, useState, useContext, useEffect } from "react";
import { FetchData } from "./FetchData";

const CategoryContext = createContext([]); 
const KEY = 'categories';
export function CategoryProvider({children}){
    const [categoryItem, _setCategoryItem] = useState([]); 
    const [isLoaded, setIsLoaded] = useState(false); 

    const setCategoryItem = (updated) => {
        _setCategoryItem(updated); 
        localStorage.setItem(KEY, JSON.stringify(updated))
    }
    const categoriesURL = '/categories.json'; 
    useEffect(()=>{
        const loadData = async () => {
            const saved = localStorage.getItem(KEY); 
            if(saved){
                setCategoryItem(JSON.parse(saved))
            }else{
                const categoriesJson = await FetchData(categoriesURL); 
                setCategoryItem(categoriesJson.categories);
                localStorage.setItem(KEY, JSON.stringify(categoriesJson.categories))
            }
            setIsLoaded(true);
        }
         loadData();
    }, []); 

    const addCategory = (newCategoryProp) => {
        setCategoryItem((prev)=> {
            const updated =[...prev, {...newCategoryProp}]; 
            localStorage.setItem(KEY, JSON.stringify(updated));
            return updated; 
        }); 
        
    }
    const removeCategory = (id) => {
        setCategoryItem((prev) => {
            const updated = prev.filter((item)=>item.id !== id); 
            localStorage.setItem(KEY, JSON.stringify(updated));
            return updated;
        }); 
        
    }
    return (
        <CategoryContext.Provider value={{categoryItem, setCategoryItem, addCategory, removeCategory, isLoaded}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext); 
