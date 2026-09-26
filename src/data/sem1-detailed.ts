import { Subject } from './types';

export const sem1DetailedSubjects: Subject[] = [
  {
    id: "sub-phy",
    name: "Engineering Physics",
    code: "PHY",
    color: "bg-purple-600",
    icon: "atom",
    description: "Wave optics, interference, diffraction, and principles of lasers.",
    semester: 1,
    units: [
      {
        id: "phy-u1",
        title: "Unit 1: Wave Optics - Interference & Diffraction",
        description: "Study of light waves, interference patterns, and diffraction phenomena.",
        topics: [
          {
            id: "phy-t1",
            title: "Interference of Light",
            simpleExplanation: "Interference happens when two light waves meet and superimpose, creating a pattern of bright and dark fringes.",
            detailedExplanation: "When two or more light waves from coherent sources overlap, their resultant displacement is the vector sum of their individual displacements. This principle of superposition leads to **Interference**.\n\n### Conditions for Sustained Interference:\n1. The two sources must be **coherent** (constant phase difference).\n2. They must emit light of the same wavelength/frequency.\n3. The amplitudes should be equal or nearly equal.\n4. The sources must be narrow and close to each other.\n\n### Constructive vs Destructive Interference\n- **Constructive Interference**: When the crest of one wave falls on the crest of another, amplitudes add up. The path difference is $n\\lambda$. This creates **Bright Fringes** (Maxima).\n- **Destructive Interference**: When the crest of one wave falls on the trough of another, amplitudes cancel out. The path difference is $(2n+1)\\frac{\\lambda}{2}$. This creates **Dark Fringes** (Minima).\n\n### Young's Double Slit Experiment\nYoung's experiment provided the experimental proof of the wave nature of light. The fringe width $\\beta$ is given by:\n$$\\beta = \\frac{\\lambda D}{d}$$\nWhere $\\lambda$ is wavelength, $D$ is distance to the screen, and $d$ is distance between slits.",
            keyPoints: [
              "Superposition principle: Resultant displacement is the vector sum of individual displacements.",
              "Coherent sources: Constant phase difference is mandatory.",
              "Constructive Interference: Path difference = nλ.",
              "Destructive Interference: Path difference = (2n+1)λ/2.",
              "Fringe width β = λD/d."
            ],
            examples: [
              {
                title: "Calculating Fringe Width",
                problem: "In a Young's Double Slit experiment, the slits are 2mm apart and the screen is 1m away. If light of wavelength 500nm is used, find the fringe width.",
                explanation: "Given: d = 2mm = 2×10^-3 m, D = 1m, λ = 500nm = 500×10^-9 m.\nβ = λD/d = (500×10^-9 * 1) / (2×10^-3) = 250×10^-6 m = 0.25 mm."
              }
            ],
            mcqs: [
              {
                question: "What is the mandatory condition for two sources to produce sustained interference?",
                options: ["They must have different wavelengths", "They must be incoherent", "They must be coherent", "They must have large amplitudes"],
                correctIndex: 2,
                explanation: "Coherent sources maintain a constant phase difference, which is essential for sustained interference patterns."
              },
              {
                question: "In constructive interference, the path difference must be:",
                options: ["nλ", "(2n+1)λ/2", "nλ/2", "(n+1/2)λ"],
                correctIndex: 0,
                explanation: "For constructive interference (maxima), the path difference must be an integral multiple of the wavelength (nλ)."
              }
            ]
          },
          {
            id: "phy-t2",
            title: "Diffraction",
            simpleExplanation: "Diffraction is the bending of light around the corners of an obstacle or aperture.",
            detailedExplanation: "While interference is the superposition of waves from two distinct coherent sources, **Diffraction** is the interference of secondary wavelets originating from different parts of the same wavefront.\n\n### Types of Diffraction:\n1. **Fresnel Diffraction**: The source and screen are at finite distances from the aperture. No lenses are required.\n2. **Fraunhofer Diffraction**: The source and screen are effectively at infinite distances. Lenses are used to focus the parallel rays.\n\n### Single Slit Diffraction (Fraunhofer)\nWhen a monochromatic light of wavelength $\\lambda$ passes through a single slit of width $a$, it produces a central maximum bordered by alternate dark and bright fringes.\n- **Condition for Minima (Dark)**: $a \\sin \\theta = n\\lambda$\n- **Condition for Secondary Maxima (Bright)**: $a \\sin \\theta = (2n+1)\\frac{\\lambda}{2}$\n\nNotice that these conditions are exactly the opposite of interference conditions!",
            keyPoints: [
              "Diffraction: Bending of light around sharp corners.",
              "Fresnel: Finite distance, spherical/cylindrical wavefronts.",
              "Fraunhofer: Infinite distance, plane wavefronts, requires lenses.",
              "Single slit minima condition: a sin(θ) = nλ."
            ],
            examples: [],
            mcqs: [
              {
                question: "In Fraunhofer diffraction, the incident wavefront must be:",
                options: ["Spherical", "Cylindrical", "Plane", "Elliptical"],
                correctIndex: 2,
                explanation: "Fraunhofer diffraction requires the source to be at infinity, so the incident wavefronts are plane."
              }
            ]
          }
        ]
      },
      {
        id: "phy-u2",
        title: "Unit 2: Photonics & LASER",
        description: "Introduction to lasers, population inversion, and the He-Ne laser.",
        topics: [
          {
            id: "phy-t3",
            title: "Fundamentals of LASER",
            simpleExplanation: "LASER stands for Light Amplification by Stimulated Emission of Radiation. It produces highly monochromatic and coherent light.",
            detailedExplanation: "A Laser device emits light through a process of optical amplification based on the stimulated emission of electromagnetic radiation.\n\n### Key Interactions of Light with Matter:\n1. **Induced Absorption**: An atom in a lower energy state $E_1$ absorbs a photon of energy $h\\nu = E_2 - E_1$ and excites to a higher state $E_2$.\n2. **Spontaneous Emission**: The excited atom naturally drops to the lower state, emitting a photon randomly.\n3. **Stimulated Emission**: An incoming photon forces an excited atom to drop to a lower state, emitting a second photon that is exactly in phase, same frequency, and same direction as the incident photon. This is the basis of LASER.\n\n### Requirements for Laser Action:\n- **Population Inversion**: The state where there are more atoms in the excited state than in the ground state. This is highly unnatural and requires 'pumping'.\n- **Active Medium**: The material (gas, liquid, solid) that can achieve population inversion (e.g., Ruby, He-Ne).\n- **Pumping Mechanism**: The energy source used to excite the atoms (optical pumping, electrical discharge).\n- **Optical Resonator**: Two mirrors (one fully reflecting, one partially reflecting) that bounce photons back and forth to trigger a cascade of stimulated emissions.",
            keyPoints: [
              "LASER: Light Amplification by Stimulated Emission of Radiation.",
              "Stimulated emission creates coherent photons.",
              "Population inversion (N2 > N1) is essential for laser action.",
              "Components: Active medium, Pumping source, Optical resonator."
            ],
            examples: [],
            mcqs: [
              {
                question: "What is the fundamental process responsible for the operation of a laser?",
                options: ["Spontaneous Emission", "Stimulated Emission", "Induced Absorption", "Total Internal Reflection"],
                correctIndex: 1,
                explanation: "Stimulated emission produces the coherent, amplified light characteristic of a laser."
              },
              {
                question: "Population inversion means:",
                options: ["More atoms in the ground state", "Equal atoms in both states", "More atoms in the excited state", "No atoms in the excited state"],
                correctIndex: 2,
                explanation: "Population inversion is achieved when the higher energy state has a greater population of atoms than the lower energy state."
              }
            ]
          },
          {
            id: "phy-t4",
            title: "Helium-Neon (He-Ne) Laser",
            simpleExplanation: "A type of gas laser that produces a continuous red beam. Helium acts as a helper to excite Neon, which emits the laser light.",
            detailedExplanation: "The He-Ne laser is a 4-level gas laser that operates continuously (CW - Continuous Wave). It typically emits a red beam at a wavelength of $632.8$ nm.\n\n### Construction\n- **Active Medium**: A mixture of Helium and Neon gases, typically in a ratio of 10:1 inside a narrow discharge tube.\n- **Pumping**: Electrical discharge creates energetic electrons that collide with the gas atoms.\n- **Resonator**: Mirrors at both ends of the tube.\n\n### Working Principle\n1. High-speed electrons from the discharge excite Helium atoms to metastable states.\n2. Since these Helium states have energy levels very close to the excited states of Neon, Helium atoms collide with Neon atoms and transfer their energy. This is called **Resonant Energy Transfer**.\n3. This transfer efficiently pumps Neon atoms to their higher energy state, achieving **Population Inversion** in Neon.\n4. The Neon atoms then undergo stimulated emission, dropping to a lower state and releasing red photons ($632.8$ nm).\n5. The remaining transition back to the ground state occurs via spontaneous emission and collisions with the tube walls.",
            keyPoints: [
              "He-Ne laser is a 4-level gas laser.",
              "Gas mixture ratio is typically 10 Helium : 1 Neon.",
              "Helium is the pumping gas; Neon is the lasing gas.",
              "Pumping mechanism: Electrical discharge followed by resonant energy transfer.",
              "Emits continuous red light at 632.8 nm."
            ],
            examples: [],
            mcqs: [
              {
                question: "In a He-Ne laser, what is the role of Helium?",
                options: ["It emits the laser light", "It absorbs the laser light", "It helps excite Neon atoms to achieve population inversion", "It cools down the laser tube"],
                correctIndex: 2,
                explanation: "Helium atoms are easily excited by the electrical discharge and they transfer this energy to Neon atoms via collisions."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-python",
    name: "Python Programming",
    code: "PYTHON",
    color: "bg-green-600",
    icon: "code",
    description: "Introduction to Python programming, data types, and fundamental logic.",
    semester: 1,
    units: [
      {
        id: "py-u1",
        title: "Unit 1: Programming Fundamentals & Intro",
        description: "Basic programming concepts and an introduction to the Python language.",
        topics: [
          {
            id: "py-t1",
            title: "Introduction to Python",
            simpleExplanation: "Python is a high-level, interpreted language known for its readability and simplicity.",
            detailedExplanation: "Python was created by Guido van Rossum and released in 1991. It emphasizes code readability with its use of significant indentation.\n\n### Key Features of Python:\n1. **Easy to Read and Learn**: Python's syntax is very close to plain English.\n2. **Interpreted**: Code is executed line-by-line, which makes debugging easier.\n3. **Dynamically Typed**: You don't need to declare variable types (e.g., `x = 5` makes `x` an integer automatically).\n4. **Platform Independent**: Python programs can run on Windows, Mac, and Linux without modification.\n5. **Large Standard Library**: Comes with many built-in modules for various tasks (JSON, regex, math, web).\n\n### How Python Executes Code\nUnlike C or Java (which compile to machine code or bytecode beforehand), Python compiles your `.py` source code into intermediate bytecode on the fly, which is then interpreted by the Python Virtual Machine (PVM).",
            keyPoints: [
              "Python is high-level, interpreted, and dynamically typed.",
              "Created by Guido van Rossum in 1991.",
              "Indentation is mandatory and defines code blocks."
            ],
            examples: [
              {
                title: "Hello World",
                problem: "Print a simple message to the screen.",
                explanation: "The `print()` function outputs the provided string to the console.",
                code: "print('Hello, ITM Students!')",
                output: "Hello, ITM Students!"
              }
            ],
            mcqs: [
              {
                question: "Which of the following is NOT a feature of Python?",
                options: ["Interpreted", "Dynamically Typed", "Compiled to Machine Code directly", "Platform Independent"],
                correctIndex: 2,
                explanation: "Python is interpreted via a virtual machine, not compiled directly to machine code like C."
              }
            ]
          },
          {
            id: "py-t2",
            title: "Data Types in Python",
            simpleExplanation: "Data types define what kind of data a variable holds, like numbers, text, or lists.",
            detailedExplanation: "Python has several standard data types used to define the operations possible on them and the storage method.\n\n### Standard Data Types:\n1. **Numeric Types**: \n   - `int`: Whole numbers (e.g., `10`, `-5`)\n   - `float`: Decimal numbers (e.g., `3.14`)\n   - `complex`: Complex numbers (e.g., `3 + 4j`)\n2. **Text Type**: \n   - `str`: Strings are sequences of characters enclosed in quotes (e.g., `\"Hello\"`).\n3. **Boolean Type**:\n   - `bool`: Represents `True` or `False`.\n4. **Sequence Types**:\n   - `list`: Ordered, mutable collection (e.g., `[1, 2, 'three']`).\n   - `tuple`: Ordered, **immutable** collection (e.g., `(1, 2, 3)`).\n5. **Mapping Type**:\n   - `dict`: Key-value pairs (e.g., `{'name': 'John', 'age': 20}`).\n\nYou can use the `type()` function to check the type of any variable.",
            keyPoints: [
              "Numeric: int, float, complex.",
              "String: str (immutable sequence of characters).",
              "List: mutable, defined with square brackets [ ].",
              "Tuple: immutable, defined with parentheses ( ).",
              "Dictionary: mutable key-value pairs, defined with braces { }."
            ],
            examples: [
              {
                title: "Checking Types",
                problem: "Create variables of different types and print their types.",
                explanation: "Use the built-in `type()` function.",
                code: "a = 5\nb = 3.14\nc = 'Hello'\nd = [1, 2, 3]\n\nprint(type(a))\nprint(type(b))\nprint(type(c))\nprint(type(d))",
                output: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'list'>"
              }
            ],
            mcqs: [
              {
                question: "Which of the following is immutable?",
                options: ["List", "Dictionary", "Set", "Tuple"],
                correctIndex: 3,
                explanation: "Tuples are immutable, meaning their elements cannot be changed after creation, unlike Lists or Dictionaries."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-wt",
    name: "Web Technologies",
    code: "WT",
    color: "bg-orange-600",
    icon: "globe",
    description: "Introduction to the World Wide Web, HTML, and basic web development.",
    semester: 1,
    units: [
      {
        id: "wt-u1",
        title: "Unit 1 & 2: WWW and HTML",
        description: "Understanding how the web works and structuring pages with HTML.",
        topics: [
          {
            id: "wt-t1",
            title: "Introduction to World Wide Web (WWW)",
            simpleExplanation: "The WWW is an information system where documents (web pages) are identified by URLs and linked via hypertext.",
            detailedExplanation: "Invented by Tim Berners-Lee in 1989, the World Wide Web is a global collection of documents and other resources, linked by hyperlinks and URIs.\n\n### Key Concepts:\n- **Internet vs WWW**: The Internet is the underlying network of networks (hardware/infrastructure). The WWW is an application that runs on top of the Internet, dealing with linked web pages.\n- **HTTP/HTTPS**: Hypertext Transfer Protocol. The foundation of data communication for the WWW. HTTPS is the secure, encrypted version.\n- **URL**: Uniform Resource Locator. The address of a web page.\n- **Web Server**: A computer system that processes requests via HTTP and serves web pages to users.\n- **Web Browser**: A software application for accessing information on the WWW (e.g., Chrome, Firefox).",
            keyPoints: [
              "WWW was invented by Tim Berners-Lee in 1989.",
              "Internet = infrastructure (hardware/network).",
              "WWW = service (software/hyperlinked documents).",
              "HTTP is the protocol used for transferring web data."
            ],
            examples: [],
            mcqs: [
              {
                question: "What is the difference between the Internet and the World Wide Web?",
                options: ["They are exactly the same thing", "The Internet is hardware, the Web is a service on top of it", "The Web is older than the Internet", "The Internet is only for emails"],
                correctIndex: 1,
                explanation: "The Internet is the global network of computers, while the Web is the collection of linked documents that you access via the Internet."
              }
            ]
          },
          {
            id: "wt-t2",
            title: "HTML Fundamentals",
            simpleExplanation: "HTML (HyperText Markup Language) is the standard markup language used to structure content on the web.",
            detailedExplanation: "HTML uses 'tags' to define the structure of a web page. It tells the browser what is a heading, what is a paragraph, where images go, etc.\n\n### Basic HTML Structure:\n```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Page Title</title>\n  </head>\n  <body>\n    <h1>This is a Heading</h1>\n    <p>This is a paragraph.</p>\n  </body>\n</html>\n```\n\n### Important Tags:\n- `<h1>` to `<h6>`: Headings (h1 is most important, h6 is least).\n- `<p>`: Paragraph.\n- `<a href=\"url\">`: Anchor tag for hyperlinks.\n- `<img src=\"url\" alt=\"text\">`: Image tag.\n- `<ul>` and `<li>`: Unordered list and list items.\n- `<table>`, `<tr>`, `<td>`: Tables, rows, and data cells.\n\n**Attributes** provide additional information about HTML elements (e.g., `href` in `<a>` or `src` in `<img>`).",
            keyPoints: [
              "HTML stands for HyperText Markup Language.",
              "It provides the structure/skeleton of a web page.",
              "HTML elements are defined by tags enclosed in angle brackets <>.",
              "<!DOCTYPE html> tells the browser this is an HTML5 document."
            ],
            examples: [
              {
                title: "Creating a Hyperlink",
                problem: "Write the HTML code to create a link to Google.",
                explanation: "Use the anchor `<a>` tag with the `href` attribute.",
                code: "<a href=\"https://google.com\">Visit Google</a>"
              }
            ],
            mcqs: [
              {
                question: "Which HTML tag is used to define an image?",
                options: ["<picture>", "<image>", "<img>", "<src>"],
                correctIndex: 2,
                explanation: "The <img> tag is used to embed an image in an HTML page."
              },
              {
                question: "What is the correct HTML element for the largest heading?",
                options: ["<h6>", "<head>", "<h1>", "<heading>"],
                correctIndex: 2,
                explanation: "<h1> defines the most important and largest heading."
              }
            ]
          }
        ]
      }
    ]
  }
];
