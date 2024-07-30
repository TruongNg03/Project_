import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import Input from '~/pages/Login/Input';
// import { CloseIcon } from '~/components/Icons';
import config from '~/config';
import Button from '~/components/Button';
// import images from '~/assets/images';

const cx = classNames.bind(styles);

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function Register() {
    const [disabled, setDisabled] = useState(true);
    //
    const [userNormalStyle, setUserNormalStyle] = useState(false);
    const [userAlertStyle, setUserAlertStyle] = useState(false);
    const [userAlert, setUserAlert] = useState('Account cannot be empty');
    const [hideUserAlert, setHideUserAlert] = useState(true);
    //
    const [passNormalStyle, setPassNormalStyle] = useState(false);
    const [passAlertStyle, setPassAlertStyle] = useState(false);
    const [passAlert, setPassAlert] = useState('Password cannot be empty');
    const [hidePassAlert, setHidePassAlert] = useState(true);
    //
    const [passAgainNormalStyle, setPassAgainNormalStyle] = useState(false);
    const [passAgainAlertStyle, setPassAgainAlertStyle] = useState(false);
    const [passAgainAlert, setPassAgainAlert] = useState('Password confirmation cannot be empty');
    const [hidePassAgainAlert, setHidePassAgainAlert] = useState(true);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordAgain: '',
    });

    const username = useRef();
    const verifyCode = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const changeDataForm = () => {
        const user = username.current.value;
        const verify = verifyCode.current.value;
        const pass = password.current.value;
        const passAgain = passwordAgain.current.value;

        setFormData({
            username: user,
            password: pass,
            passwordAgain: passAgain,
        });

        // check disabled btn
        if (user && pass && verify.length === 6 && passAgain && pass === passAgain) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    // change css && check input
    const checkUser = () => {
        const user = username.current.value;

        setHideUserAlert(false);
        setUserAlertStyle(true);
        setUserNormalStyle(false);
        if (!user) {
            setDisabled(true);
            setUserAlert('Account cannot be empty');
        } else if (!validateEmail(user)) {
            setDisabled(true);
            setUserAlert('Invalid email format');
        } else {
            setHideUserAlert(true);
            setUserAlertStyle(false);
            setUserNormalStyle(true);
        }
    };

    const checkVerify = () => {
        const verify = verifyCode.current.value;

        setDisabled(true);
        if (verify.length === 6) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const checkPassword = () => {
        const pass = password.current.value;

        setHidePassAlert(false);
        setPassAlertStyle(true);
        setPassNormalStyle(false);
        if (!pass) {
            setDisabled(true);
            setPassAlert('Password cannot be empty');
        } else if (pass.length < 8 || pass.length > 30) {
            setDisabled(true);
            setPassAlert('Password must be 8-30 characters');
        } else {
            setHidePassAlert(true);
            setPassAlertStyle(false);
            setPassNormalStyle(true);
        }
    };

    const checkPasswordAgain = () => {
        const pass = password.current.value;
        const passAgain = passwordAgain.current.value;

        setHidePassAgainAlert(false);
        setPassAgainAlertStyle(true);
        setPassAgainNormalStyle(false);
        if (!passAgain) {
            setDisabled(true);
            setPassAgainAlert('Password confirmation cannot be empty');
        } else if (pass !== passAgain || passAgain < 8) {
            setDisabled(true);
            setPassAgainAlert('Please make sure the password you enter both times is the same');
        } else {
            setHidePassAgainAlert(true);
            setPassAgainAlertStyle(false);
            setPassAgainNormalStyle(true);
        }
    };

    // submit
    const submitRegister = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className={cx('register')}>
            <div className={cx('body')}>
                <form className={cx('container')} method="POST" onChange={changeDataForm}>
                    {/* <img className={cx('logo')} src={images.download} alt='logo' /> */}
                    <h2 className={cx('title')}>Register</h2>
                    {/* input */}
                    <Input
                        ref={username}
                        styleAlert={userAlertStyle}
                        styleNormal={userNormalStyle}
                        maxLength="40"
                        autoComplete="on"
                        contentHolder="Email"
                        contentAlert={userAlert}
                        hideContentAlert={hideUserAlert}
                        hideAlerts={hideUserAlert}
                        hidePassIcon={true}
                        onBlur={checkUser}
                    />
                    <Input
                        ref={verifyCode}
                        contentHolder="Verification Code"
                        hidePassIcon={true}
                        hideSend={false}
                        onBlur={checkVerify}
                    />
                    <Input
                        ref={password}
                        styleAlert={passAlertStyle}
                        styleNormal={passNormalStyle}
                        showPass={false}
                        maxLength="30"
                        contentHolder="Password"
                        contentAlert={passAlert}
                        hideContentAlert={hidePassAlert}
                        hideAlerts={hidePassAlert}
                        onBlur={checkPassword}
                    />
                    <Input
                        ref={passwordAgain}
                        styleAlert={passAgainAlertStyle}
                        styleNormal={passAgainNormalStyle}
                        showPass={false}
                        maxLength="30"
                        contentHolder="Please enter password again"
                        contentAlert={passAgainAlert}
                        hideContentAlert={hidePassAgainAlert}
                        hideAlerts={hidePassAgainAlert}
                        onBlur={checkPasswordAgain}
                    />

                    <Button custom disabled={disabled} type="submit" onClick={submitRegister}>
                        Register
                    </Button>

                    {/* <button className={cx('close')}><CloseIcon /></button> */}
                </form>
                <div className={cx('link')}>
                    <p>Already have an account?</p>
                    <Link className={cx('link-item')} to={config.routes.login}>
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
