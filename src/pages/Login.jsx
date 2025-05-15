import { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { AppContext } from "../context/AppContext"
import { useNavigate } from 'react-router-dom';



export default function Login() {

    const { setToken } = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormdata] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    async function handleLogin(e) {
        e.preventDefault()

        const res = await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(formData),
        });
        const data = await res.json()


        if (data.errors) {
            setErrors(data.errors)
        } else {

            localStorage.setItem('token', data.token)
            setToken(data.token)
            navigate('/')
            console.log(data);

        }

    }
    return <>
        <div className="loginCont">
            <div className="lgu">
                <div className="logoG">
                    <img src={logo} alt="" />
                </div>
                <ol>
                    <li>SKYouth Profiling System</li>
                    <li className='ls'>salaan</li>
                </ol>
            </div>
            <div className="fpane"></div>
            <div className="formLog">

                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className={errors.email ? 'errorInput' : ''} type="text" id='email' placeholder="Email" value={formData.email}
                            onChange={(e) => setFormdata({ ...formData, email: e.target.value })} />
                        {errors.email && <p className="error">{errors.email}</p>}

                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className={errors.password ? 'errorInput' : ''} type="password" id='password' placeholder="Password" value={formData.password}
                            onChange={(e) => setFormdata({ ...formData, password: e.target.value })} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button>Login</button>
                </form>
            </div>
            <div className="lpane"></div>
        </div>
    </>
}