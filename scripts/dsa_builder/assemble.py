import sys
import json
import os

sys.path.append(os.path.join(os.path.dirname(__file__)))
import unit1, unit2, unit3, unit4, unit5, unit6

units = [
    unit1.unit1,
    unit2.unit2,
    unit3.unit3,
    unit4.unit4,
    unit5.unit5,
    unit6.unit6
]

subject = {
    "id": "sem3-dsa",
    "name": "Data Structures and Algorithms (DSA)",
    "code": "DSA301",
    "color": "bg-green-600",
    "icon": "database",
    "description": "Comprehensive University Syllabus for Data Structures and Algorithms — Asymptotic Complexity Analysis, Linear Structures (Lists, Stacks, Queues), Non-Linear Structures (Trees, AVL, Heaps, Graphs), Shortest Paths, MST, and Sorting/Hashing",
    "semester": 3,
    "units": units
}

ts_content = "import type { Subject } from './types';\n\nexport const sem3DsaMaster: Subject = " + json.dumps(subject, indent=2) + ";\n"

output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../src/data/sem3-dsa-master.ts'))
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully generated {output_path} with {len(units)} units and {sum(len(u['topics']) for u in units)} topics.")
