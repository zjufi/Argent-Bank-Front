import img from "../img/bank-tree.webp";
import "../styles/components/banner.css";
import React from "react";


function Banner() {
    return (
        <div className="banner" style={{ backgroundImage: `url(${img})` }}>
            <section className="banner-content" >
                <h2 className="sr-only">Promoted Content</h2>
                <p className="banner-title">No fees.</p>
                <p className="banner-title">No minimum deposit.</p>
                <p className="banner-title">High interest rates.</p>
                <p className="banner-text">Open a savings account with Argent Bank today!</p>
            </section>
        </div>
    );
}

export default Banner;