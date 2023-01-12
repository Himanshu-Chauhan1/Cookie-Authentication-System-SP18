

//========================================POST/PRIVATE==========================================================//

const create = async function (req, res) {
    try {
        res.status(200).send({ status: 1010, message: "logged In" });
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


export { create } 