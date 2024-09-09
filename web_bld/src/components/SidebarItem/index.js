import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';

const cx = classNames.bind(styles);

function SidebarItem({ title, to }) {
    return (
        <NavLink className={(nav) => cx('sidebar-item', { active: nav.isActive })} to={to}>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

SidebarItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default SidebarItem;
