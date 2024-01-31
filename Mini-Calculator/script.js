const displayHistory = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const number = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let disNum = "";
let dis2Num = "";
let result = "";
let lastOperation = "";
let haveDot = false;


// looping
number.forEach((number) => {
    //menambahkan event listener. event listener ini ketika kita klik, yg kita klik akan mempengaruhi apa atau bisa apa saja
    number.addEventListener("click", (e) => { // event click ini, ketika orang melakukan "klik" maka click ini akan melakukan / menjalankan event. (e) itu event
        if (e.target.innerText === "." && !haveDot) {  // ketika melakukan klik dot atau ".", akan di cek dulu apakah sebelumnya tidak melakukan / mempunyai dot?
            console.log(e.target.innerText); // untuk mengambil angka-angka nya menggunakan inner text
            haveDot = true;  // jika tidak ada, maka variabel haveDot akan menjadi true, dan bisa menambhkan dot
        } else if (e.target.innerText === "." && haveDot) { //tetapi jika sudah ada dot, maka tidak akan terjadi respon apa-apa
            console.log('sudah ada dot', e.target.innerText);
            return;
        }

        dis2Num += e.target.innerText;
        display.innerText = dis2Num;


    });
})


operations.forEach((operations) => {
    operations.addEventListener("click", (e) => {
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (disNum && dis2Num && lastOperation) {
            console.log("menjalankan operasi matematika");
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
})

function clearVar(name = "") {
    disNum += dis2Num + " " + name + " ";
    displayHistory.innerText = disNum;
    display.innerText = "";
    dis2Num = "";
    tempResult.innerText = result;
}

function mathOperation() {
    if (lastOperation === "X") {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equal.addEventListener("click", () => {
    //jika ga ada display number nya ga ada, nanti gabisa di klik
    if (!disNum || !dis2Num) return;
    haveDot = false;
    mathOperation()
    clearVar();
    display.innerText = result;
    tempResult.innerText = "";
    dis2Num = result;
    disNum = "";
})

clearAll.addEventListener("click", () => {
    disNum = "";
    dis2Num = "";
    haveDot = false;
    displayHistory.innerText = "0";
    display.innerText = "0";
    tempResult.innerText = "0";
    result = "0";
    lastOperation = "";
})

clearLast.addEventListener("click", () => {
    display.innerText = "0";
    dis2Num = "";
})

// agar bisa input melalui inputan keyboard user
window.addEventListener("keydown", (e) => {
    if (
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
    ) {
        clickButton(e.key);
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperation(e.key);
    } else if (e.key === "*" || e.key === "x") {
        clickOperation("X");
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    } else if (e.key === "Backspace") {
        clickClear();

    }
    // console.log(e.key);
})


//kalo misalkan ngetik di device, sesuai isi dengan innerText nya, maka akan menjalankan button click
function clickButton(key) {
    number.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operations.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    })
}

function clickEqual() {
    equal.click()
}

function clickClear() {
    clearAll.click()
}