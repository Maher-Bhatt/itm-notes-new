import type { Subject } from './types';

export const sem1WtSubject: Subject = {
  id: 'sem1-wt',
  name: 'Web Technology',
  code: 'WT102',
  color: 'bg-blue-600',
  icon: 'globe',
  description: 'Foundational Web Technology — Internet Architecture, HTML5 Semantic Markup, CSS3 Flexbox & Grid, JavaScript DOM Manipulation, and Form Validation',
  semester: 1,
  units: [
    {
      id: 'wt-u1',
      title: 'Unit 1: World Wide Web & Internet Architecture',
      description: 'WWW history, Client-Server model, HTTP/HTTPS protocols, DNS resolution, and Web standards.',
      topics: [
        {
          id: 'wt-t1',
          title: 'Internet vs WWW, Client-Server Architecture & HTTP/HTTPS Protocols',
          simpleExplanation: 'The Internet is the global network of physical cables and computers. The World Wide Web (WWW) is an information-sharing service built on top of the internet using HTTP and web pages.',
          detailedExplanation: `### Internet vs World Wide Web (WWW)

- **Internet**: The global hardware infrastructure of interconnected computer networks communicating via the TCP/IP protocol suite (invented in the late 1960s via ARPANET).
- **World Wide Web (WWW)**: A software service invented by Tim Berners-Lee in 1989 at CERN that allows documents to be linked and retrieved across the internet using hyperlinks and URLs.

### Client-Server Architecture:
The web operates strictly on a **Client-Server Request-Response model**:
1. **Client (Web Browser)**: Google Chrome, Safari, Firefox. Formulates an HTTP request and renders returned HTML/CSS/JS.
2. **Server (Web Host)**: Nginx, Apache, Node.js. Listens on ports 80 (HTTP) or 443 (HTTPS), processes incoming requests, and returns response resources with status codes.

### HTTP vs HTTPS:
- **HTTP (Hypertext Transfer Protocol)**: Operates on port 80 in plaintext. Susceptible to packet sniffing and Man-in-the-Middle (MITM) attacks.
- **HTTPS (HTTP Secure)**: Operates on port 443. Wraps HTTP traffic inside an encrypted **TLS/SSL (Transport Layer Security)** tunnel, ensuring:
  1. **Confidentiality**: Data cannot be read in transit.
  2. **Integrity**: Data cannot be tampered with.
  3. **Authentication**: Verifies the server identity via digital certificates.

### HTTP Status Code Ranges:
- **1xx (Informational)**: \`100 Continue\`
- **2xx (Success)**: \`200 OK\`, \`201 Created\`
- **3xx (Redirection)**: \`301 Moved Permanently\`, \`304 Not Modified\`
- **4xx (Client Errors)**: \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`
- **5xx (Server Errors)**: \`500 Internal Server Error\`, \`502 Bad Gateway\`, \`503 Service Unavailable\``,
          shortNotes: 'Internet is the physical network; WWW is the hypertext service on top. HTTP (port 80) is plain text; HTTPS (port 443) uses TLS encryption.',
          examples: [
            {
              title: 'HTTP Request & Response Flow',
              problem: 'Illustrate the raw HTTP GET request and response headers exchanged between a browser and a server.',
              explanation: 'A client sends headers specifying method, path, and host; the server replies with a status code, content-type, and body.',
              code: `GET /index.html HTTP/1.1
Host: www.itmuniversity.ac.in
User-Agent: Mozilla/5.0
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1024

<!DOCTYPE html>
<html><body><h1>Welcome to ITM Baroda</h1></body></html>`,
              output: 'Status: 200 OK | Rendered in Browser'
            }
          ],
          keyPoints: [
            'Tim Berners-Lee invented the World Wide Web in 1989.',
            'HTTP is a stateless application-layer protocol operating on TCP port 80.',
            'HTTPS encrypts web traffic using TLS/SSL over port 443.',
            'DNS (Domain Name System) translates human-readable domain names into IP addresses.'
          ],
          mcqs: [
            {
              question: 'Which default port number is utilized by secure HTTPS web communication?',
              options: ['80', '21', '443', '8080'],
              correctIndex: 2,
              explanation: 'HTTPS operates over TCP port 443 by default, whereas unencrypted HTTP uses port 80.'
            }
          ]
        }
      ]
    },
    {
      id: 'wt-u2',
      title: 'Unit 2: HTML & HTML5 Semantic Document Structure',
      description: 'HTML5 document structure, text elements, tables, forms, input types, and modern semantic tags.',
      topics: [
        {
          id: 'wt-t2',
          title: 'HTML5 Document Structure & Semantic Tags',
          simpleExplanation: 'HTML5 provides semantic elements like <header>, <nav>, <article>, and <footer> that clearly describe their meaning to both the browser and search engines.',
          detailedExplanation: `### Anatomy of a Valid HTML5 Document

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>University Portal</title>
</head>
<body>
    <header>
        <h1>ITM SLS Baroda University</h1>
        <nav>
            <ul>
                <li><a href="#notes">Notes</a></li>
                <li><a href="#lab">Lab</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="notes">
            <article>
                <h2>Web Technology Study Guide</h2>
                <p>Complete notes covering HTML, CSS, and JS.</p>
            </article>
        </section>
        <aside>
            <h3>Exam Notice</h3>
            <p>Mid-sem exams begin next month.</p>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 ITM University</p>
    </footer>
</body>
</html>
\`\`\`

### Why HTML5 Semantic Elements Matter:
1. **Search Engine Optimization (SEO)**: Google and web crawlers index content based on tag hierarchy (\`<article>\`, \`<h1>\`, \`<main>\`).
2. **Accessibility (a11y)**: Screen readers for visually impaired users navigate directly to \`<nav>\` or \`<main>\`.
3. **Maintainability**: Clean structure replaces messy generic \`<div class="header">\` tags with readable native \`<header>\` elements.`,
          shortNotes: 'HTML5 semantic tags: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>. Improves SEO and accessibility.',
          examples: [
            {
              title: 'Comprehensive HTML Form with HTML5 Input Types',
              problem: 'Create an admission registration form with validation constraints.',
              explanation: 'HTML5 introduced native types like email, number, date with required and pattern validation attributes.',
              code: `<form action="/submit" method="POST">
    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required minlength="3">

    <label for="email">College Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="sem">Current Semester:</label>
    <input type="number" id="sem" name="sem" min="1" max="8" value="1">

    <button type="submit">Submit Registration</button>
</form>`,
              output: 'Renders an accessible form with built-in client validation.'
            }
          ],
          keyPoints: [
            '<!DOCTYPE html> declares the document as HTML5.',
            'Semantic tags convey meaning to browsers, developers, and search engine crawlers.',
            'HTML5 form inputs include email, url, number, date, and color with native validation.',
            'The viewport meta tag is essential for responsive mobile rendering.'
          ],
          mcqs: [
            {
              question: 'Which HTML5 semantic tag is designated for tangential, sidebar content?',
              options: ['<sidebar>', '<aside>', '<section>', '<nav>'],
              correctIndex: 1,
              explanation: 'The <aside> element defines content tangentially related to the main content (e.g. sidebars or pull quotes).'
            }
          ]
        },
        {
          id: 'wt-t2b',
          title: 'HTML Tables, Complex Forms, Input Constraints & Multimedia Tags',
          simpleExplanation: 'HTML tables organize tabular data using rows, header cells, and column/row spans. HTML forms gather student input with specialized controls, validation rules, and multimedia support.',
          detailedExplanation: `### 1. HTML5 Tables & Tabular Data Architecture

Tables present structured relational or matrix information:
- \`<table>\`: Container element.
- \`<caption>\`: Table title.
- \`<thead>\`: Header section containing column titles.
- \`<tbody>\`: Main data rows.
- \`<tfoot>\`: Summary or total row.
- \`<tr>\`: Table row.
- \`<th>\`: Header cell (bold and centered by default).
- \`<td>\`: Standard data cell.

#### Merging Cells:
- \`colspan="N"\`: Stretches a cell across $N$ columns.
- \`rowspan="N"\`: Stretches a cell down across $N$ rows.

\`\`\`html
<table border="1" cellpadding="8">
    <caption>Semester 1 Examination Timetable</caption>
    <thead>
        <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Max Marks</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">28 Nov</td>
            <td>Engineering Physics (PHY102)</td>
            <td>70</td>
        </tr>
        <tr>
            <td>Python Programming (PY101)</td>
            <td>70</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Total Core Evaluation</td>
            <td>140</td>
        </tr>
    </tfoot>
</table>
\`\`\`

### 2. Comprehensive HTML Form Controls

The \`<form>\` tag submits client data to a backend endpoint:
- **Attributes**:
  - \`action="/api/register"\`: Destination URL.
  - \`method="GET" | "POST"\`: \`GET\` appends data to URL query parameters (search bars); \`POST\` sends data securely inside the HTTP request body (passwords, file uploads).
  - \`enctype="multipart/form-data"\`: Mandatory when uploading files.

#### Specialized Form Controls:
\`\`\`html
<form action="/save" method="POST" enctype="multipart/form-data">
    <fieldset>
        <legend>Personal Information</legend>
        
        <!-- Text & Password Inputs -->
        <input type="text" name="username" placeholder="Roll Number" required>
        <input type="password" name="password" minlength="8" required>
        
        <!-- Radio Buttons (Mutual exclusion via identical name attribute) -->
        <label><input type="radio" name="gender" value="male"> Male</label>
        <label><input type="radio" name="gender" value="female"> Female</label>
        
        <!-- Checkboxes -->
        <label><input type="checkbox" name="agree" required> I accept university rules</label>
        
        <!-- Dropdown Selector -->
        <select name="branch" required>
            <option value="">-- Select Branch --</option>
            <option value="cse">Computer Science (CSE)</option>
            <option value="it">Information Technology (IT)</option>
        </select>
        
        <!-- Multi-line Text Area -->
        <textarea name="remarks" rows="3" cols="30"></textarea>
        
        <!-- File Upload -->
        <input type="file" name="resume" accept=".pdf,.docx">
        
        <!-- Buttons -->
        <button type="submit">Submit Form</button>
        <button type="reset">Clear Entries</button>
    </fieldset>
</form>
\`\`\`

### 3. Native Multimedia Tags: \`<audio>\` & \`<video>\`
HTML5 eliminated third-party flash plugins with native browser media engines:
\`\`\`html
<!-- Video player with fallback format support -->
<video width="640" height="360" controls poster="poster.jpg">
    <source src="lecture1.mp4" type="video/mp4">
    <source src="lecture1.webm" type="video/webm">
    Your browser does not support HTML5 video.
</video>

<!-- Audio player -->
<audio controls loop>
    <source src="pronunciation.mp3" type="audio/mpeg">
</audio>
\`\`\`

> [!TIP] **EXAM TIP:**
> For university 7-mark questions on "Design an HTML registration form", always draw and code a form using \`<fieldset>\`, \`<legend>\`, \`<select>\`, radio buttons with identical \`name\` attributes, and a submit button with \`POST\` method!`,
          shortNotes: 'Tables: table, tr, th, td with colspan/rowspan. Forms: method (GET vs POST), fieldset, radio, select, input types. Multimedia: audio and video with controls.',
          examples: [
            {
              title: 'Student Grade Table with Colspan & Rowspan',
              problem: 'Create a clean HTML table displaying theory and practical marks.',
              explanation: 'Use the thead, tbody structure with rowspan on subject names.',
              code: `<table border="1">
    <tr>
        <th rowspan="2">Subject</th>
        <th colspan="2">Marks</th>
    </tr>
    <tr>
        <th>Theory</th>
        <th>Practical</th>
    </tr>
    <tr>
        <td>Python 1</td>
        <td>68</td>
        <td>28</td>
    </tr>
</table>`,
              output: 'Renders a structured 2x2 merged grid with appropriate table headers.'
            }
          ],
          keyPoints: [
            'rowspan spans multiple rows vertically; colspan spans multiple columns horizontally.',
            'Radio buttons must share the exact same name attribute to enforce single-choice selection.',
            'POST method hides payload in request body; GET exposes data in the browser URL query string.',
            'enctype="multipart/form-data" is mandatory whenever an input type="file" is present.'
          ],
          mcqs: [
            {
              question: 'Which HTML attribute enables radio buttons to function as mutually exclusive options?',
              options: ['type', 'id', 'name', 'value'],
              correctIndex: 2,
              explanation: 'Radio buttons sharing the same name attribute belong to one mutual exclusion group.'
            },
            {
              question: 'Which attribute merges 3 adjacent table columns into a single cell?',
              options: ['rowspan="3"', 'colspan="3"', 'span="3"', 'colwidth="3"'],
              correctIndex: 1,
              explanation: 'colspan="3" merges 3 columns horizontally.'
            }
          ]
        }
      ]
    },
    {
      id: 'wt-u3',
      title: 'Unit 3: CSS3 Styling, Box Model & Modern Flexbox',
      description: 'Selectors, Box Model calculation, layout positioning, CSS Flexbox architecture, and responsive media queries.',
      topics: [
        {
          id: 'wt-t3',
          title: 'The CSS Box Model & Layout Positioning',
          simpleExplanation: 'Every HTML element is a rectangular box made of four layers: Content, Padding (space inside), Border, and Margin (space outside).',
          detailedExplanation: `### The CSS Box Model

\`\`\`
   +---------------------------------------------+
   |                   MARGIN                    |
   |   +-------------------------------------+   |
   |   |               BORDER                |   |
   |   |   +-----------------------------+   |   |
   |   |   |           PADDING           |   |   |
   |   |   |   +---------------------+   |   |   |
   |   |   |   |       CONTENT       |   |   |   |
   |   |   |   |   (width x height)  |   |   |   |
   |   |   |   +---------------------+   |   |   |
   |   |   +-----------------------------+   |   |
   |   +-------------------------------------+   |
   +---------------------------------------------+
\`\`\`

### Total Element Width Calculation:
1. **Standard Box Model (\`box-sizing: content-box\`)**:
   $$\\text{Total Width} = \\text{width} + \\text{left/right padding} + \\text{left/right border} + \\text{left/right margin}$$
2. **Modern Border Box (\`box-sizing: border-box\`)**:
   - The defined \`width\` **includes padding and borders**!
   - Best practice universal reset:
   \`\`\`css
   *, *::before, *::after {
       box-sizing: border-box;
       margin: 0;
       padding: 0;
   }
   \`\`\`

### CSS Positioning:
- **static** (default): Normal document flow.
- **relative**: Positioned relative to its normal position without affecting other elements.
- **absolute**: Positioned relative to its closest non-static ancestor.
- **fixed**: Positioned relative to the viewport (stays put when scrolling).
- **sticky**: Toggles between relative and fixed depending on scroll offset.`,
          shortNotes: 'Box Model: Content -> Padding -> Border -> Margin. Use box-sizing: border-box for predictable layouts.',
          examples: [
            {
              title: 'Centering a Card Using Modern CSS Flexbox',
              problem: 'Center an element horizontally and vertically on a page using Flexbox.',
              explanation: 'Use display: flex, justify-content: center (main axis), and align-items: center (cross axis).',
              code: `.hero-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8fafc;
}

.login-card {
    width: 380px;
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`,
              output: 'Centers login card perfectly in both dimensions across all screen sizes.'
            }
          ],
          keyPoints: [
            'CSS box model consists of content, padding, border, and margin in order.',
            'box-sizing: border-box includes padding and borders in the element total dimensions.',
            'Flexbox provides 1-dimensional layout control via justify-content and align-items.',
            '@media screen and (max-width: 768px) creates breakpoints for mobile responsive layouts.'
          ],
          mcqs: [
            {
              question: 'Which CSS property ensures padding and border are included inside the specified width?',
              options: ['box-sizing: content-box', 'box-sizing: border-box', 'display: flex', 'overflow: hidden'],
              correctIndex: 1,
              explanation: 'box-sizing: border-box forces padding and borders to be included within the element declared width and height.'
            }
          ]
        }
      ]
    },
    {
      id: 'wt-u4',
      title: 'Unit 4: Client-Side JavaScript & DOM Manipulation',
      description: 'JavaScript syntax, variable scoping, functions, event handling, and Document Object Model (DOM) APIs.',
      topics: [
        {
          id: 'wt-t4',
          title: 'DOM Tree Architecture, Element Selection & Event Listeners',
          simpleExplanation: 'The Document Object Model (DOM) is a tree-like representation of HTML tags created by the browser. JavaScript can add, remove, and modify elements and styles in real-time.',
          detailedExplanation: `### The Document Object Model (DOM)

When an HTML file loads, the browser parses it into an in-memory object tree where every tag is a **Node / Element**:

\`\`\`
              window
                |
             document
                |
              <html>
             /      \\
         <head>    <body>
          /          /    \\
      <title>      <h1>   <button id="btn">
\`\`\`

### Modern DOM Query Methods:
- \`document.getElementById("btn")\`: Fast, returns a single element by its ID.
- \`document.querySelector(".card")\`: Returns the first element matching a CSS selector.
- \`document.querySelectorAll("p")\`: Returns a static \`NodeList\` of all matching elements.

### Attaching Event Listeners:
Instead of inline HTML attributes (\`onclick="..."\`), always use \`addEventListener\`:

\`\`\`javascript
const btn = document.getElementById("theme-toggle");
btn.addEventListener("click", (e) => {
    document.body.classList.toggle("dark-mode");
});
\`\`\`

### Manipulating Content and Styles:
- Text: \`elem.textContent = "Updated Text";\`
- HTML: \`elem.innerHTML = "<span>Bold</span>";\`
- Attributes: \`elem.setAttribute("href", "/new-url");\`
- CSS: \`elem.style.backgroundColor = "#2563eb";\``,
          shortNotes: 'DOM is an object tree representing HTML. Use querySelector and addEventListener. Prefer textContent over innerHTML for security (XSS prevention).',
          examples: [
            {
              title: 'Interactive Attendance Calculator DOM Script',
              problem: 'Create a JavaScript event listener that updates student attendance status dynamically.',
              explanation: 'Read values from inputs on button click and display results inside a designated paragraph.',
              code: `const calcBtn = document.querySelector("#calc-btn");
const outputText = document.querySelector("#result");

calcBtn.addEventListener("click", () => {
    const total = Number(document.querySelector("#total").value);
    const attended = Number(document.querySelector("#attended").value);
    
    if (total <= 0 || attended < 0) {
        outputText.textContent = "Please enter valid class counts.";
        return;
    }
    
    const percentage = ((attended / total) * 100).toFixed(1);
    outputText.textContent = \`Attendance: \${percentage}%\`;
    outputText.style.color = percentage >= 75 ? "green" : "red";
});`,
              output: 'Dynamically computes percentage and toggles color without reloading page.'
            }
          ],
          keyPoints: [
            'DOM represents the HTML structure as a node tree accessible via JavaScript.',
            'addEventListener enables multiple listeners on the same element without overwriting.',
            'Use textContent rather than innerHTML to avoid Cross-Site Scripting (XSS) vulnerabilities.',
            'event.preventDefault() stops default browser actions like form submissions or link navigation.'
          ],
          mcqs: [
            {
              question: 'Which method is the modern, flexible way to select the first matching element using a CSS selector?',
              options: ['document.getElementByName()', 'document.querySelector()', 'document.cssSelect()', 'document.find()'],
              correctIndex: 1,
              explanation: 'document.querySelector() accepts any CSS selector string and returns the first matching DOM element.'
            }
          ]
        }
      ]
    },
    {
      id: 'wt-u5',
      title: 'Unit 5: Form Validation, Regular Expressions & JSON',
      description: 'Client-side input verification, regex pattern matching, JSON serialization, and AJAX/Fetch fundamentals.',
      topics: [
        {
          id: 'wt-t5',
          title: 'Client-Side Form Validation & Regular Expressions (Regex)',
          simpleExplanation: 'Client-side validation checks student input before submitting it to the server. Regular expressions (regex) check if inputs match required patterns like valid email addresses or passwords.',
          detailedExplanation: `### Why Client-Side Validation is Essential

1. **User Experience (UX)**: Immediate feedback without waiting for a server round-trip.
2. **Bandwidth Reduction**: Prevents sending malformed or incomplete data over the network.
*(Note: Client validation is never a substitute for server-side validation, as client code can be bypassed).*

### Regular Expressions (RegExp):
A sequence of characters that forms a search/validation pattern:
- \`^\`: Start of string
- \`$\`: End of string
- \`[a-zA-Z]\`: Any letter
- \`\\d\`: Any digit (\`[0-9]\`)
- \`+\`: One or more times
- \`{8,}\`: At least 8 characters

### Common Regex Patterns:
- **Email Validation**:
  \`\`\`javascript
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  \`\`\`
- **Indian Phone Number (10 Digits)**:
  \`\`\`javascript
  const phoneRegex = /^[6-9]\\d{9}$/;
  \`\`\`

### JSON (JavaScript Object Notation):
The universal, lightweight data-interchange format:
- \`JSON.stringify(obj)\`: Converts a JavaScript object into a JSON string for transmission.
- \`JSON.parse(str)\`: Parses a JSON string back into a JavaScript object.`,
          shortNotes: 'Client validation gives immediate UX feedback. Regex tests string patterns. JSON.stringify() encodes; JSON.parse() decodes.',
          examples: [
            {
              title: 'Form Submission Validator with Regex',
              problem: 'Validate student enrollment form before allowing submission.',
              explanation: 'Intercept onsubmit event, test inputs against regex patterns, and halt submission if invalid.',
              code: `const form = document.querySelector("#reg-form");
const emailInput = document.querySelector("#email");
const errorMsg = document.querySelector("#error");

form.addEventListener("submit", (e) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    
    if (!emailRegex.test(emailInput.value)) {
        e.preventDefault(); // Stop form submission
        errorMsg.textContent = "Please enter a valid university email address.";
        emailInput.focus();
    }
});`,
              output: 'Blocks invalid submissions and displays error message.'
            }
          ],
          keyPoints: [
            'Client validation enhances UX; server validation guarantees data security.',
            'event.preventDefault() halts form submission when invalid input is detected.',
            'RegExp.prototype.test() returns boolean true if string matches pattern.',
            'JSON is a text-based format supported natively by all modern programming languages.'
          ],
          mcqs: [
            {
              question: 'Which method serializes a JavaScript object into a JSON-formatted string?',
              options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toText()', 'JSON.encode()'],
              correctIndex: 1,
              explanation: 'JSON.stringify() converts a JavaScript object into a JSON string.'
            }
          ]
        }
      ]
    }
  ]
};
