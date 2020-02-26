/**
 * 归并排序核心算法-数字
 * @param lefts     二维数组：第一个元素是原数据数组，第二个元素是下标数组
 * @param rights    二维数组：第一个元素是原数据数组，第二个元素是下标数组
 * @param flag      true: 从小到大, false: 从大到小
 * @returns {*[][]} 二维数组：第一个元素是原数据数组，第二个元素是下标数组
 */
function mergeNumber(lefts, rights, flag) {
    let result = [], resultIndex = [],
        left = lefts[0], right = rights[0],
        leftIndex = lefts[1], rightIndex = rights[1];
    while (left.length > 0 && right.length > 0) {
        if (flag) {
            if (Number.isNaN(Number(left[0])) || Number.isNaN(Number(right[0]))) {
                if (left[0] <= right[0]) {
                    result.push(left.shift());
                    resultIndex.push(leftIndex.shift());
                } else {
                    result.push(right.shift());
                    resultIndex.push(rightIndex.shift());
                }
            } else {
                if (Number(left[0]) <= Number(right[0])) {
                    result.push(left.shift());
                    resultIndex.push(leftIndex.shift())
                } else {
                    result.push(right.shift());
                    resultIndex.push(rightIndex.shift())
                }
            }
        } else {
            if (Number.isNaN(Number(left[0])) || Number.isNaN(Number(right[0]))) {
                if (left[0] >= right[0]) {
                    result.push(left.shift());
                    resultIndex.push(leftIndex.shift());
                } else {
                    result.push(right.shift());
                    resultIndex.push(rightIndex.shift());
                }
            } else {
                if (Number(left[0]) >= Number(right[0])) {
                    result.push(left.shift());
                    resultIndex.push(leftIndex.shift())
                } else {
                    result.push(right.shift());
                    resultIndex.push(rightIndex.shift())
                }
            }
        }
    }
    /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
    return [result.concat(left).concat(right), resultIndex.concat(leftIndex).concat(rightIndex)];
}

/**
 * 归并排序调用算法-数字
 * @param arr       一维数组：原数据
 * @param arrIndex  一维数组：下标
 * @param flag      true: 从小到大, false: 从大到小
 * @returns {*}     二维数组：第一个元素是原数据数组，第二个元素是下标数组
 */
function mergeSortNumber(arr, arrIndex, flag) {
    if (flag === undefined) flag = true;
    if (arr.length === 1) {
        return [arr, arrIndex];
    }
    let mid = Math.floor(arr.length / 2);
    let left_arr = arr.slice(0, mid), right_arr = arr.slice(mid);
    let left_arrIndex = arrIndex.slice(0, mid), right_arrIndex = arrIndex.slice(mid);
    return mergeNumber(mergeSortNumber(left_arr, left_arrIndex, flag), mergeSortNumber(right_arr, right_arrIndex, flag), flag);
}

/**
 * 归并排序核心算法
 * @param lefts     二维数组：第一个元素是原数据数组，第二个元素是下标数组
 * @param rights    二维数组：第一个元素是原数据数组，第二个元素是下标数组
 * @param flag      true: 从小到大, false: 从大到小
 * @returns {*[][]} 二维数组：第一个元素是原数据数组，第二个元素是下标数组
 */
function merge(lefts, rights, flag) {
    let result = [], resultIndex = [],
        left = lefts[0], right = rights[0],
        leftIndex = lefts[1], rightIndex = rights[1];
    while (left.length > 0 && right.length > 0) {
        if (flag) {
            if (left[0] <= right[0]) {
                result.push(left.shift());
                resultIndex.push(leftIndex.shift());
            } else {
                result.push(right.shift());
                resultIndex.push(rightIndex.shift());
            }
        } else {
            if (left[0] >= right[0]) {
                result.push(left.shift());
                resultIndex.push(leftIndex.shift());
            } else {
                result.push(right.shift());
                resultIndex.push(rightIndex.shift());
            }
        }
    }
    /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
    return [result.concat(left).concat(right), resultIndex.concat(leftIndex).concat(rightIndex)];
}

/**
 * 归并排序调用算法
 * @param arr       一维数组：原数据
 * @param arrIndex  一维数组：下标
 * @param flag      true: 从小到大, false: 从大到小
 * @returns {*}     二维数组：第一个元素是原数据数组，第二个元素是下标数组
 */
function mergeSort(arr, arrIndex, flag) {
    if (flag === undefined) flag = true;
    if (arr.length === 1) {
        return [arr, arrIndex];
    }
    let mid = Math.floor(arr.length / 2);
    let left_arr = arr.slice(0, mid), right_arr = arr.slice(mid);
    let left_arrIndex = arrIndex.slice(0, mid), right_arrIndex = arrIndex.slice(mid);
    return merge(mergeSort(left_arr, left_arrIndex, flag), mergeSort(right_arr, right_arrIndex, flag), flag);
}