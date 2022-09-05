const s = "123456";
function despite(str) {
  const arr = [];
  let s = "";

  for (let i = 0; i < str.length; i++) {
    s = "";
    for (let k = 0; k < i; k++) {
      s = s.concat(str[k]).concat(".");
    }
    s = s.concat(str[i]);
    arr.push(s);
  }
  console.log(arr);
}
despite(s);
