import { useState } from 'react';

function Textarea({placeholder, value, wrapClassName='' }){
    return(
        <div className="text-area-wrap"  >
            <textarea className={'text-area'} 
                placeholder={placeholder}>
                {value}    
            </textarea>
        </div>
    )
}

export default Textarea; 
