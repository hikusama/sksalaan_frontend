import { Link, Outlet, useLocation } from "react-router-dom";
import logo from './assets/logo.png';
import user from './assets/user.jpg';
import { useState } from "react";

export default function Layout() {

    const [isTypeOpen, setType] = useState(false)



    const handleTypeOpen = (e) => {
        e.stopPropagation();
        setType(!isTypeOpen);
    };

    const location = useLocation();





    return <>
        <header>
            {/*  */}
        </header>

        <main>
            <nav id="side">
                <section className="logo">
                    <ol>
                        <img src={logo} alt="logo" />
                    </ol>
                    <ol className="lilside">
                        <h4>SKYouthSys..</h4>
                        <p>Salaan</p>
                    </ol>
                </section>
                <section id="navlinks_cont">
                    <div className="wraplink">

                        <div className="links_cont headside">

                            <Link to={'/'} id='overV' className={` ${location.pathname === '/' ? 'onLoc' : ''}`} title="Overview">
                                <li>
                                    <i className="fas fa-tachometer-alt"></i>
                                    <p className="lilside">Overview</p>
                                </li>
                            </Link>

                            <Link to={'/youths'}  className={` ${location.pathname === '/youths' ? 'onLoc' : ''}`} id='youthLink' title="Youths">
                                <li>
                                    <i className="fas fa-users"></i>
                                    <p className="lilside">Youths</p>
                                </li>
                            </Link>

                            <Link to={'/accounts'} className={` ${location.pathname === '/accounts' ? 'onLoc' : ''}`}id='accV' title="Accounts">
                                <li>

                                    <i className="fas fa-user-circle"></i>
                                    <p className="lilside">Accounts</p>
                                </li>
                            </Link>

                            <Link to={'/post'} className={` ${location.pathname === '/post' ? 'onLoc' : ''}`} id='postV' title="Post">
                                <li>
                                    <i className="fas fa-paper-plane"></i>
                                    <p className="lilside">Post</p>
                                </li>
                            </Link>

                            <div id='port' title="Portal"  className={` ${location.pathname === '/portal' || location.pathname === '/portal/manage' ? 'onLoc' : ''}`} onClick={(e) => handleTypeOpen(e)}>
                                <li className="portalOpen">
                                    <i className="fas fa-globe"></i>
                                    <p className="lilside">Portal</p>
                                    <i className="fas fa-angle-right"></i>
                                </li>
                                <div className={`portalType ${!isTypeOpen ? "typeOpen" : ""}`} >

                                    <Link to={'/portal/manage'} id="p2" title="Register" className={` ${location.pathname === '/portal/manage' ? 'onLoc' : ''}`} onClick={(e) => e.stopPropagation()}>
                                        <li><i className="fas fa-users-cog"></i> <p>Manage</p></li>
                                    </Link>
                                </div>
                            </div>
                            <Link to={'/bulk_logs'} id='notifV' className={` ${location.pathname === '/bulk_logs' ? 'onLoc' : ''}`} title="bulk logs">
                                <li>
                                    <i className="fas fa-bell"></i>
                                    <p className="lilside">Bulk logs</p>
                                </li>
                            </Link>


                        </div>
                        <div className="links_cont footside">

                            <Link to={'/settings'}  className={` ${location.pathname === '/settings' ? 'onLoc' : ''}`} id='settingsV' title="Settings">
                                <li>
                                    <i className="fas fa-cogs"></i>
                                    <p className="lilside">Settings</p>
                                </li>
                            </Link>

                            <ol className="userpic">
                                <div>
                                    <img src={user} alt="" />
                                </div>
                                <div className="name lilside">
                                    <h4>Hikusama</h4>
                                    <p>Admin</p>
                                </div>
                            </ol>
                        </div>
                    </div>
                    <div className="f"></div>
                    <div className="s"></div>
                </section>
                <section>

                </section>
            </nav>
            <div className="contents">
                <Outlet />
            </div>
        </main>


    </>
}