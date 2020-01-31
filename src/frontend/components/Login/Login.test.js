//AddCollection.test.js
// Import React
import React from 'react'
import { shallow } from 'enzyme'
import Login from './index'

// We will describe a block of tests
describe('Login Name Here', () => {
	// we will write one individual test
    it('should have a paragraph that says "a place to store all of your bookmarks in collections so you’ll never lose them -- at last"', () => {
        const component = shallow(<Login/>)
        expect(component.contains(<p>a place to store all of your bookmarks in collections so you’ll never lose them -- at last</p>)).toBe(true)
      })
  })
