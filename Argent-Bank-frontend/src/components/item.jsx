import React from "react";
import '../styles/components/item.css';


function Item({ image, title, description }) {
    return (
        <div className="feature-item">
            <img src={image} alt="" className="feature-item-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Item;
