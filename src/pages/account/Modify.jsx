import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Create({ setAction, id }) {

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);



    const [formData, setFormData] = useState({
        name: '',
        position: '',
        email: '',
        userName: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    async function getdata(id) {
        setIsLoading(true);

        try {
            const res = await axios.get(`/api/getUser/${id}`);

            if (res.data.errors) {
                setErrors(res.data.errors);
            } else {
                // setFormData({...res.data.user,...res.data.ch})
                setAction('');
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: ['Something went wrong.'] });
                console.error('Unexpected error:', err);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function modifyAccount() {
        setIsLoading(true);

        try {
            const res = await axios.post('/api/modify', formData);

            if (res.data.errors) {
                setErrors(res.data.errors);
                
            } else {
                setAction('');
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: ['Something went wrong.'] });
                console.error('Unexpected error:', err);
            }
        } finally {
            setIsLoading(false);
        }
    }

    // useEffect(() => {
    //     getdata(id)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div className="accForm" onClick={() => setAction('')}>

            <div className="contCreateAcc" onClick={(e) => e.stopPropagation()}>
                <form>
                    <div className="headC">
                        <h2>Modify</h2>
                        <button className={isLoading ? 'actioning' : ''} type='button' onClick={modifyAccount}>{isLoading ? <i className="fas fa-spinner fa-spin"></i> : ''} Submit</button>
                    </div>
                    <ol>
                        <label htmlFor="name">Name</label>
                        <input autoComplete='off' className={errors.name ? 'errorInput' : ''}
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name[0]}</p>}

                    </ol>
                    <ol>
                        <label htmlFor="position">Position</label>
                        <input autoComplete='off' className={errors.position ? 'errorInput' : ''}
                            type="text"
                            id="position"
                            placeholder="Position"
                            value={formData.position}
                            onChange={handleChange}
                        />
                        {errors.position && <p className="error">{errors.position[0]}</p>}

                    </ol>
                    <ol>
                        <label htmlFor="email">Email</label>
                        <input autoComplete='off' className={errors.email ? 'errorInput' : ''}
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email[0]}</p>}

                    </ol>
                    <ol>
                        <label htmlFor="userName">Username</label>
                        <input autoComplete='off' className={errors.userName ? 'errorInput' : ''}
                            type="text"
                            id="userName"
                            placeholder="Username"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                        {errors.userName && <p className="error">{errors.userName[0]}</p>}

                    </ol>
                    <ol>
                        <label htmlFor="password">Password</label>
                        <input autoComplete='off' className={errors.password ? 'errorInput' : ''}
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password[0]}</p>}

                    </ol>
                    <ol>
                        <label htmlFor="password_confirmation">Confirm-password</label>
                        <input autoComplete='off' className={errors.password_confirmation ? 'errorInput' : ''}
                            type="password"
                            id="password_confirmation"
                            placeholder="Confirm-Password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                        />
                        {errors.password_confirmation && <p className="error">{errors.password_confirmation[0]}</p>}

                    </ol>
                </form>
            </div>
        </div>
    );
}
