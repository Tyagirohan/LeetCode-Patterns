// Backtracking Visualizer - N-Queens & Sudoku
class Visualizer {
    constructor() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentProblem = 'nqueens';
        this.boardSize = 8;
        this.board = [];
        this.solutions = [];
        this.currentSolution = 0;
        this.attempts = 0;
        this.backtracks = 0;
        this.isRunning = false;
        this.animationSpeed = 500;
        this.sudokuBoard = [];
        this.sudokuOriginal = [];
        
        this.setupCanvas();
        this.attachEventListeners();
        this.initializeBoard();
    }

    setupCanvas() {
        if (this.currentProblem === 'nqueens') {
            this.canvas.width = 600;
            this.canvas.height = 600;
        } else {
            this.canvas.width = 540;
            this.canvas.height = 540;
        }
    }

    attachEventListeners() {
        // Problem tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProblem(e.currentTarget.dataset.problem);
            });
        });

        // Control buttons
        document.getElementById('solveBtn').addEventListener('click', () => this.solve());
        document.getElementById('stepBtn').addEventListener('click', () => this.step());
        document.getElementById('nextSolutionBtn').addEventListener('click', () => this.nextSolution());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());

        // Speed control
        document.getElementById('speedSlider').addEventListener('input', (e) => {
            const speeds = ['Slow', 'Normal', 'Fast', 'Instant'];
            const speedValues = [1000, 500, 200, 50];
            const value = parseInt(e.target.value) - 1;
            this.animationSpeed = speedValues[value];
            document.getElementById('speedLabel').textContent = speeds[value];
        });

        // Board size control
        document.getElementById('boardSize').addEventListener('input', (e) => {
            this.boardSize = parseInt(e.target.value);
            document.getElementById('boardSizeLabel').textContent = `${this.boardSize}x${this.boardSize}`;
            this.initializeBoard();
        });

        // Sudoku presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.loadSudokuPreset(e.currentTarget.dataset.difficulty);
            });
        });
    }

    switchProblem(problem) {
        this.currentProblem = problem;
        this.reset();

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-problem="${problem}"]`).classList.add('active');

        // Show/hide controls
        if (problem === 'nqueens') {
            document.getElementById('boardSizeControl').classList.remove('hidden');
            document.getElementById('sudokuPresets').classList.add('hidden');
            document.getElementById('problemTitle').textContent = 'N-Queens Problem';
        } else {
            document.getElementById('boardSizeControl').classList.add('hidden');
            document.getElementById('sudokuPresets').classList.remove('hidden');
            document.getElementById('problemTitle').textContent = 'Sudoku Solver';
        }

        this.setupCanvas();
        this.initializeBoard();
    }

    initializeBoard() {
        if (this.currentProblem === 'nqueens') {
            this.board = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0));
        } else {
            // Load easy Sudoku by default
            this.loadSudokuPreset('easy');
        }
        this.draw();
        this.updateStepText('Click "Solve" to start the backtracking algorithm');
    }

    loadSudokuPreset(difficulty) {
        const presets = {
            easy: [
                [5,3,0,0,7,0,0,0,0],
                [6,0,0,1,9,5,0,0,0],
                [0,9,8,0,0,0,0,6,0],
                [8,0,0,0,6,0,0,0,3],
                [4,0,0,8,0,3,0,0,1],
                [7,0,0,0,2,0,0,0,6],
                [0,6,0,0,0,0,2,8,0],
                [0,0,0,4,1,9,0,0,5],
                [0,0,0,0,8,0,0,7,9]
            ],
            medium: [
                [0,0,0,6,0,0,4,0,0],
                [7,0,0,0,0,3,6,0,0],
                [0,0,0,0,9,1,0,8,0],
                [0,0,0,0,0,0,0,0,0],
                [0,5,0,1,8,0,0,0,3],
                [0,0,0,3,0,6,0,4,5],
                [0,4,0,2,0,0,0,6,0],
                [9,0,3,0,0,0,0,0,0],
                [0,2,0,0,0,0,1,0,0]
            ],
            hard: [
                [0,0,0,0,0,0,0,1,2],
                [0,0,0,0,3,5,0,0,0],
                [0,0,0,6,0,0,0,7,0],
                [7,0,0,0,0,0,3,0,0],
                [0,0,0,4,0,0,8,0,0],
                [1,0,0,0,0,0,0,0,0],
                [0,0,0,1,2,0,0,0,0],
                [0,8,0,0,0,0,0,4,0],
                [0,5,0,0,0,0,6,0,0]
            ],
            expert: [
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,3,0,8,5],
                [0,0,1,0,2,0,0,0,0],
                [0,0,0,5,0,7,0,0,0],
                [0,0,4,0,0,0,1,0,0],
                [0,9,0,0,0,0,0,0,0],
                [5,0,0,0,0,0,0,7,3],
                [0,0,2,0,1,0,0,0,0],
                [0,0,0,0,4,0,0,0,9]
            ]
        };

        this.sudokuBoard = presets[difficulty].map(row => [...row]);
        this.sudokuOriginal = presets[difficulty].map(row => [...row]);
        this.board = this.sudokuBoard;
        this.draw();
        this.updateStepText(`Loaded ${difficulty} Sudoku puzzle. Click "Solve" to see the backtracking algorithm!`);
    }

    async solve() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.attempts = 0;
        this.backtracks = 0;
        this.solutions = [];
        this.currentSolution = 0;

        document.getElementById('solveBtn').disabled = true;
        document.getElementById('status').textContent = 'Solving...';

        if (this.currentProblem === 'nqueens') {
            await this.solveNQueens();
        } else {
            await this.solveSudoku();
        }

        this.isRunning = false;
        document.getElementById('solveBtn').disabled = false;
    }

    async solveNQueens() {
        this.board = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0));
        
        const isSafe = (row, col) => {
            // Check column
            for (let i = 0; i < row; i++) {
                if (this.board[i][col] === 1) return false;
            }

            // Check upper left diagonal
            for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
                if (this.board[i][j] === 1) return false;
            }

            // Check upper right diagonal
            for (let i = row - 1, j = col + 1; i >= 0 && j < this.boardSize; i--, j++) {
                if (this.board[i][j] === 1) return false;
            }

            return true;
        };

        const backtrack = async (row) => {
            if (row === this.boardSize) {
                // Found a solution!
                this.solutions.push(this.board.map(r => [...r]));
                document.getElementById('solutions').textContent = this.solutions.length;
                this.updateStepText(`✅ Solution ${this.solutions.length} found! Click "Next Solution" to see more.`);
                document.getElementById('status').textContent = `${this.solutions.length} solution(s)`;
                document.getElementById('nextSolutionBtn').classList.remove('hidden');
                this.draw();
                await this.sleep();
                return true; // Found one solution, return to find more
            }

            for (let col = 0; col < this.boardSize; col++) {
                this.attempts++;
                document.getElementById('attempts').textContent = this.attempts;

                if (isSafe(row, col)) {
                    // Place queen
                    this.board[row][col] = 1;
                    this.updateStepText(`Try placing queen at row ${row}, col ${col}`);
                    this.draw();
                    await this.sleep();

                    // Recurse
                    await backtrack(row + 1);

                    // Backtrack
                    if (this.solutions.length < 10) { // Limit to first 10 solutions for performance
                        this.board[row][col] = 0;
                        this.backtracks++;
                        document.getElementById('backtracks').textContent = this.backtracks;
                        this.updateStepText(`❌ Backtrack from row ${row}, col ${col}`);
                        this.draw();
                        await this.sleep();
                    } else {
                        return;
                    }
                }
            }

            return false;
        };

        this.updateStepText('Starting N-Queens backtracking algorithm...');
        await this.sleep();
        await backtrack(0);

        if (this.solutions.length === 0) {
            this.updateStepText('No solution found!');
            document.getElementById('status').textContent = 'No solution';
        } else {
            this.board = this.solutions[0];
            this.draw();
            this.updateStepText(`✅ Complete! Found ${this.solutions.length} solution(s). Total attempts: ${this.attempts}, Backtracks: ${this.backtracks}`);
        }
    }

    async solveSudoku() {
        this.board = this.sudokuBoard.map(row => [...row]);
        
        const isValid = (row, col, num) => {
            // Check row
            for (let j = 0; j < 9; j++) {
                if (this.board[row][j] === num) return false;
            }

            // Check column
            for (let i = 0; i < 9; i++) {
                if (this.board[i][col] === num) return false;
            }

            // Check 3x3 box
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.board[boxRow + i][boxCol + j] === num) {
                        return false;
                    }
                }
            }

            return true;
        };

        const solve = async () => {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (this.board[row][col] === 0) {
                        for (let num = 1; num <= 9; num++) {
                            this.attempts++;
                            document.getElementById('attempts').textContent = this.attempts;

                            if (isValid(row, col, num)) {
                                this.board[row][col] = num;
                                this.updateStepText(`Try ${num} at [${row},${col}]`);
                                this.draw();
                                await this.sleep();

                                if (await solve()) {
                                    return true;
                                }

                                // Backtrack
                                this.board[row][col] = 0;
                                this.backtracks++;
                                document.getElementById('backtracks').textContent = this.backtracks;
                                this.updateStepText(`❌ Backtrack from [${row},${col}]`);
                                this.draw();
                                await this.sleep();
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        };

        this.updateStepText('Starting Sudoku backtracking algorithm...');
        await this.sleep();
        
        const solved = await solve();

        if (solved) {
            this.updateStepText(`✅ Sudoku solved! Total attempts: ${this.attempts}, Backtracks: ${this.backtracks}`);
            document.getElementById('status').textContent = 'Solved!';
            document.getElementById('solutions').textContent = '1';
        } else {
            this.updateStepText('No solution found!');
            document.getElementById('status').textContent = 'No solution';
        }
    }

    step() {
        // Simplified step mode - just solve completely for now
        this.solve();
    }

    nextSolution() {
        if (this.solutions.length === 0) return;

        this.currentSolution = (this.currentSolution + 1) % this.solutions.length;
        this.board = this.solutions[this.currentSolution];
        this.draw();
        this.updateStepText(`Showing solution ${this.currentSolution + 1} of ${this.solutions.length}`);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.currentProblem === 'nqueens') {
            this.drawNQueens();
        } else {
            this.drawSudoku();
        }
    }

    drawNQueens() {
        const cellSize = this.canvas.width / this.boardSize;

        // Draw board
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const x = col * cellSize;
                const y = row * cellSize;

                // Checkerboard pattern
                this.ctx.fillStyle = (row + col) % 2 === 0 ? '#f0f0f0' : '#d0d0d0';
                this.ctx.fillRect(x, y, cellSize, cellSize);

                // Draw queen if present
                if (this.board[row][col] === 1) {
                    this.ctx.fillStyle = '#ec4899';
                    this.ctx.font = `bold ${cellSize * 0.6}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText('♛', x + cellSize / 2, y + cellSize / 2);
                }

                // Draw grid lines
                this.ctx.strokeStyle = '#666';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x, y, cellSize, cellSize);
            }
        }
    }

    drawSudoku() {
        const cellSize = 60;

        // Draw board
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const x = col * cellSize;
                const y = row * cellSize;

                // Background color for 3x3 boxes
                const boxRow = Math.floor(row / 3);
                const boxCol = Math.floor(col / 3);
                this.ctx.fillStyle = (boxRow + boxCol) % 2 === 0 ? '#ffffff' : '#f0f0f0';
                this.ctx.fillRect(x, y, cellSize, cellSize);

                // Draw number if present
                const num = this.board[row][col];
                if (num !== 0) {
                    const isOriginal = this.sudokuOriginal[row][col] !== 0;
                    this.ctx.fillStyle = isOriginal ? '#1e293b' : '#6366f1';
                    this.ctx.font = `bold ${isOriginal ? '24px' : '22px'} Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(num, x + cellSize / 2, y + cellSize / 2);
                }

                // Draw thin grid lines
                this.ctx.strokeStyle = '#cbd5e1';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x, y, cellSize, cellSize);
            }
        }

        // Draw thick grid lines for 3x3 boxes
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 3;
        for (let i = 0; i <= 9; i += 3) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * cellSize, 0);
            this.ctx.lineTo(i * cellSize, 9 * cellSize);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, i * cellSize);
            this.ctx.lineTo(9 * cellSize, i * cellSize);
            this.ctx.stroke();
        }
    }

    updateStepText(text) {
        document.getElementById('stepText').textContent = text;
    }

    reset() {
        this.attempts = 0;
        this.backtracks = 0;
        this.solutions = [];
        this.currentSolution = 0;
        this.isRunning = false;

        document.getElementById('attempts').textContent = '0';
        document.getElementById('backtracks').textContent = '0';
        document.getElementById('solutions').textContent = '0';
        document.getElementById('status').textContent = 'Ready';
        document.getElementById('nextSolutionBtn').classList.add('hidden');
        
        document.getElementById('solveBtn').disabled = false;

        this.initializeBoard();
    }

    sleep() {
        return new Promise(resolve => setTimeout(resolve, this.animationSpeed));
    }
}

// Initialize visualizer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Visualizer();
});

