// import dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../lib/userUtil").User
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "as17EeDG1Lk56HGD52mda01dSs5dkRRrT552s";

const auth = {};

auth.signup = async (req, res) => {
    const data = req.body;

    try {
        const hashPassword = await bcrypt.hash(data.password, 10);
        const user = await new User({
            email : data.email,
            password: hashPassword,
            firstName : data.firstName,
            lastName : data.lastName,
            fullName : data.firstName+" "+data.lastName,
            address : data.address,
            phone : data.phone
        }).save();

        const token = jwt.sign(
            { user_id: user._id },
            JWT_SECRET_KEY);

        res.status(200).send({
            message: "User Registered Successfully!",
            data : {
                token,
                user_id: user._id,
                email: user.email,
                fullName: user.fullName,
                address: user.address,
                phone: user.phone
            }
        })
    } catch (error) {
        if (error.keyPattern) res.status(400).send({ message:"User With Email Already Exists", err:error });
        else res.status(400).send({ message:"Could Not Register User", err:error })
    }
}

auth.signin = async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ email: data.email });
        if(!user) return res.status(400).send({ message:"Invalid Email or Password!"});
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if(!isValidPassword) return res.status(400).send({ message:"Invalid Email or Password"});

        const token = jwt.sign({ user_id: user._id }, JWT_SECRET_KEY, { expiresIn : 60 * 10 });

        res.status(200).send({
            message: `Hello ${user.fullName}! Welcome To TeqyVerse Library!`
        })

    } catch (error) {
        res.status(400).send({ message: "Unable To SignIn", err: error })
    }
}

module.exports = auth;