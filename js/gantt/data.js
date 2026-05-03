import ExecutionTrace from '../shared/models.js';

// ===== TEST DATA (similar to your image) =====
const traces = [
    new ExecutionTrace("P1", 0, 4),
    new ExecutionTrace("P2", 4, 7),
    new ExecutionTrace("P3", 7, 10),
    new ExecutionTrace("P1", 10, 14),
    new ExecutionTrace("P1", 14, 18),
    new ExecutionTrace("P1", 18, 22),
    new ExecutionTrace("P1", 22, 26),
    new ExecutionTrace("P1", 26, 40)
];

export default traces;