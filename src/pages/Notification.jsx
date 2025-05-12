import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


export default function Notification() {
    return <>
        <div className="contNotif">
            <div className="headNotif">
                <ol>
                    <li><img src={logo} alt="" /></li>
                    <li>SK Notifications</li>
                </ol>
                <ol>
                    <li><img src={logo} alt="" /></li>
                </ol>
            </div>
            <div className="notifBody">
                <div className="notifBodyCont">
                    <h2>Notifications</h2>
                    <div className="wrapNotifD">
                        <div className="headNotifData">
                            <ol>
                                <li><i className="fa fa-hat-cowboy"></i></li>
                                <p>Hikusama</p>
                            </ol>
                            <ol>
                                <li><i className="fa fa-hat-cowboy"></i></li>
                                <p>Hikusama</p>
                            </ol>
                            <ol>
                                <li><i className="fa fa-hat-cowboy"></i></li>
                                <p>Hikusama</p>
                            </ol>
                        </div>
                        <div className="bodyNotifData">
                            <ol></ol>
                            <ol></ol>
                            <ol></ol>
                        </div>
                    </div>
                </div>
                <div className="notifSide">
                    <div className="descHead">
                        <h2>Body</h2>
                        <div className="descCont">
                            <p>Lorem ipsum dolor sit amet consectetur adipi dsadsa adssad Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil corrupti officiis et, tempora veritatis quaerat reprehenderit natus id sunt, quis maiores praesentium! Sequi consectetur iste quisquam unde veniam ex quos itaque accusamus autem quasi ut neque blanditiis quaerat in doloremque, saepe ratione voluptatum explicabo perferendis mollitia eos iure? Sapiente, sequi! sicing elit. Incidunt nesciunt delectus ea? Porro error voluptates blanditiis nulla quos reprehenderit ex ipsam cum facilis. Quos quod aperiam voluptatibus ex. Similique quibusdam est itaque, fugiat officiis magnam vitae amet quidem earum quod cum sequi excepturi possimus incidunt. Odit dolorem quae veritatis facilis.</p>
                        </div>
                    </div>
                    <div className="dataNotifRes">
                        <div className="viewore">
                            <Link to={'/youths'}>View all</Link>
                        </div>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                            <ol>Hello</ol>
                        <div className="dataDesc">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}