document.documentElement.style.setProperty(
  "--constansize",
  Math.round(document.documentElement.offsetHeight / 50) + "px"
);

let default_limit = 3;
let limit = default_limit;
document.querySelector("#limit").value = default_limit;

function change_limit(node) {
  node.value = node.value.replaceAll(/[^\d]/gm, "");
  node.value = +(node.value.length > 0 ? node.value : default_limit);
  node.value = +node.value > 0 ? node.value : default_limit;
  limit = +node.value;
}

function update() {
  let input = document.querySelector("#input");
  let output = document.querySelector("#output");

  output.value = "";

  let modify = (t) => {
    if (t.length > limit) {
      let a = Math.floor(t.length / 2);
      a += !decrypt && t.length % 2 == 1 ? 1 : 0;
      return t.substr(a) + t.substr(0, a);
    }
    return t;
  };

  let tmp = "";
  for (let c of input.value) {
    if (/[\w]/.test(c)) {
      tmp += c;
    } else {
      output.value += modify(tmp);
      output.value += c;
      tmp = "";
    }
  }
  if (tmp.length > 0) output.value += modify(tmp);
}

var availableColors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];

var decrypt = false;
