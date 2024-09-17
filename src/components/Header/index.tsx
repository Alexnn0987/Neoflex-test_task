import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

import Logo from '../../assets/logo.svg';
import Like from '../../assets/like.svg';
import Cart from '../../assets/cart.svg';

interface HeaderProps {
  cartCount: number; // Получаем cartCount как пропс
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
    return (
        <header className='header'>
            <Link to="/" className='header__logo'>
                <img src={Logo} alt="logo" />
            </Link>
            <nav className='header__tools'>
                <Link to="/" className="header__cart">
                    <img src={Like} alt="like" />
                    <span className="header__cart-count">2</span>
                </Link>
                <Link to="/cart" className="header__cart">
                    <img src={Cart} alt="cart" />
                    {cartCount > 0 && (
                        <span className="header__cart-count">{cartCount}</span>
                    )}
                </Link>
            </nav>
        </header>
    );
};

export default Header;