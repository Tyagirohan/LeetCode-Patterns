// Top K Elements Visualizer with Heap
class MinHeap {
    constructor(compareFn = (a, b) => a - b) {
        this.heap = [];
        this.compareFn = compareFn;
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }

    bubbleUp(idx) {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.compareFn(this.heap[idx], this.heap[parentIdx]) >= 0) break;
            
            [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
            idx = parentIdx;
        }
    }

    bubbleDown(idx) {
        while (true) {
            let minIdx = idx;
            const leftIdx = 2 * idx + 1;
            const rightIdx = 2 * idx + 2;

            if (leftIdx < this.size() && this.compareFn(this.heap[leftIdx], this.heap[minIdx]) < 0) {
                minIdx = leftIdx;
            }
            if (rightIdx < this.size() && this.compareFn(this.heap[rightIdx], this.heap[minIdx]) < 0) {
                minIdx = rightIdx;
            }

            if (minIdx === idx) break;

            [this.heap[idx], this.heap[minIdx]] = [this.heap[minIdx], this.heap[idx]];
            idx = minIdx;
        }
    }

    toArray() {
        return [...this.heap];
    }
}

class Visualizer {
    constructor() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentProblem = 'kthlargest';
        this.currentTab = 'heap';
        this.array = [];
        this.heap = new MinHeap();
        this.k = 3;
        this.operations = 0;
        this.isRunning = false;
        this.animationSpeed = 500;
        this.result = null;
        this.currentIndex = -1;
        this.heapElements = [];
        
