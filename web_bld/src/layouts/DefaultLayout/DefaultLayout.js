import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import Menu from '~/layouts/components/Menu';
import styles from './DefaultLayout.module.scss';
import images from '~/assets/images';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
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

    window.addEventListener('scroll', handleChange);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <Menu />
            <div className="container" style={{ width: '100%' }}>
                {children}
            </div>
            <Footer />
            {/* btn scroll to top */}
            <div className={cx('scroll-top-btn')} onClick={handleClick} hidden={!show}>
                <img className={cx('image')} src={images.floatingTop} alt="img" />
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
