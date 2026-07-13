import Button from "./Button";

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
                    <span className="icon"><img src="/src/assets/components/img/arrow-left.svg" /></span>
                </Button>
            }
             
            <h2 className="page-tit">{categoryNextStep? 'Category Add' : 'Category'}</h2>
        </div>
    )
    
}

export default CategoryHeader; 