import Button from "./Button";
import { images } from "../components/images";

function CategoryHeader({categoryNextStep, setCategoryNextStep}){
    return (
        <div className="category-admin-header">
            {
               categoryNextStep &&<Button 
                    aria-label="이전" 
                    className="go-prev"
                    onClick={()=>{
                        setCategoryNextStep(false)
                    }}
                >
                    <span className="icon"><img src={images.arrowLeft} /></span>
                </Button>
            }
             
            <h2 className="page-tit">{categoryNextStep? 'Category Add' : 'Category'}</h2>
        </div>
    )
    
}

export default CategoryHeader; 