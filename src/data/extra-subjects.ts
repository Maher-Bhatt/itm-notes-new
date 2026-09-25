import { Subject } from './types';

export const extraSubjects: Subject[] = [
  {
    id: "sem2-cg",
    name: "Computer Graphics",
    code: "CG201",
    color: "bg-purple-500",
    icon: "monitor",
    description: "Line drawing algorithms, transformations, and 3D graphics.",
    semester: 2,
    units: [
      {
        id: "cg-u1",
        title: "Unit 1: Introduction to Computer Graphics",
        description: "Display devices, raster vs vector graphics.",
        topics: []
      }
    ]
  },
  {
    id: "sem2-dsa",
    name: "Data Structures and Algorithms",
    code: "DSA202",
    color: "bg-green-500",
    icon: "database",
    description: "Trees, Graphs, Sorting, Searching, and Recursion.",
    semester: 2,
    units: [
      {
        id: "dsa-u1",
        title: "Unit 1: Linear Lists",
        description: "Arrays, Linked Lists, Stacks, Queues.",
        topics: []
      }
    ]
  },
  {
    id: "sem3-dbms",
    name: "Database Management System",
    code: "DBMS301",
    color: "bg-orange-500",
    icon: "server",
    description: "SQL, Relational Algebra, Normalization, ER Models.",
    semester: 3,
    units: [
      {
        id: "dbms-u1",
        title: "Unit 1: Introduction to Databases",
        description: "File systems vs DBMS, Architecture, ER Modeling.",
        topics: []
      }
    ]
  },
  {
    id: "sem3-java",
    name: "Object Oriented Programming (Java)",
    code: "OOPS302",
    color: "bg-red-500",
    icon: "coffee",
    description: "Classes, Inheritance, Polymorphism, Exception Handling.",
    semester: 3,
    units: [
      {
        id: "java-u1",
        title: "Unit 1: Java Basics",
        description: "JVM, Data Types, Control Flow.",
        topics: []
      }
    ]
  },
  {
    id: "sem4-aws",
    name: "Advanced Web Services",
    code: "AWS401",
    color: "bg-yellow-500",
    icon: "cloud",
    description: "Cloud computing, Web APIs, Microservices.",
    semester: 4,
    units: [
      {
        id: "aws-u1",
        title: "Unit 1: Cloud Architecture",
        description: "IaaS, PaaS, SaaS.",
        topics: []
      }
    ]
  },
  {
    id: "sem4-cn",
    name: "Computer Networking",
    code: "CN402",
    color: "bg-blue-600",
    icon: "network",
    description: "OSI Model, TCP/IP, Routing, Network Security.",
    semester: 4,
    units: [
      {
        id: "cn-u1",
        title: "Unit 1: Physical and Data Link Layers",
        description: "Transmission media, MAC addresses.",
        topics: []
      }
    ]
  },
  {
    id: "sem4-os",
    name: "Operating System",
    code: "OS403",
    color: "bg-zinc-700",
    icon: "cpu",
    description: "Process management, memory management, file systems.",
    semester: 4,
    units: [
      {
        id: "os-u1",
        title: "Unit 1: Process Scheduling",
        description: "FCFS, SJF, Round Robin.",
        topics: []
      }
    ]
  }
];
