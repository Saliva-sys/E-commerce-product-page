// AddCart.tsx
import React from "react";

interface AddCartProps {
    quantity: number;
    setAddCart: React.Dispatch<React.SetStateAction<boolean>>;
    setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
    Cart: string;
}

const AddCart: React.FC<AddCartProps> = ({quantity, setAddCart, setCartQuantity, Cart}) => {

return (
    <>
        <button
            type="button"
            className="add__button"
            disabled={quantity === 0}
            onClick={() => {
            setAddCart(true);
            setCartQuantity(quantity);
                // setIsCartOpen(true);
            }}>
            <img src={Cart} className="add__button-img" alt="Cart" aria-hidden="true" /> 
            <span className="add__to-cart">Add to cart</span>
        </button>
    </>
);
};

export default AddCart;