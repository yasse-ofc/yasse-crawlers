import './Dropdown.css';
import {useState} from 'react';

function Dropdown() {
    const [open, setOpen] = useState(false)
  return (
    <div className="Dropdown">
      <button onClick = {()=>setOpen(!open)}>
        auau
      </button>
      {open && <div>
        auau2
      </div>}
    </div>
  );
}

export default Dropdown;
