// Merge Intervals Visualizer
class Visualizer {
    constructor() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentProblem = 'merge';
        this.intervals = [];
        this.result = [];
        this.currentStep = 0;
        this.isRunning = false;
        this.animationSpeed = 500;
        this.sortedIntervals = [];
        this.merging = false;
        
        this.setupCanvas();
        this.attachEventListeners();
        this.generateIntervals();
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

        // Control buttons
        document.getElementById('generateBtn').addEventListener('click', () => this.generateIntervals());
        document.getElementById('presetBtn').addEventListener('click', () => this.loadPreset('calendar'));
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
        document.getElementById('customMergeBtn').addEventListener('click', () => this.createCustomIntervals());
        document.getElementById('customInsertBtn').addEventListener('click', () => this.insertInterval());
        document.getElementById('customMeetingsBtn').addEventListener('click', () => this.checkMeetings());
        document.getElementById('customNonoverlapBtn').addEventListener('click', () => this.removeNonOverlap());

        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.loadPreset(e.currentTarget.dataset.preset);
            });
        });
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
            case 'merge':
                document.getElementById('mergeInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Merge Intervals';
                break;
            case 'insert':
                document.getElementById('insertInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Insert Interval';
                break;
            case 'meetings':
                document.getElementById('meetingsInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Meeting Rooms';
                break;
            case 'nonoverlap':
                document.getElementById('nonoverlapInput').classList.remove('hidden');
                document.getElementById('problemTitle').textContent = 'Non-overlapping Intervals';
                break;
        }

        this.generateIntervals();
    }

    generateIntervals() {
        this.reset();
        
        const count = 6 + Math.floor(Math.random() * 4); // 6-9 intervals
        this.intervals = [];
        
        for (let i = 0; i < count; i++) {
            const start = Math.floor(Math.random() * 15);
            const length = 2 + Math.floor(Math.random() * 5);
            this.intervals.push([start, start + length]);
        }

        this.updateStats();
        this.draw();
        this.updateStepText(`Generated ${count} random intervals. Click "Start" to begin merging.`);
    }

    loadPreset(preset) {
        this.reset();
        
        switch(preset) {
            case 'calendar':
                this.intervals = [[1,3], [2,6], [8,10], [15,18]];
                break;
            case 'busy':
                this.intervals = [[0,5], [3,7], [4,6], [6,9], [8,12], [10,14]];
                break;
            case 'sparse':
                this.intervals = [[1,2], [5,6], [10,11], [15,16]];
                break;
            case 'complex':
                this.intervals = [[1,4], [2,5], [3,6], [5,8], [7,10], [9,12], [11,14]];
                break;
        }

        this.updateStats();
        this.draw();
        this.updateStepText(`Loaded preset: ${preset}. Click "Start" to merge.`);
    }

    parseIntervals(str) {
        const regex = /\[(\d+),(\d+)\]/g;
        const intervals = [];
        let match;
        
        while ((match = regex.exec(str)) !== null) {
            intervals.push([parseInt(match[1]), parseInt(match[2])]);
        }
        
        return intervals;
    }

    createCustomIntervals() {
        const input = document.getElementById('intervalsInput').value;
        const intervals = this.parseIntervals(input);

        if (intervals.length === 0) {
            alert('Please enter valid intervals! Format: [1,3] [2,6] [8,10]');
            return;
        }

        this.reset();
        this.intervals = intervals;
        this.updateStats();
        this.draw();
        this.updateStepText(`Custom intervals loaded. Click "Start" to merge.`);
    }

    insertInterval() {
        const existing = this.parseIntervals(document.getElementById('existingIntervals').value);
        const newInt = this.parseIntervals(document.getElementById('newInterval').value);

        if (existing.length === 0 || newInt.length === 0) {
            alert('Please enter valid intervals!');
            return;
        }

        this.reset();
        this.intervals = existing;
        this.newInterval = newInt[0];
        this.currentProblem = 'insert';
        this.updateStats();
        this.draw();
        this.updateStepText(`Insert [${newInt[0]}] into existing intervals.`);
    }

    checkMeetings() {
        const input = document.getElementById('meetingTimes').value;
        const meetings = this.parseIntervals(input);

        if (meetings.length === 0) {
            alert('Please enter valid meeting times!');
            return;
        }

        this.reset();
        this.intervals = meetings;
        this.currentProblem = 'meetings';
        this.updateStats();
        this.draw();
        this.updateStepText(`Checking if all meetings can be attended...`);
    }

    removeNonOverlap() {
        const input = document.getElementById('nonoverlapIntervals').value;
        const intervals = this.parseIntervals(input);

        if (intervals.length === 0) {
            alert('Please enter valid intervals!');
            return;
        }

        this.reset();
        this.intervals = intervals;
        this.currentProblem = 'nonoverlap';
        this.updateStats();
        this.draw();
        this.updateStepText(`Finding minimum removals for non-overlapping intervals...`);
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
            case 'merge':
                await this.mergeIntervals();
                break;
            case 'insert':
                await this.insertIntervalAlgorithm();
                break;
            case 'meetings':
                await this.meetingRooms();
                break;
            case 'nonoverlap':
                await this.nonOverlappingIntervals();
                break;
        }
    }

    async mergeIntervals() {
        // Step 1: Sort
        this.updateStepText('Step 1: Sorting intervals by start time...');
        this.sortedIntervals = [...this.intervals].sort((a, b) => a[0] - b[0]);
        await this.sleep();

        this.updateStepText('Intervals sorted! Now merging overlapping intervals...');
        this.draw();
        await this.sleep();

        // Step 2: Merge
        this.result = [this.sortedIntervals[0]];
        this.currentStep = 0;

        for (let i = 1; i < this.sortedIntervals.length; i++) {
            this.currentStep = i;
            const current = this.sortedIntervals[i];
            const last = this.result[this.result.length - 1];

            this.updateStepText(`Step ${i + 1}: Checking interval [${current}]...`);
            this.draw();
            await this.sleep();

            // Check overlap
            if (current[0] <= last[1]) {
                // Overlap - merge
                const oldEnd = last[1];
                last[1] = Math.max(last[1], current[1]);
                this.updateStepText(`Overlap detected! Merging [${current[0]},${current[1]}] with [${last[0]},${oldEnd}] → [${last[0]},${last[1]}]`);
                this.merging = true;
                this.draw();
                await this.sleep();
                this.merging = false;
            } else {
                // No overlap - add as new
                this.result.push(current);
                this.updateStepText(`No overlap. Adding [${current}] as new interval.`);
                this.draw();
                await this.sleep();
            }
        }

        this.updateStepText(`✅ Merging complete! Reduced from ${this.sortedIntervals.length} to ${this.result.length} intervals.`);
        document.getElementById('result').textContent = `${this.result.length} intervals`;
        this.draw();
    }

    async insertIntervalAlgorithm() {
        this.sortedIntervals = [...this.intervals].sort((a, b) => a[0] - b[0]);
        this.result = [];
        let i = 0;

        this.updateStepText(`Inserting new interval [${this.newInterval}] into sorted list...`);
        await this.sleep();

        // Add all intervals before newInterval
        while (i < this.sortedIntervals.length && this.sortedIntervals[i][1] < this.newInterval[0]) {
            this.result.push(this.sortedIntervals[i]);
            this.updateStepText(`Adding [${this.sortedIntervals[i]}] (ends before new interval starts)`);
            this.currentStep = i;
            this.draw();
            await this.sleep();
            i++;
        }

        // Merge overlapping intervals
        let mergedInterval = [...this.newInterval];
        while (i < this.sortedIntervals.length && this.sortedIntervals[i][0] <= mergedInterval[1]) {
            mergedInterval[0] = Math.min(mergedInterval[0], this.sortedIntervals[i][0]);
            mergedInterval[1] = Math.max(mergedInterval[1], this.sortedIntervals[i][1]);
            this.updateStepText(`Merging with [${this.sortedIntervals[i]}] → [${mergedInterval}]`);
            this.currentStep = i;
            this.merging = true;
            this.draw();
            await this.sleep();
            i++;
        }
        this.result.push(mergedInterval);
        this.merging = false;

        // Add remaining intervals
        while (i < this.sortedIntervals.length) {
            this.result.push(this.sortedIntervals[i]);
            this.updateStepText(`Adding remaining interval [${this.sortedIntervals[i]}]`);
            this.currentStep = i;
            this.draw();
            await this.sleep();
            i++;
        }

        this.updateStepText(`✅ Insertion complete! Result has ${this.result.length} intervals.`);
        document.getElementById('result').textContent = `${this.result.length} intervals`;
        this.draw();
    }

    async meetingRooms() {
        this.sortedIntervals = [...this.intervals].sort((a, b) => a[0] - b[0]);
        
        this.updateStepText('Checking if person can attend all meetings...');
        await this.sleep();

        let canAttend = true;
        let maxRooms = 1;
        const rooms = [];

        for (let i = 0; i < this.sortedIntervals.length; i++) {
            this.currentStep = i;
            
            if (i > 0 && this.sortedIntervals[i][0] < this.sortedIntervals[i-1][1]) {
                canAttend = false;
                this.updateStepText(`❌ Conflict found! Meeting [${this.sortedIntervals[i]}] overlaps with [${this.sortedIntervals[i-1]}]`);
                this.merging = true;
                this.draw();
                await this.sleep();
                this.merging = false;
            } else if (i > 0) {
                this.updateStepText(`✓ Meeting [${this.sortedIntervals[i]}] can be attended`);
                this.draw();
                await this.sleep();
            }

            // Calculate rooms needed
            rooms.push(this.sortedIntervals[i][1]);
            rooms.sort((a, b) => a - b);
            
            // Remove rooms that have ended
            while (rooms.length > 0 && rooms[0] <= this.sortedIntervals[i][0]) {
                rooms.shift();
            }
            
            maxRooms = Math.max(maxRooms, rooms.length);
        }

        this.result = this.sortedIntervals;
        
        if (canAttend) {
            this.updateStepText(`✅ All meetings can be attended! Only 1 room needed.`);
            document.getElementById('result').textContent = `✅ Can attend`;
        } else {
            this.updateStepText(`❌ Cannot attend all meetings. Need ${maxRooms} conference rooms.`);
            document.getElementById('result').textContent = `${maxRooms} rooms needed`;
        }
        this.draw();
    }

    async nonOverlappingIntervals() {
        this.sortedIntervals = [...this.intervals].sort((a, b) => a[1] - b[1]); // Sort by end time
        
        this.updateStepText('Finding minimum removals to make intervals non-overlapping...');
        await this.sleep();

        let removals = 0;
        let prevEnd = this.sortedIntervals[0][1];
        this.result = [this.sortedIntervals[0]];

        for (let i = 1; i < this.sortedIntervals.length; i++) {
            this.currentStep = i;
            
            if (this.sortedIntervals[i][0] < prevEnd) {
                // Overlap - remove this interval
                removals++;
                this.updateStepText(`❌ Remove [${this.sortedIntervals[i]}] (overlaps with previous interval ending at ${prevEnd})`);
                this.merging = true;
                this.draw();
                await this.sleep();
                this.merging = false;
            } else {
                // No overlap - keep it
                prevEnd = this.sortedIntervals[i][1];
                this.result.push(this.sortedIntervals[i]);
                this.updateStepText(`✓ Keep [${this.sortedIntervals[i]}] (no overlap)`);
                this.draw();
                await this.sleep();
            }
        }

        this.updateStepText(`✅ Minimum ${removals} removal(s) needed! Kept ${this.result.length} intervals.`);
        document.getElementById('result').textContent = `${removals} removals`;
        this.draw();
    }

    async executeOneStep() {
        // Simplified single-step execution
        if (this.sortedIntervals.length === 0) {
            this.sortedIntervals = [...this.intervals].sort((a, b) => a[0] - b[0]);
            this.result = [this.sortedIntervals[0]];
            this.currentStep = 1;
        } else if (this.currentStep < this.sortedIntervals.length) {
            const current = this.sortedIntervals[this.currentStep];
            const last = this.result[this.result.length - 1];

            if (current[0] <= last[1]) {
                last[1] = Math.max(last[1], current[1]);
            } else {
                this.result.push(current);
            }
            this.currentStep++;
        }

        this.updateStats();
        this.draw();
    }

    draw() {
        // Calculate required canvas height based on number of intervals
        const intervalHeight = 30;
        const intervalSpacing = 10;
        const startY = 60;
        const displayIntervals = this.sortedIntervals.length > 0 ? this.sortedIntervals : this.intervals;
        const resultSpacing = 60; // Space between original and result sections
        const minHeight = 500;
        
        // Calculate needed height
        const originalsHeight = displayIntervals.length * (intervalHeight + intervalSpacing);
        const resultHeight = this.result.length > 0 ? this.result.length * (intervalHeight + intervalSpacing) + resultSpacing : 0;
        const totalNeededHeight = startY + originalsHeight + resultHeight + 100;
        
        // Update canvas height if needed
        if (totalNeededHeight > minHeight) {
            this.canvas.height = totalNeededHeight;
        } else {
            this.canvas.height = minHeight;
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const scale = 40;
        const offsetX = 100;

        // Draw timeline
        this.ctx.strokeStyle = '#cbd5e1';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(offsetX, startY - 30);
        this.ctx.lineTo(offsetX + 20 * scale, startY - 30);
        this.ctx.stroke();

        // Draw tick marks
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        for (let i = 0; i <= 20; i += 2) {
            const x = offsetX + i * scale;
            this.ctx.beginPath();
            this.ctx.moveTo(x, startY - 35);
            this.ctx.lineTo(x, startY - 25);
            this.ctx.stroke();
            this.ctx.fillText(i.toString(), x, startY - 40);
        }

        // Draw original intervals
        this.ctx.font = 'bold 14px Arial';
        
        displayIntervals.forEach((interval, idx) => {
            const y = startY + idx * (intervalHeight + intervalSpacing);
            const x1 = offsetX + interval[0] * scale;
            const x2 = offsetX + interval[1] * scale;

            // Determine color
            let color = '#6366f1';
            if (this.currentStep === idx && this.merging) {
                color = '#f59e0b';
            } else if (this.currentStep === idx) {
                color = '#8b5cf6';
            }

            // Draw interval bar
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x1, y, x2 - x1, intervalHeight);
            this.ctx.strokeStyle = '#1e293b';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x1, y, x2 - x1, intervalHeight);

            // Draw interval text
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`[${interval[0]},${interval[1]}]`, (x1 + x2) / 2, y + intervalHeight / 2 + 5);
        });

        // Draw result intervals if available
        if (this.result.length > 0) {
            const resultStartY = startY + displayIntervals.length * (intervalHeight + intervalSpacing) + 50;
            
            // Draw "Result:" label
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText('Result:', offsetX, resultStartY);

            // Draw result timeline
            this.ctx.strokeStyle = '#cbd5e1';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(offsetX, resultStartY + 15);
            this.ctx.lineTo(offsetX + 20 * scale, resultStartY + 15);
            this.ctx.stroke();

            this.result.forEach((interval, idx) => {
                const y = resultStartY + 30 + idx * (intervalHeight + intervalSpacing);
                const x1 = offsetX + interval[0] * scale;
                const x2 = offsetX + interval[1] * scale;

                // Draw merged interval
                this.ctx.fillStyle = '#10b981';
                this.ctx.fillRect(x1, y, x2 - x1, intervalHeight);
                this.ctx.strokeStyle = '#1e293b';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x1, y, x2 - x1, intervalHeight);

                // Draw text
                this.ctx.fillStyle = 'white';
                this.ctx.font = 'bold 14px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`[${interval[0]},${interval[1]}]`, (x1 + x2) / 2, y + intervalHeight / 2 + 5);
            });
        }
    }

    updateStats() {
        document.getElementById('totalIntervals').textContent = this.intervals.length;
        document.getElementById('currentStep').textContent = this.currentStep;
        document.getElementById('mergedCount').textContent = this.result.length;
    }

    updateStepText(text) {
        document.getElementById('stepText').textContent = text;
    }

    reset() {
        this.result = [];
        this.sortedIntervals = [];
        this.currentStep = 0;
        this.isRunning = false;
        this.merging = false;
        this.newInterval = null;

        document.getElementById('currentStep').textContent = '0';
        document.getElementById('mergedCount').textContent = '0';
        document.getElementById('result').textContent = '-';
        document.getElementById('stepText').textContent = 'Click "Start" or "Step" to begin the algorithm';
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('generateBtn').disabled = false;

        if (this.intervals.length > 0) {
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

