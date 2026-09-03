import React, { useState, useEffect } from 'react';
import { X, Save, Star } from 'lucide-react';

export const EditModal = ({ note, isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Personal');
    const [isImportant, setIsImportant] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
            setCategory(note.category || 'Personal');
            setIsImportant(!!note.isImportant);
        }
    }, [note]);

    if (!isOpen || !note) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...note,
            title: title.trim() || 'Untitled Note',
            content: content.trim(),
            category,
            isImportant,
            updatedAt: new Date().toISOString()
        });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Edit Note</h3>
                    <button className="icon-btn" onClick={onClose} aria-label="Close Modal">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="input-group">
                        <label className="input-label">Note Title</label>
                        <input
                            type="text"
                            className="custom-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Content</label>
                        <textarea
                            className="custom-textarea"
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Category</label>
                        <select
                            className="custom-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                            <option value="Study">Study</option>
                            <option value="Ideas">Ideas</option>
                        </select>
                    </div>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={isImportant}
                            onChange={(e) => setIsImportant(e.target.checked)}
                        />
                        <Star size={16} fill={isImportant ? '#d97706' : 'none'} color={isImportant ? '#d97706' : 'currentColor'} />
                        <span>Mark as Important Note</span>
                    </label>

                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
