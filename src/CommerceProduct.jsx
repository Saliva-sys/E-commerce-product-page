import "./CommerceProduct.css";
import  {useState, useEffect} from "react";
import Close from "./assets/icon-close.svg";
import Menu from "./assets/icon-menu.svg";
import Logo from "./assets/logo.svg";
import Cart from "./assets/icon-cart.svg";
import Avatar from "./assets/image-avatar.png";
import Minus from "./assets/icon-minus.svg";
import Plus from "./assets/icon-plus.svg";
import Basket from "./assets/icon-delete.svg";

// ==========================================
// Stav a logika
const CommerceProduct = () => {
  const [menu, setMenu] = useState(false); // vyber "menu"
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState(); //vyber obrazkov z thumbnail
  const [quantity, setQuantity] = useState(0)
  const [addCart, setAddCart] = useState(false);  
  const [isCartOpen, setIsCartOpen] = useState(false); // Otvorenie/Zatvorenie okna
// ==========================================
  

// ========================================== 
// vkladanie obrazkov zo suboru data.json / nacitavanie dat
useEffect (() => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      if (data.length && data[0].image.length > 0) {
        setProductImages(data[0].image[0].picture);
        console.log("Dáta sa načítali:", data);
        console.log("Surové dáta z JSON:", data[0]); // Tu uvidíš presné názvy kľúčov
  setProducts(data);

        // prednacitanie obrazkov
        data[0].image.forEach((item) => {
          const img = new Image();
          img.src = item.picture;
        })
      }
    })
    .catch(error => console.error ("Chyba:", error));      
}, []);
// ==========================================

