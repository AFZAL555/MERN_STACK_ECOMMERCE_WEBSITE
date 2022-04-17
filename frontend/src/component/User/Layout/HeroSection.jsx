import React from 'react';
import {Button} from './Button'
import './HeroSection.css';

function HeroSection() {
   
  return (
    <div className='hero-container'>
      <h1>BRO-CART</h1>
      <p>Buy Anything you want..</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Available Products
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;