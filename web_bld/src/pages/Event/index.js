import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Event.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Activity from '~/components/Activity';
import useFetch from '~/hooks/useFetch';
import { AuthContext } from '~/context/AuthContext';
import { CalenderIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Event() {
    const [active, setActive] = useState(false);
    const [numberActive, setNumberActive] = useState(false);
    const [hospital, setHospital] = useState(false);
    const [searchContent, setSearchContent] = useState('Tất cả');

    const { user } = useContext(AuthContext);

    // fetch api
    const { data, loading, error } = useFetch(`http://localhost:8080/me/stored/activities?hospital=${searchContent}`);

    useEffect(() => {
        async function getActivities() {
            const hos = await fetch('http://localhost:8080/me/stored/hospitals');
            const hosData = await hos.json();

            if (hosData.length === 0) {
                setHospital(null);
            } else {
                setHospital(hosData);
            }
        }

        getActivities();
    }, []);

    const handleListOption = () => {
        setActive(!active);
    };

    const handleOptionClick = (e) => {
        setSearchContent(e.target.textContent);
        setActive(false);
    };

    return (
        <div className={cx('event')}>
            <div className={cx('wrapper')}>
                <div className={cx('search-activity')}>
                    <p className={cx('title-search')}>Bạn cần đặt lịch vào thời gian nào?</p>
                    {/*  */}
                    <div className={cx('search-date')}>
                        <div className={cx('date')}>
                            <input className={cx('input-date')} type="text" placeholder="Từ ngày - đến ngày" />
                            <i className={cx('right-icon')}>
                                <CalenderIcon />
                            </i>
                        </div>
                        <button className={cx('search-btn')} disabled={false}>
                            Tìm kiếm
                        </button>
                    </div>
                    <div className={cx('search-organize')}>
                        <p>Đơn vị tổ chức:</p>
                        <div className={cx('select-menu')}>
                            <div className={cx('select-btn')} onClick={handleListOption}>
                                <span className={cx('search-text')}>{searchContent}</span>
                                {!active ? (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronDown} />
                                ) : (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronUp} />
                                )}
                            </div>

                            {active && (
                                <ul className={cx('list-option')}>
                                    <li className={cx('option')} onClick={handleOptionClick}>
                                        Tất cả
                                    </li>
                                    {hospital.map((hospital) => (
                                        <li className={cx('option')} key={hospital._id} onClick={handleOptionClick}>
                                            {hospital.name}
                                        </li>
                                    ))}

                                    {/* if 'hospital.map' error */}
                                    {/* {hospital ? (
                                        hospital.map((hospital) => (
                                            <li className={cx('option')} key={hospital._id} onClick={handleOptionClick}>
                                                {hospital.name}
                                            </li>
                                        ))
                                    ) : (
                                        <></>
                                    )} */}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('activities-result')}>
                    <p className={cx('number-result')}>{data.length} Kết quả</p>
                    <div className={cx('result')}>
                        {/* <Activity
                            title="Hiến máu - Bệnh viện Truyền máu Huyết học"
                            locate="Địa chỉ: 151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội"
                            timeActive="Thời gian hoạt động: 11/08/2024 - Từ 07:00 đến 16:30"
                            timeStart="Thời gian hiến máu: 07:00 - 11:30; 13:30 - 16:00"
                            amount="40"
                            max="50"
                        /> */}
                        {data.map((activity) => (
                            <Activity key={activity._id} activity={activity} button="Đặt lịch" primary />
                        ))}
                        {/* {data ? (
                            data.map((activity) => (
                                <Activity key={activity._id} activity={activity} button="Đặt lịch" primary />
                            ))
                        ) : (
                            <></>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Event;
