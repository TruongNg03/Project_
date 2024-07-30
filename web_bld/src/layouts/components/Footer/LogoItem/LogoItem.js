import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './LogoItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function LogoItem({ title, image1, alt1, image2, alt2, image3, alt3 }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('listImage')}>
                <Image className={cx('image')} src={image1} alt={alt1} />
                <Image className={cx('image')} src={image2} alt={alt2} />
                <Image className={cx('image')} src={image3} alt={alt3} />
            </div>
        </div>
    );
}

LogoItem.prototype = {
    title: PropTypes.string,
    image1: PropTypes.string,
    image2: PropTypes.string,
}

export default LogoItem;
