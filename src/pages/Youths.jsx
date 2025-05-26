import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import FormAdd from './youth/youthAdd';
import { motion as Motion } from 'framer-motion';
import FormModify from './youth/youthModify';


export default function Youths() {
    const [isEduc, setEduc] = useState(true);
const previouslyActiveRef = useRef(null);

    const [pagination, setPagination] = useState({
        total_items: 0,
        total_pages: 0,
        current_page: 0,
    });
    const [sortBy, setSortBy] = useState('fname');
    const [modifyData, setModifyData] = useState('');
    const [isSearchOn, setSearchOn] = useState(false);
    const [ischangeDb, setVhangeDb] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [nxtPage, setNxtPage] = useState(<button onClick={() => search(pagination.current_page + 1)}><i className="fas fa-arrow-left"></i> Load more <i className="fas fa-arrow-right"></i></button>);
    const [query, setQuery] = useState('');
    const [typedQ, setTypeQ] = useState('');
    const [action, setTypeAction] = useState(null);
    const [actionState, setActionState] = useState(null);
    const [bgList, setBgList] = useState('white');

    const search = async (page = 1) => {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        setSearchOn(true)
        setSearchOn(false)
 

        const response = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ q: query, page: page, sortBy: sortBy }),
        });
        const data = await response.json();

        if (response.ok) {
            setIsLoading(false)

            if (data.data) {
                if (page > 1) {
                    setData(prevData => [...prevData, ...data.data]);
                } else {
                    setData([])
                    setData(data.data)
                }
                setPagination(data.pagination)

            } else {
                setPagination({
                    total_items: 0,
                    total_pages: 0,
                    current_page: 0,
                })
            }
        }
    }





    const handleActionState = (state) => {
        if (actionState != state) {
            setActionState(state)
        } else {
            setActionState(null)
        }
        if (state == 1) {
            setTypeAction('modAction')
            setBgList('rgb(13 53 71 / 79%)')
        } else if (state == 2) {
            setTypeAction('delAction')
            setBgList('rgb(122 22 22 / 80%)')
        } else if (state == 3) {
            setTypeAction('viewAction')
            setBgList('rgb(9 53 50 / 80%)')
        }
    }
    const attemptingActionIn = (e) => {
        const closestItem = e.target.closest('ul');
        if (closestItem) {
            closestItem.style.backgroundColor = bgList;
            closestItem.classList.add('akika');
        }
    };

    const attemptingActionOut = (e) => {
        const closestItem = e.target.closest('ul');
        if (closestItem) {
            closestItem.style.backgroundColor = 'white';
            closestItem.classList.remove('akika');
        }
    };

    const [tabClick, setTabIsClicked] = useState(1);
    const [isAddOpen, setAddOpen] = useState(false);
    let labAction = ''
    if (actionState == 1) {
        labAction = 'Modify'
    } else if (actionState == 2) {
        labAction = 'Delete'
    } else if (actionState == 3) {
        labAction = 'View All Info.'
    }


    let typeTab =
        <div className="default">
            <ol>
                <img src={logo} alt="" className='ysklogo' />
                <h4>SK Youth records</h4>
            </ol>
            <ol className='searchYouth'>
                <li>
                    <i className="fas fa-search"></i>
                    <input type="search" placeholder='Search here....' />
                </li>
            </ol>
        </div>


    const deleteUser = async (id) => {

        // 
        let conf = prompt("Type 'delete' to complete.")

        if (conf?.trim().toLowerCase() === "delete") {
            setVhangeDb(true)

            const response = await fetch(`/api/youth/${id}`, {
                method: 'delete',
            });

            if (response.ok) {
                setTimeout(() => {
                    setVhangeDb(false)
                }, 3000);

                const updated = data
                    .map(group => ({
                        ...group,
                        youthUser: group.youthUser.filter(youth => youth.y_user.id !== id),
                    }))
                    .filter(group => group.youthUser.length > 0);

                setData(updated);
            }


        } else {
            setVhangeDb(false)
        }
    }
    const modifyUser = (youth) => {
        setModifyData(<FormModify step={isAddOpen} youthData={youth} setStep={setAddOpen} search={search} settab={setTabIsClicked}/>)
        handleTabClick(4);
    }

    const viewUser = (elementId) => {
        const el = document.getElementById(elementId);

        const prevId = previouslyActiveRef.current;

        if (prevId) {
            const prevEl = document.getElementById(prevId);
            prevEl?.classList.remove('infoView');

            if (prevId === elementId) {
                previouslyActiveRef.current = null;
                console.log('Toggled off:', prevId);
                return;
            }
        }

        if (el) {
            el.classList.add('infoView');
            previouslyActiveRef.current = elementId;
            console.log('Activated:', elementId);
        }
    };


    const handleTabClick = (tabnum) => {
        setTabIsClicked(tabnum)
    }
    useEffect(() => {
        if (tabClick === 3 || tabClick === 4) {
            setAddOpen(true);
        } else {
            setAddOpen(false);
        }
    }, [tabClick]);
    if (tabClick === 1) {
        // 
        typeTab =
            <div className="default">
                <ol>
                    <img src={logo} alt="" className='ysklogo' />
                    <h4>SK Youth records</h4>
                </ol>
                <ol className='searchYouth'>
                    <li>
                        <i className="fas fa-search"></i>
                        <input type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setTypeQ(e.target.value)
                                    setQuery(e.target.value)
                                    search();
                                }
                            }
                            }
                            placeholder='Search here....' />
                    </li>
                </ol>
            </div>

    } else if (tabClick === 2) {
        //  
        typeTab =
            <div className="action">
                <ol>
                    <li className={`mod ${actionState == 1 && 'selectedAction'}`} onClick={() => handleActionState(1)}><i className="fas fa-pen"></i></li>
                    <li className={`del ${actionState == 2 && 'selectedAction'}`} onClick={() => handleActionState(2)}><i className="fas fa-trash"></i></li>
                    <li className={`view ${actionState == 3 && 'selectedAction'}`} onClick={() => handleActionState(3)}><i className="fas fa-info"></i></li>
                </ol>
                <div className="actlab">
                    <h4>{labAction}</h4>
                </div>
            </div>
    } else if (tabClick === 3) {
        //
        typeTab = <FormAdd step={isAddOpen} setStep={setAddOpen} search={search} settab={setTabIsClicked} />
    } else if (tabClick === 4) {
        // typeTab = <FormModify step={isAddOpen} setStep={setAddOpen} search={search} settab={setTabIsClicked} />
        typeTab = modifyData

    }
    let count = 1;
    // useEffect(() => {
    //     search()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        search()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy]);

    useEffect(() => {
        if (!data.length || !data[0].youthUser) {
            setNxtPage(<p>No records found.</p>);
        } else if (pagination.total_pages === pagination.current_page) {
            setNxtPage(<p><i className="fas fa-thumbs-up"></i> You're all caught up</p>);
        } else {
            setNxtPage(
                <button onClick={() => search(pagination.current_page + 1)}>
                    <i className="fas fa-arrow-left"></i> Load more <i className="fas fa-arrow-right"></i>
                </button>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, pagination]);
    return <>

        <div id="youths" className={`  ${isAddOpen ? 'youthHeadOpen' : ''}`} onClick={() => viewUser(previouslyActiveRef.current)}>
            <div className={`youthHead`}>
                <div className="tabButton">
                    <li className={tabClick == 1 ? 'onTab' : ''} onClick={() => handleTabClick(1)}><i className="fas fa-search"></i><p>Find Youth</p></li>
                    <li className={tabClick == 2 ? 'onTab' : ''} onClick={() => handleTabClick(2)}><i className="fas fa-bolt "></i><p>Actions</p></li>
                    <li className={tabClick == 3 ? 'onTab' : ''} onClick={() => handleTabClick(3)}><i className="fas fa-plus"></i><p>Add Youth</p></li>
                    <li className={`editMode ${tabClick == 4 ? 'onTab' : ''}`} ><i className="fas fa-pen"></i></li>
                </div>

                <div className="viewBody">
                    {typeTab}
                </div>
            </div>


            <div className="youthBody">
                <div className="ybodyHeader">
                    <h2>Records </h2>
                    <p className='resultSearchCount'>
                        {pagination.total_items} <strong>Results</strong> {typedQ != "" ? (<>for <span>{typedQ}:</span></>) : ""}
                    </p>
                    <label className='hres' htmlFor='sortBySelect'>

                        <li>{`Page ${pagination.current_page} of ${pagination.total_pages}`}</li>
                        <li className='surt'>
                            <p><i className="fas fa-list"></i> Sort by:
                                <select id='sortBySelect' className='sortBy' value={sortBy} onChange={(e) => {
                                    setSortBy(e.target.value)

                                }}>
                                    <option value="fname">Given name</option>
                                    <option value="lname">Family name</option>
                                    <option value="age">Age</option>
                                    <option value="created_at">Created</option>
                                </select>
                            </p>
                        </li>
                    </label>
                    {ischangeDb ? (<>
                        <div className={`responseAction`}>
                            <ul><i className="fas fa-check"></i></ul>
                            <ul>
                                <p>Deleted Successfully</p>
                            </ul>
                        </div></>) : ''}

                </div>
                <div className="youthList" onClick={(e)=>e.stopPropagation()}>
                    {isLoading && typedQ.trim() == "" ? <p className='sfor'><i className="fas fa-spinner fa-spin"></i> Fetching.....</p> : ''}
                    {isLoading && typedQ.trim() != "" ? <p className='sfor'><i className="fas fa-spinner fa-spin"></i> Searching.....</p> : ''}

                    {isSearchOn ? "" :
                        (<>
                            {data.map((item, idx) =>
                                item.youthUser.map((youth) => (
                                    <Motion.ol key={`${idx}-${count}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: count * .2,
                                            duration: .6,
                                        }}
                                        id={`infoView${idx}`} className={isLoading ? 'isloadOp' : ''}   >
                                        <ul>


                                            <section>
                                                <div className={actionState != null ? action : ''}>
                                                    <i className="fas fa-trash" onClick={() => deleteUser(youth.y_user.id,)} onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
                                                    <i className="fas fa-pen" onClick={() => modifyUser(youth)} onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
                                                    <i className="fas fa-info" onClick={() => viewUser('infoView' + idx)} onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
                                                </div>
                                                <li>
                                                    <p>#</p>
                                                    <p>{count++}</p>
                                                </li>
                                                <li>
                                                    <p>Name</p>
                                                    <p>{`${youth.lname}, ${youth.fname} ${youth.mname?.charAt(0)}. `}</p>
                                                </li>
                                                <li>
                                                    <p>Type</p>
                                                    <p>{youth.y_user.youthType}</p>
                                                </li>
                                                <li>
                                                    <p>Age</p>
                                                    <p>{youth.age}</p>
                                                </li>
                                                <li>
                                                    <p>Contact</p>
                                                    <p>0{youth.contactNo}</p>
                                                </li>
                                                <li>
                                                    <p>Created</p>
                                                    <p>{new Date(youth.created_at).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}</p>
                                                </li>
                                            </section>
                                            <div className="prk"></div>

                                            <div className={`skills_list`}>
                                                <h4>Skills</h4>
                                                <p>{youth.y_user.skills.replace(/,\s*/g, ", ")}</p>
                                            </div>
                                        </ul>

                                        <div className="information" onClick={(e) => e.stopPropagation()}>
                                            <div className="ivSh">

                                                <div className="infoHead">
                                                    <section>
                                                        <li>
                                                            <h3>{youth.fname}</h3>
                                                            <p>Given</p>
                                                        </li>
                                                        <li>
                                                            <h3>{youth.mname}</h3>
                                                            <p>Middle</p>
                                                        </li>
                                                        <li>
                                                            <h3>{youth.lname}</h3>
                                                            <p>Last</p>
                                                        </li>
                                                    </section>
                                                </div>
                                                <div className={`informBody`}>
                                                    <section>
                                                        <div className="lt">
                                                            <div className="skillsL">
                                                                <p>{youth.y_user.skills.trim().replace(/,\s*/g, ", ") ?? 'no skills krazy dude'}</p>
                                                                <p>Skills</p>
                                                            </div>
                                                            <li>
                                                                <p>{youth.weight}</p>
                                                                <p>Weight</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.height}</p>
                                                                <p>Height</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.gender ?? 'N/A'}</p>
                                                                <p>Gender</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.noOfChildren ?? 0}</p>
                                                                <p>Children</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.civilStatus}</p>
                                                                <p>Civil status</p>
                                                            </li>
                                                        </div>
                                                        <div className="bgtxt">
                                                            <li>
                                                                <p>{youth.address}</p>
                                                                <p>Address</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.dateOfBirth}</p>
                                                                <p>Date of Birth</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.placeOfBirth}</p>
                                                                <p>Place of Birth</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.occupation ?? 'None'}</p>
                                                                <p>Occupation</p>
                                                            </li>
                                                            <li>
                                                                <p>{youth.religion}</p>
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
                                                                        {youth.y_user.educbg.map((ebg, idx2) => (
                                                                            <tr key={idx2}>
                                                                                <td>{ebg.level}</td>
                                                                                <td>{ebg.nameOfSchool}</td>
                                                                                <td>{
                                                                                    new Date(ebg.periodOfAttendance).toLocaleDateString('en-US', {
                                                                                        month: 'long',
                                                                                        day: 'numeric',
                                                                                        year: 'numeric'
                                                                                    })}</td>
                                                                                <td>{ebg.yearGraduate}</td>
                                                                            </tr>
                                                                        ))}
                                                                        {/* 
                                                                                                                                                {youth.y_user.educbg.map((ebg, idx2) => {
                                                                            
                                                                        {youth.y_user.educbg.map((ebg, idx2) => {
                                                                            <tr key={idx2}>
                                                                                <td>{ebg.level}</td>
                                                                                <td>{ebg.nameOfSchool}</td>
                                                                                <td>{ebg.periodOfAttendance}</td>
                                                                                <td>{ebg.yearGraduate}</td>
                                                                            </tr>
                                                                        })}
                                                                            
                                                                        })}
                                                                        */}
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
                                                                        {youth.y_user.civic_involvement.map((civ, idx2) => (
                                                                            <tr key={idx2}>
                                                                                <td>{civ.nameOfOrganization}</td>
                                                                                <td>{civ.addressOfOrganization}</td>
                                                                                <td>{`${new Date(civ.start).toLocaleDateString('en-US', {
                                                                                    month: 'long',
                                                                                    day: 'numeric',
                                                                                    year: 'numeric'
                                                                                })} - 
                                                                                ${new Date(civ.end).toLocaleDateString('en-US', {
                                                                                    month: 'long',
                                                                                    day: 'numeric',
                                                                                    year: 'numeric'
                                                                                })}`}
                                                                                </td>
                                                                                <td>{civ.yearGraduated}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    </Motion.ol>
                                ))
                            )}
                        </>)
                    }
                    <ul className={`nxtPage ${isLoading ? 'isloadOp' : ''}`}>
                        {nxtPage}
                    </ul>




                </div>
            </div>
        </div>

    </>
}
