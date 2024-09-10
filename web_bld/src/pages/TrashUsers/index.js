import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './TrashUsers.module.scss';
import Alert from '~/components/Alert';

const cx = classNames.bind(styles);

function TrashUsers() {
    const [showListUsers, setShowListUsers] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [allUsers, setAllUser] = useState();
    const [userId, setUserId] = useState();

    // fetch api
    useEffect(() => {
        async function getUsers() {
            const users = await fetch('http://localhost:8080/me/trash/users');
            const listUsers = await users.json();

            setAllUser(listUsers);
        }

        getUsers();
    }, []);

    // show all users
    const handleShowListUsers = () => {
        setShowListUsers(!showListUsers);
    };

    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    // restore user
    const handleRestoreUser = async (e) => {
        //
        try {
            await axios.patch(`http://localhost:8080/user/${e.target.id}/restore`);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    // delete user btn
    const handleDeleteUser = (e) => {
        setShowNotify(true);
        setUserId(e.target.id);
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
        //
        try {
            await axios.delete(`http://localhost:8080/user/${userId}/force`);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('trash-user')}>
            <div className={cx('list-users')}>
                <div className={cx('list-title')}>
                    <p onClick={handleShowListUsers}>All Users</p>
                </div>
                {showListUsers && (
                    <div className={cx('list')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" className={cx('user-id')}>
                                        ID
                                    </th>
                                    <th scope="col">Username</th>
                                    <th scope="col" className={cx('password')} onClick={handleShowPass}>
                                        Password {showPassword ? '(UnHash)' : '(Hash)'}
                                    </th>
                                    <th scope="col">Identity</th>
                                    <th scope="col">Deleted At</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers ? (
                                    allUsers.users.map((user, count) => (
                                        <tr key={user._id}>
                                            <th scope="row">{count + 1}</th>
                                            <td className={cx('user-id')}>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td className={cx('password')}>
                                                {showPassword ? user.passwordUnHash || user.password : user.password}
                                            </td>
                                            <td>{user.identity}</td>
                                            <td>{user.deletedAt}</td>
                                            <td>
                                                <div className={cx('all-btn-link')}>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={user._id}
                                                        onClick={handleRestoreUser}
                                                    >
                                                        Khôi phục
                                                    </p>
                                                    <p
                                                        className={cx('btn-link')}
                                                        id={user._id}
                                                        onClick={handleDeleteUser}
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
                                            colSpan={7}
                                            style={{
                                                paddingTop: '10px',
                                                borderStyle: 'none',
                                                textAlign: 'center',
                                                fontSize: '1.6rem',
                                            }}
                                        >
                                            You trash is empty
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* alert */}
                {showNotify && (
                    <div className={cx('fixed-alert')} tabIndex="-1">
                        <Alert
                            header="Xóa vĩnh viễn tài khoản?"
                            content={'Bạn chắc chắn muốn xóa vĩnh viễn tài khoản ' + userId + ' ?'}
                            contentBtn="Xóa"
                            danger
                            onCloseBtn={onCloseBtn}
                            onCancelBtn={onCancelBtn}
                            onDefBtn={onDefBtn}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrashUsers;
