import "./CommerceProduct.css";
import  {useState, useEffect} from "react";
import Menu from "./assets/icon-menu.svg";
import Logo from "./assets/logo.svg";
import Cart from "./assets/icon-cart.svg";
import Bascket from "./assets/icon-delete.svg";
import Close from "./assets/icon-close.svg";
import Avatar from "./assets/image-avatar.png";


const CommerceProduct = () => { // idem vyberat produkty a vkladat ich cez button "Add to Cart" do kosika
  const [products, setProducts] = useState([]);
  const [addCart, setAddCart] = useState(false);

  // idem vyberat z thumbnails obrazky
  const [productImages,setProductImages] = useState();


  useEffect (() => {
    fetch('data.json') // bez bodky a bez lomky na zaciatku
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      if (data.length > 0) {
        setProductImages(data[0].image.picture);
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

            {/*sem sa budu vkladat obrazky*/}
            <div className="main__image">
              <img src={productImages} alt="Main product" />
            </div>

            {products.map((item, index) => (
              <img 
                key={index} 
                src={item.image.thumbnail} 
                alt={item.name} 
                className={productImages === item.image.picture ? "thumbnail--active" : "thummbnail"}
                onClick={() => setProductImages(item.image.picture)}/>
            ))}
            
            
            <p>SNEAKER COMPANY</p>

            <h1>Fall Limited Edition Sneakers</h1>

            <p>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they&#39;ll withstand everything the weather can offer.</p>

            <div> 
              <h2>$125.00</h2>
              <p>50%</p>
              <p>$250.00</p>
            </div>

            {/* sem pride +/- pre pridanie a odoberanie z kosika */}
            
            <button type="button"> <img src={Cart} alt="Cart" aria-hidden="true" />Add to cart</button>
          </article>

            {/* po vybere produktu sa nad obrazkom zobrazi "Empty Cart"*/}
            <div> {/* kosik */}
              <h3>Cart</h3>

              <div> {/* prazdny kosik */}
                <p> Your cart is empty</p>
              </div>

              <div> {/* kosik po vybere produktu */}
                <div>
                  {/* nahladovy maly obrazok */}
                  {/* nazov produktu */}
                  <div>
                    {/* jednotkova cena */} <p>x</p> {/* mnozstvo */} {/* cenea celkom */} 
                  </div>
                  <img src={Bascket} alt="Bascket" aria-hidden="true" />
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