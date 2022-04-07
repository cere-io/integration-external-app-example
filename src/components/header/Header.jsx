import React, {useEffect, useState} from 'react'
import './header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import seller1 from '../../assets/seller1.jpg'
import seller2 from '../../assets/seller2.png'
import seller3 from '../../assets/seller3.png'
import seller4 from '../../assets/seller4.png'
import seller5 from '../../assets/seller5.png'
import seller6 from '../../assets/seller6.jpg'
import verify from '../../assets/verify.png'
import coin from '../../assets/coin.png'
import {Link} from 'react-router-dom';
import {getNftUrl, initSdk} from "../../service/cere-integration-service";
import {getApplicantId, getEmail, setApplicantId, setEmail} from "../../service/local-storage-service";

const Header = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1160,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            }
        ]
    };
    const [show, setShow] = useState(false)
    const [showNft, setShowNft] = useState(false)
    const [showUserCreds, setShowUserCreds] = useState(true)

    function useInput({type /*...*/}) {
        const [value, setValue] = useState("");
        const input = <input value={value} onChange={e => setValue(e.target.value)} type={type}/>;
        return [value, input];
    }

    /**************************************************************START_CERE BLOCK**********************************************************************/

    /**
     * Action to be triggered after engagement received.
     */
    function onEngagementAction(template) {
        setShow(true)
        setTimeout(() => {
            document.getElementById("contentDiv").innerHTML = template
        }, 100);
    }

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('off')) {
            let externalUserId = query.get('externalUserId');
            let token = query.get('token');

            /**
             * Init Cere sdk if there is off in request.
             * Just a marker flag not to initialise it all the time.
             */
            initSdk(externalUserId, token, onEngagementAction)

        } else {
            setShowNft(true);
        }

        if (getEmail()) {
            setShowUserCreds(false);
        }
    }, []);

    useEffect(() => {
        if (getEmail()) {
            setShowUserCreds(false);
        }
    }, []);

    function hide() {
        setShow(false);
    }

    function applyCreds() {
        setEmail(email);
        setApplicantId(applicantId);

        setShowUserCreds(false);

        window.location.reload(true);
    }

    function hideNft() {
        setShowNft(false);
    }

    function hideUserCreds() {
        setShowUserCreds(false);
    }


    const [applicantId, applicantIdInput] = useInput({type: "text"});
    const [email, emailInput] = useInput({type: "text"});
    return (
        <div className='header section__padding'>
            {show && (
                <div className="modal">
                    <div className="modal-content1">
                        <span className="close-button" onClick={hide}>&times;</span>
                        <h1>Congratulations</h1>
                        <div id="contentDiv">
                        </div>
                    </div>
                </div>
            )
            }

            {showNft && !showUserCreds && (
                <div className="modal">
                    <div className="modal-content1">
                        <span className="close-button" onClick={hideNft}>&times;</span>
                        <h2>TEST EXHIBITION DON'T DELETE (LIVE)</h2>
                        <br/>
                        <div>
                            <div>
                                <img
                                    src={"https://assets.cms.freeport.dev.cere.network/small_166747_priroda_voda_oblako_gora_gidroresursy_500x_477a41a47f.jpg"}
                                    className={"full-width"}/>
                            </div>
                            <br/>
                            <div>
                                <div>
                                    <p>TEST TEST
                                        TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST</p></div>
                                <div>
                                    <div>
                                        <h3>$89</h3>
                                    </div>
                                    <p></p>
                                    <div align={"center"} color={"black"}>
                                        <a className={"link-button"}
                                           href={getNftUrl(getApplicantId(), getEmail())}
                                        >Buy</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showUserCreds && (
                <div className="modal">
                    <div className="modal-content1">
                        <span className="close-button" onClick={hideUserCreds}>&times;</span>
                        <h1>Connection details</h1>
                        <div>
                            <span>{emailInput}&nbsp;Email</span>
                            <span>{applicantIdInput}&nbsp;Applicant Id</span>
                            <div align={"center"} color={"black"}>
                                <button type="button" onClick={applyCreds}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>)}

            {/**************************************************************END_CERE_BLOCK**********************************************************************/}


            <div className="header-content">
                <div>
                    <h1>Discover, collect, and sell extraordinary NFTs</h1>
                    <img className='shake-vertical' src={coin} alt=""/>
                </div>
            </div>
            <div className="header-slider">
                <h1>Top Sellers</h1>
                <Slider {...settings} className='slider'>
                    <div className='slider-card'>
                        <p className='slider-card-number'>1</p>
                        <div className="slider-img">
                            <img src={seller1} alt=""/>
                            <img src={verify} className='verify' alt=""/>
                        </div>
                        <Link to={`/profile/Rian`}>
                            <p className='slider-card-name'>James Bond</p>
                        </Link>
                        <p className='slider-card-price'>5.250 <span>ETH</span></p>
                    </div>
                    <div className='slider-card'>
                        <p className='slider-card-number'>2</p>
                        <div className="slider-img">
                            <img src={seller2} alt=""/>
                            <img src={verify} className='verify' alt=""/>
                        </div>
                        <Link to={`/profile/Rian`}>
                            <p className='slider-card-name'>Rian Leon</p>
                        </Link>
                        <p className='slider-card-price'>4.932 <span>ETH</span></p>
                    </div>
                    <div className='slider-card'>
                        <p className='slider-card-number'>3</p>
                        <div className="slider-img">
                            <img src={seller3} alt=""/>
                            <img src={verify} className='verify' alt=""/>
                        </div>
                        <Link to={`/profile/Rian`}>
                            <p className='slider-card-name'>Lady Young</p>
                        </Link>
                        <p className='slider-card-price'>4.620 <span>ETH</span></p>
                    </div>
                    <div className='slider-card'>
                        <p className='slider-card-number'>4</p>
                        <div className="slider-img">
                            <img src={seller4} alt=""/>
                            <img src={verify} className='verify' alt=""/>
                        </div>
                        <Link to={`/profile/Rian`}>
                            <p className='slider-card-name'>Black Glass</p>
                        </Link>
                        <p className='slider-card-price'>4.125 <span>ETH</span></p>
                    </div>
                    <div className='slider-card'>
                        <p className='slider-card-number'>5</p>
                        <div className="slider-img">
                            <img src={seller5} alt=""/>
                            <img src={verify} className='verify' alt=""/>
                        </div>
                        <Link to={`/profile/Rian`}>
                            <p className='slider-card-name'>Budhiman</p>
                        </Link>
                        <p className='slider-card-price'>3.921 <span>ETH</span></p>
                    </div>
                    <div className='slider-card'>
                        <p className='slider-card-number'>6</p>
                        <div className="slider-img">
                            <img src={seller6} alt=""/>
                            <img src={verify} className='verify' alt=""/>
                        </div>
                        <Link to={`/profile/Rian`}>
                            <p className='slider-card-name'>Alex</p>
                        </Link>
                        <p className='slider-card-price'>3.548 <span>ETH</span></p>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Header
