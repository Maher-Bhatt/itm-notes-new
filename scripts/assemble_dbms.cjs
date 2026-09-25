const fs = require('fs');
const path = require('path');

const scratchDir = 'C:/Users/maher/.gemini/antigravity/brain/0106a889-820f-49e8-8756-464effd584c4/scratch';
const units = [
  require(path.join(scratchDir, 'unit1.js')),
  require(path.join(scratchDir, 'unit2.js')),
  require(path.join(scratchDir, 'unit3.js')),
  require(path.join(scratchDir, 'unit4.js')),
  require(path.join(scratchDir, 'unit5.js')),
  require(path.join(scratchDir, 'unit6.js'))
];

const subject = {
  id: 'sem3-dbms',
  name: 'Database Management Systems (DBMS)',
  code: 'DBMS302',
  color: 'bg-orange-600',
  icon: 'server',
  description: 'Comprehensive University Syllabus for Database Management Systems — 3-Tier Architecture, ER Modeling, Relational Algebra, Advanced SQL, Normalization (1NF-5NF), Transactions & Concurrency (2PL, Deadlocks), and Storage Indexing (B+ Trees)',
  semester: 3,
  units: units
};

const tsContent = `import type { Subject } from './types';\n\nexport const sem3DbmsMaster: Subject = ` + JSON.stringify(subject, null, 2) + `;\n`;

const targetPath = path.resolve(__dirname, '../src/data/sem3-dbms-master.ts');
fs.writeFileSync(targetPath, tsContent, 'utf8');
console.log('Successfully wrote to', targetPath, 'Total bytes:', tsContent.length);
