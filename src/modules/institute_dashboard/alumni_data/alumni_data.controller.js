import Alumni_dataService from "./alumni_data.service.js";
 import { statusCode } from '../../utils/constants/statusCode.js';

export default class Alumni_dataController {
  constructor() {
    this.alumni_dataService =  Alumni_dataService;
  }

  getAll = async (req, res, next) => {
    try {
            // res.fail('Todos not found');
       res.success("Get All Todos",todos, statusCode.OK);
      
    } catch (err) {
      next(err);
    }
  };
}
