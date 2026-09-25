import type { Subject } from './types';

export const sem1TcsSubject: Subject = {
  id: 'sem1-tcs',
  name: 'Technical Communication Skills',
  code: 'TCS101',
  color: 'bg-teal-600',
  icon: 'message-square',
  description: 'Engineering Communication — The Communication Cycle, 7 Cs, Professional Correspondence, Technical Reports, Presentation Skills, and Group Discussions',
  semester: 1,
  units: [
    {
      id: 'tcs-u1',
      title: 'Unit 1: Fundamentals of Communication & The 7 Cs',
      description: 'Communication process, sender-receiver encoding/decoding cycle, communication barriers, and the 7 Cs of effective communication.',
      topics: [
        {
          id: 'tcs-t1',
          title: 'The Communication Cycle, Barriers & The 7 Cs of Communication',
          simpleExplanation: 'Communication is a two-way process of sharing ideas where feedback confirms understanding. Noise or barriers can distort the message, which is prevented by following the 7 Cs.',
          detailedExplanation: `### The Communication Process (Cycle)

Communication is derived from the Latin word *"communicare"* (to share). It is a dynamic, continuous, two-way loop consisting of seven core elements:

\`\`\`
   +-----------------------------------------------------------+
   |                        CONTEXT                            |
   |                                                           |
   |   Sender  ==[Encoding]==> Message ==[Channel]==> Receiver |
   |     ^                                               |     |
   |     |                                               |     |
   |     +================[ FEEDBACK ]<==================+     |
   |                 (Closes the Loop)                         |
   +-----------------------------------------------------------+
               ^                                   ^
               +------------- NOISE / -------------+
                             BARRIERS
\`\`\`

1. **Sender**: The initiator who conceptualizes the idea.
2. **Encoding**: Converting the thought into symbolic language (words, symbols, gestures).
3. **Message**: The actual content or information transmitted.
4. **Channel / Medium**: The physical pathway (email, telephone, spoken voice, report).
5. **Receiver**: The intended recipient.
6. **Decoding**: Interpreting the encoded message into meaning.
7. **Feedback**: The response sent by receiver to sender. **Feedback closes the loop and distinguishes communication from mere information dissemination!**
8. **Noise / Barriers**: Any interference that distorts or degrades message clarity.

### Categories of Communication Barriers:
- **Physical / Environmental**: Distance, loud background noise, poor internet/telephone line.
- **Semantic / Linguistic**: Jargon, unfamiliar technical vocabulary, words with multiple meanings (polysemy).
- **Psychological / Emotional**: Prejudices, anger, stress, premature evaluation, selective listening.
- **Organizational**: Strict hierarchy, excessive filtering, rigid protocols.

### The 7 Cs of Effective Communication:
1. **Clear**: Explicit purpose; use simple, unambiguous words.
2. **Concise**: Say what is needed in the fewest words without sacrificing meaning.
3. **Concrete**: Grounded in specific facts, figures, and data rather than vague generalizations.
4. **Correct**: Free from grammatical errors, inaccuracies, and misstatements.
5. **Coherent**: Logical progression where ideas flow smoothly from one to the next.
6. **Complete**: Contains all facts necessary for the receiver to take appropriate action.
7. **Courteous**: Empathetic, polite, positive, and respectful to the recipient's perspective.`,
          shortNotes: 'Communication is a 2-way loop: Sender -> Encoding -> Message -> Channel -> Receiver -> Decoding -> Feedback. 7 Cs: Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous.',
          examples: [
            {
              title: 'Applying the 7 Cs in Email Writing',
              problem: 'Rewrite a vague, rude email into a professional, concise communication.',
              explanation: 'Replace vague demands with concrete, polite requests containing specific dates.',
              code: `// BAD (Vague, wordy, lacking courtesy):
"Hey, send me the lab file soon. I need it ASAP or we will fail."

// GOOD (Applying Clear, Concise, Concrete, Courteous):
"Dear Rahul,
Could you please share the completed DBMS Lab Sheet 3 by 5:00 PM today? 
Our faculty has scheduled the evaluation for tomorrow morning.
Thank you for your assistance.
Best regards,
Aarav"`,
              output: 'Professional, actionable email adhering to the 7 Cs.'
            }
          ],
          keyPoints: [
            'Feedback is the most critical element that validates successful communication.',
            'Noise can occur at any stage (encoding, transmission, or decoding).',
            'Semantic barriers arise from differences in word interpretation and specialized jargon.',
            'The 7 Cs provide a universal quality benchmark for all engineering correspondence.'
          ],
          mcqs: [
            {
              question: 'Which element is considered the backbone of the communication cycle because it closes the feedback loop?',
              options: ['Channel', 'Encoding', 'Feedback', 'Noise'],
              correctIndex: 2,
              explanation: 'Feedback completes the two-way communication loop and confirms whether the message was decoded accurately.'
            }
          ]
        }
      ]
    },
    {
      id: 'tcs-u2',
      title: 'Unit 2: Professional Correspondence & Workplace Writing',
      description: 'Business letters (full-block layout), email etiquette, executive memos, circulars, and notices.',
      topics: [
        {
          id: 'tcs-t2',
          title: 'Business Letter Formats (Full-Block) & Professional Email Etiquette',
          simpleExplanation: 'Formal business letters follow a standard structure where all elements align to the left margin (Full-Block format). Emails require crisp subject lines, professional salutations, and clear call-to-actions.',
          detailedExplanation: `### Full-Block Business Letter Layout

In the **Full-Block format**, every line begins flush with the left margin (no indentation). Paragraphs are separated by single blank lines:

\`\`\`
[Letterhead / Sender's Address]
ITM SLS Baroda University
Paldi, Vadodara - 391510

[Date in Formal Format]
25 September 2026

[Inside Address of Recipient]
Dr. S. K. Mehta
Head of Department, Computer Science
Engineering College, Gujarat

[Salutation]
Dear Dr. Mehta:

[Subject Line]
Subject: Request for Permission to Organize Technical Hackathon

[Body Paragraph 1 - Introduction & Purpose]
I am writing on behalf of the Computer Science Student Chapter to formally request permission...

[Body Paragraph 2 - Details & Justification]
The proposed hackathon will take place over 24 hours on 15 October 2026 in the Central Lab...

[Body Paragraph 3 - Call to Action / Next Steps]
We would be grateful if you could approve the attached budget outline...

[Complimentary Close]
Sincerely,

[Signature & Printed Name]
Maher Bhatt
President, CSE Tech Club
\`\`\`

### Workplace Email Etiquette Rules:
1. **Subject Line**: Informative and specific (e.g., *"Application for Leave: Maher Bhatt (Roll 101) - 28 Sept"* instead of just *"Leave"*).
2. **Salutation**: Professional greeting (\`Dear Professor Sharma\`, \`Good morning Team\`).
3. **Inverted Pyramid Structure**: State the core conclusion or request in the first two sentences.
4. **Professional Sign-off**: \`Best regards\`, \`Warm regards\`, \`Sincerely\` followed by full credentials and contact details.`,
          shortNotes: 'Full-block format aligns all elements to left margin. Emails require specific subject lines and inverted-pyramid message structure.',
          examples: [
            {
              title: 'Professional Leave Application Email',
              problem: 'Draft an email requesting medical leave for university exams.',
              explanation: 'State purpose, duration, medical documentation attachment, and makeup exam request.',
              code: `Subject: Medical Leave Application — Roll 104 (B.Tech Sem 1)

Dear Faculty Coordinator,

I am writing to inform you that I have been diagnosed with acute viral fever and advised three days of bed rest by the medical officer (certificate attached).

Consequently, I will be unable to attend lectures and the physics lab session from 26 to 28 September 2026. I will coordinate with classmates to complete all missed assignments upon my return.

Thank you for your understanding.

Respectfully,
Aarav Patel
B.Tech CSE - Semester 1
Enrollment No: 2026BT0104`,
              output: 'Complete, courteous email formatted for university records.'
            }
          ],
          keyPoints: [
            'In full-block format, all elements (date, address, body, sign-off) align to the left margin.',
            'Subject lines must be informative, concise, and searchable.',
            'Avoid writing in ALL CAPS (perceived as shouting) or using informal SMS acronyms.',
            'Memos (memorandums) are used exclusively for internal communication within an organization.'
          ],
          mcqs: [
            {
              question: 'In the Full-Block business letter format, where are paragraphs indented?',
              options: ['Indented 5 spaces', 'Indented 0.5 inches', 'Not indented at all (flush left)', 'Indented only for the first paragraph'],
              correctIndex: 2,
              explanation: 'In Full-Block format, all lines begin flush with the left margin with zero indentation.'
            }
          ]
        }
      ]
    },
    {
      id: 'tcs-u3',
      title: 'Unit 3: Technical Reports & Proposal Writing',
      description: 'Formal report architecture, abstract vs executive summary, data presentation, and research ethics.',
      topics: [
        {
          id: 'tcs-t3',
          title: 'Structure of a Formal Technical Report & Executive Summaries',
          simpleExplanation: 'A technical report is a factual, structured document that communicates findings, experimental results, and engineering recommendations. It is divided into Front Matter, Main Body, and Back Matter.',
          detailedExplanation: `### Formal Technical Report Architecture

A formal engineering report is organized into three distinct divisions:

#### 1. Front Matter (Preliminary Sections):
- **Title Page**: Title, author, institutional affiliation, submission date.
- **Letter of Transmittal**: Formal submission cover letter to the client/evaluator.
- **Abstract / Executive Summary**: Concise synopsis of problem, methodology, findings, and recommendations.
- **Table of Contents (ToC)**: Numbered outline with page numbers.
- **List of Figures and Tables**: Separate indices for visual data.

#### 2. Main Body (Core Content):
- **Introduction**: Background, scope, objectives, problem statement, and limitations.
- **Literature Review / Theory**: Underlying scientific/technical principles.
- **Methodology / Procedure**: Detailed description of apparatus, software tools, experiments, and datasets.
- **Results & Discussion**: Data analysis supported by charts, error analysis, and interpretation.
- **Conclusions**: Bulleted takeaways directly addressing the initial objectives.
- **Recommendations**: Actionable engineering decisions based on results.

#### 3. Back Matter (Supplementary Sections):
- **References / Bibliography**: Formatted in IEEE or APA style.
- **Appendices**: Lengthy raw data, source code, derivations, schematics.
- **Glossary**: Definitions of specialized terms.

### Abstract vs Executive Summary:
- **Abstract**: Brief (~150-250 words) academic overview aimed at technical peers.
- **Executive Summary**: Comprehensive (~1-2 pages) summary written for non-technical decision-makers emphasizing business impact, cost, and recommendations.`,
          shortNotes: 'Technical report divisions: Front Matter (Title, Abstract, ToC) -> Main Body (Intro, Methods, Results, Conclusion) -> Back Matter (References, Appendices).',
          examples: [
            {
              title: 'Drafting an Engineering Project Abstract',
              problem: 'Write a model 100-word abstract for an automated IoT weather station project.',
              explanation: 'Include purpose, methodology, key result, and conclusion.',
              code: `This project presents the design and implementation of a low-cost IoT weather monitoring station for agricultural applications. The system utilizes an ESP32 microcontroller integrated with DHT22 temperature-humidity and BMP280 atmospheric pressure sensors to acquire real-time microclimate metrics. Data is transmitted via Wi-Fi over MQTT protocol to an open-source cloud dashboard. Field trials conducted over 14 days demonstrated a measurement accuracy of 98.4% compared to commercial meteorological benchmarks with continuous solar battery operation. The solution provides a scalable, affordable tool for precision irrigation management in rural farming communities.`,
              output: 'Structured, impactful technical abstract.'
            }
          ],
          keyPoints: [
            'Reports follow standard tripartite structure: Front Matter, Main Body, and Back Matter.',
            'Executive summaries focus on recommendations and financial/operational implications.',
            'Visual aids (charts, tables, diagrams) must be labeled with numbered captions and referenced in text.',
            'IEEE citation format uses bracketed sequential numbers [1], [2] in order of appearance.'
          ],
          mcqs: [
            {
              question: 'In a formal technical report, where are extensive raw data tables and source code listings placed?',
              options: ['Executive Summary', 'Introduction', 'Appendices', 'Letter of Transmittal'],
              correctIndex: 2,
              explanation: 'Appendices in the Back Matter store detailed supplementary data, raw test results, and source code.'
            }
          ]
        }
      ]
    },
    {
      id: 'tcs-u4',
      title: 'Unit 4: Oral Communication, Presentation Skills & Non-Verbal Cues',
      description: 'Effective slide design, the 6x6 rule, overcoming stage fright, voice modulation, and kinesics/proxemics.',
      topics: [
        {
          id: 'tcs-t4',
          title: 'Presentation Delivery, The 6x6 Rule & Non-Verbal Communication (Kinesics)',
          simpleExplanation: 'Technical presentations require clean slides with minimal text (the 6x6 rule) and strong body language (eye contact, posture, voice modulation).',
          detailedExplanation: `### Slide Design: The 6x6 Guideline

A common failure in technical presentations is "Death by PowerPoint" — copying full paragraphs onto slides:
- **The 6x6 Rule**: Maximum **6 bullet points per slide**, and maximum **6 words per bullet point**.
- Slides are **visual prompts for the audience**, not reading scripts for the speaker!
- Maintain high contrast: dark text on light backgrounds or vice versa; avoid rainbow color schemes.

### Dimensions of Non-Verbal Communication:
Non-verbal communication accounts for over 65% of the social meaning in face-to-face interaction:

1. **Kinesics (Body Language)**:
   - **Posture**: Stand tall, weight distributed evenly on both feet; avoid slouching or leaning on the podium.
   - **Gestures**: Natural, open-palm hand movements above waist level to emphasize key points.
   - **Eye Contact**: Maintain 3-5 seconds of direct eye contact with audience members across all quadrants.
   - **Facial Expressions**: Congruent with the emotional tone of the content.

2. **Paralanguage (Vocalics)**:
   - **Pitch**: Vary tone to avoid monotone delivery.
   - **Pace / Rate**: Speak at a measured 130-150 words per minute.
   - **Pauses**: Strategic silence before and after critical points allows information to settle.
   - **Volume**: Project clearly to the back row without shouting.

3. **Proxemics (Personal Space)**:
   - Public distance (> 12 feet), Social distance (4-12 feet), Personal distance (1.5-4 feet), Intimate distance (< 1.5 feet).`,
          shortNotes: '6x6 Rule: max 6 bullets, max 6 words per bullet. Kinesics = body language and eye contact. Paralanguage = pitch, pace, pauses. Proxemics = spatial distance.',
          examples: [
            {
              title: 'Slide Text Refactoring using the 6x6 Rule',
              problem: 'Refactor a cluttered slide about cloud computing into a crisp presentation slide.',
              explanation: 'Convert verbose sentences into punchy keywords and conceptual triggers.',
              code: `// CLUTTERED SLIDE (Do NOT do this):
"Cloud computing is an on-demand availability of computer system resources,
especially data storage and computing power, without direct active management
by the user. Large clouds often have functions distributed over multiple locations,
each location being a data center."

// CRISP SLIDE (Applying 6x6 Rule):
• On-demand computing resources
• Eliminates local hardware management
• Scalable elastic data storage
• Multi-region distributed data centers
• Pay-as-you-go cost model`,
              output: 'Clean, professional slide that engages the audience.'
            }
          ],
          keyPoints: [
            'Slides should contain keywords and visuals; the speaker provides the narrative.',
            'Eye contact establishes credibility, trust, and audience rapport.',
            'Vocal variety (pitch, pace, pauses) prevents audience fatigue.',
            'Kinesics includes posture, gestures, eye contact, and facial expressions.'
          ],
          mcqs: [
            {
              question: 'In professional presentations, what does the 6x6 rule advocate?',
              options: [
                '6 slides presented in 6 minutes',
                'Maximum 6 bullet points per slide, max 6 words per bullet',
                '6 lines of code per 6 figures',
                '6 colors per slide on 6 slides'
              ],
              correctIndex: 1,
              explanation: 'The 6x6 rule recommends no more than 6 bullet points per slide, with at most 6 words per point.'
            }
          ]
        }
      ]
    },
    {
      id: 'tcs-u5',
      title: 'Unit 5: Group Discussions, Interviews & Career Readiness',
      description: 'Group Discussion dynamics, resume vs CV, cover letters, and STAR technique for behavioral interviews.',
      topics: [
        {
          id: 'tcs-t5',
          title: 'Group Discussions, Resume Architecture & The STAR Interview Technique',
          simpleExplanation: 'Group Discussions evaluate team skills, leadership, and listening. Resumes highlight skills and accomplishments. The STAR method structures interview answers into Situation, Task, Action, and Result.',
          detailedExplanation: `### Group Discussion (GD) Strategies

In campus placements, GD tests whether an engineering candidate can collaborate in a team:
- **Evaluation Parameters**: Subject knowledge, logical reasoning, listening skills, assertiveness vs aggressiveness, body language.
- **Key Roles**:
  - **Initiator**: Introduces the topic with a definition and broad framework (high risk, high reward).
  - **Moderator**: Keeps the discussion focused when it diverges or becomes chaotic.
  - **Contributor**: Adds fresh perspectives, statistics, and concrete engineering examples.
  - **Summarizer**: Summarizes points objectively without introducing new arguments.

### Resume vs Curriculum Vitae (CV):
- **Resume**: Concise (1-2 pages) summary tailored to a specific job opening; emphasizes relevant skills, projects, and accomplishments.
- **Curriculum Vitae (CV)**: Detailed, exhaustive academic history (publications, teaching, research, awards) used in academic, medical, and scientific roles.

### The STAR Technique for Behavioral Interviews:
When asked situational questions (*"Describe a time you resolved a major team conflict"*), structure your response using STAR:
1. **S — Situation**: Set the context (who, where, when).
2. **T — Task**: Explain the specific challenge or goal you faced.
3. **A — Action**: Detail the steps **YOU** personally took to solve it (use "I", not "we").
4. **R — Result**: Highlight the measurable outcome and what you learned.

> [!TIP] **EXAM TIP:**
> In job interviews, always quantify results using numbers: e.g. *"Optimized database queries, reducing page load time by 38% and saving $4,000 in monthly server costs."*`,
          shortNotes: 'GD assesses teamwork and reasoning; disagree politely. Resume is a tailored 1-page document. STAR: Situation -> Task -> Action -> Result.',
          examples: [
            {
              title: 'Answering a Technical Interview Question with STAR',
              problem: 'Answer: "Tell me about a time a project was failing and how you salvaged it."',
              explanation: 'Walk through Situation, Task, Action, and quantified Result.',
              code: `[Situation]: During our 2nd-year Hackathon, our team had 4 hours left and our API kept crashing under simulated concurrent loads.
[Task]: As the backend lead, I had to identify the bottleneck and stabilize the system before the final jury demo.
[Action]: I profiled the Node.js event loop, identified an unindexed SQL JOIN that blocked threads, added database indexing, and implemented Redis caching for common read queries.
[Result]: Response time dropped from 3200ms to 45ms. Our system handled 1,000 simulated users without dropping a packet, and our team won 2nd place.`,
              output: 'High-impact structured behavioral interview answer.'
            }
          ],
          keyPoints: [
            'Active listening in a GD is as heavily evaluated as speaking time.',
            'Resumes should prioritize quantifiable accomplishments over passive job descriptions.',
            'The STAR method provides a structured, persuasive framework for behavioral questions.',
            'Maintain a polite, assertive tone during technical disputes; attack the problem, not the person.'
          ],
          mcqs: [
            {
              question: 'In the STAR interview methodology, what does the letter "R" stand for?',
              options: ['Reasoning', 'Response', 'Result', 'Review'],
              correctIndex: 2,
              explanation: 'STAR stands for Situation, Task, Action, and Result.'
            }
          ]
        }
      ]
    }
  ]
};
