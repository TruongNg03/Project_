import classNames from 'classnames/bind';
import styles from './HeaderSidebar.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';

const cx = classNames.bind(styles);

function HeaderSidebar({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Sidebar />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default HeaderSidebar;
