import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Event.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import addDays from 'date-fns/addDays';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Activity from '~/components/Activity';
import Alert from '~/components/Alert';
import useFetch from '~/hooks/useFetch';
import { AuthContext } from '~/context/AuthContext';
import { CalenderIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Event() {
    const [active, setActive] = useState(false);
    const [hospital, setHospital] = useState(false);
    const [searchContent, setSearchContent] = useState('Tất cả');
    const [activity, setActivity] = useState({
        idActivity: null,
    });
    const [showNotify, setShowNotify] = useState(false);

    const [showDateRange, setShowDateRange] = useState(false);
    const [stateDate, setStateDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection',
        },
    ]);

    const hospitalRef = useRef(null);

    const { user } = useContext(AuthContext);

    // fetch api
    const { data, loading, error } = useFetch(
        `http://localhost:8080/me/stored/activities?hospital=${encodeURIComponent(searchContent)}`,
    );

    useEffect(() => {
        async function getHospitals() {
            const hos = await fetch('http://localhost:8080/me/stored/hospitals');
            const hosData = await hos.json();

            setHospital(hosData);
        }

        getHospitals();
    }, []);

    // hide when click outside search
    useEffect(() => {
        window.onclick = (event) => {
            if (event.target !== hospitalRef.current) {
                setActive(false);
            }
        };
    }, []);

    const handleListOption = () => {
        setActive(!active);
    };

    const handleOptionClick = (e) => {
        setSearchContent(e.target.textContent);
        setActive(false);
    };

    const handleShowDate = (e) => {
        setShowDateRange(!showDateRange);
    };

    // not find by date
    const handleSearchDate = () => {
        setShowDateRange(false);
    };

    const submitActivity = async (e) => {
        setActivity({
            idActivity: e.target.id,
        });

        setShowNotify(true);

        // send to server (trễ 1 click) => error
        // try {
        //     await axios.put(`http://localhost:8080/profile/${user._id}/${activity.idActivity}`, activity);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    // onClick in alert comp
    const onCloseBtn = () => {
        setShowNotify(false);
    };

    const onCancelBtn = () => {
        setShowNotify(false);
    };

    const onDefBtn = async () => {
        // send to server (done)
        try {
            await axios.put(`http://localhost:8080/profile/${user._id}/${activity.idActivity}`, activity);
        } catch (error) {
            console.log(error);
        }

        setShowNotify(false);
    };

    // useEffect(() => {
    //     async function addActivity() {
    //         console.log(activity.idActivity);

    //         try {
    //             await axios.put(`http://localhost:8080/profile/${user._id}/${activity.idActivity}`, activity);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     addActivity();
    // }, []);

    return (
        <div className={cx('event')}>
            <div className={cx('wrapper')}>
                <div className={cx('search-activity')}>
                    <p className={cx('title-search')}>Bạn cần đặt lịch vào thời gian nào?</p>
                    {/* search date */}
                    <div className={cx('search-date')}>
                        <div className={cx('wrapper-date')}>
                            <div className={cx('date')} onClick={handleShowDate}>
                                <div className={cx('input-date')}>
                                    <p className={cx('placeholder-date')}>
                                        {format(stateDate[0].startDate, 'dd/MM/yyyy') +
                                            ' - ' +
                                            format(stateDate[0].endDate, 'dd/MM/yyyy')}
                                    </p>
                                </div>
                                <i className={cx('right-icon')}>
                                    <CalenderIcon />
                                </i>
                            </div>
                            {showDateRange && (
                                <DateRange
                                    className={cx('date-range')}
                                    onChange={(item) => setStateDate([item.selection])}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={stateDate}
                                    direction="horizontal"
                                    preventSnapRefocus={true}
                                    calendarFocus="backwards"
                                />
                            )}
                        </div>
                        <button className={cx('search-btn')} onClick={handleSearchDate}>
                            Tìm kiếm
                        </button>
                    </div>
                    <div className={cx('search-organize')}>
                        <p>Đơn vị tổ chức:</p>
                        <div className={cx('select-menu')}>
                            <div ref={hospitalRef} className={cx('select-btn')} onClick={handleListOption}>
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
                        {data.map((activity) =>
                            activity.amount < activity.max && user ? (
                                <Activity
                                    key={activity._id}
                                    activity={activity}
                                    button="Đặt lịch"
                                    id={activity._id}
                                    primary
                                    onClick={submitActivity}
                                />
                            ) : (
                                <Activity key={activity._id} activity={activity} button="Đặt lịch" disable />
                            ),
                        )}
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
            {showNotify && (
                <div className={cx('fixed-alert')} tabIndex="-1">
                    <Alert
                        header="Đăng ký hoạt động?"
                        content="Bạn chắc chắn muốn đăng ký hoạt động này?"
                        contentBtn="Đặt lịch"
                        onCloseBtn={onCloseBtn}
                        onCancelBtn={onCancelBtn}
                        onDefBtn={onDefBtn}
                    />
                </div>
            )}
        </div>
    );
}

export default Event;
