import { useEffect, useRef, useState } from "react"

import { motion as Motion } from 'framer-motion';




export default function PortalManage() {
    const [isEduc, setEduc] = useState(true);
    const [listPosition, setListPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const previouslyActiveRef = useRef(null);
    const [actionAsk, setActionAsk] = useState(false);
    const [query, setQuery] = useState('');
    const [ischangeDb, setVhangeDb] = useState(false);
    const [typedQ, setTypeQ] = useState('');
    const [nxtPage, setNxtPage] = useState(<button onClick={() => search(pagination.current_page + 1)}><i className="fas fa-arrow-left"></i> Load more <i className="fas fa-arrow-right"></i></button>);

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        total_items: 0,
        total_pages: 0,
        current_page: 0,
    });

    const deleteUser = async (id, elementId) => {

        let conf = '';
        if (!actionAsk) {
            conf = prompt("Type 'delete' to complete.")
        }
        console.log(elementId);


        if (conf?.trim().toLowerCase() === "delete" || actionAsk) {



            const response = await fetch(`/api/youth/${id}`, {
                method: 'delete',
            });

            if (response.ok) {
                setVhangeDb(true)
                document.getElementById(elementId).classList.add('delol')
                setTimeout(() => {
                    const updated = data
                        .map(group => ({
                            ...group,
                            youthUser: group.youthUser.filter(youth => youth.y_user.id !== id),
                        }))
                        .filter(group => group.youthUser.length > 0);
                    setData(updated);
                }, 1000);
                setTimeout(() => {
                    setVhangeDb(false)
                }, 3000);

            } else {
                setVhangeDb(false)
            }

        }
    }
    const actionHandle = () => {
        console.log(555);

        if (actionAsk) {
            console.log(44);
            localStorage.setItem('popaction', false)
            setActionAsk(false);
        } else {
            console.log(3);
            setActionAsk(true);
            localStorage.setItem('popaction', true)
        }
    }
    const search = async (page = 1) => {
        if (isLoading) {
            return
        }
        setIsLoading(true)


        const response = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ q: query, page: page, typeId: null }),
        });
        const data = await response.json();

        if (response.ok) {
            setIsLoading(false)

            if (data.data) {
                if (page > 1) {
                    setData(prevData => [...prevData, ...data.data]);
                } else {
                    // setData([])
                    setData(data.data)
                }
                setPagination(data.pagination)
                console.log(data);


            } else {
                setPagination({
                    total_items: 0,
                    total_pages: 0,
                    current_page: 0,
                })
            }
        }
    }


    const viewUser = (elementId) => {
        const el = document.getElementById(elementId);

        const prevId = previouslyActiveRef.current;

        if (prevId) {
            const prevEl = document.getElementById(prevId);
            prevEl?.classList.remove('infoView');

            if (prevId === elementId) {
                previouslyActiveRef.current = null;
                return;
            }
        }

        if (el) {
            el.classList.add('infoView');
            previouslyActiveRef.current = elementId;
        }
    };







    useEffect(() => {
        let action = localStorage.getItem('popaction')
        if (action === 'true') {
            setActionAsk(true)
        } else {
            setActionAsk(false)
        }
    }, [actionAsk]);
    useEffect(() => {
        search()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    let count = 1;

    return <>
        <div className="portalManage">
            {ischangeDb ? (<>
                <div className={`responseAction`}>
                    <ul><i className="fas fa-check"></i></ul>
                    <ul>
                        <p>Deleted Successfully</p>
                    </ul>
                </div></>) : ''}
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

                        <input placeholder="Search here...." onChange={(e) => setQuery(e.target.value)} value="" type="search" onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setTypeQ(e.target.value)
                                setQuery(e.target.value)
                                search();
                            }
                        }} />
                    </li>

                </div><div className="wrrmm">

                    <div className={`rmm ${actionAsk ? 'rbb' : 'tr'}`} >
                        <button onClick={actionHandle}></button> <p onClick={actionHandle}>Dont ask again.</p>
                    </div>
                </div>
                <div className="portalManageBody">
                    {isLoading && typedQ.trim() == "" ? <p className='sfor'><i className="fas fa-spinner fa-spin"></i> Fetching.....</p> : ''}
                    {isLoading && typedQ.trim() != "" ? <p className='sfor'><i className="fas fa-spinner fa-spin"></i> Searching.....</p> : ''}

                    {data.map((item, idx) =>
                        item.youthUser.map((youth) => (
                            <Motion.ol key={`${idx}-${count}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: count * .2,
                                    duration: .6,
                                }}
                                id={`infoView${idx}`}  >
                                <ul>
                                    <section>
                                        <div className="iport">
                                            <p>
                                                <i className="fas fa-info" onClick={() => viewUser('infoView' + idx)} ></i>
                                            </p>
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

                                    <div className="skills_list ar">
                                        <button>Approve</button>
                                        <button onClick={() => deleteUser(youth.y_user.id, `infoView${idx}`)}>Delete</button>
                                    </div>
                                </ul>
                                <div className="information" >
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
                                            <button>Approve</button>
                                            <button onClick={() => deleteUser(youth.y_user.id, `infoView${idx}`)}>Delete</button>
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
                                                    <p>{new Date(youth.dateOfBirth).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}</p>
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
                            </Motion.ol>

                        ))
                    )}
                    <ul className={`nxtPage ${isLoading ? 'isloadOp' : ''}`}>
                        {nxtPage}
                    </ul>
                </div>
            </div>
        </div >
    </>
}