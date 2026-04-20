// PreviewWindow.tsx

import React from "react";

interface ProductImage {
    picture: string;
    thumbnail: string;
}

interface PreviewWindowProps {
    lightBox: boolean;
    setLightBox: (value: boolean) => void;
    CloseLightBox: string;
    handlePrev: () => void;
    Prev: string;
    handleNext: () => void;
    Next: string; 
    productImages: string | undefined;
    images:ProductImage[];
    setProductImages: (value: string) => void;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({lightBox, setLightBox, CloseLightBox, handlePrev, Prev, handleNext, Next, productImages, images, setProductImages}) => {

return (
    <>
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
                  {images.map((item, index) => (
                  <div
                    key={index}
                    className={`lightbox__thumbnail-image ${productImages === item.picture ? "active-border" : ""}`}>

                    <img
                      src={item.thumbnail}
                      alt={`Thumbnail of ${index}`}
                      className={productImages === item.picture ? "thumbnail__lightbox--active" : "thumbnail__lightbox"}
                      onClick={() => setProductImages(item.picture)}
                      />
                  </div>
                  ))}
                </div>
              </div>
            </div>
          )}
    </>
);
};

export default PreviewWindow;