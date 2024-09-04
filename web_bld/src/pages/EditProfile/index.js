import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { CloseIcon } from '~/components/Icons';
import images from '~/assets/images';
import BackgroundItem from './BackgroundItem';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function EditProfile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [active, setActive] = useState(false);
    const [background, setBackground] = useState(null);
    // const [currentBackground, setCurrentBackground] = useState(null);
    const [listBackground, setListBackground] = useState(null);
    const [showChangeBackground, setShowChangeBackground] = useState(false);
    const [showChangeButton, setShowChangeButton] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: null,
        signature: null,
        gender: null,
        date: null,
        phone: null,
        address: null,
    });

    // fetch api
    useEffect(() => {
        async function getActivities() {
            // get profile
            const profile = await fetch(`http://localhost:8080/profile/${user._id}`);
            const profileData = await profile.json();

            // list background
            const fetchListBackground = await fetch('http://localhost:8080/backgrounds');
            const allBackgroundData = await fetchListBackground.json();

            if (profileData.background) {
                const userBackground = await fetch(`http://localhost:8080/backgrounds?id=${profileData.background}`);
                const userBackgroundData = await userBackground.json();

                setBackground(userBackgroundData);
                // setCurrentBackground(userBackgroundData.imageUrl);
            }

            setListBackground(allBackgroundData);
            setUserInfo(profileData);
        }

        getActivities();
    }, [user._id]);

    const handleChangeName = (e) => {
        setUserInfo({
            ...userInfo,
            name: e.target.value,
        });
    };

    const handleChangeSignature = (e) => {
        setUserInfo({
            ...userInfo,
            signature: e.target.value,
        });
    };

    const handleChangeDate = (e) => {
        setUserInfo({
            ...userInfo,
            date: e.target.value ? format(e.target.value, 'yyyy-MM-dd') : null,
        });
    };

    const handleChangePhone = (e) => {
        setUserInfo({
            ...userInfo,
            phone: e.target.value,
        });
    };

    const handleChangeAddress = (e) => {
        setUserInfo({
            ...userInfo,
            address: e.target.value,
        });
    };

    const handleListGender = () => {
        setActive(!active);
    };

    const handleChangeGender = (e) => {
        setUserInfo({
            ...userInfo,
            gender: e.target.textContent,
        });
        setActive(false);
    };

    const handleSave = async () => {
        // send to server
        try {
            await axios.put(`http://localhost:8080/profile/${user._id}/edit`, userInfo);
        } catch (error) {
            console.log(error);
        }
        console.log(userInfo, user);
        navigate(`/profile/user_id_${user._id}`);
    };

    // show change background
    const handleShowChangeBg = () => {
        setShowChangeBackground(!showChangeBackground);
    };

    // select background
    const handleSelectBg = async (e) => {
        setBackground({
            _id: e.target.id,
            imageUrl: e.target.currentSrc,
        });

        setUserInfo({
            ...userInfo,
            background: e.target.id,
        });
    };

    const handleSubmitBtn = async () => {
        // send to server
        try {
            await axios.put(`http://localhost:8080/profile/${user._id}/${userInfo.background}`, userInfo);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('edit-profile')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <p className={cx('text')}>Complete personal information</p>
                </div>
                <div className={cx('content')}>
                    <div className={cx('user-background')}>
                        <button onClick={handleShowChangeBg}>Change Background</button>
                    </div>
                    <div className={cx('user-info')}>
                        <div className={cx('username')}>
                            <p className={cx('title')}>Name</p>
                            <input
                                type="text"
                                placeholder={userInfo.name || 'Name'}
                                value={userInfo.name || ''}
                                minLength={'8'}
                                maxLength={'20'}
                                onChange={handleChangeName}
                            />
                        </div>
                        <div className={cx('signature')}>
                            <p className={cx('title')}>Signature</p>
                            <input
                                type="text"
                                value={userInfo.signature || ''}
                                placeholder={userInfo.signature || 'Default signature given to everyone~'}
                                onChange={handleChangeSignature}
                            />
                        </div>
                        <div className={cx('gender')}>
                            <p className={cx('title')}>Gender</p>
                            <div className={cx('gender-label')} onClick={handleListGender}>
                                <span className={cx('gender-text')}>{userInfo.gender}</span>
                                {!active ? (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronDown} />
                                ) : (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronUp} />
                                )}
                            </div>

                            {active && (
                                <ul className={cx('list-options')}>
                                    <li className={cx('option')} onClick={handleChangeGender}>
                                        Male
                                    </li>
                                    <li className={cx('option')} onClick={handleChangeGender}>
                                        Female
                                    </li>
                                    <li className={cx('option')} onClick={handleChangeGender}>
                                        Other
                                    </li>
                                    <li className={cx('option')} onClick={handleChangeGender}>
                                        Prefer not to say
                                    </li>
                                </ul>
                            )}
                        </div>
                        {/* date of birth */}
                        <div className={cx('username')}>
                            <p className={cx('title')}>Date</p>
                            <input
                                type="date"
                                value={userInfo.date ? format(userInfo.date, 'yyyy-MM-dd') : ''}
                                onChange={handleChangeDate}
                            />
                        </div>
                        <div className={cx('username')}>
                            <p className={cx('title')}>Phone</p>
                            <input
                                type="number"
                                value={userInfo.phone || ''}
                                placeholder={userInfo.phone || 'Phone number'}
                                onChange={handleChangePhone}
                            />
                        </div>
                        <div className={cx('username')}>
                            <p className={cx('title')}>Address</p>
                            <input
                                type="text"
                                value={userInfo.address || ''}
                                placeholder={userInfo.address || 'Address'}
                                onChange={handleChangeAddress}
                            />
                        </div>
                    </div>
                    <div className={cx('save')}>
                        <button className={cx('save-btn')} onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>

            {/* change background */}
            {showChangeBackground && (
                <div className={cx('change-background')}>
                    <div className={cx('background-wrapper')}>
                        <div className={cx('bg-header')} style={{ backgroundImage: `url(${background.imageUrl})` }}>
                            <div className={cx('float-header')}>
                                <p>Modify background image</p>
                                <button onClick={handleShowChangeBg}>
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className={cx('float-user')}>
                                <div className={cx('avatar')}>
                                    <img src={images.noImage2} alt="avatar" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-bg')}>
                            {listBackground &&
                                listBackground.map((background, index) => (
                                    <BackgroundItem
                                        key={background._id}
                                        id={background._id}
                                        src={background.imageUrl}
                                        alt={'background-' + (index + 1)}
                                        usedBg={userInfo.background === background._id}
                                        clickBg={handleSelectBg}
                                    />
                                ))}
                        </div>
                        <div className={cx('edit-bottom')}>
                            <button className={cx('edit-btn')} onClick={handleSubmitBtn}>
                                Use
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditProfile;
