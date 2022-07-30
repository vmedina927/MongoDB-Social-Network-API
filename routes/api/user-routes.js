const router = require('express').Router;
const { create } = require('domain');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../controllers/user-controller');

router.route('/').get(getAllUsers).post(createrUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;