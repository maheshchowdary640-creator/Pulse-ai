/**
 * PulseDesk AI - Interactive Live Ticket Ingestion Simulator
 */

import { API } from '../api.js';

export function renderSimulatorView() {
  return `
    <div class="simulator-view">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.75rem; font-weight: 800;">Interactive Live Ticket Simulator</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Simulate real customer ticket submission scenarios and observe instant AI triaging, RAG retrieval, and response drafting.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        
        <!-- Left: Simulator Input Form -->
        <div class="glass-card">
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">1. Select Preset Scenario or Write Custom Issue</h3>
          
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
            <button class="btn btn-sm btn-secondary preset-btn" data-scenario="api">⚡ API Quota Exceeded</button>
            <button class="btn btn-sm btn-secondary preset-btn" data-scenario="sso">🔒 SSO SAML Certificate</button>
            <button class="btn btn-sm btn-secondary preset-btn" data-scenario="billing">💳 Prorated Billing Query</button>
          </div>

          <form id="simulator-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Customer Name</label>
                <input type="text" id="sim-name" value="Jordan Lee" 
                  style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem; color: var(--text-main); font-size: 0.85rem; outline: none;">
              </div>
              <div>
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Company Name</label>
                <input type="text" id="sim-company" value="Apex Cloud Systems" 
                  style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem; color: var(--text-main); font-size: 0.85rem; outline: none;">
              </div>
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Customer Email</label>
              <input type="email" id="sim-email" value="jordan@apexcloud.io" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem; color: var(--text-main); font-size: 0.85rem; outline: none;">
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Ticket Subject</label>
              <input type="text" id="sim-subject" value="URGENT: Webhook delivery failures on customer payment events" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem; color: var(--text-main); font-size: 0.85rem; outline: none;">
            </div>

            <div>
              <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Issue Description</label>
              <textarea id="sim-description" rows="4" 
                style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem; color: var(--text-main); font-size: 0.85rem; outline: none; resize: vertical;"
              >All incoming webhook payloads from our checkout endpoint are returning HTTP 502 Bad Gateway. Our customer order provisioning is completely blocked!</textarea>
            </div>

            <button type="submit" class="btn btn-primary" id="btn-run-simulation" style="margin-top: 0.5rem;">
              <span>🚀 Dispatch Ticket & Trigger AI Engine</span>
            </button>
          </form>
        </div>

        <!-- Right: Live AI Pipeline Execution Logs & Output -->
        <div class="glass-card" style="display: flex; flex-direction: column; background: rgba(15, 23, 42, 0.9);">
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--secondary);">2. Real-Time AI Pipeline Output</h3>

          <div id="sim-output-container" style="flex: 1; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto;">
            <div style="color: var(--text-muted); font-size: 0.85rem; font-style: italic; text-align: center; margin-top: 3rem;">
              Submit a scenario on the left to see live AI sentiment analysis, urgency scoring, vector RAG citations, and auto-generated response draft.
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}
