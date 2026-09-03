const STORAGE_KEY = 'dom_notes_manager_react_notes_v1';

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'Welcome to DOM Notes Manager',
    content: 'This application satisfies all assignment requirements including dynamic creation, editing, deletion, importance toggling, note counting, and CSS styling.',
    isImportant: true,
    category: 'Work',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'note-2',
    title: 'Study Web Development DOM Methods',
    content: 'Review createElement(), appendChild(), element.remove(), textContent, and addEventListener() for JavaScript DOM manipulation.',
    isImportant: true,
    category: 'Study',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'note-3',
    title: 'Project Submission Checklist',
    content: 'Ensure all DOM methods, input fields, Add Note button, and reactive note total counter work cleanly.',
    isImportant: false,
    category: 'Personal',
    createdAt: new Date().toISOString()
  }
];

export const loadNotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load notes from localStorage', err);
  }
  return INITIAL_NOTES;
};

export const saveNotes = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save notes to localStorage', err);
  }
};
