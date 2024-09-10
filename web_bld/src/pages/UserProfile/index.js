import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function UserProfile() {
    const [showListProfiles, setShowListProfiles] = useState(true);
    const [allProfiles, setAllProfiles] = useState();

    // fetch api
    useEffect(() => {
        async function getProfiles() {
            const profiles = await fetch('http://localhost:8080/me/stored/users-profile');
            const listProfiles = await profiles.json();

            setAllProfiles(listProfiles);
        }

        getProfiles();
    }, []);

    const handleShowListProfiles = () => {
        setShowListProfiles(!showListProfiles);
    };

    return (
        <div className={cx('user-profile')}>
            <div className={cx('list-profiles')}>
                <div className={cx('list-title')}>
                    <p onClick={handleShowListProfiles}>All Profiles</p>
                </div>
                {showListProfiles && (
                    <div className={cx('list')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">UserId</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Signature</th>
                                    <th scope="col">IdActivity</th>
                                    <th scope="col">Create At</th>
                                    <th scope="col">Update At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProfiles ? (
                                    allProfiles.map((profile, count) => (
                                        <tr key={profile._id}>
                                            <th scope="row">{count + 1}</th>
                                            <td>{profile.userId}</td>
                                            <td>{profile.name}</td>
                                            <td>{profile.gender}</td>
                                            <td>{profile.address}</td>
                                            <td>{profile.phone}</td>
                                            <td>{profile.date ? format(profile.date, 'dd-MM-yyyy') : ''}</td>
                                            <td>{profile.signature}</td>
                                            <td>{profile.idActivity}</td>
                                            <td>{profile.createdAt}</td>
                                            <td>{profile.updatedAt}</td>
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
            </div>
        </div>
    );
}

export default UserProfile;
