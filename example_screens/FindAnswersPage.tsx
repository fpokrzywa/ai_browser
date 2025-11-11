import { useState, useEffect } from 'react';
import { X, RefreshCw, Sparkles } from 'lucide-react';
import { FishIcon } from './FishIcon';
import { PromptCatalogModal } from './PromptCatalogModal';
import './FindAnswersPage.css';

interface Article {
  id: string;
  title: string;
}

interface FindAnswersPageProps {
  category: string;
  title: string;
  description: string;
}

const articlesByCategory: Record<string, Article[]> = {
  'itsupport': [
    { id: '1', title: 'Password Reset Procedures' },
    { id: '2', title: 'Software Installation Guide' },
    { id: '3', title: 'Network Troubleshooting' },
  ],
  'mysupport': [
    { id: '1', title: 'My Custom IT Procedures' },
    { id: '2', title: 'Personal Troubleshooting Notes' },
  ],
  'hrpolicies': [
    { id: '1', title: 'Time Off Request Policy' },
    { id: '2', title: 'Remote Work Guidelines' },
    { id: '3', title: 'Employee Benefits Overview' },
  ],
  'nieaguides': [
    { id: '1', title: 'NIEA Compliance Standards' },
    { id: '2', title: 'NIEA Reporting Procedures' },
  ],
  'adeptguides': [
    { id: '1', title: 'ADEPT System Overview' },
    { id: '2', title: 'ADEPT Best Practices' },
  ],
  'freddieit': [
    { id: '1', title: 'Freddie IT Infrastructure Guide' },
    { id: '2', title: 'Freddie IT Security Protocols' },
  ],
};

export function FindAnswersPage({ category, title, description }: FindAnswersPageProps) {
  const [isCenterPanelOpen, setIsCenterPanelOpen] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const articles = articlesByCategory[category] || [];

  useEffect(() => {
    setIsCenterPanelOpen(true);
  }, [category]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="find-answers-layout">
      {isCenterPanelOpen && (
        <div className="center-panel">
          <div className="center-panel-header">
            <div>
              <h1 className="center-panel-title">{title}</h1>
              <p className="center-panel-description">{description}</p>
            </div>
            <div className="center-panel-actions">
              <button className="refresh-button" title="Refresh">
                <RefreshCw size={18} />
                <span>Refresh</span>
              </button>
              <button
                className="close-button"
                onClick={() => setIsCenterPanelOpen(false)}
                title="Close panel"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="center-panel-content">
            <div className="info-box">
              <div className="info-box-header">
                <Sparkles size={20} className="info-icon" />
                <span className="info-title">Try it yourself!</span>
              </div>
              <p className="info-description">
                Explore {title} to find helpful information and resources.
              </p>
              <ul className="info-list">
                <li>Ask ODIN questions about {title.toLowerCase()}</li>
              </ul>
            </div>

            <div className="articles-section">
              <h2 className="articles-title">
                Here are the sample articles that power the answers about your questions
              </h2>
              <div className="articles-list">
                {articles.map((article) => (
                  <div key={article.id} className="article-item">
                    <span className="article-title">{article.title}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                ))}
              </div>

              <button className="explore-link">
                <span>Explore all {title}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div className="debug-section">
                <button
                  className="debug-info-toggle"
                  onClick={() => setIsDebugOpen(!isDebugOpen)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>Debug Information</span>
                </button>
                {isDebugOpen && (
                  <div className="debug-details">
                    <div className="debug-item">
                      <strong>Debug Info:</strong> Successfully loaded: {title}
                    </div>
                    <div className="debug-item">
                      <strong>Section:</strong> A1970-5
                    </div>
                    <div className="debug-item">
                      <strong>Assistant ID:</strong> asst_7a1fCTMvfcmqNBLBvwAZzyEv
                    </div>
                    <div className="debug-item">
                      <strong>Has Data:</strong> Yes
                    </div>
                    <div className="debug-item">
                      <strong>Title:</strong> {title}
                    </div>
                    <div className="debug-item">
                      <strong>Articles Count:</strong> {articles.length}
                    </div>
                    <div className="debug-item">
                      <strong>To 11 before match:</strong> Yes
                    </div>
                    <div className="debug-item">
                      <strong>Assistant ID from Data:</strong> asst_7a1fCTMvfcmqNBLBvwAZzyEv
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`chat-panel ${!isCenterPanelOpen ? 'expanded' : ''}`}>
        <div className="chat-controls-header">
          <select className="model-select">
            <option>GPT-4o</option>
            <option>GPT-4</option>
            <option>GPT-3.5</option>
          </select>
          <button className="prompts-button" onClick={() => setIsPromptModalOpen(true)}>Prompts</button>
          <button className="clear-button">Clear</button>
        </div>

        <div className="chat-workspace-content">
          <FishIcon />

          <h1 className="workspace-title">Welcome to BabelPhish</h1>

          <p className="workspace-subtitle">
            Start by typing a command or query below to create your first widget.
          </p>

          <div className="quick-actions-workspace">
            <div className="quick-actions-title">Quick browse items</div>

            <div className="action-links-workspace">
              <a href="#" className="action-link-workspace">
                <Sparkles className="icon" />
                <span>Get my incidents</span>
              </a>

              <a href="#" className="action-link-workspace">
                <Sparkles className="icon" />
                <span>Show me high priority changes</span>
              </a>

              <a href="#" className="action-link-workspace">
                <Sparkles className="icon" />
                <span>Are there any recurring problems?</span>
              </a>
            </div>
          </div>

          <div className="workspace-input-container">
            <input
              type="text"
              className="workspace-message-input"
              placeholder="Please type your message here"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Sparkles className="workspace-input-icon" onClick={handleSendMessage} />
          </div>

          <div className="workspace-input-footer">
            <button>Use Commands</button>
            <button>Workspace</button>
          </div>
        </div>
      </div>

      <PromptCatalogModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
