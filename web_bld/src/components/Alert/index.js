import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Alert.module.scss';
import { CloseIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Alert({ header, content, className, danger = false, contentBtn, onCloseBtn, onCancelBtn, onDefBtn }) {
    const classes = cx('default-btn', {
        [className]: className,
        danger,
    });

    return (
        <div className={cx('alert')} tabIndex="-1">
            <div className={cx('header')}>
                <h5 className={cx('title')}>{header}</h5>
                <span className={cx('close-btn')} onClick={onCloseBtn}>
                    <CloseIcon />
                </span>
            </div>
            <div className={cx('body')}>
                <p>{content}</p>
            </div>
            <div className={cx('footer')}>
                <button className={cx('cancel-btn')} onClick={onCancelBtn}>Hủy</button>
                <button className={cx(classes)} onClick={onDefBtn}>{contentBtn}</button>
            </div>
        </div>
    );
}

Alert.propTypes = {
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
    danger: PropTypes.bool,
    contentBtn: PropTypes.string.isRequired,
    onCloseBtn: PropTypes.func,
    onCancelBtn: PropTypes.func,
    onDefBtn: PropTypes.func,
};

export default Alert;
