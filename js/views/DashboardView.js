/**
 * PulseDesk AI - Analytics & Sentiment Radar View
 */

import { store } from '../store.js';

export function renderDashboardView() {
  const { tickets, analytics } = store.getState();

  const total = tickets.length;
  const openCount = tickets.filter(t => t.status === 'open').length;
  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;

  const urgentCount = tickets.filter(t => t.priority === 'urgent').length;
  const frustratedCount = tickets.filter(t => t.sentiment === 'frustrated' || t.sentiment === 'critical_churn_risk').length;

  return `
    <div class="dashboard-view">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <div>
          <h1 style="font-size: 1.75rem; font-weight: 800;">Executive Dashboard & Sentiment Radar</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Real-time AI customer support metrics, churn risk indicators, and ticket volume intelligence.</p>
        </div>
        <button class="btn btn-primary" id="btn-quick-simulate">
          <span>⚡ Live Ticket Simulation</span>
        </button>
      </div>

      <!-- Top KPI Cards Grid -->
      <div class="metrics-grid">
        <div class="glass-card metric-card">
          <div class="metric-header">
            <span class="metric-title">Total Ingested Tickets</span>
            <div class="metric-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--primary);">📥</div>
          </div>
          <div class="metric-value">${total}</div>
          <div class="metric-sub trend-up">
            <span>↑ 14.2%</span> <span style="color: var(--text-subtle);">vs last week</span>
          </div>
        </div>

        <div class="glass-card metric-card">
          <div class="metric-header">
            <span class="metric-title">Active Open Queue</span>
            <div class="metric-icon" style="background: rgba(236, 72, 153, 0.15); color: var(--accent);">⏳</div>
          </div>
          <div class="metric-value">${openCount}</div>
          <div class="metric-sub trend-down">
            <span>${pendingCount} pending verification</span>
          </div>
        </div>

        <div class="glass-card metric-card">
          <div class="metric-header">
            <span class="metric-title">Avg Resolution Time (MTTR)</span>
            <div class="metric-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--success);">⚡</div>
          </div>
          <div class="metric-value">${analytics.avgResolutionTimeMin}m</div>
          <div class="metric-sub trend-up">
            <span>↓ 68% MTTR reduction with AI</span>
          </div>
        </div>

        <div class="glass-card metric-card">
          <div class="metric-header">
            <span class="metric-title">Predicted CSAT Score</span>
            <div class="metric-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--warning);">⭐</div>
          </div>
          <div class="metric-value">${analytics.csatScore}%</div>
          <div class="metric-sub trend-up">
            <span>↑ +4.2 points YoY</span>
          </div>
        </div>
      </div>

      <!-- Main Charts Layout -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- Ticket Volume Chart (Custom SVG Visualizer) -->
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 700;">Ticket Volume & AI Auto-Resolution Rate</h3>
              <p style="color: var(--text-muted); font-size: 0.8rem;">Daily incoming queries vs AI autonomous resolutions</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <span class="badge" style="background: rgba(99, 102, 241, 0.2); color: var(--primary);">— Total Volume</span>
              <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: var(--success);">— AI Resolved</span>
            </div>
          </div>

          <!-- Custom Rendered SVG Line Chart -->
          <div style="height: 220px; width: 100%; position: relative;">
            <svg viewBox="0 0 500 180" style="width: 100%; height: 100%; overflow: visible;">
              <defs>
                <linearGradient id="gradPrimary" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4" />
                  <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0" />
                </linearGradient>
                <linearGradient id="gradSuccess" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- Grid Lines -->
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.05)" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.05)" />

              <!-- Total Volume Area & Line -->
              <path d="M 0 130 Q 75 90, 150 110 T 300 40 T 450 70 L 500 30 L 500 160 L 0 160 Z" fill="url(#gradPrimary)" />
              <path d="M 0 130 Q 75 90, 150 110 T 300 40 T 450 70 L 500 30" fill="none" stroke="#6366f1" stroke-width="3" />

              <!-- AI Resolved Area & Line -->
              <path d="M 0 150 Q 75 120, 150 135 T 300 80 T 450 100 L 500 60 L 500 160 L 0 160 Z" fill="url(#gradSuccess)" />
              <path d="M 0 150 Q 75 120, 150 135 T 300 80 T 450 100 L 500 60" fill="none" stroke="#10b981" stroke-width="3" />

              <!-- Points -->
              <circle cx="150" cy="110" r="4" fill="#6366f1" />
              <circle cx="300" cy="40" r="4" fill="#6366f1" />
              <circle cx="500" cy="30" r="4" fill="#6366f1" />

              <circle cx="150" cy="135" r="4" fill="#10b981" />
              <circle cx="300" cy="80" r="4" fill="#10b981" />
              <circle cx="500" cy="60" r="4" fill="#10b981" />
            </svg>

            <!-- X Axis Labels -->
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.5rem;">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Today</span>
            </div>
          </div>
        </div>

        <!-- Sentiment Radar & Churn Alert Box -->
        <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem;">Sentiment Breakdown</h3>
            <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 1rem;">Customer mood analysis across queue</p>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span>Positive / Delighted</span>
                  <span style="color: var(--success); font-weight: 600;">58%</span>
                </div>
                <div style="height: 6px; background: #1e293b; border-radius: 99px; overflow: hidden;">
                  <div style="width: 58%; height: 100%; background: var(--success);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span>Neutral / Informational</span>
                  <span style="color: var(--secondary); font-weight: 600;">28%</span>
                </div>
                <div style="height: 6px; background: #1e293b; border-radius: 99px; overflow: hidden;">
                  <div style="width: 28%; height: 100%; background: var(--secondary);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span>Frustrated / Churn Risk</span>
                  <span style="color: var(--danger); font-weight: 600;">14%</span>
                </div>
                <div style="height: 6px; background: #1e293b; border-radius: 99px; overflow: hidden;">
                  <div style="width: 14%; height: 100%; background: var(--danger);"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Churn Risk Alert Warning Box -->
          <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); padding: 0.85rem; margin-top: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; color: #f87171; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.25rem;">
              <span>⚠️ Churn Radar Alert</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted);">
              <strong>${frustratedCount} tickets</strong> flagged with negative sentiment. AI Auto-responder dispatched priority retention draft for high-value workspace \`ws_99482\`.
            </p>
          </div>
        </div>
      </div>

      <!-- Recent High Priority Tickets Table -->
      <div class="glass-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700;">High Urgency Support Tickets</h3>
          <span style="font-size: 0.8rem; color: var(--primary); cursor: pointer;" id="link-view-inbox">View Full Desk Queue →</span>
        </div>

        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">
              <th style="padding: 0.75rem 0.5rem;">Ticket ID</th>
              <th style="padding: 0.75rem 0.5rem;">Customer</th>
              <th style="padding: 0.75rem 0.5rem;">Subject</th>
              <th style="padding: 0.75rem 0.5rem;">Category</th>
              <th style="padding: 0.75rem 0.5rem;">Urgency</th>
              <th style="padding: 0.75rem 0.5rem;">Sentiment</th>
              <th style="padding: 0.75rem 0.5rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${tickets.map(t => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                <td style="padding: 0.75rem 0.5rem; font-weight: 600; color: var(--secondary);">${t.id}</td>
                <td style="padding: 0.75rem 0.5rem;">
                  <div style="font-weight: 600;">${t.customer_name}</div>
                  <div style="font-size: 0.75rem; color: var(--text-subtle);">${t.company}</div>
                </td>
                <td style="padding: 0.75rem 0.5rem; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.subject}</td>
                <td style="padding: 0.75rem 0.5rem;"><span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-muted);">${t.category}</span></td>
                <td style="padding: 0.75rem 0.5rem;"><span class="badge badge-${t.priority}">${t.priority} (${t.urgency_score})</span></td>
                <td style="padding: 0.75rem 0.5rem;">
                  <span style="color: ${t.sentiment_score < 0 ? 'var(--danger)' : 'var(--success)'}; font-weight: 600;">
                    ${t.sentiment_score < 0 ? '😟 ' : '😊 '}${t.sentiment}
                  </span>
                </td>
                <td style="padding: 0.75rem 0.5rem; text-align: right;">
                  <button class="btn btn-sm btn-secondary btn-open-ticket" data-id="${t.id}">Open Ticket</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
