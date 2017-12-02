import 'react-native'
import React from 'react'
import CurrentSeminarCard from '../App/Screens/Home/Components/CurrentSeminarCard'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const testSeminarTeacher = {
    email: 'contact@nbdeg.com',
    firstName: 'Nick',
    id: '-L-9gHZsBoau-s4TYwSS',
    lastName: 'DeGroot',
    picture: 'https://avatars1.githubusercontent.com/u/196647...',
    room: 205,
    taughtCourses: 'AP Computer Science A'
  }
  const tree = renderer.create(<CurrentSeminarCard seminarTeacher={testSeminarTeacher} />).toJSON()
  expect(tree).toMatchSnapshot()
})
