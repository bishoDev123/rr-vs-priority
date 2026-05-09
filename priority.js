import ExecutionTrace from "../shared/models.js";

export function priorityScheduling(processes) {
  const queue = processes.map((p) => ({
    id: p.id,
    arrivalTime: p.arrivalTime,
    burstTime: p.burstTime,
    remainingTime: p.burstTime,
    priority: p.priority,
    completed: false,
  }));

  const executionTrace = [];
  let currentTime = 0;
  let completedProcesses = 0;

  while (completedProcesses < queue.length) {
    const readyQueue = queue.filter(
      (p) => p.arrivalTime <= currentTime && !p.completed,
    );

    if (readyQueue.length === 0) {
      currentTime++;
      continue;
    }

    readyQueue.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.arrivalTime - b.arrivalTime;
      }
      return a.priority - b.priority;
    });

    const current = readyQueue[0];

    const start = currentTime;

    currentTime += current.burstTime;

    current.remainingTime = 0;
    current.completed = true;

    completedProcesses++;

    executionTrace.push(new ExecutionTrace(current.id, start, currentTime));
  }

  return executionTrace;
}
