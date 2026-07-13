import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import Button from "./Button";

function MakingCategoryAlert({onClose}){
    const navigate = useNavigate();
    return(
        <Alert>
            <div className="alert-content">
                <span className="del-icon">
                    <svg viewBox="0 0 24 24" fill="none" >
                        <path d="M12 8.99999V13V8.99999ZM10.25 4.18999L2.63 18C2.45368 18.3053 2.36122 18.6519 2.362 19.0045C2.36279 19.3571 2.45677 19.7032 2.63444 20.0078C2.81211 20.3124 3.06714 20.5646 3.37369 20.7388C3.68024 20.9131 4.0274 21.0032 4.38 21H19.62C19.9726 21.0032 20.3198 20.9131 20.6263 20.7388C20.9328 20.5646 21.1879 20.3124 21.3655 20.0078C21.5432 19.7032 21.6372 19.3571 21.638 19.0045C21.6388 18.6519 21.5463 18.3053 21.37 18L13.75 4.18999C13.577 3.87739 13.3235 3.61682 13.0157 3.43537C12.708 3.25393 12.3573 3.15823 12 3.15823C11.6427 3.15823 11.292 3.25393 10.9842 3.43537C10.6765 3.61682 10.423 3.87739 10.25 4.18999Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.05 17H11.95" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <p className="alert-desc">No categories yet — add one to continue.</p>
            </div>
            <div className="alert-btn-area">
                <Button variant="outline" color="red" 
                    onClick={()=>{
                        onClose();
                        navigate('/category', {state : {categoryNextStep : true}})
                    }
                }>OK</Button>
            </div>
        </Alert>
    );
}

export default MakingCategoryAlert;