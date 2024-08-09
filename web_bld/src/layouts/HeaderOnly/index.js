import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Header from '~/layouts/components/Header';
import images from '~/assets/images/';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const [show, setShow] = useState(false);

    const handleChange = () => {
        if (window.scrollY > 500) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const handleClick = () => {
        window.scrollTo(0, 0);
        setShow(false);
    };

    return (
        <div className={cx('wrapper')} onWheel={handleChange}>
            <Header />
            <div className={cx('container')} style={{ width: '100%' }}>
                {children}
            </div>
            {/* btn scroll to top */}
            <div className={cx('scroll-top-btn')} onClick={handleClick} hidden={!show}>
                <img className={cx('image')} src={images.floatingTop} alt="img" />
            </div>
        </div>
    );
}

export default HeaderOnly;
