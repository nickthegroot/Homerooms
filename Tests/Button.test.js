import 'react-native'
import React from 'react'
import Button from '../App/Screens/Components/Button'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<Button text='Testing' />).toJSON()
  expect(tree).toMatchSnapshot()
})
