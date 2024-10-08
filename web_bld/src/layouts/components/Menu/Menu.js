import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import config from '~/config';

const cx = classNames.bind(styles);

function Menu() {
    return (
        <nav className={cx('menu')}>
            <div className={cx('inner')}>
                <MenuItem title="Home" to={config.routes.home} />
                <MenuItem title="Faq" to={config.routes.faq} />
                <MenuItem title="Event" to={config.routes.event} />
                <MenuItem title="News" to={config.routes.news} />
            </div>
        </nav>
    );
}

export default Menu;
