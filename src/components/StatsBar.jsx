import React from 'react';
import { Search, StickyNote, Star, Filter } from 'lucide-react';

export const StatsBar = ({
    totalCount,
    importantCount,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus
}) => {
    return (
        <div className="stats-and-filter-bar">
            <div className="stats-row">
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div className="stat-pill" id="total-notes-pill">
                        <StickyNote size={15} className="accent-icon" />
                        <span>Total Notes:</span>
                        <span className="stat-count" id="total-notes-count">{totalCount}</span>
                    </div>

                    <div className="stat-pill" id="important-notes-pill">
                        <Star size={15} style={{ color: '#d97706' }} />
                        <span>Important:</span>
                        <span className="stat-count important-count">{importantCount}</span>
                    </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Dynamic Count Updates Enabled
                </div>
            </div>

            <div className="controls-row">
                <div className="search-box">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        className="custom-input"
                        placeholder="Search notes by title or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-pills">
                    <button
                        className={`filter-pill-btn ${filterStatus === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All ({totalCount})
                    </button>
                    <button
                        className={`filter-pill-btn ${filterStatus === 'important' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('important')}
                    >
                        Important ({importantCount})
                    </button>
                    <button
                        className={`filter-pill-btn ${filterStatus === 'standard' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('standard')}
                    >
                        Standard ({totalCount - importantCount})
                    </button>
                </div>
            </div>
        </div>
    );
};
