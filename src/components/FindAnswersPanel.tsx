'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, X, Sparkles } from 'lucide-react';
import { getFindAnswersDetailById } from '@/services/findAnswersService';
import { FishIcon } from './FishIcon';
import { PromptCatalogModal } from './PromptCatalogModal';
import './FindAnswersPanel.css';

interface Article {
    id: string;
    policyName: string;
    content: string;
    category: string;
    url?: string;
    lastUpdated: string;
    author: string;
}

interface FindAnswersData {
    _id: { $oid: string };
    id: string;
    title: string;
    description: string;
    learnMoreLink?: string;
    scenario?: string;
    actions?: string[];
    articles: Article[];
}

interface FindAnswersPanelProps {
    findAnswersId: string;
    onClose: () => void;
}

export function FindAnswersPanel({ findAnswersId, onClose }: FindAnswersPanelProps) {
    console.log('FindAnswersPanel mounted with ID:', findAnswersId);
    const [data, setData] = useState<FindAnswersData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCenterPanelOpen, setIsCenterPanelOpen] = useState(true);
    const [messageInput, setMessageInput] = useState('');
    const [isDebugOpen, setIsDebugOpen] = useState(false);
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

    useEffect(() => {
        loadFindAnswersData();
    }, [findAnswersId]);

    useEffect(() => {
        setIsCenterPanelOpen(true);
    }, [findAnswersId]);

    const loadFindAnswersData = async () => {
        console.log('Loading find answers data for ID:', findAnswersId);
        setLoading(true);
        try {
            const detailData = await getFindAnswersDetailById(findAnswersId);
            console.log('Loaded find answers data:', detailData);
            setData(detailData);
        } catch (error) {
            console.error('Failed to load find answers data:', error);
        } finally {
            setLoading(false);
        }
    };

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

    console.log('FindAnswersPanel render state:', { loading, hasData: !!data, dataTitle: data?.title });

    if (loading) {
        console.log('Rendering loading state');
        return (
            <div className="find-answers-layout">
                <div className="center-panel">
                    <div className="center-panel-content">
                        <div className="flex items-center justify-center space-x-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Loading Find Answers...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="find-answers-layout">
                <div className="center-panel">
                    <div className="center-panel-content">
                        <span className="text-gray-500">No data found for {findAnswersId}</span>
                    </div>
                </div>
            </div>
        );
    }

    console.log('Rendering main content with data:', data);
    return (
        <div className="find-answers-layout">
            {isCenterPanelOpen && (
                <div className="center-panel">
                    <div className="center-panel-header">
                        <div>
                            <h1 className="center-panel-title">{data.title}</h1>
                            <p className="center-panel-description">{data.description}</p>
                        </div>
                        <div className="center-panel-actions">
                            <button className="refresh-button" title="Refresh" onClick={loadFindAnswersData}>
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
                                {data.scenario || `Explore ${data.title} to find helpful information and resources.`}
                            </p>
                            {data.actions && data.actions.length > 0 ? (
                                <ul className="info-list">
                                    {data.actions.map((action, index) => (
                                        <li key={index}>{action}</li>
                                    ))}
                                </ul>
                            ) : (
                                <ul className="info-list">
                                    <li>Ask ODIN questions about {data.title.toLowerCase()}</li>
                                </ul>
                            )}
                        </div>

                        <div className="articles-section">
                            <h2 className="articles-title">
                                Here are the sample articles that power the answers about your questions
                            </h2>
                            <div className="articles-list">
                                {data.articles.map((article) => (
                                    <div key={article.id} className="article-item">
                                        <span className="article-title">{article.policyName}</span>
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
                                <span>Explore all {data.title}</span>
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
                                            <strong>Debug Info:</strong> Successfully loaded: {data.title}
                                        </div>
                                        <div className="debug-item">
                                            <strong>Section:</strong> {data.id}
                                        </div>
                                        <div className="debug-item">
                                            <strong>Assistant ID:</strong> None (will use ODIN)
                                        </div>
                                        <div className="debug-item">
                                            <strong>Has Data:</strong> Yes
                                        </div>
                                        <div className="debug-item">
                                            <strong>Title:</strong> {data.title}
                                        </div>
                                        <div className="debug-item">
                                            <strong>Articles Count:</strong> {data.articles.length}
                                        </div>
                                        <div className="debug-item">
                                            <strong>Try It Yourself:</strong> {data.scenario ? 'Yes' : 'No'}
                                        </div>
                                        <div className="debug-item">
                                            <strong>Assistant ID from Data:</strong> Not specified
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
