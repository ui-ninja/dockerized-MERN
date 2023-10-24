import mongoose from 'mongoose';

interface ITodo {
  title: string;
  completed?: boolean;
}

const TodoSchema = new mongoose.Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const TodoModel = mongoose.model('Todo', TodoSchema);

// CREATE
export const createTodo = async (title: string) => {
  const newTodo = new TodoModel({
    title,
    completed: false,
  });
  const addedTodo = await newTodo.save();
  return addedTodo;
};

// READ
export const getTodos = async () => await TodoModel.find();

// UPDATE
export const updateTodoById = async (id: string, updateData: ITodo) => {
  console.log('updateData', updateData);
  const _id = new mongoose.Types.ObjectId(id);
  const doc = await TodoModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: updateData,
    }
  );
  return doc;
};

// DELETE
export const deleteTodoById = async (id: string) => {
  await TodoModel.findByIdAndDelete(id);
};
