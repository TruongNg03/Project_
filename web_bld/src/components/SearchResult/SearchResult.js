import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './SearchResult.module.scss'
import { Link } from "react-router-dom";
import Image from "~/components/Image";

const cx = classNames.bind(styles);

function SearchResult({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image 
                className={cx('avatar')}
                src={data.avatar}
                alt={data.full_name}
            />
            
            <div className={cx('info')}>
                <span className={cx('result')}>{data.nickname}</span>
            </div>
        </Link> 
    );
}

SearchResult.propTypes = {
    data: PropTypes.object.isRequired,
}

export default SearchResult;