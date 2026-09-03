import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import { EditModal } from './components/EditModal';
import { StatsBar } from './components/StatsBar';
import { loadNotes, saveNotes } from './utils/storage';
import { StickyNote, CheckCircle } from 'lucide-react';

export function App() {
  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState(() => loadNotes());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingNote, setEditingNote] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize localStorage
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Set html attribute for theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add Note
  const handleAddNote = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    showToast('Note added successfully!');
  };

  // Edit Note
  const handleOpenEditModal = (note) => {
    setEditingNote(note);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
    showToast('Note updated successfully!');
  };

  // Delete Note
  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      showToast('Note deleted dynamically!');
    }
  };

  // Toggle Important
  const handleToggleImportant = (noteId) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, isImportant: !n.isImportant } : n
      )
    );
  };

  // Filter & Search logic
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.category && note.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === 'important') return note.isImportant;
    if (filterStatus === 'standard') return !note.isImportant;
    return true;
  });

  const totalNotesCount = notes.length;
  const importantNotesCount = notes.filter((n) => n.isImportant).length;

  return (
    <div className="app-container">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        totalNotes={totalNotesCount}
      />

      <main className="main-grid">
        {/* Left Column: Form */}
        <aside>
          <NoteForm onAddNote={handleAddNote} />
        </aside>

        {/* Right Column: Stats & Notes Grid */}
        <section>
          <StatsBar
            totalCount={totalNotesCount}
            importantCount={importantNotesCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <StickyNote size={32} />
              </div>
              <h3>No notes found</h3>
              <p>
                {searchQuery
                  ? `No notes matched your search query "${searchQuery}"`
                  : 'Start by creating your first note using the form on the left!'}
              </p>
            </div>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteNote}
                  onToggleImportant={handleToggleImportant}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Edit Note Modal */}
      <EditModal
        note={editingNote}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditedNote}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={18} style={{ color: 'var(--success-green)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
