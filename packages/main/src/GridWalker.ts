/**
 * The GridWalker object represents the elements of a two-dimensional grid system and a position within them.
 *
 * @class
 * @private
 */
class GridWalker {
	grid: unknown[][];
	rowPos: number;
	colPos: number;
	pageSize: number;

	constructor(grid: unknown[][] = [[]], pageSize = 2, rowPos = 1, colPos = 0) {
		this.grid = grid;
		this.pageSize = pageSize;
		this.rowPos = rowPos;
		this.colPos = colPos;
	}

	setGrid(grid: unknown[][], initColPos = false) {
		this.grid = grid;
		this._updateRowPos();
		if (initColPos) {
			this.colPos = 0;
		} else {
			this._updateColPos();
		}
	}

	left() {
		this.colPos = Math.max(this.colPos - 1, 0);
	}

	right() {
		this.colPos = Math.min(this.colPos + 1, this.grid[this.rowPos].length - 1);
	}

	up() {
		this.rowPos = Math.max(this.rowPos - 1, 0);
		this._updateColPos();
	}

	down() {
		this.rowPos = Math.min(this.rowPos + 1, this.grid.length - 1);
		this._updateColPos();
	}

	pageup() {
		this.rowPos = Math.max(0, this.rowPos - this.pageSize);
	}

	pagedown() {
		this.rowPos = Math.min(this.grid.length - 1, this.rowPos + this.pageSize);
	}

	home() {
		if (this.colPos === 0) {
			this.rowPos = 0;
		} else {
			this.colPos = (this.colPos > 1) ? 1 : 0;
		}
	}

	end() {
		if (this.colPos === 0) {
			this.rowPos = this.grid.length - 1;
		} else {
			const lastColPos = this.grid[this.rowPos].length - 1;
			this.colPos = (this.colPos < lastColPos) ? lastColPos : 0;
		}
	}

	getCurrent() {
		return this.grid[this.rowPos][this.colPos];
	}

	setCurrent(current: unknown) {
		this.grid.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				if (cell === current) {
					this.rowPos = rowIndex;
					this.colPos = colIndex;
				}
			});
		});
	}

	getColPos() {
		return this.colPos;
	}

	setColPos(colPos: number) {
		this.colPos = colPos;
		this._updateColPos();
	}

	getRowPos() {
		return this.rowPos;
	}

	setRowPos(rowPos: number) {
		this.rowPos = rowPos;
		this._updateRowPos();
	}

	_updateColPos() {
		this.colPos = Math.min(this.colPos, this.grid[this.rowPos].length - 1);
	}

	_updateRowPos() {
		this.rowPos = Math.min(this.rowPos, this.grid.length - 1);
	}
}

export default GridWalker;
