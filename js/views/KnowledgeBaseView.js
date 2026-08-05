/**
 * PulseDesk AI - RAG Knowledge Base & Vector Store View
 */

import { store } from '../store.js';
import { AIEngine } from '../aiEngine.js';

export function renderKnowledgeBaseView() {
  const { knowledgeDocs } = store.getState();

  return `
    <div class="knowledge-view">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <div>
          <h1 style="font-size: 1.75rem; font-weight: 800;">RAG Knowledge Base & Vector Store</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Upload product documentation, policy guides, and developer docs to feed the AI RAG engine.</p>
        </div>
        <button class="btn btn-primary" id="btn-open-ingest-modal">
          <span>➕ Ingest Knowledge Document</span>
        </button>
      </div>

      <!-- Live Vector RAG Semantic Search Tester -->
      <div class="glass-card" style="margin-bottom: 2rem; background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(17, 24, 39, 0.8));">
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>🔍 Interactive Vector Search Test Bench</span>
        </h3>
        <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 1rem;">Test how the AI retrieves relevant citations from your indexed vector embeddings in real time.</p>
        
        <div style="display: flex; gap: 0.75rem;">
          <input type="text" id="rag-test-input" placeholder="Enter query (e.g., 'How to request API rate limit increase?' or 'Okta SSO certificate error')" 
            style="flex: 1; background: var(--bg-input); border: 1px solid var(--border-highlight); border-radius: var(--radius-md); padding: 0.65rem 1rem; color: var(--text-main); font-size: 0.9rem; outline: none;">
          <button class="btn btn-primary" id="btn-run-rag-test">Execute Vector Match</button>
        </div>

        <div id="rag-test-results" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.65rem;">
          <!-- Dynamically populated search test results -->
        </div>
      </div>

      <!-- Knowledge Document List -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
        ${knowledgeDocs.map(doc => `
          <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: var(--secondary); border: 1px solid rgba(6, 182, 212, 0.3);">${doc.category}</span>
                <span class="badge badge-resolved">✓ ${doc.status}</span>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">${doc.title}</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                ${doc.content}
              </p>
            </div>

            <div style="padding-top: 0.75rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-subtle);">
              <span>Chunks: <strong>${doc.chunk_count} vectors</strong></span>
              <span>Size: <strong>${doc.file_size}</strong></span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
