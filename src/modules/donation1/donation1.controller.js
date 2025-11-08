import Donation1Service from "./donation1.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class Donation1Controller {
  constructor() {
    this.donation1Service = Donation1Service;
  }

  // 🎯 Create order controller
  createOrder = async (req, res) => {
    const response = await this.donation1Service.createOrder(req.body);
    res.success("Donation order created successfully.", response, statusCode.CREATED)
  };

  // 🔐 Verify payment controller
  verifyPayment = async (req, res) => {
    const response = await this.donation1Service.verifyPayment(req.body);
     res.success("Payment verified successfully. Thank you for your contribution!", response, statusCode.OK)
  };
}
