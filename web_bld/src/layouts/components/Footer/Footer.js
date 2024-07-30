import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { LogoItem } from './LogoItem';
import images from '~/assets/images';
import Contact from './Contact';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('info')}>
                    <img className={cx('logo-blood')} src={images.logoBlood} alt="logo" />
                    <div className={cx('content')}>
                        <div className={cx('contact')}>
                            <p className={cx('content-item')}>Liên hệ</p>
                            <Contact
                                location="TT Hiến Máu Nhân Đạo"
                                pos1="255 Nguyễn Đức Cảnh, Phường Tương Mai, Quận Hoàng Mai, Thành phố Hà Nội"
                                pos2="106 Nguyễn An Ninh, Phường Tương Mai, Quận Hoàng Mai, Thành phố Hà Nội"
                                phoneNum1="012 3456 7890"
                                phoneNum2="098 7654 3210"
                            />
                            {/* <Contact
                                location='Bệnh viện BTH'
                                pos1='118 Đ. Hồng Bàng, Phường 12, Quận 5, Thành phố Hồ Chí Minh'
                                pos2='24 Nguyễn Thị Diệu, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh'
                                phoneNum1='028 39571342'
                                phoneNum2='028 39557858'
                            /> */}
                        </div>
                        <div className={cx('support')}>
                            <p className={cx('content-item')}>Hỗ trợ</p>
                            <p className={cx('sp-link')}>
                                <Link to={config.routes.info} className={cx('sp-link')}>
                                    Điều khoản sử dụng
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('logoList')}>
                {/* Source image: https://giotmauvang.org.vn/ -- footer*/}
                <LogoItem
                    title="Đơn vị thành viên:"
                    image1="https://giotmauvang.org.vn/assets/images/8dd6a37f16c9fee509c941224efccb13.png"
                    alt1="CTD"
                    image2="https://giotmauvang.org.vn/assets/images/a13336759625d464d1a6c698925ef8a8.png"
                    alt2="BTH"
                    image3="https://giotmauvang.org.vn/assets/images/d2e28ca02b3ce84b21eb1b40e5577dcb.png"
                    alt3="BTH"
                />
                <LogoItem
                    title="Chỉ đạo thực hiện:"
                    image1={images.noImage2}
                    alt1="admin"
                    image2="https://giotmauvang.org.vn/assets/images/bcbb9870cbaf4ff59bec0a5007248447.png"
                    alt2="HCTD"
                />
                <LogoItem
                    title="Tổ chức và Phát triển bởi:"
                    image1={images.noImage2}
                    alt1="admin"
                    image2="https://giotmauvang.org.vn/assets/images/191a253eabf195584a55474bbbafd3e4.png"
                    alt2="INTELIN"
                />
                <LogoItem
                    title="Tài trợ:"
                    image1="https://giotmauvang.org.vn/assets/images/58a4c0505d96027883cd98d87ba75005.png"
                    alt1="STG"
                />
            </div>

            <p className={cx('copyright')}>Copyright © 2024 - Version 1.0.0</p>
        </div>
    );
}

export default Footer;
