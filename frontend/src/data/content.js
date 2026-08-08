// Centralized copy for the site's data-driven sections.

export const education = [
  {
    id: 'bs',
    title: 'B.S. Applied Mathematics',
    icon: 'award',
    iconColor: '#5a8f3c',
    body:
      "I attended Cal Poly Pomona from 2016-2020 where I received a Bachelor's Degree in Applied Mathematics. Some of my most influential instructors were Dr. Berit Givens, Dr. John Rock, Dr. Jennifer Switkes, and Dr. Nakashima. It wasn't only the subject material that I learned from them, but how to understand, read, and develop mathematical theories/ideas.",
  },
  {
    id: 'ms',
    title: 'M.S. Applied Mathematics',
    icon: 'cap',
    iconColor: '#c76936',
    body:
      'During my Master\u2019s Program, I focused heavily on Mathematical and Statistical modeling. For my thesis, I researched and modeled the population growth of a pair of interactive species, Alaskan Brown Bears and Pacific Salmon, as their environmental climate changes. I have also participated in statistical modeling competitions and used machine learning to predict residential building prices and determine who survived disasters.',
  },
  {
    id: 'post',
    title: 'Post Graduation',
    icon: 'rocket',
    iconColor: '#3f7cb6',
    body:
      'Since graduating, I have built a career in BI and machine learning at Temco Logistics. Starting as a BI Developer, advancing to BI Automation & ML Lead, and now leading a team as BI Manager. Along the way I have had the chance to do exactly what I set out to: build robust data pipelines, train and deploy ML models, and architect cloud infrastructure at scale. My passion for teaching that grew during my time as a Graduate Teaching Associate has not faded, and I still hope to teach mathematics at a community college one day.',
  },
];

export const projects = [
  {
    id: 'logistic',
    title: 'Logistic Equations',
    category: 'Modeling',
    icon: 'logistic',
    iconColor: '#5a8f3c',
    blurb:
      'Research in the stability of logistic equations with delay. Utilized MATLAB to observe solutions and design plots which presented when the delayed-logistic equation becomes unstable. Came to the conclusion that the equilibrium of the population is the carry capacity.',
    href: 'https://github.com/ConnorLAdams/Logistic-Equations/blob/main/Logistic_Equation.pdf',
  },
  {
    id: 'oscillators',
    title: 'Oscillators',
    category: 'Modeling',
    icon: 'oscillator',
    iconColor: '#c76936',
    blurb:
      'Explored the stability of a single oscillator and coupled system oscillators using MATLAB. Discussed the similarities and differences between the two types of oscillators. Noticed that the coupled system experiences almost the same stable cycles as the single oscillator.',
    href: 'https://github.com/ConnorLAdams/Coupled-System-Oscillators/blob/main/Coupled_System_Oscillators_Connor_Adams.pdf',
  },
  {
    id: 'tridiagonal',
    title: 'Tridiagonal Matrix',
    category: 'Linear Algebra',
    icon: 'matrix',
    iconColor: '#3f7cb6',
    blurb:
      'Discovered solutions and the closed form for computing the eigenvalues for a specific type of tridiagonal matrix. Results showed that LU factorization w/o pivot were the best methods because of their efficiency with large tridiagonal matrices.',
    href: 'https://github.com/ConnorLAdams/System-of-a-Tridiagonal-Matrix/blob/main/MAT_5080_Project.pdf',
  },
  {
    id: 'orbits',
    title: 'Orbits',
    category: 'Numerical',
    icon: 'orbit',
    iconColor: '#7a5bb0',
    blurb:
      'Modeled orbital motion with numerical integration, simulating two-body and perturbed trajectories and comparing integrator accuracy and stability over long time horizons.',
    href: 'https://github.com/ConnorLAdams/Optimizing-Jump-Between-Orbits/blob/main/MAT_5800_Project.pdf',
  },
  {
    id: 'flux-compressor',
    title: 'Flux Compressor',
    category: 'Systems',
    icon: 'flux',
    iconColor: '#c76936',
    blurb:
      'A lossless file-compression utility written in Rust. Implements a custom algorithm to minimize file sizes while preserving data integrity, showcasing systems-level memory safety and performance.',
    href: 'https://github.com/connoradams-mariner/Flux-Compressor',
  },
  {
    id: 'romeo-sierra-coffee',
    title: 'RS Coffee Co.',
    category: 'Web App',
    icon: 'coffee',
    iconColor: '#7a5bb0',
    blurb:
      'E-commerce platform for Romeo Sierra Coffee Co. A small-batch cold brew concentrate brand. Ships bold, smooth concentrates made with just two ingredients: organic coffee and pink Himalayan salt, with signature blends and rotating seasonal drops.',
    href: 'https://rscoffeeco.com',
  },
];

