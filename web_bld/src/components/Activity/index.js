import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Activity.module.scss';
import { HumanIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Activity({ activity, button, primary, alert }) {
    return (
        <div className={cx('activity')}>
            <div className={cx('content')}>
                <strong>{activity.title}</strong>
                <ul>
                    <li>Địa chỉ: {activity.locate}</li>
                    <li>Thời gian hoạt động: {activity.timeActive}</li>
                    <li>Thời gian hiến máu: {activity.timeStart}</li>
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
                <button>{button}</button>
            </div>
        </div>
    );
}

Activity.propTypes = {
    activity: PropTypes.object.isRequired,
    button: PropTypes.string.isRequired,
};

export default Activity;
