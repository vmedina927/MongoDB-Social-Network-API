const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts 
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create a Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // update a Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a thought 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
            })
            .catch(err => res.status(400).json(err));
    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //   remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No Thought with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
    },
};

module.exports = thoughtController;