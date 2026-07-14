const STORAGE_KEY = "toload-apple-game-best";
const DEFAULT_TIME = 60;
const BOARD_ROWS = 6;
const BOARD_COLS = 6;
const BOARD_MIN = 1;
const BOARD_MAX = 9;

function randomValue() {
  return Math.floor(Math.random() * (BOARD_MAX - BOARD_MIN + 1)) + BOARD_MIN;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function rectBetween(a, b) {
  return {
    top: Math.min(a.row, b.row),
    left: Math.min(a.col, b.col),
    bottom: Math.max(a.row, b.row),
    right: Math.max(a.col, b.col),
  };
}

function rectContains(rect, row, col) {
  return row >= rect.top && row <= rect.bottom && col >= rect.left && col <= rect.right;
}

class AppleGame {
  constructor(root) {
    this.root = root;
    this.boardEl = root.querySelector("[data-board]");
    this.selectionEl = root.querySelector("[data-selection]");
    this.scoreEl = root.querySelector("[data-score]");
    this.bestEl = root.querySelector("[data-best]");
    this.timeEl = root.querySelector("[data-time]");
    this.statusEl = root.querySelector("[data-status]");
    this.messageEl = root.querySelector("[data-message]");
    this.boardOverlayEl = root.querySelector("[data-board-overlay]");
    this.startButton = root.querySelector("[data-start]");
    this.pauseButton = root.querySelector("[data-pause]");
    this.restartButton = root.querySelector("[data-restart]");

    this.rows = BOARD_ROWS;
    this.cols = BOARD_COLS;
    this.board = [];
    this.cells = [];
    this.selectedRect = null;
    this.dragging = false;
    this.pointerId = null;
    this.score = 0;
    this.best = Number(localStorage.getItem(STORAGE_KEY) || 0) || 0;
    this.timeLeft = DEFAULT_TIME;
    this.running = false;
    this.paused = false;
    this.isResolving = false;
    this.updatedCells = [];
    this.timerId = null;
    this.resolveTimeout = null;
    this.messageTimeout = null;

    this.boundPointerDown = (event) => this.handlePointerDown(event);
    this.boundPointerMove = (event) => this.handlePointerMove(event);
    this.boundPointerUp = (event) => this.handlePointerUp(event);
    this.boundResize = () => this.renderSelectionOverlay();

    this.attachEvents();
    this.initBoard();
    this.updateUi("시작 버튼을 눌러 사과게임을 시작하세요.");
  }

  attachEvents() {
    this.startButton.addEventListener("click", () => this.start());
    this.pauseButton.addEventListener("click", () => this.togglePause());
    this.restartButton.addEventListener("click", () => this.restart());

    this.boardEl.addEventListener("pointerdown", this.boundPointerDown);
    window.addEventListener("pointermove", this.boundPointerMove);
    window.addEventListener("pointerup", this.boundPointerUp);
    window.addEventListener("pointercancel", this.boundPointerUp);
    window.addEventListener("resize", this.boundResize);
  }

  initBoard() {
    this.board = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => randomValue()),
    );
    this.renderBoard();
    this.renderStats();
  }

  renderBoard() {
    this.boardEl.style.setProperty("--cols", String(this.cols));
    this.boardEl.innerHTML = "";
    this.cells = [];

    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        const value = this.board[row][col];
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "apple-cell";
        cell.dataset.row = String(row);
        cell.dataset.col = String(col);
        cell.textContent = String(value);
        cell.setAttribute("aria-label", `사과 ${value}`);
        this.boardEl.appendChild(cell);
        this.cells.push(cell);
      }
    }

    this.syncSelectionStyles();
  }

  renderStats() {
    this.scoreEl.textContent = String(this.score);
    this.bestEl.textContent = String(this.best);
    this.timeEl.textContent = String(this.timeLeft);
    this.statusEl.textContent = this.getStatusText();
    this.pauseButton.textContent = this.paused ? "재개" : "일시정지";
    this.syncGameStateStyles();
    this.renderBoardOverlay();
  }

  getStatusText() {
    if (!this.running) {
      return "대기 중";
    }

    if (this.paused) {
      return "일시정지";
    }

    if (this.timeLeft <= 0) {
      return "종료";
    }

    return "진행 중";
  }

  getStateKey() {
    if (!this.running) {
      return "idle";
    }

    if (this.timeLeft <= 0) {
      return "finished";
    }

    if (this.paused) {
      return "paused";
    }

    if (this.isResolving) {
      return "updating";
    }

    return "running";
  }

  syncGameStateStyles() {
    const state = this.getStateKey();
    this.root.dataset.state = state;
    this.boardEl.dataset.state = state;
  }

  renderBoardOverlay() {
    if (!this.boardOverlayEl) {
      return;
    }

    const state = this.getStateKey();
    const overlayState =
      state === "idle" ? "idle" : state === "finished" ? "finished" : state === "paused" ? "paused" : "running";

    this.boardOverlayEl.dataset.state = overlayState;

    if (overlayState === "idle") {
      this.boardOverlayEl.innerHTML = `
        <strong>시작 전</strong>
      `;
      return;
    }

    if (overlayState === "finished") {
      this.boardOverlayEl.innerHTML = `
        <strong>게임 종료</strong>
      `;
      return;
    }

    if (overlayState === "paused") {
      this.boardOverlayEl.innerHTML = `
        <strong>일시정지</strong>
      `;
      return;
    }

    this.boardOverlayEl.innerHTML = "";
  }

  updateUi(message) {
    if (this.messageTimeout) {
      window.clearTimeout(this.messageTimeout);
      this.messageTimeout = null;
    }

    if (message) {
      this.messageEl.textContent = message;
    }

    this.renderStats();
  }

  setMessage(message, temporary = false) {
    this.messageEl.textContent = message;

    if (temporary) {
      if (this.messageTimeout) {
        window.clearTimeout(this.messageTimeout);
      }
      this.messageTimeout = window.setTimeout(() => {
        if (this.running && !this.paused) {
          this.messageEl.textContent = "드래그해서 합이 10이 되는 직사각형을 찾아보세요.";
        }
      }, 1400);
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.paused = false;
      this.isResolving = false;
      this.clearResolveTimeout();
      this.timeLeft = DEFAULT_TIME;
      this.score = 0;
      this.initBoard();
      this.startTimer();
      this.setMessage("게임 시작! 합이 10이 되는 사과를 드래그로 골라보세요.");
      this.renderStats();
      return;
    }

    if (this.timeLeft <= 0) {
      this.restart();
      return;
    }

    this.paused = false;
    this.renderStats();
    this.setMessage("게임을 재개했습니다.");
  }

  restart() {
    this.clearTimer();
    this.clearResolveTimeout();
    this.running = true;
    this.paused = false;
    this.isResolving = false;
    this.timeLeft = DEFAULT_TIME;
    this.score = 0;
    this.selectedRect = null;
    this.dragging = false;
    this.pointerId = null;
    this.initBoard();
    this.startTimer();
    this.setMessage("다시 시작했습니다. 10을 찾아보세요.");
    this.renderStats();
  }

  togglePause() {
    if (!this.running || this.timeLeft <= 0) {
      return;
    }

    this.paused = !this.paused;
    this.renderStats();

    if (this.paused) {
      this.setMessage("일시정지했습니다.");
    } else {
      this.setMessage("게임을 재개했습니다.");
    }
  }

  startTimer() {
    this.clearTimer();
    this.timerId = window.setInterval(() => {
      if (!this.running || this.paused || this.isResolving) {
        return;
      }

      this.timeLeft = Math.max(0, this.timeLeft - 1);
      this.renderStats();

      if (this.timeLeft === 0) {
        this.finishGame();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerId != null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  clearResolveTimeout() {
    if (this.resolveTimeout != null) {
      window.clearTimeout(this.resolveTimeout);
      this.resolveTimeout = null;
    }
  }

  finishGame() {
    this.running = false;
    this.dragging = false;
    this.pointerId = null;
    this.selectedRect = null;
    this.clearResolveTimeout();
    this.renderSelectionOverlay();
    this.renderStats();
    this.setMessage("시간 종료! 다시 시작 버튼으로 새 게임을 열 수 있습니다.");
  }

  getCellFromPoint(clientX, clientY) {
    const element = document.elementFromPoint(clientX, clientY);
    const cell = element?.closest?.(".apple-cell");

    if (!cell || !this.boardEl.contains(cell)) {
      return null;
    }

    return {
      row: Number(cell.dataset.row),
      col: Number(cell.dataset.col),
      cell,
    };
  }

  handlePointerDown(event) {
    if (!this.running || this.paused || this.timeLeft <= 0 || this.isResolving) {
      return;
    }

    const targetCell = event.target.closest?.(".apple-cell");
    if (!targetCell || !this.boardEl.contains(targetCell)) {
      return;
    }

    event.preventDefault();
    this.dragging = true;
    this.pointerId = event.pointerId;
    this.startPoint = {
      row: Number(targetCell.dataset.row),
      col: Number(targetCell.dataset.col),
    };
    this.selectedRect = rectBetween(this.startPoint, this.startPoint);
    this.syncSelectionStyles();
    this.renderSelectionOverlay();

    if (this.boardEl.setPointerCapture) {
      try {
        this.boardEl.setPointerCapture(event.pointerId);
      } catch {
        // Ignore pointer capture failures on some browsers.
      }
    }

    this.setMessage("드래그 중입니다.", true);
  }

  handlePointerMove(event) {
    if (!this.dragging || event.pointerId !== this.pointerId || this.isResolving) {
      return;
    }

    const target = this.getCellFromPoint(event.clientX, event.clientY);
    if (!target) {
      return;
    }

    const nextRect = rectBetween(this.startPoint, { row: target.row, col: target.col });
    if (
      !this.selectedRect ||
      nextRect.top !== this.selectedRect.top ||
      nextRect.left !== this.selectedRect.left ||
      nextRect.bottom !== this.selectedRect.bottom ||
      nextRect.right !== this.selectedRect.right
    ) {
      this.selectedRect = nextRect;
      this.syncSelectionStyles();
      this.renderSelectionOverlay();
    }
  }

  handlePointerUp(event) {
    if (!this.dragging || event.pointerId !== this.pointerId || this.isResolving) {
      return;
    }

    this.dragging = false;

    if (this.boardEl.releasePointerCapture) {
      try {
        this.boardEl.releasePointerCapture(event.pointerId);
      } catch {
        // Ignore pointer capture failures on some browsers.
      }
    }

    if (!this.selectedRect) {
      return;
    }

    const cells = this.getCellsInRect(this.selectedRect);
    const sum = cells.reduce((total, cell) => total + cell.value, 0);

    if (sum === 10) {
      this.applySuccessfulMatch(cells);
    } else {
      this.setMessage(`합계 ${sum}. 정확히 10이 아니어서 유지됩니다.`);
    }

    this.selectedRect = null;
    this.syncSelectionStyles();
    this.renderSelectionOverlay();
    this.renderStats();
  }

  getCellsInRect(rect) {
    const cells = [];
    for (let row = rect.top; row <= rect.bottom; row += 1) {
      for (let col = rect.left; col <= rect.right; col += 1) {
        cells.push({
          row,
          col,
          value: this.board[row][col],
          cell: this.getCellElement(row, col),
        });
      }
    }
    return cells;
  }

  getCellElement(row, col) {
    return this.boardEl.querySelector(`.apple-cell[data-row="${row}"][data-col="${col}"]`);
  }

  syncSelectionStyles() {
    const selected = this.selectedRect;

    this.cells.forEach((cell) => {
      const row = Number(cell.dataset.row);
      const col = Number(cell.dataset.col);
      const isSelected = selected ? rectContains(selected, row, col) : false;
      cell.classList.toggle("is-selected", isSelected);
    });
  }

  renderSelectionOverlay() {
    if (!this.selectedRect) {
      this.selectionEl.hidden = true;
      return;
    }

    const topLeftCell = this.getCellElement(this.selectedRect.top, this.selectedRect.left);
    const bottomRightCell = this.getCellElement(this.selectedRect.bottom, this.selectedRect.right);
    if (!topLeftCell || !bottomRightCell) {
      this.selectionEl.hidden = true;
      return;
    }

    const boardRect = this.boardEl.getBoundingClientRect();
    const firstRect = topLeftCell.getBoundingClientRect();
    const lastRect = bottomRightCell.getBoundingClientRect();
    const left = firstRect.left - boardRect.left;
    const top = firstRect.top - boardRect.top;
    const right = lastRect.right - boardRect.left;
    const bottom = lastRect.bottom - boardRect.top;

    this.selectionEl.hidden = false;
    this.selectionEl.style.left = `${left}px`;
    this.selectionEl.style.top = `${top}px`;
    this.selectionEl.style.width = `${right - left}px`;
    this.selectionEl.style.height = `${bottom - top}px`;
  }

  applySuccessfulMatch(cells) {
    this.isResolving = true;
    this.updatedCells = [];
    const previousBoard = this.board.map((row) => row.slice());
    cells.forEach(({ row, col, cell }) => {
      this.board[row][col] = null;
      if (cell) {
        cell.classList.add("is-clearing");
      }
    });

    this.resolveTimeout = window.setTimeout(() => {
      this.collapseBoard();
      this.updatedCells = this.getChangedCells(previousBoard, this.board);
      this.score += 1;
      this.best = Math.max(this.best, this.score);
      localStorage.setItem(STORAGE_KEY, String(this.best));
      this.renderBoard();
      this.flashUpdatedCells();
      this.renderStats();
      this.isResolving = false;
      this.resolveTimeout = null;
      this.setMessage("성공! 합이 10이라 사과를 제거했습니다.", true);
    }, 180);
  }

  getChangedCells(previousBoard, nextBoard) {
    const changed = [];

    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        if (previousBoard[row][col] !== nextBoard[row][col]) {
          changed.push({ row, col });
        }
      }
    }

    return changed;
  }

  flashUpdatedCells() {
    if (!this.updatedCells.length) {
      return;
    }

    this.updatedCells.forEach(({ row, col }) => {
      const cell = this.getCellElement(row, col);
      if (!cell) {
        return;
      }

      cell.classList.add("is-updated");
      window.setTimeout(() => {
        cell.classList.remove("is-updated");
      }, 520);
    });
  }

  collapseBoard() {
    for (let col = 0; col < this.cols; col += 1) {
      const stack = [];
      for (let row = this.rows - 1; row >= 0; row -= 1) {
        const value = this.board[row][col];
        if (value != null) {
          stack.push(value);
        }
      }

      for (let row = this.rows - 1; row >= 0; row -= 1) {
        this.board[row][col] = stack.shift() ?? randomValue();
      }
    }
  }
}

window.AppleGame = AppleGame;