// Roles cycled by the hero typewriter.
export const roles = [
  'Mathematician',
  'Educator',
  'BI Developer',
  'Automation & ML Lead',
  'BI Manager',
];

// Short bio for the About section.
export const about =
  "I'm Connor Adams. A BI Manager and applied mathematician who likes turning messy, complicated problems into clear models and clean data pipelines. I care about rigorous thinking, good tooling, and teaching what I learn along the way.";

// Experience (from résumé). Structure: role / company / location / period /
// summary / groups[] where each group has a heading and bullet points.
export const experience = [
  {
    id: 'bi-manager',
    role: 'BI Manager',
    company: 'Temco Logistics',
    location: 'Marysville, WA',
    period: 'Feb 2025 — Present',
    summary:
      'Manage a team of BI & ML experts building applications and dashboards that drive business outcomes and improve operational efficiency.',
    groups: [
      {
        heading: 'Cloud Architecture Migration',
        points: [
          'Led a cross-functional team to implement a new cloud architecture for scalability, security, and simpler third-party integrations (hub-and-spoke, role-based access, VPN, load balancing).',
        ],
      },
      {
        heading: 'Machine Learning',
        points: [
          'Mentored ML developers building solutions to optimize logistics, detect anomalies in text & financial data, and forecast workload (Python, scikit-learn, TensorFlow, Azure, Databricks).',
        ],
      },
      {
        heading: 'Data Governance',
        points: [
          'Used role-based access to tailor reports and applications to each user’s role, improving security and user experience.',
        ],
      },
    ],
  },
  {
    id: 'bi-automation-ml-lead',
    role: 'BI Automation & ML Lead',
    company: 'Temco Logistics',
    location: 'Marysville, WA',
    period: 'Apr 2024 — Jan 2025',
    summary:
      'Led automated reporting and machine-learning-driven analytics that delivered actionable insights and drove business growth.',
    groups: [
      {
        heading: 'AI Solutions',
        points: [
          'Trained models to improve employee retention, data accuracy, and workload forecasting, and applied pre-built models for data governance, delivery tracking, and extracting information from PDFs & images (Python, scikit-learn, TensorFlow, Azure).',
        ],
      },
      {
        heading: 'Scalable Applications',
        points: [
          'Upgraded legacy applications to modern tooling and migrated infrastructure to the cloud for scalability and reliability (Azure, Databricks).',
        ],
      },
      {
        heading: 'Optimization',
        points: [
          'Guided BI developers to add concurrent processing so data pipelines scale with company growth (Python, Go, Rust, SQL, Databricks, Azure).',
        ],
      },
    ],
  },
  {
    id: 'bi-developer',
    role: 'BI Developer',
    company: 'Temco Logistics',
    location: 'Pomona, CA',
    period: 'Mar 2023 — Mar 2024',
    summary:
      'Built applications to process data from many sources and created dashboards that surfaced insights for strategic decision-making.',
    groups: [
      {
        heading: 'Database Management',
        points: [
          'Designed and implemented database schemas for normalization, scalability, and efficient query speeds (MySQL, Lucidchart, ERD).',
        ],
      },
      {
        heading: 'Data Pipelines',
        points: [
          'Developed and maintained robust ETL pipelines pulling from multiple sources into the data warehouse (Python, JS, SQL, Power Automate, Azure, Domo).',
        ],
      },
      {
        heading: 'Data Visualizations',
        points: [
          'Designed interactive dashboards and visualizations in Domo to support decision-making and performance tracking.',
        ],
      },
    ],
  },
];

// Quotes for the quote-of-the-day flourish.
export const quotes = [
  {
    text: 'Mathematics is the art of giving the same name to different things.',
    author: 'Henri Poincar\u00e9',
  },
  { text: 'All models are wrong, but some are useful.', author: 'George E. P. Box' },
  {
    text: 'In God we trust. All others must bring data.',
    author: 'W. Edwards Deming',
  },
  {
    text: 'The purpose of computing is insight, not numbers.',
    author: 'Richard Hamming',
  },
  {
    text: 'Torture the data, and it will confess to anything.',
    author: 'Ronald Coase',
  },
];

// Research entries (moved here from Research.jsx for consistency).
export const research = [
  {
    id: 'bears',
    title: 'Brown Bears Vs. Global Warming',
    image: '/api/media/research-bears.jpg',
    alt: 'Illustration of mountains and a lake',
    body:
      'Climate change has been a popular topic since James Hansen gave his testimony to Congress in 1988, expressing the disasters that would come from global warming. Many researchers are studying climate change in hopes of predicting its effects. If we can anticipate the outcomes of climate change, we can take measures to minimize or eliminate the catastrophes that will follow. In this thesis, we compare two models that determine the long-term outcome of two interactive species.',
    reversed: false,
  },
];
