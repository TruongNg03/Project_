import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RegisterActivity.module.scss';

const cx = classNames.bind(styles);

function RegisterActivity() {
    const [showListActivities, setShowListActivities] = useState(true);
    const [allProfiles, setAllProfiles] = useState();
    const [allActivities, setAllActivities] = useState();

    // fetch api
    useEffect(() => {
        async function getProfiles() {
            const activities = await fetch('http://localhost:8080/me/stored/activities');
            const getAllAct = await activities.json();

            const profiles = await fetch('http://localhost:8080/me/stored/users-profile?activity=true');
            const getProfileHaveActivity = await profiles.json();

            setAllActivities(getAllAct);
            setAllProfiles(getProfileHaveActivity.length ? getProfileHaveActivity : null);
        }

        getProfiles();
    }, []);

    const handleShowListActivities = () => {
        setShowListActivities(!showListActivities);
    };

    return (
        <div className={cx('register-activity')}>
            <div className={cx('list-register-activity')}>
                <div className={cx('list-title')}>
                    <p onClick={handleShowListActivities}>All Activities Registration</p>
                </div>
                {showListActivities && (
                    <div className={cx('list')}>
                        <table className={cx('table')}>
                            <thead className={cx('thead')}>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" className={cx('user-id')}>
                                        UserId
                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Hospital</th>
                                    <th scope="col">Locate</th>
                                    <th scope="col">Time Active</th>
                                    <th scope="col">Time Start</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {allActivitiesRegistration ? (
                                    !allActivitiesRegistration.message ? (
                                        allActivitiesRegistration.map((activity, count) => (
                                            <tr key={activity._id}>
                                                <th scope="row">{count + 1}</th>
                                                <td className={cx('user-id')}>{activity.userId}</td>
                                                <td>{activity.name}</td>
                                                <td>{activity.title}</td>
                                                <td>{activity.hospital}</td>
                                                <td>{activity.locate}</td>
                                                <td>{activity.timeActive}</td>
                                                <td>{activity.timeStart}</td>
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
                                                {allActivitiesRegistration.message}
                                            </td>
                                        </tr>
                                    )
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
                                            You don't have any activities registration
                                        </td>
                                    </tr>
                                )} */}

                                {allProfiles ? (
                                    allProfiles.map((profile, count) =>
                                        allActivities.map(
                                            (activity) =>
                                                profile.idActivity === activity._id && (
                                                    <tr key={activity._id}>
                                                        <th scope="row">{count + 1}</th>
                                                        <td className={cx('user-id')}>{profile.userId}</td>
                                                        <td>{profile.name}</td>
                                                        <td>{activity.title}</td>
                                                        <td>{activity.hospital}</td>
                                                        <td>{activity.locate}</td>
                                                        <td>{activity.timeActive}</td>
                                                        <td>{activity.timeStart}</td>
                                                    </tr>
                                                ),
                                        ),
                                    )
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
                                            You don't have any activities registration
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

export default RegisterActivity;
