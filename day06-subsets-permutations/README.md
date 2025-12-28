# 🔄 Subsets & Permutations - Generate All Combinations

**Day 6 of 6** | LeetCode Patterns Series

An interactive visualizer for generating Subsets, Permutations, and Combinations!

![Pattern](https://img.shields.io/badge/Pattern-Backtracking-blue)
![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Problems](https://img.shields.io/badge/Solves-50%2B%20Problems-green)

## 🎯 Pattern Overview

**Subsets & Permutations** use backtracking to generate all possible combinations of elements.

### When to Use This Pattern

- 🎲 Generate all subsets (power set)
- 🔀 Generate all permutations
- 🎯 Combination problems (choose K from N)
- 📋 "All possible" questions
- 🧪 Test case generation

## ⚡ Complexity

| Problem | Time | Space | Count |
|---------|------|-------|-------|
| **Subsets** | O(2^n) | O(n) | 2^n |
| **Permutations** | O(n!) | O(n) | n! |
| **Combinations** | O(C(n,k)) | O(k) | n!/(k!(n-k)!) |

### Exponential Growth Warning! ⚠️

- n=5: Subsets=32, Permutations=120
- n=10: Subsets=1,024, Permutations=3,628,800!
- n=15: Subsets=32,768, Permutations=1.3 trillion!

## 🎨 Features

### 3 Problem Types

1. **Subsets** (LC 78) - All possible subsets (2^n)
2. **Permutations** (LC 46) - All arrangements (n!)
3. **Combinations** (LC 77) - Choose K from N (C(n,k))

### Interactive Features

✅ **Live Generation** - Watch results generate in real-time  
✅ **Decision Tree Visualization** - See the backtracking tree  
✅ **Custom Input** - Test your own arrays  
✅ **Expected Count** - Know how many results to expect  
✅ **Real-time Results** - See all combinations as they're generated  
✅ **Speed Control** - Adjust animation speed  
✅ **Grid Display** - Results displayed in organized grid  

## 🧠 How It Works

### Subsets: Include or Exclude

```javascript
function subsets(nums) {
    const result = [];
    
    function backtrack(index, current) {
        if (index === nums.length) {
            result.push([...current]);
            return;
        }
        
        // Exclude current element
        backtrack(index + 1, current);
        
        // Include current element
        current.push(nums[index]);
        backtrack(index + 1, current);
        current.pop();
    }
    
    backtrack(0, []);
    return result;
}
```

**For [1,2,3]**: 2^3 = 8 subsets  
`[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]`

### Permutations: Try Each in Each Position

```javascript
function permute(nums) {
    const result = [];
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            
            const newRemaining = [
                ...remaining.slice(0, i),
                ...remaining.slice(i + 1)
            ];
            
            backtrack(current, newRemaining);
            current.pop();
        }
    }
    
    backtrack([], nums);
    return result;
}
```

**For [1,2,3]**: 3! = 6 permutations  
`[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]`

### Combinations: Choose K Elements

```javascript
function combine(n, k) {
    const result = [];
    
    function backtrack(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i <= n; i++) {
            current.push(i);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(1, []);
    return result;
}
```

**For n=4, k=2**: C(4,2) = 6 combinations  
`[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]`

## 📚 Problems Solved

This pattern solves **50+ LeetCode problems**, including:

| # | Problem | Difficulty | Concept | Link |
|---|---------|-----------|---------|------|
| 78 | Subsets | Medium | Power set | [LeetCode](https://leetcode.com/problems/subsets/) |
| 90 | Subsets II | Medium | With duplicates | [LeetCode](https://leetcode.com/problems/subsets-ii/) |
| 46 | Permutations | Medium | All arrangements | [LeetCode](https://leetcode.com/problems/permutations/) |
| 47 | Permutations II | Medium | With duplicates | [LeetCode](https://leetcode.com/problems/permutations-ii/) |
| 77 | Combinations | Medium | Choose K | [LeetCode](https://leetcode.com/problems/combinations/) |
| 39 | Combination Sum | Medium | Sum to target | [LeetCode](https://leetcode.com/problems/combination-sum/) |

## 🌍 Real-World Applications

This pattern is everywhere!

- **Password Generation**: All possible character combinations
- **Test Case Generation**: All input combinations for testing
- **Feature Flags**: All on/off combinations (2^n features)
- **Menu Planning**: All meal combinations
- **A/B Testing**: All experiment variant combinations
- **Cryptography**: Key generation, brute force attacks
- **Game Development**: All possible game states
- **Scheduling**: All possible meeting arrangements

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Select problem type (Subsets / Permutations / Combinations)
3. Enter your array (or use default [1,2,3])
4. For Combinations: Set K value
5. Click "Generate" to watch magic happen!
6. Results appear in real-time in the grid

## 💡 Key Learning Points

### 1. Pattern Recognition

| Problem Keywords | Use This Pattern |
|-----------------|------------------|
| "All possible subsets" | Subsets (2^n) |
| "All arrangements" | Permutations (n!) |
| "Choose K from N" | Combinations C(n,k) |
| "Power set" | Subsets |
| "All valid combinations" | Backtracking |

### 2. Complexity Comparison

```
n=5:
- Subsets: 2^5 = 32 ✅ Fast
- Combinations (k=2): C(5,2) = 10 ✅ Fast
- Permutations: 5! = 120 ✅ OK

n=10:
- Subsets: 2^10 = 1,024 ✅ OK
- Combinations (k=5): C(10,5) = 252 ✅ OK
- Permutations: 10! = 3,628,800 ⚠️ Slow!

n=15:
- Subsets: 2^15 = 32,768 ⚠️ Getting large
- Permutations: 15! = 1.3 trillion 🔥 DON'T!
```

### 3. Space Optimization

- **Iterative subsets**: Use bit manipulation
- **Permutations**: Swap in-place (Heap's algorithm)
- **Combinations**: Generate on-demand (not store all)

### 4. Handling Duplicates

```javascript
// For arrays with duplicates, SORT first!
function subsetsWithDup(nums) {
    nums.sort(); // Critical!
    
    function backtrack(index, current) {
        result.push([...current]);
        
        for (let i = index; i < nums.length; i++) {
            // Skip duplicates
            if (i > index && nums[i] === nums[i-1]) continue;
            
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
}
```

## 🎓 Interview Tips

### Common Variations

| Variation | Modification |
|-----------|-------------|
| With duplicates | Sort first, skip adjacent duplicates |
| Sum to target | Add constraint check |
| Unique elements only | Use Set or skip duplicates |
| Limited size | Add size constraint |
| Custom constraints | Add validation in backtrack |

### Edge Cases

- Empty array: `[]` → Subsets: `[[]]`, Permutations: `[[]]`
- Single element: `[1]` → Check both work
- All duplicates: `[1,1,1]` → Handle properly
- Large n: Warn about exponential growth!

### Optimization Tricks

1. **Pruning**: Skip invalid branches early
2. **Memorization**: Cache results if possible
3. **Iterative**: Use bit manipulation for subsets
4. **In-place**: Swap for permutations

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with grid layout
- **Vanilla JavaScript** - All logic
- **Canvas API** - Decision tree visualization

## 📖 Mathematical Formulas

### Subsets (Power Set)
- **Count**: 2^n
- **Why**: Each element in/out (2 choices) × n elements
- **Example**: [1,2,3] → 2³ = 8 subsets

### Permutations
- **Count**: n!
- **Why**: n choices for first, (n-1) for second, etc.
- **Example**: [1,2,3] → 3! = 3×2×1 = 6 permutations

### Combinations
- **Count**: C(n,k) = n! / (k!(n-k)!)
- **Why**: Choose k from n, order doesn't matter
- **Example**: C(5,2) = 5!/(2!3!) = 10 combinations

## 🔗 Series Navigation

- **Day 1**: Fast & Slow Pointers
- **Day 2**: Merge Intervals
- **Day 3**: Backtracking
- **Day 4**: Top K Elements
- **Day 5**: Binary Tree Patterns
- **Day 6**: Subsets & Permutations ← You Are Here

---

## 🎉 **Week 4 Complete!**

You've mastered 6 patterns that unlock 300+ LeetCode problems!

**Master patterns, not problems!** 🎯

Built with 💙 by [Rohan Tyagi](https://github.com/Tyagirohan)

