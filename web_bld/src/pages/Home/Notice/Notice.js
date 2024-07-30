import classNames from 'classnames/bind';
import styles from './Notice.module.scss';
import { Link } from 'react-router-dom';
import Item from '~/pages/Faq/Item';

const cx = classNames.bind(styles);

function Notice() {
    return (
        <div className={cx('notice')}>
            <h1 className={cx('header')}>Lưu ý quan trọng</h1>
            <div className={cx('list-item')}>
                <Item header="1. Ai có thể tham gia hiến máu?">
                    <ul>
                        <li>
                            - Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của mình để cứu chữa người
                            bệnh.
                        </li>
                        <li>
                            - Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến mỗi lần không quá 9ml/kg
                            cân nặng và không quá 500ml mỗi lần.
                        </li>
                        <li>
                            - Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh lây nhiễm qua đường
                            truyền máu khác.
                        </li>
                        <li>- Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.</li>
                        <li>- Có giấy tờ tùy thân.</li>
                    </ul>
                </Item>
                <Item header="2. Ai là người không nên hiến máu">
                    <ul>
                        <li>
                            - Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV, viêm gan B, viêm gan C, và
                            các vius lây qua đường truyền máu.
                        </li>
                        <li>- Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…</li>
                    </ul>
                </Item>
                <Item header="3. Máu gồm những thành phần và chức năng gì?">
                    <ul>
                        Máu là một chất lỏng lưu thông trong các mạch máu của cơ thể, gồm nhiều thành phần, mỗi thành
                        phần làm nhiệm vụ khác nhau:
                        <li>- Hồng cầu làm nhiệm vụ chính là vận chuyển oxy.</li>
                        <li>- Bạch cầu làm nhiệm vụ bảo vệ cơ thể.</li>
                        <li>- Tiểu cầu tham gia vào quá trình đông cầm máu.</li>
                        <li>
                            - Huyết tương: gồm nhiều thành phần khác nhau: kháng thể, các yếu tố đông máu, các chất dinh
                            dưỡng...
                        </li>
                    </ul>
                </Item>
            </div>
            <Link to="/faq">Xem thêm</Link>
        </div>
    );
}

export default Notice;
