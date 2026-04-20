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
    setAddCart: (value: boolean) => void;
    setIsCartOpen: (value: boolean) => void;
    isCartOpen: boolean;
    cartQuantity: number;
    products: Product[];
    setQuantity: (value: number) => void;
    Swal: any;
}

const CartWidget: React.FC<CartWidgetProps> = ({Cart, Basket, addCart, setAddCart, setIsCartOpen, isCartOpen, cartQuantity, products, setQuantity, Swal}) => {

return (
<>
    <div className="panel__cart">
        {/* // _________________________________________ */}
        {/* vstup do kosika cez ikonku */}
        <button type="button"
            className="cart__button"
            aria-label="View cart"
            onClick={() => setIsCartOpen(!isCartOpen)}>
            <img src={Cart} className="cart__button-img" alt="Cart" aria-hidden="true" />

            {/* Ak je množstvo väčšie ako nula, ukáž to, čo je v zátvorke.*/}
            {addCart && cartQuantity > 0 && ( 
            <span className="cart__quantity-badge">{cartQuantity}</span>
            )}
        </button>
        {/* // __________________________________________ */}
    </div>

    {/* ///////////////////////////////////////////// */}
    {/* Definujeme zobrazenie jednotlivych stavov kosika */}
    {isCartOpen && (

    // ==========================================
    // Nastavenie kosika         
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
                // kosik po vybere produktu 
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
                        {/* Vyprazdnenie kosika */}
                        <img 
                            src={Basket} 
                            className="cart__product-delete"
                            alt="Basket" 
                            aria-hidden="true"
                            onClick={() => {
                            setAddCart(false); // skryje pprodukt z kosika
                            setQuantity(0); // Vynuluje počítadlo
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
                                confirmButtonColor: 'var(--color-orange)', 
                                background: 'var(--color-very-dark-blue)',
                                color: 'var(--color-light-orange)',
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
</>
)};

export default CartWidget;