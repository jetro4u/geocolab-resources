// src/apps/sgs/api/services/grokService.ts
import { GrokClient } from '@x.ai/grok';
import type { 
  SignalStrengthMetrics
} from '../types/metrics.types';

export class GrokService {
  private client: GrokClient;
  
  constructor(apiKey: string) {
    this.client = new GrokClient({ apiKey });
  }

  /**
   * AI-powered profile analysis
   * Maps to SocialAuthorityMetrics.expertise
   */
  async analyzeProfile(bio: string, recentTweets: string[]): Promise<{
    primaryNiche: string;
    nichePurity: number;
    expertiseLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Thought Leader';
    topicTags: Array<{ topic: string; relevance: number; postCount: number }>;
  }> {
    const prompt = `
Analyze this X profile and determine:
1. Primary niche (single phrase, e.g., "GEO Consultant")
2. Niche purity (0-100, how consistently they stay on-topic)
3. Expertise level (Beginner/Intermediate/Advanced/Thought Leader)
4. Top 5 topic tags with relevance scores

Bio: ${bio}

Recent Tweets:
${recentTweets.join('\n---\n')}

Respond ONLY with JSON:
{
  "primaryNiche": string,
  "nichePurity": number,
  "expertiseLevel": string,
  "topicTags": [{ "topic": string, "relevance": number, "postCount": number }]
}
    `;

    const response = await this.client.chat.completions.create({
      model: 'grok-beta',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Calculate signal strength components
   * Maps to SignalStrengthMetrics.components
   */
  async calculateSignalComponents(
    tweets: Array<{ text: string; engagement: number }>
  ): Promise<SignalStrengthMetrics['components']> {
    const prompt = `
Analyze these tweets and score 0-100 for each dimension:

1. Semantic Relevance: Topic coherence across tweets
2. Context Depth: Value-add in comments (not generic)
3. Conversation Quality: Reply depth and substance
4. Originality Score: Unique insights vs echoing
5. Consistency Score: Posting regularity

Tweets:
${tweets.map((t, i) => `${i + 1}. ${t.text} (${t.engagement} engagement)`).join('\n')}

Respond ONLY with JSON:
{
  "semanticRelevance": number,
  "contextDepth": number,
  "conversationQuality": number,
  "originalityScore": number,
  "consistencyScore": number
}
    `;

    const response = await this.client.chat.completions.create({
      model: 'grok-beta',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Content quality assessment
   * Maps to ContentQualityMetrics (partial)
   */
  async assessContentQuality(content: string): Promise<{
    grokScore: number; // 0-100
    snippetReady: boolean;
    conversationalFormat: boolean;
    improvements: string[];
  }> {
    const prompt = `
Score this content 0-100 for AI visibility optimization.

Content:
${content}

Evaluate:
1. Snippet-ready (clear answer, proper structure)
2. Conversational format (natural language)
3. Top 3 improvements

Respond ONLY with JSON:
{
  "grokScore": number,
  "snippetReady": boolean,
  "conversationalFormat": boolean,
  "improvements": [string, string, string]
}
    `;

    const response = await this.client.chat.completions.create({
      model: 'grok-beta',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Real-time tweet optimization (pre-publish)
   */
  async optimizeTweet(draft: string): Promise<{
    score: number;
    suggestions: string[];
    bestPostTime: string;
  }> {
    const prompt = `
Optimize this X post draft for maximum signal strength:

Draft: "${draft}"

Provide:
1. Signal score (0-100)
2. 3 specific improvements
3. Best posting time (EST, based on content type)

Respond ONLY with JSON:
{
  "score": number,
  "suggestions": [string, string, string],
  "bestPostTime": string
}
    `;

    const response = await this.client.chat.completions.create({
      model: 'grok-beta',
      messages: [{ role: 'user', content: prompt }]
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Weekly performance summary
   */
  async generateWeeklySummary(
    handle: string,
    weekData: {
      signalBefore: number;
      signalAfter: number;
      topPosts: Array<{ text: string; engagement: number }>;
      citations: number;
    }
  ): Promise<string> {
    const prompt = `
Generate a personalized weekly summary for @${handle}:

Signal Improvement: ${weekData.signalBefore} → ${weekData.signalAfter} (+${weekData.signalAfter - weekData.signalBefore})

Top Performing Posts:
${weekData.topPosts.map((p, i) => `${i + 1}. "${p.text}" (${p.engagement} engagement)`).join('\n')}

Citations Received: ${weekData.citations}

Create a motivational 200-word summary with:
1. Key wins
2. Growth areas
3. Next week's focus

Tone: Encouraging coach
    `;

    const response = await this.client.chat.completions.create({
      model: 'grok-beta',
      messages: [{ role: 'user', content: prompt }]
    });

    return response.choices[0].message.content;
  }
}