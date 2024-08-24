import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Rights from '~/pages/Home/Rights';
import Standard from '~/pages/Home/Standard';
import Notice from '~/pages/Home/Notice';
import { CalenderIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('home')}>
            {/*  1 */}
            <div className={cx('sec-1')}>
                <div className={cx('sec-1-wrapper')}>
                    <div className={cx('sec-1-content')}>
                        <strong>Đặt lịch hẹn</strong>
                        <strong>Hiến máu cứu người</strong>
                        <p>
                            Với mỗi lần hiến máu bạn có thể mang lại cơ hội cứu sống 3 người. Hãy cứu lấy mạng người
                            bằng ít máu của mình!
                        </p>
                    </div>
                    <div className={cx('sec-1-search')}>
                        <div className={cx('search-label')}>
                            <div className={cx('search-label-wrapper')}>
                                <p>Bạn cần đặt lịch vào thời gian nào?</p>
                                <div className={cx('search-date')}>
                                    <input className={cx('input-date')} type="text" placeholder="Từ ngày - đến ngày" />
                                    <i className={cx('right-icon')}>
                                        <CalenderIcon />
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className={cx('search-btn')}>
                            <span>Tìm kiếm</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2 */}
            <Rights />

            {/*  3 */}
            <Standard />

            {/* 4 */}
            <Notice />
        </div>
    );
}

export default Home;
