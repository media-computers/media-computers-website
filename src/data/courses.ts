export interface Course {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  syllabus: string[];
  careerOpportunities: string[];
  price: number;
  features: string[];
}

export const courseCategories: {
  name: string;
  icon: string;
  courses: Course[];
}[] = [
  {
    name: "Programming Languages",
    icon: "💻",
    courses: [
      {
        id: "c-basics",
        name: "C Programming",
        category: "Programming Languages",
        icon: "💻",
        description: "Learn the fundamentals of C programming language, including variables, data types, control structures, functions, arrays, pointers, and file handling.",
        duration: "3 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [
          "Introduction to C Programming",
          "Variables and Data Types",
          "Control Structures",
          "Functions and Arrays",
          "Pointers and Memory Management",
          "File Handling",
          "Advanced C Concepts"
        ],
        careerOpportunities: [
          "Software Developer",
          "Embedded Systems Programmer",
          "System Programmer",
          "Game Developer"
        ],
        price: 15000,
        features: [
          "Hands-on coding sessions",
          "Project-based learning",
          "Industry-standard practices",
          "Certificate of completion"
        ]
      },
      {
        id: "cpp-basics",
        name: "C++ Programming",
        category: "Programming Languages",
        icon: "💻",
        description: "Master C++ programming with object-oriented concepts, STL, templates, and advanced features for building robust applications.",
        duration: "4 months",
        level: "Intermediate" as const,
        prerequisites: ["Basic C programming knowledge"],
        syllabus: [
          "C++ Fundamentals",
          "Object-Oriented Programming",
          "STL and Templates",
          "Memory Management",
          "Advanced C++ Features",
          "Project Development"
        ],
        careerOpportunities: [
          "C++ Developer",
          "Game Developer",
          "System Software Developer",
          "Application Developer"
        ],
        price: 20000,
        features: [
          "Real-world projects",
          "Code reviews",
          "Performance optimization",
          "Industry best practices"
        ]
      },
      {
        id: "ds",
        name: "Data Structures",
        category: "Programming Languages",
        icon: "📊",
        description: "A comprehensive course on fundamental data structures and algorithms.",
        duration: "3 months",
        level: "Intermediate" as const,
        prerequisites: ["Basic programming knowledge"],
        syllabus: [],
        careerOpportunities: ["Software Engineer", "Algorithm Developer"],
        price: 18000,
        features: ["Problem-solving focus", "Interview preparation"]
      },
      {
        id: "java",
        name: "Java Programming",
        category: "Programming Languages",
        icon: "☕",
        description: "Learn Java from basics to advanced concepts including OOP, collections, and multi-threading.",
        duration: "4 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Java Developer", "Backend Developer"],
        price: 22000,
        features: ["Hands-on projects", "Enterprise application development"]
      },
      {
        id: "javascript",
        name: "JavaScript Programming",
        category: "Programming Languages",
        icon: "🌐",
        description: "Master JavaScript for web development, including DOM manipulation, asynchronous programming, and modern frameworks.",
        duration: "3 months",
        level: "Beginner" as const,
        prerequisites: ["Basic HTML/CSS knowledge"],
        syllabus: [],
        careerOpportunities: ["Frontend Developer", "Fullstack Developer"],
        price: 17000,
        features: ["Interactive exercises", "Framework integration"]
      },
      {
        id: "python-basic-advanced",
        name: "Python (Basic & Advanced)",
        category: "Programming Languages",
        icon: "🐍",
        description: "Comprehensive Python course covering basics to advanced topics like data science, web development, and automation.",
        duration: "5 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Python Developer", "Data Scientist", "Machine Learning Engineer"],
        price: 25000,
        features: ["Multiple project tracks", "Certification prep"]
      },
      {
        id: "r-programming",
        name: "R Programming",
        category: "Programming Languages",
        icon: "📈",
        description: "Learn R for data analysis, statistical computing, and data visualization.",
        duration: "3 months",
        level: "Intermediate" as const,
        prerequisites: ["Basic statistics knowledge"],
        syllabus: [],
        careerOpportunities: ["Data Analyst", "Statistician"],
        price: 16000,
        features: ["Statistical projects", "Visualization techniques"]
      },
      {
        id: "php",
        name: "PHP Programming",
        category: "Programming Languages",
        icon: "🐘",
        description: "Master PHP for server-side web development and database interaction.",
        duration: "3 months",
        level: "Beginner" as const,
        prerequisites: ["Basic HTML/CSS knowledge"],
        syllabus: [],
        careerOpportunities: ["Backend Developer", "Web Developer"],
        price: 14000,
        features: ["Database integration", "Framework basics"]
      },
      {
        id: "vb-net",
        name: "VB.NET Programming",
        category: "Programming Languages",
        icon: "💻",
        description: "Learn VB.NET for Windows desktop application development and database connectivity.",
        duration: "3 months",
        level: "Beginner" as const,
        prerequisites: ["Basic programming concepts"],
        syllabus: [],
        careerOpportunities: ["Desktop Application Developer"],
        price: 13000,
        features: ["GUI development", "Database connectivity"]
      },
      {
        id: "asp-net",
        name: "ASP.NET Programming",
        category: "Programming Languages",
        icon: "🌐",
        description: "Develop dynamic web applications using ASP.NET and C#.",
        duration: "4 months",
        level: "Intermediate" as const,
        prerequisites: ["C# or VB.NET knowledge"],
        syllabus: [],
        careerOpportunities: ["Web Developer", "Fullstack Developer"],
        price: 19000,
        features: ["MVC architecture", "Web API development"]
      },
      {
        id: "csharp-net",
        name: "C#.NET Programming",
        category: "Programming Languages",
        icon: "#️⃣",
        description: "Comprehensive C#.NET course for building various applications including desktop, web, and mobile.",
        duration: "4 months",
        level: "Beginner" as const,
        prerequisites: ["Basic programming knowledge"],
        syllabus: [],
        careerOpportunities: ["Software Developer", ".NET Developer"],
        price: 20000,
        features: ["Cross-platform development", "Object-oriented programming"]
      },
      {
        id: "mysql",
        name: "MySQL Database",
        category: "Programming Languages",
        icon: "🗄️",
        description: "Master database management with MySQL, covering SQL queries, normalization, and database design.",
        duration: "2 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Database Administrator", "Backend Developer"],
        price: 12000,
        features: ["Practical SQL exercises", "Database design principles"]
      }
    ]
  },
  {
    name: "Windows & Microsoft Office Courses",
    icon: "🪟",
    courses: [
      {
        id: "ms-office-complete",
        name: "MS Office Complete Suite",
        category: "Windows & Microsoft Office Courses",
        icon: "🪟",
        description: "Comprehensive training in Microsoft Office applications including Word, Excel, PowerPoint, and Access for professional productivity.",
        duration: "2 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [
          "MS Word - Document Creation and Formatting",
          "MS Excel - Spreadsheets and Data Analysis",
          "MS PowerPoint - Presentation Design",
          "MS Access - Database Management"
        ],
        careerOpportunities: [
          "Office Administrator",
          "Data Entry Specialist",
          "Executive Assistant",
          "Business Analyst"
        ],
        price: 12000,
        features: [
          "Practical exercises",
          "Real-world scenarios",
          "Certification preparation",
          "Lifetime access to resources"
        ]
      },
      {
        id: "ms-word",
        name: "MS Word",
        category: "Windows & Microsoft Office Courses",
        icon: "📝",
        description: "Learn to create, format, and manage documents using Microsoft Word.",
        duration: "1 month",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Office Assistant", "Clerk"],
        price: 4000,
        features: ["Hands-on practice", "Document templates"]
      },
      {
        id: "ms-excel",
        name: "MS Excel",
        category: "Windows & Microsoft Office Courses",
        icon: "📊",
        description: "Master data analysis, formulas, and charting in Microsoft Excel.",
        duration: "1.5 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Data Entry Specialist", "Accountant"],
        price: 6000,
        features: ["Practical exercises", "Advanced formulas"]
      },
      {
        id: "ms-powerpoint",
        name: "MS PowerPoint",
        category: "Windows & Microsoft Office Courses",
        icon: "🖥️",
        description: "Create compelling presentations with animations, transitions, and multimedia in Microsoft PowerPoint.",
        duration: "1 month",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Presenter", "Marketing Assistant"],
        price: 4000,
        features: ["Design principles", "Interactive presentations"]
      },
      {
        id: "ms-access",
        name: "MS Access",
        category: "Windows & Microsoft Office Courses",
        icon: "🗄️",
        description: "Learn database design and management using Microsoft Access.",
        duration: "1.5 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Database Assistant", "Data Administrator"],
        price: 7000,
        features: ["Database creation", "Query building"]
      },
      {
        id: "ms-power-bi",
        name: "MS Power BI",
        category: "Windows & Microsoft Office Courses",
        icon: "📊",
        description: "Transform data into rich, interactive dashboards and reports with Power BI.",
        duration: "2 months",
        level: "Intermediate" as const,
        prerequisites: ["Basic Excel knowledge"],
        syllabus: [],
        careerOpportunities: ["Business Intelligence Analyst", "Data Analyst"],
        price: 15000,
        features: ["Data modeling", "Report publishing"]
      }
    ]
  },
  {
    name: "Social Media Marketing",
    icon: "📱",
    courses: [
      {
        id: "social-media-mastery",
        name: "Social Media Marketing Mastery",
        category: "Social Media Marketing",
        icon: "📱",
        description: "Learn comprehensive social media marketing strategies for various platforms including Facebook, Instagram, YouTube, and WhatsApp.",
        duration: "2 months",
        level: "Beginner" as const,
        prerequisites: ["Basic internet knowledge"],
        syllabus: [
          "Social Media Strategy",
          "Content Creation",
          "Platform-specific Marketing",
          "Analytics and Reporting",
          "Campaign Management"
        ],
        careerOpportunities: [
          "Social Media Manager",
          "Digital Marketing Specialist",
          "Content Creator",
          "Marketing Consultant"
        ],
        price: 15000,
        features: [
          "Live project work",
          "Case studies",
          "Industry tools training",
          "Portfolio development"
        ]
      },
      {
        id: "youtube-marketing",
        name: "YouTube Marketing",
        category: "Social Media Marketing",
        icon: "▶️",
        description: "Learn to grow your brand and reach on YouTube through effective video marketing strategies.",
        duration: "1 month",
        level: "Beginner" as const,
        prerequisites: ["Basic social media knowledge"],
        syllabus: [],
        careerOpportunities: ["Video Marketer", "Content Creator"],
        price: 8000,
        features: ["Channel optimization", "Audience engagement"]
      },
      {
        id: "facebook-marketing",
        name: "Facebook Marketing",
        category: "Social Media Marketing",
        icon: "👍",
        description: "Master Facebook advertising and organic strategies to drive business growth.",
        duration: "1 month",
        level: "Beginner" as const,
        prerequisites: ["Basic social media knowledge"],
        syllabus: [],
        careerOpportunities: ["Social Media Advertiser", "Digital Marketer"],
        price: 8000,
        features: ["Ad campaign setup", "Audience targeting"]
      },
      {
        id: "whatsapp-marketing",
        name: "WhatsApp Marketing",
        category: "Social Media Marketing",
        icon: "💬",
        description: "Utilize WhatsApp for business communication, customer support, and marketing campaigns.",
        duration: "0.5 months",
        level: "Beginner" as const,
        prerequisites: ["Basic smartphone usage"],
        syllabus: [],
        careerOpportunities: ["Customer Engagement Specialist", "Digital Marketing Assistant"],
        price: 5000,
        features: ["Bulk messaging", "Automated responses"]
      },
      {
        id: "instagram-marketing",
        name: "Instagram Marketing",
        category: "Social Media Marketing",
        icon: "📸",
        description: "Build a strong brand presence and engage with your audience on Instagram.",
        duration: "1 month",
        level: "Beginner" as const,
        prerequisites: ["Basic social media knowledge"],
        syllabus: [],
        careerOpportunities: ["Social Media Influencer", "Content Strategist"],
        price: 8000,
        features: ["Content planning", "Hashtag strategy"]
      }
    ]
  },
  {
    name: "AI & Digital Tools",
    icon: "🤖",
    courses: [
      {
        id: "ai-tools-mastery",
        name: "AI Tools & Digital Skills",
        category: "AI & Digital Tools",
        icon: "🤖",
        description: "Master modern AI tools and digital applications including ChatGPT, Canva, Tableau, and Google Workspace for enhanced productivity.",
        duration: "2 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [
          "ChatGPT for Business",
          "Canva Design Mastery",
          "Tableau Data Visualization",
          "Google Workspace Applications"
        ],
        careerOpportunities: [
          "Digital Content Creator",
          "Data Analyst",
          "AI Implementation Specialist",
          "Business Process Optimizer"
        ],
        price: 18000,
        features: [
          "Hands-on tool training",
          "Project-based learning",
          "Industry certification",
          "Lifetime tool access"
        ]
      },
      {
        id: "chatgpt",
        name: "ChatGPT",
        category: "AI & Digital Tools",
        icon: "💬",
        description: "Learn to effectively use ChatGPT for content generation, coding assistance, and various applications.",
        duration: "0.5 months",
        level: "Beginner" as const,
        prerequisites: ["Basic internet usage"],
        syllabus: [],
        careerOpportunities: ["Content Writer", "AI Assistant"],
        price: 5000,
        features: ["Prompt engineering", "Use case scenarios"]
      },
      {
        id: "canva",
        name: "Canva",
        category: "AI & Digital Tools",
        icon: "🎨",
        description: "Master graphic design with Canva for creating stunning visuals, presentations, and social media content.",
        duration: "1 month",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Graphic Designer", "Social Media Manager"],
        price: 6000,
        features: ["Design templates", "Branding elements"]
      },
      {
        id: "tableau",
        name: "Tableau",
        category: "AI & Digital Tools",
        icon: "📊",
        description: "Learn data visualization and business intelligence with Tableau for creating interactive dashboards.",
        duration: "2 months",
        level: "Intermediate" as const,
        prerequisites: ["Basic Excel knowledge"],
        syllabus: [],
        careerOpportunities: ["Data Analyst", "Business Intelligence Analyst"],
        price: 14000,
        features: ["Data source connection", "Dashboard creation"]
      },
      {
        id: "google-workspace",
        name: "Google Workspace Apps",
        category: "AI & Digital Tools",
        icon: "☁️",
        description: "Efficiently use Google Workspace applications like Docs, Sheets, Slides, and Drive for productivity and collaboration.",
        duration: "1.5 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["Office Administrator", "Project Coordinator"],
        price: 9000,
        features: ["Collaborative tools", "Productivity hacks"]
      }
    ]
  },
  {
    name: "General & Other Software",
    icon: "🧾",
    courses: [
      {
        id: "tally-prime",
        name: "Tally Prime",
        category: "General & Other Software",
        icon: "🧾",
        description: "Comprehensive training in Tally Prime for accounting, inventory management, and business operations.",
        duration: "2 months",
        level: "Beginner" as const,
        prerequisites: ["Basic accounting knowledge"],
        syllabus: [
          "Tally Prime Basics",
          "Accounting in Tally",
          "Inventory Management",
          "Taxation and Compliance",
          "Advanced Features"
        ],
        careerOpportunities: [
          "Accountant",
          "Financial Analyst",
          "Business Manager",
          "Tax Consultant"
        ],
        price: 10000,
        features: [
          "Practical accounting exercises",
          "Industry-standard practices",
          "Certification preparation",
          "Placement assistance"
        ]
      },
      {
        id: "internet-basics",
        name: "Internet",
        category: "General & Other Software",
        icon: "🌐",
        description: "Learn the basics of internet usage, browsing, email, and online safety.",
        duration: "0.5 months",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["General Computer User"],
        price: 3000,
        features: ["Safe browsing practices", "Email management"]
      },
      {
        id: "nudi",
        name: "NUDI",
        category: "General & Other Software",
        icon: "📚",
        description: "(Please provide description for NUDI if available)",
        duration: "1 month",
        level: "Beginner" as const,
        prerequisites: ["Basic computer knowledge"],
        syllabus: [],
        careerOpportunities: ["(Please provide career opportunities for NUDI)"],
        price: 5000,
        features: ["(Please provide features for NUDI)"]
      }
    ]
  }
] 