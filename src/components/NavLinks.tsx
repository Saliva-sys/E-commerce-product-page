// NavLinks.tsx
import React from "react";

// Define what must this component receive
interface NavLinksProps {
    menu: boolean;
    setMenu: (value: boolean) => void;
    Logo: string;
    Menu: string;
    Close: string;
}

const NavLinks: React.FC<NavLinksProps> = ({menu, setMenu, Logo,Menu, Close}) => {

return (
<>
    {/* // ---------------------------------------- */}
    {/* nastavenie vyskakovacieho menu */}
    <div className="navigation__panel-logo">
        <button 
            type="button"
            className="menu__button"
            aria-label="Open menu"
            onClick={() => 
                setMenu(true)
            }>
            <img src={Menu} className="menu__button-img" alt="Menu" aria-hidden="true" />
        </button>     

        <img src={Logo} className="menu_list-logo" alt="Logo" aria-hidden="true" />
    </div>

    <nav className={`menu__list ${menu ? 'open' : ''}`}>
        <div className="menu__list-content">
            <button
                type="button"
                className="close__button"
                aria-label="Close menu"
                onClick={() => setMenu(false)}>
                <img src={Close} className="close__button-img" alt="close" aria-hidden="true" />
            </button>

            <ul className="menu__list-items">
                <li className="menu__lnk"><a href="/coming.html"    className="menu__link">Collections</a></li>
                <li className="menu__lnk"><a href="/coming.html"    className="menu__link">Men</a></li>
                <li className="menu__lnk"><a href="/coming.html" className="menu__link">Women</a></li>
                <li className="menu__lnk"><a href="/coming.html" className="menu__link">About</a></li>
                <li className="menu__lnk"><a href="/coming.html" className="menu__link">Contact</a></li>
            </ul>
        </div>
    </nav>   
    {/* // ------------------------------------------ */}       
</>        
);
};

export default NavLinks;