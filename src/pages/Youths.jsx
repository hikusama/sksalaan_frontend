import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import FormAdd from './youth/youthAdd';


export default function Youths() {



    const [tabClick, setTabIsClicked] = useState(1);
    const [isAddOpen, setAddOpen] = useState(false);




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
                        <input type="search" placeholder='Search here....' />
                    </li>
                </ol>
            </div>

    } else if (tabClick === 2) {
        //  
        typeTab =
            <div className="action">
                <ol>
                    <li className='mod'><i className="fas fa-pen"></i></li>
                    <li className='del'><i className="fas fa-trash"></i></li>
                    <li className='view'><i className="fas fa-info"></i></li>
                </ol>
                <h4>Delete</h4>
            </div>
    } else if (tabClick === 3) {
        //
        typeTab =
            <div className="add">
                {/* <button id='addYouth'> 
                    <i className="fas fa-plus"></i>
                    <h4>Add</h4>
                </button> */}
                <FormAdd step={isAddOpen} setStep={setAddOpen} />
            </div>

    }
    return <>
        <div id="youths">
            <div className={`youthHead ${isAddOpen ? 'youthHeadOpen' : ''}`}>
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
                {/*  */}
            </div>
        </div>

    </>
}
