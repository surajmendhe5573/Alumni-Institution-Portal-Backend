import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = 'profile-images'; 

    const fieldName = file.fieldname.toLowerCase();
    if (fieldName.includes('resume')) folderName = 'resume-files';
    else if (fieldName.includes('certificate')) folderName = 'certificate-images';

    return {
      folder: folderName,
      allowed_formats: ['jpeg', 'png', 'webp'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    };
  },
});

const uploadProfileImage = multer({ storage: profileStorage }).single('profileImage');

// Optional: If you want multiple fields in future
const uploadMultipleProfileFields = (fields) => multer({ storage: profileStorage }).fields(fields);

export { uploadProfileImage, uploadMultipleProfileFields };
