import DonationService from "./donation.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class DonationController {
  constructor() {
    this.donationService = DonationService;
  }

  createOrder = async (req, res, next) => {
    try {
      const result = await this.donationService.createOrder(req.body);
      res.success(
        "Donation order created successfully",
        result,
        statusCode.CREATED
      );
    } catch (err) {
      next(err);
    }
  };

  verifyPayment = async (req, res, next) => {
    try {
      const result = await this.donationService.verifyPayment(req.body);
      res.status(200).json({
        success: result.success,
        message: result.success
          ? "Payment verified successfully"
          : "Invalid payment signature",
        donation: result.donation,
      });
    } catch (err) {
      next(err);
    }
  };

  // ⚙️ Extra: API to generate a valid signature for testing
  generateSignature = async (req, res, next) => {
    try {
      const result = await this.donationService.generateSignature(req.body);
      res.status(200).json({
        success: true,
        message: "Signature generated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
