import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('profile')}>
            <div className={cx('background')}>
                <img
                    src="https://upload-os-bbs.hoyolab.com/upload/2024/07/10/d356b32652305021ed6d993b1b7c7bbc_8711775890916097958.jpg?x-oss-process=image/auto-orient,0/interlace,1/format,webp/quality,q_70"
                    alt="img"
                />
                <div className={cx('mask')}></div>
            </div>
            <div className={cx('root-page')}>
                <h2>Profile page</h2>
            </div>
        </div>
    );
}

export default Profile;
