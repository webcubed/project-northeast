var scroll;
globalThis.onload = function () {
  function animatetb() {
    document.querySelectorAll(".slideintop").forEach(function (e) {
      e.style.top = "0px";
    });
    document.querySelectorAll(".slideinbottom").forEach(function (e) {
      e.style.bottom = "0px";
    });
  }
  animatetb();
  document
    .getElementById("floating")
    .addEventListener("click", function (event) {
      smoothScrollto(event);
      setTimeout(() => {
        document.querySelectorAll(".slideinleft").forEach(function (e) {
          e.style.left = "0px";
        });
        document.querySelectorAll(".slideinright").forEach(function (e) {
          e.style.right = "0px";
        });
      }, 1000);
    });
  init();

  const ea = document.querySelectorAll(".container");

  function checkPosition() {
    ea.forEach(function (e) {
      const topPosition = e.getBoundingClientRect().top;
      if (topPosition >= 0 && topPosition <= window.innerHeight) {
        if (e.classList.contains("slideinleft")) {
          e.style.left = "0px";
        } else if (e.classList.contains("slideinright")) {
          e.style.right = "0px";
        }
      } else {
        if (e.classList.contains("slideinleft")) {
          e.style.left = "-100%";
        } else if (e.classList.contains("slideinright")) {
          e.style.right = "-100%";
        }
      }
    });
  }
  checkPosition();
  window.addEventListener("scroll", checkPosition);
  document.querySelectorAll(".ctitle").forEach(function (e) {
    var converter = new showdown.Converter(),
      text = e.innerHTML.toString(),
      html = converter.makeHtml(text);
    e.innerHTML = html;
  });

  var sources = document.getElementById("sources");
  var converter = new showdown.Converter(),
    text = sources.innerHTML.toString(),
    html = converter.makeHtml(text);
  sources.innerHTML = html;
  var links = document.body.getElementsByTagName("a");
  var linkCount = links.length;
  for (var i = 0; i < linkCount; i++) {
    if (new URL(links[i].href).origin !== location.origin) {
      links[i].setAttribute("target", "_blank");
    }
  }
  // document.querySelectorAll('a').forEach(function (e) {
  //   e.addEventListener("click", function (a) {
  //     open(e.innerHTML)
  //   })
  // })
  document.querySelectorAll(".brief").forEach(function (e) {
    var converter = new showdown.Converter(),
      text = e.innerHTML.toString(),
      html = converter.makeHtml(text);
    e.innerHTML = html;
  });
  document.querySelectorAll(".en").forEach(function (e) {
    if (
      e.parentElement.parentElement.parentElement.classList.contains(
        "slideinright"
      )
    ) {
      e.style.right = "75px";
    } else if (
      e.parentElement.parentElement.parentElement.classList.contains(
        "slideinleft"
      )
    ) {
      e.classList.replace("fa-chevrons-right", "fa-chevrons-left");
      e.style.left = "75px";
    }
  });
  document.querySelectorAll(".en").forEach(function (e) {
    e.addEventListener("mouseover", function () {
      e.style.color = "#5d3fd3";
    });
    e.addEventListener("mouseleave", function () {
      e.style.color = "#fff";
    });
  });
  document
    .getElementById("floating")
    .addEventListener("mouseover", function () {
      document.getElementById("arrow").style.color = "#fff";
    });
  document
    .getElementById("floating")
    .addEventListener("mouseleave", function () {
      document.getElementById("arrow").style.color = "#000";
    });
};
function smoothScrollto(event) {
  event.preventDefault();
  const targetPosition = document.querySelector("#tribes").offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function linear(t, b, c, d) {
  return (c * t) / d + b;
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

function init() {
  new SmoothScroll(document, 120, 12);
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body; // cross browser support for document scrolling

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    // requestAnimationFrame cross browser but NO
    return (
      window.requestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}
