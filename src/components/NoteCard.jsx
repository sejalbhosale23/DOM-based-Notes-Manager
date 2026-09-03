import React from 'react';
import { Star, Edit3, Trash2, Tag, Calendar } from 'lucide-react';

export const NoteCard = ({ note, onEdit, onDelete, onToggleImportant }) => {
    const formattedDate = new Date(note.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`note-card ${note.isImportant ? 'is-important' : ''}`}>
            <div className="note-card-header">
                <h3 className="note-title">{note.title}</h3>
                {note.isImportant && (
                    <span className="important-badge">
                        <Star size={12} fill="#d97706" color="#d97706" />
                        Important
                    </span>
                )}
            </div>

            <p className="note-body">{note.content || <em>(No content provided)</em>}</p>

            <div className="note-meta">
                <span className="category-pill">
                    <Tag size={10} style={{ display: 'inline', marginRight: '3px' }} />
                    {note.category || 'General'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Calendar size={11} />
                    {formattedDate}
                </span>
            </div>

            <div className="note-card-actions">
                <button
                    className={`icon-btn btn-star ${note.isImportant ? 'active' : ''}`}
                    onClick={() => onToggleImportant(note.id)}
                    title={note.isImportant ? 'Unmark as Important' : 'Mark as Important'}
                    aria-label="Toggle Important"
                >
                    <Star size={16} fill={note.isImportant ? '#d97706' : 'none'} />
                </button>

                <button
                    className="icon-btn"
                    onClick={() => onEdit(note)}
                    title="Edit Note"
                    aria-label="Edit Note"
                >
                    <Edit3 size={16} />
                </button>

                <button
                    className="icon-btn btn-delete"
                    onClick={() => onDelete(note.id)}
                    title="Delete Note"
                    aria-label="Delete Note"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};
