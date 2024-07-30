import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ItemPage.module.scss';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ItemPage({ img, title, content, link }) {
    return (
        <Link to={link} className={cx('wrapper-item')}>
            <Card.Img variant="top" src={img} className={cx('image-item')} alt="img" />
            <Card.Body className={cx('inner')}>
                <Card.Title className={cx('title')}>{title}</Card.Title>
                <Card.Text className={cx('content')}>{content}</Card.Text>
            </Card.Body>
        </Link>
    );
}

ItemPage.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    link: PropTypes.string,
};

export default ItemPage;
