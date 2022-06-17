import express from 'express'
import { createUser, updateUser, deleteUser, getUser, getUsers } from '../controllers/user_controller.js';
import { verify_token } from '../utils/verify_token.js';

const router = express.Router()

router.get("/checkauthentication", verify_token, (req, res, next) => {
    res.send("Hello user, you are authenticated");
})
//CREATE
router.post('/new_user', createUser)
//UPDATE
router.put('/:id', updateUser)
// DELETE
router.delete(':id', deleteUser)
// Get BY ID
router.get(':id', getUser);
// GET all
router.get('/', getUsers);

export default router;