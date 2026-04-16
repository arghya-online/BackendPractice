import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
