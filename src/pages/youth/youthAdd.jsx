import { useEffect, useState } from "react";
// { isAddOpen, setAddOpen }
export default function FormAdd() {
    // const [isS1FormPass, setS1FormPass] = useState(false);
    // const [isS2FormPass, setS2FormPass] = useState(false);
    // const [isS3FormPass, setS3FormPass] = useState(false);
    // const [isS4FormPass, setS4FormPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isNext, setIsNext] = useState("Next");
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({})

    const [civic, setCivic] = useState([])
    const [educBg, setEducBg] = useState([])
    const [skills, setSkills] = useState([])
    const [inputSkill, setInputSkill] = useState("");

    const addSkill = () => {
        const trimmed = inputSkill.trim();
        if (trimmed) {
            setSkills(prev => [...prev, trimmed]);
            setInputSkill("");
        }
    };


    const [educbgForm, setEducBgForm] = useState({
        level: '',
        nameOfSchool: '',
        periodOfAttendance: '',
        yearGraduate: '',
    })

    const [civicForm, setCivicForm] = useState({
        nameOfOrganization: '',
        addressOfOrganization: '',
        start: '',
        end: '',
        yearGraduated: '',
    })

    const removeSkill = (indexToRemove) => {
        setSkills(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const addEducBg = () => {
        const errorsObj = {};
    
        if (educbgForm.level.trim() === "") {
            errorsObj.level = 'This field is empty.';
        }
    
        if (educbgForm.nameOfSchool.trim() === "") {
            errorsObj.nameOfSchool = 'This field is empty.';
        }
        if (educbgForm.periodOfAttendance.trim() === "") {
            errorsObj.periodOfAttendance = 'This field is empty.';
        }
        if (educbgForm.yearGraduate.trim() === "") {
            errorsObj.yearGraduate = 'This field is empty.';
        }
    
        if (Object.keys(errorsObj).length > 0) {
            setErrors(errorsObj);
            return;
        }
    
        setEducBg(prev => [...prev, educbgForm]);
        setErrors({});
        setEducBgForm({
            level: '',
            nameOfSchool: '',
            periodOfAttendance: '',
            yearGraduate: '',
        });
    };
    
    const [formDataS1, setFormdataS1] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        address: "",
        sex: "",
        age: "",
        gender: ""
    })

    const [formDataS2, setFormdataS2] = useState({
        youthType: '',
        dateOfBirth: '',
        placeOfBirth: '',
        noOfChildren: '',
        height: '',
        weight: '',
        civilStatus: '',
        occupation: '',
        religion: '',
        skills: []
    })

    const [formDataS3, setFormdataS3] = useState({
        educbgArray: []
    })




    async function validate(url, form, e) {
        const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify(form),
        });
        const data = await res.json()

        if (data.errors) {
            setErrors(data.errors)
        } else {
            setErrors({})
            // setS1FormPass(true)
            setStep(e)
        }
        setIsLoading(false)
        console.log(data);
    }



    let optEducbg = <option value="">Max</option>
    let addeducbgButton = <button onClick={addEducBg}>Add</button>
    if (educBg.length === 0) {
        optEducbg = <option value="Elementary">Elementary</option>
    } else if (educBg.length === 1) {
        optEducbg = <option value="HighSchool">High School</option>
    } else if (educBg.length === 2) {
        optEducbg = <option value="College">College</option>
    } else {
        optEducbg = <option value="">Max</option>
        addeducbgButton = ""
    }



    function changeStep(e) {
        if (isLoading) return;
        if (e < 1 || e > 5) {
            return
        }
        setIsLoading(true)
        if (step === 1) {
            validate('/api/vals1', formDataS1, e)
        } else if (step === 2) {
            validate('/api/vals2', formDataS2, e)
        } else if (step === 3) {
            validate('/api/vals3', formDataS3, e)
        } else if (step === 4) {
            // validate('/api/vals4', formDataS4, e)

        }

    }
    // useEffect(() => {
    //     setFormdataS2(prev => ({
    //       ...prev,
    //       educBg: educBg
    //     }));
    //   }, [civic]);
    useEffect(() => {
        setFormdataS3(prev => ({
            ...prev,
            educBg: educBg
        }));
    }, [educBg]);
    useEffect(() => {
        setFormdataS2(prev => ({
            ...prev,
            skills: skills
        }));
    }, [skills]);

    useEffect(() => {
        if (isLoading) {
            setIsNext(<i className="fas fa-spinner fa-spin"></i>);
        } else {
            setIsNext(step === 5 ? 'Confirm' : 'Next');
        }
    }, [isLoading, step]);

    return <>
        <div className="stepsHeader">
            <h2><i className="fas fa-plus"></i> Register Youth</h2>
            <div className="steps">
                <ol className="step1 onStep" onClick={() => setStep(1)}>1</ol>
                <div className={`line s1`}><li><p className={`${step >= 2 ? 'onStepLine' : ''}`}></p></li></div>
                <ol className={`step2 ${step >= 2 ? 'onStep' : ''}`} onClick={() => setStep(2)}>2</ol>
                <div className={`line s2`}><li><p className={`${step >= 3 ? 'onStepLine' : ''}`}></p></li></div>
                <ol className={`step3 ${step >= 3 ? 'onStep' : ''}`} onClick={() => setStep(3)}>3</ol>
                <div className={`line s34`}><li><p className={`${step >= 4 ? 'onStepLine' : ''}`}></p></li></div>
                <ol className={`step4 ${step >= 4 ? 'onStep' : ''}`} onClick={() => setStep(4)}>4</ol>
                <div className={`line s35`}><li><p className={`${step === 5 ? 'onStepLine' : ''}`}></p></li></div>
                <ol className={`step5 ${step === 5 ? 'onStep' : ''}`}><i className='fas fa-check'></i></ol>
            </div>
        </div>

        <div className="formBody">
            <div className='wform'>
                <div className="formBodyInner">

                    <div className={`${step === 1 ? "showContent" : ""} `}>
                        <div className="fCont">
                            <div className="firstSection">
                                <div>
                                    <label htmlFor="fn">First Name</label>
                                    <input className={errors.firstname ? 'errorInput' : ''} type="text" id='fn' placeholder='First name'
                                        value={formDataS1.firstname}
                                        onChange={(e) => {
                                            setFormdataS1({ ...formDataS1, firstname: e.target.value })
                                        }}
                                    />
                                    {errors.firstname && <p className="error">{errors.firstname[0]}</p>}

                                </div>
                                <div>
                                    <label htmlFor="mn">Middle Name</label>
                                    <input className={errors.middlename ? 'errorInput' : ''} type="text" id='mn' placeholder='Middle name'
                                        value={formDataS1.middlename}
                                        onChange={(e) => {
                                            setFormdataS1({ ...formDataS1, middlename: e.target.value })
                                        }}
                                    />
                                    {errors.middlename && <p className="error">{errors.middlename[0]}</p>}

                                </div>
                                <div>
                                    <label htmlFor="ln">Last Name</label>
                                    <input className={errors.lastname ? 'errorInput' : ''} type="text" id='ln' placeholder='Last name'
                                        value={formDataS1.lastname}
                                        onChange={(e) => {
                                            setFormdataS1({ ...formDataS1, lastname: e.target.value })
                                        }}
                                    />
                                    {errors.lastname && <p className="error">{errors.lastname[0]}</p>}

                                </div>
                            </div>
                            <div className="secondSection">

                                <div>
                                    <label htmlFor="age">Age</label>
                                    <input className={errors.age ? 'errorInput' : ''} type="number" id='age' min={0} max={30} placeholder='Age'
                                        value={formDataS1.age}
                                        onChange={(e) => {
                                            setFormdataS1({ ...formDataS1, age: e.target.value })
                                        }}
                                    />
                                    {errors.age && <p className="error">{errors.age[0]}</p>}
                                </div>
                                <div className="ssSec">
                                    <div>
                                        <label htmlFor="sx">Sex</label>
                                        <select className={errors.sex ? 'errorInput' : ''} id="sx"
                                            value={formDataS1.sex}
                                            onChange={(e) => {
                                                setFormdataS1({ ...formDataS1, sex: e.target.value })
                                            }}
                                        >
                                            <option value="">Sex</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                        {errors.sex && <p className="error">{errors.sex[0]}</p>}

                                    </div>
                                    <div>
                                        <label htmlFor="gn">Gender (optional)</label>
                                        <select className={errors.gender ? 'errorInput' : ''} id="gn"
                                            value={formDataS1.gender}
                                            onChange={(e) => {
                                                setFormdataS1({ ...formDataS1, gender: e.target.value })
                                            }}>
                                            <option value="">Gender</option>
                                            <option value="butterfly">butterfly</option>
                                            <option value="dinosour">dinosour</option>
                                        </select>
                                        {errors.gender && <p className="error">{errors.gender[0]}</p>}

                                    </div>

                                </div>
                                <div className="textAdr">
                                    <label htmlFor="adrsss">Address</label>
                                    <select className={errors.address ? 'errorInput' : ''} id='adrsss'
                                        value={formDataS1.address}
                                        onChange={(e) => {
                                            setFormdataS1({ ...formDataS1, address: e.target.value })
                                        }}>
                                        <option value="">Address</option>
                                        <option value="tiktapul">tiktapul</option>
                                        <option value="deadsea">deadsea</option>
                                    </select>
                                    {errors.address && <p className="error">{errors.address[0]}</p>}
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={`${step === 2 ? "showContent" : ""} `}>
                        <div className="sCont">
                            <section>
                                <div>
                                    <label htmlFor="">Youth Type</label>
                                    <select className={errors.youthType ? 'errorInput' : ''} value={formDataS2.youthType}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, youthType: e.target.value })
                                        }}
                                    >
                                        <option value="">Youth Type</option>
                                        <option value="ISY">ISY</option>
                                        <option value="OSY">OSY</option>
                                    </select>
                                    {errors.youthType && <p className="error">{errors.youthType[0]}</p>}
                                </div>
                                <div className='skl'>
                                    <label htmlFor="sk">Skills (optional)</label>
                                    <input type="text" id='sk' className={errors.skills ? 'errorInput' : ''} placeholder='Skills'
                                        value={inputSkill}
                                        onChange={e => setInputSkill(e.target.value)}
                                    />
                                    <i className="fas fa-plus" onClick={() => addSkill()} title="Add skill"></i>
                                </div>
                                <div className="skillsList">
                                    {skills.map((skill, index) => (
                                        <ol key={index}>
                                            <li>{index + 1}</li>
                                            <li>{skill}</li>
                                            <li><i onClick={() => removeSkill(index)} title="Remove skill" className="fas fa-trash"></i></li>
                                        </ol>
                                    ))}

                                </div>
                            </section>
                            <section>
                                <div>
                                    <label htmlFor="db">Date of Birth</label>
                                    <input id='db' type="date" className={errors.dateOfBirth ? 'errorInput' : ''} placeholder='Date of birth'
                                        value={formDataS2.dateOfBirth}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, dateOfBirth: e.target.value })
                                        }}
                                    />
                                    {errors.dateOfBirth && <p className="error">{errors.dateOfBirth[0]}</p>}

                                </div>
                                <div>
                                    <label htmlFor="pb">Place of Birth</label>
                                    <textarea id='pb' className={errors.placeOfBirth ? 'errorInput' : ''} placeholder='Place of Birth'
                                        value={formDataS2.placeOfBirth}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, placeOfBirth: e.target.value })
                                        }}
                                    >
                                    </textarea>
                                    {errors.placeOfBirth && <p className="error">{errors.placeOfBirth[0]}</p>}
                                </div>
                                <div>
                                    <label htmlFor="nc">No. of children (optional)</label>
                                    <input type="number" id='nc' min={0} className={errors.noOfChildren ? 'errorInput' : ''} placeholder='No. of children'
                                        value={formDataS2.noOfChildren}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, noOfChildren: e.target.value })
                                        }}
                                    />
                                    {errors.noOfChildren && <p className="error">{errors.noOfChildren[0]}</p>}

                                </div>
                            </section>
                            <section>
                                <div>
                                    <label htmlFor="hh">Height (cm)</label>
                                    <input type="number" className={errors.height ? 'errorInput' : ''} min={0} id='hh' placeholder='Height'
                                        value={formDataS2.height}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, height: e.target.value })
                                        }}
                                    />
                                    {errors.height && <p className="error">{errors.height[0]}</p>}

                                </div>
                                <div>
                                    <label htmlFor="wh">Weight (kg)</label>
                                    <input type="number" className={errors.weight ? 'errorInput' : ''} min={0} id='wh' placeholder='Weight'
                                        value={formDataS2.weight}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, weight: e.target.value })
                                        }}
                                    />
                                    {errors.weight && <p className="error">{errors.weight[0]}</p>}

                                </div>
                                <div>
                                    <label htmlFor="">Civil Status</label>
                                    <select className={errors.civilStatus ? 'errorInput' : ''}
                                        value={formDataS2.civilStatus}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, civilStatus: e.target.value })
                                        }}
                                    >

                                        <option value="">Civil status</option>
                                        <option value="single">Single</option>
                                        <option value="divorce">Divorce</option>
                                        <option value="outside-marriage">Outside-marriage</option>
                                    </select>
                                    {errors.civilStatus && <p className="error">{errors.civilStatus[0]}</p>}
                                </div>
                                <div>
                                    <label htmlFor="oc">Occupation (optional)</label>
                                    <textarea id='oc' placeholder='Occupation' className={errors.occupation ? 'errorInput' : ''}
                                        value={formDataS2.occupation}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, occupation: e.target.value })
                                        }}
                                    >
                                    </textarea>
                                    {errors.occupation && <p className="error">{errors.occupation[0]}</p>}
                                </div>
                                <div>
                                    <label htmlFor="">Religion</label>
                                    <select className={errors.religion ? 'errorInput' : ''}
                                        value={formDataS2.religion}
                                        onChange={(e) => {
                                            setFormdataS2({ ...formDataS2, religion: e.target.value })
                                        }}
                                    >

                                        <option value="">Religion</option>
                                        <option value="islam">Islam</option>
                                        <option value="christianity">Christianity</option>
                                        <option value="agnostic">Agnostic</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.religion && <p className="error">{errors.religion[0]}</p>}
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
                                        <select className={errors.level ? 'errorInput' : ''}
                                            value={educbgForm.level}
                                            onChange={(e) => setEducBgForm({ ...educbgForm, level: e.target.value })}  >
                                            <option value="">School level</option>
                                            {optEducbg}
                                        </select>
                                    {errors.level && <p className="error">{errors.level}</p>}

                                    </div>
                                    <div>
                                        <label htmlFor="ns">Name of School</label>
                                        <input type="text" id='ns' className={errors.nameOfSchool ? 'errorInput' : ''}
                                            value={educbgForm.nameOfSchool}
                                            onChange={(e) => setEducBgForm({ ...educbgForm, nameOfSchool: e.target.value })} placeholder='Name of School' />
                                    {errors.nameOfSchool && <p className="error">{errors.nameOfSchool}</p>}

                                    </div>
                                    <div>
                                        <label htmlFor="poa">Period of Attendance</label>
                                        <input type="date" id='poa' placeholder='Period of Attendance' className={errors.periodOfAttendance ? 'errorInput' : ''}
                                            value={educbgForm.periodOfAttendance}
                                            onChange={(e) => setEducBgForm({ ...educbgForm, periodOfAttendance: e.target.value })}
                                        />
                                    {errors.periodOfAttendance && <p className="error">{errors.periodOfAttendance}</p>}

                                    </div>
                                    <div>
                                        <label htmlFor="yg">Yeak Graduate</label>
                                        <input type="number" id='yg' placeholder='Yeak Graduate' className={errors.yearGraduate ? 'errorInput' : ''}
                                            value={educbgForm.yearGraduate}
                                            onChange={(e) => setEducBgForm({ ...educbgForm, yearGraduate: e.target.value })}
                                        />
                                    {errors.yearGraduate && <p className="error">{errors.yearGraduate}</p>}

                                    </div>
                                </div>
                                <div className="addCivic">
                                    
                                    {addeducbgButton}
                                </div>
                                <div className="educbgCont">
                                    <ol>
                                        <li>School Level</li>
                                        {educBg.map((entry, index) => (
                                            <li key={`level-${index}`}>{entry.level}</li>
                                        ))}
                                    </ol>
                                    <ol>
                                        <li>Name of School</li>
                                        {educBg.map((entry, index) => (
                                            <li key={`school-${index}`}>{entry.nameOfSchool}</li>
                                        ))}
                                    </ol>
                                    <ol>
                                        <li>Period of Attendance</li>
                                        {educBg.map((entry, index) => (
                                            <li key={`period-${index}`}>{entry.periodOfAttendance}</li>
                                        ))}
                                    </ol>
                                    <ol>
                                        <li>Year Graduate</li>
                                        {educBg.map((entry, index) => (
                                            <li key={`grad-${index}`}>{entry.yearGraduate}</li>
                                        ))}
                                    </ol>
                                </div>
                                <div className="clean">
                                    <button onClick={()=>setEducBg([])} className={`clr ${educBg.length === 0 && 'clrG'}`}>Clear</button>
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
                    <div className={` ${step === 5 ? "showContent" : ""} `}>
                        <h1>Confirm this data</h1>
                    </div>

                    <div className={`progress ${isLoading && 'progressOn'} `} >
                        <p>
                            <i className="fas fa-spinner fa-spin"></i>
                            Checking...</p>
                    </div>
                </div>

            </div>
        </div>
        <div className="actionStepper">
            <button onClick={() => setStep(step - 1)} className={step === 1 ? 'op' : ''}>Back</button>
            <button onClick={() => changeStep(step + 1)}>{isNext}</button>

        </div>



    </>
}