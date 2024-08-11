import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Item({ header, content }) {
    return (
        <Link to="/faq" className={cx('item')}>
            <div className={cx('header')}>
                <img src={images.backgroundItem} alt="background-item" className={cx('background')} />
                <img src={images.iconNote} alt="icon-item" className={cx('icon')} />
                <p>{header}</p>
            </div>
            <div className={cx('content')}>
                <p>{content}</p>
                <strong>Go</strong>
            </div>
        </Link>
    );
}

Item.propTypes = {
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Item;
