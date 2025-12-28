# 🌳 Binary Tree Patterns - DFS/BFS Traversals

**Day 5 of 6** | LeetCode Patterns Series

An interactive visualizer for Binary Tree traversals and path problems!

![Pattern](https://img.shields.io/badge/Pattern-Tree%20Traversal-blue)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy--Hard-orange)
![Problems](https://img.shields.io/badge/Solves-100%2B%20Problems-green)

## 🎯 Pattern Overview

**Binary Tree Patterns** cover various ways to traverse and manipulate tree structures using DFS (Depth-First Search) and BFS (Breadth-First Search).

### When to Use This Pattern

- 🌳 Tree traversal (any order)
- 🛤️ Path sum problems
- 🔍 Search operations
- 📊 Level-order operations
- 🏗️ Tree construction

## ⚡ Complexity

- **Time Complexity**: O(n) - visit each node once
- **Space Complexity**: O(h) for DFS, O(w) for BFS
  - h = tree height
  - w = maximum width (level with most nodes)

## 🎨 Features

### 5 Traversal Types

1. **Inorder** - Left → Root → Right (gives sorted order for BST)
2. **Preorder** - Root → Left → Right (creates copy of tree)
3. **Postorder** - Left → Right → Root (deletes tree safely)
4. **Level Order** - BFS layer by layer
5. **Zigzag** - Alternate left-right, right-left

### 3 Interactive Modes

1. **All Traversals** - Watch any traversal type animate
2. **Path Sum** - Find all root-to-leaf paths with target sum
3. **Build Your Tree** - Click to add nodes interactively!

### Interactive Features

✅ **Animated Traversal** - Watch nodes visit in real-time  
✅ **Color Coding** - Blue (unvisited), Orange (visiting), Green (visited)  
✅ **5 Traversal Types** - Switch between any traversal  
✅ **Path Sum Finder** - Find all paths with target sum  
✅ **Interactive Builder** - Build custom trees by clicking  
✅ **Real-time Results** - See traversal output update live  
✅ **Speed Control** - Adjust animation speed  

## 🧠 How It Works

### DFS Traversals (Recursive)

```javascript
// Inorder: Left → Root → Right
function inorder(root) {
    if (!root) return;
    inorder(root.left);    // Left
    visit(root);           // Root
    inorder(root.right);   // Right
}
```

**When to use**:
- **Inorder**: Get sorted values from BST
- **Preorder**: Create copy of tree, serialize tree
- **Postorder**: Delete tree, evaluate expressions

### BFS Level Order (Iterative)

```javascript
function levelOrder(root) {
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.val);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return result;
}
```

**When to use**: Level-by-level operations, shortest path, zigzag traversal

## 📚 Problems Solved

This pattern solves **100+ LeetCode problems**, including:

| # | Problem | Difficulty | Concept | Link |
|---|---------|-----------|---------|------|
| 94 | Binary Tree Inorder | Easy | DFS iterative | [LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/) |
| 102 | Level Order Traversal | Medium | BFS queue | [LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/) |
| 112 | Path Sum | Easy | DFS path tracking | [LeetCode](https://leetcode.com/problems/path-sum/) |
| 113 | Path Sum II | Medium | All paths | [LeetCode](https://leetcode.com/problems/path-sum-ii/) |
| 103 | Zigzag Level Order | Medium | BFS with direction | [LeetCode](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) |
| 236 | Lowest Common Ancestor | Medium | DFS LCA | [LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) |

## 🌍 Real-World Applications

Trees are everywhere in software!

- **File Systems**: Directory traversal (DFS for search, BFS for size calculation)
- **DOM Manipulation**: HTML element traversal, CSS selector matching
- **Organization Charts**: Employee hierarchy, reporting structure
- **Compilers**: Abstract syntax tree traversal, code generation
- **Databases**: B-tree index traversal, query optimization
- **AI/ML**: Decision trees, game trees (minimax), neural network architectures

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Select mode: Traversals / Path Sum / Builder
3. For Traversals: Choose type and click "Start"
4. For Path Sum: Set target sum and click "Start"
5. For Builder: Click nodes to add children!

## 💡 Key Learning Points

### 1. Traversal Order Matters

```
Tree:      10
          /  \
         5    15
        / \
       3   7

Inorder:    [3, 5, 7, 10, 15]  ← Sorted!
Preorder:   [10, 5, 3, 7, 15]  ← Root first
Postorder:  [3, 7, 5, 15, 10]  ← Root last
Level Order: [10, 5, 15, 3, 7] ← Layer by layer
```

### 2. DFS vs BFS

| Aspect | DFS | BFS |
|--------|-----|-----|
| **Data Structure** | Stack (recursion) | Queue |
| **Space** | O(h) - height | O(w) - width |
| **Use Case** | Deep searches, paths | Level operations, shortest |
| **Code Style** | Recursive (elegant) | Iterative (queue) |

### 3. Path Problems Pattern

```javascript
function pathSum(root, targetSum) {
    const paths = [];
    
    function dfs(node, currentPath, currentSum) {
        if (!node) return;
        
        currentPath.push(node.val);
        currentSum += node.val;
        
        // Leaf node - check if sum matches
        if (!node.left && !node.right) {
            if (currentSum === targetSum) {
                paths.push([...currentPath]);
            }
        }
        
        dfs(node.left, currentPath, currentSum);
        dfs(node.right, currentPath, currentSum);
        
        currentPath.pop(); // Backtrack
    }
    
    dfs(root, [], 0);
    return paths;
}
```

### 4. Level Order Variations

- **Normal**: Left to right each level
- **Zigzag**: Alternate direction each level
- **Bottom-up**: Reverse the final result
- **Right-side view**: Last node of each level

## 🎓 Interview Tips

### When you see these keywords, think **Tree Patterns**:

- "Binary tree traversal..."
- "Path from root to leaf..."
- "Level order..."
- "Depth of tree..."
- "All paths..."
- "Serialize/deserialize..."

### Common Patterns by Problem Type

| Problem Type | Pattern | Traversal |
|-------------|---------|-----------|
| Sum paths | DFS + backtrack | Any DFS |
| Level operations | BFS | Level order |
| Serialize tree | DFS | Preorder |
| Delete tree | DFS | Postorder |
| BST operations | DFS | Inorder |
| Tree copy | DFS | Preorder |

### Edge Cases to Consider

- Empty tree (`root === null`)
- Single node tree
- Left-skewed tree (linked list)
- Right-skewed tree
- Perfect binary tree
- Complete vs full trees

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - All logic
- **Canvas API** - Tree visualization
- **TreeNode Class** - Custom implementation

## 📖 Tree Terminology

- **Root**: Top node
- **Leaf**: Node with no children
- **Height**: Longest path from root to leaf
- **Depth**: Distance from root to node
- **Level**: All nodes at same depth
- **Balanced**: Height difference ≤ 1
- **Complete**: All levels filled except possibly last

## 🔗 Series Navigation

- **Day 1**: Fast & Slow Pointers
- **Day 2**: Merge Intervals
- **Day 3**: Backtracking
- **Day 4**: Top K Elements
- **Day 5**: Binary Tree Patterns ← You Are Here
- **Day 6**: Subsets & Permutations

---

**Master patterns, not problems!** 🎯

Built with 💙 by [Rohan Tyagi](https://github.com/Tyagirohan)

