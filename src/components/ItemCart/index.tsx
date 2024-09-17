import React from 'react';

import Star from '../../assets/star.svg';

import './ItemCart.scss'

interface ItemCardProps {
  headphone: { 
    id: number; 
    img: string; 
    title: string; 
    price: number; 
    oldPrice?: number;
    rate: number 
};
  onAddToCart: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ headphone, onAddToCart }) => {
    return (
        <div className="item-card">
            <div className="item-card__img">
                <img src={headphone.img} alt={headphone.title} />
            </div>
            <div className="item-card__text">
                <h3>{headphone.title}</h3>
                <div className="item-card__price">
                    <p>{headphone.price} ₽</p>
                    {headphone.oldPrice && (
                        <p className="item-card__old-price">{headphone.oldPrice} ₽</p> // Отображаем старую цену
                    )}
                </div>
                <div className="item-card__star">
                    <img src={Star} alt="star" />
                    <p>{headphone.rate}</p>
                </div>
                <button onClick={() => onAddToCart(headphone.id)}>Купить</button>
            </div>            
        </div>
    );
};

export default ItemCard;