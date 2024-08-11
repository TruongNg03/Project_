import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import images from '~/assets/images';
import Item from '~/pages/Profile/Item';
import Activity from '~/pages/Profile/Activity';

const cx = classNames.bind(styles);

function Profile() {
    const [fixedHeader, setFixedHeader] = useState(false);
    const [fixedContact, setFixedContact] = useState(false);
    const [showActivity, setShowAvtivity] = useState(true);

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

        if (window.scrollY >= 775 && window.innerWidth > 700) {
            setFixedContact(true);
        } else {
            setFixedContact(false);
        }
    };

    window.addEventListener('scroll', handleChange);

    return (
        <div className={cx('profile')}>
            {/* background pf page */}
            <div className={cx('background')}>
                <div className={cx('background-wrapper')}>
                    <img src={images.backgroundProfile} alt="background" />
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
                                <p>Default signature given to everyone~</p>
                            </div>
                            <span className={cx('name')}>Truong Ng</span>
                        </div>
                        <div className={edit}>
                            <button className={cx('edit-btn')}>Edit</button>
                        </div>
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
                                {!showActivity ? (
                                    <div className={cx('no-activity')}>
                                        <img src={images.noActivity} alt="no-activity-img" />
                                        <p>You don't have anything~</p>
                                    </div>
                                ) : (
                                    <div className={cx('list-activity')}>
                                        <Activity
                                            title="Hiến máu - Bệnh viện Truyền máu Huyết học"
                                            locate="Địa chỉ: 151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội"
                                            timeActive="Thời gian hoạt động: 11/08/2024 - Từ 07:00 đến 16:30"
                                            timeStart="Thời gian hiến máu: 07:00 - 11:30; 13:30 - 16:00"
                                            amount="40"
                                            max="50"
                                        />
                                        <Activity
                                            title="Hiến máu - Bệnh viện Truyền máu Huyết học"
                                            locate="Địa chỉ: 151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội"
                                            timeActive="Thời gian hoạt động: 11/08/2024 - Từ 07:00 đến 16:30"
                                            timeStart="Thời gian hiến máu: 07:00 - 11:30; 13:30 - 16:00"
                                            amount="40"
                                            max="50"
                                        />
                                        <Activity
                                            title="Hiến máu - Bệnh viện Truyền máu Huyết học"
                                            locate="Địa chỉ: 151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội"
                                            timeActive="Thời gian hoạt động: 11/08/2024 - Từ 07:00 đến 16:30"
                                            timeStart="Thời gian hiến máu: 07:00 - 11:30; 13:30 - 16:00"
                                            amount="40"
                                            max="50"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* user info */}
                        <div className={cx('user-info')}>
                            <div className={cx('profile-user')}>
                                <strong>Profile Information</strong>
                                <span>
                                    <p>Account ID: 1234567890</p>
                                </span>
                            </div>
                            <div className={cx('profile-info')}>
                                <span className={cx('web-name')}>
                                    <img src={images.noImage2} alt="logo-web" />
                                    <strong>Web ...</strong>
                                </span>
                                <strong className={cx('name')}>Truong Ng</strong>
                                <div className={cx('label')}>
                                    <p>Date</p>
                                    <strong>13/12/2003</strong>
                                </div>
                                <div className={cx('label')}>
                                    <p>Gender</p>
                                    <strong>Male</strong>
                                </div>
                                <div className={cx('label')}>
                                    <p>Email</p>
                                    <strong>test_1312@gmail.com</strong>
                                </div>
                                <div className={cx('label')}>
                                    <p>Phone</p>
                                    <strong>0123456789</strong>
                                </div>
                                <div className={cx('label')}>
                                    <p>Address</p>
                                    <strong>Ninh Giang, Hai Duong</strong>
                                </div>
                            </div>
                            <div className={contact}>
                                <strong>Contact</strong>
                                <span>
                                    <p>Web...</p>
                                    <p>test_1312@gmail.com</p>
                                </span>
                                <p>Copyright © 2024 - Version 1.0.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
