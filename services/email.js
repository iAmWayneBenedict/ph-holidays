const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	secure: false,
	auth: {
		user: process.env.MAIL_APP_EMAIL,
		pass: process.env.MAIL_APP_PASSWORD,
	},
});

const verifyUserEmail = async (email, code) => {
	try {
		let info = await transporter.sendMail({
			from: process.env.MAIL_APP_EMAIL,
			to: email,
			subject: "Email Verification for PH Holidays API",
			text: "Email Verification",
			html: `<html xmlns:v="urn:schemas-microsoft-com:vml">

            <head>
              <title></title>
              <meta charset="UTF-16LE">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style id="aw-autoinject" type="text/css">
                body,
                a {
                  word-break: break-word;
                }
            
                .feed__title a {
                  text-decoration: underline;
                }
            
                .text-element h1 {
                  color: inherit;
                  font-family: inherit;
                  font-size: 36px;
                  line-height: 1.15;
                  font-weight: 700;
                  margin: 0.5em 0;
                }
            
                .text-element h2 {
                  color: inherit;
                  font-family: inherit;
                  font-size: 32px;
                  line-height: 1.15;
                  font-weight: 700;
                  margin: 0.5em 0;
                }
            
                .text-element h3 {
                  color: inherit;
                  font-family: inherit;
                  font-size: 28px;
                  line-height: 1.15;
                  font-weight: 700;
                  margin: 0.5em 0;
                }
            
                .text-element h4 {
                  color: inherit;
                  font-family: inherit;
                  font-size: 24px;
                  line-height: 1.15;
                  font-weight: 700;
                  margin: 0.5em 0;
                }
            
                .text-element h5 {
                  color: inherit;
                  font-family: inherit;
                  font-size: 20px;
                  line-height: 1.15;
                  font-weight: 700;
                  margin: 0.5em 0;
                }
            
                .text-element h6 {
                  color: inherit;
                  font-family: inherit;
                  font-size: 16px;
                  line-height: 1.15;
                  font-weight: 700;
                  margin: 0.5em 0;
                }
            
                .text-element p,
                .paragraph p {
                  color: inherit;
                  font-family: inherit;
                  font-size: 16px;
                  line-height: 1.5;
                  margin: 0;
                }
            
                .text-element div {
                  color: inherit;
                  font-family: inherit;
                  font-size: 16px;
                  line-height: 1.5;
                  margin: 0;
                }
            
                .text-element pre {
                  color: inherit;
                  display: block;
                  font-family: monospace;
                  font-size: 16px;
                  line-height: 1;
                  margin: 1em auto;
                  white-space: pre;
                  max-width: 500px;
                  overflow: auto;
                  overflow-wrap: break-word;
                }
            
                .text-element address {
                  color: inherit;
                  font-family: inherit;
                  display: block;
                  font-size: 16px;
                  font-style: italic;
                  line-height: 1.15;
                  margin: 0.5em 0;
                }
            
                .text-element blockquote,
                .headline blockquote,
                .paragraph blockquote {
                  border-left: 5px solid #ccc;
                  font-style: normal;
                  margin-left: 0;
                  margin-right: 0;
                  overflow: hidden;
                  padding-left: 15px !important;
                  padding-right: 15px !important;
                  box-sizing: border-box;
                }
            
                @media only screen and (max-width:599px) {
                  img {
                    max-width: 100% !important;
                    min-height: 1px !important;
                    height: auto !important;
                  }
            
                  .text-element pre {
                    max-width: 250px;
                  }
            
                  .aw-stack .container {
                    box-sizing: border-box;
                    display: block !important;
                    float: left;
                    max-width: 100% !important;
                    margin: auto;
                    width: 100% !important;
                  }
            
                  .video .video-content {
                    width: auto !important;
                  }
            
                  .feed__item--postcard-side,
                  .feed__item--postcard-main,
                  .feed__item--block {
                    box-sizing: border-box;
                    display: block !important;
                    max-width: 100% !important;
                    margin: auto;
                    width: 100% !important;
                  }
            
                  .feed__item--block>div {
                    margin: 0 0 16px 0 !important;
                  }
            
                  .feed__image {
                    width: 100% !important;
                  }
            
                  .feed__spacer {
                    display: none !important;
                  }
                }
              </style>
              <style type="text/css">
                v:* {
                  behavior: url(#default#VML);
                  display: inline-block;
                }
            
                body,
                #bodyTable,
                #bodyCell {
                  height: 100%;
                  margin: 0px;
                  padding: 0px;
                  width: 100%
                }
            
                body {
                  background-color: #fefefe;
                  color: #333333;
                  font-family: Tahoma, Arial, sans-serif;
                  font-size: 18px;
                  line-height: 1.5em;
                  font-weight: 400 !important;
                  height: 100%;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100%
                }
            
                body,
                table,
                td {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%
                }
            
                table,
                td {
                  color: #333333;
                  font-family: Tahoma, Arial,
                    sans-serif;
                  border-collapse: collapse;
                  border-spacing: 0;
                  border: 0;
                  font-size: 18px;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt
                }
            
                img {
                  -ms-interpolation-mode: bicubic;
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  max-width: 100%;
                  outline: none;
                  text-decoration: none;
                  color: #333333;
                  font-size: 20px;
                  font-weight: 700;
                  border-radius: 10px
                }
            
                .temp-header img {
                  border-radius: 0px
                }
            
                table {
                  border-collapse: collapse !important
                }
            
                strong {
                  font-weight: 700
                }
            
                .container {
                  padding: 0
                }
            
                .floated-none td {
                  padding: 0
                }
            
                .contained {
                  max-width: 600px;
                  width: 100%
                }
            
                .contained img {
                  height: auto !important;
                  max-width: 100% !important
                }
            
                .paragraph div,
                .paragraph p {
                  color: #333333;
                  font-family: Tahoma, Arial, sans-serif;
                  font-size: 18px;
                  line-height: 125%;
                  font-weight: 400;
                  text-align: left
                }
            
                .text-element div,
                .text-element p {
                  color: #333333;
                  font-family: Tahoma, Arial, sans-serif;
                  font-size: 18px;
                  line-height: 125%;
                  font-weight: 400;
                  text-align: left
                }
            
                .text-element a,
                .paragraph a {
                  color: #000000;
                  font-weight: bold
                }
            
                .headline {
                  color: #333333;
                  font-family: Tahoma, Arial, sans-serif;
                  font-size: 36px;
                  line-height: 125%;
                  font-weight: 700;
                  text-align: left
                }
            
                .headline a {
                  color: #333333;
                  text-decoration: none;
                  font-weight: bold
                }
            
                .temp-footer .paragraph div,
                .temp-footer .paragraph p {
                  color: #7c7c7c;
                  font-size: 14px;
                  line-height: 125%
                }
            
                .temp-footer .text-element div,
                .temp-footer .text-element p {
                  color: #7c7c7c;
                  font-size: 14px;
                  line-height: 125%
                }
            
                .temp-footer .headline {
                  color: #7c7c7c;
                  font-size: 16px
                }
            
                .temp-footer .text-element a,
                .temp-footer .paragraph a {
                  color: #7c7c7c
                }
            
                .temp-product .temp-padding {
                  padding: 10px
                }
            
                .temp-product .image {
                  max-width: 100%;
                  height: auto;
                  padding-bottom: 0px
                }
            
                .temp-product .image img {
                  border-radius: 4px
                }
            
                .temp-product img a {
                  text-decoration: none !important
                }
            
                .temp-product .temp-headline {
                  color: #333333;
                  font-size: 18px;
                  line-height: 1.15em;
                  max-width: 100%;
                  text-align: left
                }
            
                .temp-product .temp-paragraph {
                  font-size: 18px;
                  line-height: 1.25em;
                  font-weight: 400;
                  max-width: 100%;
                  text-align: left;
                  padding-top: 2px
                }
            
                .temp-product .temp-price {
                  font-size: 20px;
                  line-height: 1.15em;
                  font-weight: 500;
                  max-width: 100%;
                  text-align: left;
                  padding-top: 2px
                }
            
                .temp-product a {
                  color: #333333;
                  font-weight: bold;
                  text-decoration: none !important
                }
            
                .temp-product .temp-button-padding table {
                  width: 100%
                }
            
                .coupon .headline {
                  font-size: 20px;
                  text-align: center
                }
            
                .coupon .paragraph {
                  text-align: center
                }
            
                .temp-article .headline {
                  font-size: 24px;
                  margin: 0;
                  text-align: left !important
                }
            
                .temp-article .paragraph {
                  text-align: left !important
                }
            
                .temp-article td {
                  padding: 0
                }
            
                .temp-article .padding {
                  padding-bottom: 10px
                }
            
                .temp-article .read-more {
                  text-align: left
                }
            
                .temp-article a {
                  color: #333333
                }
            
                .clear {
                  clear: both
                }
            
                .aw-image-link {
                  border: 0;
                  text-decoration: none
                }
            
                ol,
                ul {
                  color: #333333
                }
            
                li {
                  color: #333333
                }
            
                a[x-apple-data-detectors] {
                  border-bottom: none !important;
                  color: inherit !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important
                }
            
                center>div {
                  box-sizing: border-box
                }
            
                @media screen and (max-width: 599px) {
            
                  body,
                  #bodyTable,
                  #bodyCell {
                    width: 100% !important;
                    margin: auto;
                    clear: both !important;
                    display: block
                  }
            
                  img {
                    max-width: 100% !important;
                    height: auto !important;
                    max-height: 300%
                  }
            
                  .paragraph {
                    font-size: 18px !important
                  }
            
                  .headline {
                    font-size: 28px !important
                  }
            
                  .temp-footer .paragraph {
                    font-size: 14px !important
                  }
            
                  .temp-footer .headline {
                    font-size: 16px !important
                  }
            
                  .share img {
                    width: 20px !important;
                    height: auto !important;
                    display: inline-block
                  }
            
                  .temp-button-padding td {
                    padding: 10px 20px !important
                  }
            
                  .video td {
                    display: table-cell !important;
                    text-align: center !important
                  }
            
                  .temp-article div {
                    box-sizing: border-box !important;
                    display: block !important;
                    width: 100% !important
                  }
            
                  .floated-left {
                    display: inline-table !important;
                    width: 100% !important;
                    text-align: center !important
                  }
            
                  .floated-left td {
                    padding: 10px 0px !important
                  }
            
                  .floated-right {
                    display: inline-table !important;
                    width: 100% !important;
                    text-align: center !important
                  }
            
                  .floated-right td {
                    padding: 10px 0px !important
                  }
            
                  .signature_spacer {
                    display: none !important
                  }
            
                  .signature_content {
                    text-align: center !important
                  }
                }
            
                @media only screen and (min-width: 10px) and (max-width: 599px) {
                  u~div img {
                    width: auto !important
                  }
                }
              </style>
            </head>
            
            <body>
            
              <center>
                <div align="center">
                  <table border="0" cellspacing="0" cellpadding="0" width="100%" class="aw-bgc" align="center" role="presentation" style="
                background-color: rgb(248, 248, 248);font-weight: 400; text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse: collapse; border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;">
                    <tbody>
                      <tr>
                        <td class="temp-wrapper" style="text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse: collapse; border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;">
                          <div align="center">
                            <!--[if (gte mso 9)]><table border="0" cellspacing="0" cellpadding="0" width="600" align="center" bgcolor="#ffffff" role="presentation"><tr><td class="temp-body"><![endif]-->
                            <div class="temp-body" style="background-color:#ffffff; border-radius:10px; max-width: 600px; margin:60px 16px 200px; 
                padding: 16px;">
                              <div class="temp-fullbleed contained" style="max-width: 600px; width: 100%;">
                                <div class="region">
                                  <div>
                                    <table class="row aw-stack" style="width: 100%; text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse: collapse; border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td class="container" style="padding: 0px; width: 100%; text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse: collapse;
            border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;" width="100%" valign="top">
                                            <div class="definition-parent"><span>
                                                <table align="center" width="100%" class="floated-none" style="float: none; text-align: center; text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse: collapse; border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;" role="presentation">
                                                  <tbody>
                                                    <tr>
                                                      <td align="center" style="padding: 0px; text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse: collapse; border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;">
                                                        <img class="model" src="https://github.com/iAmWayneBenedict/ph-holidays/blob/master/src/icons/android-chrome-512x512.png?raw=true" style="display: block; width: 100px; border-width: 0px; border-style: none; line-height: 100%; max-width: 100%; outline-width: medium; outline-style: none; text-decoration: none; color: rgb(51, 51, 51); font-size: 20px; font-weight: 700; border-radius: 10px;" alt="Image" width="100">
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </span></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table class="row aw-stack" style="width: 100%; text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse: collapse; border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td class="container" style="padding: 30px; width: 100%; text-size-adjust: 100%; color: rgb(51, 51, 51); font-family: Tahoma, Arial, sans-serif; border-collapse:
            collapse; border-spacing: 0px; border-width: 0px; border-style: none; font-size: 18px;" width="100%" valign="top">
                                            <div class="definition-parent">
                                              <div class="text-element paragraph">
                                                <div style="color: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 18px; line-height: 125%; font-weight: 400; text-align: left;">
            
                                                  <p style="color: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 19px; line-height: 125%; font-weight: 400; text-align: center;">Hello, this is the verification code for your <b>PH Holidays</b> account ${email}. 
                                                  </p>
																									<center><h1 style="letter-spacing:10px">${code}</h1></center>
                                                  <p style="color: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 19px; line-height: 125%; font-weight: 700; text-align: center; margin-top: 24px">Thank You for Signing up &#10084;
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--[if (gte mso 9)]></td></tr></table><![endif]-->
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </center>
            </body>
            
            </html>`,
		});

		return info;
	} catch (err) {
		throw err;
	}
};

module.exports = verifyUserEmail;
