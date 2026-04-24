import React, {useState, useEffect} from "react";

interface ComingSoonProps {
    onBack: () => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ onBack }) => {
    return (
        <div className="main__container coming-soon-page">
            <h1 className="main__container-title">COMING SOON</h1>
            <a 
                href="#" 
                onClick={(e) => { 
                    e.preventDefault(); // important so that the page does not refresh
                    onBack(); // switches the Coming Soon show back to the flash 
                    }} 
                className="main__container-link">
                BACK TO HOME PAGE
            </a>
        </div>
    );
};

export default ComingSoon;