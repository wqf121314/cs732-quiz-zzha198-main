import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: {type: String, required: true},
    status: Boolean,
    deadline: Date
}, {
    timestamps: {}
});

export const Todo = mongoose.model('Todo', todoSchema);
