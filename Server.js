const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

const accountSid = "AC2fe959f4e2f7efb71cb1784bf215d576";
const authToken = "f7d16c280365a71cccb8c2c724715947";
const client = new twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

// In-memory store for OTPs (temporary storage)
const otpStore = {};

// Route to send OTP to mobile number
app.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP

  try {
    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: "+18077970068", // Twilio phone number
      to: phoneNumber,
    });


    // Store OTP in memory (for the given phone number)
    otpStore[phoneNumber] = otp;

    // In a real app, you should store the OTP temporarily, e.g., in a database or cache
    console.log(`Sent OTP: ${otp} to ${phoneNumber}`);

    res.json({ success: true, otp }); // Return OTP (for demo purposes, use a real solution to store it)
  } catch (error) {
    console.error("Error sending OTP:", error);
    console.error("Error sending:", error);
    
    res.status(500).json({ error: "Failed to send OTP" });
  }
});


// Route to verify OTP
app.post("/verify-otp",(req, res) => {
  console.log("Received OTP Verification Request:", req.body);
  const { phoneNumber, enteredOtp } = req.body;

  console.log("Received OTP Verification Request:");
  console.log("Phone Number:", phoneNumber);
  console.log("Entered OTP:", enteredOtp)

  //Retrieve OTP from memory
  const otp = otpStore[phoneNumber];

  // Check if OTP exists for the phone number
  if (!otp) {
    return res.status(400).json({ error: "OTP not found for this phone number." });
  }

  // Compare OTPs
  if (otp.toString() === enteredOtp.toString()) {
    res.json({ success: true, message: "OTP verified successfully!" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
