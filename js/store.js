/**
 * PulseDesk AI - Central Reactive Store & Data Persistence Engine
 */

const STORAGE_KEY = 'pulsedesk_ai_state_v1';

const defaultState = {
  currentUser: {
    id: 'usr_admin_01',
    name: 'Sarah Jenkins',
    email: 'sarah.j@pulsedesk.ai',
    role: 'VP Customer Success & Admin',
    avatar: 'SJ'
  },
  activeView: 'dashboard',
  tickets: [
    {
      id: 'TCK-8902',
      customer_name: 'Alex Rivera',
      customer_email: 'alex.rivera@techcorp.io',
      company: 'TechCorp Solutions',
      subject: 'Critical: API rate limit exceeded during migration batch job',
      description: 'Our ETL pipeline failed with HTTP 429 errors. We are currently blocked on migrating 500,000 records. Is it possible to temporarily double our API quota for workspace ws_99482?',
      status: 'open',
      priority: 'urgent',
      sentiment: 'frustrated',
      sentiment_score: -0.75,
      urgency_score: 9.2,
      category: 'API & Developer Tools',
      assigned_to: 'David Chen',
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 'msg_101',
          sender_type: 'customer',
          sender_name: 'Alex Rivera',
          content: 'Our ETL pipeline failed with HTTP 429 errors. We are currently blocked on migrating 500,000 records. Is it possible to temporarily double our API quota for workspace ws_99482?',
          created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: 'TCK-8901',
      customer_name: 'Sophia Martinez',
      customer_email: 'sophia@innovate.co',
      company: 'Innovate Co',
      subject: 'Question regarding Enterprise SSO SAML integration setup',
      description: 'We are configuring Okta SSO for our organization. The ACS URL specified in your documentation gives a certificate validation warning on test connections.',
      status: 'pending',
      priority: 'high',
      sentiment: 'neutral',
      sentiment_score: 0.1,
      urgency_score: 6.8,
      category: 'Authentication & Security',
      assigned_to: 'David Chen',
      created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 'msg_102',
          sender_type: 'customer',
          sender_name: 'Sophia Martinez',
          content: 'We are configuring Okta SSO for our organization. The ACS URL specified in your documentation gives a certificate validation warning on test connections.',
          created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
        },
        {
          id: 'msg_103',
          sender_type: 'agent',
          sender_name: 'David Chen',
          content: 'Hi Sophia, thanks for reaching out! Please verify that your Okta certificate payload matches the SHA-256 fingerprint in your PulseDesk Security settings page.',
          created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: 'TCK-8900',
      customer_name: 'Marcus Vance',
      customer_email: 'marcus@dataflow.app',
      company: 'DataFlow Inc',
      subject: 'Billing Inquiry: Unexpected invoice prorate charge on seat upgrade',
      description: 'I added 2 team seats yesterday and was charged $180 instead of the expected $60. Can someone review our subscription billing details?',
      status: 'open',
      priority: 'medium',
      sentiment: 'frustrated',
      sentiment_score: -0.4,
      urgency_score: 5.5,
      category: 'Billing & Subscriptions',
      assigned_to: 'Unassigned',
      created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 'msg_104',
          sender_type: 'customer',
          sender_name: 'Marcus Vance',
          content: 'I added 2 team seats yesterday and was charged $180 instead of the expected $60. Can someone review our subscription billing details?',
          created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: 'TCK-8899',
      customer_name: 'Emily Zhang',
      customer_email: 'emily@growthlabs.io',
      company: 'GrowthLabs',
      subject: 'Feature Request: Export sentiment analytics reports to CSV/PDF',
      description: 'Our executive team loves the PulseDesk AI Sentiment Radar dashboard! It would be super helpful if we could schedule automated weekly PDF exports.',
      status: 'resolved',
      priority: 'low',
      sentiment: 'positive',
      sentiment_score: 0.85,
      urgency_score: 2.1,
      category: 'Feature Request',
      assigned_to: 'Sarah Jenkins',
      created_at: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 'msg_105',
          sender_type: 'customer',
          sender_name: 'Emily Zhang',
          content: 'Our executive team loves the PulseDesk AI Sentiment Radar dashboard! It would be super helpful if we could schedule automated weekly PDF exports.',
          created_at: new Date(Date.now() - 240 * 60 * 1000).toISOString()
        },
        {
          id: 'msg_106',
          sender_type: 'ai',
          sender_name: 'PulseDesk AI Assistant',
          content: 'Hello Emily! Thank you so much for the positive feedback. I have logged your request with our Product Team. Scheduled PDF export reporting is currently planned for Q3 release!',
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        }
      ]
    }
  ],
  selectedTicketId: 'TCK-8902',
  knowledgeDocs: [
    {
      id: 'doc_1',
      title: 'API Rate Limits & Quota Escalation Guidelines',
      category: 'API & Developer Tools',
      status: 'indexed',
      chunk_count: 12,
      file_size: '24 KB',
      content: `PulseDesk AI enforcing rate limits based on workspace subscription tier. Standard Tier allows 1,000 requests/minute. Enterprise Tier allows 10,000 requests/minute. During major data migrations or batch imports, admins can request a temporary 48-hour quota multiplier via support ticket or API console quota escalation button.`
    },
    {
      id: 'doc_2',
      title: 'Okta & Azure AD SAML 2.0 Single Sign-On Configuration',
      category: 'Authentication & Security',
      status: 'indexed',
      chunk_count: 18,
      file_size: '42 KB',
      content: `To configure Okta or Azure AD SAML SSO in PulseDesk AI, navigate to Organization Settings > Security > SAML Config. Ensure your Identity Provider ACS URL is set to https://app.pulsedesk.ai/auth/saml/callback. Paste your X.509 certificate public key and verify the SHA-256 fingerprint matches.`
    },
    {
      id: 'doc_3',
      title: 'Prorated Billing & Mid-Cycle Seat Adjustments',
      category: 'Billing & Subscriptions',
      status: 'indexed',
      chunk_count: 8,
      file_size: '16 KB',
      content: `When adding team members mid-billing cycle, PulseDesk calculates prorated charges for the remaining days in your billing period. If you change billing plan tiers simultaneously, invoice items will list both seat proration and plan tier delta adjustments.`
    }
  ],
  automationSettings: {
    minConfidenceThreshold: 85,
    selectedTone: 'Empathetic & Professional',
    autoResolveTier1: true,
    autoAssignUrgent: true,
    sentimentAlertThreshold: -0.6
  },
  analytics: {
    totalTickets: 148,
    openTickets: 12,
    avgResolutionTimeMin: 18.5,
    csatScore: 94.8,
    churnRiskAlerts: 3
  },
  toasts: []
};

