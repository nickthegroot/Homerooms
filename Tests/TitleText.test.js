import 'react-native'
import React from 'react'
import TitleText from '../App/Screens/Home/Components/TitleText'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<TitleText name='Test' date='Friday, December 1st' nextSeminar='4 hours' />).toJSON()
  expect(tree).toMatchSnapshot()
})
