const functions = require('firebase-functions');

const admin = require('firebase-admin');

const nodemailer = require('nodemailer');

const DateTime = require('luxon').DateTime;

const serviceAccount = require('../homeroom-firebase-adminsdk-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lohs-supportseminar.firebaseio.com'
});
const db = admin.database(); // Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const generateRequestEmail = (teacher, student, reason, acceptLink, declineLink) => {
  let date = DateTime.local().toFormat(DateTime.DATE_HUGE);
  return `
<!doctype html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Josefin+Slab|Nunito');
    body {
      background: #3b5998;
      font-family: 'Nunito', sans-serif;
      color: #000;
    }
    #content-wrap {
      background: #f7f7f7;
      width: 80%;
      max-width: 1000px;
      margin: 20px auto;
      padding: 20px;
    }
    span {
      color: #1E88E5;
      font-weight: bold;
      font-size: 1.2em;
    }
    h5 {
      font-family: 'Josefin Slab', serif;
      font-weight: bold;
      color: #1E88E5;
      font-size: 2em;
      text-align: left;
      margin: 0;
    }
    button {
      margin: 0 5px;
      background: none;
      border-radius: 10%;
      width: 100px;
      height: 50px;
      color: #1E88E5;
      border: 5px solid #1E88E5;
      transition: all 1s ease;
      opacity: 0.7;
    }
    button:hover {
      transform: scale(1.1);
      opacity: 1;
    }
    #accept-btn {
      border-color: #46cc56;
      color: #46cc56;
    }
    #reject-btn {
      border-color: #cc4656;
      color: #cc4656;
    }
    .wrapper {
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
    .center {
      text-align: center;
    }
    footer {
      margin-top: 50px;
      font-size: 0.8em;
      text-align: center;
      color: #888;
    }
    .preheader {
      color: transparent;
      display: none !important;
      height: 0;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      mso-hide: all;
      visibility: hidden;
      width: 0;
    }
  </style>
</head>
<body>
  <p class="preheader">${student.name} wants to attend your homeroom.</p>
  <div id="content-wrap">
    <h5>Dear ${teacher.firstName} ${teacher.lastName}, </h5>
    <p><span class="name">${student.name}</span> would like to attend your homeroom on <span class="date">${date}</span> because <span class="reason">"${reason}"</span>. </p>
    <p class = "center"> Do you accept this request? </p>
    <div class = "wrapper">
      <button id="accept-btn" href=${acceptLink}> Accept </button>
      <button id="reject-btn" href=${declineLink}> Reject </button>
    </div>
    <p> Sincerely, <br>
      <br>
      The Homeroom Team </p>
    <footer>
      <p>This message is from Homeroom, an app to connect teachers and learners. <br>
        Click here if you got this email by mistake. <br>
        Contact us at <a href='mailto:contact@homeroom-app.com'>contact@homeroom-app.com <br>
      </p>
    </footer>
  </div>
</body>
</html>
`;
};

const generateAcceptedScreen = student => {
  let date = DateTime.local().toFormat(DateTime.DATE_HUGE);
  return `
<!doctype html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Josefin+Slab|Nunito');
    body {
      background: #3b5998;
      font-family: 'Nunito', sans-serif;
      color: #000;
    }
    #content-wrap {
      background: #f7f7f7;
      width: 80%;
      max-width: 1000px;
      margin: 20px auto;
      padding: 20px;
    }
    span {
      color: #1E88E5;
      font-weight: bold;
      font-size: 1.2em;
    }
    .wrapper {
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
    .center {
      text-align: center;
    }
    footer {
      margin-top: 50px;
      font-size: 0.8em;
      text-align: center;
      color: #888;
    }
    .check {
      font-size: 5em;
      color: #46cc56;
      display: block;
      text-align: center;
      line-height: 1em;
    }
  </style>
</head>
<body>
  <div id="content-wrap"> <span class="check">✔</span>
    <p class="center"><span class="name">${student.name}</span> has been accepted into your homeroom on <span class="date">${date}</span>. <br>
      Happy teaching!</p>
    <footer>
      <p>This message is from Homeroom, an app to connect teachers and learners. <br>
        Contact us at <a href='mailto:contact@homeroom-app.com'>contact@homeroom-app.com <br>
      </p>
    </footer>
  </div>
</body>
</html>
`;
};
/**
 * Sends an email to the requested teacher, asking to accept the student into Support Seminar
 */


