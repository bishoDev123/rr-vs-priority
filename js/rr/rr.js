import ExecutionTrace from "../shared/models"

// input: processes (they will have an id and priority, you should ignore the priority), quantum time
function roundRobin(processes, quantum) {
    return new ExecutionTrace(1, 0, 4)
}
// output: Execution trace with id, start time, and finish time