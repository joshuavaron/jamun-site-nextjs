export interface ResourceData {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: "Getting Started" | "Conference Materials" | "Training";
  icon: "book" | "document" | "template" | "globe" | "video" | "download";
  content: string;
  relatedResources?: string[];
}

export const RESOURCES: ResourceData[] = [
  {
    id: "delegate-handbook",
    name: "Delegate Handbook",
    shortDescription: "Complete guide to rules of procedure and parliamentary debate.",
    longDescription: "A comprehensive guide covering everything delegates need to know about Model UN procedures, parliamentary debate, and conference etiquette.",
    category: "Getting Started",
    icon: "book",
    content: `
<h1>Delegate Handbook</h1>
<p>Welcome to the JAMUN Delegate Handbook! Whether this is your first conference or your tenth, this guide will help you feel confident and prepared. We're excited to have you join us!</p>

<h2>Introduction to Model UN</h2>
<p>Model United Nations (MUN) is an academic simulation of the United Nations where students learn about diplomacy, international relations, and the UN. In 1945, fifty-one nations signed the UN Charter, creating an organization dedicated to preventing war and promoting peace through international collaboration. MUN brings this mission to life in the classroom.</p>
<p>As a delegate, you'll role-play as a representative from a country and work with others to solve real-world issues from your assigned nation's perspective. MUN is about more than just debate—it's about collaboration, creative problem-solving, and understanding different perspectives. Don't worry if you're new; everyone starts somewhere, and our chairs and staff are here to help you succeed!</p>

<h2>Types of Committees</h2>
<p>At JAMUN, you may participate in different types of committees:</p>

<h3>General Assembly (GA)</h3>
<p>General Assembly committees are larger committees, typically with 50-150 delegates. Debate moves through formal speeches, moderated caucuses, and unmoderated caucuses as delegates work together to draft and pass resolutions. GA committees are great for delegates who enjoy working with large groups and want to develop their core MUN skills.</p>

<h3>Specialized and Regional Bodies</h3>
<p>These committees function similarly to General Assemblies but are usually smaller (30-75 delegates) and focus on specific issues or regions. Examples include ECOSOC committees, regional bodies like the African Union, and specialized agencies like WHO or UNHCR.</p>

<h3>Crisis Committees</h3>
<p>Crisis committees are fast-paced, smaller committees (15-30 delegates) where the situation evolves throughout the conference. In addition to regular debate, delegates write private "crisis notes" to take individual actions that can change the course of events. Crisis committees reward quick thinking, creativity, and multitasking.</p>

<h2>First-Time Delegates</h2>
<p>New to Model UN? Welcome! Here's what you need to know to hit the ground running:</p>

<h3>Before the Conference</h3>
<ul>
<li><strong>Research your country:</strong> Learn about your country's government, economy, foreign policy, and position on your committee's topic. Check out our Country Research Guide for help!</li>
<li><strong>Write your position paper:</strong> This helps you organize your thoughts and shows your chairs you've prepared.</li>
<li><strong>Read the background guide:</strong> Your chairs have written a guide explaining the topic—read it carefully.</li>
<li><strong>Practice speaking:</strong> Even just a few minutes in front of a mirror can help build confidence.</li>
</ul>

<h3>What to Bring</h3>
<ul>
<li>Your research notes and position paper</li>
<li>A notebook and pens for taking notes</li>
<li>A water bottle and snacks for breaks</li>
<li>Formal attire (see Dress Code below)</li>
<li>A positive attitude and willingness to learn!</li>
</ul>

<h3>Tips for Success</h3>
<ul>
<li><strong>Don't be afraid to speak:</strong> Your voice matters! Start with a short speech or a point—every contribution counts.</li>
<li><strong>Ask questions:</strong> If you're confused about procedure, raise a Point of Inquiry. Chairs are happy to help.</li>
<li><strong>Work with others:</strong> Find allies who share your country's views and collaborate on working papers.</li>
<li><strong>Stay in character:</strong> Remember, you're representing your country, not your personal opinions—even if you disagree with them!</li>
<li><strong>Have fun:</strong> MUN is meant to be enjoyable! Don't stress too much about making mistakes.</li>
</ul>

<h2>Research and Preparation</h2>
<p>Good preparation is the foundation of a successful MUN experience. Here's how to get ready:</p>

<h3>Researching Your Country</h3>
<ul>
<li><strong>Background:</strong> Explore your country's history, geography, political system, and economy. Understanding where your country comes from helps explain its current positions.</li>
<li><strong>Political Leadership:</strong> Know who leads your country and their influence on foreign policy. Research recent elections and political shifts.</li>
<li><strong>Economic Interests:</strong> Understand your country's key industries, trade partners, and economic challenges. Economic interests often drive foreign policy positions.</li>
<li><strong>Regional Relationships:</strong> Examine your country's relationships with neighbors and regional alliances. Who are your allies? Who are your rivals?</li>
<li><strong>UN Involvement:</strong> Look at your country's history in the UN—voting patterns, treaties signed, and past statements on your topic.</li>
</ul>

<h3>Researching Your Topic</h3>
<ul>
<li><strong>Read the background guide:</strong> This is your starting point! Your chairs have done significant research to help you.</li>
<li><strong>Find your country's position:</strong> Search for official government statements, UN speeches, and voting records related to your topic.</li>
<li><strong>Identify relevant UN resolutions:</strong> What has the UN already done on this issue? What treaties exist?</li>
<li><strong>Develop solutions:</strong> Come up with creative, realistic ideas. Don't be afraid to think outside the box!</li>
</ul>

<h2>Rules of Procedure</h2>
<p>The following is a summary of how committee sessions work. For the complete rules, see our official Rules of Procedure document.</p>

<h3>Roll Call</h3>
<p>At the beginning of each session, the Chair will conduct a roll call. When your country is called, respond with one of the following:</p>
<ul>
<li><strong>"Present"</strong> — You may abstain on substantive votes</li>
<li><strong>"Present and Voting"</strong> — You must vote yes or no on substantive votes (no abstaining)</li>
</ul>

<h3>Speakers' List</h3>
<p>The speakers' list is the default mode of debate. Raise your placard to be added to the list, and when called upon, you'll have <strong>90 seconds</strong> to address the committee. After speaking, you may yield your remaining time to the Chair or to another delegate.</p>

<h3>Moderated Caucus</h3>
<p>A moderated caucus is a focused discussion on a specific sub-topic. To propose one, raise your placard and specify:</p>
<ul>
<li>Total time (e.g., "10 minutes")</li>
<li>Speaking time (e.g., "1 minute" — this is the maximum allowed)</li>
<li>Topic (e.g., "Discussing funding mechanisms")</li>
</ul>
<p>The delegate who proposes the caucus may request to speak first or last. If you want to speak during the caucus, raise your placard and the Chair will call on delegates.</p>

<h3>Unmoderated Caucus</h3>
<p>An unmoderated caucus is informal time where you can leave your seat, walk around, and talk directly with other delegates. This is when most negotiation and working paper drafting happens! Maximum duration is <strong>20 minutes</strong>.</p>

<h3>Points</h3>
<p>Points allow you to communicate with the Chair:</p>
<ul>
<li><strong>Point of Order:</strong> Something procedurally incorrect is happening. May be raised at any time.</li>
<li><strong>Point of Inquiry:</strong> You have a question about procedure. Raise when there's no active speaker.</li>
<li><strong>Point of Personal Privilege:</strong> You can't hear, see, or have a personal comfort concern. Raise when there's no active speaker.</li>
<li><strong>Point of Information:</strong> A question directed to the current speaker. Only with the Chair's consent during a speech.</li>
</ul>

<h3>Common Motions</h3>
<p>Motions allow you to change what the committee is doing:</p>
<ul>
<li><strong>Motion for Moderated Caucus:</strong> Start a focused discussion</li>
<li><strong>Motion for Unmoderated Caucus:</strong> Start informal negotiation time</li>
<li><strong>Motion to Open the Speakers' List:</strong> Open or reopen the speakers' list</li>
<li><strong>Motion to Close Debate:</strong> End debate and move toward voting</li>
<li><strong>Motion to Enter Voting Procedure:</strong> Begin voting on draft resolutions</li>
<li><strong>Motion to Suspend:</strong> Take a recess</li>
</ul>
<p>Most motions require a simple majority to pass. The Chair may rule a motion "dilatory" (obstructing progress) and choose not to entertain it.</p>

<h2>Strategy and Diplomacy</h2>
<p>Success in MUN comes from more than just knowing the rules—it's about working effectively with others. Here are some strategies to help you excel:</p>

<h3>The Flow of Debate</h3>
<p>General Assembly committees typically move through four phases:</p>
<ol>
<li><strong>Opening Debate:</strong> Delegates speak about the topic and their country's position. Use this time to identify potential allies and signal your willingness to collaborate.</li>
<li><strong>Working Papers:</strong> Small coalitions form to draft informal documents. This is where relationships matter—find delegates who share your views and start writing together.</li>
<li><strong>Draft Resolutions:</strong> Coalitions merge their working papers into formal draft resolutions. Be flexible and collaborative, but make sure your key ideas are included.</li>
<li><strong>Voting:</strong> The committee votes on resolutions. Present your resolution confidently and be prepared to answer questions.</li>
</ol>

<h3>Building Alliances</h3>
<ul>
<li><strong>Identify key players early:</strong> Notice which delegates are active, knowledgeable, and influential. Try to work with them.</li>
<li><strong>Form coalitions:</strong> Work with like-minded countries to create a unified front. Regional blocs (EU, African Union, etc.) are natural starting points.</li>
<li><strong>Mention other delegates:</strong> In your speeches, reference delegates you want to work with: "The delegation of France looks forward to collaborating with Germany on this issue."</li>
<li><strong>Be inclusive:</strong> Welcome others into your coalition. The more support you have, the better your resolution's chances.</li>
</ul>

<h3>Effective Participation</h3>
<ul>
<li><strong>Deliver a strong opening speech:</strong> Clearly state your position, goals, and willingness to work with others.</li>
<li><strong>Be active in moderated caucuses:</strong> Raise your placard and speak often. Consistent participation keeps you visible.</li>
<li><strong>Use unmoderated caucuses wisely:</strong> Don't just sit with your coalition—network with other groups, gather signatories, and explore compromises.</li>
<li><strong>Ask strategic questions:</strong> When others present resolutions, ask questions that highlight issues or reinforce your position.</li>
</ul>

<h3>Diplomatic Tips</h3>
<ul>
<li><strong>Stay professional:</strong> Even when debates get heated, remain courteous and diplomatic.</li>
<li><strong>Be flexible:</strong> Compromise is essential. Know which of your positions are negotiable and which are not.</li>
<li><strong>Play the mediator:</strong> If two groups are in conflict, offer to help find common ground. This positions you as a leader.</li>
<li><strong>Use silence strategically:</strong> Sometimes it's better to listen first and respond thoughtfully.</li>
</ul>

<h2>Writing Resolutions</h2>
<p>Resolutions are the final product of your committee's work—formal documents proposing solutions to the topic at hand.</p>

<h3>Working Papers</h3>
<p>Before a resolution, you'll likely draft working papers. These are informal documents to develop and share ideas. They don't need sponsors or signatories, so feel free to experiment! Working papers are a great way to test ideas and attract collaborators.</p>

<h3>Draft Resolutions</h3>
<p>When your ideas are ready, you can formalize them into a draft resolution. You'll need:</p>
<ul>
<li><strong>Sponsors:</strong> The main authors of the resolution (maximum 5% of committee, rounded up). Sponsors present the resolution and can accept friendly amendments. Try to be a sponsor—it shows leadership!</li>
<li><strong>Signatories:</strong> Delegates who want to see it debated, even if they don't fully agree (minimum 20% of committee, rounded down). Gather signatories during unmoderated caucuses.</li>
</ul>

<h3>Resolution Format</h3>
<p>Resolutions are written as long sentences with two main parts:</p>
<ul>
<li><strong>Preambulatory Clauses:</strong> Introduce the resolution by outlining the issues and context. Begin with an <em>italicized</em> phrase like <em>"Noting," "Recognizing," "Aware of," "Deeply concerned,"</em> etc. Each clause ends with a comma.</li>
<li><strong>Operative Clauses:</strong> The actual proposals and actions. Begin with an <strong>underlined</strong> phrase like <em>"Calls upon," "Recommends," "Urges," "Requests,"</em> etc. These are numbered and end with semicolons (except the last one, which ends with a period).</li>
</ul>

<h3>Tips for Strong Resolutions</h3>
<ul>
<li><strong>Be specific:</strong> Clearly address the problem with detailed, actionable solutions.</li>
<li><strong>Be realistic:</strong> Propose solutions that are feasible and within the UN's capabilities.</li>
<li><strong>Build broad support:</strong> Include ideas from multiple perspectives to attract votes.</li>
<li><strong>Respect sovereignty:</strong> Avoid solutions that infringe on national sovereignty unless absolutely necessary.</li>
<li><strong>Consider funding:</strong> Think about how your proposals will be paid for—this is a common point of criticism.</li>
</ul>

<h3>Amendments</h3>
<p>Want to change a draft resolution? You can propose an amendment:</p>
<ul>
<li><strong>Friendly amendments:</strong> If all sponsors agree, the change is automatically incorporated.</li>
<li><strong>Unfriendly amendments:</strong> If sponsors don't all agree, the amendment needs its own sponsors and signatories, and the committee votes on it.</li>
</ul>
<p>Be prepared to negotiate on amendments. Know which parts of your resolution are essential and which you can compromise on.</p>

<h2>Voting</h2>
<p>There are two types of votes:</p>
<ul>
<li><strong>Procedural votes:</strong> Votes on motions (like starting a caucus). Everyone must vote—no abstentions allowed. Simple majority wins.</li>
<li><strong>Substantive votes:</strong> Votes on resolutions and amendments. You may abstain if you responded "Present" during roll call. Simple majority of non-abstaining votes wins.</li>
</ul>
<p>Any delegate may request a roll call vote, where each country is called individually to vote "Yes," "No," "Abstain," or "Pass" (pass lets you vote at the end).</p>

<h2>Delegate Conduct</h2>
<p>Model UN simulates real diplomacy, so we ask delegates to act professionally:</p>
<ul>
<li>Refer to yourself in the third person as "The delegate of [country]"</li>
<li>Address other delegates through the Chair (e.g., "The delegate would like to ask the delegate of France...")</li>
<li>Maintain diplomatic courtesy at all times—personal attacks are never acceptable</li>
<li>Be respectful of all perspectives, cultures, and backgrounds</li>
<li>Use electronic devices only with the Chair's permission</li>
</ul>

<h3>Dress Code</h3>
<p>Delegates are expected to wear formal attire during committee sessions. We understand that "formal" means different things in different cultures and for students from different backgrounds. Acceptable attire includes suits, dresses, slacks, blouses, and blazers. We politely ask that you avoid clothing with distracting logos, messages, or images.</p>

<h2>Awards</h2>
<p>At JAMUN, we recognize outstanding delegates with awards. While awards aren't everything, they're a nice way to celebrate your hard work!</p>

<h3>Award Categories</h3>
<ul>
<li><strong>Best Delegate:</strong> The top performer in the committee</li>
<li><strong>Outstanding Delegate:</strong> Exceptional performance</li>
<li><strong>Honorable Mention:</strong> Notable contribution to committee</li>
<li><strong>Best Position Paper:</strong> Exceptional research and writing in your position paper</li>
</ul>

<h3>What Chairs Look For</h3>
<ul>
<li><strong>Preparation:</strong> Knowledge of your country's position and the topic</li>
<li><strong>Diplomacy:</strong> Working well with others, building coalitions, and finding compromise</li>
<li><strong>Speaking:</strong> Clear, persuasive, and confident speeches</li>
<li><strong>Leadership:</strong> Taking initiative in writing papers and guiding debate</li>
<li><strong>Procedure:</strong> Understanding and correctly using rules of procedure</li>
<li><strong>Growth:</strong> Chairs love to see delegates improve throughout the conference!</li>
</ul>
<p>Remember: awards recognize great work, but the real reward is the skills you build and the friends you make. Focus on learning and having fun, and success will follow!</p>

<h2>Final Thoughts</h2>
<p>Model UN can feel overwhelming at first, but we promise it gets easier—and more fun—with practice. Don't be afraid to make mistakes; that's how we all learn. Your chairs and the JAMUN staff are here to support you every step of the way.</p>
<p><strong>We can't wait to see you in committee. Good luck, and happy debating!</strong></p>
`,
    relatedResources: ["rules-of-procedure", "country-research-guide", "ga-guide", "crisis-guide"],
  },
  {
    id: "rules-of-procedure",
    name: "Rules of Procedure",
    shortDescription: "Official parliamentary rules for committee sessions.",
    longDescription: "The official JAMUN Rules of Procedure document that governs all committee sessions, including voting procedures, motions, and points of order.",
    category: "Conference Materials",
    icon: "document",
    content: `
<h2>Article I: General Rules</h2>

<h3>1.1 Scope</h3>
<p>These rules apply to all JAMUN committees unless otherwise specified by the Secretariat.</p>

<h3>1.2 Purpose</h3>
<p>These Rules of Procedure are designed to facilitate orderly and productive debate, enabling delegates to engage in diplomacy, negotiation, and collaborative problem-solving in the spirit of the United Nations.</p>

<h3>1.3 Authority of the Chair</h3>
<p>The Chair shall maintain order, rule on points and motions, and exercise discretion on all procedural matters. The Chair's rulings are final unless overturned by a two-thirds majority vote.</p>

<h3>1.4 Secretariat Interpretation</h3>
<p>The Secretariat holds final authority to interpret these rules. Any disputes regarding rule interpretation shall be referred to the Secretariat, whose decisions are binding.</p>

<h3>1.5 Amendments to Rules</h3>
<p>These rules may be suspended or amended during a session by a two-thirds majority vote, subject to Secretariat approval.</p>

<h2>Article II: Debate Format</h2>

<h3>2.1 Speakers' List</h3>
<ol type="a">
<li>The Chair maintains the speakers' list throughout debate.</li>
<li>Delegates wishing to speak shall raise their placards.</li>
<li>A delegate may speak only when recognized by the Chair.</li>
<li>Default speaking time is <strong>90 seconds</strong> unless modified.</li>
<li>Committee may not proceed if the speakers' list is empty.</li>
</ol>

<h3>2.2 Moderated Caucus</h3>
<ol type="a">
<li>Requires a motion specifying total time, individual speaking time, and topic.</li>
<li>Requires a simple majority to pass.</li>
<li>Maximum individual speaking time is <strong>one minute</strong>.</li>
<li>The Chair calls on delegates who raise their placards.</li>
<li>The moving delegate may request the first or last speaking position.</li>
<li>Delegates may speak multiple times if time permits.</li>
</ol>

<h3>2.3 Unmoderated Caucus</h3>
<ol type="a">
<li>Requires a motion specifying total time.</li>
<li>Requires a simple majority to pass.</li>
<li>Maximum duration is <strong>20 minutes</strong>.</li>
<li>Delegates may move freely and negotiate informally.</li>
</ol>

<h3>2.4 Yielding Time</h3>
<ol type="a">
<li>A delegate may yield remaining speaking time to the Chair or to another delegate.</li>
<li>Time yielded to the Chair concludes the speaker's remarks.</li>
<li>Time yielded to another delegate may not be yielded again.</li>
</ol>

<h2>Article III: Points and Motions</h2>

<h3>3.1 Points (In Order of Precedence)</h3>
<ol type="a">
<li><strong>Point of Order:</strong> Addresses procedural violations. May be raised at any time.</li>
<li><strong>Point of Inquiry:</strong> Questions about procedure. May be raised when there is no active speaker.</li>
<li><strong>Point of Personal Privilege:</strong> Personal comfort concerns. May be raised when there is no active speaker.</li>
<li><strong>Point of Information:</strong> A question directed to the current speaker. May only be raised during a speech with the consent of the Chair.</li>
</ol>

<h3>3.2 Motions (In Order of Precedence)</h3>
<ol type="a">
<li>Motion to Appeal the Chair: Challenges a ruling by the Chair. This motion cannot be ruled dilatory and requires a two-thirds majority to pass.</li>
<li>Motion to Adjourn: Ends the conference session</li>
<li>Motion to Suspend: Suspends for recess</li>
<li>Motion to Enter Voting Procedure: Moves the committee into voting on draft resolutions</li>
<li>Motion to Close Debate: Ends debate on topic</li>
<li>Motion to Open Debate: Opens debate on a new topic</li>
<li>Motion to Open the Speakers' List: Opens or reopens the speakers' list</li>
<li>Motion for Unmoderated Caucus</li>
<li>Motion for Moderated Caucus</li>
</ol>

<h3>3.3 Dilatory Motions</h3>
<p>The Chair may rule any motion dilatory if it is deemed to be obstructing the progress of debate. A motion ruled dilatory will not be entertained.</p>

<h3>3.4 Order of Consideration</h3>
<p>Motions shall be considered in order from most to least disruptive. Disruption is determined first by precedence (as listed above) and then by time (longer durations are more disruptive).</p>

<h2>Article IV: Working Papers and Resolutions</h2>

<h3>4.1 Working Papers</h3>
<ol type="a">
<li>Working papers are informal documents used to develop ideas.</li>
<li>Working papers do not require sponsors or signatories.</li>
<li>Introduction of working papers is at the discretion of the Chair.</li>
</ol>

<h3>4.2 Draft Resolutions</h3>
<ol type="a">
<li>Draft resolutions require sponsors (authors) and signatories (supporters).</li>
<li>The maximum number of sponsors is <strong>5% of delegates in committee, rounded up</strong>.</li>
<li>The minimum number of signatories is <strong>20% of present delegates, rounded down</strong>.</li>
<li>Draft resolutions must follow proper format, including preambulatory and operative clauses.</li>
</ol>

<h3>4.3 Amendments</h3>
<ol type="a">
<li><strong>Friendly amendments</strong> are approved by all sponsors and are automatically incorporated into the draft resolution.</li>
<li><strong>Unfriendly amendments</strong> require a vote to be incorporated and must have their own sponsors and signatories.</li>
</ol>

<h2>Article V: Voting Procedure</h2>

<h3>5.1 Procedural Votes</h3>
<ol type="a">
<li>All delegates must vote on procedural matters; abstentions are not permitted.</li>
<li>A simple majority is required for a procedural vote to pass.</li>
<li>Procedural votes are conducted by a show of placards.</li>
</ol>

<h3>5.2 Substantive Votes</h3>
<ol type="a">
<li>Delegates who responded "Present and Voting" during roll call may not abstain on substantive votes.</li>
<li>Delegates who responded "Present" during roll call may abstain on substantive votes.</li>
<li>A simple majority of non-abstaining votes is required for a substantive vote to pass.</li>
</ol>

<h3>5.3 Roll Call Vote</h3>
<ol type="a">
<li>Any delegate may request a roll call vote before voting begins.</li>
<li>During a roll call vote, delegates may vote "Yes," "No," "Abstain," or "Pass."</li>
<li>A delegate who votes "Pass" will have one opportunity to cast their vote at the end of the roll call.</li>
</ol>

<h2>Article VI: Conduct</h2>

<h3>6.1 Decorum</h3>
<ol type="a">
<li>Delegates shall maintain diplomatic courtesy at all times.</li>
<li>Personal attacks are prohibited.</li>
<li>Use of electronic devices is at the discretion of the Chair.</li>
</ol>

<h3>6.2 Formal Attire</h3>
<ol type="a">
<li>Delegates are expected to wear formal attire during committee sessions.</li>
<li>JAMUN staff understand that formal attire means a variety of things in different cultures and for students from different backgrounds.</li>
<li>Acceptable attire includes suits, dresses, slacks, blouses, and blazers.</li>
<li>Delegates are politely asked not to wear clothing with distracting logos, messages, or images.</li>
</ol>

<h3>6.3 Violations</h3>
<ol type="a">
<li>For a first offense, the delegate will receive a warning from the Chair.</li>
<li>For a second offense, a note will be sent to the delegate's faculty advisor.</li>
<li>For a third offense, the delegate will be removed from committee.</li>
</ol>
`,
    relatedResources: ["delegate-handbook"],
  },
  {
    id: "country-research-guide",
    name: "Country Research Guide",
    shortDescription: "How to effectively research your assigned country.",
    longDescription: "A step-by-step guide to researching your assigned country, understanding its foreign policy positions, and representing it accurately in committee.",
    category: "Getting Started",
    icon: "globe",
    content: `
<h1>Country Research Guide</h1>

<h2>Introduction</h2>
<p>Effective country research is the foundation of successful Model UN participation. This guide will help you understand your assigned country's positions, interests, and behavior in the international community. By taking the time to deeply research your country, you'll be able to represent it authentically and engage meaningfully with other delegates.</p>

<h2>Step 1: Basic Country Profile</h2>
<p>Start by gathering fundamental information about your country. This background knowledge will inform everything else you research and help you understand why your country takes certain positions.</p>

<h3>Geography</h3>
<p>Begin by understanding where your country is located in the world and who its neighbors are. Examine what natural resources your country possesses, as these often drive economic and foreign policy decisions. Consider what climate and geographical challenges your country faces, such as droughts, flooding, or lack of arable land. Finally, think about your country's strategic importance—does it control important waterways, sit at a crossroads of trade routes, or border regions of conflict?</p>

<h3>Demographics</h3>
<p>Research your country's population size and whether it is growing, shrinking, or aging. Understand the ethnic and religious composition of your country, as this often influences domestic politics and foreign relations. Learn what languages are spoken and which are official. Consider the distribution between urban and rural populations, as this affects development priorities and economic policies.</p>

<h3>Economy</h3>
<p>Determine your country's GDP and whether it is classified as developed, developing, or a Least Developed Country (LDC). Identify the major industries and primary exports, as these shape trade relationships and economic interests. Research the key economic challenges your country faces, such as unemployment, inflation, or debt. Understand your country's most important trade relationships and economic partnerships.</p>

<h3>Government</h3>
<p>Learn about your country's political system—is it a democracy, monarchy, one-party state, or something else? Know who the current leaders are, including the head of state and head of government. Research the major political parties and their platforms if applicable. Consider how stable the government is and whether there have been recent changes in leadership or political direction.</p>

<h2>Step 2: Foreign Policy Research</h2>
<p>Once you understand your country's basic profile, dive deeper into how it interacts with the rest of the world. Foreign policy is shaped by geography, history, economics, and ideology.</p>

<h3>Alliances and Blocs</h3>
<p>Identify which regional organizations your country belongs to, such as the European Union, African Union, ASEAN, or Organization of American States. Research whether your country is part of any military alliances like NATO or collective security arrangements. Examine economic partnerships and trade agreements your country has signed. Understand which voting blocs your country aligns with in the United Nations, as this will help you identify natural allies in committee.</p>

<h3>Key Relationships</h3>
<p>Identify your country's major allies—which countries does it cooperate with most closely on security, economic, and diplomatic matters? Research historical adversaries and understand why tensions exist or existed. Know your country's most important trade partners and what goods and services flow between them. If your country receives foreign aid, know who the major donors are; if it provides aid, know where that assistance goes.</p>

<h3>UN Engagement</h3>
<p>Research how your country has voted on General Assembly resolutions, particularly those related to your committee's topic. Examine which major treaties and conventions your country has ratified, signed but not ratified, or refused to sign. Understand your country's contributions to the UN budget and whether it is a major funder or recipient of UN programs. Learn whether your country participates in peacekeeping operations and where those missions are deployed.</p>

<h2>Step 3: Topic-Specific Research</h2>
<p>After building a general understanding of your country, focus on how it relates specifically to your committee's topic. This is where your research becomes most directly useful for debate.</p>

<h3>Domestic Impact</h3>
<p>Examine how the issue your committee is discussing affects your country directly. Research what domestic policies your country has implemented to address this issue at home. Gather relevant statistics about your country—for example, if discussing climate change, know your country's emissions levels; if discussing education, know literacy rates and school enrollment figures.</p>

<h3>Historical Position</h3>
<p>Research how your country has voted on past UN resolutions related to this topic, as this reveals consistent patterns in policy. Find statements your country's representatives have made in UN forums about this issue. Know which relevant treaties your country has signed or rejected and understand why. Research what actions your country has taken in the past to address this issue, both domestically and internationally.</p>

<h3>Current Policy</h3>
<p>Find official government statements about the topic from recent years. Research any recent initiatives or programs your country has launched related to the issue. Understand what resources your country has committed to addressing this problem. Identify your country's stated priorities and goals regarding this topic.</p>

<h2>Step 4: Research Sources</h2>
<p>Knowing where to find reliable information is just as important as knowing what to look for. Use a variety of sources to get a complete picture.</p>

<h3>Official Sources</h3>
<p>The United Nations website (UN.org) is your best source for resolutions, voting records, and official UN documents. Your country's Permanent Mission to the UN often has a website with statements and position papers. Government websites with .gov domains provide official policy information directly from the source. Look for statements from your country's Ministry of Foreign Affairs for diplomatic positions.</p>

<h3>News Sources</h3>
<p>International news organizations like BBC, Reuters, and the Associated Press provide balanced coverage of global events. Reading newspapers from your assigned country helps you understand how issues are perceived domestically. Regional news sources offer perspectives that international outlets might miss. Academic journals provide in-depth analysis and historical context.</p>

<h3>Data Sources</h3>
<p>The World Bank provides comprehensive economic data and development indicators for nearly every country. The International Monetary Fund (IMF) offers detailed economic analysis and forecasts. The World Health Organization (WHO) has health statistics and policy information. The UNDP Human Development Index ranks countries by quality of life indicators beyond just economic measures.</p>

<h3>Think Tanks</h3>
<p>The Council on Foreign Relations provides accessible analysis of international issues with a US perspective. Chatham House (the Royal Institute of International Affairs) offers British and European perspectives on global affairs. The Brookings Institution publishes in-depth policy research on a wide range of topics. Look for think tanks based in your country's region for perspectives closer to home.</p>

<h2>Step 5: Understanding Positions</h2>
<p>The most important part of research is understanding not just what your country's positions are, but why it holds them. This deeper understanding allows you to argue persuasively and respond to unexpected situations.</p>

<h3>Historical Context</h3>
<p>Consider how colonial history has shaped your country's worldview and relationships with other nations. Research past conflicts your country has experienced and how they influence current security concerns. Understand the cultural influences that have shaped your country's values and perspectives. Examine your country's economic development path and how it affects views on issues like trade, aid, and environmental policy.</p>

<h3>National Interests</h3>
<p>Identify your country's primary security concerns—what threats does it face, and how does it seek to address them? Understand your country's economic priorities, including the industries it wants to protect and the markets it wants to access. Consider how your country seeks to maintain or expand its regional influence. Think about how domestic politics shape foreign policy—leaders often take international positions that appeal to their domestic audiences.</p>

<h3>Ideological Factors</h3>
<p>Understand your country's political ideology and how it shapes its approach to international cooperation and sovereignty. Consider how religious beliefs or the separation of church and state influence policy positions. Research the cultural values that are important in your country and how they affect views on issues like human rights, gender equality, or family policy. Understand your country's development philosophy—does it favor state-led development, free markets, or something in between?</p>

<h2>Step 6: Finding Your Bloc</h2>
<p>In Model UN, delegates rarely work alone. Understanding which countries share your interests helps you find allies and build coalitions.</p>

<h3>Geographic Blocs</h3>
<p>The United Nations organizes countries into five regional groups for electoral and organizational purposes. The African Group includes all 54 African nations and often coordinates on development and post-colonial issues. The Asia-Pacific Group is the largest and most diverse, spanning from the Middle East to the Pacific Islands. The Eastern European Group includes former Soviet states and countries that were part of the Eastern Bloc. The Latin American and Caribbean Group (GRULAC) coordinates on regional issues and often shares perspectives on development. The Western European and Others Group (WEOG) includes Western Europe, North America, Australia, and New Zealand, and often aligns on human rights and democratic governance issues.</p>

<h3>Issue-Based Groups</h3>
<p>Beyond geographic blocs, countries form coalitions around shared interests. The G77 plus China is a coalition of developing nations that often coordinate on economic and development issues. The European Union member states frequently speak and vote as a bloc on many issues. The Arab League coordinates positions on Middle Eastern affairs and issues affecting Muslim-majority countries. Small Island Developing States (SIDS) work together on climate change and ocean issues that threaten their very existence. Landlocked Developing Countries face unique challenges in trade and development and often coordinate their positions accordingly.</p>

<hr>

<h2>Research Checklist</h2>
<p>Before committee begins, make sure you can confidently address all of the following areas. This checklist will help ensure you're fully prepared to represent your country.</p>
<p>You should know your country's basic facts, including its capital city, current leader, and population. You should understand your country's economic status, including whether it is developed or developing, and what major economic challenges it faces. You should be able to describe your country's political system and assess its stability. You should know your country's regional alliances and key bilateral relationships. You should have researched your country's UN voting history on issues related to your topic. You should know which relevant treaties your country has ratified. You should understand what domestic policies your country has regarding the topic. You should be able to cite official statements your country has made on the issue. You should know which countries are your natural bloc partners and allies. Finally, you should have identified potential areas where your country might be willing to compromise in order to build broader coalitions.</p>
`,
    relatedResources: ["delegate-handbook", "public-speaking-tips"],
  },
  {
    id: "public-speaking-tips",
    name: "Public Speaking Tips",
    shortDescription: "Master the art of MUN speeches and debate.",
    longDescription: "Improve your public speaking skills with tips and techniques specifically designed for Model UN, from formal speeches to moderated caucus participation.",
    category: "Training",
    icon: "video",
    content: `
<h1>Public Speaking Tips for Model UN</h1>

<h2>Introduction</h2>
<p>Effective public speaking is essential for success in Model UN. Whether you're giving a formal speech, participating in a moderated caucus, or presenting a resolution, these skills will help you communicate persuasively and confidently.</p>

<h2>Before You Speak</h2>

<h3>Preparation</h3>
<ul>
<li>Know your country's position thoroughly</li>
<li>Prepare key talking points</li>
<li>Anticipate counterarguments</li>
<li>Practice your opening statement</li>
</ul>

<h3>Mental Preparation</h3>
<ul>
<li>Take deep breaths</li>
<li>Visualize success</li>
<li>Remember: everyone wants you to succeed</li>
<li>Focus on your message, not yourself</li>
</ul>

<h3>Physical Preparation</h3>
<ul>
<li>Stand tall with good posture</li>
<li>Make eye contact with the dais</li>
<li>Keep hands visible (not in pockets)</li>
<li>Dress professionally</li>
</ul>

<h2>Speech Structure</h2>

<h3>For Formal Speeches (Speakers' List)</h3>

<h4>Opening (15 seconds)</h4>
<ul>
<li>Formal greeting: <em>"Honorable Chair, fellow delegates..."</em></li>
<li>State your country</li>
<li>Preview your main point</li>
</ul>

<h4>Body (60-70 seconds)</h4>
<ul>
<li>Present your country's position</li>
<li>Provide evidence or examples</li>
<li>Connect to the broader issue</li>
<li>Propose or support solutions</li>
</ul>

<h4>Closing (15 seconds)</h4>
<ul>
<li>Summarize key point</li>
<li>Call to action</li>
<li>Thank the committee</li>
<li>Yield your time</li>
</ul>

<h3>For Moderated Caucus</h3>

<h4>Focus</h4>
<ul>
<li>One main point per speech</li>
<li>Directly address the caucus topic</li>
<li>Build on or respond to previous speakers</li>
</ul>

<h4>Structure</h4>
<ul>
<li>Quick greeting (5 seconds)</li>
<li>Main point with support (45 seconds)</li>
<li>Conclusion or call to action (10 seconds)</li>
</ul>

<hr>

<h2>Delivery Techniques</h2>

<h3>Voice</h3>
<ul>
<li>Project from your diaphragm</li>
<li>Vary your pace (slow for emphasis)</li>
<li>Use pauses effectively</li>
<li>Avoid filler words (um, like, you know)</li>
</ul>

<h3>Body Language</h3>
<ul>
<li>Stand confidently</li>
<li>Use purposeful gestures</li>
<li>Make eye contact across the room</li>
<li>Move deliberately, not nervously</li>
</ul>

<h3>Presence</h3>
<ul>
<li>Own your space</li>
<li>Show conviction in your words</li>
<li>Display diplomatic confidence</li>
<li>Remain composed under pressure</li>
</ul>

<h2>Advanced Techniques</h2>

<h3>Building Arguments</h3>
<ol>
<li>State your claim</li>
<li>Provide evidence</li>
<li>Explain the significance</li>
<li>Connect to your country's values</li>
</ol>

<h3>Rhetorical Devices</h3>
<ul>
<li><strong>Rule of Three:</strong> Group points in threes</li>
<li><strong>Rhetorical Questions:</strong> Engage the audience</li>
<li><strong>Repetition:</strong> Emphasize key points</li>
<li><strong>Contrast:</strong> Highlight differences</li>
</ul>

<h3>Handling Questions</h3>
<ul>
<li>Listen completely before responding</li>
<li>Pause briefly to formulate response</li>
<li>Address the specific question</li>
<li>Stay in character</li>
</ul>

<hr>

<h2>Common Mistakes to Avoid</h2>

<h3>1. Speaking Too Fast</h3>
<ul>
<li>Nervousness speeds you up</li>
<li>Practice slowing down</li>
<li>Use pauses deliberately</li>
</ul>

<h3>2. Reading from Paper</h3>
<ul>
<li>Notes are fine, reading is not</li>
<li>Maintain eye contact</li>
<li>Know your content</li>
</ul>

<h3>3. Apologizing</h3>
<ul>
<li>Don't start with "Sorry, but..."</li>
<li>Own your position</li>
<li>Speak with confidence</li>
</ul>

<h3>4. Being Too Informal</h3>
<ul>
<li>Maintain diplomatic language</li>
<li>Avoid slang or casual phrases</li>
<li>Address delegates formally</li>
</ul>

<h3>5. Going Over Time</h3>
<ul>
<li>Time yourself in practice</li>
<li>Have a shortened version ready</li>
<li>Respect the Chair's signals</li>
</ul>

<hr>

<h2>Speech Templates</h2>

<h3>Opening Statement</h3>
<blockquote>
"Honorable Chair, distinguished delegates, the delegation of [Country] is honored to address this committee on the critical issue of [Topic]. As a nation that has [relevant experience], we believe that [position statement]. Today, we will outline our commitment to [goal] and propose concrete solutions for [specific aspect]."
</blockquote>

<h3>Moderated Caucus</h3>
<blockquote>
"Thank you, Chair. On the matter of [caucus topic], [Country] firmly believes that [position]. We have seen [evidence] demonstrate that [point]. Therefore, we urge this committee to [specific action]."
</blockquote>

<h3>Closing Statement</h3>
<blockquote>
"In conclusion, the delegation of [Country] calls upon all member states to [action]. Together, we can [desired outcome]. [Country] stands ready to work with all willing partners to achieve this goal. Thank you, Chair."
</blockquote>

<hr>

<h2>Practice Exercises</h2>

<h3>1. Mirror Practice</h3>
<ul>
<li>Watch your body language</li>
<li>Practice eye contact</li>
<li>Work on gestures</li>
</ul>

<h3>2. Timed Runs</h3>
<ul>
<li>Practice 60-second speeches</li>
<li>Aim for 90 seconds, cut to 60</li>
<li>Get comfortable with timing</li>
</ul>

<h3>3. Record Yourself</h3>
<ul>
<li>Listen for filler words</li>
<li>Check your pacing</li>
<li>Evaluate your delivery</li>
</ul>

<h3>4. Practice with Friends</h3>
<ul>
<li>Simulate committee environment</li>
<li>Get feedback</li>
<li>Take turns speaking</li>
</ul>

<p><strong>Remember:</strong> The best speakers aren't born—they're made through practice and experience. Every speech is an opportunity to improve!</p>
`,
    relatedResources: ["delegate-handbook"],
  },
  {
    id: "crisis-guide",
    name: "A Short Guide to the Crisis",
    shortDescription: "Learn how crisis committees work, from backroom notes to directives.",
    longDescription: "A comprehensive introduction to crisis committee mechanics, including crisis breaks, backroom arcs, directives, and strategies for success.",
    category: "Training",
    icon: "document",
    content: `
<h1>A Short Guide to the Crisis</h1>

<h2>What is a crisis break?</h2>
<p>Crisis breaks are short scenes acted out by JAMUN crisis staff every 15-30 minutes. These breaks evolve the committee's crisis storyline and require immediate responses from delegates.</p>

<h2>What is the backroom?</h2>
<p>"The backroom" is an imaginary space where your character's private actions take place. You interact with it via <strong>crisis notes</strong>.</p>

<h2>What are crisis notes?</h2>
<p>These are short letters your character writes to fictional or real figures outside the committee. Staff respond in character. Be creative and strategic.</p>
<p><em>Example:</em> In a Civil War crisis, Ulysses S. Grant might write Abraham Lincoln requesting troops.</p>

<h2>What is a frontroom break?</h2>
<p>When your crisis note affects the committee's plot directly and is incorporated into a live scene, you've "broken" into the frontroom.</p>

<h2>What is a directive?</h2>
<p>Directives are short committee-wide documents outlining how the group responds to events. Passed by simple majority, they guide crisis progression and are often fast-paced.</p>

<h2>A Short Timeline of Backroom Arcs</h2>

<h3>Phase 1: Establish Your Relationship</h3>
<p>Decide who your character is writing to and why. Establish motivations and background early.</p>
<ul>
<li><em>Example:</em> "It feels like just yesterday that we created ciphers behind Mr. Varon's back..."</li>
</ul>
<p>Fictional characters are allowed! Just build a solid backstory and relationship.</p>

<h3>Build Up Your Resources</h3>
<p>Start collecting assets and allies. These form the foundation for impactful later moves. Adapt based on the backroom's responses.</p>

<h3>Phase 2: Disruption</h3>
<p>Use small actions (e.g. a skirmish, a leaked rumor) to test your arc's strength and gather momentum.</p>

<h4>A Note Against War</h4>
<p>Not every arc must be violent. Politics, negotiation, and diplomacy can be just as effective. Violent arcs carry both risks and rewards.</p>

<h3>Phase 3: Final Steps</h3>
<p>Use all your resources to accomplish your main goal. Keep things realistic and proportional to what you've built throughout the committee.</p>

<h2>A Short Timeline of the Frontroom</h2>
<p>The frontroom doesn't follow clear phases. Instead, it repeats a <strong>cyclical pattern</strong>:</p>
<ul>
<li><strong>Crisis Break:</strong> Live action update from crisis staff.</li>
<li><strong>Questions:</strong> Clarify the scene.</li>
<li><strong>Timed Crisis (Optional):</strong> Solve a problem fast—fail, and face consequences.</li>
<li><strong>Directive Writing:</strong> Work in caucuses to create and promote directives.</li>
<li><strong>Bloc Formation:</strong> Allies may change with each crisis cycle.</li>
<li><strong>Voting:</strong> Directives are debated and voted on. Passed directives are sent to the backroom.</li>
</ul>

<h3>A Couple Notes on the Crisis Frontroom</h3>
<ul>
<li>Write crisis notes during moderated caucuses.</li>
<li>Frontroom resembles GA procedure, just faster and more intense.</li>
<li>Collaboration makes big moves more likely to succeed.</li>
</ul>
`,
    relatedResources: ["delegate-handbook", "crisis-position-paper-outline", "directive-outline"],
  },
  {
    id: "crisis-position-paper-outline",
    name: "Crisis Committee Position Paper Outline",
    shortDescription: "A structured template for writing crisis committee position papers.",
    longDescription: "A step-by-step outline to help delegates craft effective position papers for crisis committees, covering character introduction, frontroom goals, backroom strategies, and conclusions.",
    category: "Conference Materials",
    icon: "template",
    content: `
<h1>Crisis Committee Position Paper Outline</h1>

<h2>Introduction</h2>
<ul>
<li>Who are you (name, occupation, setting)?</li>
<li>What about you is important (family, wealth, title, etc.)?</li>
</ul>

<h2>Paragraph #1: Committee (Frontroom)</h2>
<ul>
<li><strong>Topic Sentence:</strong> What will your character's interests be during committee? How will you act in front of your peers? What are your public goals?</li>
<li><strong>Context:</strong> What can you do about it? How do your portfolio powers empower you to achieve your goals?</li>
<li><strong>Evidence:</strong> What are the specific details from your life that grant you the power to do what you would like to do?</li>
<li><strong>Analysis:</strong> How will achieving your goals affect your character? Why do you want to achieve these goals? How will you use your portfolio powers to accomplish them?</li>
<li><strong>Concluding Sentence:</strong> How do your goals contribute to the whole committee?</li>
</ul>

<h2>Paragraph #2: Personal (Backroom)</h2>
<ul>
<li><strong>Topic Sentence:</strong> What will your character attempt to do in the backroom? How will your character use crisis notes to achieve their private interests?</li>
<li><strong>Context:</strong> How will your private goals impact your powers?</li>
<li><strong>Evidence:</strong> What are the specific details from your life that grant you the power to do what you would like to do?</li>
<li><strong>Analysis:</strong> How will achieving your goals affect your character? Why do you want to achieve these goals? How will you use your portfolio powers to accomplish them?</li>
<li><strong>Concluding Sentence:</strong> How will your goals affect your character as a whole?</li>
</ul>

<h2>Conclusion</h2>
<ul>
<li>What are the two or three most important things you will try to do during the committee?</li>
<li>How do your skills and qualities enable you to act on these goals?</li>
</ul>
`,
    relatedResources: ["crisis-guide", "delegate-handbook"],
  },
  {
    id: "directive-outline",
    name: "Directive Outline",
    shortDescription: "A template for writing crisis committee directives.",
    longDescription: "A simple outline to help delegates structure directives in crisis committees, including title, sponsors, signatories, and operative clauses.",
    category: "Conference Materials",
    icon: "template",
    content: `
<h1>Directive Outline</h1>

<h2>Header Information</h2>
<ul>
<li><strong>Title:</strong> Be creative! <em>Example: Developing Unforgettable Simulations for Thoughtful International Negotiations (DUSTIN)</em></li>
<li><strong>Committee Name:</strong> <em>Example: JAMUN Secretariat</em></li>
<li><strong>Sponsors:</strong> Main authors. <em>Example: Dustin, Joshua, Emma</em></li>
<li><strong>Signatories:</strong> Delegates that want the directive to be brought to the floor to debate. <em>Example: Sahana, Sam, Miranda, Abby</em></li>
</ul>

<h2>Operative Clauses</h2>
<ul>
<li><strong>Beginning:</strong> A verb in the simple present (Direct, Move, Create, etc.)</li>
<li><strong>Content:</strong> The sponsors' proposed solutions such as:
  <ul>
  <li>Obtaining funding</li>
  <li>Building an army</li>
  <li>Creating new institutions</li>
  <li>Etc.</li>
  </ul>
</li>
<li><strong>Ending:</strong> End each clause with a period. <em>Example: Create a national university to educate Canadian citizens in Law and Economics.</em></li>
</ul>
`,
    relatedResources: ["crisis-guide", "rules-of-procedure"],
  },
  {
    id: "draft-resolution-outline",
    name: "Draft Resolution Outline",
    shortDescription: "A template for writing General Assembly draft resolutions.",
    longDescription: "A structured outline to help delegates write formal draft resolutions, including header information, preambulatory clauses, and operative clauses.",
    category: "Conference Materials",
    icon: "template",
    content: `
<h1>Draft Resolution Outline</h1>

<h2>Header Information</h2>
<ul>
<li><strong>Title:</strong> Be creative! <em>Example: TGIF (Tackling Global Illicit Finance)</em></li>
<li><strong>Committee Name:</strong> <em>Example: United Nations Security Council</em></li>
<li><strong>Sponsors:</strong> Main authors. <em>Example: China, Russia, France, Algeria, etc.</em></li>
<li><strong>Signatories:</strong> Nations that want the paper to be brought to the floor to debate. <em>Example: Sierra Leone, Switzerland, Malta</em></li>
<li><strong>Topic:</strong> <em>Example: The Russo-Ukrainian War</em></li>
</ul>

<h2>Preambulatory Clauses</h2>
<ul>
<li><strong>Beginning:</strong> A verb in the present participle (Recognizing, Noting, etc.)</li>
<li><strong>Content:</strong> Background information, the problem, and past efforts to address it</li>
<li><strong>Ending:</strong> End with a comma. <em>Example: Recognizing the efforts of countries, humanitarian organizations, and the United Nations in providing aid, shelter, and medical care to those affected by the war,</em></li>
</ul>

<h2>Operative Clauses</h2>
<ul>
<li><strong>Beginning:</strong> A verb in the third person present (Calls, Seeks, Urges, etc.)</li>
<li><strong>Content:</strong> The sponsors' proposed solutions: funding, subcommittees, other strategies</li>
<li><strong>Note:</strong> UN committees (except UNSC) can't force action, so use verbs like Requests, Encourages, etc.</li>
<li><strong>Ending:</strong> End each clause with a semicolon. <em>Example: Enacts an immediate ceasefire between Russia and Ukraine;</em></li>
</ul>
`,
    relatedResources: ["delegate-handbook", "rules-of-procedure"],
  },
  {
    id: "ga-position-paper-outline",
    name: "General Assembly Position Paper Outline",
    shortDescription: "A structured template for writing GA position papers.",
    longDescription: "A step-by-step outline to help delegates craft effective position papers for General Assembly committees, covering topic importance, past UN actions, intended solutions, and conclusions.",
    category: "Conference Materials",
    icon: "template",
    content: `
<h1>General Assembly Position Paper Outline</h1>

<h2>Introduction</h2>
<ul>
<li>Why is this topic important?</li>
<li>How does it affect your nation?</li>
<li>What is your nation's official stance?</li>
</ul>

<h2>Paragraph #1: Past UN Actions, Context</h2>
<ul>
<li><strong>Topic Sentence:</strong> How have past actions by the UN or other organizations affected your topic?</li>
<li><strong>Context:</strong> Why is your evidence important?</li>
<li><strong>Evidence:</strong> Past UN Actions, legislation, etc.</li>
<li><strong>Analysis:</strong> Why does your evidence support your topic sentence?</li>
<li><strong>Concluding Sentence:</strong> Connect your evidence to your larger argument.</li>
</ul>

<h2>Paragraph #2: Intended Actions</h2>
<ul>
<li><strong>Topic Sentence:</strong> How will your country solve the problem?</li>
<li><strong>Context:</strong> Why will your solution be effective?</li>
<li><strong>Evidence:</strong> Statistic, historical evidence, etc.</li>
<li><strong>Analysis:</strong> How does your solution work?</li>
<li><strong>Concluding Sentence:</strong> Connect your evidence to your argument.</li>
</ul>

<h2>Conclusion</h2>
<ul>
<li>Restate your stance</li>
<li>Methods (One or two key parts of your solution)</li>
</ul>
`,
    relatedResources: ["delegate-handbook", "country-research-guide"],
  },
  {
    id: "ga-guide",
    name: "A Short Guide to the General Assembly",
    shortDescription: "Learn how General Assembly committees work, from topic selection to voting.",
    longDescription: "A comprehensive guide to the phases of a General Assembly committee, including choosing topics, forming blocs, writing working papers, merging resolutions, and voting procedures.",
    category: "Training",
    icon: "document",
    content: `
<h1>A Short Guide to the General Assembly</h1>

<h2>Phase 1: Choose the Topic</h2>
<p>The committee will begin with a series of moderated caucuses. Use these caucuses to establish your country's stance on the topic. For example:</p>
<ul>
<li>"The Kingdom of Denmark believes that UN member states should..."</li>
<li>"It is the policy of Nigeria to react to... by doing..."</li>
</ul>
<p>Use these moderated caucuses (mods) as opportunities to win allies! Referencing the speeches or ideas of other delegates will go a long way in building coalitions that will be vital during later portions of the conference.</p>
<p>The topic that you will debate will be decided by a majority vote once a substantial number of delegates have been able to speak. This phase will take place during the very beginning of Session 1.</p>

<h2>Phase 2: Voice Your Opinion</h2>
<p>The beginning of the conference will be composed of many moderated caucuses. Make sure that you use these to clearly establish your country's position. These are similar to the speeches given when deciding the topic but are more specific. Instead of telling the committee which problem you would like to solve, tell them how you would like to solve it.</p>
<p>Try to use notes (either physical or memorized) that include statistics or historical examples. These will make your speeches more memorable and persuasive. Very good speeches are passionate and relatable, but there is a fine line between a passionate speech and an irrelevant one. For example, beginning a speech with a quick joke or rhetorical question would be appropriate, so long as it allows time for the delegate to speak about their country's beliefs and position. Your speeches during moderated caucuses are how other delegates will know what your position is, so consistent participation is incredibly important.</p>

<h3>Form Blocs</h3>
<p>During moderated caucuses, make sure to pass notes to delegates with similar opinions that you would like to write working papers and draft resolutions with. For example:</p>
<ul>
<li>"Nigeria, The Kingdom of Denmark agrees with your opinion on ___. We look forward to working with you!"</li>
</ul>
<p>During unmoderated caucuses (unmods), try to recruit more delegates to your bloc. Try to find delegates that have not found a bloc and invite them to work with you! It also can't hurt to come up with a fun name for your bloc! For example:</p>
<ul>
<li>"The Western Bloc"</li>
<li>"The Bloc of Developing Nations."</li>
</ul>

<h3>Begin Writing Your Working Paper</h3>
<p>During unmoderated caucuses (and not during moderated caucuses), you and your bloc should write a paper describing your bloc's proposed solutions to the problem that your committee is debating. Make sure that working papers are as detailed as possible (a guide to writing working papers exists on jamun.org in Prep & Resources).</p>
<p>You will work on your position papers for all of Sessions 1 and 2 and most of Session 3. During later portions of this phase, you might consider adding details about your working paper into your speeches during moderated caucuses. For example:</p>
<ul>
<li>"The Western Bloc believes that... will be effective in solving the problems that Delegate Simon mentioned in his earlier speech."</li>
</ul>

<h2>Phase 3: Mergers</h2>
<p>Your chairs will limit the amount of draft resolutions that the committee will be allowed to vote on. This means that you will need to merge multiple working papers into single cohesive draft resolutions! Mergers are easiest when two (or more) blocs of similar opinions work together. During a merger, members from all involved blocs will come together to select the most important and agreeable clauses from their individual working papers to add to their final draft resolution.</p>
<p>The working paper you create after merging should look similar to both blocs writing it. Blocs should discuss their new strategy for solving the problem before starting a new working paper. For example, a working paper that limits carbon emissions might merge with a working paper that promotes solar panels as a renewable energy source to yield a draft resolution that provides a robust system that limits the creation of additional emissions while promoting cleaner energy systems.</p>
<p>Don't forget to name your merger! Draft resolutions with catchy names stand out during voting! For example, a draft resolution that will address air pollution could be appropriately named "Better Regulations Eliminating Airborne Toxic Health Effects (BREATHE)". Mergers will take place during Sessions 3, 4, and 5. Use some speaking time in moderated caucuses to speak about the results of the merger that you are working on!</p>

<h2>Phase 4: Introducing Draft Resolutions and Voting</h2>
<p>After draft resolutions have been completed, delegates will introduce them to the committee by handing a copy to their committee chairs. From this point, draft resolutions will be read to the committee, debated, and voted on. After each draft resolution is read to the committee, there will be a period of questioning, where delegates can ask questions about the contents of the resolution to its authors for a specified amount of time.</p>
<p>If it is motioned for, there may also be a "Two For, Two Against" debate about each paper before they are voted on. In this form of debate, two delegates that support the paper and two delegates that are against it give alternating speeches (a supporting delegate will begin) regarding the draft resolution. More than one draft resolution can pass, so all draft resolutions will be voted on. In the case that two papers pass, the paper that is passed secondly will be used to resolve any contradictions between the two. This phase will take place during Sessions 5 and 6.</p>
<p>Try not to rush through a General Assembly; all of these steps take time, and this timeline is a guide. It is important to know when to compromise, and when to stand by your opinion. Remember to be diplomatic and professional!</p>
`,
    relatedResources: ["delegate-handbook", "rules-of-procedure", "draft-resolution-outline", "ga-position-paper-outline"],
  },
  {
    id: "example-crisis-note",
    name: "Selected Crisis Note",
    shortDescription: "An example crisis note with commentary on effective techniques.",
    longDescription: "A sample crisis note written as J. Robert Oppenheimer, demonstrating how to establish relationships, stay in character, and pursue backroom goals effectively.",
    category: "Training",
    icon: "document",
    content: `
<h1>Selected Crisis Note</h1>

<h2>Example Crisis Note - J. Robert Oppenheimer</h2>
<p><em>Committee:</em> Manhattan Project Crisis</p>

<h3>Note Text</h3>
<p><strong>Dear Emily Roberts,</strong></p>

<p>My wonderful assistant! You have worked with me for over a decade, and I am still overjoyed every time I get the opportunity to send you a letter. Your service has been characterized by complete loyalty, discretion, and commitment; I appreciate everything that you have done for me very much.</p>

<p>As I'm sure you know, I can not disclose specific details of my recent work. That said, I have a task that I must ask you to do.</p>

<p>I can still remember the vacation my family and I took to Geneva, Switzerland. I yearn for the tranquil parks, lakes, and roads that popped up throughout the city. I would quite like to surprise my family with a vacation house there.</p>

<p>Over the next weeks, I will begin sending you money that I have earned in my recent work, as well as money that I have saved from my years spent in academia. Please begin collecting this money, as well as researching real estate in Geneva. If you find any promising properties please let me know, so I can consider whether it would be a wise investment.</p>

<p><strong>Yours very truly,<br>J. Robert Oppenheimer</strong></p>

<h3>Commentary</h3>
<ul>
<li>This letter opens by clearly establishing a long-term relationship with a loyal, fictional assistant.</li>
<li>The note stays entirely in character as a personal letter — no out-of-character commentary or parenthetical notes.</li>
<li>The character (Oppenheimer) gives specific instructions to collect money and investigate Geneva real estate.</li>
<li>Though his true intention (to flee the country) is hidden, his actions and requests align with that goal.</li>
<li>The letter also subtly introduces character assets: a trusted assistant, funds from government work, and a family.</li>
</ul>
`,
    relatedResources: ["crisis-guide", "crisis-position-paper-outline"],
  },
  {
    id: "example-directive",
    name: "Selected Directive",
    shortDescription: "An example directive showing proper formatting and structure.",
    longDescription: "A sample directive demonstrating how to structure operative clauses with nested sub-clauses, using JAMUN's founding as an example.",
    category: "Training",
    icon: "document",
    content: `
<h1>Selected Directive</h1>

<h2>Developing Unforgettable Simulations for Thoughtful International Negotiations (DUSTIN)</h2>
<ol>
<li>Create a Model United Nations conference called JAMUN.
  <ol type="a">
  <li>JAMUN will hold two conferences per year, one in the spring and one in the fall.</li>
  <li>JAMUN will allow students in 5-8th grade to participate.
    <ol type="i">
    <li>Students will be required to have an adult sponsor in order to participate.</li>
    </ol>
  </li>
  <li>JAMUN will create Crisis, General Assembly, and Ad Hoc committees.
    <ol type="i">
    <li>Students will be allowed to participate in only one committee.</li>
    </ol>
  </li>
  </ol>
</li>
<li>Establish the JAMUN Secretariat.
  <ol type="a">
  <li>High Schoolers at Deerfield High School and neighboring high schools will be called on to serve as staff members for JAMUN.</li>
  <li>Certain members of JAMUN staff will be given extra responsibilities to ensure a smooth and successful conference.
    <ol type="i">
    <li>These members will be said to form the "JAMUN Secretariat."</li>
    <li>Members of the "JAMUN Secretariat" will be given unique titles to describe the nature of their responsibilities.</li>
    </ol>
  </li>
  </ol>
</li>
<li>Call upon local middle school teachers to sponsor delegations.
  <ol type="a">
  <li>JAMUN staff will send emails to local middle school teachers encouraging them to create a Model UN club at their school.</li>
  <li>Dustin Simon will create a spreadsheet to keep track of the schools that will attend JAMUN.</li>
  <li>JAMUN staff may also send letters to schools.
    <ol type="i">
    <li>In the case that the JAMUN Secretariat believes that emails are being sent to spam, they may vote to begin sending "snail mail" to local teachers.</li>
    <li>Members of JAMUN's staff will be called to assist in the writing and addressing of these letters.</li>
    </ol>
  </li>
  </ol>
</li>
</ol>
`,
    relatedResources: ["directive-outline", "crisis-guide"],
  },
  {
    id: "example-draft-resolution",
    name: "Selected Draft Resolution",
    shortDescription: "An example draft resolution showing proper formatting and structure.",
    longDescription: "A sample draft resolution on climate change demonstrating preambulatory clauses, operative clauses with nested sub-clauses, and proper UN resolution formatting.",
    category: "Training",
    icon: "document",
    content: `
<h1>Selected Draft Resolution</h1>

<h2>Better Regulations Eliminating Airborne Toxic Health Effects (BREATHE)</h2>

<p><em>Observing</em> a rise in average global temperatures,</p>
<p><em>Noting with displeasure</em> the increase in worldwide natural disasters as a result of rising temperatures,</p>
<p><em>Identifying</em> the need for consistent worldwide regulations to address the proliferation of global warming,</p>
<p><em>Observing</em> recent advances in renewable energy, including, but not limited to, solar, hydroelectric, nuclear, and wind,</p>
<p><em>Recognizing</em> a worldwide shortage of climate scientists and research aimed at slowing the proliferation of global warming,</p>
<p><em>Aware</em> of the need for worldwide collaboration in addressing climate change,</p>

<ol>
<li>Creates a committee of nations devoted to limiting carbon emissions and removing carbon dioxide from the atmosphere;
  <ol type="a">
  <li>Any nations joining the committee must commit to lowering total carbon emissions by 45% from 2024 levels by 2030;</li>
  <li>Committee members must also plant 500,000 trees on their owned land by 2030;</li>
  <li>Committee members will be empowered to:
    <ol type="i">
    <li>Develop UN regulations surrounding carbon emissions;</li>
    <li>Promote the use of renewable energy globally.</li>
    </ol>
  </li>
  </ol>
</li>

<li>Asks all nations to increase usage of renewable energy sources:
  <ol type="a">
  <li>Examples include solar, wind, nuclear, and hydroelectric power;</li>
  <li>Nations with GDP above $1 trillion are requested to provide financial support to developing nations;</li>
  <li>All nations are encouraged to share clean energy research publicly.</li>
  </ol>
</li>

<li>Assigns oversight of nuclear energy to the following five nations: United States, Russia, United Kingdom, France, and China;
  <ol type="a">
  <li>These countries will form a committee to implement nuclear energy safely;</li>
  <li>This committee is authorized to:
    <ol type="i">
    <li>Prevent weaponization of nuclear research, pursuant to the Treaty on the Non-Proliferation of Nuclear Weapons.</li>
    </ol>
  </li>
  </ol>
</li>

<li>Establishes an international institute for research on carbon removal and renewable energy;
  <ol type="a">
  <li>This institute will:
    <ol type="i">
    <li>Research effective carbon dioxide removal methods (e.g., algae, plants);</li>
    <li>Collaborate with institutions worldwide;</li>
    <li>Support concurrent appointments of researchers at non-UN institutions;</li>
    <li>Advance technologies for solar panels, wind turbines, hydroelectric, and nuclear systems;</li>
    <li>Ensure all research is made public for global access.</li>
    </ol>
  </li>
  </ol>
</li>

<li>Creates a scholarship fund for training climate scientists:
  <ol type="a">
  <li>Open to individuals at or above the age of majority in their home country;</li>
  <li>Recipients must commit to five years of work with the UN post-education;</li>
  <li>Funding will come from:
    <ol type="i">
    <li>Donations from IMF and UN member states;</li>
    <li>A portion of the WMO's existing budget.</li>
    </ol>
  </li>
  </ol>
</li>

<li>Urges nations to reduce plastic use, especially single-use items:
  <ol type="a">
  <li>Encourages legislation targeting plastic bags, bottles, and similar goods;</li>
  <li>Calls on leading economists to advise on:
    <ol type="i">
    <li>Tax policies to discourage plastic use;</li>
    <li>Funding options for climate solutions (e.g., renewable R&D).</li>
    </ol>
  </li>
  <li>Encourages grants for innovation in reusable alternatives;</li>
  <li>Creates a recycling initiative:
    <ol type="i">
    <li>Nations can donate single-use plastics for repurposing into consumer goods;</li>
    <li>Profits will fund the scholarship program created in Clause 5.</li>
    </ol>
  </li>
  </ol>
</li>
</ol>
`,
    relatedResources: ["draft-resolution-outline", "ga-guide"],
  },
];

export function getResourceById(id: string): ResourceData | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export function getResourcesByCategory(category: ResourceData["category"]): ResourceData[] {
  return RESOURCES.filter((r) => r.category === category);
}
