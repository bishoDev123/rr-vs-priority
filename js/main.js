// تنبيه لو الملفات مش في مسارها الصح هيظهر إيرور في الـ Console
import { roundRobin } from './rr/rr.js';
import { priorityScheduling } from './priority/priority.js';
import metrics from './metrics/metrics.js';

// دالة رسم الـ Gantt Chart دمجناها هنا عشان تشتغل بدون مشاكل
function drawGanttChart(traces, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // تفريغ القديم

    if (!traces || traces.length === 0) return;

    const ganttBar = document.createElement("div");
    ganttBar.className = "gantt-bar";

    const timeline = document.createElement("div");
    timeline.className = "timeline";

    const scale = 30; // بيكسل لكل وحدة زمنية

    traces.forEach((trace, index) => {
        const duration = trace.finish - trace.start; // تعديل finish بدل end حسب الكود بتاعك

        // إنشاء القطعة (الـ block)
        const segment = document.createElement("div");
        segment.className = "segment";
        segment.style.width = (duration * scale) + "px";
        segment.textContent = trace.processId || trace.id; // حسب اسم المتغير في الـ model
        ganttBar.appendChild(segment);

        // إنشاء الوقت (الـ tick)
        const tick = document.createElement("div");
        tick.className = "tick";
        tick.style.width = (duration * scale) + "px";
        tick.textContent = trace.start;
        timeline.appendChild(tick);

        // آخر tick
        if (index === traces.length - 1) {
            const lastTick = document.createElement("div");
            lastTick.className = "tick";
            lastTick.textContent = trace.finish;
            timeline.appendChild(lastTick);
        }
    });

    container.appendChild(ganttBar);
    container.appendChild(timeline);
}

let processes = [];
let processCount = 1;

document.addEventListener("DOMContentLoaded", () => {
    console.log("السكريبت اشتغل والواجهة حملت بنجاح!");

    const processIdInput = document.getElementById("process-id");
    const arrivalTimeInput = document.getElementById("arrival-time");
    const burstTimeInput = document.getElementById("burst-time");
    const priorityInput = document.getElementById("priority-val");
    const timeQuantumInput = document.getElementById("time-quantum");
    
    const addBtn = document.getElementById("add-process-btn");
    const runBtn = document.getElementById("run-btn");
    const processContainer = document.getElementById("process-container");

    const rrMetricsRow = document.getElementById("rr-metrics-row");
    const prioMetricsRow = document.getElementById("prio-metrics-row");

    if (processIdInput) processIdInput.value = `P${processCount}`;

    // زرار الإضافة
    addBtn.addEventListener("click", () => {
        const pId = processIdInput.value || `P${processCount}`;
        const pArr = parseInt(arrivalTimeInput.value) || 0;
        const pBurst = parseInt(burstTimeInput.value) || 1;
        const pPrio = parseInt(priorityInput.value) || 1;

        processes.push({
            id: pId,
            arrivalTime: pArr,
            burstTime: pBurst,
            priority: pPrio
        });

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pId}</td>
            <td>${pArr}</td>
            <td>${pBurst}</td>
            <td>${pPrio}</td>
        `;
        processContainer.appendChild(row);

        processCount++;
        processIdInput.value = `P${processCount}`;
        arrivalTimeInput.value = "";
        burstTimeInput.value = "";
        priorityInput.value = "";
    });

    // زرار التشغيل
    runBtn.addEventListener("click", () => {
        if (processes.length === 0) {
            alert("ADD PROCESS!");
            return;
        }

        const tq = parseInt(timeQuantumInput.value) || 2;

        try {
            // --- Round Robin ---
            const rrTraces = roundRobin([...processes], tq);
            const rrMetricsVals = metrics(rrTraces, processes);
            
            rrMetricsRow.innerHTML = `
                <td>${rrMetricsVals[0]}</td>
                <td>${rrMetricsVals[1]}</td>
                <td>${rrMetricsVals[2]}</td>
            `;
            drawGanttChart(rrTraces, "rr-gantt");

            // --- Priority ---
            const prioTraces = priorityScheduling([...processes]);
            const prioMetricsVals = metrics(prioTraces, processes);
            
            prioMetricsRow.innerHTML = `
                <td>${prioMetricsVals[0]}</td>
                <td>${prioMetricsVals[1]}</td>
                <td>${prioMetricsVals[2]}</td>
            `;
            drawGanttChart(prioTraces, "priority-gantt");

        } catch (error) {
            console.error("حصل إيرور أثناء المحاكاة:", error);
            alert("في مشكلة في الحسابات، افتح الـ Console (F12) عشان تشوف التفاصيل.");
        }
    });
});