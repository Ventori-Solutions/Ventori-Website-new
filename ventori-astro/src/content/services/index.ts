export interface ServiceItem {
  title: string;
  description: string;
  initiallyOpen?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  items: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'training',
    title: 'Training',
    items: [
      {
        title: 'Beginner Program',
        description:
          'Kickstart your AI journey with a comprehensive introduction to machine learning, automation concepts, and ethical considerations. Includes hands-on exercises and optional certification.',
        initiallyOpen: true,
      },
      {
        title: 'Intermediate Program',
        description:
          'Deepen your skills with practical AI projects, advanced automation workflows, and integration techniques. Includes exam and certification.',
      },
      {
        title: 'Expert Program',
        description:
          'Master AI strategy, compliance (EU AI Act), and building production-ready AI systems. Includes capstone project and professional certification.',
      },
    ],
  },
  {
    id: 'workshops',
    title: 'Workshops',
    items: [
      {
        title: 'RAG System Workshop',
        description:
          'Learn to build a Retrieval-Augmented Generation system using no-code tools like n8n and vector databases. Includes live demos and your own working pipeline.',
      },
      {
        title: 'Automation Workflow Lab',
        description:
          'Design and deploy automated workflows for your business processes using tools like n8n, Qdrant, and Ollama.',
      },
    ],
  },
  {
    id: 'implementation',
    title: 'Implementation',
    items: [
      {
        title: 'Custom RAG System',
        description:
          'We design, build, and deploy a RAG system tailored to your data and business needs, fully hosted on-prem or in your cloud.',
      },
      {
        title: 'Workflow Automation Integration',
        description:
          'We analyse your processes and implement automation workflows that integrate seamlessly with your existing tools.',
      },
    ],
  },
  {
    id: 'consulting',
    title: 'Consulting',
    items: [
      {
        title: 'AI Strategy Consulting',
        description:
          'Work with our experts to define your AI adoption roadmap, identify high-impact use cases, and ensure compliance with regulations.',
      },
      {
        title: 'Technology Advisory',
        description:
          'Independent advice on AI platforms, tools, and architectures to fit your business requirements and budget.',
      },
    ],
  },
];
