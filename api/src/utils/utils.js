const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "paseadorescuidadores@gmail.com", // generated ethereal user
    pass: "jwubgwmqhjljvbtg", // generated ethereal password
  },
});

const sendEmail = async function (body) {
  const { from, to, subject, html } = body;

  let info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html,
  });
};

const googleVerify = async function (token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, picture, email } = ticket.getPayload();

  return {
    name: name,
    image: picture,
    email: email,
  };
};

const filtersAndSortValues = function (
  filtersArray,
  selectFiltersArray,
  parsedSortData
) {
  if (
    !filtersArray[0].max &&
    !filtersArray[1].min &&
    !filtersArray[2].ubication &&
    !selectFiltersArray[0].horario &&
    !selectFiltersArray[1].service &&
    !parsedSortData.sortField
  ) {
    return true;
  } else return false;
};

module.exports = {
  sendEmail,
  googleVerify,
  filtersAndSortValues,
};
