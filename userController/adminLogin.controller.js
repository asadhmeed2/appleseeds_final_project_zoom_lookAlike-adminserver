const adminModule = require("../modules/admin.module");
const { v4: uuidv4 } = require("uuid");
const auth = require("../auth/auth");

/**
 *
 * @param {*} req
 * @param {*} res
 */
const login = (req, res) => {
  const { email, password } = req.body;
  console.log("email: ", email);
  console.log("password: ", password);
  const uniqid = uuidv4(); // unique id to adentify the user when logout
  adminModule.findOne({email: email}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ msg: "email or password incorrect" });
    }
    console.log("user",user);
    if (!user) {
      return res.status(404).send({ msg: "email or password incorrect" });
    }
    if (user && password === user.password) {
      if (user.role === "admin") {
        const { accessToken, refreshToken } = auth.createTokens(
          req,
          user.role,
          uniqid
          )
          adminModule.findByIdAndUpdate(
            user._id,
            { refreshToken: refreshToken, uniqid: uniqid },{new:true},
            (err, data) => {
              if (err) return res.status(401).send("user does not exist");
              console.log("105 updated usre " ,data);
              return res
                .status(200)
                .send({ accessToken: accessToken, refreshToken: refreshToken });
            }
          );
      } 
    } else {
      return res.status(404).json({ msg: "email or password incorrect" });
    }
  });
};

const logout = (req, res) => {
  const { uniqid } = req.user;
  adminModule.findOne({ uniqid: uniqid }, (err, data) => {
    if (err) {
      return res.status(401).send("user does not exist");
    }
    if (data.role === "admin") {
      logoutToAllUsers();
      return res.status(200).json({ adminLogedOut: true });
    }
    adminModule.findByIdAndUpdate(
      data._id,
      { refreshToken: "" },
      (err, data) => {
        if (err) return res.status(401).send("user does not exist");
        return res.status(200).json({
          msg: "logout successfully",
        });
      }
    );
  });
  res.sendStatus(200);
};

module.exports = {
  login,
  logout,
};
