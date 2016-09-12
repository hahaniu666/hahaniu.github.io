function print() {
    var arr = [1, 2, 3, 4, 5];
    var iNow = 0;
    var oldInow = 0;
    setInterval(function () {
        iNow++
    }, 1000);
    $.each(arr, function (i, elem) {
        if (iNow > oldInow) {
            console.log(arr[i]);
            iNow = oldInow
        }
    })
}

print();