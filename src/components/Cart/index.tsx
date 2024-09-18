import React, { useEffect, useState } from 'react';
import s852Image from '../../assets/s852.png';
import earPodsImage from '../../assets/earpods.png';
import earPods2Image from '../../assets/earpods2.png';
import airPodsImage from '../../assets/airpods.png';
import gerlaxImage from '../../assets/gerlax.png';
import borofoneImage from '../../assets/borofone.png';
import Bin from '../../assets/bin.svg';
import './Cart.scss';

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
        updateCartCount(storedCart);
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
        updateCartCount(updatedCart);
    };

    const increaseQuantity = (id: number) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
        updateCartCount(updatedCart);
    };

    const decreaseQuantity = (id: number) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
        updateCartCount(updatedCart);
    };

    return (
        <div className="cart">
            <h2>Корзина</h2>
            <div className="cart__wrap">
                <div className="cart__list">
                    {cart.length === 0 && <p>Корзина пуста</p>}
                    {cart.map(item => {
                        const product = headphones.find(p => p.id === item.id);
                        const itemTotalPrice = product ? item.quantity * product.price : 0; // Вычисление общей стоимости для этого продукта
                        return (
                            <div key={item.id} className="cart-item">
                                {product && (
                                    <div className="cart-block">
                                        <div className="cart-block__left">
                                            <div className="cart-block__item">
                                                <img src={product.img} alt={product.title} />
                                                <div className="quantity-controls">
                                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                                    <p>{item.quantity}</p>
                                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                </div>
                                            </div>
                                            <div className="cart-block__title">
                                                <h3>{product.title}</h3>
                                                <p>{product.price} ₽</p> {/* Цена за единицу товара */}
                                            </div>
                                        </div>
                                        <div className="cart-block__right">
                                            <button onClick={() => removeFromCart(item.id)}>
                                                <img src={Bin} alt='bin' />
                                            </button>
                                            <p>{itemTotalPrice} ₽</p> {/* Общая стоимость для текущего количества */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="cart__total">
                    <div className="cart__total-price">
                        <span>Итого</span>
                        <span>₽ {total}</span>
                    </div>
                    <button>Перейти к оформлению</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;