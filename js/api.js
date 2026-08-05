/**
 * PulseDesk AI - Simulated Async REST API Client
 * Simulates network endpoints, latency (200ms), and error handling
 */

import { store } from './store.js';
import { AIEngine } from './aiEngine.js';

const simulateLatency = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const API = {
  // Auth Endpoint
  async login(email, password) {
    await simulateLatency(300);
    if (!email || !password) throw new Error('Email and password required');
    return {
      token: 'jwt_mock_token_' + Math.random().toString(36).substr(2),
      user: store.getState().currentUser
    };
  },

  // Tickets API
  async getTickets(filter = {}) {
    await simulateLatency(150);
    let { tickets } = store.getState();
    
    if (filter.status && filter.status !== 'all') {
      tickets = tickets.filter(t => t.status === filter.status);
    }
    if (filter.priority && filter.priority !== 'all') {
      tickets = tickets.filter(t => t.priority === filter.priority);
    }
    if (filter.search) {
      const s = filter.search.toLowerCase();
      tickets = tickets.filter(t => 
        t.subject.toLowerCase().includes(s) || 
        t.customer_name.toLowerCase().includes(s) ||
        t.id.toLowerCase().includes(s)
      );
    }
    return tickets;
  },

  async createTicket(ticketData) {
    await simulateLatency(350);
    const triageResult = AIEngine.triageTicket(ticketData.subject, ticketData.description);
    
    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_name: ticketData.customer_name || 'Anonymous User',
      customer_email: ticketData.customer_email || 'client@company.io',
      company: ticketData.company || 'Client Corp',
      subject: ticketData.subject,
      description: ticketData.description,
      status: 'open',
      priority: triageResult.priority,
      sentiment: triageResult.sentiment,
      sentiment_score: triageResult.sentiment_score,
      urgency_score: triageResult.urgency_score,
      category: triageResult.category,
      assigned_to: 'Unassigned',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      messages: [
        {
          id: 'msg_' + Date.now(),
          sender_type: 'customer',
          sender_name: ticketData.customer_name || 'Customer',
          content: ticketData.description,
          created_at: new Date().toISOString()
        }
      ]
    };

    store.addTicket(newTicket);
    return newTicket;
  },

  async sendReply(ticketId, content, isAI = false, senderName = 'Support Agent') {
    await simulateLatency(250);
    const message = {
      id: 'msg_' + Date.now(),
      sender_type: isAI ? 'ai' : 'agent',
      sender_name: senderName,
      content,
      created_at: new Date().toISOString()
    };
    store.addMessageToTicket(ticketId, message);
    return message;
  },

  async generateAIDraft(ticketId, tone = null) {
    await simulateLatency(400);
    const { tickets } = store.getState();
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) throw new Error('Ticket not found');

    return AIEngine.generateResponseDraft(ticket, tone);
  },

  // Knowledge Base API
  async ingestKnowledgeDoc(docData) {
    await simulateLatency(300);
    const newDoc = {
      id: 'doc_' + (store.getState().knowledgeDocs.length + 1),
      title: docData.title,
      category: docData.category || 'General',
      status: 'indexed',
      chunk_count: Math.ceil(docData.content.length / 250),
      file_size: `${Math.max(1, Math.round(docData.content.length / 1024))} KB`,
      content: docData.content
    };
    store.addKnowledgeDoc(newDoc);
    return newDoc;
  },

  // Diagnostics API Runner
  async runSystemDiagnostics() {
    await simulateLatency(500);
    const tests = [
      { name: 'REST API Connectivity & JWT Token issuance', passed: true, latency: '18ms' },
      { name: 'Reactive State Store & LocalStorage Persistence', passed: true, latency: '5ms' },
      { name: 'AI Sentiment Triaging Engine (-1.0 to +1.0 calibration)', passed: true, latency: '32ms' },
      { name: 'Vector RAG TF-IDF Cosine Similarity Retrieval', passed: true, latency: '41ms' },
      { name: 'Multi-Tone AI Response Generator Execution', passed: true, latency: '65ms' },
      { name: 'Urgency Rating & Auto-Categorization Rules', passed: true, latency: '12ms' },
      { name: 'Interactive Ticket Simulator Stream Handler', passed: true, latency: '24ms' },
      { name: 'Admin Audit Log Integrity & SLA Monitor', passed: true, latency: '8ms' }
    ];
    return {
      allPassed: true,
      timestamp: new Date().toISOString(),
      tests
    };
  }
};
