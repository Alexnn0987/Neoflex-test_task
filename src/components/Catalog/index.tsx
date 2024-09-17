import React, { useEffect } from 'react';
import ItemCard from '../ItemCart';

import s852Image from '../../assets/s852.png';
import earPodsImage from '../../assets/earpods.png';
import earPods2Image from '../../assets/earpods2.png';
import airPodsImage from '../../assets/airpods.png';
import gerlaxImage from '../../assets/gerlax.png';
import borofoneImage from '../../assets/borofone.png';

import './Catalog.scss';

const headphones = [
    {
        id: 1,
        img: s852Image,
        title: "Apple BYZ S852I",
        price: 2927,
        oldPrice: 3527,
        rate: 4.7,
    },
    {
        id: 2,
        img: earPodsImage,
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5,
    },
    {
        id: 3,
        img: earPods2Image,
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5,
    },
    {
        id: 4,
        img: airPodsImage,
        title: "Apple AirPods",
        price: 9527,
        rate: 4.7,
    },
    {
        id: 5,
        img: gerlaxImage,
        title: "Gerlax GH-04",
        price: 6527,
        rate: 4.7,
    },
    {
        id: 6,
        img: borofoneImage,
        title: "Borofone BO4",
        price: 7527,
        rate: 4.7,
    }
];

const Catalog: React.FC<{ setCartCount: (count: number) => void }> = ({ setCartCount }) => {
    
    const addToCart = (id: number) => {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const itemIndex = cart.findIndex((item: any) => item.id === id);
        
        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ id, quantity: 1 });
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        // Обновляем общий cartCount в App
        setCartCount(cart.reduce((acc: number, item: any) => acc + item.quantity, 0));
    };

    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        setCartCount(cart.reduce((acc: number, item: any) => acc + item.quantity, 0));
    }, [setCartCount]);

    // Фильтрация наушников
    const regularHeadphones = headphones.filter(headphone => headphone.id >= 1 && headphone.id <= 3);
    const wirelessHeadphones = headphones.filter(headphone => headphone.id >= 4);

    // Дублируем три товара с id от 1 до 3 для отображения их дважды
    const extendedRegularHeadphones = [...regularHeadphones, ...regularHeadphones];

    return (
        <div className='catalog'>
            <div className='catalog__block'>
                <h2>Наушники</h2>
                <div className="catalog__list">
                    {extendedRegularHeadphones.map(headphone => (
                        <ItemCard key={headphone.id} headphone={headphone} onAddToCart={addToCart} />
                    ))}
                </div>
            </div>
            <div className='catalog__block block-bottom'>
                <h2>Беспроводные наушники</h2>
                <div className="catalog__list">
                    {wirelessHeadphones.map(headphone => (
                        <ItemCard key={headphone.id} headphone={headphone} onAddToCart={addToCart} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;