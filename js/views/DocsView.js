/**
 * PulseDesk AI - In-App Technical Documentation & System Specifications
 */

export function renderDocsView() {
  return `
    <div class="docs-view">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.75rem; font-weight: 800;">Platform Technical Documentation</h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Comprehensive architectural specifications, REST API reference, and system design blueprint.</p>
      </div>

      <div class="glass-card" style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--primary); margin-bottom: 0.75rem;">1. Architecture & System Overview</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
          PulseDesk AI is constructed as a client-first, modular single-page application (SPA) backed by an in-browser asynchronous REST API simulator, custom reactive store with LocalStorage persistence, and a simulated Vector RAG (Retrieval-Augmented Generation) inference engine.
        </p>

        <div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--secondary);">
          Client UI (HTML5/Vanilla JS) ──► Event Store (store.js) ──► AI Engine (triage / RAG) ──► REST API (api.js) ──► LocalStorage
        </div>
      </div>

      <div class="glass-card" style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--secondary); margin-bottom: 0.75rem;">2. REST API Specification</h2>
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.82rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-muted);">
              <th style="padding: 0.5rem;">Method</th>
              <th style="padding: 0.5rem;">Endpoint</th>
              <th style="padding: 0.5rem;">Description</th>
            </tr>
          </thead>
          <tbody style="color: var(--text-main);">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
              <td style="padding: 0.5rem; font-weight: 700; color: var(--success);">POST</td>
              <td style="padding: 0.5rem; font-family: monospace;">/api/v1/tickets</td>
              <td style="padding: 0.5rem;">Ingest new customer ticket & trigger automatic AI triage</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
              <td style="padding: 0.5rem; font-weight: 700; color: var(--info);">GET</td>
              <td style="padding: 0.5rem; font-family: monospace;">/api/v1/tickets</td>
              <td style="padding: 0.5rem;">Fetch list of tickets with priority/status filter</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
              <td style="padding: 0.5rem; font-weight: 700; color: var(--success);">POST</td>
              <td style="padding: 0.5rem; font-family: monospace;">/api/v1/tickets/:id/ai-draft</td>
              <td style="padding: 0.5rem;">Generate dynamic AI draft response using Vector RAG</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
              <td style="padding: 0.5rem; font-weight: 700; color: var(--success);">POST</td>
              <td style="padding: 0.5rem; font-family: monospace;">/api/v1/knowledge/ingest</td>
              <td style="padding: 0.5rem;">Ingest documentation into Vector RAG Store</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="glass-card">
        <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--warning); margin-bottom: 0.75rem;">3. Vector RAG Engine Math</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
          Vector similarity match score between incoming query \( Q \) and knowledge document \( D \) is calculated via Cosine vector dot product over term frequency:
        </p>
        <div style="text-align: center; margin: 1rem 0; font-size: 1rem; color: var(--text-main);">
          \[ \text{Similarity}(Q, D) = \frac{\vec{V}(Q) \cdot \vec{V}(D)}{\|\vec{V}(Q)\| \|\vec{V}(D)\|} \]
        </div>
      </div>
    </div>
  `;
}
