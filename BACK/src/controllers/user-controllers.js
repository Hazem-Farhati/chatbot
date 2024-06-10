// controllers/userController.js
import mongoose from 'mongoose';
import User from '../models/user.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};

export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send('User Already registered');
        
        const hashPassword = await hash(password, 10);
        const user = new User({ name, email, role, password: hashPassword });
        await user.save();
        
        return res.status(201).json({ message: 'OK', name: user.name, email: user.email, _id: user._id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User Not Registered');
        }
        
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send('Incorrect Password');
        }
        
        res.clearCookie(COOKIE_NAME, {
            domain: 'localhost',
            httpOnly: true,
            signed: true,
            path: '/',
        });
        
        const token = createToken(user._id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });
        
        return res.status(200).json({
            message: 'OK',
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            token: token,
            isAdmin: user.isAdmin,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};

export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        const token = createToken(user._id.toString(), user.email, '7d');

        if (!user) {
            return res.status(401).send('User Not Registered or Token malfunctioned');
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Permission didn\'t match');
        }
        
        return res.status(200).json({
            message: 'OK',
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            token: token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};

export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send('User Not Registered or Token malfunctioned');
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send('Permission didn\'t match');
        }

        res.clearCookie(COOKIE_NAME, {
            domain: 'localhost',
            httpOnly: true,
            signed: true,
            path: '/',
        });

        return res.status(200).json({ message: 'OK', name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error', cause: error.message });
    }
};

// Function to make another user an admin
export const makeAdmin = async (req, res, next) => {
    try {
        const { adminEmail } = req.body;
        const user = await User.findOne({ email: adminEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isAdmin = true;
        await user.save();

        return res.status(200).json({ message: 'User is now an admin' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to delete a user
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.body.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
