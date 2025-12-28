# ♟️ Backtracking - Try, Check, Recurse, Backtrack

**Day 3 of 6** | LeetCode Patterns Series

An interactive visualizer for Backtracking algorithms featuring N-Queens and Sudoku solver!

![Pattern](https://img.shields.io/badge/Pattern-Backtracking-blue)
![Difficulty](https://img.shields.io/badge/Difficulty-Medium--Hard-red)
![Problems](https://img.shields.io/badge/Solves-50%2B%20Problems-green)

## 🎯 Pattern Overview

**Backtracking** is an algorithmic technique for finding solutions by trying partial solutions and abandoning them if they don't work (backtracking).

### When to Use This Pattern

- 🎯 Generate all possible solutions
- 🧩 Solve constraint satisfaction problems
- ♟️ Puzzles (Sudoku, N-Queens, crosswords)
- 🔀 Generate permutations/combinations
- 🎮 Game solving (chess, tic-tac-toe)

## ⚡ Complexity

- **Time Complexity**: O(b^d) - exponential
  - b = branching factor (choices per step)
  - d = maximum depth
- **Space Complexity**: O(d) - recursion stack depth
- **Why Exponential**: Must explore many potential solutions

## 🎨 Features

### 2 Classic Problems

1. **N-Queens (LC 51)** - Place N queens on N×N board
2. **Sudoku Solver (LC 37)** - Fill 9×9 grid following Sudoku rules

### Interactive Features

✅ **Animated Backtracking** - Watch the algorithm try, fail, and backtrack  
✅ **Multiple Board Sizes** - N-Queens from 4×4 to 8×8  
✅ **Sudoku Difficulties** - Easy, Medium, Hard, Expert presets  
✅ **Speed Control** - Adjust animation speed  
✅ **Multiple Solutions** - View all N-Queens solutions  
✅ **Real-time Stats** - Track attempts, backtracks, solutions  
✅ **Color Coding** - Visual feedback for attempts and backtracks  

## 🧠 How It Works

### The Universal Backtracking Template

```javascript
function backtrack(state) {
    // Base case: solution found
    if (isComplete(state)) {
        result.push(copy(state));
        return;
    }
    
    // Try all possible choices
    for (let choice of getChoices(state)) {
        // Make choice
        state.add(choice);
        
        // Check if valid
        if (isValid(state)) {
            // Recurse deeper
            backtrack(state);
        }
        
        // Backtrack: undo choice
        state.remove(choice);
    }
}
```

### The 4 Key Steps

1. **Try**: Make a choice (place queen, add digit)
2. **Check**: Is the choice valid? (no conflicts)
3. **Recurse**: Continue with next step
4. **Backtrack**: If stuck, undo and try different choice

## 📚 Problems Solved

This pattern solves **50+ LeetCode problems**, including:

| # | Problem | Difficulty | Concept | Link |
|---|---------|-----------|---------|------|
| 51 | N-Queens | Hard | Constraint satisfaction | [LeetCode](https://leetcode.com/problems/n-queens/) |
| 52 | N-Queens II | Hard | Count solutions | [LeetCode](https://leetcode.com/problems/n-queens-ii/) |
| 37 | Sudoku Solver | Hard | Fill grid with constraints | [LeetCode](https://leetcode.com/problems/sudoku-solver/) |
| 46 | Permutations | Medium | Generate all arrangements | [LeetCode](https://leetcode.com/problems/permutations/) |
| 78 | Subsets | Medium | Generate power set | [LeetCode](https://leetcode.com/problems/subsets/) |
| 22 | Generate Parentheses | Medium | Valid combinations | [LeetCode](https://leetcode.com/problems/generate-parentheses/) |

## 🌍 Real-World Applications

Backtracking isn't just for interviews! Used in:

- **Game AI**: Chess engines, puzzle solvers (Sudoku apps)
- **Scheduling**: Course scheduling, exam timetabling
- **Resource Allocation**: Job assignment, staff rostering
- **Pathfinding**: Maze solving, route planning with constraints
- **Optimization**: Traveling salesman problem, knapsack variants
- **Constraint Satisfaction**: Crossword generation, logic puzzles

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Select N-Queens or Sudoku
3. For N-Queens: Adjust board size (4-8)
4. For Sudoku: Select difficulty preset
5. Click "Solve" to watch backtracking in action!
6. For N-Queens: Click "Next Solution" to see more solutions

## 💡 Key Learning Points

### 1. State Management
Keep track of current state and be able to undo changes efficiently.

### 2. Pruning
Check validity **before** recursing to avoid unnecessary exploration.

### 3. Base Case
Clearly define when a complete solution is found.

### 4. Choice/Explore/Unchoose
The three-step pattern: make choice → explore → undo choice.

### 5. Why It Works
Systematically explores all possibilities, guaranteed to find solution if exists.

## 🎓 Interview Tips

### When you see these keywords, think **Backtracking**:

- "Generate all..."
- "Find all possible..."
- "Solve the puzzle"
- "Place N items with constraints"
- "Valid combinations"
- "Constraint satisfaction"

### Backtracking vs Other Approaches

| Technique | When to Use | Example |
|-----------|-------------|---------|
| **Backtracking** | Need all solutions, complex constraints | N-Queens, Sudoku |
| **Greedy** | Optimize one solution, local choices | Activity selection |
| **Dynamic Programming** | Overlapping subproblems | Knapsack, coin change |
| **DFS/BFS** | Graph traversal | Shortest path |

### Common Variations

1. **Find one solution**: Return immediately when found
2. **Find all solutions**: Continue backtracking after finding each
3. **Count solutions**: Track count without storing solutions
4. **Optimization**: Track best solution (min/max)

### Optimization Techniques

- **Early pruning**: Check validity before recursing
- **Constraint propagation**: Eliminate invalid choices early
- **Heuristics**: Try most constrained variables first
- **Memoization**: Cache results of subproblems (if applicable)

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - All logic
- **Canvas API** - Board visualization

## 📖 N-Queens Insights

### Why It's Hard
- **4-Queens**: 2 solutions
- **5-Queens**: 10 solutions
- **6-Queens**: 4 solutions
- **7-Queens**: 40 solutions
- **8-Queens**: 92 solutions
- **Time**: O(N!) without pruning, better with constraint checking

### Safety Checks Required
1. No queen in same row (implicit - we place one per row)
2. No queen in same column
3. No queen on same diagonal (2 diagonals to check)

## 📖 Sudoku Solver Insights

### The Rules
- Each row must contain digits 1-9
- Each column must contain digits 1-9
- Each 3×3 box must contain digits 1-9

### Optimizations
- Start with cells that have fewest options
- Constraint propagation (not shown in basic version)
- Naked singles/hidden singles techniques

### Complexity
- **Worst case**: O(9^m) where m = empty cells
- **Typical**: Much faster due to pruning

## 🔗 Series Navigation

- **Day 1**: Fast & Slow Pointers
- **Day 2**: Merge Intervals
- **Day 3**: Backtracking ← You Are Here
- **Day 4**: Top K Elements
- **Day 5**: Binary Tree Patterns
- **Day 6**: Subsets & Permutations

---

**Master patterns, not problems!** 🎯

Built with 💙 by [Rohan Tyagi](https://github.com/Tyagirohan)

