import classNames from 'classnames/bind';
import styles from './Right.module.scss';

const cx = classNames.bind(styles);

function Rights() {
    return (
        <div className={cx('rights')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1>Quyền lợi của người hiến máu</h1>
                    <p>Người hiến máu tình nguyện sẽ được những quyền lợi sau:</p>
                </div>
                <div className={cx('content')}>
                    <div className={cx('card')}>
                        <p>Được bồi dưỡng trực tiếp</p>
                        <ul>
                            <li>
                                - Ăn nhẹ, nước uống tại chỗ: tương đương 30.000 đồng (1 chai trà xanh không độ, 01 hộp
                                chocopie 66gram, 01 hộp bánh Goute 35,5gram).
                            </li>
                            <li>- Hỗ trợ chi phí đi lại (bằng tiền mặt): 50.000 đồng.</li>
                            <li>
                                - Nhận phần quà tặng giá trị tương đương:
                                <ol>
                                    <li>100.000đ khi hiến máu 250ml</li>
                                    <li>150.000đ khi hiến máu 350ml</li>
                                    <li>180.000đ khi hiến máu 450ml</li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('card')}>
                        <p>Được tư vấn về sức khoẻ</p>
                        <ul>
                            <li>
                                - Được giải thích về quy trình hiến máu và các tai biến có thể xảy ra trong và sau khi
                                hiến máu.
                            </li>
                            <li>
                                - Được cung cấp thông tin về dấu hiệu, triệu chứng do nhiễm vi rút viêm gan, HIV và một
                                số bệnh lây qua đường truyền máu, tình dục khác.
                            </li>
                            <li>
                                - Được xét nghiệm sàng lọc một số vi rút lây qua đường truyền máu, tình dục (HIV, Giang
                                mai, viêm gan,…) sau khi hiến máu.
                            </li>
                            <li>
                                - Được tư vấn hướng dẫn cách chăm sóc sức khỏe, tư vấn về kết quả bất thường sau hiến
                                máu.
                            </li>
                            <li>- Được bảo mật về kết quả khám lâm sàng, kết quả xét nghiệm.</li>
                        </ul>
                    </div>
                    <div className={cx('card')}>
                        <p>Được cấp Giấy chứng nhận hiến máu tình nguyện</p>
                        <ul>
                            <li>1. Giấy chứng nhận được trao cho người hiến máu sau mỗi lần hiến máu tình nguyện.</li>
                            <li>
                                2. Có giá trị để được truyền máu miễn phí bằng số lượng máu đã hiến, khi bản thân người
                                hiến có nhu cầu sử dụng máu tại tất cả các cơ sở y tế công lập trên toàn quốc.
                            </li>
                            <li>
                                3. Người hiến máu cần xuất trình Giấy chứng nhận để làm cơ sở cho các cơ sở y tế thực
                                hiện việc truyền máu miễn phí.
                            </li>
                            <li>
                                4. Cơ sở y tế có trách nhiệm ký, đóng dấu, xác nhận số lượng máu đã truyền miễn phí cho
                                người hiến máu vào giấy chứng nhận.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rights;
