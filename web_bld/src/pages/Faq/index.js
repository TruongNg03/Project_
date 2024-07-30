import classNames from 'classnames/bind';
import styles from './Faq.module.scss';
import Item from './Item';

const cx = classNames.bind(styles);

function Faq() {
    return (
        <div className={cx('faq')}>
            <div className={cx('container')}>
                <h1 className={cx('main-header')}>Lưu ý quan trọng</h1>
                <div className={cx('content')}>
                    <Item header="1. Ai có thể tham gia hiến máu?">
                        <ul>
                            <li>
                                - Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của mình để cứu chữa
                                người bệnh.
                            </li>
                            <li>
                                - Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến mỗi lần không quá
                                9ml/kg cân nặng và không quá 500ml mỗi lần.
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
                                - Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV, viêm gan B, viêm gan C,
                                và các vius lây qua đường truyền máu.
                            </li>
                            <li>- Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…</li>
                        </ul>
                    </Item>
                    <Item header="3. Máu gồm những thành phần và chức năng gì?">
                        <ul>
                            Máu là một chất lỏng lưu thông trong các mạch máu của cơ thể, gồm nhiều thành phần, mỗi
                            thành phần làm nhiệm vụ khác nhau:
                            <li>- Hồng cầu làm nhiệm vụ chính là vận chuyển oxy.</li>
                            <li>- Bạch cầu làm nhiệm vụ bảo vệ cơ thể.</li>
                            <li>- Tiểu cầu tham gia vào quá trình đông cầm máu.</li>
                            <li>
                                - Huyết tương: gồm nhiều thành phần khác nhau: kháng thể, các yếu tố đông máu, các chất
                                dinh dưỡng...
                            </li>
                        </ul>
                    </Item>
                    <Item header="4. Tại sao lại có nhiều người cần phải được truyền máu?">
                        <ul>
                            Mỗi giờ có hàng trăm người bệnh cần phải được truyền máu vì:
                            <li>- Bị mất máu do chấn thương, tai nạn, thảm hoạ, xuất huyết tiêu hoá...</li>
                            <li>
                                - Do bị các bệnh gây thiếu máu, chảy máu: ung thư máu, suy tuỷ xương, máu khó đông...
                            </li>
                            <li>
                                - Các phương pháp điều trị hiện đại cần truyền nhiều máu: phẫu thuật tim mạch, ghép
                                tạng...
                            </li>
                        </ul>
                    </Item>
                    <Item header="5. Tại sao khi tham gia hiến máu lại cần phải có giấy CMND?">
                        <ul>
                            <li>
                                Mỗi đơn vị máu đều phải có hồ sơ, trong đó có các thông tin về người hiến máu. Theo quy
                                định, đây là một thủ tục cần thiết trong quy trình hiến máu để đảm bảo tính xác thực
                                thông tin về người hiến máu.
                            </li>
                        </ul>
                    </Item>
                    <Item header="6. Hiến máu nhân đạo có hại đến sức khoẻ không?">
                        <ul>
                            Hiến máu theo hướng dẫn của thầy thuốc không có hại cho sức khỏe. Điều đó đã được chứng minh
                            bằng các cơ sở khoa học và cơ sở thực tế:
                            <li>
                                Cơ sở khoa học:
                                <ul>
                                    <li>
                                        - Máu có nhiều thành phần, mỗi thành phần chỉ có đời sống nhất định và luôn luôn
                                        được đổi mới hằng ngày. Ví dụ: Hồng cầu sống được 120 ngày, huyết tương thường
                                        xuyên được thay thế và đổi mới. Cơ sở khoa học cho thấy, nếu mỗi lần hiến dưới
                                        1/10 lượng máu trong cơ thể thì không có hại đến sức khỏe.
                                    </li>
                                    <li>
                                        - Nhiều công trình nghiên cứu đã chứng minh rằng, sau khi hiến máu, các chỉ số
                                        máu có thay đổi chút ít nhưng vẫn nằm trong giới hạn sinh lý bình thường không
                                        hề gây ảnh hưởng đến các hoạt động thường ngày của cơ thể.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Cơ sở thực tế:
                                <ul>
                                    <li>
                                        - Thực tế đã có hàng triệu người hiến máu nhiều lần mà sức khỏe vẫn hoàn toàn
                                        tốt. Trên thế giới có người hiến máu trên 400 lần. Ở Việt Nam, người hiến máu
                                        nhiều lần nhất đã hiến gần 100 lần, sức khỏe hoàn toàn tốt.
                                    </li>
                                    <li>
                                        - Như vậy, mỗi người nếu thấy sức khoẻ tốt, không có các bệnh lây nhiễm qua
                                        đường truyền máu, đạt tiêu chuẩn hiến máu thì có thể hiến máu từ 3-4 lần trong
                                        một năm, vừa không ảnh hưởng xấu đến sức khoẻ của bản thân, vừa đảm bảo máu có
                                        chất lượng tốt, an toàn cho người bệnh.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Item>
                    <Item header="7. Ngày mai tôi sẽ hiến máu, tôi nên chuẩn bị như thế nào?">
                        <ul>
                            <li>- Tối nay bạn không nên thức quá khuya {'(ngủ trước 23:00)'}.</li>
                            <li>- Nên ăn và không uống rượu, bia trước khi hiến máu.</li>
                            <li>- Mang giấy CMND, đủ giấy tờ tùy thân và thẻ hiến máu{'(nếu có)'} khi đi hiến máu.</li>
                        </ul>
                    </Item>
                    <Item header="8. Cảm thấy không khỏe sau khi hiến máu?">
                        <ul>
                            <li>
                                Sau khi hiến máu, nếu có các triệu chứng chóng mặt, mệt mỏi, buồn nôn,... hãy liên hệ
                                ngay cho đơn vị tiếp nhận máu để được hỗ trợ về mặt y khoa.
                            </li>
                        </ul>
                    </Item>
                </div>
            </div>
        </div>
    );
}

export default Faq;
