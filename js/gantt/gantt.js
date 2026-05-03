// import this only and ignore the other files in the document

export function visualizeSegments(traces) {
    const container = document.getElementById("chart");
    container.innerHTML = "";

    const ganttBar = document.createElement("div");
    ganttBar.className = "gantt-bar";

    const timeline = document.createElement("div");
    timeline.className = "timeline";

    const scale = 40; // pixels per time unit


    traces.forEach((trace, index) => {
        const duration = trace.end - trace.start;

        const segment = document.createElement("div");
        segment.className = "segment";
        segment.style.width = (duration * scale) + "px";
        segment.textContent = trace.id;

        ganttBar.appendChild(segment);

        const tick = document.createElement("div");
        tick.className = "tick";
        tick.style.width = (duration * scale) + "px";
        tick.textContent = trace.start;

        timeline.appendChild(tick);

        if (index === traces.length - 1) {
            const lastTick = document.createElement("div");
            lastTick.className = "tick";
            lastTick.textContent = trace.end;
            timeline.appendChild(lastTick);
        }
    });

    container.appendChild(ganttBar);
    container.appendChild(timeline);
}