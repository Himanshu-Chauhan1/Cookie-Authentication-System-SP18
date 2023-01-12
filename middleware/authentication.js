import jwt from 'jsonwebtoken';


//----------------------------------------authentication----------------------------------------------------*/
const authentication = async function (req, res, next) {
    try {
        let token = req.cookies.access_token;
        if (!token) return res.status(422).send({ status: 1002, message: "Token is Required" })

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, data) => {
            if (error) {
                return res.status(401).send({ status: 1007, message: "Unauthorized Access" })
            } else {
                req.userId = data.aud
                next();
            }
        })
    }
    catch (error) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check again" })
    }
}

export { authentication }




