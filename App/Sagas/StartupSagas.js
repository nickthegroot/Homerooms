// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    console.tron.display({
      name: 'Support Seminar',
      preview: 'Startup Compleated!'
    })
  }
}
