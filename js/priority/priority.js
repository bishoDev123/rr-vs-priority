import ExecutionTrace from "../shared/models"

// input: processes (with id and priority)
function priority(processes) {
    return new ExecutionTrace(1, 0, 4)
}

// output: execution trace with id, start time, and finish time