class Store {
  constructor() {
    this.listeners = [];
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load state from LocalStorage, initializing default', e);
    }
    return defaultState;
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to LocalStorage', e);
    }
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.saveState();
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Toast Notification Helpers
  addToast(message, type = 'info') {
    const toast = { id: 't_' + Date.now(), message, type };
    this.setState({ toasts: [...this.state.toasts, toast] });
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 4000);
  }

  removeToast(id) {
    this.setState({
      toasts: this.state.toasts.filter(t => t.id !== id)
    });
  }

  // Ticket Operations
  addTicket(newTicket) {
    const tickets = [newTicket, ...this.state.tickets];
    this.setState({ 
      tickets,
      selectedTicketId: newTicket.id
    });
    this.addToast(`New ticket ${newTicket.id} ingested & triaged by AI`, 'success');
  }

  addMessageToTicket(ticketId, message) {
    const updatedTickets = this.state.tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          updated_at: new Date().toISOString(),
          messages: [...t.messages, message]
        };
      }
      return t;
    });
    this.setState({ tickets: updatedTickets });
  }

  updateTicketStatus(ticketId, status) {
    const updatedTickets = this.state.tickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, status, updated_at: new Date().toISOString() };
      }
      return t;
    });
    this.setState({ tickets: updatedTickets });
    this.addToast(`Ticket ${ticketId} status changed to ${status.toUpperCase()}`, 'info');
  }

  // Knowledge Base Operations
  addKnowledgeDoc(doc) {
    const knowledgeDocs = [doc, ...this.state.knowledgeDocs];
    this.setState({ knowledgeDocs });
    this.addToast(`Knowledge Document "${doc.title}" indexed into Vector RAG Store`, 'success');
  }
}

export const store = new Store();
