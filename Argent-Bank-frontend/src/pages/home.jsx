import React from 'react';

import Banner from '../components/banner';

import '../styles/pages/home.css';

import Iconchat from '../img/icon-chat.png';
import Iconmoney from '../img/icon-money.png';
import Iconsecurity from '../img/icon-security.png';

function Home() {
  return (
    <div className="home-page">
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <div className="feature-item">
          <img src={Iconchat} alt="" classname="feature-item-icon"/>
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="feature-item">
          <img src={Iconmoney} alt="" classname="feature-item-icon" />
          <h3 className="feature-item-title">More savings means higher rates</h3>
          <p>
            The more you save with us, the higher your interest rate will be!
            Enjoy a competitive rate and leave your worries behind.
          </p>
        </div>
        <div className="feature-item">
          <img src={Iconsecurity} alt="" classname="feature-item-icon" />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;