import Razorpay from "razorpay";
import crypto from "crypto";
import { DONATION_MODEL } from "./donation1.model.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import dotenv from "dotenv";

dotenv.config();

class Donation1Service {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  // 🧾 Create Razorpay order
  async createOrder(data) {
    try {
      const { fundName, donorName, amount, donationType } = data;
      if (!fundName || !donorName || !amount) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          success: false,
          message: "Missing required fields",
        };
      }

      // Step 1: Create donation in DB (pending)
      const donation = await DONATION_MODEL.create({
        fundName,
        donorName,
        amount,
        donationType,
        paymentStatus: "pending",
      });

      // Step 2: Create Razorpay order
      const order = await this.razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      donation.razorpayOrderId = order.id;
      await donation.save();

      // Step 3: Return order data
      return {
        statusCode: statusCode.SUCCESS,
        success: true,
        message: "Donation order created successfully",
        data: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          donationId: donation._id,
          key: process.env.RAZORPAY_KEY_ID,
        },
      };
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return {
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error while creating order",
      };
    }
  }

  // 🔐 Verify Razorpay payment
  async verifyPayment(data) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          success: false,
          message: "Missing payment details",
        };
      }

      // Step 1: Validate signature
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      const isValid = expectedSignature === razorpay_signature;
      if (!isValid) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          success: false,
          message: "Invalid payment signature",
        };
      }

      // Step 2: Update donation record
      const donation = await DONATION_MODEL.findOne({ razorpayOrderId: razorpay_order_id });
      if (!donation) {
        return {
          statusCode: statusCode.NOT_FOUND,
          success: false,
          message: "Donation not found",
        };
      }

      donation.paymentStatus = "paid";
      donation.razorpayPaymentId = razorpay_payment_id;
      donation.razorpaySignature = razorpay_signature;
      await donation.save();

      // Step 3: Return success response
      return {
        statusCode: statusCode.SUCCESS,
        success: true,
        message: "Payment verified successfully",
        data: {
          donationId: donation._id,
          fundName: donation.fundName,
          amount: donation.amount,
          paymentId: donation.razorpayPaymentId,
        },
      };
    } catch (error) {
      console.error("Error verifying payment:", error);
      return {
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error while verifying payment",
      };
    }
  }
}

export default new Donation1Service();
