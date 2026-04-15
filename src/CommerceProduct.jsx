import "./CommerceProduct.css";
import  {useState, useEffect} from "react";
import Close from "./assets/icon-close.svg";
import CloseLightBox from "./assets/icon-close1.svg";
import Menu from "./assets/icon-menu.svg";
import Logo from "./assets/logo.svg";
import Cart from "./assets/icon-cart.svg";
import Avatar from "./assets/image-avatar.png";
import Minus from "./assets/icon-minus.svg";
import Plus from "./assets/icon-plus.svg";
import Basket from "./assets/icon-delete.svg";
import Prev from "./assets/icon-previous.svg";
import Next from "./assets/icon-next.svg";
import Swal from 'sweetalert2';

// ==========================================
// Stav a logika
const CommerceProduct = () => {
  const [menu, setMenu] = useState(false); // vyber "menu"
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState(); //vyber obrazkov z thumbnail
  const [quantity, setQuantity] = useState(0)
  const [addCart, setAddCart] = useState(false);  
  const [isCartOpen, setIsCartOpen] = useState(false); // Otvorenie/Zatvorenie okna
  const [cartQuantity, setCartQuantity] = useState(0); // Toto bude číslo na ikonke
  const [lightBox, setLightBox] = useState(false); // nastavenie nahladoveho okna

const handleNext = () => {
  // Nájdeme index aktuálneho obrázka v poli
  const currentIndex = products[0].image.findIndex(item => item.picture === productImages);
  // Ak sme na konci, skočíme na začiatok (0), inak ideme o jeden ďalej
  const nextIndex = (currentIndex + 1) % products[0].image.length;
  setProductImages(products[0].image[nextIndex].picture)
};
const handlePrev = () => {
  const currentIndex = products[0]?.image.findIndex(item => item.picture === productImages);
  // Ak sme na začiatku, skočíme na koniec, inak o jeden späť
  const prevIndex = (currentIndex - 1 + products[0]?.image.length) % products[0].image.length;
  setProductImages(products[0].image[prevIndex].picture);
};
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

        <div className="navigation__panel-logo">
          {/* // ---------------------------------------- */}
          {/* nastavenie vyskakovacieho menu */}
          <button 
            type="button"
            className="menu__button"
            aria-label="Open menu"
            onClick={() => 
              setMenu(true)
            }>
            <img src={Menu} className="menu__button-img" alt="Menu" aria-hidden="true" />
          </button>    

          
          <img src={Logo} className="menu_list-logo" alt="Logo" aria-hidden="true" />
        </div>
        <nav className={`menu__list ${menu ? 'open' : ''}`}>
          <div className="menu__list-content">
            <button
              type="button"
              className="close__button"
              aria-label="Close menu"
              onClick={() => setMenu(false)}>
                <img src={Close} className="close__button-img" alt="close" aria-hidden="true" />
            </button>
            <ul className="menu__list-items">
              <li className="menu__lnk"><a href="/E-commerce-product-page/public/coming.html" className="menu__link">Collections</a></li>
              <li className="menu__lnk"><a href="/E-commerce-product-page/public/coming.html" className="menu__link">Men</a></li>
              <li className="menu__lnk"><a href="/E-commerce-product-page/public/coming.html" className="menu__link">Women</a></li>
              <li className="menu__lnk"><a href="/E-commerce-product-page/public/coming.html" className="menu__link">About</a></li>
              <li className="menu__lnk"><a href="/E-commerce-product-page/public/coming.html" className="menu__link">Contact</a></li>
            </ul>
          </div>
        </nav>          
        {/* // ------------------------------------------ */}

        <div className="navigation__panel-cart">
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
                      }}
                    >
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

          <span className="avatar__button">
            <a href="https://github.com/Saliva-sys" target="_blank" rel="noreferrer" aria-label="Visit Adriana's GitHub profile">
            <img src={Avatar} className="avatar__button-img" alt="" aria-hidden="true" />
            </a>
          </span>

          
      {/* ///////////////////////////////////////////// */}    
        </div>     
      </header>
      {/* // =============================================== */}

      <article className="product__container">

        {/* // ========================================== */}
        {/* priestor pre obrazky */}
        <div className="image__container">

          {/* // ----------------------------------------- */}
          {/* hlavny obrazok */}
          <div className="main__image"
            onClick={() => window.innerWidth > 768 && setLightBox(true)}>
            <img src={productImages} className="main__image-img" alt="Main product" />

            <div className="btn__container">
              <button className="btn__prev"
                onClick={handlePrev}>
                <img src={Prev} className="main__image-prev" alt="previous image" />
              </button>

              <button className="btn__next"
                onClick={handleNext}>
                <img src={Next} className="main__image-next" alt="next image" />
              </button>
            </div>
          </div>
          {/* // ------------------------------------------ */}

          

          <div className="thumbnails__container">
            {/* // __________________________________________ */}
            {/* thumbnails obrazky pod hlavnym obrazkom */}
            {products[0]?.image.map((item, index) => (
              <div
                key={index}
                className="thumbnail__image">

                <img
                  src={item.thumbnail}
                  alt={`Thumbnail of ${products[0]?.name}`}
                  className={productImages === item.picture ? "thumbnail--active" : "thumbnail"}
                  onClick={() => setProductImages(item.picture)}/>
              </div>
            ))}
            {/* // ________________________________________ */}
          </div>
        </div>
        {/* // ========================================== */}

        {/* definovanie nahladoveho okna */}
          {lightBox && (
            <div className="lightbox__overlay"
              onClick={(e) => 
                e.target === e.currentTarget && setLightBox(false)}>            
              <div className="lightbox__content"
                >
                {/* Tlačidlo na zatvorenie */}
                <button className="lightbox__close" onClick={() => setLightBox(false)}>
                  <img src={CloseLightBox} className="ligthbox__close-img" alt="Close" aria-hidden="true" />
                </button>

                <div className="main__image-lightbox">
                    {/* Šípky v Lightboxe */}
                    <button className="btn__prev lightbox-btn" onClick={handlePrev}>
                      <img src={Prev} className="main__image-prev" alt="previous" />
                    </button>

                    <img src={productImages} className="lightbox__main-img" alt="Product" />
                    
                    <button className="btn__next lightbox-btn" onClick={handleNext}>
                      <img src={Next} className="main__image-next" alt="next" />
                    </button>
                  
                </div>

                {/* Thumbnails pod hlavným obrázkom v Lightboxe */}
                <div className="lightbox__thumbnails">
                  {products[0]?.image.map((item, index) => (
                  <div
                    key={index}
                    className={`lightbox__thumbnail-image ${productImages === item.picture ? "active-border" : ""}`}>

                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className={productImages === item.picture ? "thumbnail__lightbox--active" : "thumbnail__lightbox"}
                      onClick={() => setProductImages(item.picture)}
                      />
                  </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        <div className="product__info">
          {/* // ========================================== */}
          {/* informacie o produkte a cena */}
          <div className="product__info-container">
            <div className="product__information">
              <p className="product__info-company">{products[0]?.company}</p>
              <h1 className="product__info-name">{products[0]?.name}</h1>
              <p className="product__info-description">{products[0]?.description}</p>
            </div>

            <div className="product__price">
              <p className="product__price-unit">{products[0]?.price > 0 ? products[0]?.price : "0.00"}</p>
              <p className="product__price-discount">{products[0]?.discount}</p>
              <div className="product__price-original">
                <p className="product__price-orig">{products[0]?.originalPrice}</p>
              </div>
            </div>
          </div>
          {/* // ========================================== */}

          <div className="controls__container">
            {/* // ========================================== */}
            {/* +/- pre pridanie a odoberanie z kosika */}
            <div className="quantity__control">
              {/* // ________________________________________ */}
              {/* Tlačidlo pre zníženie množstva */}
              <button
                type="button"
                className="decrement__button"
                aria-label="Decrement"
                onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 0)}>
                  {/*onClick funkcia: prev je aktuálna hodnota (previous state). Používame podmienku: Ak je prev viac ako 0, odpočítaj 1. Ak už je 0, nechaj tam 0, vďaka tomu nepôjde do mínusu). */}
                <img src={Minus} className="decrement__button-img" alt="" aria-hidden="true" />
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
                className="increment__button"
                aria-label="Increment"
                onClick={() => setQuantity(prev => prev + 1)}>
                <img src={Plus} className="increment__button-img" alt="" aria-hidden="true" />
              </button>
              {/* // ---------------------------------------- */}            
            </div>
            {/* // ========================================== */}

            {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            {/* Tlačidlo na pridanie do košíka */}
            <div className="add__button-container">
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
            </div>
              {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          </div>
        </div>
      </article>

                
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