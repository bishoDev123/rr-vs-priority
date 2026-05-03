import traces from './data.js';
import { visualizeSegments } from './gantt.js';

// Test that the visualizeSegments() function works
// ignore unless you need to test it later
document.addEventListener("DOMContentLoaded", () => {
    visualizeSegments(traces);
});