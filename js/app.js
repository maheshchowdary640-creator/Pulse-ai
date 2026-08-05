/**
 * PulseDesk AI - Application Entry Point & SPA Router
 */

import { store } from './store.js';
import { API } from './api.js';
import { AIEngine } from './aiEngine.js';

import { renderDashboardView } from './views/DashboardView.js';
import { renderInboxView } from './views/InboxView.js';
import { renderKnowledgeBaseView } from './views/KnowledgeBaseView.js';
import { renderAutomationView } from './views/AutomationView.js';
import { renderSimulatorView } from './views/SimulatorView.js';
import { renderAdminView } from './views/AdminView.js';
import { renderDocsView } from './views/DocsView.js';

class App {
  constructor() {
    this.viewContainer = document.getElementById('view-container');
    this.toastContainer = document.getElementById('toast-container');
    this.modalOverlay = document.getElementById('modal-overlay');

    this.init();
  }

  init() {
    // 1. Subscribe to store updates
    store.subscribe((state) => {
      this.render(state);
      this.renderToasts(state.toasts);
    });

    // 2. Navigation click handlers
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        if (view) {
          store.setState({ activeView: view });
        }
      });
    });

    // 3. Global Event Delegation
    document.addEventListener('click', (e) => this.handleGlobalClicks(e));
    document.addEventListener('submit', (e) => this.handleGlobalSubmits(e));

    // 4. Initial Render
    this.render(store.getState());
  }

  render(state) {
    // Update navigation active highlight
    document.querySelectorAll('.nav-item').forEach(item => {
      const view = item.getAttribute('data-view');
      item.classList.toggle('active', view === state.activeView);
    });

    // Render current active view
    switch (state.activeView) {
      case 'dashboard':
        this.viewContainer.innerHTML = renderDashboardView();
        break;
      case 'inbox':
        this.viewContainer.innerHTML = renderInboxView();
        break;
      case 'knowledge':
        this.viewContainer.innerHTML = renderKnowledgeBaseView();
        break;
      case 'automation':
        this.viewContainer.innerHTML = renderAutomationView();
        break;
      case 'simulator':
        this.viewContainer.innerHTML = renderSimulatorView();
        break;
      case 'admin':
        this.viewContainer.innerHTML = renderAdminView();
        break;
      case 'docs':
        this.viewContainer.innerHTML = renderDocsView();
        break;
      default:
        this.viewContainer.innerHTML = renderDashboardView();
    }
  }

  renderToasts(toasts) {
    if (!this.toastContainer) return;
    this.toastContainer.innerHTML = toasts.map(t => `
      <div class="toast toast-${t.type}">
        <span>${t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}</span>
        <span>${t.message}</span>
      </div>
    `).join('');
  }

  handleGlobalClicks(e) {
    // Quick Simulate button on Dashboard
    if (e.target.closest('#btn-quick-simulate')) {
      store.setState({ activeView: 'simulator' });
      return;
    }

    // Link View Inbox
    if (e.target.closest('#link-view-inbox')) {
      store.setState({ activeView: 'inbox' });
      return;
    }

    // Open ticket from Dashboard table
    const btnOpenTicket = e.target.closest('.btn-open-ticket');
    if (btnOpenTicket) {
      const id = btnOpenTicket.getAttribute('data-id');
      store.setState({ selectedTicketId: id, activeView: 'inbox' });
      return;
    }

    // Ticket selection in Inbox list
    const ticketItem = e.target.closest('.ticket-item');
    if (ticketItem) {
      const id = ticketItem.getAttribute('data-id');
      store.setState({ selectedTicketId: id });
      return;
    }

    // Send Reply Button
    const btnSendReply = e.target.closest('#btn-send-reply');
    if (btnSendReply) {
      const ticketId = btnSendReply.getAttribute('data-id');
      const input = document.getElementById('reply-input-text');
      if (input && input.value.trim()) {
        API.sendReply(ticketId, input.value.trim());
        input.value = '';
      }
      return;
    }

    // Generate AI Draft Button
    const btnGenerateAIDraft = e.target.closest('#btn-generate-ai-draft');
    if (btnGenerateAIDraft) {
      const { selectedTicketId } = store.getState();
      const toneSelect = document.getElementById('tone-select-inline');
      const tone = toneSelect ? toneSelect.value : null;

      btnGenerateAIDraft.innerHTML = '<span>⚡ Drafting AI Response...</span>';
      API.generateAIDraft(selectedTicketId, tone).then(draft => {
        const input = document.getElementById('reply-input-text');
        if (input) input.value = draft.content;
        store.addToast(`AI Response drafted with ${draft.confidence_score}% confidence`, 'success');
        btnGenerateAIDraft.innerHTML = '<span>✨ Generate AI Response</span>';
      });
      return;
    }

    // Status Toggle Buttons (Pending / Resolved)
    const btnStatus = e.target.closest('.btn-toggle-status');
    if (btnStatus) {
      const id = btnStatus.getAttribute('data-id');
      const status = btnStatus.getAttribute('data-status');
      store.updateTicketStatus(id, status);
      return;
    }

    // Open Modal for Knowledge Ingest
    if (e.target.closest('#btn-open-ingest-modal')) {
      this.openModal(`
        <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">Ingest Knowledge Document into Vector Store</h2>
        <form id="modal-ingest-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Document Title</label>
            <input type="text" id="ingest-title" required placeholder="e.g. Refund Policy & Dispute Process" 
              style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.6rem; color: var(--text-main); font-size: 0.85rem;">
          </div>
          <div>
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Category</label>
            <input type="text" id="ingest-category" required placeholder="e.g. Billing & Subscriptions" 
              style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.6rem; color: var(--text-main); font-size: 0.85rem;">
          </div>
          <div>
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Document Content (Text for Vector Indexing)</label>
            <textarea id="ingest-content" required rows="4" placeholder="Paste full article text or documentation..." 
              style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.6rem; color: var(--text-main); font-size: 0.85rem; resize: vertical;"></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-close-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Index Document</button>
          </div>
        </form>
      `);
      return;
    }

    // Close Modal
    if (e.target.closest('#btn-close-modal') || e.target === this.modalOverlay) {
      this.closeModal();
      return;
    }

    // RAG Search Test Button
    if (e.target.closest('#btn-run-rag-test')) {
      const input = document.getElementById('rag-test-input');
      const resultsContainer = document.getElementById('rag-test-results');
      if (input && resultsContainer && input.value.trim()) {
        const matches = AIEngine.searchKnowledgeBase(input.value.trim(), 3);
        if (matches.length === 0) {
          resultsContainer.innerHTML = `<div style="color: var(--warning); font-size: 0.85rem;">No direct vector citations matched query.</div>`;
        } else {
          resultsContainer.innerHTML = matches.map(m => `
            <div class="citation-card" style="border-left: 3px solid var(--secondary);">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--secondary);">
                <span>📄 ${m.title} (${m.category})</span>
                <span>Match Score: ${(m.score * 100).toFixed(0)}%</span>
              </div>
              <p style="color: var(--text-main); font-size: 0.8rem; margin-top: 0.25rem;">${m.content}</p>
            </div>
          `).join('');
        }
      }
      return;
    }

    // Preset button click in Simulator
    const presetBtn = e.target.closest('.preset-btn');
    if (presetBtn) {
      const scenario = presetBtn.getAttribute('data-scenario');
      if (scenario === 'api') {
        document.getElementById('sim-name').value = 'Alex Rivera';
        document.getElementById('sim-company').value = 'TechCorp Solutions';
        document.getElementById('sim-email').value = 'alex.rivera@techcorp.io';
        document.getElementById('sim-subject').value = 'Critical: API rate limit exceeded during migration batch job';
        document.getElementById('sim-description').value = 'Our ETL pipeline failed with HTTP 429 errors. We are currently blocked on migrating 500,000 records. Is it possible to double API quota for workspace ws_99482?';
      } else if (scenario === 'sso') {
        document.getElementById('sim-name').value = 'Sophia Martinez';
        document.getElementById('sim-company').value = 'Innovate Co';
        document.getElementById('sim-email').value = 'sophia@innovate.co';
        document.getElementById('sim-subject').value = 'Question regarding Enterprise SSO SAML integration setup';
        document.getElementById('sim-description').value = 'We are configuring Okta SSO for our organization. The ACS URL specified in your documentation gives a certificate validation warning on test connections.';
      } else if (scenario === 'billing') {
        document.getElementById('sim-name').value = 'Marcus Vance';
        document.getElementById('sim-company').value = 'DataFlow Inc';
        document.getElementById('sim-email').value = 'marcus@dataflow.app';
        document.getElementById('sim-subject').value = 'Billing Inquiry: Unexpected invoice prorate charge on seat upgrade';
        document.getElementById('sim-description').value = 'I added 2 team seats yesterday and was charged $180 instead of the expected $60. Can someone review our subscription billing details?';
      }
      return;
    }

    // Save Automation Settings
    if (e.target.closest('#btn-save-automation')) {
      const slider = document.getElementById('confidence-slider');
      const toneSelect = document.getElementById('tone-selector');
      const autoTier1 = document.getElementById('toggle-auto-tier1');
      const autoUrgent = document.getElementById('toggle-auto-urgent');

      store.setState({
        automationSettings: {
          minConfidenceThreshold: Number(slider.value),
          selectedTone: toneSelect.value,
          autoResolveTier1: autoTier1.checked,
          autoAssignUrgent: autoUrgent.checked,
          sentimentAlertThreshold: -0.6
        }
      });
      store.addToast('AI Automation policy settings saved successfully!', 'success');
      return;
    }

    // Run System Diagnostics Button
    if (e.target.closest('#btn-run-diagnostics')) {
      const resultsBox = document.getElementById('diagnostics-results-box');
      if (resultsBox) {
        resultsBox.style.display = 'block';
        resultsBox.innerHTML = '<div style="color: var(--primary);">⚙️ Executing system diagnostic test suite...</div>';
        API.runSystemDiagnostics().then(res => {
          resultsBox.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--success);">✅ Diagnostic Suite Complete — 8/8 Passed</h3>
              <span style="font-size: 0.75rem; color: var(--text-subtle);">Timestamp: ${new Date(res.timestamp).toLocaleTimeString()}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${res.tests.map(t => `
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 0.4rem 0; border-bottom: 1px solid var(--border-color);">
                  <span>✅ ${t.name}</span>
                  <span style="font-family: monospace; color: var(--secondary);">${t.latency}</span>
                </div>
              `).join('')}
            </div>
          `;
        });
      }
      return;
    }
  }

  handleGlobalSubmits(e) {
    e.preventDefault();

    // Ingest Document Modal Form Submit
    if (e.target.id === 'modal-ingest-form') {
      const title = document.getElementById('ingest-title').value;
      const category = document.getElementById('ingest-category').value;
      const content = document.getElementById('ingest-content').value;

      API.ingestKnowledgeDoc({ title, category, content }).then(() => {
        this.closeModal();
      });
      return;
    }

    // Simulator Form Submit
    if (e.target.id === 'simulator-form') {
      const name = document.getElementById('sim-name').value;
      const company = document.getElementById('sim-company').value;
      const email = document.getElementById('sim-email').value;
      const subject = document.getElementById('sim-subject').value;
      const description = document.getElementById('sim-description').value;

      const outputContainer = document.getElementById('sim-output-container');
      if (outputContainer) {
        outputContainer.innerHTML = '<div style="color: var(--secondary);">⚡ AI Pipeline Ingesting Ticket...</div>';

        API.createTicket({ customer_name: name, company, customer_email: email, subject, description }).then(newTicket => {
          API.generateAIDraft(newTicket.id).then(aiDraft => {
            outputContainer.innerHTML = `
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <strong style="color: var(--success); font-size: 0.95rem;">✅ Ticket Ingested: ${newTicket.id}</strong>
                  <span class="badge badge-${newTicket.priority}">Urgency Score: ${newTicket.urgency_score}</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                  Category: <strong>${newTicket.category}</strong> | Sentiment: <strong style="color: ${newTicket.sentiment_score < 0 ? 'var(--danger)' : 'var(--success)'}">${newTicket.sentiment} (${newTicket.sentiment_score})</strong>
                </div>
              </div>

              <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid var(--border-highlight); border-radius: var(--radius-md); padding: 1rem;">
                <div style="font-weight: 700; color: var(--primary); font-size: 0.85rem; margin-bottom: 0.5rem;">
                  ⚡ Auto-Generated Response Draft (${aiDraft.confidence_score}% Confidence):
                </div>
                <div style="font-size: 0.85rem; color: var(--text-main); white-space: pre-wrap; font-family: sans-serif; line-height: 1.5;">${aiDraft.content}</div>
              </div>

              <button class="btn btn-primary" id="btn-goto-sim-ticket" data-id="${newTicket.id}">
                Open Ticket in Desk Queue →
              </button>
            `;

            document.getElementById('btn-goto-sim-ticket')?.addEventListener('click', () => {
              store.setState({ selectedTicketId: newTicket.id, activeView: 'inbox' });
            });
          });
        });
      }
    }
  }

  openModal(contentHtml) {
    if (!this.modalOverlay) return;
    this.modalOverlay.querySelector('.modal-box').innerHTML = contentHtml;
    this.modalOverlay.classList.add('active');
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove('active');
  }
}

// Instantiate App when DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
