const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Helper to set cookie
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict'
    };

    res.status(statusCode)
        .cookie('jwt', token, options)
        .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            onboardingCompleted: user.onboardingCompleted,
            phone: user.phone,
            address: user.address,
            dob: user.dob,
            licenseNumber: user.licenseNumber,
            licenseImage: user.licenseImage,
            bio: user.bio
        });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            sendTokenResponse(user, 200, res);
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            sendTokenResponse(user, 201, res);
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                onboardingCompleted: user.onboardingCompleted,
                phone: user.phone,
                address: user.address,
                dob: user.dob,
                licenseNumber: user.licenseNumber,
                licenseImage: user.licenseImage,
                bio: user.bio,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.bio) user.bio = req.body.bio;
            if (req.body.phone) user.phone = req.body.phone;
            if (req.body.address) user.address = req.body.address;
            if (req.body.licenseNumber) user.licenseNumber = req.body.licenseNumber;
            if (req.body.dob) user.dob = req.body.dob;
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.files && req.files.length > 0) {
                console.log('Update Profile: Received files:', req.files.map(f => f.fieldname));
                req.files.forEach(file => {
                    if (file.fieldname === 'profileImage') {
                        user.profileImage = file.path;
                    } else if (file.fieldname === 'licenseImage') {
                        user.licenseImage = file.path;
                    }
                });
            } else if (req.file) {
                // Fallback for single file if middleware changes back to single
                user.profileImage = req.file.path;
            }

            // Allow updating profile image via URL if provided in body (e.g. initial avatar selection)
            // But prefer uploaded file if present
            if (req.body.profileImage && (!req.files || req.files.length === 0)) {
                user.profileImage = req.body.profileImage;
            }

            const updatedUser = await user.save();
            sendTokenResponse(updatedUser, 200, res); // Refresh cookie/token if needed
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Complete Onboarding
// @route   PUT /api/auth/onboarding
// @access  Private
const completeOnboarding = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            user.dob = req.body.dob || user.dob;
            user.licenseNumber = req.body.licenseNumber || user.licenseNumber;

            if (req.files) {
                if (req.files.profileImage) {
                    user.profileImage = req.files.profileImage[0].path;
                }
                if (req.files.licenseImage) {
                    user.licenseImage = req.files.licenseImage[0].path;
                }
            }

            user.onboardingCompleted = true;

            const updatedUser = await user.save();
            sendTokenResponse(updatedUser, 200, res);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Onboarding Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle Favorite
// @route   PUT /api/auth/favorites
// @access  Private
const toggleFavorite = async (req, res) => {
    const { vehicleId } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            if (user.favorites.includes(vehicleId)) {
                user.favorites = user.favorites.filter(id => id.toString() !== vehicleId);
            } else {
                user.favorites.push(vehicleId);
            }
            await user.save();
            res.json(user.favorites);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete my account
// @route   DELETE /api/auth/profile
// @access  Private
const deleteMyAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            await user.deleteOne();
            res.cookie('jwt', '', {
                httpOnly: true,
                expires: new Date(0)
            });
            res.json({ message: 'Account deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset url
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        // For frontend development, we might want to redirect to the frontend URL instead:
        const frontendResetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

        console.log('--- PASSWORD RESET LINK ---', frontendResetUrl);

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please click on the following link to reset your password:</p>
            <a href="${frontendResetUrl}" clicktracking=off>${frontendResetUrl}</a>
            <p>If you did not request this, please ignore this email.</p>
        `;

        try {
            const sendEmail = require('../utils/sendEmail');
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message
            });

            res.status(200).json({ success: true, data: 'Email sent' });
        } catch (error) {
            console.error(error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return res.status(500).json({ message: 'Email could not be sent' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset Password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
const resetPassword = async (req, res) => {
    const crypto = require('crypto');
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
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
};