        this.setupCanvas();
        this.attachEventListeners();
        this.generateArray();
    }

    setupCanvas() {
        this.canvas.width = 1200;
        this.canvas.height = 500;
    }

    attachEventListeners() {
        // Problem tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProblem(e.currentTarget.dataset.problem);
            });
        });

        // Visualization tabs
        document.querySelectorAll('.viz-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.currentTarget.dataset.tab);
            });
        });

        // Control buttons
        document.getElementById('generateBtn').addEventListener('click', () => this.generateArray());
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('stepBtn').addEventListener('click', () => this.step());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // K value control
        document.getElementById('kValue').addEventListener('input', (e) => {
            this.k = parseInt(e.target.value);
            document.getElementById('kLabel').textContent = this.k;
        });

        // Speed control
        document.getElementById('speedSlider').addEventListener('input', (e) => {
            const speeds = ['Slow', 'Normal', 'Fast', 'Instant'];
            const speedValues = [1000, 500, 200, 50];
            const value = parseInt(e.target.value) - 1;
            this.animationSpeed = speedValues[value];
            document.getElementById('speedLabel').textContent = speeds[value];
        });

        // Custom inputs
        document.getElementById('customBtn').addEventListener('click', () => this.customKthLargest());
        document.getElementById('customFreqBtn').addEventListener('click', () => this.customTopKFreq());
        document.getElementById('customPointsBtn').addEventListener('click', () => this.customKClosest());
    }

    switchProblem(problem) {
        this.currentProblem = problem;
        this.reset();

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-problem="${problem}"]`).classList.add('active');

        // Show/hide input containers
        document.querySelectorAll('.input-container').forEach(container => container.classList.add('hidden'));
        
        switch(problem) {
            case 'kthlargest':
                document.getElementById('kthLargestInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Kth Largest Element';
                break;
            case 'topkfreq':
                document.getElementById('topKFreqInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Top K Frequent Elements';
                break;
            case 'kclosest':
                document.getElementById('kClosestInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'K Closest Points to Origin';
                break;
        }

        this.generateArray();
    }

    switchTab(tab) {
        this.currentTab = tab;
        
        // Update active tab
        document.querySelectorAll('.viz-tab').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        this.draw();
    }

    generateArray() {
        this.reset();
        
        switch(this.currentProblem) {
            case 'kthlargest':
                this.array = Array.from({length: 12}, () => Math.floor(Math.random() * 50) + 1);
                break;
            case 'topkfreq':
                const base = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 6];
                this.array = base.sort(() => Math.random() - 0.5);
                break;
            case 'kclosest':
                this.array = Array.from({length: 10}, () => [
                    Math.floor(Math.random() * 20) - 10,
                    Math.floor(Math.random() * 20) - 10
                ]);
                break;
        }

        this.updateStats();
        this.draw();
        this.updateStepText(`Generated random ${this.currentProblem} data. Click "Start" to find top K!`);
    }

    customKthLargest() {
        const input = document.getElementById('arrayInput').value;
        const k = parseInt(document.getElementById('kInput').value);
        
        const arr = input.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
        if (arr.length === 0) {
            alert('Please enter valid numbers!');
            return;
        }

        this.reset();
        this.array = arr;
        this.k = k;
        document.getElementById('kValue').value = k;
        document.getElementById('kLabel').textContent = k;
        this.updateStats();
        this.draw();
        this.updateStepText(`Custom array loaded. Finding ${k}th largest element...`);
    }

    customTopKFreq() {
        const input = document.getElementById('freqArrayInput').value;
        const k = parseInt(document.getElementById('kFreqInput').value);
        
        const arr = input.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
        if (arr.length === 0) {
            alert('Please enter valid numbers!');
            return;
        }

        this.reset();
        this.array = arr;
        this.k = k;
        this.currentProblem = 'topkfreq';
        document.getElementById('kValue').value = k;
        document.getElementById('kLabel').textContent = k;
        this.updateStats();
        this.draw();
    }

    customKClosest() {
        const input = document.getElementById('pointsInput').value;
        const k = parseInt(document.getElementById('kPointsInput').value);
        
        const regex = /\[(-?\d+),(-?\d+)\]/g;
        const points = [];
        let match;
        
        while ((match = regex.exec(input)) !== null) {
            points.push([parseInt(match[1]), parseInt(match[2])]);
        }

        if (points.length === 0) {
            alert('Please enter valid points! Format: [x,y] [x,y]');
            return;
        }

        this.reset();
        this.array = points;
        this.k = k;
        this.currentProblem = 'kclosest';
        document.getElementById('kValue').value = k;
        document.getElementById('kLabel').textContent = k;
        this.updateStats();
        this.draw();
    }

    async start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        document.getElementById('startBtn').disabled = true;

        switch(this.currentProblem) {
            case 'kthlargest':
                await this.findKthLargest();
                break;
            case 'topkfreq':
                await this.findTopKFrequent();
                break;
            case 'kclosest':
                await this.findKClosest();
                break;
        }

        this.isRunning = false;
        document.getElementById('startBtn').disabled = false;
    }

    async findKthLargest() {
        this.heap = new MinHeap();
        this.operations = 0;
        this.heapElements = [];

        this.updateStepText(`Finding ${this.k}th largest element using Min-Heap of size ${this.k}...`);
        await this.sleep();

        for (let i = 0; i < this.array.length; i++) {
            this.operations++;
            this.currentIndex = i;
            const num = this.array[i];

            this.updateStepText(`Step ${i + 1}: Adding ${num} to heap...`);
            this.heap.push(num);
            this.heapElements = this.heap.toArray();
            this.draw();
            await this.sleep();

            if (this.heap.size() > this.k) {
                const removed = this.heap.pop();
                this.heapElements = this.heap.toArray();
                this.updateStepText(`Heap size > ${this.k}. Removed smallest: ${removed}`);
                this.draw();
                await this.sleep();
            }

            this.updateStats();
        }

        this.currentIndex = -1;
        this.result = this.heap.peek();
        this.updateStepText(`✅ ${this.k}th largest element is: ${this.result}. Operations: ${this.operations}`);
        document.getElementById('result').textContent = this.result;
        this.draw();
    }

    async findTopKFrequent() {
        // Count frequencies
        const freq = {};
        for (let num of this.array) {
            freq[num] = (freq[num] || 0) + 1;
        }

        this.updateStepText('Counted frequencies. Building heap of top K frequent...');
        await this.sleep();

        // Use min-heap with frequency as priority
        this.heap = new MinHeap((a, b) => a[1] - b[1]);
        this.operations = 0;

        const entries = Object.entries(freq).map(([k, v]) => [parseInt(k), v]);
        
        for (let i = 0; i < entries.length; i++) {
            this.operations++;
            const [num, count] = entries[i];

            this.updateStepText(`Processing ${num} (frequency: ${count})...`);
            this.heap.push([num, count]);
            this.draw();
            await this.sleep();

            if (this.heap.size() > this.k) {
                const removed = this.heap.pop();
                this.updateStepText(`Removed ${removed[0]} (freq: ${removed[1]})`);
                this.draw();
                await this.sleep();
            }

            this.updateStats();
        }

        this.result = this.heap.toArray().map(x => x[0]);
        this.updateStepText(`✅ Top ${this.k} frequent: [${this.result.join(', ')}]`);
        document.getElementById('result').textContent = `[${this.result.join(', ')}]`;
    }

    async findKClosest() {
        // Use max-heap with distance as priority (negative for max-heap)
        this.heap = new MinHeap((a, b) => b[2] - a[2]); // Max-heap
        this.operations = 0;

        this.updateStepText(`Finding ${this.k} closest points to origin using Max-Heap...`);
        await this.sleep();

        for (let i = 0; i < this.array.length; i++) {
            this.operations++;
            const [x, y] = this.array[i];
            const dist = x * x + y * y;

            this.updateStepText(`Point [${x},${y}], distance²: ${dist}`);
            this.heap.push([x, y, dist]);
            this.draw();
            await this.sleep();

            if (this.heap.size() > this.k) {
                const removed = this.heap.pop();
                this.updateStepText(`Removed farthest: [${removed[0]},${removed[1]}]`);
                this.draw();
                await this.sleep();
            }

            this.updateStats();
        }

        this.result = this.heap.toArray().map(x => `[${x[0]},${x[1]}]`);
        this.updateStepText(`✅ ${this.k} closest points: ${this.result.join(', ')}`);
        document.getElementById('result').textContent = this.result.join(', ');
    }

    step() {
        // Simplified: just run the whole algorithm
        this.start();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch(this.currentTab) {
            case 'heap':
                this.drawHeap();
                break;
            case 'array':
                this.drawArray();
                break;
            case 'comparison':
                this.drawComparison();
                break;
        }
    }

    drawHeap() {
        const heapArray = this.heap.toArray();
        if (heapArray.length === 0) {
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Heap is empty', this.canvas.width / 2, this.canvas.height / 2);
            return;
        }

        const levels = Math.ceil(Math.log2(heapArray.length + 1));
        const levelHeight = Math.min(80, this.canvas.height / (levels + 1));
        const nodeRadius = 25;
        const margin = 60; // Margin from edges

        const drawNode = (idx, x, y, level, minX, maxX) => {
            if (idx >= heapArray.length) return;

            const value = this.currentProblem === 'topkfreq' || this.currentProblem === 'kclosest' 
                ? heapArray[idx] 
                : heapArray[idx];

            // Draw connections to children
            const leftIdx = 2 * idx + 1;
            const rightIdx = 2 * idx + 2;
            const width = maxX - minX;
            const midX = (minX + maxX) / 2;

            if (leftIdx < heapArray.length) {
                const leftX = (minX + midX) / 2;
                const leftY = y + levelHeight;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + nodeRadius);
                this.ctx.lineTo(leftX, leftY - nodeRadius);
                this.ctx.strokeStyle = '#cbd5e1';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                drawNode(leftIdx, leftX, leftY, level + 1, minX, midX);
            }

            if (rightIdx < heapArray.length) {
                const rightX = (midX + maxX) / 2;
                const rightY = y + levelHeight;
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + nodeRadius);
                this.ctx.lineTo(rightX, rightY - nodeRadius);
                this.ctx.strokeStyle = '#cbd5e1';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                drawNode(rightIdx, rightX, rightY, level + 1, midX, maxX);
            }

            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = idx === 0 ? '#ec4899' : '#8b5cf6';
            this.ctx.fill();
            this.ctx.strokeStyle = '#1e293b';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw value
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            let displayText;
            if (Array.isArray(value)) {
                if (this.currentProblem === 'topkfreq') {
                    displayText = `${value[0]}\n(${value[1]})`;
                } else if (this.currentProblem === 'kclosest') {
                    displayText = `[${value[0]},${value[1]}]`;
                }
            } else {
                displayText = value.toString();
            }

            if (displayText && displayText.includes('\n')) {
                const parts = displayText.split('\n');
                this.ctx.fillText(parts[0], x, y - 6);
                this.ctx.font = '12px Arial';
                this.ctx.fillText(parts[1], x, y + 8);
            } else if (displayText) {
                this.ctx.font = '14px Arial';
                this.ctx.fillText(displayText, x, y);
            }
        };

        drawNode(0, this.canvas.width / 2, 50, 0, margin, this.canvas.width - margin);
    }

    drawArray() {
        const barWidth = Math.min(60, (this.canvas.width - 100) / this.array.length);
        const maxVal = Math.max(...this.array.map(v => Array.isArray(v) ? Math.abs(v[0]) + Math.abs(v[1]) : v));
        const offsetX = 50;
        const offsetY = this.canvas.height - 50;

        // Draw title
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Array View with Heap Elements Highlighted', this.canvas.width / 2, 30);

        this.array.forEach((val, idx) => {
            const x = offsetX + idx * barWidth;
            let displayVal, height, actualVal;

            if (Array.isArray(val)) {
                if (this.currentProblem === 'kclosest') {
                    displayVal = `[${val[0]},${val[1]}]`;
                    height = Math.sqrt(val[0] * val[0] + val[1] * val[1]) / maxVal * 300;
                    actualVal = val;
                } else {
                    displayVal = `${val[0]}`;
                    height = val[1] / maxVal * 300;
                    actualVal = val[0];
                }
            } else {
                displayVal = val.toString();
                height = val / maxVal * 300;
                actualVal = val;
            }

            // Determine color based on state
            let fillColor = '#cbd5e1'; // Not processed yet
            
            if (idx < this.currentIndex) {
                // Already processed - check if in heap
                const inHeap = this.heapElements.some(h => {
                    if (Array.isArray(h) && Array.isArray(actualVal)) {
                        return h[0] === actualVal[0] && h[1] === actualVal[1];
                    }
                    return h === actualVal;
                });
                fillColor = inHeap ? '#10b981' : '#94a3b8'; // Green if in heap, gray if removed
            } else if (idx === this.currentIndex) {
                fillColor = '#f59e0b'; // Currently processing (orange)
            }

            // Draw bar
            this.ctx.fillStyle = fillColor;
            this.ctx.fillRect(x, offsetY - height, barWidth - 4, height);
            this.ctx.strokeStyle = '#1e293b';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, offsetY - height, barWidth - 4, height);
            
            // Draw value
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(displayVal, x + barWidth / 2, offsetY + 15);
        });

        // Legend
        const legendY = 60;
        const legendX = 50;
        
        // Not processed
        this.ctx.fillStyle = '#cbd5e1';
        this.ctx.fillRect(legendX, legendY, 20, 20);
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.strokeRect(legendX, legendY, 20, 20);
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Not Processed', legendX + 30, legendY + 15);
        
        // Processing
        this.ctx.fillStyle = '#f59e0b';
        this.ctx.fillRect(legendX + 150, legendY, 20, 20);
        this.ctx.strokeRect(legendX + 150, legendY, 20, 20);
        this.ctx.fillText('Processing', legendX + 180, legendY + 15);
        
        // In heap
        this.ctx.fillStyle = '#10b981';
        this.ctx.fillRect(legendX + 300, legendY, 20, 20);
        this.ctx.strokeRect(legendX + 300, legendY, 20, 20);
        this.ctx.fillText('In Heap', legendX + 330, legendY + 15);
        
        // Removed
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.fillRect(legendX + 450, legendY, 20, 20);
        this.ctx.strokeRect(legendX + 450, legendY, 20, 20);
        this.ctx.fillText('Removed', legendX + 480, legendY + 15);
    }

    drawComparison() {
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Time Complexity Comparison', this.canvas.width / 2, 40);

        const startY = 90;
        const rowHeight = 70;
        const n = this.array.length;
        const sortingOps = n * Math.log2(n);
        const heapOps = n * Math.log2(this.k);
        const speedup = (sortingOps / heapOps).toFixed(1);

        // Calculate progress bars
        const maxWidth = 600;
        const sortingWidth = maxWidth;
        const heapWidth = (heapOps / sortingOps) * maxWidth;

        // Sorting approach
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fillRect(100, startY, sortingWidth, 50);
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Sorting: O(n log n) ≈ ${Math.round(sortingOps)} ops`, 120, startY + 30);

        // Heap approach
        this.ctx.fillStyle = '#10b981';
        this.ctx.fillRect(100, startY + rowHeight, heapWidth, 50);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Heap: O(n log k) ≈ ${Math.round(heapOps)} ops`, 120, startY + rowHeight + 30);

        // Current progress during animation
        if (this.isRunning && this.currentIndex >= 0) {
            const progress = (this.currentIndex / n) * heapWidth;
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(100, startY + rowHeight, progress, 50);
            
            // Progress text
            this.ctx.fillStyle = '#6366f1';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            const percent = Math.round((this.currentIndex / n) * 100);
            this.ctx.fillText(`${percent}% Complete`, this.canvas.width / 2, startY + rowHeight * 2 + 20);
        }

        // Stats section
        const statsY = startY + rowHeight * 2 + 50;
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '15px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Current Dataset: n=${n}, k=${this.k}`, 100, statsY);
        this.ctx.fillText(`Speedup: ${speedup}x faster with heap!`, 100, statsY + 25);
        
        // Real-world example - moved down with more spacing
        const exampleY = statsY + 70;
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.fillText('Real-World Example:', 100, exampleY);
        
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '15px Arial';
        this.ctx.fillText(`Finding top 10 from 1,000,000 items:`, 120, exampleY + 30);
        this.ctx.fillText(`• Sorting: ~20,000,000 operations`, 140, exampleY + 55);
        this.ctx.fillText(`• Heap: ~23,000 operations`, 140, exampleY + 80);
        
        this.ctx.fillStyle = '#10b981';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText(`Result: 869x faster! 🚀`, 140, exampleY + 110);
    }

    updateStats() {
        document.getElementById('arraySize').textContent = this.array.length;
        document.getElementById('heapSize').textContent = this.heap.size();
        document.getElementById('operations').textContent = this.operations;
    }

    updateStepText(text) {
        document.getElementById('stepText').textContent = text;
    }

    reset() {
        this.heap = new MinHeap();
        this.operations = 0;
        this.result = null;
        this.isRunning = false;
        this.currentIndex = -1;
        this.heapElements = [];

        document.getElementById('heapSize').textContent = '0';
        document.getElementById('operations').textContent = '0';
        document.getElementById('result').textContent = '-';
        document.getElementById('stepText').textContent = 'Click "Start" to begin the algorithm';
        
        document.getElementById('startBtn').disabled = false;

        if (this.array.length > 0) {
            this.updateStats();
            this.draw();
        }
    }

    sleep() {
        return new Promise(resolve => setTimeout(resolve, this.animationSpeed));
    }
}

// Initialize visualizer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Visualizer();
});

