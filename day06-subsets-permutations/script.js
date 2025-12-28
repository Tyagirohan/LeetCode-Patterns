// Subsets & Permutations Visualizer
class Visualizer {
    constructor() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentProblem = 'subsets';
        this.array = [1, 2, 3];
        this.k = 2;
        this.results = [];
        this.animationSpeed = 500;
        this.isRunning = false;
        this.currentPath = [];
        this.treeNodes = [];
        
        this.setupCanvas();
        this.attachEventListeners();
        this.updateStats();
    }

    setupCanvas() {
        this.canvas.width = 1200;
        this.canvas.height = 600;
    }

    attachEventListeners() {
        // Problem tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProblem(e.currentTarget.dataset.problem);
            });
        });

        // Control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('updateBtn').addEventListener('click', () => this.updateArray());

        // Speed control
        document.getElementById('speedSlider').addEventListener('input', (e) => {
            const speeds = ['Slow', 'Normal', 'Fast', 'Instant'];
            const speedValues = [1000, 500, 200, 50];
            const value = parseInt(e.target.value) - 1;
            this.animationSpeed = speedValues[value];
            document.getElementById('speedLabel').textContent = speeds[value];
        });
    }

    switchProblem(problem) {
        this.currentProblem = problem;
        this.reset();

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-problem="${problem}"]`).classList.add('active');

        // Show/hide K control
        document.getElementById('kControl').classList.toggle('hidden', problem !== 'combinations');

        // Update title
        const titles = {
            'subsets': 'Generate All Subsets (Power Set)',
            'permutations': 'Generate All Permutations',
            'combinations': 'Generate All Combinations'
        };
        document.getElementById('problemTitle').textContent = titles[problem];

        this.updateStats();
    }

    updateArray() {
        const input = document.getElementById('arrayInput').value;
        const arr = input.split(',').map(x => x.trim()).filter(x => x !== '');
        
        if (arr.length === 0) {
            alert('Please enter valid values!');
            return;
        }

        // Convert to numbers if possible, otherwise keep as strings
        this.array = arr.map(x => {
            const num = parseInt(x);
            return isNaN(num) ? x : num;
        });

        this.reset();
        this.updateStats();
    }

    async start() {
        if (this.isRunning) return;
        
        if (this.array.length > 5) {
            if (!confirm(`Array size is ${this.array.length}. This will generate ${this.getExpectedCount()} results. Continue?`)) {
                return;
            }
        }

        this.isRunning = true;
        this.results = [];
        this.treeNodes = [];
        this.currentPath = [];
        document.getElementById('startBtn').disabled = true;
        document.getElementById('status').textContent = 'Running...';
        document.getElementById('resultsContainer').innerHTML = '';

        switch(this.currentProblem) {
            case 'subsets':
                await this.generateSubsets();
                break;
            case 'permutations':
                await this.generatePermutations();
                break;
            case 'combinations':
                this.k = parseInt(document.getElementById('kValue').value);
                await this.generateCombinations();
                break;
        }

        this.isRunning = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('status').textContent = 'Complete!';
        this.updateStepText(`✅ Generated ${this.results.length} results!`);
    }

    async generateSubsets() {
        this.updateStepText('Generating all subsets using backtracking...');
        this.currentPath = [];
        await this.sleep();

        const backtrack = async (index, current) => {
            // Visualize current state
            this.currentPath = [...current];
            this.drawAnimatedTree();
            
            // Add current subset
            this.results.push([...current]);
            this.addResult([...current]);
            this.updateStepText(`✅ Found subset: [${current.length === 0 ? '' : current.join(', ')}] (${this.results.length}/${this.getExpectedCount()})`);
            this.updateStats();
            await this.sleep();

            // Try adding each remaining element
            for (let i = index; i < this.array.length; i++) {
                this.updateStepText(`🔍 Trying to add ${this.array[i]} to [${current.join(', ')}]`);
                current.push(this.array[i]);
                await backtrack(i + 1, current);
                this.updateStepText(`⬅️ Backtracking, removing ${this.array[i]}`);
                current.pop();
                await this.sleep(this.animationSpeed / 2);
            }
        };

        await backtrack(0, []);
    }

    async generatePermutations() {
        this.updateStepText('Generating all permutations using backtracking...');
        this.currentPath = [];
        await this.sleep();

        const backtrack = async (current, remaining) => {
            // Visualize current state
            this.currentPath = [...current];
            this.drawAnimatedTree();
            
            if (remaining.length === 0) {
                this.results.push([...current]);
                this.addResult([...current]);
                this.updateStepText(`✅ Found permutation: [${current.join(', ')}] (${this.results.length}/${this.getExpectedCount()})`);
                this.updateStats();
                await this.sleep();
                return;
            }

            for (let i = 0; i < remaining.length; i++) {
                this.updateStepText(`🔍 Adding ${remaining[i]} to [${current.join(', ')}]`);
                current.push(remaining[i]);
                
                const newRemaining = [
                    ...remaining.slice(0, i),
                    ...remaining.slice(i + 1)
                ];
                
                await backtrack(current, newRemaining);
                this.updateStepText(`⬅️ Backtracking, removing ${remaining[i]}`);
                current.pop();
                await this.sleep(this.animationSpeed / 2);
            }
        };

        await backtrack([], this.array);
    }

    async generateCombinations() {
        this.updateStepText(`Generating all combinations of ${this.k} elements...`);
        this.currentPath = [];
        await this.sleep();

        const backtrack = async (start, current) => {
            // Visualize current state
            this.currentPath = [...current];
            this.drawAnimatedTree();
            
            if (current.length === this.k) {
                this.results.push([...current]);
                this.addResult([...current]);
                this.updateStepText(`✅ Found combination: [${current.join(', ')}] (${this.results.length}/${this.getExpectedCount()})`);
                this.updateStats();
                await this.sleep();
                return;
            }

            for (let i = start; i < this.array.length; i++) {
                this.updateStepText(`🔍 Adding ${this.array[i]} to [${current.join(', ')}], need ${this.k - current.length} more`);
                current.push(this.array[i]);
                await backtrack(i + 1, current);
                this.updateStepText(`⬅️ Backtracking, removing ${this.array[i]}`);
                current.pop();
                await this.sleep(this.animationSpeed / 2);
            }
        };

        await backtrack(0, []);
    }

    addResult(result) {
        const container = document.getElementById('resultsContainer');
        const item = document.createElement('div');
        item.className = 'result-item';
        
        if (result.length === 0) {
            item.textContent = '[ ]';
        } else {
            item.textContent = `[${result.join(', ')}]`;
        }
        
        container.appendChild(item);
        
        // Auto-scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    getExpectedCount() {
        const n = this.array.length;
        
        switch(this.currentProblem) {
            case 'subsets':
                return Math.pow(2, n);
            case 'permutations':
                return this.factorial(n);
            case 'combinations':
                const k = parseInt(document.getElementById('kValue').value);
                return this.combination(n, k);
            default:
                return 0;
        }
    }

    factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    combination(n, k) {
        if (k > n) return 0;
        if (k === 0 || k === n) return 1;
        
        // C(n,k) = n! / (k! * (n-k)!)
        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
    }

    updateStats() {
        document.getElementById('arraySize').textContent = this.array.length;
        document.getElementById('totalResults').textContent = this.results.length;
        
        const expected = this.getExpectedCount();
        let expectedText = expected.toString();
        
        if (this.currentProblem === 'subsets') {
            expectedText = `2^${this.array.length} = ${expected}`;
        } else if (this.currentProblem === 'permutations') {
            expectedText = `${this.array.length}! = ${expected}`;
        } else if (this.currentProblem === 'combinations') {
            const k = parseInt(document.getElementById('kValue').value);
            expectedText = `C(${this.array.length},${k}) = ${expected}`;
        }
        
        document.getElementById('expectedCount').textContent = expectedText;
    }

    updateStepText(text) {
        document.getElementById('stepText').textContent = text;
    }

    reset() {
        this.results = [];
        this.treeNodes = [];
        this.currentPath = [];
        this.isRunning = false;

        document.getElementById('resultsContainer').innerHTML = '';
        document.getElementById('totalResults').textContent = '0';
        document.getElementById('status').textContent = 'Ready';
        document.getElementById('stepText').textContent = 'Click "Generate" to start';
        document.getElementById('startBtn').disabled = false;

        this.updateStats();
        this.drawDecisionTree();
    }

    drawDecisionTree() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw title and explanation
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        
        let title = '';
        let explanation = '';
        
        switch(this.currentProblem) {
            case 'subsets':
                title = 'Subsets Decision Tree';
                explanation = `Each element: Include (✓) or Exclude (✗) → 2^${this.array.length} = ${this.getExpectedCount()} subsets`;
                break;
            case 'permutations':
                title = 'Permutations Decision Tree';
                explanation = `Each position: Try all remaining elements → ${this.array.length}! = ${this.getExpectedCount()} permutations`;
                break;
            case 'combinations':
                const k = parseInt(document.getElementById('kValue').value);
                title = 'Combinations Decision Tree';
                explanation = `Choose ${k} from ${this.array.length} elements → C(${this.array.length},${k}) = ${this.getExpectedCount()} combinations`;
                break;
        }
        
        this.ctx.fillText(title, this.canvas.width / 2, 30);
        
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#64748b';
        this.ctx.fillText(explanation, this.canvas.width / 2, 55);

        // Always draw visualization
        const startY = 100;
        
        if (this.array.length <= 4) {
            this.drawVisualTree(startY);
        } else {
            this.drawLargeArrayInfo(startY);
        }
    }
    
    drawVisualTree(startY) {
        switch(this.currentProblem) {
            case 'subsets':
                this.drawSubsetsTree(startY);
                break;
            case 'permutations':
                this.drawPermutationsTree(startY);
                break;
            case 'combinations':
                this.drawCombinationsTree(startY);
                break;
        }
    }
    
    drawSubsetsTree(startY) {
        const nodeRadius = 25;
        const width = this.canvas.width;
        const n = this.array.length;
        
        if (n === 3) {
            // Draw full binary tree for 3 elements
            const levelHeight = 100;
            
            // Root
            this.drawTreeNode(width / 2, startY, '[]', nodeRadius, '#6366f1');
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Start', width / 2, startY - 35);
            
            // Level 1 - First element decision
            const level1Y = startY + levelHeight;
            this.drawTreeNode(width / 3, level1Y, '[]', nodeRadius, '#8b5cf6');
            this.drawTreeNode(2 * width / 3, level1Y, `[${this.array[0]}]`, nodeRadius, '#8b5cf6');
            
            this.drawTreeEdge(width / 2, startY, width / 3, level1Y, '✗ ' + this.array[0]);
            this.drawTreeEdge(width / 2, startY, 2 * width / 3, level1Y, '✓ ' + this.array[0]);
            
            // Level 2 - Second element decision
            const level2Y = level1Y + levelHeight;
            this.drawTreeNode(width / 6, level2Y, '[]', nodeRadius, '#a78bfa');
            this.drawTreeNode(width / 3, level2Y, `[${this.array[1]}]`, nodeRadius, '#a78bfa');
            this.drawTreeNode(width / 2, level2Y, `[${this.array[0]}]`, nodeRadius, '#a78bfa');
            this.drawTreeNode(2 * width / 3, level2Y, `[${this.array[0]},${this.array[1]}]`, nodeRadius, '#a78bfa');
            
            this.drawTreeEdge(width / 3, level1Y, width / 6, level2Y, '✗ ' + this.array[1]);
            this.drawTreeEdge(width / 3, level1Y, width / 3, level2Y, '✓ ' + this.array[1]);
            this.drawTreeEdge(2 * width / 3, level1Y, width / 2, level2Y, '✗ ' + this.array[1]);
            this.drawTreeEdge(2 * width / 3, level1Y, 2 * width / 3, level2Y, '✓ ' + this.array[1]);
            
            // Level 3 - Third element (leaves)
            const level3Y = level2Y + levelHeight;
            const positions = [1/12, 2/12, 3/12, 4/12, 5/12, 6/12, 7/12, 8/12];
            const subsets = [
                '[]',
                `[${this.array[2]}]`,
                `[${this.array[1]}]`,
                `[${this.array[1]},${this.array[2]}]`,
                `[${this.array[0]}]`,
                `[${this.array[0]},${this.array[2]}]`,
                `[${this.array[0]},${this.array[1]}]`,
                `[${this.array[0]},${this.array[1]},${this.array[2]}]`
            ];
            
            for (let i = 0; i < 4; i++) {
                const fromX = (i === 0) ? width/6 : (i === 1) ? width/3 : (i === 2) ? width/2 : 2*width/3;
                
                this.drawTreeNode(positions[i*2] * width, level3Y, subsets[i*2], nodeRadius * 0.8, '#10b981');
                this.drawTreeNode(positions[i*2+1] * width, level3Y, subsets[i*2+1], nodeRadius * 0.8, '#10b981');
                
                this.drawTreeEdge(fromX, level2Y, positions[i*2] * width, level3Y, '✗', true);
                this.drawTreeEdge(fromX, level2Y, positions[i*2+1] * width, level3Y, '✓', true);
            }
            
            // Legend
            this.drawLegend();
        }
    }
    
    drawPermutationsTree(startY) {
        const nodeRadius = 30;
        const width = this.canvas.width;
        const n = this.array.length;
        
        if (n === 3) {
            const levelHeight = 120;
            
            // Root
            this.drawTreeNode(width / 2, startY, '[]', nodeRadius, '#6366f1');
            
            // Level 1 - Choose first element
            const level1Y = startY + levelHeight;
            const x1 = [width/4, width/2, 3*width/4];
            
            for (let i = 0; i < 3; i++) {
                this.drawTreeNode(x1[i], level1Y, `[${this.array[i]}]`, nodeRadius, '#8b5cf6');
                this.drawTreeEdge(width/2, startY, x1[i], level1Y, String(this.array[i]));
            }
            
            // Level 2 - Choose second element (from remaining)
            const level2Y = level1Y + levelHeight;
            const x2 = [
                width/8, width/4,     // From [1]
                3*width/8, 5*width/8, // From [2]
                3*width/4, 7*width/8  // From [3]
            ];
            
            // From [array[0]]: can pick array[1] or array[2]
            this.drawTreeNode(x2[0], level2Y, `[${this.array[0]},${this.array[1]}]`, nodeRadius*0.8, '#a78bfa');
            this.drawTreeNode(x2[1], level2Y, `[${this.array[0]},${this.array[2]}]`, nodeRadius*0.8, '#a78bfa');
            this.drawTreeEdge(x1[0], level1Y, x2[0], level2Y, String(this.array[1]));
            this.drawTreeEdge(x1[0], level1Y, x2[1], level2Y, String(this.array[2]));
            
            // From [array[1]]: can pick array[0] or array[2]
            this.drawTreeNode(x2[2], level2Y, `[${this.array[1]},${this.array[0]}]`, nodeRadius*0.8, '#a78bfa');
            this.drawTreeNode(x2[3], level2Y, `[${this.array[1]},${this.array[2]}]`, nodeRadius*0.8, '#a78bfa');
            this.drawTreeEdge(x1[1], level1Y, x2[2], level2Y, String(this.array[0]));
            this.drawTreeEdge(x1[1], level1Y, x2[3], level2Y, String(this.array[2]));
            
            // From [array[2]]: can pick array[0] or array[1]
            this.drawTreeNode(x2[4], level2Y, `[${this.array[2]},${this.array[0]}]`, nodeRadius*0.8, '#a78bfa');
            this.drawTreeNode(x2[5], level2Y, `[${this.array[2]},${this.array[1]}]`, nodeRadius*0.8, '#a78bfa');
            this.drawTreeEdge(x1[2], level1Y, x2[4], level2Y, String(this.array[0]));
            this.drawTreeEdge(x1[2], level1Y, x2[5], level2Y, String(this.array[1]));
            
            // Level 3 - Add last element (final permutations)
            const level3Y = level2Y + levelHeight;
            const perms = [
                `[${this.array[0]},${this.array[1]},${this.array[2]}]`,
                `[${this.array[0]},${this.array[2]},${this.array[1]}]`,
                `[${this.array[1]},${this.array[0]},${this.array[2]}]`,
                `[${this.array[1]},${this.array[2]},${this.array[0]}]`,
                `[${this.array[2]},${this.array[0]},${this.array[1]}]`,
                `[${this.array[2]},${this.array[1]},${this.array[0]}]`
            ];
            
            const lastElems = [this.array[2], this.array[1], this.array[2], this.array[0], this.array[1], this.array[0]];
            
            for (let i = 0; i < 6; i++) {
                this.drawTreeNode(x2[i], level3Y, perms[i], nodeRadius*0.7, '#10b981');
                this.drawTreeEdge(x2[i], level2Y, x2[i], level3Y, String(lastElems[i]), true);
            }
            
            this.drawLegend();
        }
    }
    
    drawCombinationsTree(startY) {
        const nodeRadius = 28;
        const width = this.canvas.width;
        const k = parseInt(document.getElementById('kValue').value);
        const n = this.array.length;
        
        if (n === 3 && k === 2) {
            const levelHeight = 130;
            
            // Root
            this.drawTreeNode(width / 2, startY, '[]', nodeRadius, '#6366f1');
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '12px Arial';
            this.ctx.fillText('Need 2 elements', width / 2, startY - 35);
            
            // Level 1 - Choose first element
            const level1Y = startY + levelHeight;
            this.drawTreeNode(width/4, level1Y, `[${this.array[0]}]`, nodeRadius, '#8b5cf6');
            this.drawTreeNode(width/2, level1Y, `[${this.array[1]}]`, nodeRadius, '#8b5cf6');
            this.drawTreeNode(3*width/4, level1Y, `[${this.array[2]}]`, nodeRadius, '#8b5cf6');
            
            this.drawTreeEdge(width/2, startY, width/4, level1Y, 'Choose ' + this.array[0]);
            this.drawTreeEdge(width/2, startY, width/2, level1Y, 'Choose ' + this.array[1]);
            this.drawTreeEdge(width/2, startY, 3*width/4, level1Y, 'Choose ' + this.array[2]);
            
            // Level 2 - Choose second element (only from later elements!)
            const level2Y = level1Y + levelHeight;
            
            // From [array[0]]: can add array[1] or array[2]
            this.drawTreeNode(width/6, level2Y, `[${this.array[0]},${this.array[1]}]`, nodeRadius, '#10b981');
            this.drawTreeNode(width/3, level2Y, `[${this.array[0]},${this.array[2]}]`, nodeRadius, '#10b981');
            this.drawTreeEdge(width/4, level1Y, width/6, level2Y, '+ ' + this.array[1]);
            this.drawTreeEdge(width/4, level1Y, width/3, level2Y, '+ ' + this.array[2]);
            
            // From [array[1]]: can only add array[2] (no array[0] - already used before!)
            this.drawTreeNode(width/2, level2Y, `[${this.array[1]},${this.array[2]}]`, nodeRadius, '#10b981');
            this.drawTreeEdge(width/2, level1Y, width/2, level2Y, '+ ' + this.array[2]);
            
            // From [array[2]]: STOP! No more elements after it
            this.ctx.strokeStyle = '#ef4444';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            const stopX = 3*width/4;
            const stopY = level2Y - 20;
            this.ctx.moveTo(stopX - 20, stopY);
            this.ctx.lineTo(stopX + 20, stopY);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
            
            this.ctx.fillStyle = '#ef4444';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('No more elements!', stopX, stopY + 20);
            
            // Add explanation
            this.ctx.fillStyle = '#6366f1';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`✓ Found all C(${n},${k}) = ${this.getExpectedCount()} combinations!`, width/2, level2Y + 60);
            
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '12px Arial';
            this.ctx.fillText('(Each combination appears exactly once - no duplicates!)', width/2, level2Y + 80);
            
            this.drawLegend();
        } else {
            this.drawLargeArrayInfo(startY);
        }
    }
    
    drawLargeArrayInfo(startY) {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#1e293b';
        this.ctx.textAlign = 'left';
        
        const statsY = startY + 30;
        this.ctx.fillText(`📊 Input Array: [${this.array.join(', ')}]`, 100, statsY);
        this.ctx.fillText(`📈 Array Size: ${this.array.length} elements`, 100, statsY + 40);
        this.ctx.fillText(`🎯 Expected Results: ${this.getExpectedCount()}`, 100, statsY + 80);
        
        if (this.getExpectedCount() > 1000) {
            this.ctx.fillStyle = '#ef4444';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillText(`⚠️ Warning: Large result set! Generation may take time.`, 100, statsY + 130);
        }
        
        // Draw algorithm explanation
        this.ctx.fillStyle = '#6366f1';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.fillText('🧠 Algorithm:', 100, statsY + 180);
        
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = '14px Arial';
        
        if (this.currentProblem === 'subsets') {
            this.ctx.fillText('• For each element: Make 2 recursive calls', 100, statsY + 210);
            this.ctx.fillText('  → One WITHOUT the element (exclude)', 100, statsY + 235);
            this.ctx.fillText('  → One WITH the element (include)', 100, statsY + 260);
            this.ctx.fillText(`• Total branches: 2 × 2 × 2 ... (${this.array.length} times) = 2^${this.array.length} = ${this.getExpectedCount()}`, 100, statsY + 290);
        } else if (this.currentProblem === 'permutations') {
            this.ctx.fillText('• Try each element in each position', 100, statsY + 210);
            this.ctx.fillText(`  → Position 1: ${this.array.length} choices`, 100, statsY + 235);
            this.ctx.fillText(`  → Position 2: ${this.array.length - 1} choices`, 100, statsY + 260);
            this.ctx.fillText(`  → Position 3: ${this.array.length - 2} choices...`, 100, statsY + 285);
            this.ctx.fillText(`• Total: ${this.array.length}! = ${this.getExpectedCount()}`, 100, statsY + 315);
        } else {
            const k = parseInt(document.getElementById('kValue').value);
            this.ctx.fillText(`• Choose ${k} elements from ${this.array.length}`, 100, statsY + 210);
            this.ctx.fillText('• Only use elements AFTER current (avoid duplicates)', 100, statsY + 235);
            this.ctx.fillText(`• Formula: C(${this.array.length},${k}) = ${this.array.length}! / (${k}! × ${this.array.length - k}!)`, 100, statsY + 260);
            this.ctx.fillText(`• Total: ${this.getExpectedCount()} combinations`, 100, statsY + 290);
        }
        
        // Click message
        this.ctx.fillStyle = '#10b981';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('👆 Click "Generate" to watch the algorithm in action!', this.canvas.width / 2, this.canvas.height - 40);
    }
    
    drawTreeNode(x, y, text, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 11px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Handle long text
        if (text.length > 15) {
            const parts = text.split(',');
            if (parts.length > 2) {
                this.ctx.font = 'bold 9px Arial';
            }
        }
        
        this.ctx.fillText(text, x, y);
    }
    
    drawTreeEdge(x1, y1, x2, y2, label, thin = false) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1 + 25);
        this.ctx.lineTo(x2, y2 - 25);
        this.ctx.strokeStyle = '#cbd5e1';
        this.ctx.lineWidth = thin ? 1.5 : 2;
        this.ctx.stroke();
        
        // Draw label
        if (label) {
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '11px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(label, midX, midY);
        }
    }
    
    drawLegend() {
        const legendX = 50;
        const legendY = this.canvas.height - 80;
        
        this.ctx.fillStyle = '#6366f1';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Legend:', legendX, legendY);
        
        const items = [
            { color: '#6366f1', label: 'Root' },
            { color: '#8b5cf6', label: 'Level 1' },
            { color: '#a78bfa', label: 'Level 2' },
            { color: '#10b981', label: 'Final Result' }
        ];
        
        items.forEach((item, i) => {
            const x = legendX + i * 150;
            const y = legendY + 20;
            
            this.ctx.beginPath();
            this.ctx.arc(x + 10, y, 8, 0, Math.PI * 2);
            this.ctx.fillStyle = item.color;
            this.ctx.fill();
            
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(item.label, x + 25, y + 4);
        });
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms || this.animationSpeed));
    }
    
    drawAnimatedTree() {
        // Draw the tree with current path highlighted
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw title
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        
        let title = '';
        switch(this.currentProblem) {
            case 'subsets':
                title = '🔍 Exploring: [' + this.currentPath.join(', ') + ']';
                break;
            case 'permutations':
                title = '🔍 Building: [' + this.currentPath.join(', ') + ']';
                break;
            case 'combinations':
                title = `🔍 Current: [${this.currentPath.join(', ')}] (${this.currentPath.length}/${this.k})`;
                break;
        }
        this.ctx.fillText(title, this.canvas.width / 2, 40);
        
        // Draw visualization
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw large current state circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
        
        // Pulsing effect
        const gradient = this.ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 80);
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#8b5cf6');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        
        // Draw current path text
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const pathText = this.currentPath.length === 0 ? '[ ]' : `[${this.currentPath.join(', ')}]`;
        this.ctx.fillText(pathText, centerX, centerY);
        
        // Draw array elements around
        const radius = 180;
        const angleStep = (Math.PI * 2) / this.array.length;
        
        this.ctx.font = '14px Arial';
        for (let i = 0; i < this.array.length; i++) {
            const angle = -Math.PI / 2 + i * angleStep;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const isInPath = this.currentPath.includes(this.array[i]);
            
            // Draw element circle
            this.ctx.beginPath();
            this.ctx.arc(x, y, 30, 0, Math.PI * 2);
            this.ctx.fillStyle = isInPath ? '#10b981' : '#e2e8f0';
            this.ctx.fill();
            this.ctx.strokeStyle = isInPath ? '#059669' : '#cbd5e1';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Draw element value
            this.ctx.fillStyle = isInPath ? 'white' : '#1e293b';
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.array[i], x, y);
            
            // Draw checkmark if in path
            if (isInPath) {
                this.ctx.fillStyle = '#10b981';
                this.ctx.font = 'bold 16px Arial';
                this.ctx.fillText('✓', x, y - 45);
            }
            
            // Draw line to center if in path
            if (isInPath) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(centerX, centerY);
                this.ctx.strokeStyle = '#10b981';
                this.ctx.lineWidth = 3;
                this.ctx.setLineDash([5, 5]);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }
        }
        
        // Draw stats
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Progress: ${this.results.length} / ${this.getExpectedCount()}`, centerX, this.canvas.height - 40);
        
        // Draw legend
        this.ctx.textAlign = 'left';
        this.ctx.font = '14px Arial';
        
        this.ctx.fillStyle = '#10b981';
        this.ctx.fillText('● Included', 50, this.canvas.height - 60);
        
        this.ctx.fillStyle = '#cbd5e1';
        this.ctx.fillText('● Not included', 50, this.canvas.height - 35);
    }
}

// Initialize visualizer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Visualizer();
});

