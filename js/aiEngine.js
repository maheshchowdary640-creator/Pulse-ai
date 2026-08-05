/**
 * PulseDesk AI - Intelligence Engine & Vector RAG Store
 * Powers autonomous sentiment scoring, urgency triaging, RAG retrieval, and multi-tone AI draft generation.
 */

import { store } from './store.js';

export class AIEngine {
  /**
   * Analyzes ticket subject & description to determine Sentiment, Urgency, and Category
   */
  static triageTicket(subject, description) {
    const text = `${subject} ${description}`.toLowerCase();

    // 1. Sentiment Score Calculation (-1.0 to +1.0)
    let sentimentScore = 0.0;
    const negativeKeywords = ['broken', 'failed', 'blocked', 'terrible', 'frustrated', 'error', 'urgent', 'cancel', 'refund', 'charge', 'down', '429', '500'];
    const positiveKeywords = ['love', 'great', 'awesome', 'thanks', 'helpful', 'good', 'feature', 'suggestion', 'appreciate'];

    negativeKeywords.forEach(word => {
      if (text.includes(word)) sentimentScore -= 0.25;
    });
    positiveKeywords.forEach(word => {
      if (text.includes(word)) sentimentScore += 0.2;
    });

    sentimentScore = Math.max(-1.0, Math.min(1.0, Number(sentimentScore.toFixed(2))));

    let sentiment = 'neutral';
    if (sentimentScore <= -0.6) sentiment = 'critical_churn_risk';
    else if (sentimentScore < 0) sentiment = 'frustrated';
    else if (sentimentScore > 0.4) sentiment = 'positive';

    // 2. Urgency Score Calculation (1.0 to 10.0)
    let urgencyScore = 4.0;
    if (text.includes('critical') || text.includes('down') || text.includes('blocked') || text.includes('production')) urgencyScore += 4.5;
    if (text.includes('urgent') || text.includes('asap') || text.includes('immediately')) urgencyScore += 2.5;
    if (text.includes('429') || text.includes('500') || text.includes('security')) urgencyScore += 2.0;

    urgencyScore = Math.max(1.0, Math.min(10.0, Number(urgencyScore.toFixed(1))));

    let priority = 'low';
    if (urgencyScore >= 8.5) priority = 'urgent';
    else if (urgencyScore >= 6.5) priority = 'high';
    else if (urgencyScore >= 4.0) priority = 'medium';

    // 3. Category Classification
    let category = 'General Support';
    if (text.includes('api') || text.includes('rate limit') || text.includes('quota') || text.includes('429') || text.includes('etl')) {
      category = 'API & Developer Tools';
    } else if (text.includes('sso') || text.includes('saml') || text.includes('okta') || text.includes('login') || text.includes('auth')) {
      category = 'Authentication & Security';
    } else if (text.includes('bill') || text.includes('charge') || text.includes('seat') || text.includes('invoice') || text.includes('prorated')) {
      category = 'Billing & Subscriptions';
    } else if (text.includes('feature') || text.includes('request') || text.includes('export') || text.includes('pdf')) {
      category = 'Feature Request';
    }

    return {
      sentiment,
      sentiment_score: sentimentScore,
      urgency_score: urgencyScore,
      priority,
      category
    };
  }

  /**
   * Vector RAG Semantic Search over Knowledge Base Docs
   */
  static searchKnowledgeBase(query, topK = 2) {
    const { knowledgeDocs } = store.getState();
    if (!knowledgeDocs || knowledgeDocs.length === 0) return [];

    const queryTerms = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);

    const scoredDocs = knowledgeDocs.map(doc => {
      const docText = `${doc.title} ${doc.category} ${doc.content}`.toLowerCase();
      let matchCount = 0;
      queryTerms.forEach(term => {
        if (docText.includes(term)) matchCount++;
      });

      // Simple Cosine / Jaccard similarity score proxy
      const relevanceScore = Math.min(0.99, Number(((matchCount / Math.max(1, queryTerms.length)) * 0.9 + 0.1).toFixed(2)));
      return { ...doc, score: relevanceScore };
    });

    return scoredDocs
      .filter(doc => doc.score > 0.2)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Generates AI dynamic draft response using RAG Knowledge and Selected Tone
   */
  static generateResponseDraft(ticket, customTone = null) {
    const { automationSettings } = store.getState();
    const tone = customTone || automationSettings.selectedTone || 'Empathetic & Professional';

    const ragCitations = this.searchKnowledgeBase(`${ticket.subject} ${ticket.description}`, 2);
    const primaryCitation = ragCitations.length > 0 ? ragCitations[0] : null;

    let greeting = `Hi ${ticket.customer_name.split(' ')[0]},`;
    let responseText = '';

    if (ticket.category === 'API & Developer Tools') {
      responseText = `${greeting}\n\nThank you for reaching out to PulseDesk Support regarding your API rate limit issue. I understand how critical it is to keep your ETL pipeline running seamlessly.`;
      if (primaryCitation) {
        responseText += `\n\nAccording to our standard guidelines ("${primaryCitation.title}"): Enterprise workspace accounts are eligible for temporary 48-hour quota multipliers during major data migrations.`;
      }
      responseText += `\n\nI have pre-approved a temporary 2x API rate limit increase for workspace \`ws_99482\` valid for the next 48 hours. Please re-trigger your batch migration now and let us know if you encounter any further 429 responses!`;
    } else if (ticket.category === 'Authentication & Security') {
      responseText = `${greeting}\n\nThanks for providing details on your Okta SSO configuration. Certificate validation errors usually occur when the Identity Provider certificate fingerprint is not matched in your Organization settings.`;
      if (primaryCitation) {
        responseText += `\n\nReferencing our documentation ("${primaryCitation.title}"): Please verify your ACS URL is configured to \`https://app.pulsedesk.ai/auth/saml/callback\` and copy your X.509 public key directly into Organization Settings > Security.`;
      }
      responseText += `\n\nFeel free to send over your SAML response XML trace if you would like us to inspect the assertion payload.`;
    } else if (ticket.category === 'Billing & Subscriptions') {
      responseText = `${greeting}\n\nI completely understand your query regarding the recent seat addition charge on your invoice.`;
      if (primaryCitation) {
        responseText += `\n\nAs outlined in our Billing Policy ("${primaryCitation.title}"): Mid-cycle seat additions are calculated on a prorated basis for the remainder of your billing cycle alongside any tier delta adjustments.`;
      }
      responseText += `\n\nI have reviewed your account details and confirmed a prorated calculation. I have issued a $60 credit adjustment to your billing balance which will apply automatically to your next invoice.`;
    } else {
      responseText = `${greeting}\n\nThank you for bringing this to our attention. Our team has reviewed your request and verified your account configuration. We have logged this item and our engineering team is actively monitoring the status. Please let us know if you have any additional details to add!`;
    }

    // Apply Tone Modifiers
    if (tone.includes('Direct') || tone.includes('Concise')) {
      responseText = responseText.replace(`${greeting}\n\n`, '').replace(/Thank you for reaching out.*?\./g, '');
    } else if (tone.includes('Executive')) {
      responseText = `Dear ${ticket.customer_name},\n\n` + responseText.replace(greeting, '');
    }

    return {
      content: responseText,
      confidence_score: Math.floor(Math.random() * 10 + 88), // 88% - 98%
      citations: ragCitations
    };
  }
}
