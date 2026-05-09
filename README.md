CPU Scheduling Simulator
Overview

This project is a web-based CPU Scheduling Simulator that visually demonstrates and compares two scheduling algorithms:

Round Robin (RR)
Priority Scheduling (Non-preemptive)

It allows users to input processes, simulate execution, visualize Gantt charts, and compare performance using standard scheduling metrics.

Features
Add custom processes (ID, Arrival Time, Burst Time, Priority)
Adjustable Time Quantum for Round Robin
Visual Gantt chart for both algorithms
Automatic calculation of:
Average Turnaround Time
Average Waiting Time
Average Response Time
Built-in comparison system to determine the better algorithm
Pre-made test cases for quick evaluation
Algorithms Implemented
1. Round Robin Scheduling
Each process receives CPU time in fixed time slices (quantum)
Processes are cycled through a ready queue
Ensures fairness among all processes
2. Priority Scheduling (Non-preemptive)
Processes are executed based on priority value
Lower numerical value = higher priority
Once a process starts, it runs until completion
Comparison Logic

The system evaluates both algorithms using a simple scoring method:

Score = Avg Turnaround Time + Avg Waiting Time + Avg Response Time
The algorithm with the lower score is considered better for the current dataset.
Assumptions
All processes are independent and fully CPU-bound
No I/O blocking or interruptions
Priority Scheduling is non-preemptive
Lower priority number means higher priority
Context switching cost is ignored
Arrival times are valid integers ≥ 0
Burst times are positive integers
Limitations
Does not simulate real OS context switching overhead
No aging mechanism in Priority Scheduling (may cause starvation)
Round Robin assumes constant quantum for all processes
Does not support multi-core CPU scheduling
No I/O burst simulation (CPU-only model)
Limited scalability for very large process sets due to DOM-based rendering
Screenshots
Input Panel

(Insert screenshot here)

Round Robin Gantt Chart

(Insert screenshot here)

Priority Scheduling Gantt Chart

(Insert screenshot here)

Comparison Result

(Insert screenshot here)

Example Output Interpretation
If Round Robin performs better:
Workloads are likely balanced and fairness improves responsiveness
If Priority Scheduling performs better:
System favors short or high-priority tasks
If equal:
Both algorithms perform similarly under given workload distribution
Technical Notes
Implemented using Vanilla JavaScript (ES6)
No external libraries used
DOM-based dynamic rendering for Gantt charts
Metric calculations derived from execution trace logs
Modular function-based architecture for scheduling logic
