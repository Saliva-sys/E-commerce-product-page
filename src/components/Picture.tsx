// Picture.tsx
import React from "react";

interface ProductImage {
    picture: string;
    thumbnail: string,
}

interface PictureProps {
    productImages: string | undefined;
    setProductImages: (value: string) => void;
    images:ProductImage[];
    setLightBox: (value:boolean) => void;
    handlePrev: () => void;
    Prev: string;
    handleNext: () => void;
    Next: string;    
}

const Picture:React.FC<PictureProps> = ({productImages, setProductImages, images, setLightBox, handlePrev, Prev, handleNext, Next}) => {

return (
<>
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
        {images.map((item, index) => (
            <div
                key={index}
                className="thumbnail__image">

                <img
                    src={item.thumbnail}
                    alt={`Thumbnail of ${index}`}
                    className={productImages === item.picture ? "thumbnail--active" : "thumbnail"}
                    onClick={() => setProductImages(item.picture)}/>
            </div>
        ))}
        {/* // ________________________________________ */}
    </div>
</>
);
};

export default Picture;