// ******************************************
// Vykreslovanie
return (
  <>
  {/* Ak products ešte nie sú načítané, ukážeme len načítavanie a nepustíme kód ďalej */}
    {products.length === 0 ? (
      <div>Načítavam produkty...</div>
    ) : (
    <div className="main__container">

      {/* // ========================================== */}
      {/* navigacny panel */}      
      <header className="navigation__panel"> 

        {/* // ---------------------------------------- */}
        {/* nastavenie vyskakovacieho menu */}
        <button 
          type="button"
          className="menu__button"
          aria-hidden="true"
          onClick={() => 
            setMenu(true)
          }>
          <img src={Menu} alt="Menu" aria-hidden="true" />
        </button>    

        {/* Ak je premenná menu pravdivá (true), vykresli to, čo je v zátvorke. Ak je false, v prehliadači sa nevykreslí vôbec nič */}
        {menu &&  
          <nav className="menu__list">
            <button
              type="button"
              className="close__button"
              aria-hidden="true"
              onClick={() => setMenu(false)}>
                <img src={Close} alt="close" aria-hidden="true" />
            </button>
            <ul>
              <li>Collections</li>
              <li>Men</li>
              <li>Women</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
        }
        {/* // ------------------------------------------ */}

        <img src={Logo} alt="Logo" aria-hidden="true" />

        {/* // _________________________________________ */}
        {/* vstup do kosika cez ikonku */}
        <button type="button"
              className="close__button"
              aria-hidden="true"
              onClick={() => setIsCartOpen(!isCartOpen)}>
          <img src={Cart} alt="Cart" aria-hidden="true" />

          {/* Ak je množstvo väčšie ako nula, ukáž to, čo je v zátvorke.*/}
          {addCart && quantity > 0 && ( 
            <span className="cart__quantity-badge">{quantity}</span>
          )}
        </button>
        {/* // __________________________________________ */}

        <button type="button" aria-hidden="true">
          <img src={Avatar} alt="Avatar" aria-hidden="true" />
        </button>        
      </header>
      {/* // =============================================== */}

      <article className="product__container">

        {/* // ========================================== */}
        {/* priestor pre obrazky */}
        <div className="image__container">

          {/* // ----------------------------------------- */}
          {/* hlavny obrazok */}
          <div className="main__image">
            <img src={productImages} alt="Main product" />
          </div>
          {/* // ------------------------------------------ */}

          {/* // __________________________________________ */}
          {/* thumbnails obrazky pod hlavnym obrazkom */}
          {products[0]?.image.map((item, index) => (
            <div
              key={index}
              className="thumbnail__image">

              <img
                src={item.thumbnail}
                alt={item.name}
                className={productImages === item.picture ? "thumbnail--active" : "thummbnail"}
                onClick={() => setProductImages(item.picture)}/>
            </div>
            ))}
          {/* // ________________________________________ */}
        </div>
        {/* // ========================================== */}

        {/* // ========================================== */}
        {/* informacie o produkte a cena */}
        <div className="product__info-container">
          <div className="product__info">
            <p className="product__info-company">{products[0]?.company}</p>
            <h1 className="product__info-name">{products[0]?.name}</h1>
            <p className="product__info-description">{products[0]?.description}</p>
          </div>

          <div className="product__price">
            <p className="product__price-unit">{products[0]?.price > 0 ? products[0]?.price : "0.00"}</p>
            <p className="product__price-discount">{products[0]?.discount}</p>
            <p className="product__price-original">{products[0]?.originalPrice}</p>
          </div>
        </div>
        {/* // ========================================== */}

        {/* // ========================================== */}
        {/* +/- pre pridanie a odoberanie z kosika */}
        <div className="quantity__control">
          {/* // ________________________________________ */}
          {/* Tlačidlo pre zníženie množstva */}
          <button
            type="button"
            aria-hidden="true"
            onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 0)}>
              {/*onClick funkcia: prev je aktuálna hodnota (previous state). Používame podmienku: Ak je prev viac ako 0, odpočítaj 1. Ak už je 0, nechaj tam 0, vďaka tomu nepôjde do mínusu). */}
            <img src={Minus} alt="" aria-hidden="true" />
          </button>
          {/* // ________________________________________ */}

          {/* ############################################ */}
          {/* Dynamické zobrazenie aktuálneho čísla zo stavu 'quantity' */}
          <span className="quantity">{quantity}</span>
          {/* ############################################ */}

          {/* // ---------------------------------------- */}
          {/* Tlačidlo pre zvysenie množstva */}
          <button
            type="button"
            aria-hidden="true"
            onClick={() => setQuantity(prev => prev + 1)}>
            <img src={Plus} alt="" aria-hidden="true" />
          </button>
          {/* // ---------------------------------------- */}

          {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          {/* Tlačidlo na pridanie do košíka */}
          <button
            type="button"
            disabled={quantity === 0} // Tlačidlo sa nedá stlačiť, ak je množstvo 0
            onClick={() => {
              setAddCart(true);
              setIsCartOpen(true);
            }}>
              <img src={Cart} alt="Cart" aria-hidden="true" /> 
              <span className="add__to-cart">Add to cart</span>
          </button>
          {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

        </div>
        {/* // ========================================== */}
      </article>

      {/* ///////////////////////////////////////////// */}
      {/* Definujeme zobrazenie jednotlivych stavov kosika */}
      {isCartOpen && (
        // ==========================================
        // Nastavenie kosika 
        <section className="cart__container">
          <h3 className="cart__container-title">Cart</h3>

          <div className="cart__content">
            {!addCart || quantity ===0 ? (

              // -------------------------------------------- 
              // Empty cart
              <div className="empty__cart">
                <p className="empty__cart-text">Your cart is empty</p>
              </div>
              // -------------------------------------------- 
            
      ) : (
              // ***********************************************
              // kosik po vybere produktu 
              <div className="product__list">
                <div className="product__list-item">
                  <img 
                    src={products[0]?.thumbnail} 
                    className="cart__product-image" 
                    alt="product thumbnail" />

                  <div className="product__list-info">
                    <p className="cart__product-name">{products[0]?.name}</p>
                  

                    <div className="cart__product-price">
                      <p>
                        {products[0]?.price} x {quantity} { (products[0]?.price * quantity).toFixed(2) }
                      </p>
                    </div>
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

                <div>
                  <button type="button">Checkout</button>
                </div>
                {/* *********************************************** */}
              </div>
              )}
            </div>                     
        </section>
      )}
      {/* ///////////////////////////////////////////// */}            
    </div>
    )}

    <footer className="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" className="attribution-link" target="_blank" rel="noopener noreferrer">
          Frontend Mentor</a>
        . Coded by
        <a href="https://github.com/Saliva-sys" className="attribution-link" target="_blank" rel="noopener noreferrer">
          Adriana Weidlichova</a>
        .
      </footer> 
    
  </>
);
};
// *********************************************

export default CommerceProduct;