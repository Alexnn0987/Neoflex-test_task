import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import s852Image from '../../assets/s852.png';
import earPodsImage from '../../assets/earpods.png';
import earPods2Image from '../../assets/earpods2.png';
import airPodsImage from '../../assets/airpods.png';
import gerlaxImage from '../../assets/gerlax.png';
import borofoneImage from '../../assets/borofone.png';
import Bin from '../../assets/bin.svg';

const headphones = [
    {
        id: 1,
        img: s852Image,
        title: "Apple BYZ S852I",
        price: 2927,
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
        rate: 4.7
    },
    {
        id: 6,
        img: borofoneImage,
        title: "Borofone BO4",
        price: 7527,
        rate: 4.7,
    }
];

const Cart: React.FC<{ setCartCount: (count: number) => void }> = ({ setCartCount }) => {
    const [cart, setCart] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        setCart(storedCart);
        calculateTotal(storedCart);
        updateCartCount(storedCart); // Обновляем cartCount
    }, []);

    const calculateTotal = (cart: any[]) => {
        const totalAmount = cart.reduce((acc, item) => {
            const product = headphones.find(p => p.id === item.id);
            return acc + (product ? item.quantity * product.price : 0);
        }, 0);
        setTotal(totalAmount);
    };

    const updateCartCount = (cart: any[]) => {
        const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(count);
    };

    const removeFromCart = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
        updateCartCount(updatedCart); // Обновляем cartCount
    };

    return (
        <>
            <h2>Корзина</h2>
            {cart.length === 0 && <p>Корзина пуста</p>}
            {cart.map(item => {
                const product = headphones.find(p => p.id === item.id);
                return (
                    <div key={item.id} className="cart-item">
                        {product && (
                            <div>
                                <img src={product.img} alt={product.title} style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
                                <h3>{product.title}</h3>
                                <p>{item.quantity}</p>
                                <button onClick={() => removeFromCart(item.id)}>
                                    <img src={Bin} alt='' />
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
            <div>
                <span>Итого </span>
                <span>₽{total}</span>
                <Link to='/cart'>Перейти к оформлению</Link>
            </div>
        </>
    );
};

export default Cart;