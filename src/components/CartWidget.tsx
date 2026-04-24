// CarrtWidget.tsx
import React from "react";

interface ProductImage {
    thumbnail: string;
}

interface Product {
    name: string;
    image: ProductImage[];
    price: number;
}

interface CartWidgetProps {
    Cart: string;
    Basket: string;
    addCart: boolean;
    setAddCart: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isCartOpen: boolean;
    cartQuantity: number;
    products: Product[];
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    Swal: any;
}

const orangeColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-orange');

const blueDarkColor = getComputedStyle(document.documentElement).getPropertyValue('--very-dark-blue');

const orangePaleColor = getComputedStyle(document.documentElement).getPropertyValue('--pale-orange');

const CartWidget: React.FC<CartWidgetProps> = ({Cart, Basket, addCart, setAddCart, setIsCartOpen, isCartOpen, cartQuantity, products, setQuantity, Swal}) => {

return (
<>
    <div className="panel__cart">
        {/* // _________________________________________ */}
        {/* Entrance to the cart via the icon */}
        <button type="button"
            className="cart__button"
            aria-label="View cart"
            onClick={() => setIsCartOpen(!isCartOpen)}>
            <img src={Cart} className="cart__button-img" alt="Cart" aria-hidden="true" />

            {/* If the quantity is greater than zero, show what is in parenthesis.*/}
            {addCart && cartQuantity > 0 && ( 
            <span className="cart__quantity-badge">{cartQuantity}</span>
            )}
        </button>
        {/* // __________________________________________ */}
    

        {/* ///////////////////////////////////////////// */}
        {/*We define the display of individual states of the cart */}
        {isCartOpen && (

        // ==========================================
        // Setting up a cart        
        <section className="cart__container">
            <div className="cart__shadow-layer"></div>

            <div className="cart__content-layer">
                <h3 className="cart__container-title">Cart</h3>

                <div className="cart__content">
                    {!addCart || cartQuantity ===0 ? (

                    // -------------------------------------------- 
                    // Empty cart
                    <div className="empty__cart">
                        <p className="empty__cart-text">Your cart is empty.</p>
                    </div>
                    // -------------------------------------------- 

        ) : (

                    // ***********************************************
                    // Cart after picking the product 
                    <div className="product__list">
                        <div className="product__list-item">
                            <img 
                                src={products[0]?.image[0]?.thumbnail} 
                                className="cart__product-image" 
                                alt="product thumbnail" />

                            <div className="product__list-info">
                                <p className="cart__product-name">{products[0]?.name}</p>

                                <div className="cart__product-price">
                                    <p>
                                        <span className="cart__product-price-unit">{products[0]?.price}</span> 
                                        <span className="cart__product-price-multiple">x</span> 
                                        <span className="cart__product-price-quantity">{cartQuantity}</span> 
                                        <span className="cart__product-price-total">{ (products[0]?.price * cartQuantity).toFixed(2) }</span>
                                    </p>
                                </div>                    
                            </div>

                            {/* ______________________________________________ */}
                            {/* Emptying the basket */}
                            <img 
                                src={Basket} 
                                className="cart__product-delete"
                                alt="Basket" 
                                aria-hidden="true"
                                onClick={() => {
                                setAddCart(false); // hides the product from the cart
                                setQuantity(0); // Resets the counter
                            }}/>
                            {/* ______________________________________________ */}
                        </div>

                        <div>
                            <button 
                                className="checkout__button" 
                                type="button" 
                                onClick={() => {
                                Swal.fire({
                                    title: 'Thank you!',
                                    text: 'Your fictive purchase was successful.',
                                    icon: 'success',
                                    confirmButtonText: 'Great!',
                                    confirmButtonColor: orangeColor, 
                                    background: blueDarkColor,
                                    color: orangePaleColor,
                                    borderRadius: '10px'
                                });
                                }}>
                                Checkout
                            </button>
                        </div>
                    {/* *********************************************** */}
                    </div>
                    )}
                </div>     
            </div>                
        </section>    
    )}
    </div>
</>
)};

export default CartWidget;