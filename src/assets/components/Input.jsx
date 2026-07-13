import { useState } from 'react';

function Input({placeholder, value, readOnlyBool, wrapClassName='', onChange}){
    const [inputText, setInputText] = useState(''); 
   

    return (
        <span className={`text-input-wrap ${wrapClassName}`} >
            <input type="text" className={'text-input'}
                placeholder={placeholder} 
                value={value} 
                readOnly={readOnlyBool}
                onChange={onChange}
            />
        </span>
    ); 
}

export default Input