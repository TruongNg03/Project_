import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Activity.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import useFetch from '~/hooks/useFetch';
import Alert from '~/components/Alert';

const cx = classNames.bind(styles);

function Activity() {
    const [showForm, setShowForm] = useState(false);
    const [showListActivity, setShowListActivity] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [showListHospital, setShowListHospital] = useState(false);
    const [showNotify, setShowNotify] = useState(false);

    const [showListEditHospital, setShowListEditHospital] = useState(false);
    const [idActivity, setIdActivity] = useState();
    const [oneActivity, setOneActivity] = useState();
    const [createActivity, setCreateActivity] = useState();
    const [hospital, setHospital] = useState();
    const [hospitalContent, setHospitalContent] = useState('');

    // fetch api
    const { data, loading, error } = useFetch(`http://localhost:8080/me/stored/activities`);

    useEffect(() => {
        async function getHospitals() {
            const hos = await fetch('http://localhost:8080/me/stored/hospitals');
            const hosData = await hos.json();

            setHospital(hosData);
        }

        getHospitals();
    }, []);

    const handlePostForm = () => {
        setShowForm(!showForm);
    };

    // add activity
    const handleAddTitle = (e) => {
        setCreateActivity({
            ...createActivity,
            title: e.target.value,
        });
    };

    // change ...
    const handleListHospital = () => {
        setShowListHospital(!showListHospital);
    };
    const handleOptionClick = (e) => {
        setShowListHospital(false);
        setHospitalContent(e.target.textContent);

        setCreateActivity({
            ...createActivity,
            hospital: e.target.textContent,
        });
    };

    const handleAddLocate = (e) => {
        setCreateActivity({
            ...createActivity,
            locate: e.target.value,
        });
    };

    const handleAddTimeActive = (e) => {
        setCreateActivity({
            ...createActivity,
            timeActive: e.target.value,
        });
    };

    const handleAddTimeStart = (e) => {
        setCreateActivity({
            ...createActivity,
            timeStart: e.target.value,
        });
    };

    const handleAddAmount = (e) => {
        setCreateActivity({
            ...createActivity,
            amount: e.target.value,
        });
    };

    const handleAddMax = (e) => {
        setCreateActivity({
            ...createActivity,
            max: e.target.value,
        });
    };

    const handleCreateActivity = async () => {
        // send to server
        try {
            await axios.post(`http://localhost:8080/activities/create`, createActivity);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowListActivity = () => {
        setShowListActivity(!showListActivity);
    };

    // edit form
    const handleEditActivity = async (e) => {
        try {
            const hos = await fetch(`http://localhost:8080/me/stored/activities?id=${e.target.id}`);
            const hosData = await hos.json();

            setOneActivity(hosData);
        } catch (err) {
            console.log(err);
        }

        setIdActivity(e.target.id);
        setShowEdit(!showEdit);
    };

    const handleChangeTitle = (e) => {
        setOneActivity({
            ...oneActivity,
            title: e.target.value,
        });
    };

    const handleEditListHospital = () => {
        setShowListEditHospital(!showListEditHospital);
    };

    const handleChangeHospital = (e) => {
        setOneActivity({
            ...oneActivity,
            hospital: e.target.textContent,
        });

        setShowListEditHospital(false);
    };

    const handleChangeLocate = (e) => {
        setOneActivity({
            ...oneActivity,
            locate: e.target.value,
        });
    };

    const handleChangeTimeActive = (e) => {
        setOneActivity({
            ...oneActivity,
            timeActive: e.target.value,
        });
    };

    const handleChangeTimeStart = (e) => {
        setOneActivity({
            ...oneActivity,
            timeStart: e.target.value,
        });
    };

    const handleChangeAmount = (e) => {
        setOneActivity({
            ...oneActivity,
            amount: e.target.value,
        });
    };

    const handleChangeMax = (e) => {
        setOneActivity({
            ...oneActivity,
            max: e.target.value,
        });
    };

    const cancelBtn = () => {
        setShowEdit(false);
    };

    const submitBtn = async () => {
        // send to server
        try {
            await axios.put(`http://localhost:8080/activities/${idActivity}`, oneActivity);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    // show delete form
    const handleDeleteActivity = (e) => {
        setIdActivity(e.target.id);
        setShowNotify(true);
    };

    const onCloseBtn = () => {
        setShowNotify(false);
    };

    const onCancelBtn = () => {
        setShowNotify(false);
    };

    // delete btn
    const onDefBtn = async () => {
        //
        try {
            await axios.delete(`http://localhost:8080/activities/${idActivity}`);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('activity')}>
            <div className={cx('post-activity')}>
                <div className={cx('post-activity-title')}>
                    <p onClick={handlePostForm}>Post Activity</p>
                </div>
                {showForm && (
                    <div className={cx('post-activity-form')}>
                        <input
                            type="text"
                            className={cx('form-control')}
                            placeholder="Title"
                            onChange={handleAddTitle}
                        />
                        {/* change ... */}
                        <div className={cx('list-hospitals')}>
                            <div className={cx('hospital-label')} onClick={handleListHospital}>
                                {hospitalContent ? (
                                    <span className={cx('hospital-text')}>{hospitalContent}</span>
                                ) : (
                                    <span className={cx('hospital-placeholder')}>Hospital</span>
                                )}
                                {!showListHospital ? (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronDown} />
                                ) : (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronUp} />
                                )}
                            </div>

                            {showListHospital && (
                                <ul className={cx('list-options')}>
                                    {hospital.map((hospital) => (
                                        <li className={cx('option')} key={hospital._id} onClick={handleOptionClick}>
                                            {hospital.name}
                                        </li>
                                    ))}

                                    {/* if error => use this */}
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
                        <input
                            type="text"
                            className={cx('form-control')}
                            placeholder="Locate"
                            onChange={handleAddLocate}
                        />
                        <input
                            type="text"
                            className={cx('form-control')}
                            placeholder="Time Active"
                            onChange={handleAddTimeActive}
                        />
                        <input
                            type="text"
                            className={cx('form-control')}
                            placeholder="Time Start"
                            onChange={handleAddTimeStart}
                        />
                        <input
                            type="number"
                            className={cx('form-control')}
                            placeholder="Amount"
                            onChange={handleAddAmount}
                        />
                        <input type="number" className={cx('form-control')} placeholder="Max" onChange={handleAddMax} />

                        <button type="submit" className={cx('submit-btn')} onClick={handleCreateActivity}>
                            Post
                        </button>
                    </div>
                )}
            </div>

            {/* list activities */}
            {/* same css with post activity & title */}
            <div className={cx('list-activities')}>
                <div className={cx('list-title')}>
                    <p onClick={handleShowListActivity}>All Activities</p>
                </div>
                {showListActivity && (
                    <div className={cx('list')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Hospital</th>
                                    <th scope="col">Locate</th>
                                    <th scope="col">Time Active</th>
                                    <th scope="col">Time Start</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Max</th>
                                    <th scope="col">Create At</th>
                                    <th scope="col">Update At</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? (
                                    data.map((activity, count) => (
                                        <tr key={activity._id}>
                                            <th scope="row">{count + 1}</th>
                                            <td>{activity.title}</td>
                                            <td>{activity.hospital}</td>
                                            <td>{activity.locate}</td>
                                            <td>{activity.timeStart}</td>
                                            <td>{activity.timeActive}</td>
                                            {/* Total column (act.amount) */}
                                            <td>{activity.amount}</td>
                                            <td>{activity.max}</td>
                                            <td>{activity.createdAt}</td>
                                            <td>{activity.updatedAt}</td>
                                            <td>
                                                <div className={cx('all-btn-link')}>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={activity._id}
                                                        onClick={handleEditActivity}
                                                    >
                                                        Sửa
                                                    </p>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={activity._id}
                                                        onClick={handleDeleteActivity}
                                                    >
                                                        Xóa
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <td
                                        colSpan={11}
                                        style={{ paddingTop: '10px', borderStyle: 'none', textAlign: 'center' }}
                                    >
                                        You don't have any activities
                                    </td>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* edit form */}
            {showEdit && (
                <div className={cx('edit-form')}>
                    <div className={cx('edit-activity')}>
                        <input
                            type="text"
                            value={oneActivity.title}
                            className={cx('form-control')}
                            placeholder="Title"
                            onChange={handleChangeTitle}
                        />
                        <div className={cx('list-hospitals')}>
                            <div className={cx('hospital-label')} onClick={handleEditListHospital}>
                                {oneActivity.hospital ? (
                                    <span className={cx('hospital-text')}>{oneActivity.hospital}</span>
                                ) : (
                                    <span className={cx('hospital-placeholder')}>Hospital</span>
                                )}
                                {!showListHospital ? (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronDown} />
                                ) : (
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronUp} />
                                )}
                            </div>

                            {showListEditHospital && (
                                <ul className={cx('list-options')}>
                                    {hospital.map((hospital) => (
                                        <li className={cx('option')} key={hospital._id} onClick={handleChangeHospital}>
                                            {hospital.name}
                                        </li>
                                    ))}

                                    {/* if error => use this */}
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
                        <input
                            type="text"
                            value={oneActivity.locate}
                            className={cx('form-control')}
                            placeholder="Locate"
                            onChange={handleChangeLocate}
                        />
                        <input
                            type="text"
                            value={oneActivity.timeActive}
                            className={cx('form-control')}
                            placeholder="Time Active"
                            onChange={handleChangeTimeActive}
                        />
                        <input
                            type="text"
                            value={oneActivity.timeStart}
                            className={cx('form-control')}
                            placeholder="Time Start"
                            onChange={handleChangeTimeStart}
                        />
                        <input
                            type="number"
                            value={oneActivity.amount}
                            className={cx('form-control')}
                            placeholder="Total"
                            onChange={handleChangeAmount}
                        />
                        <input
                            type="number"
                            value={oneActivity.max}
                            className={cx('form-control')}
                            placeholder="Max"
                            onChange={handleChangeMax}
                        />

                        <div className={cx('wrapper-btn')}>
                            <button className={cx('submit-btn-edit-form')} onClick={cancelBtn}>
                                Cancel
                            </button>
                            <button className={cx('submit-btn-edit-form')} onClick={submitBtn}>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* alert */}
            {showNotify && (
                <div className={cx('fixed-alert')} tabIndex="-1">
                    <Alert
                        header="Xóa hoạt động?"
                        content="Bạn chắc chắn muốn Xóa hoạt động này?"
                        contentBtn="Xóa"
                        danger
                        onCloseBtn={onCloseBtn}
                        onCancelBtn={onCancelBtn}
                        onDefBtn={onDefBtn}
                    />
                </div>
            )}
        </div>
    );
}

export default Activity;
