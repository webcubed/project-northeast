globalThis.onload = function () {
    function animateAll() {
        document.querySelectorAll('.slideintop').forEach(function (e) {
            e.style.top = '0px';
        })
        document.querySelectorAll(".slideinleft").forEach(function (e) {
          e.style.left = "0px";
        });
        document.querySelectorAll(".slideinright").forEach(function (e) {
          e.style.right = "0px";
        });
        document.querySelectorAll(".slideinbottom").forEach(function (e) {
          e.style.bottom = "0px";
        });
    }
    animateAll();
}