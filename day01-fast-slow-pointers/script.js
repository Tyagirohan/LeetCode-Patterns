// Fast & Slow Pointers Visualizer
class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Visualizer {
    constructor() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentProblem = 'cycle';
        this.nodes = [];
        this.slowPointer = 0;
        this.fastPointer = 0;
        this.steps = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.cyclePos = -1;
        this.animationSpeed = 500;
        this.result = null;
        
        this.setupCanvas();
        this.attachEventListeners();
        this.generateList();
    }

    setupCanvas() {
        this.canvas.width = 1200;
        this.canvas.height = 400;
    }

    attachEventListeners() {
        // Problem tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProblem(e.currentTarget.dataset.problem);
            });
        });

        // Control buttons
        document.getElementById('generateBtn').addEventListener('click', () => this.generateList());
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('stepBtn').addEventListener('click', () => this.step());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // Speed control
        document.getElementById('speedSlider').addEventListener('input', (e) => {
            const speeds = ['Slow', 'Normal', 'Fast', 'Instant'];
            const speedValues = [1000, 500, 200, 50];
            const value = parseInt(e.target.value) - 1;
            this.animationSpeed = speedValues[value];
            document.getElementById('speedLabel').textContent = speeds[value];
        });

        // Custom inputs
        document.getElementById('customBtn').addEventListener('click', () => this.createCustomList());
        document.getElementById('customDupBtn').addEventListener('click', () => this.createDuplicateArray());
        document.getElementById('customHappyBtn').addEventListener('click', () => this.checkHappyNumber());
        document.getElementById('customMiddleBtn').addEventListener('click', () => this.createMiddleList());
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
            case 'cycle':
                document.getElementById('cycleInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Linked List Cycle Detection';
                break;
            case 'duplicate':
                document.getElementById('duplicateInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Find Duplicate Number';
                break;
            case 'happy':
                document.getElementById('happyInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Happy Number Checker';
                break;
            case 'middle':
                document.getElementById('middleInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Find Middle of Linked List';
                break;
        }

        this.generateList();
    }

    generateList() {
        this.reset();
        
        switch(this.currentProblem) {
            case 'cycle':
                this.generateCycleList();
                break;
            case 'duplicate':
                this.generateDuplicateArray();
                break;
            case 'happy':
                this.generateHappyNumber();
                break;
            case 'middle':
                this.generateMiddleList();
                break;
        }
        
        this.draw();
    }

    generateCycleList() {
        const length = 5 + Math.floor(Math.random() * 4); // 5-8 nodes
        this.nodes = [];
        
        for (let i = 0; i < length; i++) {
            this.nodes.push({
                value: Math.floor(Math.random() * 20),
                next: i + 1 < length ? i + 1 : null
            });
        }

        // 50% chance of having a cycle
        if (Math.random() > 0.5) {
            this.cyclePos = Math.floor(Math.random() * length);
            this.nodes[length - 1].next = this.cyclePos;
        } else {
            this.cyclePos = -1;
        }

        this.updateStepText(`Generated linked list with ${length} nodes. ${this.cyclePos >= 0 ? `Cycle at position ${this.cyclePos}` : 'No cycle'}.`);
    }

    generateDuplicateArray() {
        const n = 5 + Math.floor(Math.random() * 5); // 5-9 unique numbers
        this.nodes = [];
        
        for (let i = 1; i <= n; i++) {
            this.nodes.push({ value: i, next: i < n ? i : null });
        }

        // Add duplicate
        const dupIndex = 1 + Math.floor(Math.random() * (n - 1));
        this.nodes.push({ value: dupIndex, next: null });
        this.cyclePos = dupIndex - 1; // Store where the duplicate points to

        this.updateStepText(`Generated array with numbers 1 to ${n} and one duplicate.`);
    }

    generateHappyNumber() {
        const happyNumbers = [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100];
        const isHappy = Math.random() > 0.5;
        
        if (isHappy) {
            const num = happyNumbers[Math.floor(Math.random() * happyNumbers.length)];
            this.nodes = [{ value: num, next: null }];
        } else {
            // Generate non-happy number
            let num;
            do {
                num = 2 + Math.floor(Math.random() * 98);
            } while (happyNumbers.includes(num));
            this.nodes = [{ value: num, next: null }];
        }

        document.getElementById('happyNumber').value = this.nodes[0].value;
        this.updateStepText(`Testing if ${this.nodes[0].value} is a happy number.`);
    }

    generateMiddleList() {
        const length = 5 + Math.floor(Math.random() * 6); // 5-10 nodes
        this.nodes = [];
        
        for (let i = 1; i <= length; i++) {
            this.nodes.push({
                value: i,
                next: i < length ? i : null
            });
        }

        this.cyclePos = -1;
        this.updateStepText(`Generated linked list with ${length} nodes. Finding middle...`);
    }

    createCustomList() {
        const values = document.getElementById('listValues').value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
        const cyclePos = parseInt(document.getElementById('cyclePos').value);

        if (values.length === 0) {
            alert('Please enter valid values!');
            return;
        }

        this.reset();
        this.nodes = values.map((val, idx) => ({
            value: val,
            next: idx + 1 < values.length ? idx + 1 : null
        }));

        if (cyclePos >= 0 && cyclePos < values.length) {
            this.nodes[values.length - 1].next = cyclePos;
            this.cyclePos = cyclePos;
        } else {
            this.cyclePos = -1;
        }

        this.draw();
        this.updateStepText(`Custom list created with ${values.length} nodes. ${this.cyclePos >= 0 ? `Cycle at position ${this.cyclePos}` : 'No cycle'}.`);
    }

    createDuplicateArray() {
        const values = document.getElementById('arrayValues').value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));

        if (values.length === 0) {
            alert('Please enter valid values!');
            return;
        }

        this.reset();
        this.nodes = values.map((val, idx) => ({
            value: val,
            next: idx + 1 < values.length ? idx + 1 : null
        }));

        this.currentProblem = 'duplicate';
        this.draw();
        this.updateStepText(`Finding duplicate in array of ${values.length} numbers...`);
    }

    checkHappyNumber() {
        const num = parseInt(document.getElementById('happyNumber').value);

        if (isNaN(num) || num < 1) {
            alert('Please enter a valid positive number!');
            return;
        }

        this.reset();
        this.nodes = [{ value: num, next: null }];
        this.currentProblem = 'happy';
        this.draw();
        this.updateStepText(`Checking if ${num} is a happy number...`);
    }

    createMiddleList() {
        const values = document.getElementById('middleValues').value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));

        if (values.length === 0) {
            alert('Please enter valid values!');
            return;
        }

        this.reset();
        this.nodes = values.map((val, idx) => ({
            value: val,
            next: idx + 1 < values.length ? idx + 1 : null
        }));

        this.cyclePos = -1;
        this.currentProblem = 'middle';
        this.draw();
        this.updateStepText(`Finding middle of list with ${values.length} nodes...`);
    }

    async start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('generateBtn').disabled = true;

        await this.runAlgorithm();

        this.isRunning = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('generateBtn').disabled = false;
    }

    async step() {
        if (!this.isRunning) {
            this.isRunning = true;
            await this.executeOneStep();
            this.isRunning = false;
        }
    }

    async runAlgorithm() {
        switch(this.currentProblem) {
            case 'cycle':
                await this.detectCycle();
                break;
            case 'duplicate':
                await this.findDuplicate();
                break;
            case 'happy':
                await this.isHappyNumber();
                break;
            case 'middle':
                await this.findMiddle();
                break;
        }
    }

    async detectCycle() {
        this.slowPointer = 0;
        this.fastPointer = 0;
        this.steps = 0;

        while (true) {
            this.steps++;
            this.updateStats();

            // Move slow pointer one step
            if (this.nodes[this.slowPointer].next !== null) {
                this.slowPointer = this.nodes[this.slowPointer].next;
                this.updateStepText(`Step ${this.steps}: Slow pointer 🐢 moves to node ${this.slowPointer} (value: ${this.nodes[this.slowPointer].value})`);
                this.draw();
                await this.sleep();
            }

            // Move fast pointer two steps
            if (this.nodes[this.fastPointer].next !== null) {
                this.fastPointer = this.nodes[this.fastPointer].next;
                this.draw();
                await this.sleep();

                if (this.nodes[this.fastPointer].next !== null) {
                    this.fastPointer = this.nodes[this.fastPointer].next;
                    this.updateStepText(`Step ${this.steps}: Fast pointer 🐰 moves to node ${this.fastPointer} (value: ${this.nodes[this.fastPointer].value})`);
                    this.draw();
                    await this.sleep();
                } else {
                    // Fast reached end
                    this.result = 'No Cycle Detected! ✅';
                    this.updateStepText(`Fast pointer reached the end. No cycle exists!`);
                    this.updateStatus(this.result);
                    return;
                }
            } else {
                // Fast reached end
                this.result = 'No Cycle Detected! ✅';
                this.updateStepText(`Fast pointer reached the end. No cycle exists!`);
                this.updateStatus(this.result);
                return;
            }

            // Check if they meet
            if (this.slowPointer === this.fastPointer) {
                this.result = 'Cycle Detected! ⚠️';
                this.updateStepText(`Pointers met at node ${this.slowPointer}! Cycle detected!`);
                this.updateStatus(this.result);
                return;
            }

            // Safety check for visualization
            if (this.steps > 50) {
                this.result = 'Cycle Detected! ⚠️';
                this.updateStepText(`Pointers would meet eventually. Cycle confirmed!`);
                this.updateStatus(this.result);
                return;
            }
        }
    }

    async findDuplicate() {
        this.slowPointer = 0;
        this.fastPointer = 0;
        this.steps = 0;

        this.updateStepText('Using array values as indices (Floyd\'s algorithm)...');
        await this.sleep();

        // Phase 1: Find intersection
        while (true) {
            this.steps++;
            
            this.slowPointer = this.nodes[this.slowPointer].value - 1;
            this.fastPointer = this.nodes[this.fastPointer].value - 1;
            
            if (this.fastPointer < this.nodes.length) {
                this.fastPointer = this.nodes[this.fastPointer].value - 1;
            }

            this.updateStats();
            this.updateStepText(`Step ${this.steps}: Slow at index ${this.slowPointer}, Fast at index ${this.fastPointer}`);
            this.draw();
            await this.sleep();

            if (this.slowPointer === this.fastPointer) {
                break;
            }

            if (this.steps > 50) break;
        }

        // Phase 2: Find duplicate
        this.slowPointer = 0;
        this.updateStepText('Phase 2: Reset slow pointer to start, move both at same speed...');
        await this.sleep();

        while (this.slowPointer !== this.fastPointer) {
            this.steps++;
            this.slowPointer = this.nodes[this.slowPointer].value - 1;
            this.fastPointer = this.nodes[this.fastPointer].value - 1;
            
            this.updateStats();
            this.draw();
            await this.sleep();
        }

        const duplicate = this.nodes[this.slowPointer].value;
        this.result = `Duplicate Found: ${duplicate} 🎯`;
        this.updateStepText(`Found duplicate number: ${duplicate}!`);
        this.updateStatus(this.result);
    }

    async isHappyNumber() {
        let slow = this.nodes[0].value;
        let fast = this.nodes[0].value;
        this.steps = 0;
        const sequence = [slow];

        const sumSquares = (n) => {
            let sum = 0;
            while (n > 0) {
                const digit = n % 10;
                sum += digit * digit;
                n = Math.floor(n / 10);
            }
            return sum;
        };

        while (true) {
            this.steps++;

            slow = sumSquares(slow);
            fast = sumSquares(sumSquares(fast));

            sequence.push(slow);
            if (sequence.length > 20) sequence.shift();

            this.updateStepText(`Step ${this.steps}: Slow = ${slow}, Fast = ${fast}. ${slow === 1 ? 'Reached 1!' : fast === 1 ? 'Fast reached 1!' : ''}`);
            this.updateStats();
            
            // Update visualization with sequence
            this.nodes = sequence.map((val, idx) => ({
                value: val,
                next: idx + 1 < sequence.length ? idx + 1 : null
            }));
            this.slowPointer = sequence.length - 1;
            this.fastPointer = sequence.length - 1;
            
            this.draw();
            await this.sleep();

            if (slow === 1 || fast === 1) {
                this.result = 'Happy Number! 😊';
                this.updateStepText(`${this.nodes[0].value} is a happy number! (Eventually reaches 1)`);
                this.updateStatus(this.result);
                return;
            }

            if (slow === fast) {
                this.result = 'Not Happy Number 😔';
                this.updateStepText(`${sequence[0]} is not a happy number (enters a cycle without reaching 1)`);
                this.updateStatus(this.result);
                return;
            }

            if (this.steps > 30) {
                this.result = slow === fast ? 'Not Happy Number 😔' : 'Likely Not Happy';
                this.updateStatus(this.result);
                return;
            }
        }
    }

    async findMiddle() {
        this.slowPointer = 0;
        this.fastPointer = 0;
        this.steps = 0;

        while (this.nodes[this.fastPointer].next !== null) {
            this.steps++;

            // Move fast pointer
            this.fastPointer = this.nodes[this.fastPointer].next;
            
            if (this.nodes[this.fastPointer].next !== null) {
                this.fastPointer = this.nodes[this.fastPointer].next;
                // Move slow pointer
                this.slowPointer = this.nodes[this.slowPointer].next;
            }

            this.updateStats();
            this.updateStepText(`Step ${this.steps}: Slow at node ${this.slowPointer} (value: ${this.nodes[this.slowPointer].value}), Fast at node ${this.fastPointer}`);
            this.draw();
            await this.sleep();

            if (this.nodes[this.fastPointer].next === null) {
                break;
            }
        }

        this.result = `Middle Node: ${this.nodes[this.slowPointer].value} 🎯`;
        this.updateStepText(`Found middle of list: Node ${this.slowPointer} with value ${this.nodes[this.slowPointer].value}`);
        this.updateStatus(this.result);
    }

    async executeOneStep() {
        // Simplified single-step execution
        if (this.steps === 0) {
            this.slowPointer = 0;
            this.fastPointer = 0;
        }

        this.steps++;
        
        if (this.nodes[this.slowPointer].next !== null) {
            this.slowPointer = this.nodes[this.slowPointer].next;
        }

        if (this.nodes[this.fastPointer].next !== null) {
            this.fastPointer = this.nodes[this.fastPointer].next;
            if (this.nodes[this.fastPointer].next !== null) {
                this.fastPointer = this.nodes[this.fastPointer].next;
            }
        }

        this.updateStats();
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const nodeRadius = 30;
        const spacing = 120;
        const startX = 100;
        const startY = this.canvas.height / 2;

        // Draw nodes and connections
        for (let i = 0; i < this.nodes.length; i++) {
            const x = startX + (i % 8) * spacing;
            const y = startY + Math.floor(i / 8) * 100;

            // Draw connection
            if (this.nodes[i].next !== null) {
                const nextIdx = this.nodes[i].next;
                const nextX = startX + (nextIdx % 8) * spacing;
                const nextY = startY + Math.floor(nextIdx / 8) * 100;

                this.ctx.beginPath();
                this.ctx.moveTo(x + nodeRadius, y);
                
                if (nextIdx < i) {
                    // Cycle back - draw curved arrow
                    this.ctx.strokeStyle = '#f59e0b';
                    this.ctx.lineWidth = 3;
                    this.ctx.bezierCurveTo(x + nodeRadius + 50, y - 80, nextX - 50, nextY - 80, nextX - nodeRadius, nextY);
                } else {
                    this.ctx.strokeStyle = '#64748b';
                    this.ctx.lineWidth = 2;
                    this.ctx.lineTo(nextX - nodeRadius, nextY);
                }
                
                this.ctx.stroke();

                // Draw arrow
                this.drawArrow(this.ctx, nextX - nodeRadius - 10, nextY, 10);
            }

            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
            
            // Color based on pointers
            if (i === this.slowPointer && i === this.fastPointer) {
                this.ctx.fillStyle = '#a855f7'; // Both pointers
            } else if (i === this.slowPointer) {
                this.ctx.fillStyle = '#3b82f6'; // Slow pointer
            } else if (i === this.fastPointer) {
                this.ctx.fillStyle = '#ef4444'; // Fast pointer
            } else {
                this.ctx.fillStyle = '#6366f1'; // Regular node
            }
            
            this.ctx.fill();
            this.ctx.strokeStyle = '#1e293b';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw value
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.nodes[i].value, x, y);

            // Draw index
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`[${i}]`, x, y + nodeRadius + 15);

            // Draw pointer labels
            if (i === this.slowPointer) {
                this.ctx.fillStyle = '#3b82f6';
                this.ctx.font = 'bold 20px Arial';
                this.ctx.fillText('🐢', x, y - nodeRadius - 15);
            }
            if (i === this.fastPointer) {
                this.ctx.fillStyle = '#ef4444';
                this.ctx.font = 'bold 20px Arial';
                this.ctx.fillText('🐰', x, y + nodeRadius + 35);
            }
        }
    }

    drawArrow(ctx, x, y, size) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y - size / 2);
        ctx.lineTo(x - size, y + size / 2);
        ctx.closePath();
        ctx.fill();
    }

    updateStats() {
        document.getElementById('slowPos').textContent = `Node ${this.slowPointer} (${this.nodes[this.slowPointer].value})`;
        document.getElementById('fastPos').textContent = `Node ${this.fastPointer} (${this.nodes[this.fastPointer].value})`;
        document.getElementById('steps').textContent = this.steps;
    }

    updateStepText(text) {
        document.getElementById('stepText').textContent = text;
    }

    updateStatus(status) {
        document.getElementById('status').textContent = status;
    }

    reset() {
        this.slowPointer = 0;
        this.fastPointer = 0;
        this.steps = 0;
        this.isRunning = false;
        this.result = null;

        document.getElementById('slowPos').textContent = '-';
        document.getElementById('fastPos').textContent = '-';
        document.getElementById('steps').textContent = '0';
        document.getElementById('status').textContent = 'Ready';
        document.getElementById('stepText').textContent = 'Click "Start" or "Step" to begin the algorithm';
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('generateBtn').disabled = false;

        if (this.nodes.length > 0) {
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

