# Position Paper Writer - Audit Issues

## 1. UI Consistency Issues

### Progress Indicators (Inconsistent across pages)
- **Page 1:** The `_/_` counter turns green when section is complete ✓
- **Page 2:** Nothing changes, stays grey ✗
- **Page 3:** The `_/_` turns green AND shows a check mark ✓✓

**Expected:** All pages should have the same completion indicator behavior.

---

## 2. Progress/Completion Bugs

### 99% Completion Bug
- Shows "99% completed" even when everything is done
- This prevents saving the document
- "In Progress" text is positioned incorrectly

---

## 3. Bookmark System Issues

### Subsection Bookmarking
- **Bug:** Bookmarking a subsection (e.g., "Digital Sovereignty and Decentralization" under Possible Solutions) bookmarks the entire parent section instead
- **Expected:** Only the specific subsection should be bookmarked

### Import Bookmarks - Unclear Source
- When importing bookmarks, only shows: "X bookmarked sections"
- **Problem:** No indication of which Background Guide the sections come from
- **Question:** What happens with multiple BGs that have the same number of bookmarked sections?

### Stale Research References
- After replacing bookmarks from one BG with a different BG, "Does my research support this" still references the old BG
- **Bug:** Research support check doesn't update when bookmarks change

---

## 4. Research Support Indicator

### Green Indicator Without Support
- Writing shows green (supported) even when NOT supported by any bookmark
- **Question:** Is this intended behavior?

### Philosophical Concern
- Does this system discourage actual research beyond the background guide?
- Users could bookmark the entire BG without reading it, and the AI essentially does the research for them

---

## 5. UI/UX Issues

### Mystery "Q" Element
- There's a "Q" appearing somewhere that looks out of place
- **Need:** Identify where this appears and remove/fix it

### AI Response Artifacts
- Autofill sometimes includes meta-text like "Here's a sample paragraph:"
- **Bug:** AI starter/instruction text should be stripped from output