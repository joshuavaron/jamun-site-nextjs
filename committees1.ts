export interface Executive {
  name: string;
  role: string;
  pronouns?: string;
  image?: string;
}

export interface Document {
  title: string;
  type: "Background Guide" | "Rules of Procedure" | "Position Paper Template" | "Other";
  url: string;
}

export interface CommitteeData {
  id: string;
  name: string;
  shorthand?: string;
  group: "General Assembly" | "Crisis";
  topic: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  delegateCount: number;
  backgroundImage?: string;
  executives: Executive[];
  letterFromChair: string;
  documents: Document[];
  countries: string[];
  // Special Ad-Hoc committee properties
  isAdHoc?: boolean;
  redHerringTopics?: string[];
  realTopic?: string;
}

export const COMMITTEES: CommitteeData[] = [
  // General Assembly Committees
  {
    id: "unicef",
    name: "United Nations Children's Fund",
    shorthand: "UNICEF",
    group: "General Assembly",
    topic: "Access to Primary Education in Conflict Zones",
    description:
      "Address the challenges of providing quality primary education to children living in conflict-affected regions worldwide.",
    difficulty: "Beginner",
    delegateCount: 60,
    executives: [
      { name: "Abby Kettlewell", role: "Chair" },
      { name: "Grant Nusinow", role: "Vice Chair" },
      { name: "Abraham Ergashev", role: "Director" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to UNICEF at JAMUN! This committee promises to be an engaging and rewarding experience as we tackle the critical issue of access to primary education in conflict zones.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Afghanistan", "Argentina", "Australia", "Bangladesh", "Belgium",
      "Brazil", "Canada", "Chile", "China", "Colombia",
      "Denmark", "Ecuador", "Egypt", "Ethiopia", "Finland",
      "France", "Germany", "Ghana", "Greece", "India",
      "Indonesia", "Iraq", "Ireland", "Italy", "Japan",
      "Jordan", "Kenya", "Lebanon", "Malaysia", "Mexico",
      "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway",
      "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
      "Russia", "Saudi Arabia", "South Africa", "South Korea", "Spain",
      "Sweden", "Switzerland", "Syria", "Thailand", "Tunisia",
      "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
      "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ],
  },
  {
    id: "african-union",
    name: "African Union",
    shorthand: "AU",
    group: "General Assembly",
    topic: "The Independence of Colonial Territories",
    description:
      "Examine the ongoing struggles for independence and self-determination in remaining colonial territories across Africa.",
    difficulty: "Intermediate",
    delegateCount: 55,
    executives: [
      { name: "Alex Silverman", role: "Chair" },
      { name: "Alex Rechitsky", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the African Union at JAMUN! This committee promises to be an engaging and rewarding experience as we explore the important topic of colonial territories and the path to independence.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso",
      "Burundi", "Cameroon", "Cape Verde", "Central African Republic", "Chad",
      "Comoros", "Congo", "Côte d'Ivoire", "Democratic Republic of the Congo", "Djibouti",
      "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
      "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau",
      "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
      "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco",
      "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
      "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
      "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo",
      "Tunisia", "Uganda", "Zambia", "Zimbabwe", "Western Sahara"
    ],
  },
  {
    id: "specpol",
    name: "Special Political and Decolonization Committee",
    shorthand: "SPECPOL",
    group: "General Assembly",
    topic: "International Trade Security of Colonized Nations",
    description:
      "Address trade inequalities and economic exploitation affecting colonized and formerly colonized nations.",
    difficulty: "Beginner",
    delegateCount: 60,
    executives: [
      { name: "Rishi Mowan", role: "Chair" },
      { name: "Emma Lagunas", role: "Vice Chair" },
      { name: "Finn Morrow", role: "Director" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to SPECPOL at JAMUN! This committee promises to be an engaging and rewarding experience as we tackle the critical intersection of international trade and the economic security of colonized nations.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium",
      "Brazil", "Canada", "Chile", "China", "Colombia",
      "Cuba", "Czech Republic", "Denmark", "Ecuador", "Egypt",
      "Ethiopia", "Finland", "France", "Germany", "Ghana",
      "Greece", "India", "Indonesia", "Iran", "Iraq",
      "Ireland", "Israel", "Italy", "Jamaica", "Japan",
      "Jordan", "Kenya", "Malaysia", "Mexico", "Morocco",
      "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
      "Peru", "Philippines", "Poland", "Portugal", "Russia",
      "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain",
      "Sweden", "Switzerland", "Thailand", "Tunisia", "Turkey",
      "Ukraine", "United Kingdom", "United States", "Venezuela", "Vietnam"
    ],
  },
  {
    id: "asean",
    name: "Association of Southeast Asian Nations",
    shorthand: "ASEAN",
    group: "General Assembly",
    topic: "Labor Laws and Accountability",
    description:
      "Develop regional frameworks for fair labor practices and corporate accountability across Southeast Asia.",
    difficulty: "Intermediate",
    delegateCount: 40,
    executives: [
      { name: "Abby Vandesteeg", role: "Chair" },
      { name: "Holden Moons", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to ASEAN at JAMUN! This committee promises to be an engaging and rewarding experience as we focus on the important topic of labor laws and corporate accountability in the Southeast Asian region.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia",
      "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam",
      "Australia", "China", "India", "Japan", "New Zealand",
      "South Korea", "Russia", "United States", "Bangladesh", "Canada",
      "Germany", "Mongolia", "Nepal", "Norway", "Pakistan",
      "Sri Lanka", "Switzerland", "Timor-Leste", "Turkey", "United Kingdom",
      "Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia",
      "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"
    ],
  },
  {
    id: "sochum",
    name: "Social, Humanitarian and Cultural Committee",
    shorthand: "SOCHUM",
    group: "General Assembly",
    topic: "Homeless Persons and Refugees in Europe",
    description:
      "Address the humanitarian crisis of homelessness and refugee displacement across European nations.",
    difficulty: "Intermediate",
    delegateCount: 60,
    executives: [
      { name: "Jaden Livshutz", role: "Chair" },
      { name: "Jonathan Greenspon", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to SOCHUM at JAMUN! This committee promises to be an engaging and rewarding experience as we address the pressing humanitarian issues of homelessness and refugee displacement in Europe.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Albania", "Armenia", "Austria", "Azerbaijan", "Belarus",
      "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Canada", "Croatia",
      "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland",
      "France", "Georgia", "Germany", "Greece", "Hungary",
      "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo",
      "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
      "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia",
      "Norway", "Poland", "Portugal", "Romania", "Russia",
      "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain",
      "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom",
      "United States", "Vatican City", "Andorra", "Australia", "Brazil",
      "China", "Egypt", "India", "Japan", "South Africa"
    ],
  },
  {
    id: "disec",
    name: "Disarmament and International Security Committee",
    shorthand: "DISEC",
    group: "General Assembly",
    topic: "Nuclear Weaponry",
    description:
      "Negotiate frameworks for nuclear disarmament and non-proliferation in the modern era.",
    difficulty: "Beginner",
    delegateCount: 70,
    executives: [
      { name: "Miranda Winters", role: "Chair" },
      { name: "Noah Cohen", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to DISEC at JAMUN! This committee promises to be an engaging and rewarding experience as we tackle one of the most consequential issues in international security: nuclear weaponry.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Afghanistan", "Algeria", "Argentina", "Australia", "Austria",
      "Bangladesh", "Belarus", "Belgium", "Brazil", "Canada",
      "Chile", "China", "Colombia", "Cuba", "Czech Republic",
      "Denmark", "Ecuador", "Egypt", "Ethiopia", "Finland",
      "France", "Germany", "Ghana", "Greece", "Hungary",
      "India", "Indonesia", "Iran", "Iraq", "Ireland",
      "Israel", "Italy", "Japan", "Jordan", "Kazakhstan",
      "Kenya", "Libya", "Malaysia", "Mexico", "Morocco",
      "Netherlands", "New Zealand", "Nigeria", "North Korea", "Norway",
      "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
      "Qatar", "Romania", "Russia", "Saudi Arabia", "South Africa",
      "South Korea", "Spain", "Sweden", "Switzerland", "Syria",
      "Thailand", "Tunisia", "Turkey", "Ukraine", "United Arab Emirates",
      "United Kingdom", "United States", "Venezuela", "Vietnam", "Yemen"
    ],
  },
  {
    id: "european-union",
    name: "European Union",
    shorthand: "EU",
    group: "General Assembly",
    topic: "Border Security and Refugees",
    description:
      "Balance border security concerns with humanitarian obligations toward refugees seeking safety in Europe.",
    difficulty: "Intermediate",
    delegateCount: 27,
    executives: [
      { name: "Naomi Altneu", role: "Chair" },
      { name: "Noah Cook", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the European Union at JAMUN! This committee promises to be an engaging and rewarding experience as we tackle the challenging topic of border security and refugee policy.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
      "Czech Republic", "Denmark", "Estonia", "Finland", "France",
      "Germany", "Greece", "Hungary", "Ireland", "Italy",
      "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
      "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
      "Spain", "Sweden"
    ],
  },
  {
    id: "ecosoc-corruption",
    name: "Economic and Social Council",
    shorthand: "ECOSOC",
    group: "General Assembly",
    topic: "Government Embezzlement and Transparency",
    description:
      "Combat corruption and promote government transparency through international cooperation and frameworks.",
    difficulty: "Advanced",
    delegateCount: 60,
    executives: [
      { name: "Andrew Calderon", role: "Chair" },
      { name: "Lainey Reinglass", role: "Vice Chair" },
      { name: "Josh Walsh", role: "Director" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to ECOSOC at JAMUN! This committee promises to be an engaging and rewarding experience as we focus on the critical issues of government embezzlement and transparency.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and start thinking about your country's position.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Rules of Procedure", type: "Rules of Procedure", url: "#" },
      { title: "Position Paper Template", type: "Position Paper Template", url: "#" },
    ],
    countries: [
      "Afghanistan", "Argentina", "Australia", "Austria", "Bangladesh",
      "Belgium", "Brazil", "Canada", "Chile", "China",
      "Colombia", "Czech Republic", "Denmark", "Ecuador", "Egypt",
      "Ethiopia", "Finland", "France", "Germany", "Ghana",
      "Greece", "Hungary", "India", "Indonesia", "Iran",
      "Ireland", "Israel", "Italy", "Jamaica", "Japan",
      "Jordan", "Kenya", "Malaysia", "Mexico", "Morocco",
      "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
      "Peru", "Philippines", "Poland", "Portugal", "Russia",
      "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain",
      "Sweden", "Switzerland", "Thailand", "Tunisia", "Turkey",
      "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Venezuela"
    ],
  },
  // Crisis Committees
  {
    id: "haiti-independence",
    name: "Haiti's Independence",
    group: "Crisis",
    topic: "The Haitian Revolution",
    description:
      "Navigate the complex political and military landscape of Haiti's struggle for independence from colonial rule.",
    difficulty: "Advanced",
    delegateCount: 20,
    executives: [
      { name: "Eric Nodland", role: "Chair" },
      { name: "Stephanie Jiang", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to Haiti's Independence at JAMUN! This crisis committee promises to be an intense and dynamic experience as you step into one of history's most significant revolutionary moments.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and prepare for an unforgettable crisis experience.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Crisis Procedures", type: "Other", url: "#" },
    ],
    countries: [],
  },
  {
    id: "chinese-civil-war",
    name: "Chinese Civil War",
    group: "Crisis",
    topic: "The Struggle for China",
    description:
      "Experience the pivotal conflict between Nationalist and Communist forces that shaped modern China.",
    difficulty: "Advanced",
    delegateCount: 20,
    executives: [
      { name: "Sam Harutyunyan", role: "Chair" },
      { name: "Scarlett Jackson", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the Chinese Civil War at JAMUN! This crisis committee promises to be an intense and challenging experience as you immerse yourself in one of the 20th century's most consequential conflicts.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and prepare for an unforgettable crisis experience.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Crisis Procedures", type: "Other", url: "#" },
    ],
    countries: [],
  },
  {
    id: "adhoc",
    name: "Ad-Hoc Committee of the Secretary General",
    shorthand: "ADHOC",
    group: "Crisis",
    topic: "CLASSIFIED",
    description: "CLASSIFIED",
    difficulty: "Advanced",
    delegateCount: 24,
    isAdHoc: true,
    realTopic: "Global Economic Meltdown",
    redHerringTopics: [
      "Climate Change Mitigation Strategies",
      "International Space Law Reform",
      "Cybersecurity and Digital Sovereignty",
      "Global Pandemic Response Framework",
      "Arctic Resource Distribution",
      "Artificial Intelligence Governance",
      "Nuclear Non-Proliferation Treaty Review",
      "Transnational Organized Crime",
      "Ocean Biodiversity Conservation",
      "Refugee Resettlement Protocols",
    ],
    executives: [
      { name: "Osiris Khan", role: "Chair" },
      { name: "Andrew Walsh", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the Ad-Hoc Committee of the Secretary General at JAMUN! You have been selected for a committee of the utmost importance and sensitivity.

We will be updating this page shortly with our background guides and letters from your committee chairs. The nature of this committee requires discretion, and further details will be revealed at the appropriate time.

Prepare for high-stakes crisis simulation. We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [],
    countries: [],
  },
  {
    id: "great-depression",
    name: "The Great Depression",
    group: "Crisis",
    topic: "Economic Collapse and Recovery",
    description:
      "Address the unprecedented economic challenges of the 1930s and develop strategies for recovery.",
    difficulty: "Beginner",
    delegateCount: 12,
    executives: [
      { name: "Myra Amin", role: "Chair" },
      { name: "Augusto Aguilar", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to The Great Depression at JAMUN! This crisis committee promises to be a challenging experience as you navigate the deepest economic crisis of the 20th century.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and prepare for an unforgettable crisis experience.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Crisis Procedures", type: "Other", url: "#" },
    ],
    countries: [],
  },
  {
    id: "american-civil-war",
    name: "American Civil War (Union)",
    group: "Crisis",
    topic: "Preserving the Union",
    description:
      "Lead the Union through the crucible of civil war and shape the future of American democracy.",
    difficulty: "Intermediate",
    delegateCount: 18,
    executives: [
      { name: "Daniel Greenspon", role: "Chair" },
      { name: "Maxwell Leuthner", role: "Vice Chair" },
      { name: "Lucas Bryan", role: "Director" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the American Civil War (Union) at JAMUN! This crisis committee promises to be an intense experience as you take on the roles of key Union leaders during America's most divisive conflict.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and prepare for an unforgettable crisis experience.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Crisis Procedures", type: "Other", url: "#" },
    ],
    countries: [],
  },
  {
    id: "sudan-civil-war",
    name: "Sudan Civil War",
    group: "Crisis",
    topic: "Conflict Resolution in Sudan",
    description:
      "Navigate the complex ethnic, political, and humanitarian dimensions of Sudan's ongoing civil conflict.",
    difficulty: "Advanced",
    delegateCount: 18,
    executives: [
      { name: "Gregory Kislovsky", role: "Chair" },
      { name: "Austin Blumberg", role: "Vice Chair" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the Sudan Civil War at JAMUN! This crisis committee promises to be a challenging and meaningful experience as you grapple with one of the most complex humanitarian crises of our time.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and prepare for an unforgettable crisis experience.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Crisis Procedures", type: "Other", url: "#" },
    ],
    countries: [],
  },
  {
    id: "cuban-missile-crisis",
    name: "Cuban Missile Crisis",
    group: "Crisis",
    topic: "Thirteen Days on the Brink",
    description:
      "Experience the tension of the closest the world came to nuclear war and make decisions that could save or destroy civilization.",
    difficulty: "Intermediate",
    delegateCount: 20,
    executives: [
      { name: "Bee Kuehn", role: "Chair" },
      { name: "Ceci Frye", role: "Vice Chair" },
      { name: "Charlie Fumerton", role: "Director" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the Cuban Missile Crisis at JAMUN! This crisis committee promises to be an unforgettable experience as you navigate the most dangerous thirteen days in human history.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and prepare for an intense crisis experience.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Crisis Procedures", type: "Other", url: "#" },
    ],
    countries: [],
  },
  {
    id: "rwandan-genocide",
    name: "Rwandan Genocide",
    group: "Crisis",
    topic: "International Response to Genocide",
    description:
      "Confront the international community's response to one of history's darkest chapters and work to prevent future atrocities.",
    difficulty: "Advanced",
    delegateCount: 20,
    executives: [
      { name: "Danielle Murray", role: "Chair" },
      { name: "Dylan Liu", role: "Vice Chair" },
      { name: "Anson Ni", role: "Director" },
    ],
    letterFromChair: `Dear Delegates,

We are so excited to welcome you to the Rwandan Genocide at JAMUN! This crisis committee promises to be a meaningful and impactful experience as you grapple with one of the most significant events in modern history.

We will be updating this page shortly with our background guides and letters from your committee chairs. In the meantime, feel free to explore the topic and prepare for a respectful and engaging crisis experience.

We can't wait to see you at committee!

Best regards,
Joshua Varon
Founder, JAMUN`,
    documents: [
      { title: "Background Guide", type: "Background Guide", url: "#" },
      { title: "Crisis Procedures", type: "Other", url: "#" },
    ],
    countries: [],
  },
];

export function getCommitteeById(id: string): CommitteeData | undefined {
  return COMMITTEES.find((c) => c.id === id);
}

export function getCommitteeByName(name: string): CommitteeData | undefined {
  return COMMITTEES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === name.toLowerCase().replace(/\s+/g, "-")
  );
}
