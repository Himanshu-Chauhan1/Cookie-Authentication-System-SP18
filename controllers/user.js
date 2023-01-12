import bcrypt from 'bcrypt';
import user from '../models/user.js';
import { signAccessToken } from '../helpers/jwt.js';

////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};


//========================================CreateUser==========================================================//

const register = async function (req, res) {
    try {
        const data = req.body

        const { userName, password } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(userName)) {
            return res.status(422).send({ status: 1002, message: "userName is required" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }

        if (password.length < 8) {
            return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
        }

        if (password.length > 15) {
            return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
        }

        const userCreated = await user.create(data)

        res.status(201).send({ status: 1009, message: "User has been created successfully", data: userCreated })

    } catch (error) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================LoginUser==========================================================//

let login = async (req, res) => {
    try {

        const data = req.body;
        let { userName, password } = data

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }
        if (!isValid(userName)) {
            return res.status(422).send({ status: 1002, message: "userName is required" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "password is required" })
        }

        const checkUser = await user.findOne({ userName: userName });
        if (!checkUser) {
            return res.status(422).send({ status: 1003, message: "Invalid userName" });
        }

        let checkPassword = await bcrypt.compare(password, checkUser.password)
        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid password credentials" })

        const token = await signAccessToken(checkUser._id.toString());

        const userData = { userName: checkUser.userName, token: token }
        return res.cookie('access_token', token, { httpOnly: true }).status(200).send({ status: 1010, message: "User successfully logged in", data: userData })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================LogoutUser==========================================================//

const logout = async function (req, res) {
    try {

        res.clearCookie('access_token');
        // res.status(200).json('Logout success')
        res.status(200).send({ status: 1010, message: "You have ben logout succesfully" });

    }
    catch (err) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

export { register, login, logout }





