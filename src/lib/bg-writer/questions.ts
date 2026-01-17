/**
 * Position Paper Writer Questions
 *
 * Complete question definitions aligned with PP-Writer.md specification.
 *
 * Layer Structure:
 * - Layer 4 (comprehension): 25 questions organized by 7 categories
 * - Layer 3 (ideaFormation): Bridge questions - form ideas from L4 research
 * - Layer 2 (paragraphComponents): 24 polished sentence sections
 * - Layer 1 (finalPaper): Auto-assembled from Layer 2
 */

import type {
  QuestionDefinition,
  LayerType,
  ParagraphType,
  BookmarkCategory,
  BGWriterDraft,
} from "./types";

// =============================================================================
// LAYER 4: BACKGROUND GUIDE COMPREHENSION (25 questions)
// =============================================================================

const COMPREHENSION_QUESTIONS: QuestionDefinition[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Topic Fundamentals (3 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topicDefinition",
    layer: "comprehension",
    translationKey: "topicDefinition",
    helpTextKey: "topicDefinitionHelp",
    inputType: "textarea",
    required: true,
    categoryGroup: "topicFundamentals",
    l4Sources: ["topic_definition"],
  },
  {
    id: "keyTerms",
    layer: "comprehension",
    translationKey: "keyTerms",
    helpTextKey: "keyTermsHelp",
    inputType: "bullets",
    categoryGroup: "topicFundamentals",
    l4Sources: ["key_terms"],
  },
  {
    id: "scope",
    layer: "comprehension",
    translationKey: "scope",
    helpTextKey: "scopeHelp",
    inputType: "textarea",
    categoryGroup: "topicFundamentals",
    l4Sources: ["scope"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Historical Context (3 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "origin",
    layer: "comprehension",
    translationKey: "origin",
    helpTextKey: "originHelp",
    inputType: "textarea",
    categoryGroup: "historicalContext",
    l4Sources: ["origin"],
  },
  {
    id: "timeline",
    layer: "comprehension",
    translationKey: "timeline",
    helpTextKey: "timelineHelp",
    inputType: "bullets",
    categoryGroup: "historicalContext",
    l4Sources: ["timeline"],
  },
  {
    id: "evolution",
    layer: "comprehension",
    translationKey: "evolution",
    helpTextKey: "evolutionHelp",
    inputType: "textarea",
    categoryGroup: "historicalContext",
    l4Sources: ["evolution"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Current Situation (3 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "presentState",
    layer: "comprehension",
    translationKey: "presentState",
    helpTextKey: "presentStateHelp",
    inputType: "textarea",
    categoryGroup: "currentSituation",
    l4Sources: ["present_state"],
  },
  {
    id: "keyStatistics",
    layer: "comprehension",
    translationKey: "keyStatistics",
    helpTextKey: "keyStatisticsHelp",
    inputType: "bullets",
    categoryGroup: "currentSituation",
    l4Sources: ["key_statistics"],
  },
  {
    id: "recentDevelopments",
    layer: "comprehension",
    translationKey: "recentDevelopments",
    helpTextKey: "recentDevelopmentsHelp",
    inputType: "bullets",
    categoryGroup: "currentSituation",
    l4Sources: ["recent_developments"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Stakeholders (3 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "affectedPopulations",
    layer: "comprehension",
    translationKey: "affectedPopulations",
    helpTextKey: "affectedPopulationsHelp",
    inputType: "textarea",
    categoryGroup: "stakeholders",
    l4Sources: ["affected_populations"],
  },
  {
    id: "keyActors",
    layer: "comprehension",
    translationKey: "keyActors",
    helpTextKey: "keyActorsHelp",
    inputType: "bullets",
    categoryGroup: "stakeholders",
    l4Sources: ["key_actors"],
  },
  {
    id: "powerDynamics",
    layer: "comprehension",
    translationKey: "powerDynamics",
    helpTextKey: "powerDynamicsHelp",
    inputType: "textarea",
    categoryGroup: "stakeholders",
    l4Sources: ["power_dynamics"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Existing Efforts (4 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "unActions",
    layer: "comprehension",
    translationKey: "unActions",
    helpTextKey: "unActionsHelp",
    inputType: "bullets",
    categoryGroup: "existingEfforts",
    l4Sources: ["un_actions"],
  },
  {
    id: "regionalEfforts",
    layer: "comprehension",
    translationKey: "regionalEfforts",
    helpTextKey: "regionalEffortsHelp",
    inputType: "bullets",
    categoryGroup: "existingEfforts",
    l4Sources: ["regional_efforts"],
  },
  {
    id: "successStories",
    layer: "comprehension",
    translationKey: "successStories",
    helpTextKey: "successStoriesHelp",
    inputType: "bullets",
    categoryGroup: "existingEfforts",
    l4Sources: ["success_stories"],
  },
  {
    id: "failures",
    layer: "comprehension",
    translationKey: "failures",
    helpTextKey: "failuresHelp",
    inputType: "bullets",
    categoryGroup: "existingEfforts",
    l4Sources: ["failures"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Points of Contention (3 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "majorDebates",
    layer: "comprehension",
    translationKey: "majorDebates",
    helpTextKey: "majorDebatesHelp",
    inputType: "bullets",
    categoryGroup: "pointsOfContention",
    l4Sources: ["major_debates"],
  },
  {
    id: "competingInterests",
    layer: "comprehension",
    translationKey: "competingInterests",
    helpTextKey: "competingInterestsHelp",
    inputType: "textarea",
    categoryGroup: "pointsOfContention",
    l4Sources: ["competing_interests"],
  },
  {
    id: "barriers",
    layer: "comprehension",
    translationKey: "barriers",
    helpTextKey: "barriersHelp",
    inputType: "bullets",
    categoryGroup: "pointsOfContention",
    l4Sources: ["barriers"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Country-Specific Research (6 questions - includes country/committee/topic)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "country",
    layer: "comprehension",
    translationKey: "country",
    helpTextKey: "countryHelp",
    inputType: "text",
    required: true,
    categoryGroup: "countrySpecific",
  },
  {
    id: "committee",
    layer: "comprehension",
    translationKey: "committee",
    helpTextKey: "committeeHelp",
    inputType: "text",
    required: true,
    categoryGroup: "countrySpecific",
  },
  {
    id: "topic",
    layer: "comprehension",
    translationKey: "topic",
    helpTextKey: "topicHelp",
    inputType: "text",
    required: true,
    categoryGroup: "countrySpecific",
  },
  {
    id: "countryInvolvement",
    layer: "comprehension",
    translationKey: "countryInvolvement",
    helpTextKey: "countryInvolvementHelp",
    inputType: "textarea",
    categoryGroup: "countrySpecific",
    l4Sources: ["country_involvement"],
  },
  {
    id: "pastPositions",
    layer: "comprehension",
    translationKey: "pastPositions",
    helpTextKey: "pastPositionsHelp",
    inputType: "bullets",
    categoryGroup: "countrySpecific",
    l4Sources: ["past_positions"],
  },
  {
    id: "countryInterests",
    layer: "comprehension",
    translationKey: "countryInterests",
    helpTextKey: "countryInterestsHelp",
    inputType: "textarea",
    categoryGroup: "countrySpecific",
    l4Sources: ["country_interests"],
  },
  {
    id: "allies",
    layer: "comprehension",
    translationKey: "allies",
    helpTextKey: "alliesHelp",
    inputType: "bullets",
    categoryGroup: "countrySpecific",
    l4Sources: ["allies"],
  },
  {
    id: "constraints",
    layer: "comprehension",
    translationKey: "constraints",
    helpTextKey: "constraintsHelp",
    inputType: "bullets",
    categoryGroup: "countrySpecific",
    l4Sources: ["constraints"],
  },
];

// =============================================================================
// LAYER 3: IDEA FORMATION (Bridge layer - one per L2 section)
// =============================================================================

const IDEA_FORMATION_QUESTIONS: QuestionDefinition[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Introduction Ideas (5 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "ideaIntroSentence",
    layer: "ideaFormation",
    translationKey: "ideaIntroSentence",
    helpTextKey: "ideaIntroSentenceHelp",
    inputType: "textarea",
    paragraph: "intro",
    ideaGoal: "A hook that grabs attention and names the topic",
    combineFrom: "Topic Definition + a striking statistic or question",
    l4Sources: ["topic_definition", "key_statistics"],
  },
  {
    id: "ideaBroadContext",
    layer: "ideaFormation",
    translationKey: "ideaBroadContext",
    helpTextKey: "ideaBroadContextHelp",
    inputType: "textarea",
    paragraph: "intro",
    ideaGoal: "Why this matters: who's affected, how long it's been a problem, how widespread",
    combineFrom: "Affected Populations + Timeline + Current Situation",
    l4Sources: ["affected_populations", "timeline", "present_state"],
  },
  {
    id: "ideaAlternatePerspective",
    layer: "ideaFormation",
    translationKey: "ideaAlternatePerspective",
    helpTextKey: "ideaAlternatePerspectiveHelp",
    inputType: "textarea",
    paragraph: "intro",
    ideaGoal: "What opponents believe and why it's understandable",
    combineFrom: "Points of Contention + Competing Interests",
    l4Sources: ["major_debates", "competing_interests"],
  },
  {
    id: "ideaCallToAction",
    layer: "ideaFormation",
    translationKey: "ideaCallToAction",
    helpTextKey: "ideaCallToActionHelp",
    inputType: "textarea",
    paragraph: "intro",
    ideaGoal: "Why we must act now, not later",
    combineFrom: "Recent Developments + Barriers to Progress",
    l4Sources: ["recent_developments", "barriers"],
  },
  {
    id: "ideaThesis",
    layer: "ideaFormation",
    translationKey: "ideaThesis",
    helpTextKey: "ideaThesisHelp",
    inputType: "textarea",
    paragraph: "intro",
    ideaGoal: "Your country's main argument in one idea",
    combineFrom: "Country's Position + Country's Interests + hint at solution",
    l4Sources: ["past_positions", "country_interests", "success_stories"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Background Ideas (6 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "ideaBgIntro",
    layer: "ideaFormation",
    translationKey: "ideaBgIntro",
    helpTextKey: "ideaBgIntroHelp",
    inputType: "textarea",
    paragraph: "background",
    ideaGoal: "What background the reader needs to understand",
    combineFrom: "Topic Definition + Scope",
    l4Sources: ["topic_definition", "scope"],
  },
  {
    id: "ideaKeyFact1",
    layer: "ideaFormation",
    translationKey: "ideaKeyFact1",
    helpTextKey: "ideaKeyFact1Help",
    inputType: "textarea",
    paragraph: "background",
    ideaGoal: "One important fact that shows the problem's scale or severity",
    combineFrom: "Key Statistics OR Present State",
    l4Sources: ["key_statistics", "present_state"],
  },
  {
    id: "ideaAnalysis1",
    layer: "ideaFormation",
    translationKey: "ideaAnalysis1",
    helpTextKey: "ideaAnalysis1Help",
    inputType: "textarea",
    paragraph: "background",
    ideaGoal: "What that fact means—why should we care?",
    combineFrom: "Student's own reasoning",
    l4Sources: [],
  },
  {
    id: "ideaKeyFact2",
    layer: "ideaFormation",
    translationKey: "ideaKeyFact2",
    helpTextKey: "ideaKeyFact2Help",
    inputType: "textarea",
    paragraph: "background",
    ideaGoal: "A second fact that adds history or shows failed attempts",
    combineFrom: "Timeline OR Failures OR Existing Efforts",
    l4Sources: ["timeline", "failures", "un_actions"],
  },
  {
    id: "ideaAnalysis2",
    layer: "ideaFormation",
    translationKey: "ideaAnalysis2",
    helpTextKey: "ideaAnalysis2Help",
    inputType: "textarea",
    paragraph: "background",
    ideaGoal: "What that fact means—why should we care?",
    combineFrom: "Student's own reasoning",
    l4Sources: [],
  },
  {
    id: "ideaBgSummary",
    layer: "ideaFormation",
    translationKey: "ideaBgSummary",
    helpTextKey: "ideaBgSummaryHelp",
    inputType: "textarea",
    paragraph: "background",
    ideaGoal: "How these facts together prove action is needed",
    combineFrom: "Synthesis: Fact 1 + Fact 2 → therefore...",
    l4Sources: [],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Position Ideas (5 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "ideaPosIntro",
    layer: "ideaFormation",
    translationKey: "ideaPosIntro",
    helpTextKey: "ideaPosIntroHelp",
    inputType: "textarea",
    paragraph: "position",
    ideaGoal: "Signal that your country is now stating its view",
    combineFrom: "Transition phrase",
    l4Sources: [],
  },
  {
    id: "ideaPositionStatement",
    layer: "ideaFormation",
    translationKey: "ideaPositionStatement",
    helpTextKey: "ideaPositionStatementHelp",
    inputType: "textarea",
    paragraph: "position",
    ideaGoal: "What your country thinks should be done about this issue",
    combineFrom: "Country's Past Positions + Country's Interests",
    l4Sources: ["past_positions", "country_interests"],
  },
  {
    id: "ideaPosEvidence",
    layer: "ideaFormation",
    translationKey: "ideaPosEvidence",
    helpTextKey: "ideaPosEvidenceHelp",
    inputType: "textarea",
    paragraph: "position",
    ideaGoal: "A fact that backs up your country's stance",
    combineFrom: "UN Actions OR Success Stories OR Country's Involvement",
    l4Sources: ["un_actions", "success_stories", "country_involvement"],
  },
  {
    id: "ideaPosAnalysis",
    layer: "ideaFormation",
    translationKey: "ideaPosAnalysis",
    helpTextKey: "ideaPosAnalysisHelp",
    inputType: "textarea",
    paragraph: "position",
    ideaGoal: "Why this evidence supports your position",
    combineFrom: "Student's own reasoning",
    l4Sources: [],
  },
  {
    id: "ideaReasoning",
    layer: "ideaFormation",
    translationKey: "ideaReasoning",
    helpTextKey: "ideaReasoningHelp",
    inputType: "textarea",
    paragraph: "position",
    ideaGoal: "How this connects to your country's values or interests",
    combineFrom: "Country's Interests + Country's Allies",
    l4Sources: ["country_interests", "allies"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Solutions Ideas (5 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "ideaSolIntro",
    layer: "ideaFormation",
    translationKey: "ideaSolIntro",
    helpTextKey: "ideaSolIntroHelp",
    inputType: "textarea",
    paragraph: "solutions",
    ideaGoal: "Shift from 'what we believe' to 'what we should do'",
    combineFrom: "Transition phrase",
    l4Sources: [],
  },
  {
    id: "ideaSolutionProposal",
    layer: "ideaFormation",
    translationKey: "ideaSolutionProposal",
    helpTextKey: "ideaSolutionProposalHelp",
    inputType: "textarea",
    paragraph: "solutions",
    ideaGoal: "A specific action the international community should take",
    combineFrom: "Success Stories + Country's Interests + Existing Efforts",
    l4Sources: ["success_stories", "country_interests", "un_actions", "regional_efforts"],
  },
  {
    id: "ideaSolEvidence",
    layer: "ideaFormation",
    translationKey: "ideaSolEvidence",
    helpTextKey: "ideaSolEvidenceHelp",
    inputType: "textarea",
    paragraph: "solutions",
    ideaGoal: "Proof that similar solutions have worked before",
    combineFrom: "Success Stories OR Regional Efforts",
    l4Sources: ["success_stories", "regional_efforts"],
  },
  {
    id: "ideaConnectionToSolution",
    layer: "ideaFormation",
    translationKey: "ideaConnectionToSolution",
    helpTextKey: "ideaConnectionToSolutionHelp",
    inputType: "textarea",
    paragraph: "solutions",
    ideaGoal: "Why the evidence shows your solution is realistic",
    combineFrom: "Student's own reasoning",
    l4Sources: [],
  },
  {
    id: "ideaAlternateSolution",
    layer: "ideaFormation",
    translationKey: "ideaAlternateSolution",
    helpTextKey: "ideaAlternateSolutionHelp",
    inputType: "textarea",
    paragraph: "solutions",
    ideaGoal: "A second approach or fallback option",
    combineFrom: "UN Actions OR Regional Efforts",
    l4Sources: ["un_actions", "regional_efforts"],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Conclusion Ideas (3 questions)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "ideaSummaryEvidence",
    layer: "ideaFormation",
    translationKey: "ideaSummaryEvidence",
    helpTextKey: "ideaSummaryEvidenceHelp",
    inputType: "textarea",
    paragraph: "conclusion",
    ideaGoal: "The 2-3 facts that most strongly support your case",
    combineFrom: "Selected from earlier paragraphs",
    l4Sources: [],
  },
  {
    id: "ideaSummaryPosition",
    layer: "ideaFormation",
    translationKey: "ideaSummaryPosition",
    helpTextKey: "ideaSummaryPositionHelp",
    inputType: "textarea",
    paragraph: "conclusion",
    ideaGoal: "Your country's stance in simple terms",
    combineFrom: "Restated from Position Paragraph",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaPositionStatement",
      transform: "direct",
    },
  },
  {
    id: "ideaSummarySolution",
    layer: "ideaFormation",
    translationKey: "ideaSummarySolution",
    helpTextKey: "ideaSummarySolutionHelp",
    inputType: "textarea",
    paragraph: "conclusion",
    ideaGoal: "What should happen next",
    combineFrom: "Restated from Solutions Paragraph",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaSolutionProposal",
      transform: "direct",
    },
  },
];

// =============================================================================
// LAYER 2: PARAGRAPH COMPONENTS (24 polished sentences)
// =============================================================================

const PARAGRAPH_COMPONENT_QUESTIONS: QuestionDefinition[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Introduction Paragraph (5 sections)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "introSentence",
    layer: "paragraphComponents",
    translationKey: "introSentence",
    helpTextKey: "introSentenceHelp",
    inputType: "textarea",
    paragraph: "intro",
    l4Sources: ["topic_definition", "key_statistics"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaIntroSentence",
      transform: "direct",
    },
  },
  {
    id: "broadContext",
    layer: "paragraphComponents",
    translationKey: "broadContext",
    helpTextKey: "broadContextHelp",
    inputType: "textarea",
    paragraph: "intro",
    l4Sources: ["affected_populations", "timeline", "present_state"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaBroadContext",
      transform: "direct",
    },
  },
  {
    id: "alternatePerspective",
    layer: "paragraphComponents",
    translationKey: "alternatePerspective",
    helpTextKey: "alternatePerspectiveHelp",
    inputType: "textarea",
    paragraph: "intro",
    l4Sources: ["major_debates", "competing_interests"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaAlternatePerspective",
      transform: "direct",
    },
  },
  {
    id: "callToAction",
    layer: "paragraphComponents",
    translationKey: "callToAction",
    helpTextKey: "callToActionHelp",
    inputType: "textarea",
    paragraph: "intro",
    l4Sources: ["recent_developments", "barriers"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaCallToAction",
      transform: "direct",
    },
  },
  {
    id: "thesis",
    layer: "paragraphComponents",
    translationKey: "thesis",
    helpTextKey: "thesisHelp",
    inputType: "textarea",
    paragraph: "intro",
    l4Sources: ["past_positions", "country_interests"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaThesis",
      transform: "direct",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Background Paragraph (6 sections)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "bgIntroSentence",
    layer: "paragraphComponents",
    translationKey: "bgIntroSentence",
    helpTextKey: "bgIntroSentenceHelp",
    inputType: "textarea",
    paragraph: "background",
    l4Sources: ["topic_definition", "scope"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaBgIntro",
      transform: "direct",
    },
  },
  {
    id: "keyFact1",
    layer: "paragraphComponents",
    translationKey: "keyFact1",
    helpTextKey: "keyFact1Help",
    inputType: "textarea",
    paragraph: "background",
    l4Sources: ["key_statistics", "present_state"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaKeyFact1",
      transform: "direct",
    },
  },
  {
    id: "analysis1",
    layer: "paragraphComponents",
    translationKey: "analysis1",
    helpTextKey: "analysis1Help",
    inputType: "textarea",
    paragraph: "background",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaAnalysis1",
      transform: "direct",
    },
  },
  {
    id: "keyFact2",
    layer: "paragraphComponents",
    translationKey: "keyFact2",
    helpTextKey: "keyFact2Help",
    inputType: "textarea",
    paragraph: "background",
    l4Sources: ["timeline", "failures", "un_actions"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaKeyFact2",
      transform: "direct",
    },
  },
  {
    id: "analysis2",
    layer: "paragraphComponents",
    translationKey: "analysis2",
    helpTextKey: "analysis2Help",
    inputType: "textarea",
    paragraph: "background",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaAnalysis2",
      transform: "direct",
    },
  },
  {
    id: "bgSummary",
    layer: "paragraphComponents",
    translationKey: "bgSummary",
    helpTextKey: "bgSummaryHelp",
    inputType: "textarea",
    paragraph: "background",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaBgSummary",
      transform: "direct",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Position Paragraph (5 sections)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "posIntroSentence",
    layer: "paragraphComponents",
    translationKey: "posIntroSentence",
    helpTextKey: "posIntroSentenceHelp",
    inputType: "textarea",
    paragraph: "position",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaPosIntro",
      transform: "direct",
    },
  },
  {
    id: "positionStatement",
    layer: "paragraphComponents",
    translationKey: "positionStatement",
    helpTextKey: "positionStatementHelp",
    inputType: "textarea",
    paragraph: "position",
    l4Sources: ["past_positions", "country_interests"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaPositionStatement",
      transform: "direct",
    },
  },
  {
    id: "posEvidence",
    layer: "paragraphComponents",
    translationKey: "posEvidence",
    helpTextKey: "posEvidenceHelp",
    inputType: "textarea",
    paragraph: "position",
    l4Sources: ["un_actions", "success_stories", "country_involvement"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaPosEvidence",
      transform: "direct",
    },
  },
  {
    id: "posAnalysis",
    layer: "paragraphComponents",
    translationKey: "posAnalysis",
    helpTextKey: "posAnalysisHelp",
    inputType: "textarea",
    paragraph: "position",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaPosAnalysis",
      transform: "direct",
    },
  },
  {
    id: "reasoning",
    layer: "paragraphComponents",
    translationKey: "reasoning",
    helpTextKey: "reasoningHelp",
    inputType: "textarea",
    paragraph: "position",
    l4Sources: ["country_interests", "allies"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaReasoning",
      transform: "direct",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Solutions Paragraph (5 sections)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "solIntroSentence",
    layer: "paragraphComponents",
    translationKey: "solIntroSentence",
    helpTextKey: "solIntroSentenceHelp",
    inputType: "textarea",
    paragraph: "solutions",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaSolIntro",
      transform: "direct",
    },
  },
  {
    id: "solutionProposal",
    layer: "paragraphComponents",
    translationKey: "solutionProposal",
    helpTextKey: "solutionProposalHelp",
    inputType: "textarea",
    paragraph: "solutions",
    l4Sources: ["success_stories", "country_interests", "un_actions", "regional_efforts"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaSolutionProposal",
      transform: "direct",
    },
  },
  {
    id: "solEvidence",
    layer: "paragraphComponents",
    translationKey: "solEvidence",
    helpTextKey: "solEvidenceHelp",
    inputType: "textarea",
    paragraph: "solutions",
    l4Sources: ["success_stories", "regional_efforts"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaSolEvidence",
      transform: "direct",
    },
  },
  {
    id: "connectionToSolution",
    layer: "paragraphComponents",
    translationKey: "connectionToSolution",
    helpTextKey: "connectionToSolutionHelp",
    inputType: "textarea",
    paragraph: "solutions",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaConnectionToSolution",
      transform: "direct",
    },
  },
  {
    id: "alternateSolution",
    layer: "paragraphComponents",
    translationKey: "alternateSolution",
    helpTextKey: "alternateSolutionHelp",
    inputType: "textarea",
    paragraph: "solutions",
    l4Sources: ["un_actions", "regional_efforts"],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaAlternateSolution",
      transform: "direct",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Conclusion Paragraph (3 sections)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "summaryEvidence",
    layer: "paragraphComponents",
    translationKey: "summaryEvidence",
    helpTextKey: "summaryEvidenceHelp",
    inputType: "textarea",
    paragraph: "conclusion",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaSummaryEvidence",
      transform: "direct",
    },
  },
  {
    id: "summaryPosition",
    layer: "paragraphComponents",
    translationKey: "summaryPosition",
    helpTextKey: "summaryPositionHelp",
    inputType: "textarea",
    paragraph: "conclusion",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaSummaryPosition",
      transform: "direct",
    },
  },
  {
    id: "summarySolution",
    layer: "paragraphComponents",
    translationKey: "summarySolution",
    helpTextKey: "summarySolutionHelp",
    inputType: "textarea",
    paragraph: "conclusion",
    l4Sources: [],
    autoPopulateFrom: {
      layer: "ideaFormation",
      questionId: "ideaSummarySolution",
      transform: "direct",
    },
  },
];

// =============================================================================
// ALL QUESTIONS COMBINED
// =============================================================================

export const ALL_QUESTIONS: QuestionDefinition[] = [
  ...COMPREHENSION_QUESTIONS,
  ...IDEA_FORMATION_QUESTIONS,
  ...PARAGRAPH_COMPONENT_QUESTIONS,
];

// Legacy export for compatibility during transition
export const QUESTIONS = ALL_QUESTIONS;

// =============================================================================
// TYPED QUESTION EXPORTS (for components that need specific types)
// =============================================================================

export type ComprehensionQuestion = QuestionDefinition;
export type IdeaFormationQuestion = QuestionDefinition;
export type ParagraphComponentQuestion = QuestionDefinition;

// =============================================================================
// PARAGRAPH CONSTANTS
// =============================================================================

export const PARAGRAPH_ORDER: ParagraphType[] = [
  "intro",
  "background",
  "position",
  "solutions",
  "conclusion",
];

export const PARAGRAPH_LABELS: Record<ParagraphType, string> = {
  intro: "Introduction",
  background: "Background",
  position: "Position",
  solutions: "Solutions",
  conclusion: "Conclusion",
};

// =============================================================================
// GROUPED QUESTIONS BY PARAGRAPH
// =============================================================================

export const IDEA_FORMATION_BY_PARAGRAPH: Record<ParagraphType, QuestionDefinition[]> = {
  intro: IDEA_FORMATION_QUESTIONS.filter((q) => q.paragraph === "intro"),
  background: IDEA_FORMATION_QUESTIONS.filter((q) => q.paragraph === "background"),
  position: IDEA_FORMATION_QUESTIONS.filter((q) => q.paragraph === "position"),
  solutions: IDEA_FORMATION_QUESTIONS.filter((q) => q.paragraph === "solutions"),
  conclusion: IDEA_FORMATION_QUESTIONS.filter((q) => q.paragraph === "conclusion"),
};

export const PARAGRAPH_COMPONENTS_BY_PARAGRAPH: Record<ParagraphType, QuestionDefinition[]> = {
  intro: PARAGRAPH_COMPONENT_QUESTIONS.filter((q) => q.paragraph === "intro"),
  background: PARAGRAPH_COMPONENT_QUESTIONS.filter((q) => q.paragraph === "background"),
  position: PARAGRAPH_COMPONENT_QUESTIONS.filter((q) => q.paragraph === "position"),
  solutions: PARAGRAPH_COMPONENT_QUESTIONS.filter((q) => q.paragraph === "solutions"),
  conclusion: PARAGRAPH_COMPONENT_QUESTIONS.filter((q) => q.paragraph === "conclusion"),
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all questions for a specific layer
 */
export function getQuestionsForLayer(layer: LayerType): QuestionDefinition[] {
  return ALL_QUESTIONS.filter((q) => q.layer === layer);
}

/**
 * Get questions for a specific paragraph within a layer
 */
export function getQuestionsForParagraph(
  layer: LayerType,
  paragraph: ParagraphType
): QuestionDefinition[] {
  return ALL_QUESTIONS.filter((q) => q.layer === layer && q.paragraph === paragraph);
}

/**
 * Get questions by category group (for comprehension layer)
 */
export function getQuestionsByCategoryGroup(categoryGroup: string): QuestionDefinition[] {
  return COMPREHENSION_QUESTIONS.filter((q) => q.categoryGroup === categoryGroup);
}

/**
 * Get a single question by ID
 */
export function getQuestionById(id: string): QuestionDefinition | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

/**
 * Get the L4 sources for a question (bookmark categories that are relevant)
 */
export function getL4SourcesForQuestion(questionId: string): BookmarkCategory[] {
  const question = getQuestionById(questionId);
  return question?.l4Sources || [];
}

// =============================================================================
// CATEGORY GROUPS FOR COMPREHENSION LAYER
// =============================================================================

export const COMPREHENSION_CATEGORY_GROUPS = [
  {
    id: "countrySpecific",
    translationKey: "categoryCountrySpecific",
    questions: ["country", "committee", "topic", "countryInvolvement", "pastPositions", "countryInterests", "allies", "constraints"],
  },
  {
    id: "topicFundamentals",
    translationKey: "categoryTopicFundamentals",
    questions: ["topicDefinition", "keyTerms", "scope"],
  },
  {
    id: "historicalContext",
    translationKey: "categoryHistoricalContext",
    questions: ["origin", "timeline", "evolution"],
  },
  {
    id: "currentSituation",
    translationKey: "categoryCurrentSituation",
    questions: ["presentState", "keyStatistics", "recentDevelopments"],
  },
  {
    id: "stakeholders",
    translationKey: "categoryStakeholders",
    questions: ["affectedPopulations", "keyActors", "powerDynamics"],
  },
  {
    id: "existingEfforts",
    translationKey: "categoryExistingEfforts",
    questions: ["unActions", "regionalEfforts", "successStories", "failures"],
  },
  {
    id: "pointsOfContention",
    translationKey: "categoryPointsOfContention",
    questions: ["majorDebates", "competingInterests", "barriers"],
  },
];

// =============================================================================
// TRANSFORM FUNCTIONS
// =============================================================================

/**
 * Convert bullet points to flowing text
 */
export function bulletsToText(bullets: string): string {
  if (!bullets) return "";

  const lines = bullets
    .split("\n")
    .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return "";

  // Join with periods and ensure proper spacing
  return lines
    .map((line) => {
      // Add period if doesn't end with punctuation
      if (!/[.!?]$/.test(line)) {
        return line + ".";
      }
      return line;
    })
    .join(" ");
}

/**
 * Convert text to bullet points
 */
export function textToBullets(text: string): string {
  if (!text) return "";

  // Split by sentences or existing bullets
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return sentences.map((s) => `• ${s}`).join("\n");
}

/**
 * Combine multiple text fields into one
 */
export function combineSentences(texts: string[]): string {
  const nonEmpty = texts.filter((t) => t && t.trim());
  if (nonEmpty.length === 0) return "";

  return nonEmpty
    .map((t) => {
      const trimmed = t.trim();
      if (!/[.!?]$/.test(trimmed)) {
        return trimmed + ".";
      }
      return trimmed;
    })
    .join(" ");
}

/**
 * Combine solutions into a structured list
 */
export function combineSolutions(solutions: string[], country?: string): string {
  const nonEmpty = solutions.filter((s) => s && s.trim());
  if (nonEmpty.length === 0) return "";

  const ordinals = ["First", "Second", "Third", "Fourth", "Fifth"];
  const countryPrefix = country ? `${country} proposes the following solutions: ` : "";

  const formatted = nonEmpty
    .map((s, i) => {
      const ordinal = ordinals[i] || `${i + 1}.`;
      const trimmed = s.trim();
      // Remove trailing punctuation for consistency
      const cleanText = trimmed.replace(/[.!?]+$/, "");
      return `${ordinal}, ${cleanText}`;
    })
    .join(". ");

  return countryPrefix + formatted + ".";
}

/**
 * Apply a transform to a value
 */
export function applyTransform(
  value: string,
  transform: string | undefined,
  additionalValues?: string[],
  country?: string
): string {
  if (!transform || transform === "direct") {
    return value;
  }

  switch (transform) {
    case "bullets-to-text":
      return bulletsToText(value);
    case "text-to-bullets":
      return textToBullets(value);
    case "combine-sentences":
      return combineSentences([value, ...(additionalValues || [])]);
    case "combine-solutions":
      return combineSolutions([value, ...(additionalValues || [])], country);
    default:
      return value;
  }
}

// =============================================================================
// AUTO-POPULATE HELPERS
// =============================================================================

export type DraftAccessor = (layer: LayerType, questionId: string) => string;

/**
 * Recursively get the effective value for a question, following auto-populate chains
 */
export function getEffectiveValueRecursive(
  questionId: string,
  accessor: DraftAccessor,
  visited: Set<string> = new Set()
): string {
  // Prevent infinite loops
  if (visited.has(questionId)) {
    console.warn(`[Questions] Circular auto-populate detected for ${questionId}`);
    return "";
  }
  visited.add(questionId);

  const question = getQuestionById(questionId);
  if (!question) return "";

  // First check if user has entered a value
  const userValue = accessor(question.layer, questionId);
  if (userValue && userValue.trim()) {
    return userValue;
  }

  // If no user value, check for auto-populate
  if (question.autoPopulateFrom) {
    const { questionId: sourceId, transform } = question.autoPopulateFrom;

    // Handle multiple source IDs (comma-separated)
    if (sourceId.includes(",")) {
      const sourceIds = sourceId.split(",").map((id) => id.trim());
      const values = sourceIds.map((id) => getEffectiveValueRecursive(id, accessor, new Set(visited)));
      return applyTransform(values[0], transform, values.slice(1));
    }

    // Single source
    const sourceValue = getEffectiveValueRecursive(sourceId, accessor, new Set(visited));
    return applyTransform(sourceValue, transform);
  }

  return "";
}

/**
 * Create a draft accessor function
 */
export function createDraftAccessor(draft: BGWriterDraft): DraftAccessor {
  return (layer: LayerType, questionId: string) => {
    if (layer === "finalPaper") {
      return draft.layers.finalPaper;
    }
    return draft.layers[layer]?.[questionId] || "";
  };
}

/**
 * Get the effective value for a question from a draft
 */
export function getEffectiveValue(draft: BGWriterDraft, questionId: string): string {
  const accessor = createDraftAccessor(draft);
  return getEffectiveValueRecursive(questionId, accessor);
}

// =============================================================================
// LAYER COMPLETION HELPERS
// =============================================================================

/**
 * Calculate completion percentage for a layer
 */
export function getLayerCompletion(layer: LayerType, draft: BGWriterDraft): number {
  if (layer === "finalPaper") {
    // Final paper is complete if it has content
    return draft.layers.finalPaper?.trim() ? 100 : 0;
  }

  const questions = getQuestionsForLayer(layer);
  if (questions.length === 0) return 0;

  const answered = questions.filter((q) => {
    const value = draft.layers[layer]?.[q.id];
    return value && value.trim().length > 0;
  }).length;

  return Math.round((answered / questions.length) * 100);
}

/**
 * Get count of questions that can be auto-filled for a layer
 */
export function getAutofillableCount(layer: LayerType, draft: BGWriterDraft): number {
  const questions = getQuestionsForLayer(layer);

  return questions.filter((q) => {
    // Skip if already has value
    const layerData = draft.layers[layer];
    const currentValue = typeof layerData === "string" ? layerData : layerData?.[q.id];
    if (currentValue && currentValue.trim()) return false;

    // Check if has auto-populate source
    if (!q.autoPopulateFrom) return false;

    // Check if source has value
    const accessor = createDraftAccessor(draft);
    const sourceValue = getEffectiveValueRecursive(q.autoPopulateFrom.questionId, accessor);
    return sourceValue && sourceValue.trim().length > 0;
  }).length;
}
