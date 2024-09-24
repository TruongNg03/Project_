import { useState, useRef, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
// import { CloseIcon } from '~/components/Icons';
import config from '~/config';
import Button from '~/components/Button';
import { AuthContext } from '~/context/AuthContext';
import axios from 'axios';
// import images from '~/assets/images';

const cx = classNames.bind(styles);

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function Login() {
    const [disabled, setDisabled] = useState(true);
    const [showError, setShowError] = useState(false);
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

    const username = useRef();
    const password = useRef();

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    // check all input
    const handleInput = () => {
        const user = username.current.value;
        const pass = password.current.value;

        // save username & pass
        setCredentials({
            username: user,
            password: pass,
        });

        if (validateEmail(user) && pass) {
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

    // check condition username, password
    const handleLogin = async () => {
        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await axios.post('http://localhost:8080/auth/login', credentials);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            localStorage.setItem('user', JSON.stringify(credentials));

            navigate('/');
            window.location.reload(false);
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
            setShowError(true);
        }
    };

    // show error in 2s
    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            setShowError(false);
        }
    }, [showError]);

    return (
        <div className={cx('login')}>
            <div className={cx('body')}>
                <div className={cx('container')} onChange={handleInput}>
                    {/* <img className={cx('logo')} src={images.download} alt='logo' /> */}
                    <h2 className={cx('title')}>Account Log In</h2>
                    {/* input */}
                    <Input
                        ref={username}
                        styleAlert={userAlertStyle}
                        styleNormal={userNormalStyle}
                        maxLength="40"
                        autoComplete="on"
                        contentHolder="Username/Email"
                        contentAlert={userAlert}
                        hideContentAlert={hideUserAlert}
                        hideAlerts={hideUserAlert}
                        hidePassIcon={true}
                        onBlur={checkUser}
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

                    <Button custom disabled={disabled} onClick={handleLogin} type="submit">
                        Log In
                    </Button>
                </div>

                {/* <button className={cx('close')}><CloseIcon /></button> */}
                <div className={cx('link')}>
                    <Link className={cx('link-item')}>Having Problem?</Link>
                    <Link className={cx('link-item')} to={config.routes.register}>
                        Register Now
                    </Link>
                </div>
            </div>
            {error && showError && (
                <div className={cx('error-message')}>
                    <p>{error.message}</p>
                </div>
            )}
        </div>
    );
}

export default Login;
