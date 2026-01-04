# JAMUN Online - Project Reference Document

**Version:** 1.0
**Created:** January 2026
**Status:** Planning Phase

---

## Executive Summary

JAMUN Online is a digital learning platform that integrates seamlessly with JAMUN's in-person events. It serves students who cannot attend events while also enhancing the experience for those who do—providing preparation before conferences and continued learning afterward.

---

## Core Vision

### Mission
Extend JAMUN's educational impact beyond physical events by providing an accessible, engaging digital platform that:
1. Delivers standalone educational value
2. Drives attendance to in-person events
3. Extends learning for conference attendees

### Guiding Principles
- **Always Free** - Aligned with JAMUN's nonprofit mission
- **Inclusive** - Designed for broad scalability beyond JAMUN's direct community
- **Integrated** - Part of the main jamun.org website, not a separate platform
- **Youth-Focused** - Built for middle schoolers (grades 5-8)

---

## Programs Covered

JAMUN Online will launch with all three JAMUN programs:

1. **Model UN**
2. **Mock Trial**
3. **Mathletes**

*Note: Specific content and activities for each program will be defined in a later planning phase.*

---

## User Types & Roles

### Students
- Create full profiles with achievements, history, and shareable recognition
- Track progress through activities
- Earn points, badges, levels, and streaks
- View their individual scores (not other students')
- Belong to teams/clubs managed by teachers

### Teachers/Advisors
- Create and manage teams/clubs
- Invite and enroll students
- Assign activities to students
- View aggregated and individual student progress
- Track team performance

### Parents
- Monitor their child's progress
- Provide consent for students under 13 (COPPA compliance)

### JAMUN Executives
- Create and manage all content
- Access administrative dashboards
- Manage users and permissions

### Volunteers
- Limited access to contribute content
- Potential mentorship capabilities

---

## Content & Activities

### Activity Types
| Type | Description |
|------|-------------|
| **Interactive Tutorials** | Step-by-step guided lessons |
| **Document Builders** | Guided creation tools (e.g., position papers, pretrial motions) |
| **Video Lessons** | Educational video content |
| **Simulations** | Virtual practice scenarios (e.g., mock caucus, cross-examination) |
| **Downloadable Resources** | Worksheets, templates, and guides |

### Content Structure
- **Structured Learning Paths** - Recommended sequences for beginners
- **Self-Directed Library** - Free exploration for experienced students
- **General Content** - Evergreen skill-building materials
- **Event-Specific Content** - Preparation tied to upcoming conference topics

### Content Sources
- JAMUN staff and executives
- Volunteers (experienced delegates, former participants)
- External content (licensed or curated)

---

## Learning Paths & Progression

### Pre-Event Activities
- General skill-building for each program
- Topic-specific preparation for upcoming conferences
- Unlocks "prepared delegate" status and bonus content at events

### Post-Event Activities
- Reflection exercises
- Feedback surveys
- "What's next" learning paths
- Advanced content building on event experience

---

## Gamification & Engagement

### Points System
- Students earn points through activity completion
- Points contribute to **team scores** (not displayed individually to others)
- Team points provide benefits at in-person conferences

### Progression Elements
| Element | Description |
|---------|-------------|
| **Badges** | Earned for completing activities or milestones |
| **Levels/Ranks** | Novice → Intermediate → Expert progression |
| **Streaks** | Rewards for consistent daily/weekly engagement |
| **Leaderboards** | Team-based rankings only (no individual student rankings visible to others) |

### Privacy Model
- Students see only their own individual scores
- Leaderboards display aggregate team results
- Individual progress is private

---

## Teams & Clubs

### Structure
- Teachers/advisors create teams representing their school or club
- Students are invited/enrolled by their teacher
- Teams compete on leaderboards

### Teacher Capabilities
- Create and name teams
- Invite students via email/code
- Assign specific activities or learning paths
- View individual and aggregated progress
- Track team standings

---

## Integration with In-Person Events

### Pre-Conference
- Activity completion unlocks "prepared delegate" status
- Access to bonus/exclusive content
- Team points accumulated before events

### At Conference
- Recognition for online preparation
- Team points contribute to conference experience
- Points benefit team standings/awards

### Post-Conference
- Reflection and feedback activities
- Advanced content unlocked
- Continued learning paths

---

## Technical Requirements

### Platform Integration
- Integrated into main site: `jamun.org/online`
- Consistent navigation with existing JAMUN website
- Shared authentication system

### Responsive Design
- Equal priority for mobile and desktop
- Works great on both phones and computers
- No offline mode required (internet connection needed)

### Internationalization
- Support for multiple languages beyond English/Spanish
- Leverage existing next-intl framework
- Evaluate more scalable translation solutions if available

### Accessibility
- WCAG 2.1 standard compliance
- Screen reader compatible
- Video content considerations for future

---

## Compliance & Privacy

### COPPA Compliance
- Parental consent required for all users under 13
- Consent flow integrated into registration
- Parent accounts linked to child accounts

### Data Privacy
- Minimal data collection
- Clear privacy policy
- Secure authentication
- Parent visibility into child's data

---

## User Accounts

### Student Accounts
- Full profiles with:
  - Personal information (name, grade, school)
  - Achievement history
  - Badges and levels earned
  - Activity completion records
  - Team membership
- Shareable achievements/recognition
- Progress saved across sessions

### Account Creation Flows
- **Under 13:** Requires parental consent before activation
- **13 and over:** Standard registration
- **Via Teacher:** Invited to join a team

---

## Analytics & Success Metrics

### Primary Metrics
| Metric | Description |
|--------|-------------|
| **User Engagement** | Active users, time spent, return visits, session frequency |
| **Conversion to Events** | Correlation between online engagement and conference attendance |
| **Team/School Adoption** | Number of clubs using the platform, geographic spread |

### Dashboard Requirements
- Admin dashboard for JAMUN executives
- Teacher dashboard for team management
- Student dashboard for personal progress

---

## Future Considerations

### Live Components (Post-Launch)
- Virtual workshops and webinars
- Live Q&A sessions with executives
- Scheduled peer collaboration sessions

*Note: Initial launch will be entirely asynchronous/on-demand*

### Content Audit
- Inventory existing JAMUN educational materials
- Identify content ready for adaptation
- Plan new content creation

---

## Technical Architecture (Proposed)

### Stack Alignment
Building on existing JAMUN website:
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **i18n:** next-intl (evaluate scalability)
- **Animation:** Framer Motion
- **Icons:** lucide-react

### New Requirements
- **Authentication:** User accounts with roles (evaluate: NextAuth, Clerk, Auth0)
- **Database:** User data, progress, teams (evaluate: PostgreSQL, Prisma)
- **Video Hosting:** For video lessons (evaluate: Mux, Cloudflare Stream, YouTube)
- **CMS:** For content management (evaluate: Sanity, Contentlayer, custom MDX)

### Route Structure (Proposed)
```
/online                     # JAMUN Online landing page
/online/signup              # Registration flow
/online/login               # Authentication
/online/dashboard           # Student dashboard
/online/programs/modelun    # Model UN learning hub
/online/programs/mocktrial  # Mock Trial learning hub
/online/programs/mathletes  # Mathletes learning hub
/online/activities/[slug]   # Individual activity pages
/online/teams               # Team management (teachers)
/online/admin               # Admin dashboard (executives)
```

---

## Implementation Phases (Proposed)

### Phase 1: Foundation
- [ ] Authentication system with role-based access
- [ ] Database schema for users, teams, progress
- [ ] Basic student registration flow
- [ ] COPPA-compliant parental consent flow
- [ ] Student dashboard skeleton

### Phase 2: Team Infrastructure
- [ ] Teacher registration and team creation
- [ ] Student invitation system
- [ ] Team management interface
- [ ] Parent account linking

### Phase 3: Content Platform
- [ ] Activity/lesson content system
- [ ] Interactive tutorial framework
- [ ] Video lesson integration
- [ ] Document builder foundation
- [ ] Downloadable resources system

### Phase 4: Gamification
- [ ] Points system
- [ ] Badges and achievements
- [ ] Levels/ranks progression
- [ ] Streak tracking
- [ ] Team leaderboards

### Phase 5: Learning Paths
- [ ] Structured path creation tools
- [ ] Self-directed library browsing
- [ ] Progress tracking through paths
- [ ] Pre/post event content linking

### Phase 6: Analytics & Admin
- [ ] Admin dashboard
- [ ] Teacher analytics
- [ ] Engagement metrics
- [ ] Event conversion tracking

### Phase 7: Content Population
- [ ] Audit existing materials
- [ ] Create Model UN content
- [ ] Create Mock Trial content
- [ ] Create Mathletes content
- [ ] Event-specific content workflow

---

## Open Questions

1. **Video hosting:** Self-hosted vs. third-party service?
2. **Translation workflow:** How will content be translated at scale?
3. **Content audit:** What existing materials can be adapted?
4. **Simulation complexity:** How sophisticated should practice simulations be?
5. **Team point mechanics:** Exactly how do points benefit teams at conferences?
6. **External school usage:** How to handle schools that won't attend JAMUN events?

---

## Appendix

### Glossary
| Term | Definition |
|------|------------|
| **Activity** | A single learning unit (tutorial, video, document builder, etc.) |
| **Learning Path** | A structured sequence of activities |
| **Team** | A group of students managed by a teacher/advisor |
| **Points** | Currency earned through activity completion |
| **Streak** | Consecutive days/weeks of engagement |
| **Level/Rank** | Progression tier based on accumulated achievements |

### Related Documents
- [CLAUDE.md](./CLAUDE.md) - Main development guide
- [src/config/site.ts](./src/config/site.ts) - Site configuration

---

*This document will be updated as planning progresses and decisions are finalized.*
