// Quantity.tsx
import React from "react";

interface QuantityProps {
    quantity: number;
}

const Quantity: React.FC<QuantityProps> = ({quantity}) => {

return (
    <>
        {/* Dynamic display of the current number from the 'quantity' status */}
        <span className="quantity">{quantity}</span>
    </>
);
};

export default Quantity;