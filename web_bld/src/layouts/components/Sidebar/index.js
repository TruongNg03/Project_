import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useState } from 'react';
import SidebarItem from '~/components/SidebarItem';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar() {
    const [showListTrash, setShowListTrash] = useState(false);

    const handleShowListTrash = () => {
        setShowListTrash(!showListTrash);
    };

    return (
        <div className={cx('sidebar')}>
            <SidebarItem title="Activities" to={config.routes.activities} />
            <SidebarItem title="Hospitals" to={config.routes.hospitals} />
            <SidebarItem title="Activity Registration" to={config.routes.registerActivity} />
            <SidebarItem title="Blood Donors" to={config.routes.bloodDonors} />
            <div className={cx('separate')}></div>
            <SidebarItem title="User accounts" to={config.routes.userAccounts} />
            <SidebarItem title="User profiles" to={config.routes.userProfiles} />
            <div className={cx('separate')}></div>
            <div className={cx('trash')}>
                <span className={cx('parent')} onClick={handleShowListTrash}>
                    Trash
                </span>
                {showListTrash && (
                    <div className={cx('list-trash')}>
                        <SidebarItem child title="Trash Users" to={config.routes.trashUsers} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
