import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Activity.module.scss';
import { HumanIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Activity({
    activity,
    button,
    primary = false,
    alert = false,
    disable = false,
    className,
    onClick,
    passProps,
}) {
    const classes = cx('btn', {
        [className]: className,
        primary,
        alert,
        disable,
    });

    const props = {
        onClick,
        ...passProps,
    };

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <div className={cx('activity')}>
            <div className={cx('content')}>
                <strong>{activity.title}</strong>
                <ul>
                    <li>
                        <p className={cx('header-inner')}>Địa chỉ:</p>
                        <p className={cx('content-inner')}>{activity.locate}</p>
                    </li>
                    <li>
                        <p className={cx('header-inner')}>Thời gian hoạt động:</p>
                        <p className={cx('content-inner')}>{activity.timeActive}</p>
                    </li>
                    <li>
                        <p className={cx('header-inner')}>Thời gian hiến máu:</p>
                        <p className={cx('content-inner')}>{activity.timeStart}</p>
                    </li>
                </ul>
            </div>
            <div className={cx('user-register')}>
                <div className={cx('wrapper-info')}>
                    <span className={cx('title')}>
                        <HumanIcon />
                        <p>Số lượng đăng ký</p>
                    </span>
                    <span className={cx('amount')}>
                        <strong>
                            {activity.amount}/{activity.max}
                        </strong>
                        <p>Người</p>
                    </span>
                </div>
                <button className={classes}>{button}</button>
            </div>
        </div>
    );
}

Activity.propTypes = {
    activity: PropTypes.object.isRequired,
    button: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    alert: PropTypes.bool,
    disable: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Activity;
