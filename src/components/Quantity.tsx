// Quantity.tsx
import React from "react";

interface QuantityProps {
    quantity: number;
}

const Quantity: React.FC<QuantityProps> = ({quantity}) => {

return (
    <>
        {/* Dynamické zobrazenie aktuálneho čísla zo stavu 'quantity' */}
        <span className="quantity">{quantity}</span>
    </>
);
};

export default Quantity;