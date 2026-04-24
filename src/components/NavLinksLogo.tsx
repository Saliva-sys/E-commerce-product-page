// NavLinksLogo.tsx
import React from "react";

interface NavLinksLogoProps {
    Logo: string;
}

const NavLinksLogo: React.FC<NavLinksLogoProps> = ({Logo}) => {

return (
<>
    <img src={Logo} className="menu_list-logo" alt="Logo" aria-hidden="true" />
</>
);
};

export default NavLinksLogo;