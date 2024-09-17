import React from 'react'
import { Link } from 'react-router-dom';

import './Footer.scss';
import Logo from '../../assets/logo.svg';
import Language from '../../assets/language.svg';
import VK from '../../assets/VK.svg';
import Telegram from '../../assets/Telegram.svg';
import Whatsapp from '../../assets/Whatsapp.svg';

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <Link to="/" className='header__logo'>
                <img src={Logo} alt="logo" />
            </Link>
            <ul  className='footer__menu'>
                <li>
                    <Link to="/">Избранное</Link>
                </li>
                <li>
                    <Link to="/cart">Корзина</Link>
                </li>
                <li>
                    <Link to="https://www.neoflex.ru/contacts" target="_blank">Контакты</Link>
                </li>
            </ul>       
            <div className='footer__tools'>
                <button>Условия сервиса</button>
                <div className='footer__language'>
                    <img src={Language} alt="language" />
                    <span>Рус</span>
                    <span>Eng</span>
                </div>
            </div>
            <div className='footer__social-link'>
                <Link to="https://vk.com/neoflex_ru" target="_blank">
                    <img src={VK} alt="VK" />
                </Link>
                <Link to="https://t.me/neoflexcareers" target="_blank">
                    <img src={Telegram} alt="telegram" />
                </Link>
                <Link to="https://wa.me/84959842513" target="_blank">
                    <img src={Whatsapp} alt="whatsapp" />
                </Link>
            </div>
        </footer>
    )
}

export default Footer