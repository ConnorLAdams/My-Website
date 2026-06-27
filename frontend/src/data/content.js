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
      'Now that I have received my Master\u2019s Degree, I am working toward becoming a machine learning engineer. I would like to begin by working as a data analyst where I can learn more about building and managing data pipelines. My time as a Graduate Teaching Associate gave me a passion for teaching, so if I can in the future, I would like to pursue a part-time career in teaching mathematics at a community college.',
  },
];

export const projects = [
  {
    id: 'logistic',
    title: 'Logistic Equations',
    blurb:
      'Research in the stability of logistic equations with delay. Utilized MATLAB to observe solutions and design plots which presented when the delayed-logistic equation becomes unstable. Came to the conclusion that the equilibrium of the population is the carry capacity.',
    href: 'https://github.com/ConnorLAdams/Logistic-Equations/blob/main/Logistic_Equation.pdf',
  },
  {
    id: 'oscillators',
    title: 'Oscillators',
    blurb:
      'Explored the stability of a single oscillator and coupled system oscillators using MATLAB. Discussed the similarities and differences between the two types of oscillators. Noticed that the coupled system experiences almost the same stable cycles as the single oscillator.',
    href: 'https://github.com/ConnorLAdams/Coupled-System-Oscillators/blob/main/Coupled_System_Oscillators_Connor_Adams.pdf',
  },
  {
    id: 'tridiagonal',
    title: 'Tridiagonal Matrix',
    blurb:
      'Discovered solutions and the closed form for computing the eigenvalues for a specific type of tridiagonal matrix. Results showed that LU factorization w/o pivot were the best methods because of their efficiency with large tridiagonal matrices.',
    href: 'https://github.com/ConnorLAdams/System-of-a-Tridiagonal-Matrix/blob/main/MAT_5080_Project.pdf',
  },
  {
    id: 'orbits',
    title: 'Orbits',
    blurb:
      'Modeled orbital motion with numerical integration, simulating two-body and perturbed trajectories and comparing integrator accuracy and stability over long time horizons.',
    href: 'https://github.com/ConnorLAdams/Optimizing-Jump-Between-Orbits/blob/main/MAT_5800_Project.pdf',
  },
];
