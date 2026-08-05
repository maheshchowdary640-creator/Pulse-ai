/**
 * PulseDesk AI - AI Smart Inbox & Desk View
 */

import { store } from '../store.js';
import { API } from '../api.js';

export function renderInboxView() {
  const { tickets, selectedTicketId } = store.getState();
  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  return `
    <div class="inbox-view">
      <div class="inbox-layout">
        
        <!-- Left Panel: Ticket Queue List -->
        <div class="glass-card ticket-list-panel" style="padding: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="font-size: 1rem; font-weight: 700;">Support Desk Queue</h3>
            <span class="badge badge-open">${tickets.length} Total</span>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
            <input type="text" id="inbox-search-input" placeholder="Search tickets..." 
              style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.4rem 0.65rem; color: var(--text-main); font-size: 0.8rem; outline: none;">
          </div>

          <div class="ticket-queue-scroll" style="display: flex; flex-direction: column; gap: 0.65rem; overflow-y: auto; flex: 1;">
            ${tickets.map(t => `
              <div class="ticket-item ${t.id === selectedTicket?.id ? 'selected' : ''}" data-id="${t.id}">
                <div class="ticket-item-header">
                  <span class="ticket-customer">${t.customer_name}</span>
                  <span class="ticket-time">${new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="ticket-subject">${t.subject}</div>
                <div class="ticket-meta">
                  <span class="badge badge-${t.priority}">${t.priority}</span>
                  <span style="font-size: 0.7rem; color: ${t.sentiment_score < 0 ? 'var(--danger)' : 'var(--success)'}">
                    ${t.sentiment_score < 0 ? '😟' : '😊'} ${t.category}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Center Panel: Active Ticket Conversation Thread -->
        <div class="ticket-detail-panel">
          ${selectedTicket ? `
            <div class="detail-header">
              <div>
                <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.25rem;">
                  <span style="font-weight: 800; font-size: 1.1rem; color: var(--secondary);">${selectedTicket.id}</span>
                  <span class="badge badge-${selectedTicket.priority}">${selectedTicket.priority} (${selectedTicket.urgency_score})</span>
                  <span class="badge badge-${selectedTicket.status}">${selectedTicket.status}</span>
                </div>
                <h2 style="font-size: 1.05rem; font-weight: 700;">${selectedTicket.subject}</h2>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.25rem;">
                  Customer: <strong>${selectedTicket.customer_name}</strong> (${selectedTicket.customer_email}) • ${selectedTicket.company}
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-sm btn-secondary btn-toggle-status" data-id="${selectedTicket.id}" data-status="pending">Mark Pending</button>
                <button class="btn btn-sm btn-primary btn-toggle-status" data-id="${selectedTicket.id}" data-status="resolved">✓ Resolve</button>
              </div>
            </div>

            <!-- Chat Message List -->
            <div class="chat-thread" id="chat-thread-container">
              ${selectedTicket.messages.map(msg => `
                <div class="message-bubble message-${msg.sender_type}">
                  <div class="message-meta">
                    <strong>${msg.sender_name} ${msg.sender_type === 'ai' ? '⚡ (PulseDesk AI)' : ''}</strong>
                    <span>${new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div style="white-space: pre-wrap;">${msg.content}</div>
                </div>
              `).join('')}
            </div>

            <!-- Reply Composer -->
            <div class="composer-area">
              <textarea class="composer-input" id="reply-input-text" placeholder="Type your response to ${selectedTicket.customer_name} or use AI Draft..."></textarea>
              <div class="composer-toolbar">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <button class="btn btn-sm btn-secondary" id="btn-generate-ai-draft">
                    <span>✨ Generate AI Response</span>
                  </button>
                  <select id="tone-select-inline" style="background: var(--bg-input); color: var(--text-main); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.35rem; font-size: 0.75rem;">
                    <option>Empathetic & Professional</option>
                    <option>Direct & Concise</option>
                    <option>Technical Support</option>
                    <option>Executive</option>
                  </select>
                </div>

                <button class="btn btn-primary" id="btn-send-reply" data-id="${selectedTicket.id}">
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          ` : `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted);">
              Select a ticket from the left queue to view details
            </div>
          `}
        </div>

        <!-- Right Panel: AI Copilot & RAG Context Sidebar -->
        <div class="copilot-panel">
          <div class="copilot-section-title">
            <span>⚡ AI Co-pilot Insights</span>
          </div>

          ${selectedTicket ? `
            <!-- AI Ticket Triage Card -->
            <div class="glass-card" style="padding: 0.85rem; font-size: 0.8rem;">
              <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Sentiment Score:</span>
                <strong style="color: ${selectedTicket.sentiment_score < 0 ? 'var(--danger)' : 'var(--success)'};">
                  ${selectedTicket.sentiment_score} (${selectedTicket.sentiment})
                </strong>
              </div>
              <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Urgency Index:</span>
                <strong style="color: var(--warning);">${selectedTicket.urgency_score} / 10.0</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Auto Category:</span>
                <strong style="color: var(--secondary);">${selectedTicket.category}</strong>
              </div>
            </div>

            <!-- RAG Document Citations -->
            <div>
              <div class="copilot-section-title" style="margin-bottom: 0.5rem;">
                <span>📚 Matched Vector RAG Docs</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;" id="copilot-citations-list">
                <div class="citation-card">
                  <div class="citation-title">📄 API Rate Limits & Quota Escalation</div>
                  <p style="color: var(--text-muted);">Matches query terms: "API rate limit", "ETL migration", "429". Relevancy Confidence: 94%</p>
                </div>
                <div class="citation-card">
                  <div class="citation-title">📄 Enterprise SLA Guidelines</div>
                  <p style="color: var(--text-muted);">Relevancy Confidence: 81%</p>
                </div>
              </div>
            </div>

            <!-- AI Suggested Action -->
            <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid var(--border-highlight); border-radius: var(--radius-md); padding: 0.85rem;">
              <div style="font-weight: 700; font-size: 0.8rem; color: var(--primary); margin-bottom: 0.25rem;">
                🎯 Suggested Action
              </div>
              <p style="font-size: 0.78rem; color: var(--text-main);">
                Issue temporary 48-hour API rate limit multiplier for workspace \`ws_99482\` to unblock customer's batch ETL job.
              </p>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
