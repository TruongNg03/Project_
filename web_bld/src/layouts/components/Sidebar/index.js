import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarItem from '~/components/SidebarItem';
import config from '~/config';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <SidebarItem title="Activities" to={config.routes.activities} />
            <SidebarItem title="Hospitals" to={config.routes.hospitals} />
            <SidebarItem title="Blood Donors" to={config.routes.bloodDonors} />
            <SidebarItem title="User accounts" to={config.routes.userAccounts} />
            <SidebarItem title="User profiles" to={config.routes.userProfiles} />
        </div>
    );
}

export default Sidebar;
