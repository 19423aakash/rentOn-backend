const express = require('express');
const router = express.Router();
const {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    completeOnboarding,

    toggleFavorite,
    getAllUsers,
    deleteUser,
    deleteMyAccount,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.route('/profile').get(protect, getUserProfile).put(protect, upload.any(), updateUserProfile).delete(protect, deleteMyAccount);
router.route('/onboarding').put(protect, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'licenseImage', maxCount: 1 }]), completeOnboarding);
router.route('/favorites').put(protect, toggleFavorite);
router.route('/users').get(protect, admin, getAllUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);

module.exports = router;
