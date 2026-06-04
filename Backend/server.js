import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Show which Gmail is being used
console.log("📧 Using Gmail:", process.env.EMAIL_USER);

// ✅ Setup Nodemailer (Gmail + App Password)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // TLS
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify Gmail connection
transporter
  .verify()
  .then(() => console.log("✅ Gmail transporter is ready!"))
  .catch((err) => console.error("❌ Gmail transporter error:", err));

// Dummy WhatsApp function (replace with Twilio later)
async function sendWhatsAppNotification(name, email, subject, message) {
  console.log(
    `📱 WhatsApp notification → ${process.env.WHATSAPP_PHONE}: New message from ${name} (${email}) | Subject: ${subject} | ${message}`
  );
  return true;
}

// ✅ Contact Form API
app.post("/send-message", async (req, res) => {
  console.log("📩 Incoming request body:", req.body);

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "Missing fields (name, email, message)" });
    }

    // Send email
    const emailResult = await transporter.sendMail({
      from: `"Mind Care Companion" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject || "New Contact Form Message",
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("✅ Email sent successfully!", emailResult.messageId);

    // WhatsApp notification (log only for now)
    await sendWhatsAppNotification(name, email, subject, message);

    return res.json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Error sending message:", err.message);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to send message" });
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.json({ msg: "Backend API is running 🚀" });
});

// ✅ Catch-all route (avoid sending HTML error pages)
app.use((req, res) => {
  res.status(404).json({ success: false, msg: "Route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.stack);
  res.status(500).json({ success: false, msg: "Server error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
