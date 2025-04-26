import { asyncHandler } from '../utils/async-handler.js'
import { db } from "../db/index.js"
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import bcrypt from 'bcryptjs';


const register = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const isUserAlreadyExist = await db.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    })
    if (isUserAlreadyExist) {
        console.log('User already exist');
        console.log(isUserAlreadyExist);
        const recordAlreadyExistFor = isUserAlreadyExist.email === email ? "Email" : "Username";
        throw new ApiError(409, `${recordAlreadyExistFor} already exist`);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const isUserRegistered = await db.user.create({ data: { email, password: encryptedPassword, username } });
    console.log('Registred user ' + isUserRegistered)
    res.status(201).json(new ApiResponse(201, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {

});

export { register }