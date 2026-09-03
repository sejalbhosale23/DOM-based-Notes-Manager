import React, { useState } from 'react';
import { PlusCircle, Star, Tag, AlignLeft, Type } from 'lucide-react';

export const NoteForm = ({ onAddNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Personal');
    const [isImportant, setIsImportant] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() && !content.trim()) {
            alert('Please enter a title or content for your note.');
            return;
        }

        onAddNote({
            id: 'note-' + Date.now(),
            title: title.trim() || 'Untitled Note',
            content: content.trim(),
            category,
            isImportant,
            createdAt: new Date().toISOString()
        });

        // Reset form fields
        setTitle('');
        setContent('');
        setIsImportant(false);
    };

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="note-form-card">
            <div className="card-title">
                <span>Create New Note</span>
                <PlusCircle size={20} className="accent-icon" />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div className="input-group">
                    <label className="input-label" htmlFor="note-title-input">
                        <Type size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        Note Title
                    </label>
                    <input
                        id="note-title-input"
                        type="text"
                        className="custom-input"
                        placeholder="e.g. Finish FSD Assignment..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label className="input-label" htmlFor="note-content-input">
                        <AlignLeft size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        Note Content
                    </label>
                    <textarea
                        id="note-content-input"
                        className="custom-textarea"
                        placeholder="Write your note details here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                </div>

                <div className="input-group">
                    <label className="input-label" htmlFor="note-category-select">
                        <Tag size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        Category
                    </label>
                    <select
                        id="note-category-select"
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

                <button type="submit" className="btn-primary" id="add-note-btn">
                    <PlusCircle size={18} />
                    Add Note
                </button>
            </form>
        </div>
    );
};
