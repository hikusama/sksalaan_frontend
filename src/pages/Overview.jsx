import { useEffect, useState } from "react";
import Cards from "./overview/Cards.jsx";

export default function Overview() {
    const [filterState, setFilterState] = useState(0);
    const [ageRange, setAgeRange] = useState({ start: '', end: '' });
    const [filters, setFilter] = useState({ sex: '', gender: '', age: '', type: '', cs: '' });
    const [filterValue, setFilterValue] = useState('');
    const [isFilterOn, setOnFilter] = useState(false);

    const [sex, setSex] = useState([
        { name: 'Male', value: 24 },
        { name: 'Female', value: 44 },
    ]);
    const [religion, setReligion] = useState([
        { name: 'Islam', value: 49 },
        { name: 'Christianity', value: 20 },
        { name: 'Others', value: 20 },
    ]);
    const [civilS, setCivilS] = useState([
        { name: 'Single', value: 20 },
        { name: 'Married', value: 49 },
        { name: 'Divorce', value: 20 },
        { name: 'Live-in', value: 1 },
    ]);
    const [gender, setGender] = useState([
        { name: 'Gay', value: 16 },
        { name: 'Bi-sexual', value: 8 },
        { name: 'Bading', value: 12 },
        { name: 'N/A', value: 42 },
        { name: 'Others', value: 12 },
    ]);
    const [age, setAge] = useState([
        { name: '15-19', value: 16 },
        { name: '20-24', value: 42 },
        { name: '25-30', value: 12 },
    ]);
    const [youthType, setYouthType] = useState([
        { name: 'OSY', value: 26 },
        { name: 'ISY', value: 22 },
    ]);

    useEffect(() => {
        if (!isFilterOn) {
            setFilterValue('');
            setFilterState(0);
            setAgeRange({ start: '', end: '' });
        }
    }, [isFilterOn]);

    const handleFilterSubmit = (key, value) => {
        setFilter(prev => ({ ...prev, [key]: value }));
        setFilterValue('');
        setFilterState('')
    };
    const removeFilter = (key) => {
        setFilter(prev => ({ ...prev, [key]: '' }));

    };

    const renderFilterOption = () => {
        switch (filterState) {
            case 1:
                return (
                    <div className="sx">
                        <p>Sex type</p>
                        {['Male', 'Female'].map(val => (
                            <li key={val} className={filterValue === val ? 'valset' : ''} onClick={() => setFilterValue(val)}>{val}</li>
                        ))}
                        <button className="bsub" onClick={() => handleFilterSubmit('sex', filterValue)}>Submit</button>
                    </div>
                );
            case 2:
                return (
                    <div className="gn">
                        <p>Gender type</p>
                        {['N/A', 'Others'].map(val => (
                            <li key={val} className={filterValue === val ? 'valset' : ''} onClick={() => setFilterValue(val)}>{val}</li>
                        ))}
                        <button className="bsub" onClick={() => handleFilterSubmit('gender', filterValue)}>Submit</button>
                    </div>
                );
            case 3:
                return (
                    <div className="yt">
                        <p>Youth type</p>
                        {['OSY', 'ISY'].map(val => (
                            <li key={val} className={filterValue === val ? 'valset' : ''} onClick={() => setFilterValue(val)}>{val}</li>
                        ))}
                        <button className="bsub" onClick={() => handleFilterSubmit('type', filterValue)}>Submit</button>
                    </div>
                );
            case 4:
                return (
                    <div className="cs">
                        <p>Civil stat. type</p>
                        {['Single', 'Married', 'Divorce'].map(val => (
                            <li key={val} className={filterValue === val ? 'valset' : ''} onClick={() => setFilterValue(val)}>{val}</li>
                        ))}
                        <button className="bsub" onClick={() => handleFilterSubmit('cs', filterValue)}>Submit</button>
                    </div>
                );
            case 5:
                return (
                    <div className="ag">
                        <p>Age range</p>
                        <ol>
                            <div>
                                <label>Starting at</label>
                                <select value={ageRange.start} onChange={(e) => setAgeRange({ ...ageRange, start: e.target.value })}>
                                    <option value="">Select</option>
                                    {[...Array(16)].map((_, i) => {
                                        const age = 15 + i;
                                        return <option key={age} value={age}>{age}</option>;
                                    })}
                                </select>
                            </div>
                            {ageRange.start && (
                                <div>
                                    <label>End</label>
                                    <select value={ageRange.end} onChange={(e) => setAgeRange({ ...ageRange, end: e.target.value })}>
                                        <option value="">Select</option>
                                        {[...Array(30 - parseInt(ageRange.start) + 1)].map((_, i) => {
                                            const age = parseInt(ageRange.start) + i;
                                            return <option key={age} value={age}>{age}</option>;
                                        })}
                                    </select>
                                </div>
                            )}
                            <button className="bsub" onClick={() => {
                                if (ageRange.start && ageRange.end) {
                                    handleFilterSubmit('age', `${ageRange.start}-${ageRange.end}`);
                                    setAgeRange({ start: '', end: '' });
                                }
                            }}>Submit</button>
                        </ol>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div id="overview">
            <div className="bartop">
                <h3><span>Over</span>view</h3>
                <div className="last">
                    <i className="fas fa-bell" title="Bulk logs"></i>
                </div>
            </div>
            <div id="overviewInner">
                <div className="ovTop">
                    <div className="hmap">
                        <div className="headMap">
                            <h2><span>Salaan</span> Heatmap</h2>
                            <div className="fl">
                                <p className="filnm" onClick={() => setOnFilter(prev => !prev)}>
                                    <i className="fas fa-list"></i> Filter
                                </p>
                                {isFilterOn && (
                                    <div className="filterpane">
                                        <div className={`sidepick ${filterState ? '' : 'nostate'}`}>{renderFilterOption()}</div>
                                        <section>
                                            <h4 className="b454">Choose to filter</h4>
                                            <div className="chfilt">
                                                {Object.entries({ 1: 'sex', 2: 'gender', 3: 'type', 4: 'cs', 5: 'age' }).map(([id, key]) => (
                                                    filters[key] === '' && (
                                                        <li
                                                            key={key}
                                                            className={filterState == id ? 'onFilter' : ''}
                                                            onClick={() => setFilterState(filterState != id ? parseInt(id) : 0)}>
                                                            {key.charAt(0).toUpperCase() + key.slice(1)} <i className="fas fa-angle-right"></i>
                                                        </li>
                                                    )
                                                ))}
                                            </div>
                                            <div className="filterbych">
                                                <h4>Filtered</h4>
                                                <div className="contfil">
                                                    {Object.entries(filters).map(([key, val]) => (
                                                        val && (
                                                            <ul key={key}>
                                                                <div>
                                                                    <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                                                    <p>{val}</p>
                                                                </div>
                                                                <i
                                                                    className="fas fa-plus"
                                                                    onClick={() => removeFilter(key)}
                                                                    style={{ cursor: 'pointer' }}
                                                                    title={`Remove ${key} filter`}
                                                                ></i>
                                                            </ul>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="salaanmap">
                            <div className="cir1"></div>
                            <div className="cir2"></div>
                            <div className="sq2"></div>
                            <div className="mapCont"></div>
                        </div>
                    </div>
                    <div className="hmapSum">
                        <h3>Summary</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Address</th>
                                    <th>Youth</th>
                                    <th>Filtered</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Zone 1</td><td>350</td><td>Male</td></tr>
                                <tr><td>Zone 3</td><td>25</td><td>Male</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="ovCardYouth">
                    <ol><h3>Sex</h3><section><Cards data={sex} /></section></ol>
                    <ol><h3>Gender</h3><section><Cards data={gender} /></section></ol>
                    <ol><h3>Age</h3><section><Cards data={age} /></section></ol>
                    <ol><h3>Youth type</h3><section><Cards data={youthType} /></section></ol>
                    <ol><h3>Religion</h3><section><Cards data={religion} /></section></ol>
                    <ol><h3>Civil status</h3><section><Cards data={civilS} /></section></ol>
                </div>
            </div>
        </div>
    );
}
