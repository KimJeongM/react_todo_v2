import { useState} from "react";

function Checkbox({completed, label, id, onCheckClick}){
    const [checked, setChecked] = useState(completed); 
    const onClick = () => {
        const checkedVal = !checked
        setChecked(checkedVal); 
        onCheckClick(checkedVal);
    }

    return(
        <span className="checkbox-wrap">
            <input type="checkbox" id={id} onChange={onClick} checked={checked} />
            <label htmlFor={id}>
                <span className="check">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animated-check"/>
                    </svg>
                </span>
                <span className="hidden">{checked? '완료' : '미완료'}</span>
                {label && <span className="label-txt">{label}</span>}
            </label>
        </span>
    )
}

export default Checkbox; 