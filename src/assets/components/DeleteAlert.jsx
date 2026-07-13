import Button from "./Button";
import Alert from "./Alert";
function DeleteAlert({onClose, delCategoryHandler, delCategory}){
    return(
        <Alert onClose={onClose}>
            <>
                <div className="alert-content">
                    <span className="del-icon">
                        <svg viewBox="0 0 20 20">
                            <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="#F9F9F9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.08337 4.14175L7.26671 3.05008C7.40004 2.25841 7.50004 1.66675 8.90837 1.66675H11.0917C12.5 1.66675 12.6084 2.29175 12.7334 3.05841L12.9167 4.14175" stroke="#F9F9F9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.7084 7.6167L15.1667 16.0084C15.0751 17.3167 15.0001 18.3334 12.6751 18.3334H7.32508C5.00008 18.3334 4.92508 17.3167 4.83341 16.0084L4.29175 7.6167" stroke="#F9F9F9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.60828 13.75H11.3833" stroke="#F9F9F9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.91663 10.4167H12.0833" stroke="#F9F9F9" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <p className="alert-desc">
                        <em>{delCategory.name}</em> 카테고리를 삭제하시겠습니까? <br />포함되어 있던 항목들은 모두 삭제됩니다. 
                    </p>
                </div>
                <div className="alert-btn-area">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="outline" color="red" onClick={()=>{
                        delCategoryHandler(delCategory.id); 
                        onClose()
                    }}>Delete</Button>
                </div>
            </>
        </Alert>
    )
}
export default DeleteAlert; 