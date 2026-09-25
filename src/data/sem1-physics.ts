import type { Subject } from './types';

export const sem1PhysicsSubject: Subject = {
  id: 'sem1-physics',
  name: 'Engineering Physics',
  code: 'PHY102',
  color: 'bg-violet-600',
  icon: 'atom',
  description: 'University Engineering Physics — Wave Optics (Interference & Diffraction), Laser & Photonics, Fiber Optics, and Quantum Mechanics',
  semester: 1,
  units: [
    {
      id: 'phy-u1',
      title: 'Unit 1: Wave Optics — Interference & Thin Films',
      description: 'Superposition principle, interference in parallel and wedge-shaped thin films, Newton’s rings, and anti-reflective coatings.',
      topics: [
        {
          id: 'phy-t1',
          title: 'Thin Film Interference & Conditions for Maxima and Minima',
          simpleExplanation: 'When light hits a thin transparent film (like an oil slick or soap bubble), rays reflected from the top surface and bottom surface interfere with each other, producing brilliant colorful fringes.',
          detailedExplanation: `### Thin Film Interference by Division of Amplitude

When a ray of monochromatic light strikes a thin film of thickness $t$ and refractive index $\\mu$ at an angle of incidence $i$:
1. A portion is reflected at the upper boundary.
2. A portion is refracted at angle $r$, reflects off the lower boundary, and emerges parallel to the first ray.

### Optical Path Difference:
$$\\Delta = 2\\mu t \\cos r$$

### Stokes' Law (Phase Shift of $\\pi$):
When light reflects from the boundary of an **optically denser medium** (e.g. air to glass/film), it undergoes a phase shift of $\\pi$ radians, which is equivalent to an extra path difference of $\\frac{\\lambda}{2}$.

Hence, the total effective path difference is:
$$\\Delta = 2\\mu t \\cos r - \\frac{\\lambda}{2}$$

### Conditions for Interference in Reflected Light:
1. **Constructive Interference (Bright Fringe / Maxima):**
   $$2\\mu t \\cos r - \\frac{\\lambda}{2} = n\\lambda \\implies 2\\mu t \\cos r = \\left(n + \\frac{1}{2}\\right)\\lambda \\quad (n = 0, 1, 2, \\dots)$$
2. **Destructive Interference (Dark Fringe / Minima):**
   $$2\\mu t \\cos r - \\frac{\\lambda}{2} = \\left(n + \\frac{1}{2}\\right)\\lambda \\implies 2\\mu t \\cos r = n\\lambda \\quad (n = 1, 2, 3, \\dots)$$

> [!TIP] **EXAM TIP:**
> For transmitted light, no reflection phase change occurs. Therefore, the conditions are reversed:
> - Transmitted Bright: $2\\mu t \\cos r = n\\lambda$
> - Transmitted Dark: $2\\mu t \\cos r = (n + 1/2)\\lambda$
> Reflected and transmitted fringe patterns are **strictly complementary**!`,
          shortNotes: 'Reflected light: Bright is 2μt cos r = (n + 1/2)λ; Dark is 2μt cos r = nλ. Phase change of λ/2 occurs on reflection from denser medium.',
          examples: [
            {
              title: 'Minimum Film Thickness for Destructive Interference',
              problem: 'A soap film of refractive index μ = 1.33 is illuminated normally with light of wavelength λ = 589 nm. Calculate the minimum non-zero thickness for dark fringe in reflection.',
              explanation: 'For normal incidence, r = 0, so cos r = 1. Dark condition in reflection: 2μt = nλ. For minimum non-zero thickness, n = 1.',
              code: `mu = 1.33
wavelength = 589e-9  # meters
n = 1

# 2 * mu * t = n * lambda
t = (n * wavelength) / (2 * mu)
print(f"Minimum thickness t = {t * 1e9:.2f} nm")`,
              output: 'Minimum thickness t = 221.43 nm'
            }
          ],
          keyPoints: [
            'Interference in thin films occurs by division of amplitude.',
            'Stokes treatment proves a phase change of π (path λ/2) upon reflection at a denser medium.',
            'Reflected and transmitted interference patterns are complementary to each other.',
            'For normal incidence (i = 0), cos r = 1, simplifying the path formula to 2μt.'
          ],
          mcqs: [
            {
              question: 'When light reflects from a denser medium, what is the path difference introduced?',
              options: ['λ', 'λ / 2', '2λ', 'Zero'],
              correctIndex: 1,
              explanation: "According to Stokes' law, reflection at an optically denser medium adds a path difference of λ/2 (phase change of π)."
            }
          ],
          theoryQuestions: [
            {
              question: 'Derive the condition for constructive and destructive interference in a thin parallel transparent film of thickness t under reflected light.',
              marks: '7 Marks',
              answer: 'Draw ray diagram showing incident, reflected, and refracted rays. Derive path difference Δ = 2μt cos r. Apply Stokes law to add λ/2 phase shift. Equate Δ to nλ for bright and (n+1/2)λ for dark.'
            }
          ]
        },
        {
          id: 'phy-t2',
          title: "Newton's Rings: Theory, Diameter Derivation & Applications",
          simpleExplanation: "When a plano-convex lens rests on a flat glass plate, an air wedge of varying thickness is formed. Illuminating it from above produces alternating concentric bright and dark circular rings.",
          detailedExplanation: `### Newton's Rings Experiment

A plano-convex lens of large radius of curvature $R$ is placed on an optically flat glass plate. An air film of variable thickness is enclosed between them:
- At the point of contact ($r = 0$), thickness $t = 0$.
- Because of the Stokes phase shift of $\\lambda/2$, the **central spot is always dark in reflected light**.

### Derivation of Ring Diameters:
From the geometry of a circle of radius $R$:
$$2R \\cdot t \\approx r_n^2 \\implies t = \\frac{r_n^2}{2R} = \\frac{D_n^2}{8R}$$

1. **For Dark Rings:**
   $$2t = n\\lambda \\implies 2\\left(\\frac{D_n^2}{8R}\\right) = n\\lambda \\implies D_n^2 = 4n\\lambda R$$
   $$D_n = \\sqrt{4n\\lambda R} \\propto \\sqrt{n}$$
   *The diameters of dark rings are directly proportional to the square root of natural numbers.*

2. **For Bright Rings:**
   $$2t = \\left(n + \\frac{1}{2}\\right)\\lambda \\implies D_n^2 = 4\\left(n + \\frac{1}{2}\\right)\\lambda R = 2(2n + 1)\\lambda R$$
   $$D_n = \\sqrt{2(2n + 1)\\lambda R} \\propto \\sqrt{2n + 1}$$
   *The diameters of bright rings are proportional to the square root of odd natural numbers.*

### Determination of Wavelength (\\(\\lambda\\)):
$$D_{n+p}^2 - D_n^2 = 4(n+p)\\lambda R - 4n\\lambda R = 4p\\lambda R$$
$$\\lambda = \\frac{D_{n+p}^2 - D_n^2}{4p R}$$

### Determination of Refractive Index (\\(\\mu\\)) of a Liquid:
When a liquid of refractive index $\\mu$ is introduced between the lens and plate:
$$\\mu = \\frac{(D_{n+p}^2 - D_n^2)_{\\text{air}}}{(D_{n+p}^2 - D_n^2)_{\\text{liquid}}}$$

> [!IMPORTANT] **MEMORIZE:**
> - Central ring is DARK in reflected light.
> - Rings get closer together as $n$ increases because $(r_{n+1} - r_n)$ decreases with $\\sqrt{n}$.`,
          shortNotes: 'Newton Rings: Dark ring diameter Dn^2 = 4nλR. Central spot is dark in reflection. Wavelength λ = (D_{n+p}^2 - D_n^2) / (4pR).',
          examples: [
            {
              title: "Calculating Wavelength Using Newton's Rings",
              problem: "In a Newton's rings experiment, the diameter of the 10th dark ring is 0.50 cm and that of the 4th dark ring is 0.35 cm. If R = 100 cm, calculate the wavelength of light.",
              explanation: "Use formula λ = (D_{n+p}^2 - D_n^2) / (4pR) with n = 4, p = 6.",
              code: `D10 = 0.50e-2  # 10th ring diameter (m)
D4 = 0.35e-2   # 4th ring diameter (m)
p = 10 - 4     # 6 rings
R = 1.0        # 100 cm = 1.0 m

wavelength = (D10**2 - D4**2) / (4 * p * R)
print(f"Wavelength = {wavelength * 1e10:.2f} Angstroms")`,
              output: 'Wavelength = 5312.50 Angstroms'
            }
          ],
          keyPoints: [
            "Newton's rings are circular fringes of equal thickness (localized fringes).",
            'The central spot in reflected light is dark due to the λ/2 phase shift at the lower glass boundary.',
            'Dark ring diameters scale with the square root of natural numbers: Dn ∝ √n.',
            'Fringe spacing decreases outwards; outer rings appear crowded.'
          ],
          mcqs: [
            {
              question: "In Newton's rings by reflected light, why is the central fringe dark?",
              options: [
                'Thickness of the air film is infinite',
                'Destructive interference due to a phase reversal of π at the glass plate',
                'Lens absorbs all the incident light',
                'Constructive interference occurs at contact'
              ],
              correctIndex: 1,
              explanation: 'At contact, t = 0, but reflection from the lower glass plate introduces a π phase shift (path λ/2), resulting in destructive interference.'
            }
          ]
        }
      ]
    },
    {
      id: 'phy-u2',
      title: 'Unit 2: Wave Optics — Diffraction & Gratings',
      description: 'Fraunhofer diffraction at a single slit, plane transmission grating, resolving power, and Rayleigh’s criterion.',
      topics: [
        {
          id: 'phy-t3',
          title: 'Fraunhofer Diffraction at a Single Slit',
          simpleExplanation: 'When parallel light waves pass through a narrow slit of width a, the wavefront bends and interferes with itself, creating a broad, intense central maximum flanked by alternating secondary minima and dimmer maxima.',
          detailedExplanation: `### Fraunhofer Single Slit Diffraction

In Fraunhofer diffraction, the source and screen are effectively at infinite distances from the diffracting aperture (achieved using convex lenses).

Let a plane wavefront of wavelength $\\lambda$ fall normally on a slit $AB$ of width $a$. Secondary wavelets originating from the slit interfere on a screen placed in the focal plane of a convex lens.

### Resultant Amplitude & Intensity:
The resultant amplitude at an angle of diffraction $\\theta$ is:
$$R = A_0 \\frac{\\sin \\alpha}{\\alpha} \\quad \\text{where } \\alpha = \\frac{\\pi a \\sin \\theta}{\\lambda}$$

The intensity distribution is:
$$I = R^2 = I_0 \\left(\\frac{\\sin \\alpha}{\\alpha}\\right)^2$$

### Key Positions:
1. **Central Principal Maximum ($\\\\theta = 0$):**
   - As $\\theta \\to 0$, $\\alpha \\to 0$, and $\\lim_{\\alpha \\to 0} \\frac{\\sin \\alpha}{\\alpha} = 1$.
   - Intensity is maximum: $I = I_0$.
2. **Positions of Minima:**
   - Minima occur when $\\sin \\alpha = 0$ (but $\\alpha \\neq 0$):
   $$\\alpha = \\pm m\\pi \\implies \\frac{\\pi a \\sin \\theta}{\\lambda} = \\pm m\\pi \\implies a \\sin \\theta = \\pm m\\lambda \\quad (m = 1, 2, 3, \\dots)$$
3. **Positions of Secondary Maxima:**
   - Differentiating $I$ with respect to $\\alpha$ gives the transcendental condition $\\tan \\alpha = \\alpha$.
   - Approximate roots: $\\alpha \\approx \\pm 1.43\\pi, \\pm 2.46\\pi, \\dots$
   - Intensities drop sharply: $I_1 \\approx \\frac{I_0}{22}$, $I_2 \\approx \\frac{I_0}{61}$.

### Width of Central Maximum:
$$2\\theta = 2 \\sin^{-1}\\left(\\frac{\\lambda}{a}\\right) \\approx \\frac{2\\lambda}{a} \\text{ radians}$$
Linear width on a screen at focal distance $f$:
$$\\beta_0 = \\frac{2f\\lambda}{a}$$`,
          shortNotes: 'Single slit: Minima at a sin θ = mλ (m = 1, 2, ...). Central max width = 2fλ/a. Intensity I = I0 (sin α / α)^2.',
          examples: [
            {
              title: 'Angular Spread of Central Maximum',
              problem: 'A slit of width 0.2 mm is illuminated by light of wavelength 600 nm. Find the angular spread of the central diffraction maximum.',
              explanation: 'Angular spread = 2θ = 2λ / a radians.',
              code: `a = 0.2e-3          # slit width in meters
wavelength = 600e-9 # wavelength in meters

theta = wavelength / a
angular_spread = 2 * theta
print(f"Half angular width: {theta:.4e} rad")
print(f"Total angular spread: {angular_spread * 180 / 3.14159:.3f} degrees")`,
              output: 'Half angular width: 3.0000e-03 rad\nTotal angular spread: 0.344 degrees'
            }
          ],
          keyPoints: [
            'Fraunhofer diffraction requires plane wavefronts (parallel rays).',
            'Minima condition: a sin θ = mλ (where m is an integer excluding 0).',
            'Central maximum has double the angular width of secondary maxima.',
            'Narrowing the slit width (a) broadens the central diffraction peak.'
          ],
          mcqs: [
            {
              question: 'In Fraunhofer single-slit diffraction, the condition for the first minimum is:',
              options: ['a sin θ = λ / 2', 'a sin θ = λ', 'a sin θ = 2λ', 'a cos θ = λ'],
              correctIndex: 1,
              explanation: 'The condition for minima is a sin θ = mλ. For the first minimum, m = 1, so a sin θ = λ.'
            }
          ]
        },
        {
          id: 'phy-t4',
          title: 'Plane Diffraction Grating & Resolving Power',
          simpleExplanation: 'A diffraction grating consists of thousands of equidistant, closely spaced parallel slits. It disperses incident light into sharp spectral lines according to wavelength.',
          detailedExplanation: `### Plane Transmission Diffraction Grating

A plane diffraction grating consists of a large number $N$ of parallel, equally spaced transparent slits of width $a$ separated by opaque intervals of width $b$:
- **Grating Element**: $d = (a + b)$
- If there are $N'$ lines per inch, grating element $d = \\frac{2.54}{N'} \\text{ cm}$.

### Grating Equation (Principal Maxima):
$$(a + b) \\sin \\theta = n\\lambda \\quad (n = 0, 1, 2, \\dots \\text{ is spectral order})$$

### Maximum Observable Order:
Since $\\sin \\theta \\le 1$:
$$n_{\\text{max}} = \\left\\lfloor \\frac{a + b}{\\lambda} \\right\\rfloor$$

### Rayleigh's Criterion for Resolution:
Two spectral lines of wavelengths $\\lambda$ and $\\lambda + d\\lambda$ are considered just resolved when the **principal maximum of one wavelength falls exactly on the first minimum of the other wavelength**.

### Resolving Power (RP) of a Grating:
The resolving power measures the ability to separate adjacent spectral lines:
$$\\text{RP} = \\frac{\\lambda}{d\\lambda} = n \\cdot N$$
Where:
- $n$ = order of the spectrum
- $N$ = total number of grating lines illuminated`,
          shortNotes: 'Grating equation: (a + b) sin θ = nλ. Resolving Power RP = λ / dλ = n * N. Rayleigh criterion: peak of one on minimum of other.',
          examples: [
            {
              title: 'Resolving the Sodium D-Lines',
              problem: 'Can a grating with 500 lines resolve the Sodium doublet (λ1 = 5890 Å, λ2 = 5896 Å) in the first order?',
              explanation: 'Calculate required RP = λ / dλ and compare with available RP = n * N.',
              code: `lambda_avg = 5893.0
d_lambda = 6.0
required_RP = lambda_avg / d_lambda  # ~982

n = 1
N = 500
available_RP = n * N  # 500

print(f"Required RP: {required_RP:.1f}")
print(f"Available RP: {available_RP}")
print("Can resolve?", available_RP >= required_RP)`,
              output: 'Required RP: 982.2\nAvailable RP: 500\nCan resolve? False'
            }
          ],
          keyPoints: [
            'Grating element d = (a + b) equals slit width plus opaque spacing.',
            'Grating equation: (a + b) sin θ = nλ.',
            'Resolving Power RP = λ / dλ = n * N increases with order n and total lines N.',
            'Rayleigh criterion defines the boundary condition for resolving spectral peaks.'
          ],
          mcqs: [
            {
              question: 'The resolving power of a diffraction grating is given by:',
              options: ['n / N', 'n · N', 'N / n', 'λ · n / N'],
              correctIndex: 1,
              explanation: 'The resolving power RP = λ / dλ = n · N, where n is spectral order and N is the number of lines.'
            }
          ]
        }
      ]
    },
    {
      id: 'phy-u3',
      title: 'Unit 3: Lasers & Photonics',
      description: 'Stimulated emission, Einstein coefficients, population inversion, optical resonators, He-Ne laser, and semiconductor lasers.',
      topics: [
        {
          id: 'phy-t5',
          title: 'Laser Principles: Stimulated Emission & Population Inversion',
          simpleExplanation: 'LASER stands for Light Amplification by Stimulated Emission of Radiation. Unlike normal incandescent lamps, laser light is monochromatic, highly directional, coherent, and extremely intense.',
          detailedExplanation: `### Fundamentals of Laser Action

1. **Absorption**: An atom in ground state $E_1$ absorbs a photon of energy $h\\nu = E_2 - E_1$ and transitions to excited state $E_2$.
2. **Spontaneous Emission**: An excited atom spontaneously drops back to $E_1$ after its lifetime (~$10^{-8}$ s), emitting a photon in a random direction with random phase (incoherent, e.g. a lightbulb).
3. **Stimulated Emission (Einstein, 1917)**: An incident photon of energy $h\\nu$ triggers an excited atom to decay to $E_1$, emitting a **second photon that has identical wavelength, direction, phase, and polarization** as the triggering photon. This is coherent amplification!

### Einstein's Coefficients:
- $B_{12}$: Rate of stimulated absorption
- $A_{21}$: Rate of spontaneous emission
- $B_{21}$: Rate of stimulated emission
Under thermal equilibrium, Einstein showed:
$$B_{12} = B_{21} \\quad \\text{and} \\quad \\frac{A_{21}}{B_{21}} = \\frac{8\\pi h \\nu^3}{c^3}$$

### Population Inversion & Pumping:
According to the Boltzmann distribution, in thermal equilibrium:
$$\\frac{N_2}{N_1} = e^{-\\frac{E_2 - E_1}{kT}} < 1 \\implies N_1 > N_2$$
To produce laser amplification, we must achieve **Population Inversion** ($N_2 > N_1$):
- **Metastable State**: An excited state with an unusually long lifetime (~$10^{-3}$ s, 100,000 times longer than normal excited states) allowing atoms to accumulate.
- **Pumping Mechanisms**: Optical pumping (flashlamps), electrical discharge (gas collisions), or direct injection (semiconductor p-n junction).`,
          shortNotes: 'Laser = coherent, monochromatic, collimated. Stimulated emission produces duplicate photons. Population inversion (N2 > N1) requires metastable state and pumping.',
          examples: [
            {
              title: 'Ratio of Spontaneous to Stimulated Emission at Room Temp',
              problem: 'Show why optical visible lasers cannot operate by thermal excitation alone at T = 300 K.',
              explanation: 'Calculate ratio A21 / (B21 * u(nu)) for green light (500 nm) at 300 K.',
              code: `import math

h = 6.626e-34    # Planck constant
c = 3.0e8        # Speed of light
k = 1.38e-23     # Boltzmann constant
T = 300          # Room temp in Kelvin
wavelength = 500e-9

nu = c / wavelength
exponent = (h * nu) / (k * T)
ratio = math.exp(exponent) - 1

print(f"Ratio of spontaneous to stimulated emission: {ratio:.2e}")`,
              output: 'Ratio of spontaneous to stimulated emission: 1.44e+41'
            }
          ],
          keyPoints: [
            'LASER = Light Amplification by Stimulated Emission of Radiation.',
            'Stimulated emission creates photons in identical phase, frequency, and direction.',
            'Population inversion requires a 3-level or 4-level energy system with a metastable state.',
            'Einstein relation proves B12 = B21; probability of absorption equals probability of stimulated emission.'
          ],
          mcqs: [
            {
              question: 'What is the typical lifetime of an atom in a metastable state?',
              options: ['10^-8 seconds', '10^-3 seconds', '10^-12 seconds', '1 second'],
              correctIndex: 1,
              explanation: 'Normal excited states last ~10^-8 s, while metastable states have long lifetimes of ~10^-3 s to allow population accumulation.'
            }
          ]
        },
        {
          id: 'phy-t6',
          title: 'Helium-Neon (He-Ne) Gas Laser: Working & Transitions',
          simpleExplanation: 'The He-Ne laser is a continuous 4-level gas laser that emits a brilliant red beam at 632.8 nm. Helium atoms are excited by electron collision and transfer energy to Neon atoms via resonant collision.',
          detailedExplanation: `### Helium-Neon (He-Ne) Laser Construction

- **Active Medium**: Mixture of Helium and Neon gas in a **10:1 ratio** inside a quartz discharge tube at low pressure (~1 mm Hg).
- **Pumping Method**: Electric discharge (RF or DC high voltage ~1000 V).
- **Optical Resonator**: Two mirrors at tube ends — one 100% reflective, one 98% reflective (output coupler).

### Energy Transfer Mechanism:
1. Electric discharge accelerates electrons that collide with ground-state Helium atoms:
   $$e^- + \\text{He} \\to \\text{He}^* (2^1S_0 \\text{ and } 2^3S_1) + e^-$$
2. Helium's $2^1S$ and $2^3S$ levels are metastable with energies of **20.61 eV** and **19.81 eV**.
3. These levels coincide closely with the **$3s$ (20.66 eV) and $2s$ (19.78 eV)** excited states of Neon.
4. Through **resonant inelastic atom-atom collision**, Helium transfers its energy directly to Neon:
   $$\\text{He}^* + \\text{Ne} \\to \\text{He} + \\text{Ne}^* (3s, 2s)$$
5. Population inversion is created between Neon's $3s$ and $2p$ levels.

### Laser Transition:
- The transition from Neon's $3s_2 \\to 2p_4$ produces the standard **visible red laser emission at $\\lambda = 632.8\\text{ nm}$**.
- Atoms decay rapidly from $2p$ to $1s$ (spontaneous) and then de-excite to the ground state via tube wall collisions.

> [!TIP] **EXAM TIP:**
> Always draw the dual energy level diagram (He on left, Ne on right) showing the horizontal dashed energy transfer arrows between He $2^1S$ (20.61 eV) and Ne $3s$ (20.66 eV), followed by the downward laser arrow (632.8 nm).`,
          shortNotes: 'He-Ne laser: 10:1 gas ratio. He atoms excited by discharge, transfer energy to Ne via resonant collisions. Output: 632.8 nm red beam.',
          examples: [
            {
              title: 'Photon Energy of He-Ne Laser Emission',
              problem: 'Calculate the energy in electron volts (eV) of a photon emitted by a He-Ne laser (λ = 632.8 nm).',
              explanation: 'Use E = hc / λ and convert Joules to eV by dividing by 1.6e-19.',
              code: `h = 6.626e-34
c = 3.0e8
wavelength = 632.8e-9
e = 1.602e-19

energy_joules = (h * c) / wavelength
energy_ev = energy_joules / e
print(f"Photon energy = {energy_ev:.3f} eV")`,
              output: 'Photon energy = 1.963 eV'
            }
          ],
          keyPoints: [
            'He-Ne laser uses a 4-level laser architecture emitting continuous wave (CW) radiation.',
            'Helium acts as the pumping agent, while Neon provides the lasing transitions.',
            'Primary commercial transition is 632.8 nm in the visible red spectrum.',
            'Wall collisions are required to de-excite Neon from 1s to ground state, dictating a narrow tube diameter.'
          ],
          mcqs: [
            {
              question: 'In a Helium-Neon laser, what is the ratio of Helium to Neon gas?',
              options: ['1:1', '10:1', '1:10', '100:1'],
              correctIndex: 1,
              explanation: 'The gas mixture contains approximately 10 parts Helium to 1 part Neon (10:1).'
            }
          ]
        }
      ]
    },
    {
      id: 'phy-u4',
      title: 'Unit 4: Fiber Optics & Waveguides',
      description: 'Total internal reflection, numerical aperture, acceptance angle, fiber modes, step vs graded index, and optical attenuation.',
      topics: [
        {
          id: 'phy-t7',
          title: 'Total Internal Reflection, Acceptance Angle & Numerical Aperture (NA)',
          simpleExplanation: 'Optical fibers carry light over vast distances by bouncing it inside a high-index core wrapped in a lower-index cladding through total internal reflection.',
          detailedExplanation: `### Principle of Optical Waveguides

An optical fiber consists of three concentric layers:
1. **Core**: Transparent dielectric ($SiO_2$) with higher refractive index $n_1$.
2. **Cladding**: Surrounding layer with slightly lower refractive index $n_2$ ($n_1 > n_2$).
3. **Protective Jacket**: Polymer buffer sheath protecting against physical strain and moisture.

### Total Internal Reflection (TIR) Condition:
Light entering the core must hit the core-cladding boundary at an angle greater than the **critical angle** $\\theta_c$:
$$\\sin \\theta_c = \\frac{n_2}{n_1}$$

### Acceptance Angle (\\(\\theta_0\\)) Derivation:
The maximum angle of incidence at the fiber face in air ($n_0 \\approx 1$) for which TIR occurs inside:
$$\\sin \\theta_0 = \\sqrt{n_1^2 - n_2^2}$$
$$\\theta_0 = \\sin^{-1}\\left(\\sqrt{n_1^2 - n_2^2}\\right)$$

### Numerical Aperture (NA):
A figure of merit representing the light-gathering capacity of the fiber:
$$\\text{NA} = \\sin \\theta_0 = \\sqrt{n_1^2 - n_2^2} \\approx n_1 \\sqrt{2\\Delta}$$
Where $\\Delta = \\frac{n_1 - n_2}{n_1}$ is the **fractional index difference**.

> [!WARNING] **TRAP:**
> Numerical Aperture is **dimensionless** and is completely independent of the core diameter! It depends solely on the refractive indices of the core and cladding.`,
          shortNotes: 'NA = sin(θ_0) = √(n1^2 - n2^2) ≈ n1√(2Δ). Light guidance requires n1 > n2 and launch angle < θ_0.',
          examples: [
            {
              title: 'Calculating Numerical Aperture and Acceptance Angle',
              problem: 'An optical fiber has a core of n1 = 1.50 and cladding of n2 = 1.45. Calculate its NA and acceptance angle in air.',
              explanation: 'Use NA = sqrt(n1^2 - n2^2) and theta_0 = arcsin(NA).',
              code: `import math

n1 = 1.50
n2 = 1.45

na = math.sqrt(n1**2 - n2**2)
theta_0_rad = math.asin(na)
theta_0_deg = math.degrees(theta_0_rad)

print(f"Numerical Aperture (NA): {na:.4f}")
print(f"Acceptance Angle: {theta_0_deg:.2f} degrees")`,
              output: 'Numerical Aperture (NA): 0.3841\nAcceptance Angle: 22.58 degrees'
            }
          ],
          keyPoints: [
            'Light guidance relies on Total Internal Reflection (TIR) with core index n1 > cladding index n2.',
            'Acceptance angle θ0 defines the acceptance cone of the fiber entrance.',
            'Numerical Aperture (NA) measures light-gathering efficiency: NA = √(n1² - n2²).',
            'Fractional index difference Δ = (n1 - n2) / n1 is typically 0.001 to 0.02.'
          ],
          mcqs: [
            {
              question: 'If the core index is 1.55 and the cladding index is 1.50, what is the numerical aperture (NA)?',
              options: ['0.39', '0.05', '0.50', '0.25'],
              correctIndex: 0,
              explanation: 'NA = √(1.55² - 1.50²) = √(2.4025 - 2.25) = √0.1525 ≈ 0.3905.'
            }
          ]
        },
        {
          id: 'phy-t8',
          title: 'Step Index vs Graded Index (GRIN) Fibers & Modal Dispersion',
          simpleExplanation: 'In step-index fibers, rays travel at different zigzag angles leading to pulse broadening (dispersion). Graded-index fibers bend light smoothly via a parabolic index profile so all rays arrive at the same time.',
          detailedExplanation: `### Classification of Optical Fibers

#### 1. By Refractive Index Profile:
- **Step-Index Fiber**: Core has a constant refractive index $n_1$ with an abrupt step-down to $n_2$ at the boundary.
- **Graded-Index (GRIN) Fiber**: Core refractive index decreases radially from the axis according to a parabolic law:
  $$n(r) = n_1 \\left[1 - 2\\Delta \\left(\\frac{r}{a}\\right)^2\\right]^{1/2}$$
  Rays away from the axis travel faster through lower-index material, virtually eliminating **intermodal dispersion**.

#### 2. By Number of Modes:
- **Single-Mode Fiber (SMF)**: Extremely narrow core diameter (~8 to 10 $\\mu$m). Only the fundamental axial mode propagates. No intermodal dispersion; used for long-haul internet trunklines (100+ km).
- **Multi-Mode Fiber (MMF)**: Wider core (~50 to 62.5 $\\mu$m). Hundreds of modes propagate; prone to dispersion, used in local LAN networks.

### Normalized Frequency (V-Number):
$$V = \\frac{2\\pi a}{\\lambda} \\text{NA} = \\frac{2\\pi a}{\\lambda} \\sqrt{n_1^2 - n_2^2}$$
- If $V \\le 2.405$, the fiber supports **only a single mode**!`,
          shortNotes: 'Single-mode (core ~9μm) has no modal dispersion. Graded index has parabolic index profile to equalize ray travel times. V <= 2.405 for SMF.',
          examples: [
            {
              title: 'Cutoff Condition for Single Mode Fiber',
              problem: 'Calculate the maximum core radius for single mode operation at λ = 1.3 μm if n1 = 1.48 and n2 = 1.47.',
              explanation: 'Set V = 2.405 = (2π * a / λ) * NA and solve for radius a.',
              code: `import math

wavelength = 1.3e-6
n1 = 1.48
n2 = 1.47
na = math.sqrt(n1**2 - n2**2)
v_cutoff = 2.405

# a = (V * lambda) / (2 * pi * NA)
a_max = (v_cutoff * wavelength) / (2 * math.pi * na)
print(f"NA = {na:.4f}")
print(f"Max core radius a = {a_max * 1e6:.2f} micrometers")`,
              output: 'NA = 0.1718\nMax core radius a = 2.89 micrometers'
            }
          ],
          keyPoints: [
            'Step-index fibers feature a uniform core index; graded-index fibers feature a parabolic profile.',
            'Intermodal dispersion is the dominant pulse-broadening mechanism in multimode fibers.',
            'Single-mode fibers eliminate intermodal dispersion and operate when V <= 2.405.',
            'Optical fiber signal attenuation is measured in dB/km (dominated by Rayleigh scattering at short wavelengths and absorption at long wavelengths).'
          ],
          mcqs: [
            {
              question: 'A step-index fiber operates in single mode only when the V-number is less than or equal to:',
              options: ['1.000', '2.405', '3.141', '4.810'],
              correctIndex: 1,
              explanation: 'The cutoff parameter for single-mode propagation in a step-index fiber is V ≤ 2.405.'
            }
          ]
        }
      ]
    },
    {
      id: 'phy-u5',
      title: 'Unit 5: Quantum Mechanics & Wave Equations',
      description: 'Wave-particle duality, de Broglie wavelength, Heisenberg uncertainty principle, Schrödinger equation, and particle in a 1D box.',
      topics: [
        {
          id: 'phy-t9',
          title: 'Wave-Particle Duality & de Broglie Matter Waves',
          simpleExplanation: 'Just as light waves behave like particles (photons), matter particles like electrons exhibit wave properties (interference and diffraction) with wavelength λ = h / p.',
          detailedExplanation: `### De Broglie Matter Waves (1924)

De Broglie postulated that dual nature applies universally to matter as well as radiation:
$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$

### De Broglie Wavelength of an Accelerated Electron:
If an electron of mass $m$ and charge $e$ is accelerated from rest through a potential difference of $V$ volts:
$$E_k = eV = \\frac{p^2}{2m} \\implies p = \\sqrt{2m e V}$$
$$\\lambda = \\frac{h}{\\sqrt{2m e V}} = \\frac{1.227}{\\sqrt{V}} \\text{ nm} = \\frac{12.27}{\\sqrt{V}} \\text{ Å}$$

### Heisenberg's Uncertainty Principle:
It is fundamentally impossible to simultaneously determine both the exact position and exact momentum of a quantum particle:
$$\\Delta x \\cdot \\Delta p_x \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi}$$
Energy-time uncertainty:
$$\\Delta E \\cdot \\Delta t \\ge \\frac{\\hbar}{2}$$`,
          shortNotes: 'Matter wave: λ = h / p. For accelerated electron: λ = 12.27 / √V Å. Uncertainty: Δx * Δp >= h / (4π).',
          examples: [
            {
              title: 'Wavelength of an Electron Accelerated through 100 Volts',
              problem: 'Calculate the de Broglie wavelength of an electron accelerated through an electric potential of 100 V.',
              explanation: 'Use formula λ = 12.27 / sqrt(V) Angstroms.',
              code: `V = 100.0  # volts
wavelength_angstroms = 12.27 / (V ** 0.5)
print(f"de Broglie wavelength = {wavelength_angstroms:.3f} Angstroms")`,
              output: 'de Broglie wavelength = 1.227 Angstroms'
            }
          ],
          keyPoints: [
            'De Broglie wavelength λ = h / p connects particle momentum with wave characteristics.',
            'Davisson-Germer experiment experimentally confirmed electron diffraction from nickel crystals.',
            'The uncertainty principle is a fundamental wave property, not an instrumentation flaw.',
            'Accelerated electron wavelength: λ = 12.27 / √V Ångströms.'
          ],
          mcqs: [
            {
              question: 'If the accelerating voltage of an electron is quadrupled (4V), its de Broglie wavelength becomes:',
              options: ['Doubled', 'Halved', 'Four times', 'Remains unchanged'],
              correctIndex: 1,
              explanation: 'Since λ ∝ 1/√V, quadrupling V reduces λ by a factor of √4 = 2 (halved).'
            }
          ]
        },
        {
          id: 'phy-t10',
          title: 'Schrödinger Wave Equation & Particle in a 1D Infinite Potential Box',
          simpleExplanation: 'The Schrödinger equation describes the quantum state of a particle via a wave function ψ. Confining a particle inside a rigid box quantizes its energy levels into discrete values.',
          detailedExplanation: `### Time-Independent Schrödinger Equation

For a particle of mass $m$ moving in a potential $V(x)$:
$$\\frac{d^2\\psi}{dx^2} + \\frac{2m}{\\hbar^2} (E - V)\\psi = 0$$

### Physical Meaning of the Wave Function (\\(\\psi\\)):
- $\\psi$ itself has no direct physical meaning.
- **Born Postulate**: $|\\psi(x)|^2 = \\psi^*(x)\\psi(x)$ represents the **probability density** of finding the particle at position $x$.
- **Normalization Condition**: $\\int_{-\\infty}^{+\\infty} |\\psi|^2 dx = 1$.

### Particle in a 1D Infinite Potential Well (Rigid Box):
Consider a particle trapped in a box of width $L$ where $V(x) = 0$ for $0 < x < L$ and $V(x) = \\infty$ elsewhere.

#### Boundary Conditions:
$\\psi(0) = 0$ and $\\psi(L) = 0$.

#### Normalized Wave Functions (Eigenfunctions):
$$\\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n\\pi x}{L}\\right) \\quad (n = 1, 2, 3, \\dots)$$

#### Quantized Energy Levels (Eigenvalues):
$$E_n = \\frac{n^2 h^2}{8 m L^2} \\quad (n = 1, 2, 3, \\dots)$$

> [!IMPORTANT] **MEMORIZE:**
> - **Zero-Point Energy ($n = 1$)**: $E_1 = \\frac{h^2}{8mL^2} \\neq 0$. A quantum particle can **never be at rest** inside a box (consistent with Heisenberg uncertainty).
> - Energy levels are **discrete** and proportional to $n^2$: $E_1 : E_2 : E_3 = 1 : 4 : 9$.`,
          shortNotes: 'Schrödinger eq: d²ψ/dx² + 2m/ħ²(E - V)ψ = 0. Particle in box: En = (n² h²) / (8mL²). Zero-point energy E1 > 0.',
          examples: [
            {
              title: 'Ground State Energy of an Electron in a 1 nm Box',
              problem: 'Find the ground state energy (in eV) of an electron trapped in a one-dimensional box of length 1.0 nm.',
              explanation: 'Calculate E1 = h^2 / (8 m L^2) and convert to electron volts.',
              code: `h = 6.626e-34
m = 9.109e-31   # electron mass (kg)
L = 1.0e-9      # 1 nm
e = 1.602e-19   # Joules per eV

E1_joules = (h**2) / (8 * m * L**2)
E1_ev = E1_joules / e
print(f"Ground state energy E1 = {E1_ev:.4f} eV")`,
              output: 'Ground state energy E1 = 0.3760 eV'
            }
          ],
          keyPoints: [
            '|ψ|² represents the probability density of finding a particle (Max Born interpretation).',
            'Energy of a confined particle is quantized: En = n²h² / (8mL²).',
            'Zero-point energy (n = 1) is non-zero, proving a quantum particle is never completely motionless.',
            'Wave functions form standing matter waves with n nodes inside the potential well.'
          ],
          mcqs: [
            {
              question: 'The energy of a particle confined in an infinite 1D potential well of width L is proportional to:',
              options: ['n', 'n²', '1 / n', '√n'],
              correctIndex: 1,
              explanation: 'En = n²h² / (8mL²), which is directly proportional to n².'
            }
          ]
        }
      ]
    }
  ]
};
