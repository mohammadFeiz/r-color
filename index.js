function RColor(){
  let a = {
    number_to_hex(c) {
      let hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex; 
    },
    getType(color){
      return color.indexOf('rgb') !== -1?'rgb':'hex';
    },
    getRGBNumbers(color,type){
      color = this.convert_to_rgb(color,type);
      var rgb = color.slice(color.indexOf('(') + 1,color.indexOf(')'));
      var [r,g,b] = rgb.split(',');
      return [parseInt(r),parseInt(g),parseInt(b)];
    },
    convert_to_hex(color,type){
      type = type || this.getType(color);
      return type === 'rgb'?this.rgb_to_hex(color):color}, 
    convert_to_rgb(color,type){
      type = type || this.getType(color);
      return type === 'hex'?this.hex_to_rgb(color):color
    },
    rgb_to_hex(color) {
      var [r,g,b] = this.getRGBNumbers(color);   
      return "#" + this.number_to_hex(r) + this.number_to_hex(g) + this.number_to_hex(b);
    },
    hex_to_rgb (hex) {
      if (hex.charAt(0) === '#') {hex = hex.substr(1);}
      if ((hex.length < 2) || (hex.length > 6)) {return false;}
      var values = hex.split(''),r,g,b;
      if (hex.length === 2) {
          r = parseInt(values[0].toString() + values[1].toString(), 16);
          g = r;
          b = r;
      } else if (hex.length === 3) {
          r = parseInt(values[0].toString() + values[0].toString(), 16);
          g = parseInt(values[1].toString() + values[1].toString(), 16);
          b = parseInt(values[2].toString() + values[2].toString(), 16);
      } else if (hex.length === 6) {
          r = parseInt(values[0].toString() + values[1].toString(), 16);
          g = parseInt(values[2].toString() + values[3].toString(), 16);
          b = parseInt(values[4].toString() + values[5].toString(), 16);
      } else {
          return false;
      }
      return `rgb(${r},${g},${b})`;
    },
    getByBrightness(color,brightness){
      if(!brightness){return color}
      var type = this.getType(color);
      var [r,g,b] = this.getRGBNumbers(color,type);
      var rP = (r * 100 / 255),gP = (g * 100 / 255),bP = (b * 100 / 255);
      if (brightness > 0){rP=100 - rP; gP=100 - gP; bP=100 - bP;}
      r += Math.round(rP * brightness / 100);
      g += Math.round(gP * brightness / 100);
      b += Math.round(bP * brightness / 100);
      color = `rgb(${r},${g},${b})`;
      return type === 'rgb'?color:this.convert_to_hex(color);
    },
    getList({start = 0,end = 1535,count,log,brightness}){
      var length = this.colors.length;
      start = start > 1535 ? 1535:start;
      end = end > 1535 ? 1535:end;
      count = count <= 2?2:count
      var offset = end - start,reverse = false;  
      if(offset < 0){
        reverse = true; offset = Math.abs(offset);
        var a = end; end = start; start = a;
      }
      var colors = [];
      var index = start;
      for(var i = 0; i < count; i++){
        let color = this.colors[Math.round(index)];
        colors.push(this.getByBrightness(color,brightness));
        index +=offset / (count - 1);
        
      }
      colors = reverse?colors.reverse():colors;
      if(log){
        for(var i = 0; i < colors.length; i++){
          let color = colors[i];
          console.log(`%c ${color} ${i}`, 'background: '+color+'; color: #000');
        }
      }
    }
  };
  var r = 255, g = 0, b = 0,colors = [],color;
  while(g <= 255){
    colors.push('rgb('+r+','+g+','+b+')'); 
    g++;
  } 
  g = 255;
  while(r >= 0){
    colors.push('rgb('+r+','+g+','+b+')'); 
    r--;
  } 
  r = 0; 
  while(b <= 255){
    colors.push('rgb('+r+','+g+','+b+')'); 
    b++;
  } 
  b = 255;
  while(g >= 0){
    colors.push('rgb('+r+','+g+','+b+')'); 
    g--;
  } 
  g = 0; 
  while(r <= 255){
    colors.push('rgb('+r+','+g+','+b+')'); 
    r++;
  } 
  r = 255;
  while(b >= 0){
    colors.push('rgb('+r+','+g+','+b+')'); 
    b--;
  } 
  b = 0; 
  a.colors = colors;
  return {
    convert_to_hex:a.convert_to_hex.bind(a),
    convert_to_rgb:a.convert_to_rgb.bind(a),
    getByBrightness:a.getByBrightness.bind(a),
    getList:a.getList.bind(a),
    getRGBNumbers:a.getRGBNumbers.bind(a),
    number_to_hex:a.number_to_hex.bind(a)
  };
}


  var getColor = new RColor();

  var colors = getColor.getList({start:400,end:1800,count:80,log:true,brightness:10});
  
