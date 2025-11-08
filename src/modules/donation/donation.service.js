import { DONATION_MODEL } from "./donation.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";

class DonationService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  // ✅ Create donation order
  async createOrder(data) {
    const { fundName, donorName, amount, currency, donationType } = data;

    const options = {
      amount: amount * 100, // amount in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        fundName,
        donorName,
        donationType,
      },
    };

    const order = await this.razorpay.orders.create(options);

    const donation = await DONATION_MODEL.create({
      fundName,
      donorName,
      amount,
      currency,
      donationType,
      razorpay_order_id: order.id,
    });

    return { order, donation };
  }

  // ✅ Verify payment and update DB
  async verifyPayment(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    const donation = await DONATION_MODEL.findOne({ razorpay_order_id });
    if (!donation) throw new Error("Donation not found");

    donation.razorpay_payment_id = razorpay_payment_id;
    donation.razorpay_signature = razorpay_signature;
    donation.paymentStatus = isValid ? "successful" : "failed";

    await donation.save();

    return { success: isValid, donation };
  }

  // ✅ Utility: Generate valid signature manually (for backend testing)
  async generateSignature({ razorpay_order_id, razorpay_payment_id }) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    return { signature };
  }
}

export default new DonationService();
