export const numPrice = (num) => {
    // 將num轉型為字串
    let n = num + "";

    // 將字串轉成陣列，並將陣列元素反轉
    let numArr = n.split("").reverse();

    let overArr = [];
    let i = 0;

    numArr.forEach((item) => {
        i++;
        // 若i數到3，push一個千分位符號！
        if (i > 3) {
            i = 1;
            overArr.push(",");
        }
        overArr.push(item);
    });
    overArr.reverse();
    return overArr.join("");
};