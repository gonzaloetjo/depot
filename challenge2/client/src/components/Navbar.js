import React from 'react';
import { Navbar } from 'react-bootstrap';

export const Header = ({ title }) => {
  return (
    // <div className='Navbar'>
    //   <img className='App-logo' src='./logo512.png' />
    //   <h1>{ title }</h1>
    // </div>
    <Navbar bg='dark' variant='dark' className='mb-4'>
      <Navbar.Brand href='/'>
        <img
          alt=''
          src='/logo512.png'
          width='30'
          height='30'
          className='d-inline-block align-top mr-2'
        />
        {title}
      </Navbar.Brand>
    </Navbar>
  );
}
