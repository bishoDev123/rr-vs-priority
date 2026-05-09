import ExecutionTrace from "../shared/models.js";

export function priorityScheduling(processes) {

  const queue = processes.map((p) => ({
    id: p.id,
    arrivalTime: p.arrivalTime,
    burstTime: p.burstTime,
    priority: p.priority,
    remainingTime: p.burstTime,
  }));

  const executionTrace = [];
  let currentTime = 0;
  let readyQueue = [];
  let arrived = new Set();

  queue.sort((a, b) => a.arrivalTime - b.arrivalTime);

  for (const p of queue) {
    if (p.arrivalTime <= currentTime) {
      readyQueue.push(p);
      arrived.add(p.id);
    }
  }

  while (readyQueue.length > 0 || queue.some((p) => !arrived.has(p.id))) {

    if (readyQueue.length === 0) {
      const next = queue.find((p) => !arrived.has(p.id));

      currentTime = next.arrivalTime;

      for (const p of queue) {
        if (!arrived.has(p.id) && p.arrivalTime <= currentTime) {
          readyQueue.push(p);
          arrived.add(p.id);
        }
      }
    }

    // Sort by priority
    // Lower number = higher priority
    readyQueue.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.arrivalTime - b.arrivalTime;
      }
      return a.priority - b.priority;
    });

    const current = readyQueue.shift();

    const start = currentTime;

    current.remainingTime = 0;
    currentTime += current.burstTime;

    executionTrace.push(
      new ExecutionTrace(current.id, start, currentTime)
    );

    for (const p of queue) {
      if (!arrived.has(p.id) && p.arrivalTime <= currentTime) {
        readyQueue.push(p);
        arrived.add(p.id);
      }
    }
  }

  return executionTrace;
}