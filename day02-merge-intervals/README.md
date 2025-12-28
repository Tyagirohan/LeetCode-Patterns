# 📊 Merge Intervals - Sort + Merge Pattern

**Day 2 of 6** | LeetCode Patterns Series

An interactive visualizer for the Merge Intervals pattern - one of the most common patterns in coding interviews!

![Pattern](https://img.shields.io/badge/Pattern-Interval%20Merging-blue)
![Difficulty](https://img.shields.io/badge/Difficulty-Medium-orange)
![Problems](https://img.shields.io/badge/Solves-40%2B%20Problems-green)

## 🎯 Pattern Overview

The **Merge Intervals** pattern is used when dealing with overlapping intervals or ranges. The key insight is to **sort first**, then merge in a single pass!

### When to Use This Pattern

- 📅 Merging overlapping time intervals
- 🏢 Scheduling meetings and resources
- 🎯 Finding free time slots
- 📈 Merging data ranges
- 🎮 Collision detection in games

## ⚡ Complexity

- **Time Complexity**: O(n log n) - dominated by sorting
- **Space Complexity**: O(n) - for the result array
- **Key Insight**: Sorting enables O(n) merge!

## 🎨 Features

### 4 Problem Visualizations

1. **Merge Intervals (LC 56)** - Merge all overlapping intervals
2. **Insert Interval (LC 57)** - Insert and merge new interval
3. **Meeting Rooms (LC 252/253)** - Check attendance & count rooms
4. **Non-overlapping Intervals (LC 435)** - Minimum removals

### Interactive Features

✅ **Timeline Visualization** - See intervals on an interactive timeline  
✅ **Animated Merging** - Watch intervals merge step-by-step  
✅ **4 Problem Types** - Switch between different interval problems  
✅ **Speed Control** - Adjust animation speed  
✅ **Quick Presets** - Load example scenarios instantly  
✅ **Custom Input** - Test your own intervals  
✅ **Real-time Stats** - Track merges and results  
✅ **Color Coding** - Visual feedback for overlaps and merges  

## 🧠 How It Works

### The Core Algorithm

```javascript
function merge(intervals) {
    if (intervals.length === 0) return [];
    
    // Step 1: Sort by start time (O(n log n))
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [intervals[0]];
    
    // Step 2: Merge in one pass (O(n))
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];
        
        // Check overlap: current starts before last ends
        if (current[0] <= last[1]) {
            // Merge: extend the end time
            last[1] = Math.max(last[1], current[1]);
        } else {
            // No overlap: add as new interval
            result.push(current);
        }
    }
    
    return result;
}
```

### Why Sorting is Key

**Without sorting**: Would need O(n²) to check all pairs  
**With sorting**: Only need O(n) to check adjacent intervals  

After sorting by start time, if intervals overlap, they must be adjacent!

## 📚 Problems Solved

This pattern solves **40+ LeetCode problems**, including:

| # | Problem | Difficulty | Key Concept | Link |
|---|---------|-----------|-------------|------|
| 56 | Merge Intervals | Medium | Basic merge | [LeetCode](https://leetcode.com/problems/merge-intervals/) |
| 57 | Insert Interval | Medium | Insert + merge | [LeetCode](https://leetcode.com/problems/insert-interval/) |
| 252 | Meeting Rooms | Easy | Check overlap | [LeetCode](https://leetcode.com/problems/meeting-rooms/) |
| 253 | Meeting Rooms II | Medium | Count max overlaps | [LeetCode](https://leetcode.com/problems/meeting-rooms-ii/) |
| 435 | Non-overlapping Intervals | Medium | Min removals | [LeetCode](https://leetcode.com/problems/non-overlapping-intervals/) |
| 986 | Interval List Intersections | Medium | Two pointers | [LeetCode](https://leetcode.com/problems/interval-list-intersections/) |

## 🌍 Real-World Applications

This isn't just for interviews! Used extensively in:

- **Calendar Apps**: Google Calendar merges overlapping events
- **Resource Scheduling**: Conference room booking systems
- **Operating Systems**: CPU time slice allocation
- **Video Streaming**: Merge buffered video segments
- **Databases**: Query optimization, index range merging
- **Project Management**: Timeline conflict detection

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Select a problem type (Merge, Insert, Meetings, Non-overlapping)
3. Click "Random" for random intervals or "Preset" for examples
4. Click "Start" to watch the algorithm animate
5. Try custom inputs to test edge cases!

## 💡 Key Learning Points

### 1. Always Sort First!
The pattern is useless without sorting. Sort by start time (usually).

### 2. Check Overlap Condition
Two intervals `[a, b]` and `[c, d]` overlap if: `c <= b`  
(Second starts before or when first ends)

### 3. Merge by Extending
When merging, extend the end: `last[1] = Math.max(last[1], current[1])`

### 4. Meeting Rooms Pattern
For "minimum rooms needed", use a min-heap to track end times.

### 5. Non-overlapping Pattern
Sort by **end time** instead of start time for minimum removals!

## 🎓 Interview Tips

### When you see these keywords, think **Merge Intervals**:

- "Merge overlapping..."
- "Schedule meetings"
- "Find free time"
- "Minimum conference rooms"
- "Non-overlapping intervals"
- "Insert interval"

### Common Variations

1. **Sort by start** → Most common (merge, insert)
2. **Sort by end** → For greedy problems (min removals)
3. **Two sorted lists** → Use two pointers (intersections)
4. **Count overlaps** → Use heap or sweep line

### Edge Cases to Test

- Empty array: `[]`
- Single interval: `[[1,2]]`
- No overlaps: `[[1,2], [3,4]]`
- All overlap: `[[1,5], [2,6], [3,7]]`
- Touching intervals: `[[1,2], [2,3]]` (depends on problem!)
- Nested intervals: `[[1,10], [2,3]]`

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - All logic
- **Canvas API** - Timeline visualization

## 📖 Pattern Variations

### Insert Interval (3 steps)
1. Add all intervals ending before newInterval
2. Merge all overlapping intervals
3. Add all intervals starting after newInterval

### Meeting Rooms II (Min-Heap)
```javascript
function minMeetingRooms(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const heap = [intervals[0][1]]; // end times
    
    for (let i = 1; i < intervals.length; i++) {
        if (heap[0] <= intervals[i][0]) {
            heap.shift(); // Room freed
        }
        heap.push(intervals[i][1]);
        heap.sort((a, b) => a - b);
    }
    
    return heap.length;
}
```

## 🔗 Series Navigation

- **Day 1**: Fast & Slow Pointers
- **Day 2**: Merge Intervals ← You Are Here
- **Day 3**: Backtracking
- **Day 4**: Top K Elements
- **Day 5**: Binary Tree Patterns
- **Day 6**: Subsets & Permutations

---

**Master patterns, not problems!** 🎯

Built with 💙 by [Rohan Tyagi](https://github.com/Tyagirohan)

