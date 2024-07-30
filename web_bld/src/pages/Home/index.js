import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Rights from '~/pages/Home/Rights';
import Standard from '~/pages/Home/Standard';
import Notice from '~/pages/Home/Notice';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('home')}>
            {/*  1 */}
            <div className={cx('sec-1')}>
                <div className={cx('sec-1-wrapper')}>
                    <div className={cx('sec-1-content')}>
                        <strong>Đặt lịch hẹn</strong>
                        <strong>Hiến máu cứu người</strong>
                        <p>
                            Với mỗi lần hiến máu bạn có thể mang lại cơ hội cứu sống 3 người. Hãy cứu lấy mạng người
                            bằng ít máu của mình!
                        </p>
                    </div>
                    <div className={cx('sec-1-search')}>
                        <div className={cx('search-label')}>
                            <div className={cx('search-label-wrapper')}>
                                <p>Bạn cần đặt lịch vào thời gian nào?</p>
                                <div className={cx('search-date')}>
                                    <input className={cx('input-date')} type="text" placeholder="Từ ngày - đến ngày" />
                                    <i className={cx('right-icon')}>
                                        <svg
                                            id="icon_Calendar"
                                            data-name="icon Calendar"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18.537"
                                            height="20.914"
                                            viewBox="0 0 18.537 20.914"
                                        >
                                            <path
                                                id="Path_904"
                                                data-name="Path 904"
                                                d="M1520.721,776.41c0,.3-.079.41-.39.41q-6.822-.013-13.643,0c-.3,0-.4-.088-.4-.4q.013-5.891,0-11.782c0-.292.087-.383.377-.382,2.123.009,11.59.01,13.643,0,.31,0,.419.073.418.409Q1520.707,770.537,1520.721,776.41Zm-.182-16.332c-.52-.006-1.04-.017-1.561.006-.271.009-.338-.091-.33-.347.014-.483-.005-.963.006-1.446.006-.224-.064-.315-.3-.307-.362.007-.992.012-1.49.007a.238.238,0,0,0-.238.24v3.057a.283.283,0,0,1-.28.284h-.655a.285.285,0,0,1-.282-.287v-1.208c-3.076-.014-4.3.014-4.984-.017,0-.6-.008-1.177,0-1.75.011-.486-.2-.273-1.776-.33-.213-.005-.291.069-.308.228a.424.424,0,0,1,.006.059v3.02a.283.283,0,0,1-.282.284h-.651a.283.283,0,0,1-.282-.284v-1.219c-.244,0-.487.005-.73.008a2.092,2.092,0,0,0-2.164,2.234q0,7.16,0,14.32a2.076,2.076,0,0,0,2.2,2.259q7.064.009,14.127-.009a2.439,2.439,0,0,0,1.007-.21,2.1,2.1,0,0,0,1.2-2.091q.009-7.075,0-14.144A2.155,2.155,0,0,0,1520.539,760.078Z"
                                                transform="translate(-1504.242 -757.98)"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                id="Path_905"
                                                data-name="Path 905"
                                                d="M1521.577,786.432c-.009-.22.076-.313.3-.31.53.008,1.06.006,1.59,0,.212,0,.315.069.31.3-.011.542-.013,1.085,0,1.627.011.43-.159.258-1.893.3-.249.006-.325-.091-.309-.329C1521.588,787.852,1521.583,786.573,1521.577,786.432Z"
                                                transform="translate(-1513.416 -772.625)"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                id="Path_906"
                                                data-name="Path 906"
                                                d="M1515.114,787.972c.016.263-.07.385-.352.377-.517-.014-1.034-.011-1.551,0-.24,0-.328-.1-.325-.331q.012-.775,0-1.551c0-.253.1-.351.354-.346.5.01,1.009.012,1.514,0,.277-.007.374.111.359.376C1515.106,786.635,1515.1,787.82,1515.114,787.972Z"
                                                transform="translate(-1508.818 -772.624)"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                id="Path_907"
                                                data-name="Path 907"
                                                d="M1532.436,787.275c0,1.4.23,1.014-1.871,1.077-.259.008-.353-.1-.349-.351.008-.519.006-1.037,0-1.556,0-.214.081-.321.3-.319q.816.007,1.631,0c.206,0,.287.1.284.3,0,.284,0,.568,0,.852Z"
                                                transform="translate(-1517.991 -772.627)"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                id="Path_908"
                                                data-name="Path 908"
                                                d="M1521.625,779.7v-2.121h2.15V779.7Z"
                                                transform="translate(-1513.441 -768.179)"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                id="Path_909"
                                                data-name="Path 909"
                                                d="M1515.11,777.551c0,.673.011,1.289-.012,1.9a.37.37,0,0,1-.259.251c-.566.024-1.134.022-1.7,0a.343.343,0,0,1-.238-.233c-.021-.566-.016-1.134-.005-1.7,0-.075.086-.211.134-.212C1513.714,777.547,1514.4,777.551,1515.11,777.551Z"
                                                transform="translate(-1508.818 -768.163)"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                id="Path_910"
                                                data-name="Path 910"
                                                d="M1532.432,777.543c0,.675.009,1.3-.011,1.93a.338.338,0,0,1-.237.23c-.567.021-1.137.023-1.7,0a.374.374,0,0,1-.25-.265c-.025-.543-.021-1.087,0-1.63,0-.09.117-.25.183-.252C1531.071,777.536,1531.734,777.543,1532.432,777.543Z"
                                                transform="translate(-1517.989 -768.158)"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className={cx('search-btn')}>
                            <span>Tìm kiếm</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2 */}
            <Rights />

            {/*  3 */}
            <Standard />

            {/* 4 */}
            <Notice />
        </div>
    );
}

export default Home;
