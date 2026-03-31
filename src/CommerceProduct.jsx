import "./CommerceProduct.css";
import  {useState, useEffect} from "react";
import Menu from "./assets/icon-menu.svg";
import Logo from "./assets/logo.svg";
import Cart from "./assets/icon-cart.svg";
import Bascket from "./assets/icon-delete.svg";
import Close from "./assets/icon-close.svg";
import Avatar from "./assets/image-avatar.png";
import Plus from "./assets/icon-plus.svg";
import Minus from "./assets/icon-minus.svg";


const CommerceProduct = () => { // idem vyberat produkty a vkladat ich cez button "Add to Cart" do kosika
  const [products, setProducts] = useState([]);
  const [addCart, setAddCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // idem vyberat z thumbnails obrazky
  const [productImages,setProductImages] = useState();

  const unitPrice = products[0]?.price || 0; // Cena za jeden kus
  const totalPrice = unitPrice * quantity; // Celková cena sa vypočíta sama pri každom renderi


  useEffect (() => {
    fetch('data.json') // bez bodky a bez lomky na zaciatku
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      if (data.length && data[0].image.length > 0) {
        setProductImages(data[0].image[0].picture);

        // tento kod prednacita obrazky
        data[0].image.forEach((item) => {
          const img = new Image();
          img.src = item.picture;
        })
      }
    })
    .catch(error => console.error ("Chyba:", error));
}, []);

  return (
    <>
        <div className="main__container">
          <header className="navigation__panel">
            <img src={Close} alt="close" aria-hidden="true" />

            <button type="button">
              <img src={Menu} alt="Menu" aria-hidden="true" />
            </button>

            <img src={Logo} alt="Logo" aria-hidden="true" />

            <nav>
              <ul>
                <li>Collections</li>
                <li>Men</li>
                <li>Women</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </nav>
            
            <button type="button" aria-hidden="true">
              <img src={Cart} alt="Cart" aria-hidden="true" />
            </button>

            <button type="button" aria-hidden="true">
              <img src={Avatar} alt="Avatar" aria-hidden="true" />
            </button>
          </header>

          <article className="product__page">

            {/* // ========================================== */}
            {/*sem sa budu vkladat obrazky*/}
            {/* // ========================================== */}
            <div className="main__image">
              <img src={productImages} alt="Main product" />
            </div>

            {products[0]?.image.map((item, index) => (
              <div 
                key={index}
                className="thumbnail-wrapper"
                onClick={() => {
                  console.log("Klik na obrazok:", item.image.picture);
                  setProductImages(item.image.picture);
                }}>
                
              <img 
                key={index} 
                src={item.image.thumbnail} 
                alt={item.name} 
                className={productImages === item.image.picture ? "thumbnail--active" : "thummbnail"}
                onClick={() => setProductImages(item.image.picture)}/>
              </div>
            ))}

            
            
            <p>SNEAKER COMPANY</p>

            <h1>Fall Limited Edition Sneakers</h1>

            <p>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they&#39;ll withstand everything the weather can offer.</p>

            <div> 
              <p>{unitPrice.toFixed(2)}</p>
              <p>{products[0]?.price}</p>
              <p>{products[0]?.originalPrice?.toFixed(2)}</p>
            </div>

            {/* // ========================================== */}
            {/* sem pride +/- pre pridanie a odoberanie z kosika */}
            {/* // ========================================== */}
            <div className="quantity__control"> {/* Obalovací prvok pre celé ovládanie množstva (mínus, číslo, plus)*/}
              {/* Tlačidlo pre zníženie množstva */}
              <button 
                type="button" /* Definuje, že ide o obyčajné tlačidlo (neodosiela formulár) */
                onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 0)}> {/*onClick funkcia: prev je aktuálna hodnota (previous state). */}
                                                                              {/* Používame podmienku: Ak je prev viac ako 0, odpočítaj 1. */}
                                                                              {/* Ak už je 0, nechaj tam 0 (vďaka tomu nepôjdeš do mínusu). */}
              <img src={Minus} alt="" aria-hidden="true" />
              </button>

              <span>{quantity}</span> {/* Dynamické zobrazenie aktuálneho čísla zo stavu 'quantity' */}

              {/* // ========================================== */}
              {/* Tlačidlo pre zvýšenie množstva */}
              {/* // ========================================== */}
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)} > 
                <img src={Plus} alt="" aria-hidden="true" />
              </button>
            </div>

            {/* // ========================================== */}
            {/* Tlačidlo na pridanie do košíka */}
            {/* // ========================================== */}
            <button 
              type="button"
              onClick={() => quantity > 0 && setAddCart(true)}> 
              {/* Logická podmienka: setAddCart(true) sa spustí IBA vtedy, ak je quantity (množstvo) väčšie ako nula. Ak je tam 0, na kliknutie to nereaguje (prázdny produkt nepridáš) */}
              <img src={Cart} alt="Cart" aria-hidden="true" />Add to cart
            </button>

          </article>

            {/* // ========================================== */}
            {/* po vybere produktu sa nad obrazkom zobrazi "Empty Cart"*/}
            {/* // ========================================== */}
            <div> {/* kosik */}
              <h3>Cart</h3>

              <div> {/* prazdny kosik */}
                <p> Your cart is empty</p>
              </div>

              <div> {/* kosik po vybere produktu */}
                <div>
                  {/* nahladovy maly obrazok */}
                  <img src={products[0]?.image.thumbnail} alt="product thumbnail" />
                  <p>Fall Limited Edition Sneakers</p>
                  <div>
                    {/* jednotkova cena */} <p>x</p> {/* mnozstvo */} {/* cena celkom */} 
                    <p>${unitPrice.toFixed(2)} x {quantity} ${totalPrice.toFixed(2)}</p>
                  </div>
                  <img 
                    src={Bascket} 
                    alt="Bascket" 
                    aria-hidden="true"
                    onClick={() => {
                      setAddCart(false); // skryje pprodukt z kosika
                      setQuantity(0); // Vynuluje počítadlo
                    }}/>
                </div>

                <button type="button">Checkout</button>
              </div>
            </div>

        </div>

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


export default CommerceProduct;