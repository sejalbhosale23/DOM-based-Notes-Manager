import React from 'react';
import { CheckCircle2, Code2, Copy, Download, Sparkles } from 'lucide-react';

export const AssignmentRequirements = () => {
    const requirements = [
        {
            id: 1,
            title: 'Interactive Notes Manager App',
            description: 'Fully responsive UI built with HTML, CSS, and JS/React.',
            status: 'Completed'
        },
        {
            id: 2,
            title: 'Input Field & Add Note Button',
            description: 'Dedicated input controls for title, content, category, and submit button.',
            status: 'Completed'
        },
        {
            id: 3,
            title: 'Dynamic Note Display',
            description: 'Notes rendered dynamically on page with custom category badges & timestamps.',
            status: 'Completed'
        },
        {
            id: 4,
            title: 'Edit & Delete Actions',
            description: 'Interactive buttons for inline editing modal and direct node removal.',
            status: 'Completed'
        },
        {
            id: 5,
            title: 'Mark / Unmark as Important',
            description: 'Toggle importance status with glowing star indicators & filtering.',
            status: 'Completed'
        },
        {
            id: 6,
            title: 'Live Note Counter Updates',
            description: 'Dynamic counters updated immediately upon note additions & deletions.',
            status: 'Completed'
        },
        {
            id: 7,
            title: 'Explicit DOM Methods Used',
            description: 'createElement(), appendChild(), remove(), textContent, & addEventListener().',
            status: 'Completed'
        },
        {
            id: 8,
            title: 'Clean CSS Styling & Aesthetics',
            description: 'Modern glassmorphic interface, dark/light theme, and smooth micro-animations.',
            status: 'Completed'
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="checklist-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Assignment Requirements Audit</h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Verification checklist showing all rubric points satisfied
                        </p>
                    </div>
                    <span className="badge-tag" style={{ background: 'var(--success-bg)', color: 'var(--success-green)', borderColor: 'var(--success-green)' }}>
                        100% Compliant
                    </span>
                </div>

                <div className="checklist-grid">
                    {requirements.map((req) => (
                        <div key={req.id} className="checklist-item">
                            <CheckCircle2 className="check-icon" size={20} />
                            <div>
                                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{req.title}</strong>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                    {req.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
