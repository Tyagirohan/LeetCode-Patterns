# 🎯 LeetCode Patterns - Week 4

![Status](https://img.shields.io/badge/Status-Complete-success)
![Projects](https://img.shields.io/badge/Projects-6-blue)
![Week](https://img.shields.io/badge/Week-4-green)

> **Master 6 patterns that unlock 300+ LeetCode problems**

Interactive visualizers for the most common coding interview patterns. Each project includes animated step-by-step walkthroughs, multiple problem examples, and real-world applications.

---

## 🚀 Live Projects

### **Day 1: Fast & Slow Pointers** 🐢🐰
**Pattern**: Floyd's Cycle Detection (Tortoise & Hare)

Detect cycles and find duplicates using two pointers moving at different speeds.

**Key Features**:
- Animated tortoise & hare visualization
- Cycle detection in linked lists
- Find duplicate number algorithm
- Happy number checker
- Interactive custom list builder

**Problems Solved**:
- Linked List Cycle (LeetCode 141, 142)
- Find Duplicate Number (LeetCode 287)
- Happy Number (LeetCode 202)
- Middle of Linked List (LeetCode 876)

**Real-World Use**: Memory leak detection, loop detection, duplicate detection in streams

🔗 **[Live Demo](#)** | 📂 **[Code](./day01-fast-slow-pointers/)**

**Tech Stack**: Vanilla JS, Canvas API, O(n) time, O(1) space

---

### **Day 2: Merge Intervals** 📊
**Pattern**: Sort + Merge Overlapping Ranges

Schedule meetings, merge time intervals, and solve resource allocation problems.

**Key Features**:
- Timeline visualization with animated merging
- 4 problem types (Merge, Insert, Meeting Rooms, Non-overlapping)
- Interactive custom interval input
- Quick presets (Calendar, Busy Schedule, Sparse, Complex)
- Real-time stats tracking
- Color-coded intervals and merges

**Problems Solved**:
- Merge Intervals (LeetCode 56)
- Insert Interval (LeetCode 57)
- Meeting Rooms I & II (LeetCode 252, 253)
- Non-overlapping Intervals (LeetCode 435)
- Interval List Intersections (LeetCode 986)

**Real-World Use**: Calendar apps (Google Calendar), resource scheduling, timeline management, booking systems

🔗 **[Live Demo](#)** | 📂 **[Code](./day02-merge-intervals/)**

**Tech Stack**: Vanilla JS, Canvas API, O(n log n) time

---

### **Day 3: Backtracking** ♟️
**Pattern**: Try → Check → Recurse → Backtrack

Solve N-Queens and Sudoku puzzles with animated decision tree exploration.

**Key Features**:
- N-Queens solver (4x4 to 8x8 boards)
- Sudoku solver with 4 difficulty levels
- Animated backtracking visualization
- Multiple solutions viewer (N-Queens)
- Real-time statistics (attempts, backtracks, solutions)
- Speed control and step-by-step mode

**Problems Solved**:
- N-Queens (LeetCode 51, 52)
- Sudoku Solver (LeetCode 37)
- Permutations (LeetCode 46)
- Subsets (LeetCode 78)
- Generate Parentheses (LeetCode 22)

**Real-World Use**: Game AI, puzzle solvers, constraint satisfaction, scheduling, resource allocation

🔗 **[Live Demo](#)** | 📂 **[Code](./day03-backtracking/)**

**Tech Stack**: Vanilla JS, Canvas API, O(b^d) complexity

---

### **Day 4: Top K Elements** 🏆
**Pattern**: Heap / Priority Queue for Efficient Top K

Find top K elements using min/max heaps - faster than full sorting!

**Key Features**:
- Kth largest element finder
- Top K frequent elements
- K closest points to origin
- Heap structure visualization
- Array and comparison views
- Real-time performance comparison

**Problems Solved**:
- Kth Largest Element (LeetCode 215)
- Top K Frequent Elements (LeetCode 347)
- K Closest Points (LeetCode 973)
- Find Median from Stream (LeetCode 295)

**Real-World Use**: Leaderboards, recommendations, search ranking, OS task scheduling

🔗 **[Live Demo](#)** | 📂 **[Code](./day04-top-k-elements/)**

**Tech Stack**: Vanilla JS, Heap implementation, O(n log k) time

---

### **Day 5: Binary Tree Patterns** 🌳
**Pattern**: DFS/BFS Traversals & Path Problems

Master all tree traversal types with interactive visualization and path finding.

**Key Features**:
- 5 traversal types (Inorder, Preorder, Postorder, Level Order, Zigzag)
- Interactive tree builder
- Path sum calculator
- Animated step-by-step traversal
- Color-coded visualization
- Real-time result display

**Problems Solved**:
- Binary Tree Traversals (LeetCode 94, 144, 145, 102)
- Path Sum (LeetCode 112, 113)
- Zigzag Level Order (LeetCode 103)
- Lowest Common Ancestor (LeetCode 236)

**Real-World Use**: File systems, DOM manipulation, org hierarchies, compilers, databases

🔗 **[Live Demo](#)** | 📂 **[Code](./day05-binary-tree/)**

**Tech Stack**: Vanilla JS, Canvas API, O(n) traversals

---

### **Day 6: Subsets & Permutations** 🔄
**Pattern**: Generate All Combinations

Generate all subsets, permutations, and combinations with decision tree visualization.

**Key Features**:
- Subsets generator (2^n combinations)
- Permutations generator (n! arrangements)
- Combinations (choose K from N)
- Real-time result display in grid
- Expected count calculator
- Exponential growth demonstration

**Problems Solved**:
- Subsets (LeetCode 78, 90)
- Permutations (LeetCode 46, 47)
- Combinations (LeetCode 77)
- Combination Sum (LeetCode 39)

**Real-World Use**: Password generation, test cases, feature flags, A/B testing, menu planning

🔗 **[Live Demo](#)** | 📂 **[Code](./day06-subsets-permutations/)**

**Tech Stack**: Vanilla JS, Recursive backtracking, O(2^n) / O(n!) complexity

---

## 📚 Pattern Coverage

These 6 patterns solve **300+** LeetCode problems:

| Pattern | Problems | Difficulty | Time Complexity |
|---------|----------|------------|-----------------|
| Fast & Slow Pointers | ~30 | Easy-Medium | O(n) |
| Merge Intervals | ~40 | Medium | O(n log n) |
| Backtracking | ~50 | Medium-Hard | O(2^n) |
| Top K Elements | ~40 | Medium | O(n log k) |
| Tree Patterns | ~100+ | Easy-Hard | O(n) |
| Subsets/Permutations | ~50 | Medium | O(2^n) |

---

## 🎯 Learning Path

### Week 1: Data Structures
Built the building blocks (Stack, Queue, Hash Map, Linked List, Tree, Graph)

### Week 2: Core Algorithms
Implemented fundamental algorithms (Binary Search, Two Pointers, Merge Sort, Dijkstra's, DP)

### Week 3: Real-World Applications
Created production tools (Git Diff, Autocomplete, GPS, Calculator, Compressor, Load Balancer)

### Week 4: LeetCode Patterns ← You Are Here!
Master interview patterns that unlock hundreds of problems

---

## 💡 Why Patterns Matter

Instead of memorizing 1000 problems, learn 6 patterns:
- ✅ **Recognition**: See a problem → Know the pattern
- ✅ **Application**: Apply pattern → Solve similar problems
- ✅ **Interview Ready**: Most FAANG questions use these patterns
- ✅ **Efficiency**: Solve 300+ problems with 6 techniques

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Visualization**: Canvas API, CSS Animations
- **Hosting**: GitHub Pages
- **Philosophy**: No frameworks, pure understanding

---

## 📖 How to Use

1. **Watch**: See the algorithm animate step-by-step
2. **Interact**: Try custom inputs and test cases
3. **Learn**: Understand when to apply each pattern
4. **Practice**: Solve linked LeetCode problems
5. **Master**: Recognize patterns in new problems

---

## 🎨 Project Features

Every project includes:
- ✅ Interactive visualization (animated)
- ✅ Multiple problem examples (3-4 per pattern)
- ✅ Speed control (slow/normal/fast/instant)
- ✅ Custom input (test your own cases)
- ✅ Code walkthrough (see algorithm execute)
- ✅ Time/Space complexity analysis
- ✅ Pattern recognition guide
- ✅ LeetCode problem links

---

## 📊 Progress Tracker

- [x] **Day 1**: Fast & Slow Pointers ✅
- [x] **Day 2**: Merge Intervals ✅
- [x] **Day 3**: Backtracking ✅
- [x] **Day 4**: Top K Elements ✅
- [x] **Day 5**: Binary Tree Patterns ✅
- [x] **Day 6**: Subsets & Permutations ✅

**🎉 Week 4 Complete!**

---

## 🔗 Previous Series

- 📦 **[Week 1: Data Structures](https://github.com/Tyagirohan/build-with-dsa)** - Building blocks
- ⚡ **[Week 2: Core Algorithms](https://github.com/Tyagirohan/Algorithms-in-Action)** - Fundamental algorithms
- 🌍 **[Week 3: Real-World Applications](https://github.com/Tyagirohan/Real-World-Applications)** - Production tools

---

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/Tyagirohan/LeetCode-Patterns.git
cd LeetCode-Patterns
```

2. Open any project
```bash
cd day01-fast-slow-pointers
# Open index.html in your browser
```

3. No build step needed - pure HTML/CSS/JS!

---

## 🎯 Interview Preparation

After completing this series, you'll be able to:
- ✅ Recognize patterns in new problems
- ✅ Know which pattern to apply
- ✅ Implement solutions efficiently
- ✅ Explain your approach clearly
- ✅ Handle follow-up questions

---

## 📱 Connect

Built by **Rohan Tyagi**

🔗 [GitHub](https://github.com/Tyagirohan) | 💼 [LinkedIn](https://www.linkedin.com/in/rohan-tyagi/)

---

## 📄 License

MIT License - Feel free to use for learning!

---

**Master patterns, not problems** 🎯

