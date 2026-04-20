// ProductInfo.tsx
import React from "react";

interface Product {
    name: string;
    company: string;
    description: string;
}

interface ProductInfoProps {    
    products: Product[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({products}) => {

return (
<>
    <div className="product__information">
        <p className="product__info-company">{products[0]?.company}</p>
        <h1 className="product__info-name">{products[0]?.name}</h1>
        <p className="product__info-description">{products[0]?.description}</p>
    </div>
</>
);
};

export default ProductInfo;