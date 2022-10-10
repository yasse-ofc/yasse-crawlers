import './DropdownType.css';
import {useState, useRef} from 'react';

function DropdownType() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<Node>(null);
    
    window.addEventListener('click', (e) => {
        if (open && dropdownRef.current?.contains(e.target as Node)) {
            setOpen(false);
        }
    });

    return (
        <div className="DropdownType">
            <button onClick={ () => setOpen(!open) }>Select type</button>
            {open && (
                <ul>
                    <li> Anime </li>
                    <li> Mangá </li>
                    <li> Novel </li>
                    <li> Webtoon </li>
                </ul>
            )}
        </div>
    );
}


export default DropdownType;