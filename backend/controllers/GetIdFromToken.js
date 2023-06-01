const jwt = require("jsonwebtoken");

async function GetIdFromToken(token) {
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    if (decodedToken) {
      return decodedToken.id;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
module.exports = { GetIdFromToken };
