import React, { useEffect, useRef, useState } from 'react';
import { Code, Terminal, CheckCircle2, RefreshCw } from 'lucide-react';

export const VanillaDomNotesManager = () => {
    const containerRef = useRef(null);
    const [logs, setLogs] = useState([]);

    const addLog = (method, details) => {
        const time = new Date().toLocaleTimeString();
        setLogs((prev) => [{ time, method, details }, ...prev.slice(0, 19)]);
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const root = containerRef.current;
        root.innerHTML = ''; // Clear previous

        let notesArray = [
            { id: 1, text: 'Sample DOM Note 1: Learn createElement()', important: false },
            { id: 2, text: 'Sample DOM Note 2: Learn appendChild() and remove()', important: true }
        ];

        // Helper to log DOM methods
        const logMethod = (method, details) => {
            addLog(method, details);
        };

        // 1. Create Layout Container via DOM
        const wrapper = document.createElement('div');
        wrapper.className = 'dom-engine-card';
        logMethod('createElement', 'Created main <div class="dom-engine-card">');

        // Header banner explaining DOM methods
        const banner = document.createElement('div');
        banner.className = 'dom-methods-banner';
        banner.innerHTML = `
      <div>
        <strong style="color: var(--text-primary);">Vanilla DOM Engine Mode</strong>
        <p style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 2px;">
          Directly invoking raw JS DOM methods: <code>createElement()</code>, <code>appendChild()</code>, <code>remove()</code>, <code>textContent</code>, & <code>addEventListener()</code>.
        </p>
      </div>
    `;
        logMethod('createElement', 'Created method banner');
        wrapper.appendChild(banner);
        logMethod('appendChild', 'Appended banner to wrapper');

        // Input Section
        const inputSection = document.createElement('div');
        inputSection.style.display = 'flex';
        inputSection.style.gap = '0.75rem';
        inputSection.style.flexWrap = 'wrap';

        const noteInput = document.createElement('input');
        noteInput.type = 'text';
        noteInput.className = 'custom-input';
        noteInput.placeholder = 'Enter a note using pure DOM methods...';
        noteInput.style.flex = '1';
        logMethod('createElement', 'Created <input>');

        const addBtn = document.createElement('button');
        addBtn.className = 'btn-primary';
        addBtn.textContent = 'Add Note (DOM)';
        logMethod('createElement', 'Created <button>');
        logMethod('textContent', 'Set button textContent to "Add Note (DOM)"');

        inputSection.appendChild(noteInput);
        inputSection.appendChild(addBtn);
        logMethod('appendChild', 'Appended input & button to inputSection');
        wrapper.appendChild(inputSection);

        // Counter Display
        const counterDiv = document.createElement('div');
        counterDiv.className = 'stat-pill';
        counterDiv.style.alignSelf = 'flex-start';
        counterDiv.style.marginTop = '0.5rem';

        const counterLabel = document.createElement('span');
        counterLabel.textContent = 'Total Notes (DOM Count): ';
        logMethod('textContent', 'Set counterLabel textContent');

        const counterSpan = document.createElement('span');
        counterSpan.className = 'stat-count';
        counterSpan.id = 'dom-total-count';
        counterSpan.textContent = notesArray.length.toString();
        logMethod('textContent', `Updated counterSpan.textContent = "${notesArray.length}"`);

        counterDiv.appendChild(counterLabel);
        counterDiv.appendChild(counterSpan);
        wrapper.appendChild(counterDiv);

        // Notes List Container
        const notesList = document.createElement('div');
        notesList.className = 'notes-grid';
        notesList.style.marginTop = '0.75rem';
        wrapper.appendChild(notesList);

        // Function to render notes using pure DOM methods
        const renderNotes = () => {
            notesList.innerHTML = '';
            counterSpan.textContent = notesArray.length.toString();
            logMethod('textContent', `Updated total note count to ${notesArray.length}`);

            if (notesArray.length === 0) {
                const empty = document.createElement('div');
                empty.className = 'empty-state';
                empty.textContent = 'No notes created yet via DOM API.';
                notesList.appendChild(empty);
                logMethod('appendChild', 'Appended empty state to DOM notes list');
                return;
            }

            notesArray.forEach((note) => {
                // Create note element
                const card = document.createElement('div');
                card.className = `note-card ${note.important ? 'is-important' : ''}`;
                card.id = `dom-note-${note.id}`;
                logMethod('createElement', `Created note container <div id="dom-note-${note.id}">`);

                // Text Content
                const contentP = document.createElement('p');
                contentP.className = 'note-body';
                contentP.textContent = note.text;
                logMethod('textContent', `Set content textContent to "${note.text.slice(0, 25)}..."`);
                card.appendChild(contentP);

                // Action Buttons wrapper
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'note-card-actions';
                actionsDiv.style.marginTop = '0.5rem';

                // Important Button
                const impBtn = document.createElement('button');
                impBtn.className = `icon-btn btn-star ${note.important ? 'active' : ''}`;
                impBtn.textContent = note.important ? '★ Important' : '☆ Mark Important';
                impBtn.style.width = 'auto';
                impBtn.style.padding = '0 0.6rem';
                impBtn.style.fontSize = '0.75rem';
                logMethod('createElement', 'Created Important toggle button');

                // addEventListener for Important toggle
                impBtn.addEventListener('click', () => {
                    note.important = !note.important;
                    logMethod('addEventListener', `Clicked Important toggle for note ID: ${note.id}`);
                    renderNotes();
                });
                logMethod('addEventListener', `Attached 'click' listener to Important button`);

                // Edit Button
                const editBtn = document.createElement('button');
                editBtn.className = 'icon-btn';
                editBtn.textContent = '✎ Edit';
                editBtn.style.width = 'auto';
                editBtn.style.padding = '0 0.6rem';
                editBtn.style.fontSize = '0.75rem';
                logMethod('createElement', 'Created Edit button');

                // addEventListener for Edit button
                editBtn.addEventListener('click', () => {
                    logMethod('addEventListener', `Clicked Edit button for note ID: ${note.id}`);
                    const updated = prompt('Edit note text:', note.text);
                    if (updated !== null && updated.trim() !== '') {
                        note.text = updated.trim();
                        logMethod('textContent', `Updated note text via DOM prompt edit`);
                        renderNotes();
                    }
                });
                logMethod('addEventListener', `Attached 'click' listener to Edit button`);

                // Delete Button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'icon-btn btn-delete';
                deleteBtn.textContent = '🗑 Delete';
                deleteBtn.style.width = 'auto';
                deleteBtn.style.padding = '0 0.6rem';
                deleteBtn.style.fontSize = '0.75rem';
                logMethod('createElement', 'Created Delete button');

                // addEventListener for Delete button utilizing remove()
                deleteBtn.addEventListener('click', () => {
                    logMethod('addEventListener', `Clicked Delete button for note ID: ${note.id}`);
                    // Remove from state array
                    notesArray = notesArray.filter((n) => n.id !== note.id);
                    // Directly call DOM remove() method
                    card.remove();
                    logMethod('remove', `Invoked DOM method: card.remove() for #dom-note-${note.id}`);
                    renderNotes();
                });
                logMethod('addEventListener', `Attached 'click' listener to Delete button`);

                actionsDiv.appendChild(impBtn);
                actionsDiv.appendChild(editBtn);
                actionsDiv.appendChild(deleteBtn);
                logMethod('appendChild', 'Appended action buttons to card');

                card.appendChild(actionsDiv);
                notesList.appendChild(card);
                logMethod('appendChild', `Appended note card #dom-note-${note.id} to DOM notes list`);
            });
        };

        // addEventListener for Add Note button
        const handleAddNote = () => {
            const val = noteInput.value.trim();
            logMethod('addEventListener', `Triggered 'click' on Add Note button`);
            if (!val) {
                alert('Please enter note text!');
                return;
            }

            const newId = Date.now();
            notesArray.push({ id: newId, text: val, important: false });
            noteInput.value = '';
            logMethod('createElement', `Created new note object ID: ${newId}`);
            renderNotes();
        };

        addBtn.addEventListener('click', handleAddNote);
        logMethod('addEventListener', `Attached 'click' listener to Add Note button`);

        // Initial render
        renderNotes();
        root.appendChild(wrapper);
        logMethod('appendChild', 'Appended main wrapper to React container ref');

        return () => {
            root.innerHTML = '';
        };
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div ref={containerRef}></div>

            {/* Real-time DOM Console Log Viewer */}
            <div className="checklist-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Terminal size={18} className="accent-icon" />
                        <h3 style={{ fontSize: '1rem' }}>Live DOM Operations Console</h3>
                    </div>
                    <span className="badge-tag">Real-time Trace</span>
                </div>

                <div className="dom-console">
                    {logs.length === 0 ? (
                        <div style={{ color: '#8b949e' }}>Console initialized. Perform actions above to see live DOM method logs.</div>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} className="console-entry">
                                <span className="console-timestamp">[{log.time}]</span>
                                <span className="console-method">{log.method}()</span>
                                <span className="console-target">: {log.details}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
