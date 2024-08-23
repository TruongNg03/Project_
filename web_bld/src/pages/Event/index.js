import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Event.module.scss';
import Activity from '~/components/Activity';
import useFetch from '~/hooks/useFetch';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function Event() {
    const { user } = useContext(AuthContext);

    const { data, loading, error } = useFetch('http://localhost:8080/me/stored/activities');

    return (
        <div className={cx('event')}>
            <div className={cx('wrapper')}>
                <div className={cx('search-activity')}>
                    <p className={cx('title-search')}>Bạn cần đặt lịch vào thời gian nào?</p>
                    {/*  */}
                    <div className={cx('search-date')}>
                        <div className={cx('date')}></div>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className={cx('search-organize')}>
                        <p>Đơn vị tổ chức:</p>
                        <div className={cx('search-label')}>Search label</div>
                    </div>
                </div>
                <div className={cx('activities-result')}>
                    <p className={cx('number-result')}>4 Kết quả</p>
                    <div className={cx('result')}>
                        {/* <Activity
                            title="Hiến máu - Bệnh viện Truyền máu Huyết học"
                            locate="Địa chỉ: 151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội"
                            timeActive="Thời gian hoạt động: 11/08/2024 - Từ 07:00 đến 16:30"
                            timeStart="Thời gian hiến máu: 07:00 - 11:30; 13:30 - 16:00"
                            amount="40"
                            max="50"
                        /> */}
                        {data ? (
                            data.map((activity) => (
                                <Activity key={activity._id} activity={activity} button="Đặt lịch" />
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;
