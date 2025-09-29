import React from 'react';

import Banner from '../components/banner';
import Item from '../components/item';

import '../styles/pages/home.css';

import Iconchat from '../img/icon-chat.webp';
import Iconmoney from '../img/icon-money.webp';
import Iconsecurity from '../img/icon-security.webp';

import ItemData from '../data/itemData.json';

function Home() {

  const ImageItem = [Iconchat, Iconmoney, Iconsecurity];
  return (
    <>
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
            {ItemData.map((data) => (
              <Item
                key={data.id}
                image={ImageItem[data.id - 1]}
                title={data.title}
                description={data.description}
              />
            ))}

        </section>
      </main>
    </>
  );
}

export default Home;