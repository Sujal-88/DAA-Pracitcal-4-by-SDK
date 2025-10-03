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


        while (currentSum > constraint) {
            currentSum -= resources[start];
            start++;
        }


        if (currentSum > maxSum) {
            maxSum = currentSum;
            bestSubarray = resources.slice(start, end + 1);
        }
    }
    return { maxSum, subarray: bestSubarray };
}

console.log(findMaxSubarray([2, 1, 3, 4], 5))