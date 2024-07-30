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
import { Link } from 'react-router-dom';

import config from '~/config';
// import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
// import { UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import images from '~/assets/images';
import { useState } from 'react';

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
        to: '/',
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
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/',
    },
    ...MENU_ITEMS.slice(0, 2),
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: config.routes.home,
        separate: true,
    },
];

function Header() {
    const [currentUser, setCurrentUser] = useState(false);

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
                // setCurrentUser(true)
                break;
            case 'Log out':
                setCurrentUser(false);
                break;
            default:
        }
    };

    const login = () => {
        setCurrentUser(true);
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
                    {/* {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload" placement='bottom'>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button rounded  onClick={login}>
                                Log in
                            </Button>
                        </>
                    )}
                    */}

                    {currentUser ? (
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
