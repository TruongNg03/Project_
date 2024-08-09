import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('profile')}>
            <div className={cx('background')}>
                <div className={cx('background-wrapper')}>
                    <img src={images.backgroundProfile} alt="background" />
                    <div className={cx('mask')}></div>
                </div>
            </div>
            <div className={cx('root-page')}>
                <div className={cx('header-page')}>
                    <div className={cx('avatar')}>
                        <img src={images.noImage} alt="avatar" />
                    </div>
                    <div className={cx('name-title')}>
                        <div className={cx('title')}>
                            <p>Default signature given to everyone~ Default signature given to everyone~</p>
                        </div>
                        <span className={cx('name')}>Name-account</span>
                    </div>
                </div>
                <div className={cx('content-page')}></div>
                <h2>Profile page</h2>
            </div>
        </div>
    );
}

export default Profile;
