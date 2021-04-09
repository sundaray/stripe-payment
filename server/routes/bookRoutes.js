const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post(
  "/book",
  asyncHandler(async (req, res, next) => {
    const email = req.body.email;

    fs.readFile("auth.pdf", (err, data) => {
      if (err) {
        console.error(err);
      }
      if (data) {
        const msg = {
          to: email,
          from: "rawgrittt@gmail.com",
          subject: "AUTH-MERN",
          html: "<p>Please find attached the book.</p>",
          attachments: [
            {
              content: data.toString("base64"),
              filename: "Auth.pdf",
              type: "application/pdf",
              disposition: "attachment",
              content_id: "mytext",
            },
          ],
        };

        (async () => {
          try {
            await sgMail.send(msg);
          } catch (error) {
            console.error(error);

            if (error.response) {
              console.error(error.response.body);
            }
          }
        })();
      }
    });

    res.send({ message: "Book Emailed" });
  })
);

module.exports = router;
