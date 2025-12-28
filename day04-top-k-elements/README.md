# 🏆 Top K Elements - Heap / Priority Queue Pattern

**Day 4 of 6** | LeetCode Patterns Series

An interactive visualizer for the Top K Elements pattern using Min-Heap and Max-Heap!

![Pattern](https://img.shields.io/badge/Pattern-Heap-blue)
![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Problems](https://img.shields.io/badge/Solves-40%2B%20Problems-green)

## 🎯 Pattern Overview

The **Top K Elements** pattern uses heaps (priority queues) to efficiently find the K largest, smallest, or most frequent elements.

### When to Use This Pattern

- 🏆 Find Kth largest/smallest element
- 📊 Top K frequent elements
- 📍 K closest points
- 🔗 Merge K sorted lists
- 📈 Running median from stream

## ⚡ Complexity

- **Time Complexity**: O(n log k)
- **Space Complexity**: O(k)
- **vs Sorting**: O(n log n) time, O(n) space
- **Why Better**: Heap size = k (not n!), massive savings when k << n

### Example Savings
- **Find top 10 from 1 million items**:
  - Sorting: ~20 million operations
  - Heap: ~23 thousand operations
  - **869x faster!** 🚀

## 🎨 Features

### 3 Problem Visualizations

1. **Kth Largest Element (LC 215)** - Find Kth largest using min-heap
2. **Top K Frequent Elements (LC 347)** - Most frequent with frequency tracking
3. **K Closest Points (LC 973)** - Closest points to origin

### Interactive Features

✅ **Heap Structure View** - Visual binary heap tree  
✅ **Array View** - See input data as bars  
✅ **Comparison View** - Heap vs Sorting performance  
✅ **Animated Operations** - Watch insertions and deletions  
✅ **Multiple Problems** - Switch between 3 problem types  
✅ **Custom Input** - Test your own data  
✅ **Real-time Stats** - Track heap size and operations  
✅ **Speed Control** - Adjust animation speed  

## 🧠 How It Works

### The Core Insight

**For K Largest** → Use **Min-Heap** of size K
- Keep largest K elements
- Remove smallest when heap > K
- Result: Root = Kth largest!

**For K Smallest** → Use **Max-Heap** of size K
- Keep smallest K elements
- Remove largest when heap > K
- Result: Root = Kth smallest!

### Why Counterintuitive?

We use the **opposite** heap type because we want to efficiently remove the element we **don't** want!

## 📚 Problems Solved

This pattern solves **40+ LeetCode problems**, including:

| # | Problem | Difficulty | Key Concept | Link |
|---|---------|-----------|-------------|------|
| 215 | Kth Largest Element | Medium | Min-heap of size k | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| 347 | Top K Frequent Elements | Medium | Frequency + heap | [LeetCode](https://leetcode.com/problems/top-k-frequent-elements/) |
| 973 | K Closest Points | Medium | Distance + max-heap | [LeetCode](https://leetcode.com/problems/k-closest-points-to-origin/) |
| 295 | Find Median from Stream | Hard | Two heaps | [LeetCode](https://leetcode.com/problems/find-median-from-data-stream/) |
| 703 | Kth Largest in Stream | Easy | Min-heap maintenance | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-a-stream/) |
| 23 | Merge K Sorted Lists | Hard | Min-heap for merging | [LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/) |

## 🌍 Real-World Applications

Heaps power many real-world systems:

- **Leaderboards**: Gaming (top 100 players), sports rankings
- **Recommendation Systems**: Netflix top 10, YouTube trending
- **Search Engines**: Google top search results (billions of queries!)
- **E-commerce**: Amazon best sellers, trending products
- **OS Task Scheduling**: Priority queues for CPU processes
- **Network Routing**: Dijkstra's algorithm, shortest paths
- **Real-time Analytics**: Top K queries, most active users

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Select a problem (Kth Largest, Top K Frequent, K Closest)
3. Adjust K value (1-10)
4. Click "Start" to watch the heap build!
5. Switch between views: Heap Structure, Array, Comparison
6. Try custom inputs to test edge cases

## 💡 Key Learning Points

### 1. When to Use Which Heap

```javascript
// K Largest → Min-Heap
const minHeap = new MinHeap();
for (let num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) minHeap.pop();
}

// K Smallest → Max-Heap  
const maxHeap = new MaxHeap();
for (let num of nums) {
    maxHeap.push(num);
    if (maxHeap.size() > k) maxHeap.pop();
}
```

### 2. Heap Operations Complexity

- **Insert**: O(log k)
- **Remove**: O(log k)
- **Peek**: O(1)
- **Total for n elements**: O(n log k)

### 3. Space Efficiency

Heap stores only K elements, not all N!
- Sorting needs O(n) space
- Heap needs O(k) space
- When k=10 and n=1,000,000: **100,000x less space!**

### 4. Two-Heap Pattern (Median from Stream)

Use two heaps to maintain running median:
- **Max-heap**: Lower half of numbers
- **Min-heap**: Upper half of numbers
- **Median**: Average of two tops (or one top)

## 🎓 Interview Tips

### When you see these keywords, think **Top K Elements**:

- "Find Kth largest/smallest..."
- "Top K frequent/common..."
- "K closest/nearest..."
- "Merge K sorted..."
- "Find median in stream..."

### Common Variations

| Variation | Heap Type | Why |
|-----------|-----------|-----|
| K Largest | Min-Heap | Remove smallest to keep largest K |
| K Smallest | Max-Heap | Remove largest to keep smallest K |
| K Frequent | Min-Heap | Compare by frequency |
| K Closest | Max-Heap | Compare by distance |
| Running Median | Both | Balance two halves |

### Edge Cases to Consider

- K = 1 (first element)
- K = N (all elements)
- Duplicate elements
- Negative numbers
- Empty array
- K > N (invalid)

### Optimization Tips

- Use built-in heap if available (Python: `heapq`)
- For small K, heap is best
- For K ≈ N, consider quickselect (O(n) average)
- For K = N/2, both are similar

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - All logic
- **Custom Heap Implementation** - Min-heap with comparator
- **Canvas API** - Tree visualization

## 📖 Heap Visualization Explained

### Binary Heap Properties

1. **Complete Binary Tree**: All levels filled except possibly last
2. **Heap Property**: Parent ≤ children (min-heap) or Parent ≥ children (max-heap)
3. **Array Representation**: 
   - Parent of i: `(i-1)/2`
   - Left child of i: `2*i+1`
   - Right child of i: `2*i+2`

### Heap Operations

**Bubble Up (Insert)**:
```
1. Add element at end
2. Compare with parent
3. Swap if violates heap property
4. Repeat until root or satisfied
```

**Bubble Down (Delete)**:
```
1. Replace root with last element
2. Compare with children
3. Swap with smaller child (min-heap)
4. Repeat until leaf or satisfied
```

## 🔗 Series Navigation

- **Day 1**: Fast & Slow Pointers
- **Day 2**: Merge Intervals
- **Day 3**: Backtracking
- **Day 4**: Top K Elements ← You Are Here
- **Day 5**: Binary Tree Patterns
- **Day 6**: Subsets & Permutations

---

**Master patterns, not problems!** 🎯

Built with 💙 by [Rohan Tyagi](https://github.com/Tyagirohan)

