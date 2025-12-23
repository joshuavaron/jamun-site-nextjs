export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: "MUN Prep" | "Delegate Advice" | "Crisis Committees" | "Committees" | "MUN Skills" | "Reflections" | "Global Impact";
  imageUrl?: string;
  relatedPosts?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "so-youve-done-model-un-now-what",
    title: "So, You've Done Model UN. Now What?",
    excerpt: "After finishing your Model UN conference—once the excitement fades—you may be left with a nagging question: what's next?",
    author: "Alexandra Fumerton",
    publishDate: "2025-09-05",
    category: "Global Impact",
    content: `
<h1>So, You've Done Model UN. Now What?</h1>

<p>After finishing your Model UN conference—once the excitement and sense of accomplishment have settled—you may be left with a nagging question: what's next? Perhaps you feel the urge to do more, to give back, to make a difference in your community.</p>

<p>In 2015, the United Nations launched the 2030 Agenda for Sustainable Development, introducing the Sustainable Development Goals (SDGs). These seventeen goals form a global framework for building a better, more sustainable future. They call for action to end poverty, protect the planet, improve education, and promote peace. World leaders have been working toward them for nearly a decade, and while progress has been made, much more remains to be done.</p>

<p>But what does this have to do with you?</p>

<p>The skills you demonstrated during Model UN don't disappear when the gavel drops. Your abilities in debate, public speaking, collaboration, and problem-solving can connect directly to advancing the SDGs.</p>

<p>When you spoke in committee, you were advocating for your delegation's interests. That same advocacy can be used in real life—raising awareness about climate action (Goal 13), gender equality (Goal 5), or education access in your community (Goal 4).</p>

<p>When you built coalitions and drafted resolutions, you were practicing teamwork and leadership. Those same skills can help you organize projects—whether that's a recycling initiative, a fundraiser, or volunteering with a local nonprofit. The tools you honed in Model UN can translate into real-world impact.</p>

<h2>So, how can you get started?</h2>

<p>The best way is to start small. Look around your community: what issues do you see? Where is improvement needed? Every action, no matter how small, adds up. Organizing a park clean-up, for instance, improves your neighborhood while contributing to SDG 15: Life on Land, which emphasizes protecting ecosystems and biodiversity.</p>

<p>Talk to people at your school or in your neighborhood. Start conversations, listen to their concerns, and learn what matters most to them. Building solutions begins with dialogue. Use your voice to inspire others and bring them together around a shared cause.</p>

<p>As you do this, remember: meaningful change takes time. Whether it's a monthly service project, a student club, or an ongoing campaign, commit to your cause. Global leaders don't expect to solve poverty, inequality, or climate change in a single meeting, and neither should you. Consistency matters. Maybe you'll run a weekly club, write a monthly blog on climate change, or organize annual community events. Whatever you choose, make sure it's an issue you genuinely care about—passion fuels perseverance.</p>

<p>So, you've done Model UN. Now what? Now it's time to take what you've learned and use it to make a difference—in your school, your community, and the world.</p>

<h2>United Nations Sustainable Development Goals</h2>

<ol>
<li><strong>No Poverty</strong> – End poverty in all its forms everywhere.</li>
<li><strong>Zero Hunger</strong> – End hunger, achieve food security, improve nutrition, and promote sustainable agriculture.</li>
<li><strong>Good Health and Well-being</strong> – Ensure healthy lives and promote well-being for all at all ages.</li>
<li><strong>Quality Education</strong> – Ensure inclusive and equitable quality education and promote lifelong learning opportunities.</li>
<li><strong>Gender Equality</strong> – Achieve gender equality and empower all women and girls.</li>
<li><strong>Clean Water and Sanitation</strong> – Ensure availability and sustainable management of water and sanitation for all.</li>
<li><strong>Affordable and Clean Energy</strong> – Ensure access to affordable, reliable, sustainable, and modern energy for all.</li>
<li><strong>Decent Work and Economic Growth</strong> – Promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all.</li>
<li><strong>Industry, Innovation and Infrastructure</strong> – Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation.</li>
<li><strong>Reduced Inequalities</strong> – Reduce inequality within and among countries.</li>
<li><strong>Sustainable Cities and Communities</strong> – Make cities and human settlements inclusive, safe, resilient, and sustainable.</li>
<li><strong>Responsible Consumption and Production</strong> – Ensure sustainable consumption and production patterns.</li>
<li><strong>Climate Action</strong> – Take urgent action to combat climate change and its impacts.</li>
<li><strong>Life Below Water</strong> – Conserve and sustainably use the oceans, seas, and marine resources.</li>
<li><strong>Life on Land</strong> – Protect, restore, and promote sustainable use of terrestrial ecosystems, forests, and biodiversity.</li>
<li><strong>Peace, Justice, and Strong Institutions</strong> – Promote peaceful and inclusive societies, provide access to justice, and build effective institutions.</li>
<li><strong>Partnerships for the Goals</strong> – Strengthen the means of implementation and revitalize the global partnership for sustainable development.</li>
</ol>

<h2>About the Author</h2>

<p>Alexandra Fumerton is a freshman at Duke Kunshan University, where she studies Philosophy, Politics, and Economics. With over five years of experience in Model United Nations, she has developed a strong passion for diplomacy and international relations, and aspires to become a diplomat. Outside the classroom and Model UN, Alexandra loves playing volleyball and competes for both her school and club teams.</p>
`,
    relatedPosts: ["a-young-leaders-guide-to-model-un", "from-simulation-to-reality"],
  },
  {
    id: "writing-comprehensive-working-papers",
    title: "Writing Comprehensive and Concise Working Papers That Succeed",
    excerpt: "Learn how to craft effective clauses and working papers that other delegates can support.",
    author: "Nolan Zinman",
    publishDate: "2025-09-05",
    category: "MUN Prep",
    content: `
<h1>Writing Comprehensive and Concise Working Papers That Succeed</h1>

<p>Writing working papers and clauses can feel tricky at first, but it doesn't have to be. If you're new to JAMUN, think of a clause as a short instruction telling the United Nations what should happen. Strong clauses are clear, simple, and something other delegates can agree on. Here's a step-by-step guide to help you write clauses that gain support, win votes, and move your bloc forward.</p>

<h2>Start with one clear sentence.</h2>

<p>Before you write anything, sum up the problem in one short sentence. For example: "Coastal towns are losing homes because of rising sea levels." This framing keeps your clause focused. Once you know the problem, it's much easier to explain what should be done.</p>

<h2>Use one or two quick facts.</h2>

<p>Find one or two short facts that show why the problem matters. These could be a statistic ("X people affected by the crisis") or a short example ("island nation Y lost hundreds of homes"). Use these facts in your position paper or while explaining the clause—not in the clause itself. Keep the clause short and direct.</p>

<h2>Follow the "Who-What-How" rule.</h2>

<p>Every strong clause should answer three questions:</p>
<ul>
<li>Who will act? (e.g., "United Nations Development Programme")</li>
<li>What will they do? (e.g., "establish a small grant fund")</li>
<li>How will it happen? (e.g., "within 12 months, with yearly reports")</li>
</ul>

<p>Example clause: "Requests the United Nations Development Programme to create a small grant fund for coastal adaptation projects, with the first funds distributed within 12 months and yearly progress reports to the General Assembly."</p>

<p>Notice how this example clearly identifies who acts, what they do, and how it's implemented.</p>

<h2>Be specific but not bossy.</h2>

<p>Avoid words that are too weak ("encourage") or too strict ("must punish immediately"). Choose balanced verbs like "establish," "create," "report," or "support." Add realistic timelines so delegates can imagine the plan in action.</p>

<h2>Break big ideas into smaller parts.</h2>

<p>If your idea has multiple elements (funding, training, reporting), split them into sub-clauses. This makes it easier for other delegates to support some parts while negotiating others.</p>

<h2>Use consistent, simple language.</h2>

<p>If you call something "adaptation," don't switch to "resilience" later unless you explain the difference. Stick to plain, direct sentences that make debate easier.</p>

<h2>Work together on drafts.</h2>

<p>Share drafts with your bloc and refine them together. Keep a brief changelog so everyone knows what's been updated and why. Collaboration makes your clauses stronger.</p>

<h2>Test your clause out loud.</h2>

<p>Before presenting, read your clause to a few fellow delegates. Ask: "Can you explain this in one sentence?" If they can, it's clear. If not, simplify.</p>

<h2>Have backup options.</h2>

<p>Draft a main version and a softer version (for example, changing "establish" to "encourage the establishment of"). If someone objects, you'll have a compromise ready.</p>

<h2>Explain why it matters.</h2>

<p>When presenting your clause, lead with its impact: "This clause protects 5,000 citizens by funding local sea walls." Delegates respond to clear benefits.</p>

<h2>Learn from feedback.</h2>

<p>Whether your clause passes or not, ask for feedback. Each attempt helps you write stronger, more persuasive clauses in the future.</p>

<p>In essence: start with a clear problem statement, add a fact or two, follow the Who-What-How rule, use plain language, test your clause out loud, and prepare backup wording. Strong clauses are short, practical, and persuasive. With every draft, you'll become a more effective delegate—and see your ideas turn into real committee progress.</p>

<h2>About the Author</h2>

<p>Nolan Zinman is a high school junior and Secretary-General in Chicago who is committed to creating a welcoming, engaging environment where students feel free to share their ideas. He emphasizes trust and communication between delegates and chairs, and has developed educational materials for primary and lower secondary schools, including Model UN guides and data analysis curricula. A lover of math and data science, Nolan also enjoys soccer, volleyball, and tutoring—and takes pride in watching students grow through new challenges.</p>
`,
    relatedPosts: ["the-role-of-resolutions", "how-to-make-the-perfect-bloc"],
  },
  {
    id: "how-do-i-model-un",
    title: "How Do I Model UN?",
    excerpt: "First conferences can feel intimidating, but preparation and research matter more than appearance or pre-existing blocs.",
    author: "Dustin Simon",
    publishDate: "2025-09-02",
    category: "Delegate Advice",
    content: `
<h1>How Do I Model UN?</h1>

<p>Model UN can feel overwhelming. Walking into your first conference, you might see delegates years older than you confidently raising points of order, others with twenty people already lined up to join their bloc, and some who have even pre-written most (if not all) of their draft resolution. Your first committee can be intimidating.</p>

<p>But remember this: you're prepared. You know what to do, and you know what to say. You did your research just as well as anyone else. Model UN is not about cheating or having a bloc half the size of the committee before roll call ends. It's about diplomacy. It's about debate. It's about focusing on the issue and working to solve it. That's the reason every single delegate is in the room—to solve the problem. You know what to do; now go do it.</p>

<p>Still, what happens if things don't go your way? Maybe you've given strong speeches, built your own bloc, but then momentum shifts. People leave your bloc. A debate doesn't go in your favor. News flash: it happens to everyone. You'll need to adapt. Here's some quick math for you—0% of the plans you make before committee will play out exactly as imagined. Zero. Model UN demands flexibility. Some speeches will be carefully prepared months in advance, while others will be improvised in just thirty seconds. Some clauses will be crafted over an hour by ten people with weeks of research, while others will be scribbled on scratch paper in the final minute of a session. You'll need to think on your feet—and so will every other delegate doing their best.</p>

<p>I've walked into many Model UN committees. Some are still intimidating; others aren't. In the end, it's not really about the committee—it's about you. Knowing that your plans will fall apart is actually a strength. Understanding that other delegates are just as uncertain is empowering. The only barriers keeping you from being the best delegate you can be are the ones you build in your own mind.</p>

<h2>About the Author</h2>

<p>Dustin Simon is a high school Model UN delegate and former Secretary General at JAMUN. Interested in mathematics and STEM, Dustin joined MUN to bring a different thought process to committee. Outside of JAMUN, he enjoys mathematics, robotics, and tennis. Dustin leads committees in a very insightful and engaging way through every stage of debate and crisis with a passion for history, strategy, and collaboration.</p>
`,
    relatedPosts: ["how-to-prepare-for-your-first-conference", "the-delegate-who-listens"],
  },
  {
    id: "how-to-make-the-perfect-bloc",
    title: "How to Make the Perfect Bloc",
    excerpt: "A bloc requires a clear goal, friendly outreach and communication, and organized teamwork.",
    author: "Nolan Zinman",
    publishDate: "2025-09-02",
    category: "Delegate Advice",
    content: `
<h1>How to Make the Perfect Bloc</h1>

<p>A great bloc doesn't happen by luck, especially for new delegates. It's built from simple but vital habits: a clear goal, friendly outreach and communication, organized teamwork, and respectful diplomacy. If you're new to JAMUN or Model UN, think of your bloc as a small team working together to create a variety of solutions to solve one problem. Below are some key ideas to help you form a bloc that gets things done and helps every member grow.</p>

<h2>Start with one sentence.</h2>

<p>Before recruiting anyone, write a single, clear sentence that explains your bloc's purpose. For example: "We want a practical funding program for renewable energy projects" or "We aim to protect the human rights of climate migrants." This sentence keeps discussions focused and helps you explain your bloc quickly during unmoderated caucuses. When other delegates know what you want, they can decide faster whether to join.</p>

<h2>Open the conversation early.</h2>

<p>Don't wait for someone else to approach you. At the beginning of an unmoderated caucus—or even before the first session—introduce yourself to nearby delegates and share your one-sentence purpose. Ask a specific question, like, "Would you be interested in drafting a realistic clause on funding?" Direct, small asks are easier to accept and help avoid vague commitments. Remember, ten committed members who communicate clearly will outperform a chaotic group of twenty that never agrees.</p>

<h2>Keep organization simple and inclusive.</h2>

<p>Instead of fixed roles, focus on shared responsibilities that every bloc should practice:</p>

<ul>
<li><strong>Drafting together</strong> - Use multiple pieces of paper or notebooks where anyone can add or suggest language (but ensure your draft resolution is legible!).</li>
<li><strong>Quick consensus checks</strong> - After brainstorming new ideas, gauge approval using simple methods like thumbs up/down or hand-raising before finalizing and presenting text to the floor.</li>
<li><strong>Coaching each other</strong> - Give feedback on speeches and writing, and encourage members to prepare short speaking notes and practice with one another.</li>
</ul>

<p>This approach avoids unnecessary centralization, keeps all delegates engaged, and ensures everyone is learning.</p>

<h2>Communicate clearly and often.</h2>

<p>Use a chat group or stay with your bloc during breaks to share ideas and track progress. Label drafts (Draft 1, Draft 2, etc.) to build efficiently on previous work. When clauses change, make notes in the margins, e.g., "Changed Article 4: merged clauses on funding and oversight into Article 4a." Transparent updates prevent confusion and keep all delegates involved.</p>

<h2>Practice unified messaging.</h2>

<p>Before presenting a clause, agree on a two- or three-sentence summary everyone can use. This ensures your bloc sounds organized and credible without silencing anyone.</p>

<h2>Negotiate with respect.</h2>

<p>Hold your core ideas but be ready to trade lesser points for stronger alliances. If another bloc suggests a helpful change, acknowledge it publicly: "Thanks, that makes the clause much more implementable." Respectful negotiation builds goodwill and increases future support.</p>

<h2>Celebrate and reflect.</h2>

<p>After votes, thank co-sponsors and seek quick feedback from those who opposed your proposals. Use their insights to revise and improve. A bloc that learns together grows together, ultimately becoming a bloc that wins together.</p>

<p>In short, define your bloc in one sentence, recruit with specific asks, organize around shared responsibilities, maintain clear communication, present consistent messaging, and negotiate respectfully. Forming a perfect bloc is less about dramatic speeches and more about making collaboration easy. Be proactive, stay organized, prioritize open communication, and treat every delegate as a teammate. When collaboration is smooth and participation is real, your bloc will not only win votes but also develop stronger, more confident delegates. Aim for progress, not perfection, and you'll leave committee with a better resolution and a stronger group of leaders.</p>

<h2>About the Author</h2>

<p>Nolan Zinman is a junior in high school and Secretary-General in Chicago who is dedicated to creating a welcoming, engaging environment where students feel free to share their ideas. He places special emphasis on building a strong, supportive relationship between delegates and their chair, focusing on trust and open communication. Nolan has developed educational materials for primary and lower secondary schools, including data analysis curricula and Model UN guides. A lover of math and data science, he also enjoys playing soccer and volleyball, tutoring, and taking pride in watching students grow through new challenges.</p>
`,
    relatedPosts: ["building-relationships-with-fellow-delegates", "becoming-the-master-of-the-unmod"],
  },
  {
    id: "crisis-committees-and-joint-crisis",
    title: "Crisis Committees and Joint Crisis Committees",
    excerpt: "Explore different crisis committee formats and their strategic differences for more dynamic Model UN experiences.",
    author: "Andrew Calderon",
    publishDate: "2025-08-27",
    category: "Crisis Committees",
    content: `
<h1>Crisis Committees and Joint Crisis Committees</h1>

<p>Crisis committees are an excellent way for delegates to practice critical thinking under pressure. They require quicker thinking and faster-paced decision-making than a General Assembly committee. There are several types of crisis committees, and in my last blog I wrote about my thoughts on Ad Hoc crisis committees compared to regular ones. But what about joint crisis committees?</p>

<p>Regular crisis committees function based on the committee's decisions as well as some pre-planned crises. When crisis staff at a JAMUN conference run a crisis committee, a great deal of behind-the-scenes work goes into it. Specifically, we plan for many of the possible decisions the committee might make. Of course, sometimes our plan doesn't work out, since delegates can always pass directives we didn't anticipate. In those cases, we have to improvise. Still, the plan we create beforehand is extremely helpful for guiding the crisis updates that occur throughout the conference. As you can tell, crisis committees are fast-paced not only for the delegates but also for the crisis staff.</p>

<p>Joint crisis committees are a specific kind of crisis in which two separate committees with different delegates exist in the same "universe." For example, at our upcoming JAMUN III conference, we will be hosting a joint crisis committee with both a Bolshevik cabinet and a Russian cabinet set during the Russian Revolution. The directives each committee writes and passes will directly affect both their own group and the other committee. This makes crisis updates even more unpredictable and stressful for delegates and crisis staff alike. Joint crisis committees can often be more exciting for delegates because they know their decisions will affect others—even delegates they haven't met yet. The unpredictability challenges participants to think outside the box and work toward success in their personal goals as their portfolio power.</p>

<p>The two types of committees present similar challenges and can appear very much like a regular crisis committee from the front room. Psychologically, however, the idea of another group of delegates simultaneously making decisions that affect your committee—and vice versa—can make a joint crisis committee especially exciting and engaging.</p>

<h2>About the Author</h2>

<p>Andrew Calderon is a dedicated high school junior who brings energy, curiosity, and leadership to every Model UN conference he attends. A returning chair at JAMUN and an experienced delegate, Andrew has helped guide new participants through the fast-paced world of crisis committees. Outside of MUN, he's active on his school's track, cross-country, Mathletes, and Scholastic Bowl teams. Passionate about history, strategy, and team collaboration, Andrew brings a thoughtful and dynamic perspective to every committee he leads.</p>
`,
    relatedPosts: ["ad-hoc-better-than-crisis", "ga-better-than-crisis"],
  },
  {
    id: "how-to-stand-out",
    title: "How to Stand Out in Your Model UN Committee",
    excerpt: "Success extends beyond how often you speak or how many resolutions have your name on them.",
    author: "Alexander Rechitsky",
    publishDate: "2025-08-27",
    category: "MUN Prep",
    content: `
<h1>How to Stand Out in Your Model UN Committee</h1>

<p>Every Model UN delegate enters committee with the same goal in mind: to make an impact. While it may seem that your success in committee depends on how often you speak or how many resolutions have your name on them, the truth is often a bit more complex. Standing out requires thorough preparation and a strong presence, but it is ultimately about finding the balance between asserting your ideas and respecting those of others.</p>

<p>One thing that is important to note is that "standing out" does not mean dominating every conversation, as this can often alienate others who feel their voices are not being heard. The most memorable delegates are not always the loudest, but rather the ones who bring thoughtful ideas and cooperation to the table. No matter which committee you are in, there are a few key strategies that will set you apart in meaningful ways.</p>

<p>One key way to establish yourself as a dedicated delegate is by seizing your first chance to speak with a strong opening speech. This is your initial opportunity to capture the attention of your fellow delegates and committee chairs by laying the foundation for a clear and compelling position on the topic. A common but effective way to begin is with a striking fact, pun, or example that highlights the importance of the issue and previews possible ways to solve it. From there, you should define your country's stance on the subject and offer a vision of solutions you would like your committee or bloc to pursue. A confident delivery, even in a short speech, will leave a lasting impression on the rest of the committee.</p>

<p>Once debate moves forward, it is crucial to understand that unmoderated caucuses become equally important as the speeches you deliver. This is where blocs are formed and initial collaboration takes place. At this point, you must become increasingly aware of balancing initiative with inclusivity. Judges look for delegates' ability to voice their opinions while also listening to the group when necessary. Additionally, delegates who can guide discussions, divide tasks, and help their bloc stay on schedule become crucial to how quickly the group moves.</p>

<p>Another key way to distinguish yourself is through resolution and directive drafting, as writing strong clauses requires precision and creativity. Instead of broad, vague statements, focus on specific actions that connect directly to real-world policy and can efficiently achieve solutions that work for all delegates. Volunteering to type or organize a draft gives you significant influence, but with that responsibility comes the need to respect your bloc's consensus and not just insert your own ideas.</p>

<p>Finally, professionalism plays a critical role in the way you are perceived. Small actions like arriving on time, dressing appropriately, and engaging respectfully—whether related to committee topics or not—add to your credibility. Networking during breaks, checking in with the chair, and acknowledging the contributions of other delegates are little ways to stand out without coming on too strong.</p>

<p>At the end of the conference, the delegates who leave the largest impacts are those who combine strong speeches, effective teamwork, clear writing, and professional diplomacy. Ultimately, standing out is not simply about being noticed, but about leaving a positive impression of leadership, collaboration, and substantive contributions to the work achieved throughout the conference.</p>

<h2>About the Author</h2>

<p>Alexander Rechitsky is a motivated sophomore at Deerfield High School who is excited to co-chair his first committee at the upcoming JAMUN conference. Previously, Alex served on JAMUN's crisis staff, where he supported delegates in understanding the structure of crisis committees and helped them refine their directive-writing skills. Outside of Model UN, he plays on the school's tennis team and has a strong interest in historical research. He looks forward to contributing to a productive and engaging committee experience for all delegates.</p>
`,
    relatedPosts: ["the-delegate-who-listens", "building-relationships-with-fellow-delegates"],
  },
  {
    id: "building-relationships-with-fellow-delegates",
    title: "Building Relationships with Fellow Delegates",
    excerpt: "Model UN is a people game where relationships determine diplomatic success.",
    author: "Nolan Zinman",
    publishDate: "2025-08-09",
    category: "MUN Skills",
    content: `
<h1>Building Relationships with Fellow Delegates</h1>

<p>A new committee might feel quite chaotic: lots of rules to keep up with, speeches presented, and resolutions written. But at its core, Model UN is a people game. Building strong relationships with your fellow delegates and practicing genuine diplomacy toward others can be the difference between drafting ignored clauses to uniting a passionate bloc that carries your ideas forward. So, how do you turn casual introductions into lasting alliances?</p>

<p>To start off, you need to make the introduction yourself; sitting in silence and waiting for another delegate to initiate a conversation is never an optimal strategy. Next time you're feeling nervous to speak up at the start of an unmoderated caucus, try turning to the delegate in the chair next to you and start with a "Hi," introduce yourself, and possibly mention any key beliefs related to the topic that are important to your nation. I've felt that tense feeling before—walking into a committee barely knowing anyone, afraid to make any bad first impressions, glued to my seat. It can be hard to be open and extroverted in an environment like a Model UN committee. My go-to move is taking the previous advice a step further—introducing myself to other delegates before the committee even starts. Building relationships early shows both friendliness and confidence, which are two important qualities a high-achieving delegate should have.</p>

<p>Next, after the first committee session has begun, look for delegates who share your country's priorities—whether that's climate action, human rights, or global health. A quick discussion over current agenda items often leads to discovering shared interests. "Oh, you're interested in renewable energy, too? What are some specific aspects you're passionate about?" From there, you can suggest creating or joining a bloc, co-writing a clause, or finding more delegates that share your interests.</p>

<p>In addition, don't undervalue the importance of small moments and interactions. A friendly "How's your research coming along?" during a lunch break or a genuine compliment on someone's speech in the last moderated caucus can create rapport. Think of these moments as a kind of diplomatic currency: they cost almost nothing yet build goodwill when it's time to negotiate. By investing in these micro-interactions, you can create a network of allies who remember you as both approachable and collaborative, not just another voice in the room.</p>

<p>Active listening is your secret weapon. As my fellow Secretary-General, Dustin Simon, discusses in his post "The Delegate Who Listens," you don't always need to be the one speaking to be the one in control. Rather than preparing your next rebuttal while someone else speaks, focus on understanding their concerns. Ask clarifying questions: "Could you explain why your bloc prefers a voluntary payment plan over a mandatory tax?" Then paraphrase their answer: "So you believe being flexible is going to attract more participants, got it." When delegates feel heard, they're more open to negotiation and, most importantly, compromise.</p>

<p>Of course, follow-through is essential. Exchanging goodbyes and last-second thoughts at the end of a session is only the first step. After the first day of the conference, send a brief note, perhaps suggesting an edit to be made or inquiring about a new clause: "Great work today! Here's a draft of the clause we talked about after the 3rd session. Would love your feedback." You'll stand out as someone proactive and dependable, and a follow-up cements connections and shows you value others' contributions.</p>

<p>Finally, remember that diplomacy isn't about winning at all costs. It's about sharing success. Celebrate your allies' victories as happily as your own. Their goodwill will pay dividends when you need their vote on your key amendments and resolutions. True diplomacy is an exchange of trust: you give support, and then you receive it in return.</p>

<p>By weaving these strategies into your Model UN skill set—initiating an introduction, finding common ground, practicing small acts of diplomacy, active listening, following up, and mutual celebration—you'll transform your conference experience. Your resolutions will carry more weight, your speeches will resonate with delegates and chairs, and you'll quickly build a reputation as someone who makes others feel seen while making an impact themselves. After all, the vital piece to impactful diplomacy is building strong relationships.</p>

<h2>About the Author</h2>

<p>Nolan Zinman is a junior in high school and Secretary-General in Chicago who is dedicated to creating a welcoming, engaging environment where students feel free to share their ideas. He places special emphasis on building a strong, supportive relationship between delegates and their chair, focusing on trust and open communication. Nolan has developed educational materials for primary and lower secondary schools, including data analysis curricula and Model UN guides. A lover of math and data science, he also enjoys playing soccer and volleyball, tutoring, and taking pride in watching students grow through new challenges.</p>
`,
    relatedPosts: ["how-to-make-the-perfect-bloc", "how-to-stand-out"],
  },
  {
    id: "on-local-government",
    title: "On Local Government",
    excerpt: "JAMUN's involvement in community governance and reflections on local government engagement.",
    author: "Joshua Varon",
    publishDate: "2025-08-06",
    category: "Reflections",
    content: `
<h1>On Local Government</h1>

<p>Last night I arrived at the Deerfield Village Hall at 7:30 p.m.; JAMUN was receiving a commendation from the mayor for its work and service to the community. I wasn't quite sure what to expect (I had never been to a village board meeting before), but I was hoping it would be a brief ceremony followed by a few small village-related business items.</p>

<p>I was wrong.</p>

<p>Although the board meeting began as expected—the Pledge of Allegiance, roll call, and then a five-minute-long commendation—it quickly diverged from my initial expectation.</p>

<p>The board was examining a plan to renovate an office building into a housing-education facility hybrid. They called various people—contractors, business owners, landscapers, and village managers—to speak about the different aspects of the project. This went on for 157 minutes. 157 minutes of concerned citizens talking about their fears; 157 minutes of developers talking about revitalizing an unused office building; 157 minutes of traffic experts talking about crosswalk safety.</p>

<p>And although I left the meeting with many questions—Should the crosswalk be further north? Are there enough electric charging stations in the garages? Is the building by the Walgreens a better fit for this project?—one question rang louder than the rest: why do we have local government?</p>

<p>I have always understood the point of the federal government. There are too many national concerns for each individual citizen to fully educate themselves on, so we trust a group of people to study, debate, and vote on them for us.</p>

<p>And I understood the point of state governments too. Each state has a unique makeup of people, culture, and geography. States bordering water might need commissions on fishing, while states with national parks might need legislation surrounding wildlife preservation.</p>

<p>But what about local governments? Governments that only govern 19,000 people? Surely the issues being debated there are not so vast as to be inaccessible to the locality's citizens.</p>

<p>And, in a way, I suppose they aren't. As evidenced by the passionate citizens who chose to speak for and against the proposed development, the issues that the Village of Deerfield's Board of Trustees debates are not too difficult for its citizens to access. Really, the Village could put every decision up to a referendum, and then the population of Deerfield could make its decisions directly.</p>

<p>But do they want to? Do they really want to read 80-page-long traffic reports? Do they want to consider the effect of moving a crosswalk a foot closer to a hill? Do they want to compare the difference between high-speed and low-speed electric charging?</p>

<p>This is where the purpose of local government lies. For no reason other than their commitment to the community, seven dedicated citizens give up their evening every other Monday. They listen to the concerns of each citizen who wishes to raise them. They read traffic reports, debate crosswalk placement, and ask questions about charging infrastructure. All of this, they do to make Deerfield a better place.</p>

<p>As I watched Mayor Shapiro conclude the meeting, two words flashed in my mind: public service. At its core, that is what he and the rest of the board were doing: a service for the public. Each and every person at that meeting was there only because they wanted to do something good for their neighbors.</p>

<p>And so, as I write this, I feel a specific sense of honor to be hosting JAMUN III in the same Village Hall where I learned what public service looks like. Each and every delegate who competes in our fall conference will debate issues that might not even affect them—wars far from U.S. soil, policies for diseases they don't have, or the mistreatment of prisoners in foreign countries—and they will do it simply because they want to fulfill their civic duty. They will do it because they want to make the world a better place, and because they want to practice solving the world's largest problems as a team.</p>

<p>I cannot wait to see what they do.</p>

<h2>About the Author</h2>

<p>Joshua Varon is a former delegate who founded JAMUN to bring Model UN to middle school students around the world. A current student at Duke University, Joshua has led training programs and guided dozens of young students through their first conferences. With years of experience helping students find their diplomatic voice, he brings practical insights and a unique perspective to every resource he creates.</p>
`,
    relatedPosts: ["from-simulation-to-reality", "so-youve-done-model-un-now-what"],
  },
  {
    id: "the-delegate-who-listens",
    title: "The Delegate Who Listens",
    excerpt: "The best delegates aren't always the loudest. Learn how effective listening strategies triumph in committees.",
    author: "Dustin Simon",
    publishDate: "2025-08-05",
    category: "Reflections",
    content: `
<h1>The Delegate Who Listens</h1>

<p>In every Model UN committee, there's one delegate—the one who dominates every moderated caucus, raises their placard before the chair even finishes speaking, and manages to sneak their name into every working paper before the unmod even begins. They're loud. They're confident. And they think that's how you win.</p>

<p>It's not.</p>

<p>It's easy to walk away from committee with the impression that success in Model UN means making sure everyone knows your opinion—because you said it the most. And to be fair, confidence in public speaking is a huge part of MUN. But after dozens of conferences, wins, losses, and hours watching committee dynamics unfold, I've learned something simple: louder doesn't mean better.</p>

<p>When I started doing MUN, I thought I had to be assertive and outspoken to succeed. I jumped into the speaker's list early, pushed my ideas into every draft resolution, and interrupted people to make sure I was remembered—not them. But over time, I began noticing something. The delegates who made the biggest impact—the ones who actually moved committee, who built real coalitions, who introduced thoughtful, original solutions—weren't the ones who talked the most.</p>

<p>They were the ones who listened.</p>

<p>They spoke when it mattered. They built their influence steadily and quietly. They said things with relevance and precision, not just volume.</p>

<p>Take a delegate I worked with in a crisis committee last year. She barely spoke during the first two sessions—not because she was unprepared, but because she was watching. She studied how blocs were forming, who interrupted others, and who handled pushback well. Then, when she finally spoke, she reframed the entire direction of the crisis. By the end of committee, she had become one of the most respected voices in the room. Not only did she win an award—she won two.</p>

<p>There's a big difference between taking up space and earning space.</p>

<p>Model UN is a simulation of diplomacy. And in diplomacy, volume isn't leadership. In fact, some of the world's most effective negotiators lead with restraint, empathy, and timing. You don't always need to be the one speaking to be the one in control.</p>

<p>Of course you should speak. But focus on what you're saying—when you're saying it, what came before it, and what could come of it. Think about the conversations your comments could spark. Then, when you do speak, you'll be ready—and your words will matter more than if you had spoken just to speak.</p>

<p>Model UN isn't about yelling matches. That's not diplomacy.</p>

<p>When you say something important, people know.<br />
When you say something important, you'll know.</p>

<p>Make your time count. The best delegates aren't always the loudest.<br />
They're the ones who listen—<br />
and then speak.</p>

<h2>About the Author</h2>

<p>Dustin Simon is a high school Model UN delegate and former Secretary General at JAMUN. Interested in mathematics and STEM, Dustin joined MUN to bring a different thought process to committee. Outside of JAMUN, he enjoys mathematics, robotics, and tennis. Dustin leads committees in a very insightful and engaging way through every stage of debate and crisis with a passion for history, strategy and collaboration.</p>
`,
    relatedPosts: ["how-to-stand-out", "building-relationships-with-fellow-delegates"],
  },
  {
    id: "how-to-prepare-for-your-first-conference",
    title: "How to Prepare for Your First Model UN Conference",
    excerpt: "A comprehensive guide for delegates entering their initial conference experience.",
    author: "Charlie Fumerton",
    publishDate: "2025-08-04",
    category: "MUN Prep",
    content: `
<h1>How to Prepare for Your First Model UN Conference</h1>

<p>Attending your first Model United Nations (MUN) conference can feel both exciting and intimidating. You'll step into the shoes of a diplomat—debating international issues, collaborating with other students, and crafting resolutions that balance different global interests. While every MUN conference is unique and rewarding, preparation is key to your success. Here's a comprehensive guide to help you feel confident and ready.</p>

<h2>Understand the Basics of Model UN</h2>

<p>Before diving into your topic research, make sure you understand how MUN works. At a conference, you'll represent a country, organization, or person and debate real-world issues in a committee. These committees can vary—General Assembly, Crisis, or Specialized/Hybrid—so make sure you know which one you're in and the powers and limitations that come with it.</p>

<p>Each delegate must follow parliamentary procedure, which governs how debates, motions, and voting take place. While the rules may differ slightly by conference, the core format includes:</p>

<ul>
<li><strong>Formal debate</strong> - Making speeches and presenting your country's stance</li>
<li><strong>Moderated caucus (MOD)</strong> - Shorter speeches in a more focused discussion</li>
<li><strong>Unmoderated caucus (UNMOD)</strong> - Informal negotiation and resolution writing with other delegates</li>
</ul>

<p>Knowing these basics will help you feel more comfortable and confident on day one.</p>

<h2>Research Your Country and Committee Topic</h2>

<p>One of the most important parts of preparation is research. Your job as a delegate is to represent your assigned country's position accurately—not your personal opinion. To do this, start by:</p>

<ul>
<li><strong>Learning your country's background</strong> - Know its geography, government structure, allies, and political stances.</li>
<li><strong>Understanding the committee topic</strong> - Conferences usually provide a background guide. Use it as a starting point, then dive deeper using real UN reports and current events.</li>
<li><strong>Identifying your country's policy</strong> - Ask yourself: Has your country faced this issue before? What solution has it supported in the UN? Who are its allies or adversaries on this topic?</li>
</ul>

<p>You'll also have the opportunity to write a position paper summarizing your country's stance and proposed solutions. Writing this not only helps structure your research but may also make you eligible for awards.</p>

<h2>Learn MUN Slang</h2>

<p>MUN has its own vocabulary, and understanding it will help you participate fully. Some common terms include:</p>

<ul>
<li><strong>Motion to open debate</strong> - Begins formal discussion</li>
<li><strong>Motion for a MOD/UNMOD</strong> - Switches between structured and informal discussion</li>
<li><strong>Yielding time</strong> - Giving unused speech time to another delegate, the chair, or for questions</li>
</ul>

<p>Memorizing these terms makes the conference experience smoother and less stressful.</p>

<h2>Pack Smart and Look Professional</h2>

<p>Your first MUN conference is also a professional setting. Here's a quick checklist:</p>

<ul>
<li><strong>Business attire</strong> - Suits, ties, professional dresses/blouses, and shoes</li>
<li><strong>Notebooks, pens, printed position papers</strong> - Some committees don't allow laptops or devices</li>
<li><strong>Water bottle</strong> - Conferences can be long, and staying hydrated is important</li>
</ul>

<p>Looking prepared helps you feel more confident—and that confidence shows.</p>

<h2>Stay Flexible and Have Fun!</h2>

<p>No matter how much you prepare, things may not go exactly as planned—and that's okay! The key to a great first MUN experience is adaptability. Listen carefully, adjust your strategies during debate, and don't be afraid to step out of your comfort zone to speak up and lead.</p>

<p>Remember, MUN isn't just about winning awards. It's about learning, building confidence, and making friends who share your interests. Approach your first conference with curiosity and energy, and you'll walk away with skills—and memories—that last a lifetime.</p>

<h2>About the Author</h2>

<p>Charlie Fumerton is a rising junior at Walter Payton College Prep. She has participated in Model UN for two years and has competed in numerous conferences, including one in Mexico. Outside of school, she enjoys playing volleyball and basketball, watching movies and TV shows, and attending concerts. With a strong interest in international relations, Charlie has always found a natural fit in Model UN. She is passionate about learning how the United Nations operates and exploring the complexities of solving global issues—skills she hopes to apply in her future career.</p>
`,
    relatedPosts: ["how-do-i-model-un", "a-young-leaders-guide-to-model-un"],
  },
  {
    id: "from-simulation-to-reality",
    title: "From Simulation to Reality: MUN and Its Connection to the UN",
    excerpt: "How Model UN connects to real United Nations principles and empowers the next generation of leaders.",
    author: "Mehrnaz Kharoliwalla",
    publishDate: "2025-08-04",
    category: "Global Impact",
    content: `
<h1>From Simulation to Reality: MUN and Its Connection to the UN</h1>

<p>Multilateralism is the central mechanism in which the United Nations operates. By definition, multilateralism is "the process of organizing relations between groups of three or more states." In other words, the world must work together to achieve peace, security, and development. But how can we foster multilateral cooperation among the next generation of global citizens? The answer is Model UN.</p>

<p>Unlike typical classroom activities, Model UN exposes students to real-world challenges such as climate change, disarmament, refugee crises, and global health—issues that they would otherwise only encounter in textbooks. By simulating the United Nations, students engage in multilateral diplomacy, mirroring the very process that nations use to negotiate and solve global problems. As a result, students don't just learn about international relations—they experience them firsthand.</p>

<p>Throughout my journey as an advocate, I've been fortunate to attend the UN Commission on the Status of Women, where I've witnessed firsthand how Model UN shapes real-world activism. I have also had the distinct pleasure to meet so many young leaders whose activism can be traced back to their experiences in Model UN. One young advocate I met started her journey opposing child marriage after writing her first resolution on the topic in high school. That resolution wasn't just a classroom exercise—it was the beginning of a lifelong commitment to policy and advocacy.</p>

<p>I've also seen this transformation in my own life. Through participating in MUN, I gained the confidence, critical thinking, and public speaking skills that prepared me to step onto the real UN floor. I've been able to speak at the United Nations about financial education for young women—an opportunity I never would have had without my start in Model UN.</p>

<p>When students are given the opportunity to engage with pressing global challenges through this type of meaningful simulation, they develop into informed, engaged advocates. They begin to see the world not as an abstract set of problems, but as an interconnected system of challenges and solutions. And most importantly, they realize that they have a role to play in shaping global outcomes.</p>

<p>This is why Model UN matters. It doesn't just reflect the mission of the United Nations—it empowers the next generation to carry that mission forward.</p>

<h2>About the Author</h2>
<p>Mehrnaz Kharoliwalla is an advocate for gender equality and financial literacy who has spoken at the United Nations Commission on the Status of Women. Her Model UN experience laid the foundation for her real-world advocacy work promoting education and empowerment for young women globally.</p>
`,
    relatedPosts: ["so-youve-done-model-un-now-what", "on-local-government"],
  },
  {
    id: "a-young-leaders-guide-to-model-un",
    title: "A Young Leader's Guide to Model UN",
    excerpt: "Foundational guidance for developing leaders interested in diplomatic simulation.",
    author: "Alexandra Fumerton",
    publishDate: "2025-07-30",
    category: "Reflections",
    content: `
<h1>A Young Leader's Guide to Model UN</h1>

<p>Hi, my name is Alexandra Fumerton. I have been doing Model UN for five years now, and this year I had the privilege of chairing the UNHCR committee at JAMUN II. Model UN has been a large part of my high school life, and as I prepare to enter college, I hope to not only continue competing in conferences, but to use my experience to inspire and educate the young leaders of the world.</p>

<p>Being a chair for JAMUN was truly one of the most rewarding experiences of my Model UN journey. The delegates were excited and ready to open debate. Throughout the conference, they learned how to collaborate and respectfully debate with each other, fostering a welcoming community for young leaders. This sense of community is what makes JAMUN stand out, because it helps students grow into thoughtful and open-minded leaders.</p>

<p>When I first joined MUN, I was just a freshman who had no clue what to do. My friends and I started the first Model UN team at our school, and we immediately began doing conferences. We had no guidance on how to write our position papers, and no idea what to expect from committee sessions. During our first conference, we spoke during debate once and only raised our placards during roll call, but we quickly learned how Model UN works and adapted to what was expected of us. Although none of us won any awards at the conference, we came away with a life-changing experience that would later set us up to be confident leaders within our community.</p>

<p>Even though it wasn't a quick route to success, since our first conference I have gained invaluable skills in public speaking and quick thinking. Model UN doesn't require perfection—it rewards those who are able to adapt and show up ready to collaborate with others. If you are going into your first Model UN conference, or even if you are just unsure of where to start building connections with people in committee, just show up. Raise your placards, voice your opinions, but above all, have fun with it.</p>

<p>For those of you who have done a Model UN conference before, you know how scary and anxious it can feel. Even with all the prep in the world, going out and talking in front of a room is challenging for anyone. That's why one of the most important things you can do in committee is take the initiative to talk to people. Collaboration is the most rewarding when you work with everyone, and not just your friends from school. Being able to expand and connect with others is not only a key quality of a good leader, but a key skill to help you in life.</p>

<p>Leadership in MUN isn't about dominating, being the loudest, or talking the most. It's about being able to foster collaboration between everyone and build bridges where they usually couldn't be built. The best delegates are the ones who listen, ask questions, and include everyone in their groups and solutions.</p>

<p>Similar to how I encourage you to reach out and help your fellow delegates, since the beginning of my Model UN journey I have been looking for ways to educate younger delegates and create spaces where they can learn about Model UN procedures. JAMUN has given me an opportunity to pass on what I've learned by creating a space where students can explore diplomacy, leadership, and engage with global issues. JAMUN is a learning conference where all are welcome—whether you are just getting started or whether this is your third conference, there is always a space for you at JAMUN.</p>

<p>See you in committee.</p>

<h2>About the Author</h2>

<p>Alexandra Fumerton is a freshman at Duke Kunshan University, where she studies Philosophy, Politics, and Economics. With over five years of experience in Model United Nations, she has developed a strong passion for diplomacy and international relations, and aspires to become a diplomat. Outside the classroom and Model UN, Alexandra loves playing volleyball and competes for both her school and club teams.</p>
`,
    relatedPosts: ["how-to-prepare-for-your-first-conference", "how-do-i-model-un"],
  },
  {
    id: "becoming-the-master-of-the-unmod",
    title: "Becoming the Master of the Unmod",
    excerpt: "Tips for succeeding in your first unmoderated caucus session.",
    author: "Abby Kettlewell",
    publishDate: "2025-07-30",
    category: "MUN Prep",
    content: `
<h1>Becoming the Master of the Unmod</h1>

<p>When you approach the point in committee when someone motions for an unmoderated caucus, and it passes, what do you do? Here are some helpful tips on how to succeed in your first un-mod.</p>

<p>What happens during an un-mod? Well, an un-mod is the part of committee when you are free to meet with other delegates to discuss solutions to the issue your committee is addressing. During this time, you will work together to write a resolution to solve the issue at hand. You must also garner support from other delegates to vote for your resolution.</p>

<p>So, even if this is your first time at JAMUN or your last, here are some helpful tips on how to master the un-mod.</p>

<h2>Know your goal</h2>

<p>Every un-mod may look a little different, so try to stay focused on what the task is. Are you trying to form a bloc, draft your paper, or merge with another one?</p>

<h2>Stand up!</h2>

<p>Go talk to people! You don't get anywhere by sitting in your chair the whole time. Get up and start conversations. I find it helpful to send delegates notes during moderated caucuses to try and align before an un-mod.</p>

<h2>Build up your bloc</h2>

<p>You want to have a bloc that includes differing perspectives. So reach out to the smaller blocs and see if they have similar ideas. It's okay to have different ideas, as long as you combine to make the most cohesive resolution.</p>

<h2>Start writing!</h2>

<p>Once you think you have enough people, start writing! It takes a long time to write, so the more time you can devote to it, the better. Start by getting everyone involved and sharing ideas; there may be some overlap, so it's best to get them out now before they appear in two different clauses.</p>

<h2>Represent your country</h2>

<p>Even though you are coming up with new ideas, don't forget about your country's policies. Represent your nation while still being innovative.</p>

<h2>Involve everyone!</h2>

<p>Don't leave someone out of the bloc. Make sure that everyone is involved one way or another.</p>

<h2>Garner support</h2>

<p>Have people who are not writing the resolution talk to other nations to get signatories. Tell them the basic idea of your paper and ask if they would like to be signatories. The more signatories you have, the more likely people are to vote for you, and your resolution will have a better chance of passing.</p>

<p>I hope that this was helpful for you all! If you have any questions, please feel free to send me an email at 281kettlewella@student.dist113.org.</p>

<p>Good luck!<br />
Abby Kettlewell</p>

<h2>About the Author</h2>

<p>Abby Kettlewell is a sophomore at Deerfield High School with a strong passion for Model UN and international relations. Outside of MUN, she competes on the swim and water polo teams, loves to travel to new and exciting places, and is an avid reader. She has been a part of the JAMUN team, first serving in the crisis backroom and now as the Director of Crisis. Abby hopes JAMUN will give middle school students a chance to explore what they can do to make our world a better place.</p>
`,
    relatedPosts: ["how-to-make-the-perfect-bloc", "the-role-of-resolutions"],
  },
  {
    id: "the-role-of-resolutions",
    title: "The Role of Resolutions in Model UN",
    excerpt: "How draft resolutions finalize negotiated committee agreements and transform ideas into action.",
    author: "Alexander Rechitsky",
    publishDate: "2025-07-30",
    category: "MUN Prep",
    content: `
<h1>The Role of Resolutions in Model UN</h1>

<p>In every Model UN committee, there will come a point where your hard work pays off and your bloc will come to agreement on a final, complete solution. While it may make sense to think that your work in committee is finished, there is still a very important step ahead: your draft resolution. It is now time to turn your wonderful ideas into a formal document that you and your bloc will work to pass. This document--your draft resolution--outlines your proposed answers to the matters being discussed. It is the tool that transforms your plan into actionable policy.</p>

<p>It is important to note, though, that not all committees operate this way. Resolutions are primarily used in General Assembly (GA) committees and specialized agencies, where delegates work collaboratively to write official documents that reflect consensus among most of the delegates. In contrast, crisis committees move at a much faster pace and will instead use directives to move their interests forward; directives are short, immediate plans of action that directly influence the course your committee will take.</p>

<p>When your bloc is ready to start working on a resolution (often called a working paper in its initial draft form), it is important that everyone agrees on the information the paper will include. At this stage, a group of three to five delegates is ideal, striking a balance between staying focused and including multiple perspectives. You will begin writing your resolution by choosing a title, which is usually an acronym that reflects the problems being addressed (although any memorable title will do). Next, you must determine the sponsors (authors) of the resolution and gather signatories to sign off on your resolution. Signatories are delegates who may not necessarily support your resolution, but believe that it should be presented so that the committee can debate it. You should always consult your committee chair(s) to confirm the required number of sponsors or signatories for each resolution, as this number may vary depending on the size of the committee.</p>

<p>The body of each resolution follows a specific structure. They will begin with preambulatory clauses, which justify the committee's reason for action on this issue. These clauses are typically short and start with phrases like "recognizing," "noting," or "acknowledging," to briefly explain which concerns are being addressed. Afterward, you will start work on the main body of the resolution: the operative clauses. These clauses outline the specific measures needed to address the issue, broken down into clear steps. Often longer and more detailed, operative clauses are the "meat" of your actual solution. Resolutions can include as little as three operative clauses or as many as ten, although the actual amount of operative clauses will depend on what you decide to include in your resolution.</p>

<p>Once the draft resolution is complete, it's time to introduce it to the rest of the committee. Most committees will have multiple blocs writing different working papers. Each group will present their draft and answer any questions that other delegates may have. This process is often followed by mergers, where blocs with similar ideas can come together to combine their resolutions into a stronger, more unified document. Merging is a key part of the process as it encourages collaboration and compromise to achieve the best solution possible.</p>

<p>Once merging is complete, the finalized resolutions are presented again. At this point, delegates may also propose amendments to resolutions before entering the final vote. If any resolution gains the necessary approval, it officially passes and your committee's work on this subject is typically complete. Even if your resolution doesn't pass, your work still represents significant progress as you have successfully translated thoughtful collaboration into meaningful solutions. Regardless of what comes next, your efforts have strengthened the committee's work and shown the impact of teamwork and critical thinking.</p>

<h2>About the Author</h2>

<p>Alexander Rechitsky is a motivated sophomore at Deerfield High School who is excited to co-chair his first committee at the upcoming JAMUN conference. Previously, Alex served on JAMUN's crisis staff, where he supported delegates in understanding the structure of crisis committees and helped them refine their directive-writing skills. Outside of Model UN, he is a member of the school's tennis team and has a strong interest in historical research. He looks forward to contributing to a productive and engaging committee experience for all delegates.</p>
`,
    relatedPosts: ["writing-comprehensive-working-papers", "becoming-the-master-of-the-unmod"],
  },
  {
    id: "ga-better-than-crisis",
    title: "Are GA Committees Better than Crisis Committees?",
    excerpt: "A comparative analysis of General Assembly versus crisis committee formats to help you choose.",
    author: "Sahana Shah",
    publishDate: "2025-07-28",
    category: "Committees",
    content: `
<h1>Are GA Committees Better than Crisis Committees?</h1>

<p>You might've heard people talking about GA committees and crisis committees, but what are they really, and which one is better?</p>

<p>Let's start with GAs. GA stands for General Assembly, and these are the largest and most traditional Model UN committees. In a GA, you represent a country and discuss real-world topics like climate change, global health, or education. During the committee, you'll give speeches and work with others to write resolutions, negotiate, and vote on solutions.</p>

<p>At our upcoming JAMUN conference (JAMUN III), some GA topics will include military defense, cybercrime, and healthcare. GA committees are usually more structured and slower-paced, which is super helpful when you're learning the ropes of Model UN. You get more time to prepare your arguments, build strong points, and learn the ins and outs of formal debate. It's also a great place to practice teamwork and public speaking.</p>

<p>Now let's talk about crisis committees.</p>

<p>Instead of representing a country, you usually represent a character-like a president, general, or historical leader. Crisis committees are built around a story that changes as the committee reacts to events. You'll still make speeches and work with others, but a lot of the action also happens through crisis notes. These are private messages you send to the crisis staff to make moves behind the scenes—like sending troops somewhere, making a secret deal, or even plotting something dramatic. Crisis committees move quickly and can be a bit intense, but they're also super fun and rewarding.</p>

<p>So which one is better, GA or Crisis?</p>

<p>The truth is—it depends on you!</p>

<p>GA committees are a great choice for beginners. They're a helpful introduction to the world of Model UN, and there's usually a mix of experienced delegates and first-timers, which means you'll learn a lot from the people around you. GA is especially good if you like having more time to prepare speeches and prefer diving deep into a single topic.</p>

<p>Crisis, on the other hand, is great for students who have some experience with MUN and are ready for a faster pace. If you enjoy solving problems quickly, thinking outside the box, and adding some drama to the debate, crisis might be your perfect fit. A lot of advanced delegates like crisis for its exciting parts, but almost all of them started in GA to build their foundation.</p>

<p>Every section in Model UN requires creativity, teamwork and debate, but each committee can offer you something different. Choosing a committee depends on your personality, and what skill you want to build.</p>

<p>Here's a little cheat sheet to give you some more guidance when deciding on a committee:</p>

<ul>
<li><strong>Teamwork and real-world issues:</strong> Try GA Committee</li>
<li><strong>Writing formal resolutions:</strong> Try GA Committee</li>
<li><strong>More time to write speeches:</strong> Try GA Committee</li>
<li><strong>Fast-paced thinking and drama:</strong> Try Crisis Committee</li>
<li><strong>Creative storytelling and surprises:</strong> Try Crisis Committee</li>
<li><strong>Sending secret notes and strategies:</strong> Try Crisis Committee</li>
</ul>

<p>If you're brand new to MUN, GA is probably the better choice. It teaches you the basics and gives you time to grow. If you've already been to a few conferences and want to try something bold and fast, crisis is a fun next step.</p>

<p>Ask your advisor or teammates if you're still not sure. And don't be afraid to try both because each one teaches you something different!</p>

<p>If you still have questions, feel free to reach out to me at 261shahs@student.dist113.org. I'd be happy to help.</p>

<p>Good luck, you'll do great no matter which committee you choose. We can't wait to see you at the next JAMUN!</p>

<p>Sincerely,<br />
Sahana Shah</p>

<h2>About the Author</h2>

<p>Sahana Shah is a senior at Deerfield High School with a strong passion for science and medicine. With three years of Model UN experience, she brings a thoughtful and inquisitive approach to every debate. Sahana is especially excited about JAMUN's growth and the opportunity to help younger delegates discover their voice. Whether in committee or the classroom, she's driven by curiosity and a desire to make a difference.</p>
`,
    relatedPosts: ["ad-hoc-better-than-crisis", "crisis-committees-and-joint-crisis"],
  },
  {
    id: "ad-hoc-better-than-crisis",
    title: "Are Ad Hoc Crises Better than Regular Crisis Committees?",
    excerpt: "Both formats follow a continuous crisis format with evolving scenarios, but with key differences.",
    author: "Andrew Calderon",
    publishDate: "2025-07-28",
    category: "Crisis Committees",
    content: `
<h1>Are Ad Hoc Crises Better than Regular Crisis Committees?</h1>

<p>Ad Hoc crises are similar in format to regular crisis committees. Both types follow a continuous crisis format, with crisis updates coming in every so often that present new issues and problems for the committee to deal with. In both types of committees, personal goals for your portfolio power can matter more than the committee goals, as there doesn't need to be a neat resolution at the end of the conference. With all these similarities, what's the difference and how does this change the dynamic of the committee?</p>

<p>Crisis committees allow time before the conferences to prepare for the conference. While you still won't know exactly what will happen during the committee, you have time to prepare for the topic, understand it, and spend time doing extra research on your portfolio power and the topic in general. This makes it easier to understand your personal goals during the committee and where you want it to go. Position papers are also helpful for establishing your personal goals during the conference, allowing you to dive deeper into your character and the committee's topic. Background guides are packed with important information that is available to you beforehand, including a bibliography which contains links to even more detailed articles.</p>

<p>Ad Hoc crisis committees, however, leave you very little time to embrace your character and establish your personal goals during the committee. While you won't have to worry about writing a position paper, I think that writing a position paper is a useful tool for comprehending the issue at hand. Reading the background guide at the beginning of the conference can invite some more intensity and quicker thinking to the committee. Many students don't perform well under pressure, because it takes time and practice to master that skill. Jumping right into a fast paced crisis committee with no idea what to expect can be intimidating to many.</p>

<p>When it comes to utilizing, learning, and practicing important skills, I believe that Ad Hoc crisis committees can be better at that. The main difference between the two committees in terms of skill use is that one invites more pressure and quicker thinking, which is often what you find out in the real world. While regular crisis committees don't lack this skill, it doesn't appear as prominently as in Ad Hoc crises.</p>

<p>In my opinion, I think Ad Hoc committees are better because of these reasons, but it always depends on the person. Both are great learning opportunities and fun committees, and both invite you to challenge yourself in different ways.</p>

<h2>About the Author</h2>

<p>Andrew Calderon is a dedicated high school junior who brings energy, curiosity, and leadership to every Model UN conference he attends. A returning chair at JAMUN and an experienced delegate, Andrew has helped guide new participants through the fast-paced world of crisis committees. Outside of MUN, he's active on his school's track, cross-country, mathletes, and scholastic bowl teams. Passionate about history, strategy, and team collaboration, Andrew brings a thoughtful and dynamic perspective to every committee he leads.</p>
`,
    relatedPosts: ["crisis-committees-and-joint-crisis", "ga-better-than-crisis"],
  },
  {
    id: "mastering-your-first-position-paper",
    title: "Mastering Your First Position Paper",
    excerpt: "A guide to help new delegates navigate research and writing for their initial position papers.",
    author: "Joshua Varon",
    publishDate: "2025-07-27",
    category: "MUN Prep",
    content: `
<h1>Mastering Your First Position Paper</h1>

<p>Your first Model UN position paper can feel like a monumental task: between finding the perfect sources and researching the strongest actions your country has historically taken, the process of writing a position paper can easily overwhelm even the most experienced delegate.</p>

<p>So where do you start?</p>

<p>When I sit down to start writing my position paper, I like to already have a good idea about the overall standing of my country. Do I represent a country with advanced education? What about healthcare? What is the status of women's rights? Once I feel like I have a good understanding of where my country is, it becomes easier to see where I need to take it.</p>

<p>I'll begin by defining the problem in my own words: "The Republic of Iceland is troubled by the rising trends in global temperatures." From there, I try to spring to a description of what my country has already done. By citing previous actions, along with the effects they have had on the problem, I am able to assert myself as an authority as I go on to describe what my country proposes our committee should do.</p>

<p>While I write, I try to hold my endpoint in mind. Researching evidence to support your claims is a lot easier when you know what you actually want to claim. I often find myself going back to add an additional piece of evidence in an early paragraph after realizing that I haven't provided strong enough support for a part of my overall claim.</p>

<p>"But Joshua," you may be saying, "deciding on a claim is the hardest part!" Don't worry. You don't need to find the perfect position to write the perfect position paper. The best positions are often the ones the delegate has the most familiarity with; by drawing from your own experiences, you will be able to develop a more robust position than if you have to only rely on information you find while doing your research.</p>

<p>The best position papers have voice. They feel urgent. They don't read like a list of facts, monotonous; they sing with persuasion and emotion. Don't shy away from using vivid language! The most memorable parts of your position paper will be the ones that say "our government is appalled by the very notion" or "The Commonwealth of Australia has undertaken a bold mission."</p>

<p>And take risks! Unlike math, Model UN doesn't have one right answer. Really, it doesn't have right answers at all. A Model UN conference is an opportunity to push yourself out of your comfort zone, and it starts as early as the position paper. The position paper I grew the most from writing wasn't the one about The Role of Artificial Intelligence in Weapons Systems; it was the one I wrote about The International Adoption System.</p>

<h2>About the Author</h2>

<p>Joshua Varon is a former delegate who founded JAMUN to bring Model UN to middle school students around the world. A current student at Duke University, Joshua has led training programs and guided dozens of young students through their first conferences. With years of experience helping students find their diplomatic voice, he brings practical insights and a unique perspective to every resource he creates.</p>
`,
    relatedPosts: ["how-to-prepare-for-your-first-conference", "writing-comprehensive-working-papers"],
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}

export function getBlogPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
