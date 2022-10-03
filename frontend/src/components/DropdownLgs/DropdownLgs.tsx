import './DropdownLgs.css';
import {useState} from 'react';

function DropdownLgs(){
        const [open, setOpen] = useState(false)
    return(
        <div className="DropdownLgs">
            <button onClick = {()=>setOpen(!open)}>
                Lgs
            </button>
            {open &&<div>
                <button> PT </button>
            </div>}
            {open && <div>
                <button> EN </button>   
            </div>}
        </div>
    );
}

export default DropdownLgs;