import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAsia,
    faCircleQuestion,
    // faKeyboard,
    faUser,
    faSignOut,
    // faEllipsisVertical,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import config from '~/config';
// import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
// import { UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import images from '~/assets/images';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Language',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'Eng',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'VN',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback',
        // to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log in',
        to: config.routes.login,
        separate: true,
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: config.routes.profile,
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        // to: '/',
    },
    ...MENU_ITEMS.slice(0, 2),
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/blank-page',
        separate: true,
    },
];

function Header() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //
                break;
            default:
        }
        switch (menuItem.title) {
            case 'Log in':
                //
                break;
            case 'Log out':
                // localStorage.clear();
                localStorage.removeItem('user');
                navigate('/');
                window.location.reload(false);
                break;
            default:
        }
    };

    return (
        <div className={cx('header')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img className={cx('logo-main')} src={images.noImage2} alt="logo" />
                </Link>

                {/* search */}
                <Search />

                {/* action - login account */}
                <div className={cx('action')}>
                    {user ? (
                        <Menu items={userMenu} onChange={handleMenuChange}>
                            <Image
                                className={cx('user-avatar')}
                                src="https://i.imgur.com/ahQ0Jib.jpeg"
                                alt="img"
                                // fallback='/'
                            />
                        </Menu>
                    ) : (
                        <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                            <div>
                                <Image className={cx('user-avatar')} src={images.noImage} alt="no_image" />
                            </div>
                        </Menu>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
