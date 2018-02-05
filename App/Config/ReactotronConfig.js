import Config from './DebugConfig'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'


if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({ name: 'Homeroom' })
    .useReactNative()
    .use(reactotronRedux())
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
}
