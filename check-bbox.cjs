const f = require('./public/geojson/Durango.json');
let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
f.features.forEach(feat => {
  const flatten = (arr) => {
    if (typeof arr[0] === 'number') return [arr];
    return arr.flatMap(flatten);
  };
  flatten(feat.geometry.coordinates).forEach(([x,y]) => {
    if(x<minX)minX=x; if(x>maxX)maxX=x;
    if(y<minY)minY=y; if(y>maxY)maxY=y;
  });
});
console.log('bbox:', {minX,maxX,minY,maxY});
console.log('spanX:', maxX-minX, 'spanY:', maxY-minY);
