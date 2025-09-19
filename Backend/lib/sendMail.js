import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "bimalghorasaini730@gmail.com",
    pass: "wscs refw ppsf jivb",
  },
});

const sendMail = async ({ to, subject,text, html }) =>  {
try{
    await transporter.sendMail({
        from: "test@gmail.com",
        to,
        subject,
        text,
        html,
    });

} 
catch(error){
    console.log("email sending failed", error);

}
};
export { sendMail};