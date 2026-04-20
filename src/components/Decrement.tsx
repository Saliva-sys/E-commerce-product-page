// Decrement.tsc

import React from "react";

interface DecrementProps {
    // Instead (value: number) => void, we must use a special type to say: “This is a function to change the state (numbers)”:
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    Minus: string;
}

const Decrement:React.FC<DecrementProps> = ({setQuantity, Minus}) => {

return (
<>
    <button
        type="button"
        className="decrement__button"
        aria-label="Decrement"
        onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 0)}>
            {/*onClick function: prev is the current value (previous state). We use the condition: If there is more than 0 prev, subtract 1. If it is already 0, leave there 0, thanks to this it will not go to minus). */}
        <img src={Minus} className="decrement__button-img" alt="" aria-hidden="true" />
    </button>
</>
);
};

export default Decrement;