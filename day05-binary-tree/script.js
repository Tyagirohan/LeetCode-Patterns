// Binary Tree Visualizer
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

class Visualizer {
    constructor() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.root = null;
        this.currentProblem = 'traversals';
        this.traversalType = 'inorder';
        this.animationSpeed = 500;
        this.isRunning = false;
        this.result = [];
        this.visitedNodes = new Set();
        this.currentNode = null;
        this.paths = [];
        this.targetSum = 22;
        
        this.setupCanvas();
        this.attachEventListeners();
        this.generateTree();
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
        document.getElementById('generateBtn').addEventListener('click', () => this.generateTree());
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // Traversal type
        document.getElementById('traversalType').addEventListener('change', (e) => {
            this.traversalType = e.target.value;
            this.reset();
        });

        // Path sum
        document.getElementById('targetSum').addEventListener('input', (e) => {
            this.targetSum = parseInt(e.target.value);
        });
        document.getElementById('findPathBtn').addEventListener('click', () => this.start());

        // Tree builder
        document.getElementById('clearTreeBtn').addEventListener('click', () => {
            this.root = new TreeNode(10);
            this.calculatePositions();
            this.draw();
        });

        // Canvas click for tree builder
        this.canvas.addEventListener('click', (e) => {
            if (this.currentProblem === 'builder') {
                this.handleCanvasClick(e);
            }
        });

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

        // Show/hide controls
        document.getElementById('traversalControls').classList.toggle('hidden', problem !== 'traversals');
        document.getElementById('pathSumControls').classList.toggle('hidden', problem !== 'pathsum');
        document.getElementById('builderControls').classList.toggle('hidden', problem !== 'builder');

        // Update title
        const titles = {
            'traversals': 'Binary Tree Traversals',
            'pathsum': 'Path Sum Problems',
            'builder': 'Build Your Tree'
        };
        document.getElementById('problemTitle').textContent = titles[problem];

        if (problem === 'builder' && !this.root) {
            this.root = new TreeNode(10);
        } else if (problem !== 'builder') {
            this.generateTree();
        }

