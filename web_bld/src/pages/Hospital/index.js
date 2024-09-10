import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Hospital.module.scss';
import Alert from '~/components/Alert';

const cx = classNames.bind(styles);

function UserProfile() {
    const [showListHospitals, setShowListHospitals] = useState(true);
    const [showFormHospital, setShowFormHospital] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [allHospitals, setAllHospitals] = useState();
    const [hospitalId, setHospitalId] = useState();
    const [newHospital, setNewHospital] = useState();
    const [oneHospital, setOneHospital] = useState();

    // fetch api
    useEffect(() => {
        async function getHospitals() {
            const hospitals = await fetch('http://localhost:8080/me/stored/hospitals');
            const listHospitals = await hospitals.json();
            setAllHospitals(listHospitals);
        }

        getHospitals();
    }, []);

    const handlePostFormHospital = () => {
        setShowFormHospital(!showFormHospital);
    };

    const handleAddName = (e) => {
        setNewHospital({
            ...newHospital,
            name: e.target.value,
        });
    };

    const handleAddAddress = (e) => {
        setNewHospital({
            ...newHospital,
            address: e.target.value,
        });
    };

    const handleCreateHospital = async () => {
        // send to server
        try {
            await axios.post(`http://localhost:8080/hospital/stored`, newHospital);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowListHospitals = () => {
        setShowListHospitals(!showListHospitals);
    };

    // edit btn
    const handleEditHospital = async (e) => {
        try {
            const hos = await fetch(`http://localhost:8080/hospital/${e.target.id}`);
            const hosData = await hos.json();

            setOneHospital(hosData);
            setOneHospital(hosData);
        } catch (err) {
            console.log(err);
        }

        setShowEdit(true);
        setHospitalId(e.target.id);
    };

    const handleChangeName = (e) => {
        setOneHospital({
            ...oneHospital,
            name: e.target.value,
        });
    };

    const handleChangeAddress = (e) => {
        setOneHospital({
            ...oneHospital,
            address: e.target.value,
        });
    };

    const cancelBtn = () => {
        setShowEdit(false);
    };

    // edit btn
    const submitBtn = async () => {
        // send to server
        try {
            await axios.put(`http://localhost:8080/hospital/${hospitalId}/edit`, oneHospital);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    // delete btn
    const handleDeleteHospital = (e) => {
        setShowNotify(true);
        setHospitalId(e.target.id);
    };

    // delete alert
    const onCloseBtn = () => {
        setShowNotify(false);
    };

    const onCancelBtn = () => {
        setShowNotify(false);
    };

    // delete btn
    const onDefBtn = async () => {
        try {
            await axios.delete(`http://localhost:8080/hospital/${hospitalId}/delete`);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('hospital')}>
            <div className={cx('post-hospital')}>
                <div className={cx('post-hospital-title')}>
                    <p onClick={handlePostFormHospital}>Add Hospital</p>
                </div>
                {showFormHospital && (
                    <div className={cx('post-hospital-form')}>
                        <input type="text" className={cx('form-control')} placeholder="Name" onChange={handleAddName} />
                        <input
                            type="text"
                            className={cx('form-control')}
                            placeholder="Address"
                            onChange={handleAddAddress}
                        />

                        <button type="submit" className={cx('submit-btn')} onClick={handleCreateHospital}>
                            Post
                        </button>
                    </div>
                )}
            </div>

            <div className={cx('list-hospitals')}>
                <div className={cx('list-title')}>
                    <p onClick={handleShowListHospitals}>All Hospitals</p>
                </div>
                {showListHospitals && (
                    <div className={cx('list')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Create At</th>
                                    <th scope="col">Update At</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allHospitals ? (
                                    allHospitals.map((hospital, count) => (
                                        <tr key={hospital._id}>
                                            <th scope="row">{count + 1}</th>
                                            <td>{hospital.name}</td>
                                            <td>{hospital.address}</td>
                                            <td>{hospital.createdAt}</td>
                                            <td>{hospital.updatedAt}</td>
                                            <td>
                                                <div className={cx('all-btn-link')}>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={hospital._id}
                                                        onClick={handleEditHospital}
                                                    >
                                                        Sửa
                                                    </p>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={hospital._id}
                                                        onClick={handleDeleteHospital}
                                                    >
                                                        Xóa
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            style={{
                                                paddingTop: '10px',
                                                borderStyle: 'none',
                                                textAlign: 'center',
                                                fontSize: '1.6rem',
                                            }}
                                        >
                                            You don't have any hospitals
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* edit form */}
            {showEdit && (
                <div className={cx('edit-form')}>
                    <div className={cx('edit-hospital')}>
                        <input
                            type="text"
                            value={oneHospital.name}
                            className={cx('form-control')}
                            placeholder="Name"
                            onChange={handleChangeName}
                        />
                        <input
                            type="text"
                            value={oneHospital.address}
                            className={cx('form-control')}
                            placeholder="Address"
                            onChange={handleChangeAddress}
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
                        header="Xóa bệnh viện?"
                        content="Bạn chắc chắn muốn Xóa bệnh viện này?"
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

export default UserProfile;
