import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';


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

function FormAdd({ isAddOpen, setAddOpen }) {
    const [step, setStep] = useState(1);
    let stepContent = <>
        <h4>first step</h4>
    </>
    if (step === 1) {
        stepContent = <h4>First step</h4>;
    } else if (step === 2) {
        stepContent = <h4>Second step</h4>;
    } else if (step === 3) {
        stepContent = <h4>Third step</h4>;
    } else if (step === 4) {
        stepContent = <h4>Last step</h4>;
    }


    return <>
        <div className="stepsHeader">
            <h2><i className="fas fa-plus"></i> Register Youth</h2>
            <div className="steps">
                <ol className="step1 onStep" onClick={() => setStep(1)}>1</ol>
                <div className={`line s1`}><li><p className={`${step >= 2 ? 'onStepLine' : ''}`}></p></li></div>
                <ol className={`step2 ${step >= 2 ? 'onStep' : ''}`} onClick={() => setStep(2)}>2</ol>
                <div className={`line s2`}><li><p className={`${step >= 3 ? 'onStepLine' : ''}`}></p></li></div>
                <ol className={`step3 ${step >= 3 ? 'onStep' : ''}`} onClick={() => setStep(3)}>3</ol>
                <div className={`line s34`}><li><p className={`${step === 4 ? 'onStepLine' : ''}`}></p></li></div>
                <ol className={`step4 ${step === 4 ? 'onStep' : ''}`} onClick={() => setStep(4)}>4</ol>
            </div>
        </div>
        <div className="formBody">
            <form >
                <div className="formBodyInner">
                    <div className={`${step === 1 ? "showContent" : ""} `}>
                        <div className="fCont">
                            <div className="firstSection">
                                <div>
                                    <label htmlFor="fn">First Name</label>
                                    <input type="text" id='fn' placeholder='First name' />
                                </div>
                                <div>
                                    <label htmlFor="fn">First Name</label>
                                    <input type="text" id='fn' placeholder='Middle name' />
                                </div>
                                <div>
                                    <label htmlFor="fn">First Name</label>
                                    <input type="text" id='fn' placeholder='Last name' />
                                </div>
                            </div>
                            <div className="secondSection">

                                <div>
                                    <label htmlFor="age">Age</label>
                                    <input type="number" id='age' min={0} max={30} placeholder='Age' />
                                </div>
                                <div className="ssSec">
                                    <div>
                                        <label htmlFor="fn">Sex</label>
                                        <select id="fn" >
                                            <option value=""><p>Sex</p></option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="fn">Gender</label>
                                        <select id="fn" >
                                            <option value="">Gender</option>
                                            <option value="butterfly">butterfly</option>
                                            <option value="dinosour">dinosour</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="textAdr">
                                    <label htmlFor="fn">Address</label>
                                    <select >
                                        <option value="">Address</option>
                                        <option value="tiktapul">tiktapul</option>
                                        <option value="deadsea">deadsea</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${step === 2 ? "showContent" : ""} `}>
                        <div className="sCont">
                            <section>
                                <div>
                                    <label htmlFor="">Youth Type</label>
                                    <select >
                                        <option value="">Youth Type</option>
                                        <option value="ISY">ISY</option>
                                        <option value="OSY">OSY</option>
                                    </select>
                                </div>
                                <div className='skl'>
                                    <label htmlFor="sk">Skills</label>
                                    <input type="text" id='sk' placeholder='Skills' />
                                    <i className="fas fa-plus"></i>
                                </div>
                                <div className="skillsList">
                                    <ol>
                                        <li>1</li>
                                        <li>Electrical</li>
                                        <li><i className="fas fa-trash"></i></li>
                                    </ol>
                                    <ol>
                                        <li>2</li>
                                        <li>Electrical</li>
                                        <li><i className="fas fa-trash"></i></li>
                                    </ol>
                                    <ol>
                                        <li>3</li>
                                        <li>Electrical</li>
                                        <li><i className="fas fa-trash"></i></li>
                                    </ol>
                                </div>
                            </section>
                            <section>
                                <div>
                                    <label htmlFor="db">Date of Birth</label>
                                    <input id='db' type="date" placeholder='Date of birth' />
                                </div>
                                <div>
                                    <label htmlFor="pb">Place of Birth</label>
                                    <textarea id='pb' placeholder='Place of Birth' ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="nc">No. of children</label>
                                    <input type="number" id='nc' min={0} placeholder='No. of children (optional)' />
                                </div>
                            </section>
                            <section>
                                <div>
                                    <label htmlFor="hh">Height</label>
                                    <input type="number" min={0} id='hh' placeholder='Height' />
                                </div>
                                <div>
                                    <label htmlFor="wh">Weight</label>
                                    <input type="number" min={0} id='wh' placeholder='Weight' />
                                </div>
                                <div>
                                    <label htmlFor="">Civil Status</label>
                                    <select >
                                        <option value="">Civil status</option>
                                        <option value="single">Single</option>
                                        <option value="divorce">Divorce</option>
                                        <option value="outside-marriage">Outside-marriage</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="oc">Occupation</label>
                                    <textarea id='oc' placeholder='Occupation (optional)' ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="">Religion</label>
                                    <select >
                                        <option value="">Religion</option>
                                        <option value="islam">Islam</option>
                                        <option value="christianity">Christianity</option>
                                        <option value="agnostic">Agnostic</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                            </section>
                        </div>
                    </div>
                    <div className={`${step === 3 ? "showContent" : ""} `}>
                        <div className="tCont">
                            <section>
                                <div className="HeaderC">

                                    <div>
                                        <label htmlFor="sl">School level</label>
                                        <select >
                                            <option value="">School level</option>
                                            <option value="Elementary">Elementary</option>
                                            <option value="HighSchool">High School</option>
                                            <option value="college">College</option>
                                        </select>                                </div>
                                    <div>
                                        <label htmlFor="ns">Name of School</label>
                                        <input type="text" id='ns' placeholder='Name of School' />
                                    </div>
                                    <div>
                                        <label htmlFor="poa">Period of Attendance</label>
                                        <input type="text" id='poa' placeholder='Period of Attendance' />
                                    </div>
                                    <div>
                                        <label htmlFor="yg">Yeak Graduate</label>
                                        <input type="text" id='yg' placeholder='Yeak Graduate' />
                                    </div>
                                </div>
                                <div className="addCivic">
                                    <button>Add</button>
                                </div>
                                <div className="educbgCont">
                                    <ol>
                                        <li>School Level</li>
                                        <li>Elementary</li>
                                        <li>High School</li>
                                        <li>College</li>
                                    </ol>
                                    <ol>
                                        <li>Name of School</li>
                                        <li>Magsaysay</li>
                                        <li></li>
                                        <li></li>
                                    </ol>
                                    <ol>
                                        <li>Period of Attendance</li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ol>
                                    <ol>
                                        <li>Year Graduate</li>
                                        <li>2014</li>
                                        <li></li>
                                        <li></li>
                                    </ol>


                                </div>

                            </section>
                        </div>
                    </div>
                    <div className={` ${step === 4 ? "showContent" : ""} `}>
                        <div className="frtCont">
                            <section>
                                <div className="HeaderC">

                                    <div>
                                        <label htmlFor="org">Organization</label>
                                        <input type="text" id='org' placeholder='Organization' />
                                    </div>
                                    <div>
                                        <label htmlFor="adrs">Address</label>
                                        <input type="text" id='adrs' placeholder='Address' />
                                    </div>
                                    <div className="daterange">
                                        <div>
                                            <label htmlFor="st">Start</label>
                                            <input type="date" id='st' placeholder='Start' />
                                        </div>
                                        <div>
                                            <label htmlFor="end">End</label>
                                            <input type="date" id='end' placeholder='End' />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="ygorg">Year Graduated</label>
                                        <input type="text" id='ygorg' placeholder='Year Graduated' />
                                    </div>
                                </div>
                                <div className="addCivic">
                                    <button>Add</button>
                                </div>
                                <div className="civicCont">
                                    <ol>
                                        <li>School Level</li>
                                        <li>Elementary</li>
                                        <li>High School</li>
                                        <li>College</li>
                                    </ol>
                                    <ol>
                                        <li>Name of School</li>
                                        <li>Magsaysay</li>
                                        <li></li>
                                        <li></li>
                                    </ol>
                                    <ol>
                                        <li>Period of Attendance</li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ol>
                                    <ol>
                                        <li>Year Graduate</li>
                                        <li>2014</li>
                                        <li></li>
                                        <li></li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </div>
                    {stepContent}

                </div>
            </form>
        </div>
        <div className="actionStepper">
            <button onClick={() => step > 1 && setStep(step - 1)} className={step === 1 ? 'op' : ''}>Back</button>
            <button onClick={() => step < 4 && setStep(step + 1)}>{step === 4 ? 'Finish-up' : 'Next' }</button>
        </div>









        {/* <form >

            <div className="formmBody">
                <div>
                    <input type="text" placeholder='First name' />
                </div>
                <div>
                    <input type="text" placeholder='Middle name' />
                </div>
                <div>
                    <input type="text" placeholder='Last name' />
                </div>
                <div>
                    <input type="text" placeholder='First name' />
                </div>
            </div>
        </form> */}
    </>
}