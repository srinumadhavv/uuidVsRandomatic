const { v4: uuidv4 } = require('uuid');
const randomize = require('randomatic');

const radomizeArray = [];
const uuidArray = [];


console.time('randomize');
for(i=0;i<1000000;i++){
    radomizeArray.push(randomize('Aa0', 36));
}
console.timeEnd('randomize');

console.time('uuid');
for(i=0;i<1000000;i++){
    uuidArray.push(uuidv4());
}
console.timeEnd('uuid');

function memorySizeOf(obj) { // taken from : https://gist.github.com/rajinwonderland/36887887b8a8f12063f1d672e318e12e to caluclate memory size of object
    var bytes = 0;
  
    function sizeOf(obj) {
      if (obj !== null && obj !== undefined) {
        switch (typeof obj) {
          case "number":
            bytes += 8;
            break;
          case "string":
            bytes += obj.length * 2;
            break;
          case "boolean":
            bytes += 4;
            break;
          case "object":
            var objClass = Object.prototype.toString.call(obj).slice(8, -1);
            if (objClass === "Object" || objClass === "Array") {
              for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                sizeOf(obj[key]);
              }
            } else bytes += obj.toString().length * 2;
            break;
        }
      }
      return bytes;
    }
  
    function formatByteSize(bytes) {
      if (bytes < 1024) return bytes + " bytes";
      else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
      else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
      else return (bytes / 1073741824).toFixed(3) + " GiB";
    }
  
    return formatByteSize(sizeOf(obj));
};

const sizeofradomizeArray = memorySizeOf(radomizeArray);
const sizeofuuidArray = memorySizeOf(uuidArray);

console.log("sizeofradomizeArray",sizeofradomizeArray);
console.log("sizeofuuidArray",sizeofuuidArray);
