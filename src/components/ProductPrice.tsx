// ProductPrice.tsx

import React from "react";

interface Product {
    price: number;
    discount?: number;
    originalPrice: number;
}

interface ProductPriceProps {
    amount: Product[];
}

const ProductPrice: React.FC<ProductPriceProps> = ({amount}) => {
    // If the data is not yet, we will not draw anything or give a loading
    if (!amount || amount.length === 0) return null;

    const p = amount[0];

return (
<>
    <div className="product__price">
        <p className="product__price-unit">{p.price > 0 ? p.price : "0.00"}</p>
        <p className="product__price-discount">{p.discount}</p>
        <div className="product__price-original">
            <p className="product__price-orig">{p.originalPrice}</p>
        </div>
    </div>
</>
);
};

export default ProductPrice;