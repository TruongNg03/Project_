import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { useId } from 'react';

const cx = classNames.bind(styles);

function Item({ header, children }) {
    const itemId = useId();

    return (
        <label className={cx('label-item')} htmlFor={'item-' + itemId}>
            <div className={cx('wrapper')}>
                <input type="checkbox" id={'item-' + itemId} />
                <p className={cx('header')}>{header}</p>
                <div className={cx('content')}>{children}</div>
            </div>
        </label>
    );
}

Item.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Item;
