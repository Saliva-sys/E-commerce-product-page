// NavLinks.tsx
import React from "react";

// Define what must this component receive
interface NavLinksProps {
    menu: boolean;
    setMenu: (value: boolean) => void;
    Close: string;
    onComingSoon: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({menu, setMenu, Close, onComingSoon}) => {

return (
<>
    {/* // ---------------------------------------- */}
    {/* pop-up menu settings */}
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
                <li className="menu__lnk">
                    <a href="#"    
                        className="menu__link"
                        onClick={(e) => {
                            e.preventDefault(); // Stops page refresh
                            onComingSoon();     // Starts switching to Coming Soon
                            setMenu(false);     // Closes the mobile menu if it is open
                        }}
                >Collections</a></li>
                <li className="menu__lnk"><a href="#"    
                        className="menu__link"
                        onClick={(e) => {
                            e.preventDefault(); // Stops page refresh
                            onComingSoon();     // Starts switching to Coming Soon
                            setMenu(false);     // Closes the mobile menu if it is open
                        }}
                >Men</a></li>
                <li className="menu__lnk"><a href="#"    
                        className="menu__link"
                        onClick={(e) => {
                            e.preventDefault(); // Stops page refresh
                            onComingSoon();     // Starts switching to Coming Soon
                            setMenu(false);     // Closes the mobile menu if it is open
                        }}
                >Women</a></li>
                <li className="menu__lnk"><a href="#"    
                        className="menu__link"
                        onClick={(e) => {
                            e.preventDefault(); // Stops page refresh
                            onComingSoon();     // Starts switching to Coming Soon
                            setMenu(false);     // Closes the mobile menu if it is open
                        }}
                >About</a></li>
                <li className="menu__lnk"><a href="#"    
                        className="menu__link"
                        onClick={(e) => {
                            e.preventDefault(); // Stops page refresh
                            onComingSoon();     // Starts switching to Coming Soon
                            setMenu(false);     // Closes the mobile menu if it is open
                        }}
                >Contact</a></li>
            </ul>
        </div>
    </nav>   
    {/* // ------------------------------------------ */}       
</>        
);
};

export default NavLinks;