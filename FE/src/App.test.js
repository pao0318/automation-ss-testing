
import React from 'react'
import {render, cleanup} from '@testing-library/react'
import App from './App.js'
import TestElements from './Tests/LoginTest'

 afterEach(cleanup)

 it('should take a snapshot', () => {
    const { asFragment } = render(<App />)

    expect(asFragment(<App />)).toMatchSnapshot()
   })

   it('should test elements from LoginTest', () => {
    render(<TestElements />);
  
    // Use screen.getByText directly
    expect(screen.getByText('Capture and Compare')).toBeInTheDocument();
    // Add more assertions as needed
  });