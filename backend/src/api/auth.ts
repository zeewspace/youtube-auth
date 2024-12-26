import express from 'express';
import { JSONUtils } from '../utils';
const db = new JSONUtils('./db.json')

const router = express.Router();

router.get('/status', (req, res) => { })
router.post('/register', (req, res) => {
  const { email, password, name } = req.body

  const getUser = db.find({ email })
  if (getUser) return res.status(404).json({ status: "error", message: "no" })

    db.write({
      [email]: {
        email,
        password,
        name
      }
    })

  res.json({
    status: "success",
    data: getUser
  })
})
router.post('/login', (req, res) => {
  const { email, password } = req.body

  const getUser = db.find({ email })
  if (!getUser) return res.status(404).json({ status: "error", message: "no" })

  res.json({
    status: "success",
    data: getUser
  })
})

export default router;
