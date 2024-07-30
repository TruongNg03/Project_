import classNames from 'classnames/bind';
import styles from './News.module.scss';
import ItemPage from '~/pages/News/ItemPage';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function News() {
    return (
        <div className={cx('news')}>
            <div className={cx('wrapper')}>
                <ItemPage
                    img={images.fu}
                    link="page-1"
                    title="Vận động người dân tham gia hiến máu hỗ trợ cho khu vực miền Tây Nam Bộ"
                    content="Với sứ mệnh là Ngân Hàng Máu cung cấp chế phẩm máu cho hơn 150 
                        bệnh viện trên địa bàn TP.HCM và hỗ trợ cho miền Tây Nam Bộ trong dịp Tết 
                        Nguyên Đán này. Để giúp cho những người bệnh cũng có được một cái Tết ấm no, 
                        chúng tôi kính mong quý vị hãy sắp xếp thời gian quý báu đến tham gia hiến máu 
                        nhân đạo, giúp cho dự trữ kho Ngân Hàng Máu nằm ở mức an toàn trước khi bước 
                        vào kì nghỉ Tết Nguyên Đán gần 10 ngày."
                ></ItemPage>
                <ItemPage
                    img={images.fu}
                    link="page-2"
                    title="BỆNH VIỆN TRUYỀN MÁU HUYẾT HỌC BÁO CÁO SỐ LIỆU TIẾP NHẬN MÁU NĂM 2023”"
                    content="Sáng 5/1/2024, Bệnh viện Truyền Máu Huyết Học (BV.TMHH) tổ chức Hội 
                        nghị tổng kết Hiến máu tình nguyện năm 2023 và triển khai kế hoạch công tác 
                        vận động hiến máu tình nguyện năm 2024; phát động chiến dịch vận động hiến máu 
                        tình nguyện dịp Tết Nguyên Đán Giáp Thìn -Lễ hội Xuân hồng 2024 với thông điệp 
                        “Hiến giọt máu đào - Trao đời sự sống”"
                ></ItemPage>
                <ItemPage
                    img={images.fu}
                    link="page-3"
                    title="NGÀY “THẾ GIỚI TÔN VINH NGƯỜI HIẾN MÁU”"
                    content="Ngày 14/06/2023, Bệnh viện Truyền Máu Huyết Học tổ chức tri ân người 
                        hiến máu tình nguyện nhân dịp kỷ niệm Ngày Thế giới Hiến máu năm 2023 (World 
                        Blood Donor Day 2023)."
                ></ItemPage>
                <ItemPage
                    img={images.fu}
                    link="page-4"
                    title="Vận động người dân tham gia hiến máu hỗ trợ cho khu vực miền Tây Nam Bộ"
                    content="Với sứ mệnh là Ngân Hàng Máu cung cấp chế phẩm máu cho hơn 150 
                        bệnh viện trên địa bàn TP.HCM và hỗ trợ cho miền Tây Nam Bộ trong dịp Tết 
                        Nguyên Đán này. Để giúp cho những người bệnh cũng có được một cái Tết ấm no, 
                        chúng tôi kính mong quý vị hãy sắp xếp thời gian quý báu đến tham gia hiến máu 
                        nhân đạo, giúp cho dự trữ kho Ngân Hàng Máu nằm ở mức an toàn trước khi bước 
                        vào kì nghỉ Tết Nguyên Đán gần 10 ngày."
                ></ItemPage>
                <ItemPage
                    img={images.fu}
                    link="page-5"
                    title="BỆNH VIỆN TRUYỀN MÁU HUYẾT HỌC BÁO CÁO SỐ LIỆU TIẾP NHẬN MÁU NĂM 2023”"
                    content="Sáng 5/1/2024, Bệnh viện Truyền Máu Huyết Học (BV.TMHH) tổ chức Hội 
                        nghị tổng kết Hiến máu tình nguyện năm 2023 và triển khai kế hoạch công tác 
                        vận động hiến máu tình nguyện năm 2024; phát động chiến dịch vận động hiến máu 
                        tình nguyện dịp Tết Nguyên Đán Giáp Thìn -Lễ hội Xuân hồng 2024 với thông điệp 
                        “Hiến giọt máu đào - Trao đời sự sống”"
                ></ItemPage>
            </div>
        </div>
    );
}

export default News;
