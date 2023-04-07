import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css";

const Footer = () => {
  return (
<footer id="footer">
<div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/championvishesh/">Instagram</a>
        <a href="https://www.youtube.com/channel/UCwvfE246b4er82BSfAJKGKw">Youtube</a>
        <a href="https://www.facebook.com/profile.php?id=100075987946323">Facebook</a>
      </div>
</footer>    
  )
}

export default Footer