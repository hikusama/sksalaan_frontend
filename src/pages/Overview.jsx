
import { useEffect, useState } from "react";
import Cards from "./overview/Cards.jsx";




export default function Overview() {

    const [filterState, setFilterState] = useState(0)
    const [picked, setPick] = useState('')
    const [isFilterOn, setOnFilter] = useState(false)
    const [sex, setSex] = useState(
        [{ name: 'Male', value: 24 },
        { name: 'Female', value: 44 },]
    );

    const [gender, setGender] = useState(
        [
            { name: 'Gay', value: 16 },
            { name: 'Bi-sexual', value: 8 },
            { name: 'Bading', value: 12 },
            { name: 'N/A', value: 42 },
            { name: 'Others', value: 12 },
        ]
    );
    const [age, setAge] = useState(
        [
            { name: '15-19', value: 16 },
            { name: '20-24', value: 42 },
            { name: '25-30', value: 12 },
        ]
    );
    const [youthType, setYouthType] = useState(
        [
            { name: 'OSY', value: 26 },
            { name: 'ISY', value: 22 },
        ]
    );
    useEffect(() => {
        switch (filterState) {
            case 1:
                setPick(<div className="sx">
                    <p>Sex type</p>
                    <li>Male</li>
                    <li>Female</li>
                    <button className="bsub">Submit</button>

                </div>)
                break;
            case 2:
                setPick(<div className="gn">
                    <p>Gender type</p>
                    <li>N/A</li>
                    <li>Others</li>
                    <button className="bsub">Submit</button>
                </div>)
                break;
            case 3:
                setPick(<div className="yt">
                    <p>Youth type</p>
                    <li>OSY</li>
                    <li>ISY</li>
                    <button className="bsub">Submit</button>
                </div>)
                break;
            case 4:
                setPick(<div className="cs">
                    <p>Civil stat. type</p>
                    <li>Single</li>
                    <li>Married</li>
                    <li>Divorce</li>
                    <button className="bsub">Submit</button>

                </div>)
                break;
            case 5:
                setPick(<div className="ag">
                    <p>Age range</p>
                    <ol>
                        <div>
                            <label htmlFor="fr">Starting at</label>
                            <input id="fr" placeholder="Start" type="number" min={15} max={30} />
                        </div>
                        <div>
                            <label htmlFor="ed">End</label>
                            <input placeholder="End" id="ed" type="number" min={15} max={30} />
                        </div>
                        <button className="bsub">Submit</button>
                    </ol>
                </div>)
                break;
            default:
                setPick('')
                break;

        }
    }, [filterState]);
    return <>
        <div id="overview">
            <div className="bartop">
                <h3><span>Over</span>view</h3>
                <div className="last">
                    <i className="fas fa-bell" title="Bulk logs"></i>
                </div>
            </div>
            <div className="shid"></div>

            <div id="overviewInner">
                <div className="ovTop">

                    <div className="hmap">
                        <div className="headMap">
                            <h2><span>Salaan</span> Heatmap</h2>
                            <div className="fl">
                                <p className="filnm" onClick={() => { isFilterOn ? setOnFilter(false) : setOnFilter(true) }}>
                                    <i className="fas fa-list"></i> Filter
                                </p>

                                {
                                    !isFilterOn ? "" : <>
                                        <div className="filterpane">
                                            <div className="sidepick">
                                                {isFilterOn && picked}
                                                {/* <div className="gn">
                                                    <li>N/A</li>
                                                    <li>Others</li>
                                                </div>
                                                <div className="ag">
                                                    <li><input placeholder="From" type="number" /></li>
                                                    <li><input placeholder="To" type="number" /></li>
                                                </div> */}
                                            </div>
                                            <section>
                                                <h4 className="b454">Choose to filter</h4>
                                                <div className="chfilt">
                                                    <li className={filterState === 1 && 'onFilter'} onClick={() => filterState != 1 ? setFilterState(1) : setFilterState(0)}>Sex <i className="fas fa-angle-right"></i></li>
                                                    <li className={filterState === 2 && 'onFilter'} onClick={() => filterState != 2 ? setFilterState(2) : setFilterState(0)}>Gender <i className="fas fa-angle-right"></i></li>
                                                    <li className={filterState === 3 && 'onFilter'} onClick={() => filterState != 3 ? setFilterState(3) : setFilterState(0)}>Youth type <i className="fas fa-angle-right"></i></li>
                                                    <li className={filterState === 4 && 'onFilter'} onClick={() => filterState != 4 ? setFilterState(4) : setFilterState(0)}>Civil status <i className="fas fa-angle-right"></i></li>
                                                    <li className={filterState === 5 && 'onFilter'} onClick={() => filterState != 5 ? setFilterState(5) : setFilterState(0)}>Age <i className="fas fa-angle-right"></i></li>
                                                </div>
                                                <div className="filterbych">
                                                    <h4>Filtered</h4>
                                                    <div className="contfil">
                                                        <ul>
                                                            <div>
                                                                <p>Sex</p>
                                                                <p>Male</p>
                                                            </div>
                                                            <i className="fas fa-plus"></i>
                                                        </ul>
                                                        <ul>
                                                            <div>

                                                                <p>Gender</p>
                                                                <p>Others</p>
                                                            </div>
                                                            <i className="fas fa-plus"></i>
                                                        </ul>
                                                        <ul>
                                                            <div>

                                                                <p>Type</p>
                                                                <p>OSY</p>
                                                            </div>
                                                            <i className="fas fa-plus"></i>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </section>

                                        </div>
                                    </>
                                }
                            </div>
                        </div>

                        <div className="salaanmap">
                            <div className="cir1"></div>
                            <div className="cir2"></div>
                            <div className="sq2"></div>
                            <div className="mapCont">
                                
                            </div>
                        </div>
                    </div>
                    <div className="hmapSum">
                        <h3>Summary</h3>
                        <table>
                            <thead >
                                <tr>
                                    <th>Address</th>
                                    <th>Youth</th>
                                    <th>Filtered</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Zone 1</td>
                                    <td>350</td>
                                    <td>Male</td>
                                </tr>
                                <tr>
                                    <td>Zone 3</td>
                                    <td>25</td>
                                    <td>Male</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="ovCardYouth">
                    <ol>
                        <h3>Sex</h3>
                        <section>
                            <Cards data={sex} />
                        </section>
                    </ol>
                    <ol>
                        <h3>Gender</h3>
                        <section>

                            <Cards data={gender} />
                        </section>
                    </ol>
                    <ol>
                        <h3>Age</h3>
                        <section>
                            <Cards data={age} />

                        </section>
                    </ol>
                    <ol>
                        <h3>Youth type</h3>
                        <section>
                            <Cards data={youthType} />
                        </section>
                    </ol>
                </div>

            </div>
        </div>
    </>
}