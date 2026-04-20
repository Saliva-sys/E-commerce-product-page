import React, {useState, useEffect} from "react";
import "./CommerceProduct.css";
import NavLinks from "./components/NavLinks";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import CartWidget from "./components/CartWidget";
import Picture from "./components/Picture";
import PreviewWindow from "./components/PreviewWindow";
import ProductInfo from "./components/ProductInfo";
import ProductPrice from "./components/ProductPrice";

import Logo from "./assets/logo.svg";
import Close from "./assets/icon-close.svg";
import MenuIcon from "./assets/icon-menu.svg";
import Cart from "./assets/icon-cart.svg";
import Basket from "./assets/icon-delete.svg";
import Swal from 'sweetalert2';
import Avatar from "./assets/image-avatar.png";
import CloseLightBox from "./assets/icon-close1.svg";
import Prev from "./assets/icon-previous.svg";
import Next from "./assets/icon-next.svg";



interface ProductImage {
  picture: string; 
  thumbnail: string;
}

interface Product {
  name: string;
  company: string;
  description: string;
  price: number;
  discount?: number; // the question mark means it may or may not be there
  originalPrice: number;
  image: ProductImage[];
}

// Stav a logika
const CommerceProduct: React.FC = () => {

  // TS now knows exactly that there will be only true or false
  const [menu, setMenu] = useState<boolean>(false);

  // Here will be a field of objects that meet the rules of the interface of the Product interface
  const [products, setProducts] = useState<Product[]>([]);

  // The picture is either string (path) or undefined until it is loaded
  const [productImages, setProductImages] = useState<string | undefined>(); // Select images from thumbnail

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
// vkladanie obrazkov zo suboru data.json / nacitavanie dat
useEffect (() => {
  fetch('data.json')
    .then(response => response.json())
    .then((data: Product[]) => { // We will tell TS that we will come a field of products from JSON
      setProducts(data);
      if (data.length && data[0].image.length > 0) {
        setProductImages(data[0].image[0].picture);
        console.log("Dáta sa načítali:", data);
        
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
<div className="main__container">

  
  <header className="navigation__panel"> 
    {/* // ========================================== */}
    {/* navigation panel */} 
    <NavLinks
      menu={menu}
      setMenu={setMenu}
      Logo={Logo}
      Close={Close}
      Menu={MenuIcon}
      />
    {/* // ========================================== */}

    <div className="navigation__panel-cart">
      <CartWidget
        Cart={Cart}
        Basket={Basket}
        addCart={addCart}
        setAddCart={setAddCart}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
        cartQuantity={cartQuantity}
        products={products}
        setQuantity={setQuantity}
        Swal={Swal}
       />

      <Profile
        Avatar={Avatar}
      />
    </div>
  </header>

  <article className="product__container">
    {/* // ========================================== */}
        {/* priestor pre obrazky */}
        <div className="image__container">
          <Picture
            productImages={productImages}
            setProductImages={setProductImages}
            images={products[0]?.image || []}
            setLightBox={setLightBox}
            handlePrev={handlePrev}
            Prev={Prev}
            handleNext={handleNext}
            Next={Next} />
        </div>

        <PreviewWindow
          lightBox={lightBox}
          setLightBox={setLightBox}
          CloseLightBox={CloseLightBox}
          handlePrev={handlePrev}
          Prev={Prev}
          handleNext={handleNext}
          Next={Next}
          productImages={productImages}
          images={products[0]?.image || []}
          setProductImages={setProductImages}
           />

        <div className="product__info">
          <div className="product__info-container">
            <ProductInfo 
              products={products}/>

            <ProductPrice 
              amount={products} />
          </div>
        </div>

  </article>
  
  <footer className="attribution">
    <Footer />
  </footer> 
  
  
</div>
);
};

export default CommerceProduct;