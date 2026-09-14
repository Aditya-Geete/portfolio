// Project data, moved server-side per Assignment 3 (B2).
// Field names match what ProjectCard / ProjectDetail expect on the frontend.
module.exports = [
  {
    id: 'xct-analyser',
    title: 'XCT Data Analyser',
    tag: 'Machine Learning',
    description:
      'Analysing XCT scans of metal to calculate porosity using 3D UNet segmentation.',
    fullDetails:
      'This project uses deep learning UNet architectures to perform high-precision 3D porosity analysis on CT scans.',
    techStack: ['Python', 'TensorFlow', 'customTkinter'],
    image: '/images/xct-analyser.png',
    link: 'https://github.com/Aditya-Geete/PorosityAnalysis',
  },
  {
    id: 'cbct-predictor',
    title: 'CBCT Age Predictor',
    tag: 'Web App',
    description:
      'Age prediction based on tooth and pulp ratios calculated from CBCT dental scans.',
    fullDetails:
      'Integrated UNet models with a Node.js backend and React dashboard to automate dental age estimation.',
    techStack: ['React', 'Tailwind', 'Node.js'],
    image: '/images/cbct-predictor.png',
    link: 'https://github.com/Aditya-Geete/DentalScanAnalyser',
  },
  {
    id: 'pest-detection',
    title: 'Pest Detection & Identification',
    tag: 'Computer Vision',
    description:
      'CNN-based mobile application helping farmers detect crop pests accurately.',
    fullDetails:
      'Trained on over 10,000 agricultural images to classify pests in real-time under variable light conditions.',
    techStack: ['Python', 'OpenCV', 'React Native'],
    image: '/images/pest-detection.png',
    link: 'https://leetcode.com/problems/consecutive-numbers-sum/description/',
  },
];
