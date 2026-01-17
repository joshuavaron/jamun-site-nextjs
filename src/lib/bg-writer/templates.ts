/**
 * Position Paper Template Generator
 *
 * Generates the final draft template by directly assembling
 * the structured paragraphs from Layer 3.
 *
 * IMPORTANT: This template uses "effective values" which means:
 * - If the user has typed content, use that
 * - Otherwise, compute the auto-populated value from earlier layers
 *   by recursively following the entire auto-populate chain
 */

import type { BGWriterDraft } from "./types";
import { getQuestionById, getEffectiveValueRecursive } from "./questions";

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
 * Create a layer data accessor for a draft
 * This allows the recursive function to access draft data
 */
function createDraftAccessor(draft: BGWriterDraft) {
  return {
    getDirectValue: (questionId: string) => {
      const question = getQuestionById(questionId);
      if (!question) return "";
      const layer = question.layer;
      if (layer === "finalDraft") return draft.layers.finalDraft;
      return draft.layers[layer][questionId] || "";
    },
    country: draft.country || "Our delegation",
  };
}


/**
 * Generate position paper template from draft data
 *
 * This version directly uses the structured fields from Layer 3,
 * making the final draft nearly complete if all sections are filled.
 */
export function generatePositionPaperTemplate(
  draft: BGWriterDraft,
  t: TranslateFunction
): string {
  const { country, committee, topic, layers } = draft;
  const { initialContent } = layers;

  // Create accessor for recursive value lookup
  const accessor = createDraftAccessor(draft);

  // Helper to get effective value (user input or recursively computed auto-populated)
  const getValue = (questionId: string) => getEffectiveValueRecursive(questionId, accessor);

  const sections: string[] = [];

  // Header
  sections.push(`# ${t("finalDraftTemplate.title", { country: country || "[Country]" })}`);
  sections.push("");
  sections.push(`**${t("finalDraftTemplate.committeeLabel")}:** ${committee || "[Committee]"}`);
  sections.push(`**${t("finalDraftTemplate.topicLabel")}:** ${topic || "[Topic]"}`);
  sections.push("");
  sections.push("---");
  sections.push("");

  // Introduction - Build from Layer 3 (with auto-population from Layer 2)
  sections.push(`## ${t("finalDraftTemplate.introduction")}`);
  sections.push("");

  const introParagraph = combineToParagraph(
    getValue("introTopicSentence"),
    getValue("introContext"),
    getValue("introThesis"),
    getValue("introPreview")
  );

  if (introParagraph) {
    sections.push(introParagraph);
  } else {
    // Fallback to Layer 2 building blocks directly
    const fallback = combineToParagraph(
      initialContent.hookSentence,
      initialContent.topicImportance,
      initialContent.thesisStatement
    );
    sections.push(fallback || `[${t("finalDraftTemplate.introPlaceholder")}]`);
  }
  sections.push("");

  // Background - Build from Layer 3 (with auto-population)
  sections.push(`## ${t("finalDraftTemplate.background")}`);
  sections.push("");

  const bgParagraph = combineToParagraph(
    getValue("bgTopicSentence"),
    getValue("bgEvidence"),
    getValue("bgAnalysis"),
    getValue("bgTransition")
  );

  if (bgParagraph) {
    sections.push(bgParagraph);
  } else {
    // Fallback to Layer 2 building blocks directly
    const fallback = combineToParagraph(
      initialContent.backgroundContext,
      initialContent.keyEventsDescription,
      initialContent.currentSituation
    );
    sections.push(fallback || `[${t("finalDraftTemplate.backgroundPlaceholder")}]`);
  }
  sections.push("");

  // Country Position - Build from Layer 3 (with auto-population)
  sections.push(`## ${t("finalDraftTemplate.position")}`);
  sections.push("");

  const posParagraph = combineToParagraph(
    getValue("posTopicSentence"),
    getValue("posEvidence"),
    getValue("posAnalysis")
  );

  if (posParagraph) {
    sections.push(posParagraph);
  } else {
    // Fallback to Layer 2 building blocks directly
    const fallback = combineToParagraph(
      initialContent.positionStatement,
      initialContent.positionReason1,
      initialContent.positionReason2,
      initialContent.pastActions
    );
    sections.push(fallback || `[${t("finalDraftTemplate.positionPlaceholder")}]`);
  }
  sections.push("");

  // Counterargument section (if provided - these don't have auto-population)
  const counterargument = getValue("posCounterargument");
  const rebuttal = getValue("posRebuttal");
  if (counterargument || rebuttal) {
    sections.push(`### ${t("finalDraftTemplate.counterarguments")}`);
    sections.push("");
    const counterParagraph = combineToParagraph(counterargument, rebuttal);
    sections.push(counterParagraph);
    sections.push("");
  }

  // Proposed Solutions - Build from Layer 3 (with auto-population)
  sections.push(`## ${t("finalDraftTemplate.solutions")}`);
  sections.push("");

  const solParagraph = combineToParagraph(
    getValue("solTopicSentence"),
    getValue("solSolution1Full"),
    getValue("solSolution2Full"),
    getValue("solSolution3Full"),
    getValue("solImplementation")
  );

  if (solParagraph) {
    sections.push(solParagraph);
  } else {
    // Fallback to Layer 2 building blocks directly
    const solutions = [
      initialContent.solution1,
      initialContent.solution2,
      initialContent.solution3,
    ].filter(Boolean);

    if (solutions.length > 0) {
      sections.push(`${country || "Our delegation"} proposes the following solutions to address this issue.`);
      solutions.forEach((sol, i) => {
        if (sol) {
          const prefix = i === 0 ? "First" : i === 1 ? "Second" : "Third";
          const sentence = sol.trim();
          const lowercased = sentence.charAt(0).toLowerCase() + sentence.slice(1);
          sections.push(`${prefix}, ${lowercased}${sentence.endsWith(".") ? "" : "."}`);
        }
      });
    } else {
      sections.push(`[${t("finalDraftTemplate.solutionsPlaceholder")}]`);
    }
  }
  sections.push("");

  // Conclusion - Build from Layer 3 (with auto-population)
  sections.push(`## ${t("finalDraftTemplate.conclusion")}`);
  sections.push("");

  const conParagraph = combineToParagraph(
    getValue("conRestatement"),
    getValue("conSummary"),
    getValue("conCallToAction")
  );

  if (conParagraph) {
    sections.push(conParagraph);
  } else if (initialContent.thesisStatement) {
    // Generate a conclusion from the thesis
    sections.push(
      `In conclusion, ${country || "[Country]"} remains committed to working with the international community to address ${topic || "this issue"}. ${ensurePeriod(initialContent.thesisStatement)} ${country || "Our delegation"} looks forward to collaborating with fellow member states to develop effective and lasting solutions.`
    );
  } else {
    sections.push(`[${t("finalDraftTemplate.conclusionPlaceholder")}]`);
  }
  sections.push("");

  // Footer
  sections.push("---");
  sections.push("");
  sections.push(`*${t("finalDraftTemplate.footer", { country: country || "[Country]" })}*`);

  return sections.join("\n");
}
