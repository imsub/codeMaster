import { body } from 'express-validator';

const registerUserValidater = function (req, res) {
    return [
        body("username").trim().notEmpty().withMessage('Username is required')
        .isLowercase().withMessage('User name must be in lowercase')
        .isLength({min : 5}).withMessage("Username must be at lease 3 characters long"),
        body("email").notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Not a valid e-mail address'),
        body("password").trim().notEmpty().withMessage('Password is required')
    ];
}

export { registerUserValidater }