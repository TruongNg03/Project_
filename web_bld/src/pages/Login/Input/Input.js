import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Input = forwardRef(function Input(
    {
        className,
        styleNormal = false,
        styleAlert = false,
        type,
        contentHolder,
        minLength,
        maxLength,
        autoComplete,
        showPass = true,
        iconPass = false,
        hidePassIcon = false,
        hideSend = true,
        contentAlert,
        hideAlerts = true,
        onBlur,
    },
    inputRef,
) {
    const [inputValue, setInputValue] = useState('');
    const [showIconPass, setShowIconPass] = useState(iconPass);
    const [isShown, setIsShown] = useState(showPass);

    // xu ly dau ' ' khi nhap o dau input
    const handleChange = (e) => {
        setInputValue(e.target.value.trim());
        // const inputValue = e.target.value;
        // if(!inputValue.startsWith(' ')){
        //     setInputValue(inputValue);
        // }

        // alert empty when click outside
    };

    // delete
    const handleClear = () => {
        setInputValue('');
        inputRef.current.focus();
    };

    // change icon show-hide password
    const handleChangeIcon = (e) => {
        if (showIconPass) {
            setShowIconPass(false);
            setIsShown(false);
        } else {
            setShowIconPass(true);
            setIsShown(true);
        }
    };

    const classes = cx('inner', {
        [className]: className,
        styleNormal,
        styleAlert,
    });

    return (
        <div className={cx('wrapper')}>
            <div className={classes}>
                <input
                    type={type ? type : isShown ? 'text' : 'password'}
                    ref={inputRef}
                    value={inputValue}
                    minLength={minLength}
                    maxLength={maxLength}
                    placeholder=""
                    spellCheck={false}
                    autoComplete={autoComplete}
                    onChange={handleChange}
                    onBlur={onBlur}
                />
                <div className={cx('icon-send')}>
                    <span className={cx('icon')}>
                        {!!inputValue && (
                            <span className={cx('clear')} onClick={handleClear}>
                                <FontAwesomeIcon className={cx('group-icon')} icon={faCircleXmark} />
                            </span>
                        )}
                        {/* change fa icon */}
                        {showIconPass ? (
                            <span className={cx('show-hide')} hidden={hidePassIcon} onClick={handleChangeIcon}>
                                <FontAwesomeIcon className={cx('group-icon')} icon={faEye} />
                            </span>
                        ) : (
                            <span className={cx('show-hide')} hidden={hidePassIcon} onClick={handleChangeIcon}>
                                <FontAwesomeIcon className={cx('group-icon')} icon={faEyeSlash} />
                            </span>
                        )}
                    </span>
                    <span className={cx('send')}>
                        <div className={cx('before-send')} hidden={hideSend}></div>
                        <p hidden={hideSend}>Send</p>
                    </span>
                </div>
                <label className={cx('content-holder')}>{contentHolder}</label>
            </div>
            <p className={cx('alert')} hidden={hideAlerts}>
                {contentAlert}
            </p>
        </div>
    );
});

Input.propTypes = {
    className: PropTypes.string,
    styleNormal: PropTypes.bool,
    styleAlert: PropTypes.bool,
    type: PropTypes.string,
    contentHolder: PropTypes.string,
    minLength: PropTypes.string,
    maxLength: PropTypes.string,
    autoComplete: PropTypes.string,
    showPass: PropTypes.bool,
    iconPass: PropTypes.bool,
    hidePassIcon: PropTypes.bool,
    hideSend: PropTypes.bool,
    contentAlert: PropTypes.string,
    onBlur: PropTypes.func,
};

export default Input;
