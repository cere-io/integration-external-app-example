import React, {useEffect, useState} from 'react';
import './header.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import seller1 from '../../assets/seller1.jpg';
import seller2 from '../../assets/seller2.png';
import seller3 from '../../assets/seller3.png';
import seller4 from '../../assets/seller4.png';
import seller5 from '../../assets/seller5.png';
import seller6 from '../../assets/seller6.jpg';
import verify from '../../assets/verify.png';
import coin from '../../assets/coin.png';
import {Link} from 'react-router-dom';
import {initSdkQr, SDK, sendEvent} from '../../service/cere-integration-service';
import {getApplicantId, setApplicantId} from '../../service/local-storage-service';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import user1Json from './../../data/user1.json';
import user2Json from './../../data/user2.json';

const userPayloads = [
  {
    userId: 'user1',
    pubKey: '0x59A6a098e57114D512c3e77060F8a64264Ef57BD',
    payload: user1Json,
  },
  {
    userId: 'user2',
    pubKey: '0x6Df737a290e821D67C9206BF745da11E78E6c06B',
    payload: user2Json,
  },
];

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
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };
  const [show, setShow] = useState(false);
  const [showUserCreds, setShowUserCreds] = useState(true);
  const [userId, setUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');

  function useInput({type /*...*/}) {
    const [value, setValue] = useState('');
    const input = <input value={value} onChange={(e) => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

  /**************************************************************START_CERE BLOCK**********************************************************************/

  /**
   * Action to be triggered after engagement received.
   */
  function onEngagementAction(template) {
    setShow(true);
    setTimeout(() => {
      var doc = document.getElementById('contentIFrame').contentWindow.document;
      doc.open();
      doc.write(template);
      doc.close();
    }, 100);
  }

  /**
   * Action to be triggered after engagement received.
   */
  function onUserKeyPair(keyPair) {
    console.log(keyPair);
    setUserId(keyPair['publicKey']);
  }

  useEffect(() => {
    let applicantId = getApplicantId();
    if (applicantId) {
      /**
       * Init Cere sdk if there is off in request.
       * Just a marker flag not to initialise it all the time.
       */
      initSdkQr(applicantId, '1234567890', onEngagementAction, onUserKeyPair);
    }

    if (getApplicantId()) {
      setShowUserCreds(false);
    }
  }, []);

  useEffect(() => {
    if (getApplicantId()) {
      setShowUserCreds(false);
    }
  }, []);

  function hide() {
    setShow(false);
  }

  function applyCreds() {
    let val = applicantId;
    if (selectedUser) {
      val = selectedUser;
    }

    setApplicantId(val);

    setShowUserCreds(false);

    window.location.reload(true);
  }

  function hideUserCreds() {
    setShowUserCreds(false);
  }

  function discoverDivClicked() {
    const userPayload = userPayloads.find((payload) => payload.pubKey.toLowerCase() === userId.toLowerCase());

    sendEvent(SDK.it, 'AI_DEMO_EVENT', SDK.keyPair, userPayload?.payload || {});
  }

  const [applicantId, applicantIdInput] = useInput({type: 'text'});
  return (
    <div className="header section__padding">
      {show && (
        <div className="modal">
          <div className="modal-content2">
            <div className="close-button" onClick={hide}>
              &times;
            </div>
            <div style={{height: '90%', paddingTop: '40px'}}>
              <iframe id="contentIFrame" width={'100%'} height={'100%'} frameBorder={0}></iframe>
            </div>
          </div>
        </div>
      )}

      {showUserCreds && (
        <div className="modal">
          <div className="modal-content1 item-content-buy">
            <span className="close-button" onClick={hideUserCreds}>
              &times;
            </span>
            <h1>Specify context</h1>
            <div className="formGroup" style={{alignItems: 'baseline'}}>
              <label style={{width: '100%'}}>
                User Id
                <div>{applicantIdInput}</div>
              </label>
              <label style={{textAlign: 'center', width: '100%'}}>or</label>
              <label style={{width: '100%'}}>
                Select from the list:
                <div>
                  <select
                    value={selectedUser}
                    style={{width: '100%'}}
                    onChange={(e) => setSelectedUser(e.currentTarget.value)}
                  >
                    <option value={null}></option>
                    {userPayloads.map((user) => (
                      <option key={user.pubKey} value={user.userId}>
                        {user.userId}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <div align={'center'} color={'black'} style={{paddingTop: '20px', width: '100%'}}>
                <button type="button" onClick={applyCreds} className="secondary-btn">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/**************************************************************END_CERE_BLOCK**********************************************************************/}

      {getApplicantId() && (
        <div className="navbar-sign" style={{paddingBottom: 50}}>
          <CopyToClipboard text={userId}>
            <button type="button" className="primary-btn">
              Copy User Id To Clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}

      {getApplicantId() && (
        <div className="header-content">
          <div onClick={discoverDivClicked}>
            <h1>Check my special event nfts</h1>
            {/*<h3 style={{color: 'white'}}>{userId}</h3>*/}
            <img className="shake-vertical" src={coin} alt="" />
          </div>
        </div>
      )}

      <div className="header-slider">
        <h1>Top Sellers</h1>
        <Slider {...settings} className="slider">
          <div className="slider-card">
            <p className="slider-card-number">1</p>
            <div className="slider-img">
              <img src={seller1} alt="" />
              <img src={verify} className="verify" alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className="slider-card-name">James Bond</p>
            </Link>
            <p className="slider-card-price">
              5.250 <span>ETH</span>
            </p>
          </div>
          <div className="slider-card">
            <p className="slider-card-number">2</p>
            <div className="slider-img">
              <img src={seller2} alt="" />
              <img src={verify} className="verify" alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className="slider-card-name">Rian Leon</p>
            </Link>
            <p className="slider-card-price">
              4.932 <span>ETH</span>
            </p>
          </div>
          <div className="slider-card">
            <p className="slider-card-number">3</p>
            <div className="slider-img">
              <img src={seller3} alt="" />
              <img src={verify} className="verify" alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className="slider-card-name">Lady Young</p>
            </Link>
            <p className="slider-card-price">
              4.620 <span>ETH</span>
            </p>
          </div>
          <div className="slider-card">
            <p className="slider-card-number">4</p>
            <div className="slider-img">
              <img src={seller4} alt="" />
              <img src={verify} className="verify" alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className="slider-card-name">Black Glass</p>
            </Link>
            <p className="slider-card-price">
              4.125 <span>ETH</span>
            </p>
          </div>
          <div className="slider-card">
            <p className="slider-card-number">5</p>
            <div className="slider-img">
              <img src={seller5} alt="" />
              <img src={verify} className="verify" alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className="slider-card-name">Budhiman</p>
            </Link>
            <p className="slider-card-price">
              3.921 <span>ETH</span>
            </p>
          </div>
          <div className="slider-card">
            <p className="slider-card-number">6</p>
            <div className="slider-img">
              <img src={seller6} alt="" />
              <img src={verify} className="verify" alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className="slider-card-name">Alex</p>
            </Link>
            <p className="slider-card-price">
              3.548 <span>ETH</span>
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Header;
