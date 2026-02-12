const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

if (!cloudName || cloudName === 'Root' || cloudName === '<Your Cloud Name>') {
  console.warn('WARNING: Cloudinary Cloud Name appears to be invalid or unconfigured:', cloudName);
  console.warn('Please check your .env file and set CLOUDINARY_CLOUD_NAME to your actual Cloudinary cloud name.');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rentz',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

module.exports = {
  cloudinary,
  storage
};
