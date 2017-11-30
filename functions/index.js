const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./lohs-supportseminar-firebase-adminsdk-key.json')
const nodemailer = require('nodemailer')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lohs-supportseminar.firebaseio.com'
})

const db = admin.database()

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

/**
 * Sends an email to the requested teacher, asking to accept the student into Support Seminar
 */
exports.sendRequest = functions.database.ref('/requests/{pushId}')
  .onWrite(event => {
    let val = event.data.val()
    let teacherKey = val.teacher
    let studentKey = val.user

    console.log('Sending request email', event.params.pushId, teacherKey)
    let acceptLink = 'https://lohs-supportseminar.firebaseapp.com/acceptRequest/' + event.params.pushId

    let teacherRef = db.ref('teachers/' + teacherKey)
    let studentRef = db.ref('users/' + studentKey)

    teacherRef.once('value', function (teacherSnapshot) {
      let teacher = teacherSnapshot.val()
      studentRef.once('value', function (studentSnapshot) {
        let student = studentSnapshot.val()
        let mailOptions = {
          from: '"Support Seminar" <noreply@nbdeg.com>',
          to: teacher.email,
          subject: 'Support Seminar Student Request',
          text: 'Hello ' + teacher.firstName + ' ' + teacher.lastName + ',\n' + student.name + ' has requested to come to your next Support Seminar. To accept the request, please click the link below.\n' + acceptLink,
          html: '<h1>Hello ' + teacher.firstName + ' ' + teacher.lastName + ',</h1>\n<p>' + student.name + ' has requested to come to your next Support Seminar. To accept the request, please click <a href=' + acceptLink + ' />here.</p>'
        }

        return mailTransport.sendMail(mailOptions)
      })
    })
  })

  /**
   * Accepts the student request and sends them a push notifcation
   */
exports.acceptRequest = functions.https.onRequest((req, res) => {
  const params = req.url.split('/')
  const requestID = params[2]
  const ref = db.ref('requests/' + requestID)

  // Set accepted value
  ref.update({
    accepted: true
  }, function (error) {
    if (error) {
      console.log('Error setting accepted value.' + error)
      return res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>Support Seminar Request</title>
                </head>
                <body>
                    <h1>There was an erro accepting the user. Please try again later.\n${error}</h1>
                </body>
            </html>`
      )
    } else {
      console.log('User accepted.')
    }
  })

  // Return HTML file.
  return ref.once('value', (requestSnapshot) => {
    db.ref('users/' + requestSnapshot.val().user).once('value', function (studentSnapshot) {
      db.ref('teachers/' + requestSnapshot.val().teacher).once('value', function (teacherSnapshot) {
        if ('pushId' in requestSnapshot.val()) {
          let payload = {
            notification: {
              title: 'Support Seminar Request',
              body: 'Your Support Seminar request for ' + teacherSnapshot.val().lastName + ' has been approved!'
            }
          }
          admin.messaging().sendToDevice(requestSnapshot.val().pushId, payload)
        }

        return res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>Support Seminar Request</title>
                </head>
                <body>
                    <h1>Thank you, ${teacherSnapshot.val().firstName} ${teacherSnapshot.val().lastName}</h1>
                    <p>The student ${studentSnapshot.val().name} has been accepted into your next Support Seminar.</p>
                </body>
            </html>`
        )
      })
    })
  })
})
