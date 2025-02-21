import { useState } from "react";
import Input from "./Input";

export default function NewProject({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !dueDate.trim()) return;

    onAdd({ title, description, dueDate });
  };

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            className="text-red-600 hover:text-stone-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSave}
          >
            Save
          </button>
        </li>
      </menu>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        textarea
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        label="Due Date"
      />
    </div>
  );
}
