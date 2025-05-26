import { useState } from "react"





export default function PortalManage() {
    const [isEduc, setEduc] = useState(true);
    const [listPosition, setListPosition] = useState(null);

    return <>
        <div className="portalManage">
            <div className="dashPortalManage">
                <div className="hd">
                    <i className="fas fa-hat-wizard"></i>
                    <h3>Guest request</h3>
                </div>
            </div>
            <div className="bodyPortalManage">
                <div className="headContMain">
                    <li>
                        <i class="fas fa-search"></i>
                        <input placeholder="Search here...." type="search" value="" />
                    </li>
                </div>
                <div className="portalManageBody">

                    <ol >
                        <ul>
                            <section>
                                <div className="iport">
                                    <p>
                                        <i className="fas fa-info"></i>
                                    </p>
                                </div>
                                <li>
                                    <p>#</p>
                                    <p>1</p>
                                </li>
                                <li>
                                    <p>Name</p>
                                    <p>Ramillano, Incent E.</p>
                                </li>
                                <li>
                                    <p>Type</p>
                                    <p>ISY</p>
                                </li>
                                <li>
                                    <p>Age</p>
                                    <p>18</p>
                                </li>
                                <li>
                                    <p>Contact</p>
                                    <p>09856093241</p>
                                </li>
                                <li>
                                    <p>Created</p>
                                    <p>25-04-09</p>
                                </li>
                            </section>

                            {/* <div className="skills_list ar">
                                <button>Approved</button>
                                <button>Delete</button>
                            </div> */}
                        </ul>
                        <div className="information">
                            <div className="infoHead">
                                <section>
                                    <li>
                                        <h3>Incent</h3>
                                        <p>Given</p>
                                    </li>
                                    <li>
                                        <h3>Eddai</h3>
                                        <p>Middle</p>
                                    </li>
                                    <li>
                                        <h3>Ramillano </h3>
                                        <p>Family</p>
                                    </li>
                                </section>
                                <section className="actReq">
                                    <button>Approved</button>
                                    <button>Delete</button>
                                </section>
                            </div>
                            <div className={`informBody`}>
                                <section>
                                    <div className="lt">
                                        <div className="skillsL">
                                            <p>Skills</p>
                                            <p>Skills</p>
                                        </div>
                                        <li>
                                            <p>45</p>
                                            <p>Weight</p>
                                        </li>
                                        <li>
                                            <p>45</p>
                                            <p>Height</p>
                                        </li>
                                        <li>
                                            <p>N/A</p>
                                            <p>Gender</p>
                                        </li>
                                        <li>
                                            <p>0</p>
                                            <p>Children</p>
                                        </li>
                                        <li>
                                            <p>Single</p>
                                            <p>Civil status</p>
                                        </li>
                                    </div>
                                    <div className="bgtxt">
                                        <li>
                                            <p>Lamisahan</p>
                                            <p>Address</p>
                                        </li>
                                        <li>
                                            <p>Lamisahan</p>
                                            <p>Date of Birth</p>
                                        </li>
                                        <li>
                                            <p>Lamisahan</p>
                                            <p>Place of Birth</p>
                                        </li>
                                        <li>
                                            <p>Lamisahan</p>
                                            <p>Occupation</p>
                                        </li>
                                        <li>
                                            <p>Lamisahan</p>
                                            <p>Religion</p>
                                        </li>
                                    </div>
                                </section>
                                <section>
                                    <div className="edciHead">
                                        <div className="edciHeadIn">

                                            <button onClick={() => setEduc(true)} className={`${!isEduc ? 'off' : 'ined'}`}>Educational BG</button>
                                            <button onClick={() => setEduc(false)} className={`${isEduc ? 'off' : 'ined'}`}>Civic Involvement</button>
                                        </div>
                                    </div>
                                    <div className="edciBody">
                                        <div className={`${isEduc ? '' : 'ed'}`}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Level</th>
                                                        <th>School</th>
                                                        <th>Period of attend.</th>
                                                        <th>Year Graduate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024</td>
                                                        <td>2024</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024</td>
                                                        <td>2024</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024</td>
                                                        <td>2024</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={`${!isEduc ? '' : 'cv'}`}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Organization</th>
                                                        <th>Address</th>
                                                        <th>Date</th>
                                                        <th>Year Graduated</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024 - Jan 12 2025</td>
                                                        <td>2024</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024</td>
                                                        <td>2024</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024</td>
                                                        <td>2024</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024</td>
                                                        <td>2024</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Elementary</td>
                                                        <td>ZPPSU</td>
                                                        <td>May, 19 2024</td>
                                                        <td>2024</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </ol>
                </div>
            </div>
        </div>
    </>
}