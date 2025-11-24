import "dotenv/config";
import { Worker, Job } from "bullmq";
import { sendOTPSMS } from "./services/sms.service.js"; // Remove .js extension

const REDIS_URL = process.env.REDIS_URL || "";

interface OTPJobData {
  phone: string;
  otp: string;
  timestamp: string;
}

// Create Worker
const otpWorker = new Worker<OTPJobData>(
  "otp-queue",
  async (job: Job<OTPJobData>) => {
    console.log(`\n🔄 Processing job ${job.id}...`);
    console.log(`📱 Phone: ${job.data.phone}, OTP: ${job.data.otp}`);

    try {
      // Send SMS
      const result = await sendOTPSMS(job.data.phone, job.data.otp);

      if (!result.success) {
        throw new Error(result.message);
      }

      console.log(`✅ SMS sent successfully to ${job.data.phone}`);
      if (result.messageId) {
        console.log(`📬 Message ID: ${result.messageId}`);
      }

      return {
        success: true,
        phone: job.data.phone,
        messageId: result.messageId,
      };
    } catch (error: any) {
      console.error(`❌ Failed to send SMS to ${job.data.phone}:`, error.message);
      throw error; // This will trigger retry
    }
  },
  {
    connection: {
      url: REDIS_URL,
    },
    concurrency: 5,
    limiter: {
      max: 10,
      duration: 1000,
    },
     // Retry failed jobs 3 times
    
  }
);

// Event Listeners
otpWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed successfully\n`);
});

otpWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
  
  if (job && job.attemptsMade >= (job.opts.attempts || 3)) {
    console.error(`🚨 Job ${job.id} exhausted all retry attempts`);
    // TODO: Send alert or log to error tracking service
  }
});

otpWorker.on("error", (err) => {
  console.error("⚠️  Worker error:", err);
});

otpWorker.on("ready", () => {
  console.log("✅ OTP Worker is ready and listening for jobs...");
  console.log(`📡 Connected to Redis: ${REDIS_URL}`);
  console.log(`📲 SMS Provider: ${process.env.SMS_PROVIDER || 'DEV MODE'}\n`);
});

// Graceful Shutdown
process.on("SIGTERM", async () => {
  console.log("\n🛑 SIGTERM received, closing worker...");
  await otpWorker.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("\n🛑 SIGINT received, closing worker...");
  await otpWorker.close();
  process.exit(0);
});

console.log("🚀 OTP Worker starting...");