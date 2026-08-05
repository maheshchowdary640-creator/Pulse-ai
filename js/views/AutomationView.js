/**
 * PulseDesk AI - AI Automation Studio & Policy Settings View
 */

import { store } from '../store.js';

export function renderAutomationView() {
  const { automationSettings } = store.getState();

  return `
    <div class="automation-view">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.75rem; font-weight: 800;">AI Automation Studio & Policy Controls</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Configure autonomous AI resolution thresholds, bot tone, and smart ticket routing rules.</p>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
        
        <!-- Left: Configuration Form -->
        <div class="glass-card" style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Confidence Threshold Slider -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label style="font-weight: 700; font-size: 0.95rem;">AI Autonomous Confidence Threshold</label>
              <span id="confidence-val" style="font-size: 1rem; font-weight: 800; color: var(--primary);">${automationSettings.minConfidenceThreshold}%</span>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              The minimum RAG semantic match confidence score required before the AI is permitted to auto-reply and close a ticket without human agent intervention.
            </p>
            <input type="range" id="confidence-slider" min="60" max="98" value="${automationSettings.minConfidenceThreshold}" 
              style="width: 100%; accent-color: var(--primary); cursor: pointer;">
          </div>

          <!-- AI Tone Selector -->
          <div>
            <label style="font-weight: 700; font-size: 0.95rem; display: block; margin-bottom: 0.5rem;">AI Bot Brand Tone & Persona</label>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              Select the conversational persona used when AI generates response drafts or sends autonomous replies.
            </p>
            <select id="tone-selector" style="width: 100%; background: var(--bg-input); color: var(--text-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.65rem; font-size: 0.9rem; outline: none;">
              <option value="Empathetic & Professional" ${automationSettings.selectedTone.includes('Empathetic') ? 'selected' : ''}>Empathetic & Professional (Default for SaaS Support)</option>
              <option value="Direct & Concise" ${automationSettings.selectedTone.includes('Direct') ? 'selected' : ''}>Direct & Concise (Fast developer answers)</option>
              <option value="Technical Support" ${automationSettings.selectedTone.includes('Technical') ? 'selected' : ''}>Technical Support (In-depth code & logs focus)</option>
              <option value="Executive" ${automationSettings.selectedTone.includes('Executive') ? 'selected' : ''}>Executive (Formal corporate tone)</option>
            </select>
          </div>

          <!-- Toggles Grid -->
          <div style="display: flex; flex-direction: column; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="font-size: 0.9rem; display: block;">Autonomous Tier-1 Auto-Resolution</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Automatically resolve standard password & billing questions matching RAG docs.</span>
              </div>
              <input type="checkbox" id="toggle-auto-tier1" ${automationSettings.autoResolveTier1 ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--primary); cursor: pointer;">
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <strong style="font-size: 0.9rem; display: block;">Auto-Assign Urgent Tickets to Senior Staff</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Route tickets with urgency rating > 8.0 directly to Senior Support Engineers.</span>
              </div>
              <input type="checkbox" id="toggle-auto-urgent" ${automationSettings.autoAssignUrgent ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--primary); cursor: pointer;">
            </div>

          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-primary" id="btn-save-automation">Save Automation Rules</button>
          </div>

        </div>

        <!-- Right: Policy Summary Card -->
        <div class="glass-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(17, 24, 39, 0.8));">
          <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--primary);">Active Policy Summary</h3>
          <ul style="list-style: none; font-size: 0.82rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.75rem;">
            <li>✅ <strong>Target MTTR:</strong> Sub 15 minutes</li>
            <li>✅ <strong>Auto-Resolve Guardrail:</strong> Min ${automationSettings.minConfidenceThreshold}% Vector similarity match</li>
            <li>✅ <strong>Active Brand Tone:</strong> ${automationSettings.selectedTone}</li>
            <li>✅ <strong>LLM Safety Guardrail:</strong> Zero hallucination policy with mandatory RAG context citations</li>
          </ul>
        </div>

      </div>
    </div>
  `;
}
