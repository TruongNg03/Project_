import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Activity.module.scss';
import { HumanIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Activity({ title, locate, timeActive, timeStart, amount, max }) {
    return (
        <div className={cx('activity')}>
            <div className={cx('content')}>
                <strong>{title}</strong>
                <ul>
                    <li>{locate}</li>
                    <li>{timeActive}</li>
                    <li>{timeStart}</li>
                </ul>
            </div>
            <div className={cx('cancel')}>
                <span className={cx('title')}>
                    <HumanIcon />
                    <p>Số lượng đăng ký</p>
                </span>
                <span className={cx('amount')}>
                    <strong>
                        {amount}/{max}
                    </strong>
                    <p>Người</p>
                </span>
                <button>Cancel</button>
            </div>
        </div>
    );
}

Activity.propTypes = {
    title: PropTypes.string,
    locate: PropTypes.string,
    timeActive: PropTypes.string,
    timeStart: PropTypes.string,
    amount: PropTypes.string,
    max: PropTypes.string,
};

export default Activity;
