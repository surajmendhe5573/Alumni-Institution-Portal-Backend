import ProfileService from "./profile.service.js";
 import { statusCode } from '../../../utils/constants/statusCode.js';

export default class ProfileController {
  constructor() {
    this.profileService =  ProfileService;
  }

  getAll = async (req, res, next) => {
    try {
      const profiles = await this.profileService.getAll();
      res.success("Profiles fetched successfully", profiles, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const profile = await this.profileService.getById(req.params.id);
      if (!profile) return res.fail("Profile not found", statusCode.NOT_FOUND);
      res.success("Profile fetched successfully", profile, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const newProfile = await this.profileService.create(req.body, req.file);
      res.success("Profile created successfully", newProfile, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const updatedProfile = await this.profileService.update(req.params.id, req.body, req.file);
      if (!updatedProfile) return res.fail("Profile not found", statusCode.NOT_FOUND);
      res.success("Profile updated successfully", updatedProfile, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.profileService.delete(req.params.id);
      if (!deleted) return res.fail("Profile not found", statusCode.NOT_FOUND);
      res.success("Profile deleted successfully", deleted, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  becomeMentor = async (req, res, next) => {
    try {
      const userId = req.params.id; // from URL
      const updatedProfile = await this.profileService.becomeMentor(
        userId,
        req.body
      );
      res.success("Mentor application submitted successfully", updatedProfile, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };
}
