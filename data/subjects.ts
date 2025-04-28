export interface SyllabusItem {
  id: string
  name: string
}

export interface SubjectData {
  name: string
  items: SyllabusItem[]
}

export const subjectData: Record<string, SubjectData> = {
  coa: {
    name: "Computer Organization & Architecture",
    items: [
      { id: "coa-1", name: "Lecture 1: COA - Lecture 1" },
      { id: "coa-2", name: 'Lecture 2: COA - Lecture 2 A/B"  name: "Lecture 1: COA - Lecture 1' },
      { id: "coa-2", name: "Lecture 2: COA - Lecture 2 A/B" },
      { id: "coa-3", name: "Lecture 3: COA - Lecture 3 A/B" },
      { id: "coa-4", name: "Lecture 4: COA - Lecture 4 A/B" },
      { id: "coa-5", name: "Lecture 5: COA - Lecture 5" },
      { id: "coa-6", name: "Lecture 6: COA - Lecture 6 A/B" },
      { id: "coa-7", name: "Lecture 7: COA - Lecture 7" },
      { id: "coa-8", name: "Lecture 8: COA - Lecture 8" },
      { id: "coa-9", name: "Lecture 9: COA - Lecture 9" },
    ],
  },
  dbms: {
    name: "Database Management Systems",
    items: [
      { id: "dbms-1", name: "Lecture 1-2: Integrity Constraints" },
      { id: "dbms-2", name: "Lecture 3-4: Super key and Foreign key" },
      { id: "dbms-3", name: "Lecture 5-7: Normalization" },
      { id: "dbms-4", name: "Lecture 8-10: Lossless Join and DP" },
      { id: "dbms-5", name: "Lecture 11-12: Normal Forms" },
      { id: "dbms-6", name: "Lecture 13-16: Queries - Relational Algebra" },
      { id: "dbms-7", name: "Lecture 17-20: Queries - SQL" },
      { id: "dbms-8", name: "Lecture 21-24: ER Model" },
      { id: "dbms-9", name: "Lecture 25-28: Indexing" },
      { id: "dbms-10", name: "Lecture 29-32: Transactions and Concurrency Control" },
    ],
  },
  os: {
    name: "Operating Systems",
    items: [
      { id: "os-1", name: "Lecture 1-4: OS Introduction" },
      { id: "os-2", name: "Lecture 5-7: OS Processes" },
      { id: "os-3", name: "Lecture 8-11: OS Memory Management" },
      { id: "os-4", name: "Lecture 12-14: OS File Systems" },
      { id: "os-5", name: "Lecture 15-17: OS Deadlocks" },
      { id: "os-6", name: "Lecture 18-19: OS Advanced Topics" },
    ],
  },
  toc: {
    name: "Theory of Computation",
    items: [
      { id: "toc-1", name: "Lecture 1-3: TOC Basics" },
      { id: "toc-2", name: "Lecture 4-6: Finite Automata" },
      { id: "toc-3", name: "Lecture 7-9: Regular Languages" },
      { id: "toc-4", name: "Lecture 10-12: Context-Free Grammars" },
      { id: "toc-5", name: "Lecture 13-15: Pushdown Automata" },
      { id: "toc-6", name: "Lecture 16-18: Turing Machines" },
      { id: "toc-7", name: "Lecture 19-21: Decidability" },
      { id: "toc-8", name: "Lecture 22-24: Complexity Theory" },
    ],
  },
  cd: {
    name: "Compiler Design",
    items: [
      { id: "cd-1", name: "Lecture 1-3: Lexical Analysis" },
      { id: "cd-2", name: "Lecture 4-6: Syntax Analysis" },
      { id: "cd-3", name: "Lecture 7-9: Semantic Analysis" },
      { id: "cd-4", name: "Lecture 10-12: Intermediate Code Generation" },
      { id: "cd-5", name: "Lecture 13-14: Code Optimization" },
    ],
  },
  dl: {
    name: "Digital Logic",
    items: [
      { id: "dl-1", name: "Lecture 1-3: Boolean Algebra" },
      { id: "dl-2", name: "Lecture 4-6: Combinational Circuits" },
      { id: "dl-3", name: "Lecture 7-9: Sequential Circuits" },
      { id: "dl-4", name: "Lecture 10-12: Minimization Techniques" },
      { id: "dl-5", name: "Lecture 13-15: Memory & Programmable Logic" },
      { id: "dl-6", name: "Lecture 16-18: Advanced Topics" },
    ],
  },
  pds: {
    name: "Programming & Data Structures",
    items: [
      { id: "pds-1", name: "Lecture 1-4: Programming Fundamentals" },
      { id: "pds-2", name: "Lecture 5-8: Arrays & Strings" },
      { id: "pds-3", name: "Lecture 9-12: Linked Lists, Stacks & Queues" },
      { id: "pds-4", name: "Lecture 13-16: Trees & Heaps" },
      { id: "pds-5", name: "Lecture 17-19: Graphs" },
      { id: "pds-6", name: "Lecture 20-22: Hashing & Advanced Topics" },
    ],
  },
  ra: {
    name: "Reasoning & Aptitude",
    items: [
      { id: "ra-1", name: "Lecture 1-4: Verbal Reasoning" },
      { id: "ra-2", name: "Lecture 5-8: Analytical Reasoning" },
      { id: "ra-3", name: "Lecture 9-12: Numerical Reasoning" },
      { id: "ra-4", name: "Lecture 13-16: Data Interpretation" },
    ],
  },
  em: {
    name: "Engineering Mathematics",
    items: [
      { id: "em-1", name: "Lecture 1-5: Linear Algebra" },
      { id: "em-2", name: "Lecture 6-10: Calculus" },
      { id: "em-3", name: "Lecture 11-15: Probability & Statistics" },
      { id: "em-4", name: "Lecture 16-20: Differential Equations" },
      { id: "em-5", name: "Lecture 21-25: Complex Variables & Numerical Methods" },
    ],
  },
  cn: {
    name: "Computer Networks",
    items: [
      { id: "cn-1", name: "Lecture 1-5: Network Fundamentals & Addressing" },
      { id: "cn-2", name: "Lecture 6-10: Data Link Layer & Flow Control" },
      { id: "cn-3", name: "Lecture 11-14: MAC Protocols & LAN" },
      { id: "cn-4", name: "Lecture 15-17: Network Layer & Routing" },
      { id: "cn-5", name: "Lecture 18-19: Application Layer Protocols" },
    ],
  },
  dm: {
    name: "Discrete Mathematics",
    items: [
      { id: "dm-1", name: "Lecture 1-4: Set Theory" },
      { id: "dm-2", name: "Lecture 5-8: Graph Theory" },
      { id: "dm-3", name: "Lecture 9-10: Combinatorics" },
      { id: "dm-4", name: "Lecture 11-13: Mathematical Logic" },
    ],
  },
  algo: {
    name: "Algorithms",
    items: [
      { id: "algo-1", name: "Lecture 1-5: Asymptotic Notations & Complexity" },
      { id: "algo-2", name: "Lecture 6-10: Recurrence Relations" },
      { id: "algo-3", name: "Lecture 11-15: Sorting & Searching" },
      { id: "algo-4", name: "Lecture 16-18: Greedy Algorithms" },
      { id: "algo-5", name: "Lecture 19-21: Dynamic Programming" },
      { id: "algo-6", name: "Lecture 22-24: Graph Algorithms" },
    ],
  },
}
