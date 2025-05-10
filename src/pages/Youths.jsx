import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import FormAdd from './youth/youthAdd';


export default function Youths() {

    const [pagination, setPagination] = useState({
        total_items: 0,
        total_pages: 0,
        current_page: 0,
    });
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [action, setTypeAction] = useState(null);
    const [actionState, setActionState] = useState(null);
    const [bgList, setBgList] = useState('white');

    const search = async (page = 1) => {

        const response = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ q: query, perPage: 10, page: page }),
        });
        const data = await response.json();

        if (response.ok) {
            if (data.data) {
                setData(data.data)
            }
            setPagination(data.pagination)
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
        const closestItem = e.target.closest('ol');
        if (closestItem) {
            closestItem.style.backgroundColor = bgList;
            closestItem.classList.add('akika');
        }
    };

    const attemptingActionOut = (e) => {
        const closestItem = e.target.closest('ol');
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


    const deleteUser = (id) => {
        // 
    }
    const modifyUser = (id) => {
        // 
    }
    const viewUser = (id) => {
        // 
    }


    const handleTabClick = (tabnum) => {
        setTabIsClicked(tabnum)
    }
    useEffect(() => {
        if (tabClick === 3) {
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
                                    search();
                                }
                            }}
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
        typeTab = <FormAdd step={isAddOpen} setStep={setAddOpen} settab={setTabIsClicked} />


    }
    let count = 1;
    useEffect(() => {
        search()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return <>
        <div id="youths" className={`  ${isAddOpen ? 'youthHeadOpen' : ''}`}>
            <div className={`youthHead`}>
                <div className="tabButton">
                    <li className={tabClick == 1 ? 'onTab' : ''} onClick={() => handleTabClick(1)}><i className="fas fa-search"></i><p>Find Youth</p></li>
                    <li className={tabClick == 2 ? 'onTab' : ''} onClick={() => handleTabClick(2)}><i className="fas fa-bolt "></i><p>Actions</p></li>
                    <li className={tabClick == 3 ? 'onTab' : ''} onClick={() => handleTabClick(3)}><i className="fas fa-plus"></i><p>Add Youth</p></li>
                </div>

                <div className="viewBody">
                    {typeTab}
                </div>
            </div>


            <div className="youthBody">
                <div className="ybodyHeader">
                    <h2>Records </h2>
                    <p className='resultSearchCount'>
                        {pagination.total_items} <strong>Results</strong> for <span>{query}:</span>
                    </p>
                    <div className='hres'>

                        <li>{`Page ${pagination.current_page} of ${pagination.total_pages}`}</li>
                        <li>
                            <p><i className="fas fa-list"></i> Filter by: name </p>
                        </li>
                    </div>
                </div>
                <div className="youthList">

                    {data.map((item, idx) =>
                        item.youthUser.map((youth) => (
                            <ol key={`${idx}-${count}`}>
                                <section>
                                    <div className={actionState != null ? action : ''}>
                                        <i className="fas fa-trash" onClick={() => deleteUser(youth.y_user.id)} onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
                                        <i className="fas fa-pen" onClick={() => modifyUser(youth)} onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
                                        <i className="fas fa-info" onClick={() => viewUser(youth)} onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
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
                                        <p>{youth.youthType}</p>
                                    </li>
                                    <li>
                                        <p>Age</p>
                                        <p>{youth.age}</p>
                                    </li>
                                    <li>
                                        <p>Contact</p>
                                        <p>{youth.contactNo ?? "00"}</p>
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

                                <div className="skills_list">
                                    <h4>Skills</h4>
                                    <p>{youth.y_user.skills}</p>
                                </div>
                            </ol>
                        ))
                    )
                    }
                    <ul>
                        <button>Load more</button>
                    </ul>
                    {/* <ol >
                        <section>

                            <div className={actionState != null ? action : ''}>
                                <i className="fas fa-trash" onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
                                <i className="fas fa-pen" onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
                                <i className="fas fa-info" onMouseLeave={attemptingActionOut} onMouseEnter={attemptingActionIn}></i>
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
                        <div className="prk"></div>

                        <div className="skills_list">
                            <h4>Skills</h4>
                            <p>Electrical, Farming, Bullying</p>
                        </div>
                    </ol> */}


                </div>
            </div>
        </div>

    </>
}
