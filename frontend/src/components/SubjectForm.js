import { useState } from "react";

const SubjectForm = ({ subjects, addSubject, deleteSubject, editSubject, classes, addClass }) => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !className) return;

    if (editingIndex !== null) {
      editSubject(editingIndex, { name, className });
      setEditingIndex(null);
    } else {
      addSubject({ name, className });
    }
    addClass(className); // ensure class exists in timetable
    setName("");
    setClassName("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4">
      <h2 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Manage Subjects</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border dark:border-gray-600 px-2 py-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Class (e.g. 9A)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border dark:border-gray-600 px-2 py-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          required
        />
        <button type="submit" className="bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
          {editingIndex !== null ? "Update Subject" : "Add Subject"}
        </button>
      </form>

      <ul className="mt-3">
        {subjects.map((s, index) => (
          <li key={s.name + s.className} className="flex justify-between items-center border-b dark:border-gray-600 py-1">
            <span className="text-gray-900 dark:text-white">{s.name} — {s.className}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setName(s.name);
                  setClassName(s.className);
                  setEditingIndex(index);
                }}
                className="text-green-500 text-sm ml-2"
              >
                Edit
              </button>
              <button onClick={() => deleteSubject(s.name)} className="text-red-500 text-sm">Delete</button>

            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectForm;
