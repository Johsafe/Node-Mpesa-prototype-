const generateToken = (req, res, next) => {
  console.log(body);
  // const authorization = req.headers.authorization;
  // if (authorization) {
  //   const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
  //   jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
  //     if (err) {
  //       res.status(401).send({ message: 'Invalid Token' });
  //     } else {
  //       req.user = decode;
  //       next();
  //     }
  //   });
  // } else {
  //   res.status(401).send({ message: 'No Token' });
  // }
};
module.exports = { generateToken };