        this.calculatePositions();
        this.draw();
    }

    generateTree() {
        // Create a balanced binary tree
        const values = [10, 5, 15, 3, 7, 12, 20, 1, 4, 6, 8, 11, 13, 18, 25];
        this.root = this.buildTree(values, 0);
        this.calculatePositions();
        this.reset();
        this.draw();
        this.updateStepText('Tree generated. Click "Start" to begin traversal!');
    }

    buildTree(values, index) {
        if (index >= values.length) return null;
        
        const node = new TreeNode(values[index]);
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        
        node.left = this.buildTree(values, leftIndex);
        node.right = this.buildTree(values, rightIndex);
        
        return node;
    }

    calculatePositions() {
        if (!this.root) return;
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        const nodeRadius = 25;
        const levelHeight = 80;
        
        const calculatePos = (node, x, y, level, minX, maxX) => {
            if (!node) return;
            
            node.x = x;
            node.y = y;
            
            const midX = (minX + maxX) / 2;
            const nextY = y + levelHeight;
            
            if (node.left) {
                const leftX = (minX + midX) / 2;
                calculatePos(node.left, leftX, nextY, level + 1, minX, midX);
            }
            
            if (node.right) {
                const rightX = (midX + maxX) / 2;
                calculatePos(node.right, rightX, nextY, level + 1, midX, maxX);
            }
        };
        
        calculatePos(this.root, width / 2, 50, 0, 60, width - 60);
    }

    async start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.result = [];
        this.visitedNodes.clear();
        this.paths = [];
        document.getElementById('startBtn').disabled = true;

        if (this.currentProblem === 'traversals') {
            await this.runTraversal();
        } else if (this.currentProblem === 'pathsum') {
            await this.findPathSum();
        }

        this.isRunning = false;
        document.getElementById('startBtn').disabled = false;
    }

    async runTraversal() {
        this.updateStepText(`Starting ${this.traversalType} traversal...`);
        await this.sleep();

        switch(this.traversalType) {
            case 'inorder':
                await this.inorderTraversal(this.root);
                break;
            case 'preorder':
                await this.preorderTraversal(this.root);
                break;
            case 'postorder':
                await this.postorderTraversal(this.root);
                break;
            case 'levelorder':
                await this.levelOrderTraversal();
                break;
            case 'zigzag':
                await this.zigzagTraversal();
                break;
        }

        this.updateStepText(`✅ ${this.traversalType} traversal complete!`);
        document.getElementById('resultArray').textContent = `[${this.result.join(', ')}]`;
    }

    async inorderTraversal(node) {
        if (!node) return;
        
        // Visit left
        await this.inorderTraversal(node.left);
        
        // Visit root
        this.currentNode = node;
        this.result.push(node.val);
        this.visitedNodes.add(node);
        this.updateStepText(`Visiting node: ${node.val} (Inorder: Left → Root → Right)`);
        document.getElementById('resultArray').textContent = `[${this.result.join(', ')}]`;
        this.draw();
        await this.sleep();
        
        // Visit right
        await this.inorderTraversal(node.right);
    }

    async preorderTraversal(node) {
        if (!node) return;
        
        // Visit root
        this.currentNode = node;
        this.result.push(node.val);
        this.visitedNodes.add(node);
        this.updateStepText(`Visiting node: ${node.val} (Preorder: Root → Left → Right)`);
        document.getElementById('resultArray').textContent = `[${this.result.join(', ')}]`;
        this.draw();
        await this.sleep();
        
        // Visit left
        await this.preorderTraversal(node.left);
        
        // Visit right
        await this.preorderTraversal(node.right);
    }

    async postorderTraversal(node) {
        if (!node) return;
        
        // Visit left
        await this.postorderTraversal(node.left);
        
        // Visit right
        await this.postorderTraversal(node.right);
        
        // Visit root
        this.currentNode = node;
        this.result.push(node.val);
        this.visitedNodes.add(node);
        this.updateStepText(`Visiting node: ${node.val} (Postorder: Left → Right → Root)`);
        document.getElementById('resultArray').textContent = `[${this.result.join(', ')}]`;
        this.draw();
        await this.sleep();
    }

    async levelOrderTraversal() {
        if (!this.root) return;
        
        const queue = [this.root];
        let level = 0;
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                this.currentNode = node;
                this.result.push(node.val);
                currentLevel.push(node.val);
                this.visitedNodes.add(node);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
                
                this.updateStepText(`Level ${level}: Visiting node ${node.val}`);
                document.getElementById('resultArray').textContent = `[${this.result.join(', ')}]`;
                this.draw();
                await this.sleep();
            }
            
            level++;
        }
    }

    async zigzagTraversal() {
        if (!this.root) return;
        
        const queue = [this.root];
        let level = 0;
        let leftToRight = true;
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                this.currentNode = node;
                currentLevel.push(node.val);
                this.visitedNodes.add(node);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
                
                this.draw();
                await this.sleep();
            }
            
            if (!leftToRight) currentLevel.reverse();
            this.result.push(...currentLevel);
            
            this.updateStepText(`Level ${level} (${leftToRight ? 'L→R' : 'R→L'}): [${currentLevel.join(', ')}]`);
            document.getElementById('resultArray').textContent = `[${this.result.join(', ')}]`;
            
            leftToRight = !leftToRight;
            level++;
        }
    }

    async findPathSum() {
        this.updateStepText(`Finding all paths with sum = ${this.targetSum}...`);
        await this.sleep();

        const findPaths = async (node, currentPath, currentSum) => {
            if (!node) return;
            
            currentPath.push(node.val);
            currentSum += node.val;
            
            this.currentNode = node;
            this.updateStepText(`Exploring node ${node.val}. Current sum: ${currentSum}`);
            this.draw();
            await this.sleep();
            
            // Leaf node
            if (!node.left && !node.right) {
                if (currentSum === this.targetSum) {
                    this.paths.push([...currentPath]);
                    this.updateStepText(`✅ Found path: [${currentPath.join(' → ')}] = ${this.targetSum}`);
                    this.draw();
                    await this.sleep();
                }
            }
            
            await findPaths(node.left, currentPath, currentSum);
            await findPaths(node.right, currentPath, currentSum);
            
            currentPath.pop();
        };

        await findPaths(this.root, [], 0);

        if (this.paths.length > 0) {
            this.updateStepText(`✅ Found ${this.paths.length} path(s) with sum ${this.targetSum}!`);
            const pathStrings = this.paths.map(p => `[${p.join(' → ')}]`);
            document.getElementById('resultArray').textContent = pathStrings.join('\n');
        } else {
            this.updateStepText(`No paths found with sum ${this.targetSum}`);
            document.getElementById('resultArray').textContent = 'No paths found';
        }
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const clickedNode = this.findNodeAtPosition(this.root, x, y);
        
        if (clickedNode) {
            const value = prompt('Enter value for new node:');
            if (value !== null && value !== '') {
                const numValue = parseInt(value);
                if (!isNaN(numValue)) {
                    const choice = confirm('Add as LEFT child? (Cancel for RIGHT)');
                    if (choice) {
                        if (!clickedNode.left) {
                            clickedNode.left = new TreeNode(numValue);
                        } else {
                            alert('Left child already exists!');
                        }
                    } else {
                        if (!clickedNode.right) {
                            clickedNode.right = new TreeNode(numValue);
                        } else {
                            alert('Right child already exists!');
                        }
                    }
                    this.calculatePositions();
                    this.draw();
                }
            }
        }
    }

    findNodeAtPosition(node, x, y) {
        if (!node) return null;
        
        const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
        if (distance < 25) return node;
        
        return this.findNodeAtPosition(node.left, x, y) || this.findNodeAtPosition(node.right, x, y);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.root) {
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('No tree. Click "Random Tree" or build your own!', this.canvas.width / 2, this.canvas.height / 2);
            return;
        }

        this.drawTree(this.root);
    }

    drawTree(node) {
        if (!node) return;
        
        const nodeRadius = 25;
        
        // Draw edges first
        if (node.left) {
            this.ctx.beginPath();
            this.ctx.moveTo(node.x, node.y);
            this.ctx.lineTo(node.left.x, node.left.y);
            this.ctx.strokeStyle = '#cbd5e1';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawTree(node.left);
        }
        
        if (node.right) {
            this.ctx.beginPath();
            this.ctx.moveTo(node.x, node.y);
            this.ctx.lineTo(node.right.x, node.right.y);
            this.ctx.strokeStyle = '#cbd5e1';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawTree(node.right);
        }
        
        // Draw node
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        
        // Color based on state
        if (node === this.currentNode) {
            this.ctx.fillStyle = '#f59e0b'; // Currently visiting
        } else if (this.visitedNodes.has(node)) {
            this.ctx.fillStyle = '#10b981'; // Visited
        } else {
            this.ctx.fillStyle = '#6366f1'; // Not visited
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
        this.ctx.fillText(node.val, node.x, node.y);
    }

    updateStepText(text) {
        document.getElementById('stepText').textContent = text;
    }

    reset() {
        this.result = [];
        this.visitedNodes.clear();
        this.currentNode = null;
        this.paths = [];
        this.isRunning = false;

        document.getElementById('resultArray').textContent = '[]';
        document.getElementById('stepText').textContent = 'Click "Start" to begin';
        document.getElementById('startBtn').disabled = false;

        this.draw();
    }

    sleep() {
        return new Promise(resolve => setTimeout(resolve, this.animationSpeed));
    }
}

// Initialize visualizer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Visualizer();
});

