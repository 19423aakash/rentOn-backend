const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // We'll store temporarily in a 'uploads' folder, 
        // passing it to cloudinary later, or we can use memoryStorage
        // Using diskStorage requires an 'uploads' directory or we get ENOENT
        // Let's use memoryStorage to avoid file cleanup issues on the server
        // since we are sending to Cloudinary immediately
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Actually, using memoryStorage is better for Cloudinary upload stream
// But check if user wants to keep local files? They mentioned "cloudinary for uploads", 
// implying usage of Cloudinary storage.

// Let's use Cloudinary directly in controller. 
// Standard practice: Multer locally -> Cloudinary -> Delete local.
// Or Multer Memory -> Cloudinary Stream.
// I'll stick to DiskStorage -> Cloudinary -> Unlink (Delete).
// It's more robust for large files than memory.

// We need to make sure 'uploads' folder exists.
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
