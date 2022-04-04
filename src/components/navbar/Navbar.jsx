import React, {useState} from 'react'
import './navbar.css'
import {RiCloseLine, RiMenu3Line} from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {Link} from "react-router-dom";

const Menu = () => (
    <>
        <Link to="/"><p>Explore</p></Link>
        <p>My Items</p>

    </>
)

const Navbar = () => {
    // const containerForInAppMessages = useRef();
    const [toggleMenu, setToggleMenu] = useState(false)
    const [user, setUser] = useState(false)

    const handleLogout = () => {
        setUser(false);
    }
    const handleLogin = () => {
        setUser(true);
    }

    // const actionClicked = async (e) => {
    //     e.preventDefault();
    //     var DYNAMIC_EVENT = 'DYNAMIC_EVENT';
    //     // this.setState({show: true});
    //     debugger;
    //     setShow(true);
    //     console.log("Event has been sent " + DYNAMIC_EVENT);
    //     sdk.sendEvent(DYNAMIC_EVENT);
    //     // sdk.onEngagement(template => {
    //     //     debugger;
    //     //     // var popup = document.getElementById("myPopup");
    //     //     // popup.classList.toggle("show");
    //     // });
    // }

    return (
        <div className='navbar'>
            <div className="navbar-links">
                <div className="navbar-links_logo">
                    <img src={logo} alt="logo"/>
                    <Link to="/">
                        <h1>Crypto</h1>
                    </Link>
                </div>

                <div className="navbar-links_container">
                    <input type="text" placeholder='Search Item Here' autoFocus={true}/>
                    <Menu/>
                    {user && <Link to="/"><p onClick={handleLogout}>Logout</p></Link>}

                </div>
            </div>
            <div className="navbar-sign">
                {user ? (
                    <>
                        <Link to="/create">
                            <button type='button' className='primary-btn'>Create</button>
                        </Link>
                        <button type='button' className='secondary-btn'>Connect</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button type='button' className='primary-btn' onClick={handleLogin}>Sign In</button>
                        </Link>
                        <Link to="#">
                            <button type='button' className='secondary-btn'>Log In</button>
                        </Link>
                    </>
                )}


            </div>
            <div className="navbar-menu">
                {toggleMenu ?
                    <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)}/>
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)}/>}
                {toggleMenu && (
                    <div className="navbar-menu_container scale-up-center">
                        <div className="navbar-menu_container-links">
                            <Menu/>
                        </div>
                        <div className="navbar-menu_container-links-sign">
                            {user ? (
                                <>
                                    <Link to="/create">
                                        <button type='button' className='primary-btn'>Create</button>
                                    </Link>
                                    <button type='button' className='secondary-btn'>Connect</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button type='button' className='primary-btn' onClick={handleLogin}>Sign In
                                        </button>
                                    </Link>
                                    <Link to="/register">
                                        <button type='button' className='secondary-btn'>Sign Up</button>
                                    </Link>
                                </>
                            )}

                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar
