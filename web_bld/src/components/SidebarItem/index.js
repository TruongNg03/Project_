import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';

const cx = classNames.bind(styles);

function SidebarItem({ title, className, child = false, to }) {
    const classes = cx('sidebar-item', {
        [className]: className,
        child,
    });

    return (
        <NavLink className={(nav) => cx(classes, { active: nav.isActive })} to={to}>
            <div className={cx('title')}>
                {child && <p className={cx('dot')}>●</p>}
                <p>{title}</p>
            </div>
        </NavLink>
    );
}

SidebarItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
    className: PropTypes.string,
    child: PropTypes.bool,
};

export default SidebarItem;
