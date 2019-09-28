module.exports = function multiply(first, second) {
  let arr = first.split('').reverse().map(x => Number(x));
  let brr = second.split('').reverse().map(x => Number(x));

  let result = arr.reduce((items, a, index) => {
    let part = 0;

    let row = brr.reduce((item, b) => {
      let element = getSplitResult(b * a + Number(part));      
      item.push(element.val); 
      part = element.part;
      return item;
    }, []);

    if(part.length > 0) {
      row.push(...part.split('').map(x => Number(x)));
      part = 0; 
    }
   
    for(let i = 0; i < row.length; i++) {
      let value = !items[i + index] ? row[i] : items[i + index] + row[i];
      value += Number(part);

      let element = getSplitResult(value);      
      items[i + index] = element.val;
      part = element.part;
    }
    
    if (part.length > 0) {
      part.split('').reverse().forEach((p, j) => {
        items[row.length + index + j] = Number(p);
      });
    }
    return items;
  }, []);

  return result.reverse().join('');
}

function getSplitResult(val) {
  let s = val.toString();
  let len = s.length - 1;
  return {val: Number(s.length > 1 ? s.substr(len, 1) : val), part: s.substr(0, len)};
}