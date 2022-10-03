import './DropdownType.css';
import {useState} from 'react';

function DropdownType(){
        const [open, setOpen] = useState(false)
    return(
        <div className="DropdownType">
            <button onClick = {()=>setOpen(!open)}>
                Select type
            </button>
            {open && <div>
                <button> Anime </button>
            </div>}
            {open && <div>
                <button> Mangá </button>
            </div>}
            {open && <div>
                <button> Novel </button>
            </div>}
        </div>
    );
}


export default DropdownType;