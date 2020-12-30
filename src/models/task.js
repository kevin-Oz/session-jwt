import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title: {type: String, required: [true, 'titulo  is required']},
    date: { type: Date },
    task: { type: String },
    state: { type: String }
});


const task = mongoose.model('task', taskSchema);

export default task;

