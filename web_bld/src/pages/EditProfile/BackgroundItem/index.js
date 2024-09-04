import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BackgroundImage.module.scss';
import { useId } from 'react';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function BackgroundItem({ id, src, alt, usedBg = false, clickBg }) {
    const itemId = useId();

    return (
        <label htmlFor={'item-' + itemId}>
            <input type="radio" id={'item-' + itemId} name="radio-background" />
            <div className={cx('background-item')} onClick={clickBg}>
                <img className={cx('image')} id={id} src={src} alt={alt} />
                {usedBg && <img className={cx('checked-img')} src={images.checked} alt="check-img" />}
            </div>
        </label>
    );
}

BackgroundItem.propTypes = {
    id: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    usedBg: PropTypes.bool,
    clickBg: PropTypes.func,
};

export default BackgroundItem;