exports.sendRequest = functions.database.ref('/requests/{pushId}').onWrite(event => {
  let request = event.data.val(); // Make sure there's a need to continue.

  if (request.accepted === false) {
    let teacherKey = request.teacher;
    let studentKey = request.user;
    console.log('Sending request email', event.params.pushId, teacherKey);
    let acceptLink = 'https://lohs-supportseminar.firebaseapp.com/acceptRequest/' + event.params.pushId;
    let declineLink = 'https://lohs-supportseminar.firebaseapp.com/declineRequest/' + event.params.pushId;
    let teacherRef = db.ref('teachers/' + teacherKey);
    let studentRef = db.ref('users/' + studentKey);
    teacherRef.once('value', function (teacherSnapshot) {
      let teacher = teacherSnapshot.val();
      studentRef.once('value', function (studentSnapshot) {
        let student = studentSnapshot.val();
        let mailOptions = {
          from: '"Support Seminar" <' + functions.config().gmail.email + '>',
          to: teacher.email,
          subject: 'Support Seminar Student Request',
          text: `${student.name} has requested to come to your homeroom. To accept, please click this link: ${acceptLink}. To decline, please click this link: ${declineLink}`,
          html: generateRequestEmail(teacher, student, request.reason, acceptLink, declineLink)
        };
        return mailTransport.sendMail(mailOptions);
      });
    });
  }
});
/**
 * Accepts the student request and sends them a push notifcation
 */

exports.acceptRequest = functions.https.onRequest((req, res) => {
  const params = req.url.split('/');
  const requestID = params[2];
  const ref = db.ref('requests/' + requestID); // Set accepted value

  ref.update({
    accepted: true
  }, function (error) {
    if (error) {
      console.log('Error setting accepted value.' + error);
      return res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>Support Seminar Request</title>
                </head>
                <body>
                    <h1>There was an error accepting the user. Please try again later.\n${error}</h1>
                </body>
            </html>`);
    } else {
      console.log('User accepted.');
    }
  }); // Send e-mail to current support seminar teacher

  ref.once('value', function (requestSnapshot) {
    db.ref('users/' + requestSnapshot.val().user).once('value', function (userSnapshot) {
      let student = userSnapshot.val();
      db.ref('teachers/' + userSnapshot.val().defaultSeminar).once('value', function (teacherSnapshot) {
        let teacher = teacherSnapshot.val();
        let mailOptions = {
          from: '"Support Seminar" <' + functions.config().gmail.email + '>',
          to: teacher.email,
          subject: 'Support Seminar Student Transfer',
          text: 'Hello ' + teacher.firstName + ' ' + teacher.lastName + ',\n' + userSnapshot.name + ' has been accepted into a different support seminar, and as such will be going straight there. Please do not mark them absent.',
          html: '<h1>Hello ' + teacher.firstName + ' ' + teacher.lastName + ',</h1>\n<p>' + student.name + ' has been accepted into a different support seminar, and as such will be going straight there. Please do not mark them absent.</p>'
        };
        mailTransport.sendMail(mailOptions);
      });
    });
  }); // Return HTML file.

  return ref.once('value', requestSnapshot => {
    let request = requestSnapshot.val();
    db.ref('users/' + requestSnapshot.val().user).once('value', function (studentSnapshot) {
      let student = studentSnapshot.val();
      db.ref('teachers/' + requestSnapshot.val().teacher).once('value', function (teacherSnapshot) {
        let teacher = teacherSnapshot.val();

        if ('pushId' in request) {
          let payload = {
            notification: {
              title: 'Support Seminar Request',
              body: 'Your Support Seminar request for ' + teacher.lastName + ' has been approved!'
            }
          };
          admin.messaging().sendToDevice(request.pushId, payload);
        }

        return res.send(generateAcceptedScreen(student));
      });
    });
  });
});