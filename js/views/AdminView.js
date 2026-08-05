/**
 * PulseDesk AI - Admin Settings & System Diagnostics View
 */

import { store } from '../store.js';
import { API } from '../api.js';

export function renderAdminView() {
  const { currentUser } = store.getState();

  return `
    <div class="admin-view">
      <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 1.75rem; font-weight: 800;">System Administration & Diagnostics</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Manage organization settings, audit logs, team roles, and system diagnostic tests.</p>
        </div>
        <button class="btn btn-primary" id="btn-run-diagnostics">
          <span>⚙️ Run System Diagnostics</span>
        </button>
      </div>

      <!-- User Profile Card -->
      <div class="glass-card" style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="avatar" style="width: 48px; height: 48px; font-size: 1.1rem;">${currentUser.avatar}</div>
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700;">${currentUser.name}</h3>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${currentUser.email} • <strong style="color: var(--primary);">${currentUser.role}</strong></div>
          </div>
        </div>
        <span class="badge badge-resolved">Active Session</span>
      </div>

      <!-- Diagnostic Results Box (Container) -->
      <div class="glass-card" id="diagnostics-results-box" style="margin-bottom: 1.5rem; display: none;">
        <!-- Dynamically rendered diagnostics list -->
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        
        <!-- Team Members Roster -->
        <div class="glass-card">
          <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 1rem;">Team Members & Roles</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem; background: var(--bg-input); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="avatar" style="width: 32px; height: 32px;">SJ</div>
                <div>
                  <div style="font-size: 0.85rem; font-weight: 600;">Sarah Jenkins</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">sarah.j@pulsedesk.ai</div>
                </div>
              </div>
              <span class="badge" style="background: rgba(99, 102, 241, 0.2); color: var(--primary);">VP / Admin</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem; background: var(--bg-input); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="avatar" style="width: 32px; height: 32px; background: linear-gradient(135deg, var(--secondary), var(--primary));">DC</div>
                <div>
                  <div style="font-size: 0.85rem; font-weight: 600;">David Chen</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">david.c@pulsedesk.ai</div>
                </div>
              </div>
              <span class="badge" style="background: rgba(6, 182, 212, 0.2); color: var(--secondary);">Senior Support Engineer</span>
            </div>
          </div>
        </div>

        <!-- System Audit Log -->
        <div class="glass-card">
          <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 1rem;">System Audit Trail</h3>
          <ul style="list-style: none; font-size: 0.78rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.65rem;">
            <li style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
              <strong style="color: var(--text-main);">[${new Date().toLocaleTimeString()}]</strong> AI Engine auto-triaged ticket TCK-8902 (Urgency: 9.2).
            </li>
            <li style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
              <strong style="color: var(--text-main);">[${new Date(Date.now() - 10 * 60 * 1000).toLocaleTimeString()}]</strong> Ingested 3 vector document chunks into Knowledge RAG Store.
            </li>
            <li style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
              <strong style="color: var(--text-main);">[${new Date(Date.now() - 25 * 60 * 1000).toLocaleTimeString()}]</strong> Automation policy saved by Sarah Jenkins (Min confidence 85%).
            </li>
          </ul>
        </div>

      </div>
    </div>
  `;
}
