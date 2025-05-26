
import { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';
import { motion as Motion } from 'framer-motion';
// import { AppContext } from "../context/AppContext"


import Create from './account/Create';
import Modify from './account/Modify';

export default function Accounts() {
    // const { token } = useContext(AppContext)

    const [pagination, setPagination] = useState({
        total_items: 0,
        total_pages: 0,
        current_page: 0,
    });

    const [action, setAction] = useState('close')
    const [data, setData] = useState([]);

    const [query, setQuery] = useState('');


    const handleDelete = async (id, name) => {
        const conf = prompt(`Type 'delete' to delete SKOfficial '${name}'?`);
        if (conf == 'delete') {

            try {
                const res = await axios.delete(`/api/deleteskaccount/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.errors) {
                    console.log(5555);

                } else {
                    console.log(111);
                    const updated = data
                        .map(group => ({
                            ...group,
                            skofficial: group.skofficial.filter(sk => sk.id !== id),
                        }))
                        .filter(group => group.skofficial.length > 0);
                    setData(updated);
                }
            } catch (err) {
                if (err.response && err.response.data.errors) {
                    console.log(5555);
                } else {
                    console.error('Unexpected error:', err);
                }
            }
        } else {
            return
        }
    }
    async function search(page = 1) {

        try {
            const res = await axios.post('/api/searchSkOfficial', { q: query, page: page });

            if (res.data.errors) {
                console.log(5555);

            } else {

                setData(res.data.data || []);
                setPagination(res.data.pagination)
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                console.log(5555);
            } else {
                // setErrors({ general: ['Something went wrong.'] });
                console.error('Unexpected error:', err);
            }
        }
    }
    useEffect(() => {
        search()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>
        <div className="mainAcc">

            <div className="headerTitleAcc">
                <div><img src={logo} alt="" /></div>
                <h2>SK Officials Accounts</h2>
            </div>
            <div className="bodyA">
                <div className="labHead">
                    <li><button onClick={() => setAction(<Create setAction={setAction} />)}><i className="fas fa-plus"></i> Create</button></li>
                    <li><i className="fas fa-search"></i><input type="search" id='query'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && search()}
                        placeholder='Search here...' /></li>
                </div>
                <div className="allAccount">
                    {data.map((item, index) => (
                        item.skofficial.map((sk) => (
                            <Motion.ol key={`${sk.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: index * .2,
                                    duration: .6,
                                }}>
                                <ul className='info1'>
                                    <div className="headname">
                                        <li><i className="fas fa-hat-cowboy"></i></li>
                                        <li>
                                            <p>{sk.user.userName}</p>
                                            <p>{sk.position}</p>
                                        </li>
                                    </div>
                                    <div className="nameO">
                                        <p>{sk.name}</p>
                                        <p>{sk.user.email}</p>
                                    </div>
                                </ul>
                                <ul className='info2'>
                                    <li>
                                        <p>{sk.inserted_youth_count}</p>
                                        <p>Inserted</p>
                                    </li>
                                    <li>
                                        <i className="fas fa-pen" onClick={() => setAction(<Modify id={sk.id} setAction={setAction} />)} ></i>
                                        <i className="fas fa-trash" onClick={() => handleDelete(sk.id, sk.user.userName)}></i>
                                    </li>
                                </ul>
                            </Motion.ol>
                        ))))}
                        {!data.data ? <p>No accounts..</p>: ""}



                </div>
                {action}
            </div>
        </div>

    </>
}