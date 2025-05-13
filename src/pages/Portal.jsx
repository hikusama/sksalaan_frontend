import logo from '../assets/logo.png';
import FormAdd from './youth/youthAdd';

export default function Portal() {
    return <>
        <div className="contPortalReg">
            <div className="firstSecPortal">
                <img src={logo} alt="" />
                <div className="labelTitle">
                    <h1>SK Youth <br />Portal Registration</h1>
                    <div className="sd">
                        <p>Scroll Down</p>
                        <i className="fas fa-angle-down"></i>
                    </div>
                </div>
            </div>
            <div className="contRe">
                <FormAdd />
            </div>

            
        </div>
    </>
}