const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v') 
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one User by id
    getUserById({ params }, res) {
        UserById({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create a User
    createUser({ body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update a User by id
    updateUser( { params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
            .then (dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete a User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.UserId })
            .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!'});
                return;
    }
    })    
            .catch(err => res.status(400).json(err));
    },

    // add a Friend
    addFriend({ params, }, res) {
        User.findOneAndUpdate(
            {_id: params.userId },
            { $push: { friends: params.friendId } },
            {new: true, }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err)); 
    },

    // remove a Friend
    removeFriend( { params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            {new: true },
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
};

module.exports = userController;