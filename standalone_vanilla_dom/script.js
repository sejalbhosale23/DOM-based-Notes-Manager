// DOM-based Notes Manager Assignment - Pure JavaScript DOM Methods
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const noteTextInput = document.getElementById('note-text');
    const noteImportantCheckbox = document.getElementById('note-important');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesContainer = document.getElementById('notes-container');
    const totalNotesCount = document.getElementById('total-notes-count');

    let notesCount = 0;

    // Function to update the note count display using textContent
    function updateNoteCount() {
        totalNotesCount.textContent = notesCount;
    }

    // Function to add a new note dynamically using DOM methods
    function addNote() {
        const textValue = noteTextInput.value.trim();
        if (textValue === '') {
            alert('Please enter a note description.');
            return;
        }

        const isImportant = noteImportantCheckbox.checked;

        // 1. Use document.createElement() to create elements
        const noteCard = document.createElement('div');
        noteCard.className = isImportant ? 'note-item important' : 'note-item';

        const textSpan = document.createElement('span');
        textSpan.className = 'note-text-content';
        // 2. Use textContent to set text securely
        textSpan.textContent = textValue;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'note-actions';

        // Create Mark/Unmark Important Button
        const importantBtn = document.createElement('button');
        importantBtn.className = 'btn-action btn-important';
        importantBtn.textContent = isImportant ? '★ Important' : '☆ Mark Important';

        // 3. Use addEventListener() for Important Toggle
        importantBtn.addEventListener('click', () => {
            noteCard.classList.toggle('important');
            const currentlyImportant = noteCard.classList.contains('important');
            importantBtn.textContent = currentlyImportant ? '★ Important' : '☆ Mark Important';
        });

        // Create Edit Button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-action btn-edit';
        editBtn.textContent = 'Edit';

        // 3. Use addEventListener() for Edit
        editBtn.addEventListener('click', () => {
            const currentText = textSpan.textContent;
            const updatedText = prompt('Edit note:', currentText);
            if (updatedText !== null && updatedText.trim() !== '') {
                // 2. Use textContent to update edited text
                textSpan.textContent = updatedText.trim();
            }
        });

        // Create Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-action btn-delete';
        deleteBtn.textContent = 'Delete';

        // 3. Use addEventListener() for Delete
        deleteBtn.addEventListener('click', () => {
            // 4. Use remove() method to delete DOM node
            noteCard.remove();
            notesCount--;
            updateNoteCount();
            checkEmptyState();
        });

        // 5. Use appendChild() to build DOM hierarchy
        actionsDiv.appendChild(importantBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        noteCard.appendChild(textSpan);
        noteCard.appendChild(actionsDiv);

        notesContainer.appendChild(noteCard);

        // Reset input fields
        noteTextInput.value = '';
        noteImportantCheckbox.checked = false;

        // Increment count & update display
        notesCount++;
        updateNoteCount();
        checkEmptyState();
    }

    function checkEmptyState() {
        if (notesCount === 0) {
            notesContainer.innerHTML = '<div class="empty-msg">No notes added yet. Enter a note above to start!</div>';
        } else {
            const emptyMsg = notesContainer.querySelector('.empty-msg');
            if (emptyMsg) {
                emptyMsg.remove();
            }
        }
    }

    // 3. Use addEventListener() for Add Note button
    addNoteBtn.addEventListener('click', addNote);

    // Allow pressing Enter key inside input
    noteTextInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNote();
        }
    });

    // Initial Empty State Check
    checkEmptyState();
});
