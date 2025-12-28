# 🐢🐰 Fast & Slow Pointers - Floyd's Cycle Detection

**Day 1 of 6** | LeetCode Patterns Series

An interactive visualizer for the Fast & Slow Pointers pattern (Floyd's Cycle Detection algorithm).

![Pattern](https://img.shields.io/badge/Pattern-Two%20Pointers-blue)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy--Medium-green)
![Problems](https://img.shields.io/badge/Solves-30%2B%20Problems-orange)

## 🎯 Pattern Overview

The **Fast & Slow Pointers** (also known as **Floyd's Cycle Detection** or **Tortoise and Hare**) is a pointer algorithm that uses two pointers moving at different speeds through a sequence. This pattern is primarily used for:

- 🔄 Detecting cycles in linked lists
- 🎯 Finding the middle of a linked list
- 🔍 Finding duplicates in arrays
- ✅ Detecting loops in sequences

## ⚡ Complexity

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Key Advantage**: Solves problems in constant space!

## 🎨 Features

### 4 Problem Visualizations

1. **Linked List Cycle (LC 141)** - Detect if a cycle exists
2. **Find Duplicate Number (LC 287)** - Find duplicate without modifying array
3. **Happy Number (LC 202)** - Determine if a number is happy
4. **Middle of Linked List (LC 876)** - Find the middle node

### Interactive Features

✅ **Animated Visualization** - Watch the tortoise 🐢 and hare 🐰 move through the list  
✅ **Multiple Problems** - Switch between 4 different problem types  
✅ **Speed Control** - Adjust animation speed (Slow/Normal/Fast/Instant)  
✅ **Step-by-Step Mode** - Execute one step at a time  
✅ **Random Generation** - Generate random test cases  
✅ **Custom Input** - Test your own cases  
✅ **Real-time Stats** - Track pointer positions and steps  
✅ **Code Examples** - See the actual implementation  

## 🧠 How It Works

### The Core Concept

```javascript
function hasCycle(head) {
    let slow = head;  // 🐢 Moves 1 step
    let fast = head;  // 🐰 Moves 2 steps
    
    while (fast && fast.next) {
        slow = slow.next;        // Move 1 step
        fast = fast.next.next;   // Move 2 steps
        
        if (slow === fast) {
            return true;  // Cycle detected!
        }
    }
    
    return false;  // No cycle
}
```

### Why It Works

If there's a cycle:
- The fast pointer will eventually "lap" the slow pointer
- Like runners on a circular track
- They will meet at some node within the cycle

If there's no cycle:
- The fast pointer will reach the end (`null`)
- The algorithm terminates

## 📚 Problems Solved

This pattern solves **30+ LeetCode problems**, including:

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 141 | Linked List Cycle | Easy | [LeetCode](https://leetcode.com/problems/linked-list-cycle/) |
| 142 | Linked List Cycle II | Medium | [LeetCode](https://leetcode.com/problems/linked-list-cycle-ii/) |
| 287 | Find Duplicate Number | Medium | [LeetCode](https://leetcode.com/problems/find-the-duplicate-number/) |
| 202 | Happy Number | Easy | [LeetCode](https://leetcode.com/problems/happy-number/) |
| 876 | Middle of Linked List | Easy | [LeetCode](https://leetcode.com/problems/middle-of-the-linked-list/) |
| 457 | Circular Array Loop | Medium | [LeetCode](https://leetcode.com/problems/circular-array-loop/) |

## 🌍 Real-World Applications

This algorithm isn't just for interviews! It's used in:

- **Memory Leak Detection**: Detect circular references in garbage collection
- **Loop Detection**: Find infinite loops in state machines
- **Duplicate Detection**: Find duplicates in data streams without extra space
- **Network Protocols**: Detect routing loops in networking
- **Operating Systems**: Deadlock detection

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Select a problem type (Cycle, Duplicate, Happy, Middle)
3. Click "Start" to run the algorithm automatically
4. Or use "Step" for step-by-step execution
5. Try custom inputs to test edge cases!

## 💡 Key Learning Points

1. **Constant Space**: Solves in O(1) space vs O(n) with hash sets
2. **Two-Phase Approach**: Detect cycle → Find cycle start
3. **Speed Difference**: Fast moves 2x speed of slow (key insight!)
4. **Termination**: Fast reaches end = no cycle
5. **Meeting Point**: When they meet = cycle exists

## 🎓 Interview Tips

When you see these keywords, think **Fast & Slow Pointers**:

- "Find cycle in linked list"
- "Detect duplicate with O(1) space"
- "Find middle of linked list in one pass"
- "Detect loop in sequence"

### Common Follow-up Questions

1. **Q**: Why does the fast pointer move 2 steps?  
   **A**: Mathematical proof shows they'll meet within the cycle. 3+ steps works too but 2 is optimal.

2. **Q**: Where do they meet?  
   **A**: Not necessarily at the cycle start, but somewhere within the cycle.

3. **Q**: How to find the cycle start?  
   **A**: After detection, reset one pointer to head and move both at same speed.

4. **Q**: Can fast pointer skip over slow?  
   **A**: No! In a cycle, the distance between them decreases by 1 each step.

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - All logic and visualization
- **Canvas API** - Visual rendering

## 📖 Further Reading

- [Floyd's Cycle Detection Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_Tortoise_and_Hare)
- [LeetCode Pattern: Fast & Slow Pointers](https://leetcode.com/discuss/general-discussion/1073221/All-about-Cycle-Detection-in-LinkedList)
- [Two Pointers Technique](https://leetcode.com/articles/two-pointer-technique/)

## 🔗 Series Navigation

- **Day 1**: Fast & Slow Pointers ← You Are Here
- **Day 2**: Merge Intervals
- **Day 3**: Backtracking
- **Day 4**: Top K Elements
- **Day 5**: Binary Tree Patterns
- **Day 6**: Subsets & Permutations

---

**Master patterns, not problems!** 🎯

Built with 💙 by [Rohan Tyagi](https://github.com/Tyagirohan)

