// NavMenuIcon.tsx
import React from "react";

interface NavMenuIconProps {
    setMenu: (value: boolean) => void;
    Menu: string;
}

const NavMenuIcon:React.FC<NavMenuIconProps> = ({setMenu, Menu}) => {

return (
<>
    <button 
        type="button"
        className="menu__button"
        aria-label="Open menu"
        onClick={() => 
            setMenu(true)
        }>
        <img src={Menu} className="menu__button-img" alt="Menu" aria-hidden="true" />
    </button>     
</>
);
};

export default NavMenuIcon