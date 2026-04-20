// Increment.tsx
import React from "react";

interface IncrementProps {
    // Instead (value: number) => void, we must use a special type to say: “This is a function to change the state (numbers)”:
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    Plus: string;
}

const Increment:React.FC<IncrementProps> = ({setQuantity, Plus}) => {

return (
<>
    <button
        type="button"
        className="increment__button"
        aria-label="Increment"
        onClick={() => setQuantity(prev => prev + 1)}>
        <img src={Plus} className="increment__button-img" alt="" aria-hidden="true" />
    </button>
</>

);
};

export default Increment;