import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpAZ, faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import styles from './UserAccount.module.scss';
import Alert from '~/components/Alert';
import { type } from '@testing-library/user-event/dist/type';

const cx = classNames.bind(styles);

function UserAccount() {
    const [showListUsers, setShowListUsers] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [allUsers, setAllUser] = useState();
    const [userId, setUserId] = useState();
    const [columnSort, setColumnSort] = useState('username');
    const [typeSort, setTypeSort] = useState('asc');
    const [showSortUsernameCol, setShowUsernameCol] = useState(false);
    const [showSortCreateAtCol, setShowSortCreateAtCol] = useState(false);
    const [showSortUpdateAtCol, setShowSortUpdateAtCol] = useState(false);

    // fetch api
    useEffect(() => {
        async function getUsers() {
            const users = await fetch(
                `http://localhost:8080/me/stored/users-account?_sort&column=username&type=${typeSort}`,
            );
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

    // delete user btn
    const handleDeleteUser = (e) => {
        console.log(e.target.id);
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
            await axios.delete(`http://localhost:8080/user/${userId}`);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    };

    // sort column
    const handleSortColumn = async (e) => {
        setColumnSort(e.target.id);
        setTypeSort(typeSort === 'asc' ? 'desc' : 'asc');

        if (e.target.id === 'username') {
            setShowUsernameCol(true);
        }

        if (e.target.id === 'createdAt') {
            setShowSortCreateAtCol(true);
        }

        if (e.target.id === 'updatedAt') {
            setShowSortUpdateAtCol(true);
        }

        try {
            const users = await fetch(
                `http://localhost:8080/me/stored/users-account?_sort&column=${columnSort}&type=${typeSort}`,
            );
            const listUsers = await users.json();

            setAllUser(listUsers);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('user-account')}>
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
                                    <th scope="col" className={cx('sort-col')} id="username" onClick={handleSortColumn}>
                                        <span id="username">
                                            <p id="username">Username</p>
                                            {showSortUsernameCol &&
                                                (typeSort === 'desc' ? (
                                                    <FontAwesomeIcon
                                                        className={cx('arrow-icon')}
                                                        id="username"
                                                        icon={faArrowDownAZ}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        className={cx('arrow-icon')}
                                                        id="username"
                                                        icon={faArrowUpAZ}
                                                    />
                                                ))}
                                        </span>
                                    </th>
                                    <th scope="col" className={cx('password')} onClick={handleShowPass}>
                                        Password {showPassword ? '(UnHash)' : '(Hash)'}
                                    </th>
                                    <th scope="col">Identity</th>
                                    <th
                                        scope="col"
                                        className={cx('sort-col')}
                                        id="createdAt"
                                        onClick={handleSortColumn}
                                    >
                                        <span id="createdAt">
                                            <p id="createdAt">Create At</p>
                                            {showSortCreateAtCol &&
                                                (typeSort === 'desc' ? (
                                                    <FontAwesomeIcon
                                                        className={cx('arrow-icon')}
                                                        id="createdAt"
                                                        icon={faArrowDownAZ}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        className={cx('arrow-icon')}
                                                        id="createdAt"
                                                        icon={faArrowUpAZ}
                                                    />
                                                ))}
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        className={cx('sort-col')}
                                        id="updatedAt"
                                        onClick={handleSortColumn}
                                    >
                                        <span id="updatedAt">
                                            <p id="updatedAt">Update At</p>
                                            {showSortUpdateAtCol &&
                                                (typeSort === 'desc' ? (
                                                    <FontAwesomeIcon
                                                        className={cx('arrow-icon')}
                                                        id="updatedAt"
                                                        icon={faArrowDownAZ}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        className={cx('arrow-icon')}
                                                        id="updatedAt"
                                                        icon={faArrowUpAZ}
                                                    />
                                                ))}
                                        </span>
                                    </th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers ? (
                                    allUsers.map((user, count) => (
                                        <tr key={user._id}>
                                            <th scope="row">{count + 1}</th>
                                            <td className={cx('user-id')}>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td className={cx('password')}>
                                                {showPassword ? user.passwordUnHash || user.password : user.password}
                                            </td>
                                            <td>{user.identity}</td>
                                            <td>{user.createdAt}</td>
                                            <td>{user.updatedAt}</td>
                                            <td>
                                                <div className={cx('all-btn-link')}>
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
                                            colSpan={8}
                                            style={{
                                                paddingTop: '10px',
                                                borderStyle: 'none',
                                                textAlign: 'center',
                                                fontSize: '1.6rem',
                                            }}
                                        >
                                            You don't have any users
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
                            header="Xóa tài khoản?"
                            content={'Bạn chắc chắn muốn xóa tài khoản ' + userId + ' ?'}
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

export default UserAccount;
