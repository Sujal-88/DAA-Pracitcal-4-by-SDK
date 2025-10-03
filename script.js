document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const resourcesInput = document.getElementById('resources-input');
    const constraintInput = document.getElementById('constraint-input');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultOutput = document.getElementById('result-output');
    const testCaseButtonsContainer = document.getElementById('test-case-buttons');

    // --- Test Cases Definition ---
    const testCases = [
        { name: "Basic", resources: [2, 1, 3, 4], constraint: 5, note: "Simple case" },
        { name: "Exact Match", resources: [2, 2, 2, 2], constraint: 4, note: "Exact utilization" },
        { name: "Single Element", resources: [1, 5, 2, 3], constraint: 5, note: "One-element solution" },
        { name: "No Solution", resources: [6, 7, 8], constraint: 5, note: "No feasible subarray" },
        { name: "Multiple Optimal", resources: [1, 2, 3, 2, 1], constraint: 5, note: "Multiple valid subarrays" },
        { name: "Large Window", resources: [1, 1, 1, 1, 1], constraint: 4, note: "Long window works" },
        { name: "Shrink Needed", resources: [4, 2, 3, 1], constraint: 5, note: "Dynamic window adjustment" },
        { name: "Empty Array", resources: [], constraint: 10, note: "Edge case: empty input" },
        { name: "Zero Constraint", resources: [1, 2, 3], constraint: 0, note: "Edge case: zero constraint" },
    ];

    // --- Core Algorithm (Sliding Window) ---
    function findMaxSubarray(resources, constraint) {
        if (!resources || resources.length === 0 || constraint <= 0) {
            return { maxSum: -1, subarray: [] };
        }

        let maxSum = -1;
        let currentSum = 0;
        let start = 0;
        let bestSubarray = [];

        for (let end = 0; end < resources.length; end++) {
            currentSum += resources[end];

            // Shrink the window from the left if the sum exceeds the constraint
            while (currentSum > constraint) {
                currentSum -= resources[start];
                start++;
            }

            // After shrinking, check if the current window's sum is a new maximum
            if (currentSum > maxSum) {
                maxSum = currentSum;
                bestSubarray = resources.slice(start, end + 1);
            }
        }
        return { maxSum, subarray: bestSubarray };
    }
    
    // --- UI Logic ---
    function displayResult(result) {
        if (result.maxSum === -1 || result.subarray.length === 0) {
            resultOutput.innerHTML = `<p class="error">No feasible subarray found.</p>`;
        } else {
            resultOutput.innerHTML = `
                <p><span class="label">Max Sum:</span> <span class="value">${result.maxSum}</span></p>
                <p><span class="label">Best Subarray:</span> <span class="value">[${result.subarray.join(', ')}]</span></p>
            `;
        }
    }

    function handleCalculation() {
        const resourcesStr = resourcesInput.value.trim();
        const constraintVal = parseInt(constraintInput.value, 10);

        if (!resourcesStr || isNaN(constraintVal)) {
            resultOutput.innerHTML = `<p class="error">Please enter a valid array and constraint.</p>`;
            return;
        }

        const resources = resourcesStr.split(',')
            .map(item => parseInt(item.trim(), 10))
            .filter(item => !isNaN(item));
        
        const result = findMaxSubarray(resources, constraintVal);
        displayResult(result);
    }
    
    // --- Event Listeners ---
    calculateBtn.addEventListener('click', handleCalculation);

    // --- Test Case Buttons Generation ---
    testCases.forEach((tc, index) => {
        const button = document.createElement('button');
        button.textContent = `Test ${index + 1}: ${tc.name}`;
        button.title = tc.note;
        button.addEventListener('click', () => {
            resourcesInput.value = tc.resources.join(', ');
            constraintInput.value = tc.constraint;
            handleCalculation(); // Automatically run calculation
        });
        testCaseButtonsContainer.appendChild(button);
    });
});