
export default function Overview() {
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
                                <p>
                                    <i className="fas fa-list"></i> Filter by:
                                </p>
                                <div>
                                    <p className="lab">Gender</p>
                                    <p>Male</p>
                                </div>
                            </div>
                        </div>

                        <div className="salaanmap">
                            <div className="cir1"></div>
                            <div className="cir2"></div>
                            <div className="sq1"></div>
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
                                    <th>Filtered</th>
                                    <th>Youth</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Zone 1</td>
                                    <td>Male</td>
                                    <td>350</td>
                                </tr>
                                <tr>
                                    <td>Zone 3</td>
                                    <td>Male</td>
                                    <td>25</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="ovOthers">
                    <ol>
                        <h3>Sex</h3>
                    </ol>
                    <ol>
                        <h3>Gender</h3>
                    </ol>
                    <ol>
                        <h3>Age</h3>
                    </ol>
                    <ol>
                        <h3>Youth type</h3>
                    </ol>
                </div>
            </div>
        </div>
    </>
}