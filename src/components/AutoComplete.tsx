import React, { useState } from 'react';
import AutoVariants from './AutoVariants';
import './styles.css';

function AutoComplete() {
    const [value, setValue] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return (
        <div className='autoCompleteWrapper'>
            <input type="text" placeholder="Enter text..." value={value} onChange={handleChange} />
            {value && <AutoVariants value={value} updateInput={setValue}/>}
        </div>
    );
}

export default AutoComplete;