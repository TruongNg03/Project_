import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './BloodDonor.module.scss';
import Alert from '~/components/Alert';

const cx = classNames.bind(styles);

function UserProfile() {
    const [showListBloods, setShowListBloods] = useState(true);
    const [showFormBlood, setShowFormBlood] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [allBloods, setAllBloods] = useState();
    const [bloodId, setBloodId] = useState();
    const [newBlood, setNewBlood] = useState();
    const [oneBlood, setOneBlood] = useState();

    // fetch api
    useEffect(() => {
        async function getBloods() {
            const bloods = await fetch('http://localhost:8080/me/stored/users-blood');
            const listBloods = await bloods.json();
            setAllBloods(listBloods);
        }

        getBloods();
    }, []);

    const handlePostFormBlood = () => {
        setShowFormBlood(!showFormBlood);
    };

    const handleAddName = (e) => {
        setNewBlood({
            ...newBlood,
            name: e.target.value,
        });
    };

    const handleAddIdentity = (e) => {
        setNewBlood({
            ...newBlood,
            identity: e.target.value,
        });
    };

    const handleAddBloodGroup = (e) => {
        setNewBlood({
            ...newBlood,
            bloodGroup: e.target.value,
        });
    };

    const handleCreateBlood = async () => {
        // send to server
        try {
            await axios.post(`http://localhost:8080/bloods/stored`, newBlood);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowListBloods = () => {
        setShowListBloods(!showListBloods);
    };

    // edit btn
    const handleEditBlood = async (e) => {
        try {
            const hos = await fetch(`http://localhost:8080/bloods/${e.target.id}`);
            const hosData = await hos.json();

            setOneBlood(hosData);
        } catch (err) {
            console.log(err);
        }

        setShowEdit(true);
        setBloodId(e.target.id);
    };

    const handleChangeName = (e) => {
        setOneBlood({
            ...oneBlood,
            name: e.target.value,
        });
    };

    const handleChangeIdentity = (e) => {
        setOneBlood({
            ...oneBlood,
            identity: e.target.value,
        });
    };

    const handleChangeBloodGroup = (e) => {
        setOneBlood({
            ...oneBlood,
            bloodGroup: e.target.value,
        });
    };

    const cancelBtn = () => {
        setShowEdit(false);
    };

    // edit btn
    const submitBtn = async () => {
        // send to server
        try {
            await axios.put(`http://localhost:8080/bloods/${bloodId}/edit`, oneBlood);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    // delete btn
    const handleDeleteBlood = (e) => {
        setShowNotify(true);
        setBloodId(e.target.id);
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
            await axios.delete(`http://localhost:8080/bloods/${bloodId}/delete`);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('blood')}>
            <div className={cx('post-blood')}>
                <div className={cx('post-blood-title')}>
                    <p onClick={handlePostFormBlood}>Add Blood</p>
                </div>
                {showFormBlood && (
                    <div className={cx('post-blood-form')}>
                        <input type="text" className={cx('form-control')} placeholder="Name" onChange={handleAddName} />
                        <input
                            type="number"
                            className={cx('form-control')}
                            placeholder="Identity"
                            onChange={handleAddIdentity}
                        />
                        <input
                            type="text"
                            className={cx('form-control')}
                            placeholder="Blood Group"
                            onChange={handleAddBloodGroup}
                        />

                        <button type="submit" className={cx('submit-btn')} onClick={handleCreateBlood}>
                            Post
                        </button>
                    </div>
                )}
            </div>

            <div className={cx('list-bloods')}>
                <div className={cx('list-title')}>
                    <p onClick={handleShowListBloods}>All Bloods</p>
                </div>
                {showListBloods && (
                    <div className={cx('list')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Identity</th>
                                    <th scope="col">Blood Group</th>
                                    <th scope="col">Create At</th>
                                    <th scope="col">Update At</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBloods ? (
                                    allBloods.map((blood, count) => (
                                        <tr key={blood._id}>
                                            <th scope="row">{count + 1}</th>
                                            <td>{blood.name}</td>
                                            <td>{blood.identity}</td>
                                            <td>{blood.bloodGroup}</td>
                                            <td>{blood.createdAt}</td>
                                            <td>{blood.updatedAt}</td>
                                            <td>
                                                <div className={cx('all-btn-link')}>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={blood._id}
                                                        onClick={handleEditBlood}
                                                    >
                                                        Sửa
                                                    </p>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={blood._id}
                                                        onClick={handleDeleteBlood}
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
                                            You don't have any bloods
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
                    <div className={cx('edit-blood')}>
                        <input
                            type="text"
                            value={oneBlood.name}
                            className={cx('form-control')}
                            placeholder="Name"
                            onChange={handleChangeName}
                        />
                        <input
                            type="number"
                            value={oneBlood.identity}
                            className={cx('form-control')}
                            placeholder="Identity"
                            onChange={handleChangeIdentity}
                        />
                        <input
                            type="text"
                            value={oneBlood.bloodGroup}
                            className={cx('form-control')}
                            placeholder="Blood Group"
                            onChange={handleChangeBloodGroup}
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
                        header="Xóa thông tin?"
                        content="Bạn chắc chắn muốn Xóa người hiến máu này?"
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
