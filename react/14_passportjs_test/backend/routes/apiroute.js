import express from 'express';

const router = express.Router();

router.get("/greeting", (req, res) => {
  console.log(req.session.passport.user.user);
  return res.status(200).json({ "Message": "Hello " + req.session.passport.user.user });
})

export default router;