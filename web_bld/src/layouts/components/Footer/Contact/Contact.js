import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Contact({ location, pos1, pos2, phoneNum1, phoneNum2 }) {
    return (
        <div className={cx('contact')}>
            <div className={cx('address')}>
                <p className={cx('location')}>{location}</p>
                <span className={cx('pos-item')}>
                    <img className={cx('pos-icon')} src={images.position} alt='pos1' />
                    <p className={cx('pos-content')}>{pos1}</p>
                </span>
                <span className={cx('pos-item')}>
                    <img className={cx('pos-icon')} src={images.position} alt='pos2' />
                    <p className={cx('pos-content')}>{pos2}</p>
                </span>
            </div>

            <div className={cx('phone')}>
                <span className={cx('phone-item')}>
                    <img className={cx('call-icon')} src={images.call} alt='call' />
                    <p className={cx('phone-content')}>Liên hệ giờ hành chính</p>
                </span>
                <p className={cx('phone-num')}>{phoneNum1}</p>
                <p className={cx('phone-num')}>{phoneNum2}</p>
            </div>
        </div>
    );
}

Contact.prototype = {
    location: PropTypes.string,
    pos1: PropTypes.string,
    pos2: PropTypes.string,
    phoneNum1: PropTypes.string,
    phoneNum2: PropTypes.string,
}

export default Contact;