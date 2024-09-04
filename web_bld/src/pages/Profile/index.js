import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { format } from 'date-fns';
import Item from '~/pages/Profile/Item';
import Activity from '~/components/Activity';
import Alert from '~/components/Alert';
import { AuthContext } from '~/context/AuthContext';
import config from '~/config';

const cx = classNames.bind(styles);

function Profile() {
    const [fixedHeader, setFixedHeader] = useState(false);
    const [fixedContact, setFixedContact] = useState(false);
    const [activityResult, setActivityResult] = useState(null);
    const [profileResult, setProfileResult] = useState(null);
    const [background, setBackground] = useState(null);
    const [showNotify, setShowNotify] = useState(false);

    const { user } = useContext(AuthContext);

    // fetch api
    useEffect(() => {
        async function getActivities() {
            // get profile
            const profile = await fetch(`http://localhost:8080/profile/${user._id}`);
            const profileData = await profile.json();

            if (profileData.idActivity) {
                const activity = await fetch(`http://localhost:8080/me/stored/activities?id=${profileData.idActivity}`);
                const activityData = await activity.json();

                setActivityResult(activityData);
            }

            if (profileData.background) {
                const userBackground = await fetch(`http://localhost:8080/backgrounds?id=${profileData.background}`);
                const userBackgroundData = await userBackground.json();

                setBackground(userBackgroundData.imageUrl);
            }

            setProfileResult(profileData);
        }

        getActivities();
    }, [user._id]);

    const headerPage = cx({
        header_page: true,
        header_page_fixed: fixedHeader,
    });

    const avatar = cx({
        avatar: true,
        avatar_fixed: fixedHeader,
    });

    const contentPage = cx({
        content_page: true,
        content_page_fixed: fixedHeader,
    });

    const edit = cx({
        edit: true,
        edit_fixed: fixedHeader,
    });

    const contact = cx({
        contact: true,
        contact_fixed: fixedContact,
    });

    const handleChange = () => {
        if (window.scrollY >= 300) {
            setFixedHeader(true);
        } else {
            setFixedHeader(false);
        }

        if (window.scrollY >= 850 && window.innerWidth > 700) {
            setFixedContact(true);
        } else {
            setFixedContact(false);
        }
    };

    const handleCancelActivity = () => {
        setShowNotify(true);
    };

    // onClick in alert comp
    const onCloseBtn = () => {
        setShowNotify(false);
    };

    const onCancelBtn = () => {
        setShowNotify(false);
    };

    const onDefBtn = async () => {
        // send to server
        try {
            await axios.put(`http://localhost:8080/profile/${user._id}/${profileResult.idActivity}`, {
                idActivity: null,
            });
        } catch (error) {
            console.log(error);
        }

        setShowNotify(false);
        window.location.reload(false);
    };

    window.addEventListener('scroll', handleChange);

    return (
        <div className={cx('profile')}>
            {/* background pf page */}
            <div className={cx('background')}>
                <div className={cx('background-wrapper')}>
                    <img src={background ? background : images.backgroundProfile} alt="background" />
                    <div className={cx('mask')}></div>
                </div>
            </div>

            {/* header pf page */}
            <div className={cx('root-page')}>
                <div className={headerPage}>
                    <div className={cx('wrapper-header')}>
                        <div className={avatar}>
                            <img src={images.noImage} alt="avatar" />
                        </div>
                        <div className={cx('name-title')}>
                            <div className={cx('title')}>
                                {profileResult ? (
                                    <span className={cx('name')}>{profileResult.name || user.username}</span>
                                ) : (
                                    <span className={cx('name')}>{user.username}</span>
                                )}
                                <p>{user.title || 'Default signature given to everyone~'}</p>
                            </div>
                        </div>
                        <Link className={edit} to={config.routes.editProfile}>
                            <button className={cx('edit-btn')}>Edit</button>
                        </Link>
                    </div>
                </div>

                {/* content pf page */}
                <div className={contentPage}>
                    <div className={cx('wrapper-content')}>
                        <div className={cx('user-activity')}>
                            <div className={cx('explore')}>
                                <section className={cx('explore-around')}>
                                    <strong>Explore Around</strong>
                                </section>
                                <div className={cx('list')}>
                                    <Item header="View Notice" content="All the guides you need in one spot!" />
                                    <Item header="View Notice" content="All the guides you need in one spot!" />
                                    <Item header="View Notice" content="All the guides you need in one spot!" />
                                    <Item header="View Notice" content="All the guides you need in one spot!" />
                                    <Item header="View Notice" content="All the guides you need in one spot!" />
                                </div>
                            </div>

                            <div className={cx('activities')}>
                                {/* same class with explore-around */}
                                <section className={cx('explore-around')}>
                                    <strong>Activities</strong>
                                </section>
                                {!activityResult ? (
                                    <div className={cx('no-activity')}>
                                        <img src={images.noActivity} alt="no-activity-img" />
                                        <p>You don't have anything~</p>
                                    </div>
                                ) : (
                                    <div className={cx('list-activity')}>
                                        {/* <Activity
                                            title="Hiến máu - Bệnh viện Truyền máu Huyết học"
                                            locate="Địa chỉ: 151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội"
                                            timeActive="Thời gian hoạt động: 11/08/2024 - Từ 07:00 đến 16:30"
                                            timeStart="Thời gian hiến máu: 07:00 - 11:30; 13:30 - 16:00"
                                            amount="40"
                                            max="50"
                                        />*/}
                                        {activityResult ? (
                                            <Activity
                                                key={activityResult._id}
                                                activity={activityResult}
                                                button="Cancel"
                                                alert
                                                onClick={handleCancelActivity}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* user info */}
                        <div className={cx('user-info')}>
                            <div className={cx('profile-user')}>
                                <strong>Profile Information</strong>
                                <span>
                                    <p>Account ID: {user._id}</p>
                                </span>
                            </div>
                            {profileResult ? (
                                <div className={cx('profile-info')}>
                                    <span className={cx('web-name')}>
                                        <img src={images.noImage2} alt="logo-web" />
                                        <strong>Web ...</strong>
                                    </span>
                                    <strong className={cx('name')}>{profileResult.name || user.username}</strong>
                                    <div className={cx('label')}>
                                        <p>Date</p>
                                        <strong>
                                            {profileResult.date
                                                ? format(profileResult.date, 'dd-MM-yyyy')
                                                : '--/--/----'}
                                        </strong>
                                    </div>
                                    <div className={cx('label')}>
                                        <p>Gender</p>
                                        <strong>{profileResult.gender || 'Prefer not to say'}</strong>
                                    </div>
                                    <div className={cx('label')}>
                                        <p>Email</p>
                                        <strong>{user.username}</strong>
                                    </div>
                                    <div className={cx('label')}>
                                        <p>Identity</p>
                                        <strong>{user.identity}</strong>
                                    </div>
                                    <div className={cx('label')}>
                                        <p>Phone</p>
                                        <strong>{profileResult.phone || ''}</strong>
                                    </div>
                                    <div className={cx('label')}>
                                        <p>Address</p>
                                        <strong>{profileResult.address || ''}</strong>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className={contact}>
                                <strong>Contact</strong>
                                <span>
                                    <p>Web...</p>
                                    <p>admin_1312@gmail.com</p>
                                </span>
                                <p>Copyright © 2024 - Version 1.0.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showNotify && (
                <div className={cx('fixed-alert')} tabIndex="-1">
                    <Alert
                        header="Xóa hoạt động?"
                        content="Bạn chắc chắn muốn xóa hoạt động này?"
                        contentBtn="Xóa"
                        danger
                        onCloseBtn={onCloseBtn}
                        onCancelBtn={onCancelBtn}
                        onDefBtn={onDefBtn}
                    />
                </div>
            )}
        </div>
    );
}

export default Profile;
