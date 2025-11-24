import twilio from "twilio";

interface SMSResult {
  success: boolean;
  message: string;
  messageId?: string;
}

// ===========================================
// Twilio SMS Service
// ===========================================
export async function sendViaTwilio(
  phone: string,
  otp: string
): Promise<SMSResult> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      throw new Error("Twilio credentials not configured");
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Format phone number with country code
    const toNumber = phone.startsWith("+") ? phone : `+91${phone}`;

    console.log(`📱 Sending SMS from ${fromNumber} to ${toNumber}`);

    // Send SMS
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}. Valid for 5 minutes. Do not share with anyone.`,
      from: fromNumber,
      to: toNumber,
    });

    console.log(`✅ Message sent! SID: ${message.sid}`);
    console.log(`📊 Status: ${message.status}`);

    return {
      success: true,
      message: "SMS sent successfully",
      messageId: message.sid,
    };
  } catch (error: any) {
    console.error("❌ Twilio Error:", error);

    // Handle specific Twilio errors
    if (error.code === 21608) {
      return {
        success: false,
        message:
          "Phone number not verified. Add it in Twilio console: https://console.twilio.com/us1/develop/phone-numbers/manage/verified",
      };
    }

    if (error.code === 21211) {
      return {
        success: false,
        message: "Invalid phone number format",
      };
    }

    return {
      success: false,
      message: error.message || "Failed to send SMS",
    };
  }
}

// ===========================================
// Main SMS Sender
// ===========================================
export async function sendOTPSMS(
  phone: string,
  otp: string
): Promise<SMSResult> {
  const provider = process.env.SMS_PROVIDER || "DEV";

  console.log(`\n📤 Sending OTP to ${phone} via ${provider}`);
  console.log(`🔑 OTP: ${otp}`);

  if (provider.toUpperCase() === "TWILIO") return sendViaTwilio(phone, otp);
  else {
    // Development mode - just log OTP
    console.log(`\n┌${"─".repeat(50)}┐`);
    console.log(`│ 🔐 DEV MODE - OTP for ${phone.padEnd(20)} │`);
    console.log(`│ 📱 OTP: ${otp.padEnd(38)} │`);
    console.log(`└${"─".repeat(50)}┘\n`);

    return {
      success: true,
      message: "OTP logged (development mode)",
      messageId: `DEV-${Date.now()}`,
    };
  }
}
