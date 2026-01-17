/**
 * Position Paper Template Generator
 *
 * Version 2 - Generates the final draft by assembling the 24 polished
 * sections from Layer 2 (paragraphComponents) into a 5-paragraph paper.
 *
 * Per PP-Writer.md:
 * - Intro (5 sections): hook, context, alternate perspective, call to action, thesis
 * - Background (6 sections): intro sentence, fact1, analysis1, fact2, analysis2, summary
 * - Position (5 sections): intro sentence, statement, evidence, analysis, reasoning
 * - Solutions (5 sections): intro sentence, proposal, evidence, connection, alternate
 * - Conclusion (3 sections): summary of evidence, position, solution
 */

import type { BGWriterDraft } from "./types";

type TranslateFunction = (key: string, values?: Record<string, string | number>) => string;

/**
 * Helper to ensure sentence ends with punctuation
 */
function ensurePeriod(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (trimmed.endsWith(".") || trimmed.endsWith("!") || trimmed.endsWith("?")) {
    return trimmed;
  }
  return trimmed + ".";
}

/**
 * Helper to combine multiple fields into a paragraph
 */
function combineToParagraph(...texts: (string | undefined)[]): string {
  return texts
    .filter((t): t is string => !!t && !!t.trim())
    .map((t) => ensurePeriod(t))
    .join(" ");
}

/**
 * Generate position paper template from draft data
 *
 * Assembles the 5-paragraph paper from Layer 2 (paragraphComponents):
 * - Introduction paragraph
 * - Background paragraph
 * - Position paragraph
 * - Solutions paragraph
 * - Conclusion paragraph
 */
export function generatePositionPaperTemplate(
  draft: BGWriterDraft,
  t: TranslateFunction
): string {
  const { country, committee, topic, layers } = draft;
  const { paragraphComponents } = layers;

  // Helper to get direct L2 value
  const getL2 = (key: string) => paragraphComponents[key] || "";

  const sections: string[] = [];

  // Header
  sections.push(`# ${t("finalDraftTemplate.title", { country: country || "[Country]" })}`);
  sections.push("");
  sections.push(`**${t("finalDraftTemplate.committeeLabel")}:** ${committee || "[Committee]"}`);
  sections.push(`**${t("finalDraftTemplate.topicLabel")}:** ${topic || "[Topic]"}`);
  sections.push("");
  sections.push("---");
  sections.push("");

  // =========================================================================
  // INTRODUCTION PARAGRAPH
  // =========================================================================
  sections.push(`## ${t("finalDraftTemplate.introduction")}`);
  sections.push("");

  const introParagraph = combineToParagraph(
    getL2("introSentence"),       // Hook sentence
    getL2("broadContext"),        // Broad context
    getL2("alternatePerspective"),// Alternate perspective
    getL2("callToAction"),        // Call to action
    getL2("thesis")               // Thesis statement
  );

  if (introParagraph) {
    sections.push(introParagraph);
  } else {
    sections.push(`[${t("finalDraftTemplate.introPlaceholder")}]`);
  }
  sections.push("");

  // =========================================================================
  // BACKGROUND PARAGRAPH
  // =========================================================================
  sections.push(`## ${t("finalDraftTemplate.background")}`);
  sections.push("");

  const bgParagraph = combineToParagraph(
    getL2("bgIntroSentence"),    // Background intro sentence
    getL2("keyFact1"),           // Key fact 1
    getL2("analysis1"),          // Analysis of fact 1
    getL2("keyFact2"),           // Key fact 2
    getL2("analysis2"),          // Analysis of fact 2
    getL2("bgSummary")           // Background summary
  );

  if (bgParagraph) {
    sections.push(bgParagraph);
  } else {
    sections.push(`[${t("finalDraftTemplate.backgroundPlaceholder")}]`);
  }
  sections.push("");

  // =========================================================================
  // POSITION PARAGRAPH
  // =========================================================================
  sections.push(`## ${t("finalDraftTemplate.position")}`);
  sections.push("");

  const posParagraph = combineToParagraph(
    getL2("posIntroSentence"),   // Position intro sentence
    getL2("positionStatement"),  // Position statement
    getL2("posEvidence"),        // Position evidence
    getL2("posAnalysis"),        // Position analysis
    getL2("reasoning")           // Reasoning
  );

  if (posParagraph) {
    sections.push(posParagraph);
  } else {
    sections.push(`[${t("finalDraftTemplate.positionPlaceholder")}]`);
  }
  sections.push("");

  // =========================================================================
  // SOLUTIONS PARAGRAPH
  // =========================================================================
  sections.push(`## ${t("finalDraftTemplate.solutions")}`);
  sections.push("");

  const solParagraph = combineToParagraph(
    getL2("solIntroSentence"),      // Solutions intro sentence
    getL2("solutionProposal"),      // Main solution proposal
    getL2("solEvidence"),           // Solution evidence
    getL2("connectionToSolution"),  // Connection to solution
    getL2("alternateSolution")      // Alternate solution
  );

  if (solParagraph) {
    sections.push(solParagraph);
  } else {
    sections.push(`[${t("finalDraftTemplate.solutionsPlaceholder")}]`);
  }
  sections.push("");

  // =========================================================================
  // CONCLUSION PARAGRAPH
  // =========================================================================
  sections.push(`## ${t("finalDraftTemplate.conclusion")}`);
  sections.push("");

  const conParagraph = combineToParagraph(
    getL2("summaryEvidence"),    // Summary of evidence
    getL2("summaryPosition"),    // Summary of position
    getL2("summarySolution")     // Summary of solution
  );

  if (conParagraph) {
    sections.push(conParagraph);
  } else {
    // Generate a basic conclusion if nothing is filled
    sections.push(`[${t("finalDraftTemplate.conclusionPlaceholder")}]`);
  }
  sections.push("");

  // =========================================================================
  // FOOTER
  // =========================================================================
  sections.push("---");
  sections.push("");
  sections.push(`*${t("finalDraftTemplate.footer", { country: country || "[Country]" })}*`);

  return sections.join("\n");
}

/**
 * Generate a preview of a specific paragraph
 */
export function generateParagraphPreview(
  draft: BGWriterDraft,
  paragraph: "intro" | "background" | "position" | "solutions" | "conclusion"
): string {
  const { paragraphComponents } = draft.layers;

  const getL2 = (key: string) => paragraphComponents[key] || "";

  switch (paragraph) {
    case "intro":
      return combineToParagraph(
        getL2("introSentence"),
        getL2("broadContext"),
        getL2("alternatePerspective"),
        getL2("callToAction"),
        getL2("thesis")
      );
    case "background":
      return combineToParagraph(
        getL2("bgIntroSentence"),
        getL2("keyFact1"),
        getL2("analysis1"),
        getL2("keyFact2"),
        getL2("analysis2"),
        getL2("bgSummary")
      );
    case "position":
      return combineToParagraph(
        getL2("posIntroSentence"),
        getL2("positionStatement"),
        getL2("posEvidence"),
        getL2("posAnalysis"),
        getL2("reasoning")
      );
    case "solutions":
      return combineToParagraph(
        getL2("solIntroSentence"),
        getL2("solutionProposal"),
        getL2("solEvidence"),
        getL2("connectionToSolution"),
        getL2("alternateSolution")
      );
    case "conclusion":
      return combineToParagraph(
        getL2("summaryEvidence"),
        getL2("summaryPosition"),
        getL2("summarySolution")
      );
    default:
      return "";
  }
}
