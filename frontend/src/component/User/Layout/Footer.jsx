import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              Bro-Cart
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>Bro-Cart © 2022</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;