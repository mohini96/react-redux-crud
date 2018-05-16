import React from 'react';
import Enzyme, {  shallow, mount, render } from 'enzyme';
import Login from '../container/Login';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter:new Adapter()});

// describe what we are testing
describe('Login Component', () => {

    // make our assertion and what we expect to happen
    it('should render without throwing an error', () => {
      // expect(shallow(<Login />).exists(<div className='loginform'></div>)).toBe(true)
    })
    it('renders a email input', () => {
        expect(shallow(<Login />).find('#email').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow(<Login />).find('#password').length).toEqual(1)
    })
})