export default function RColor(){
  let a = {
    number_to_hex(c) {
      let hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex; 
    },
    getType(color){
      return color.indexOf('rgb') !== -1?'rgb':'hex';
    },
    getAllColors(){
      return this.colors;
    },
    reverse(color,log){
      var type = this.getType(color);
      var [r,g,b] = this.getRGBNumbers(color,type);
      var Color = `rgb(${255 - r},${255 - g},${255 - b})`;
      Color = type === 'rgb'?this.convert_to_rgb(Color):this.convert_to_hex(Color);
      if(log){console.log(`%c ${Color}`, 'background: '+Color+'; color:'+color);}
      return color;
    },
    balance(color,{r = 0,g = 0,b = 0}){
      var type = this.getType(color);
      color = this.convert_to_rgb(color);
      var [R,G,B] = this.getRGBNumbers(color);
      R+=r; if(R> 255){R = 255;}else if(R<0){R = 0;}
      G+=g; if(G> 255){G = 255;}else if(G<0){G = 0;}
      B+=b; if(B> 255){B = 255;}else if(B<0){B = 0;}
      var rgb = `rgb(${R},${G},${B})`;
      return type === 'rgb'?rgb:this.convert_to_hex(rgb,'rgb');
    },
    log(color){
      console.log(`%c ${color}`, 'background: '+color+'; color: #000');
    },
    getRandomColor(type = 'rgb'){
      var r = Math.round(Math.random()*255);
      var g = Math.round(Math.random()*255);
      var b = Math.round(Math.random()*255);
      var rgb = `rgb(${r},${g},${b})`;
      return type === 'rgb'?rgb:this.convert_to_hex(rgb,'rgb')
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
    getList({start = 0,end = 1535,count,log,brightness,type = 'rgb',balance}){
      var length = this.colors.length;
      var upRange = this.upRange;
      start = start > upRange ? upRange:start;
      end = end > upRange ? upRange:end;
      count = count <= 2?2:count
      var offset = end - start,reverse = false;  
      if(offset < 0){
        reverse = true; offset = Math.abs(offset);
        var a = end; end = start; start = a;
      }
      var colors = [];
      var index = start;
      for(var i = 0; i < count; i++){

        let color = this.colors[Math.floor(index)];
        color = balance?this.balance(color,balance):color;
        color = this.getByBrightness(color,brightness);
        color = type === 'hex'?this.convert_to_hex(color):color;
        colors.push(color);
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
  var offset = 6;
  var r = 255, g = 0, b = 0,colors = [],color;
  while(g <= 255){
    colors.push('rgb('+r+','+g+','+b+')'); 
    g+=offset;
  } 
  g = 255;
  while(r >= 0){
    colors.push('rgb('+r+','+g+','+b+')'); 
    r-=offset;
  } 
  r = 0; 
  while(b <= 255){
    colors.push('rgb('+r+','+g+','+b+')');  
    b+=offset;
  } 
  b = 255;
  while(g >= 0){
    colors.push('rgb('+r+','+g+','+b+')'); 
    g-=offset;
  } 
  g = 0; 
  while(r <= 255){
    colors.push('rgb('+r+','+g+','+b+')'); 
    r+=offset; 
  } 
  var offset5 = 6;
  while(b >= 0){
    colors.push('rgb('+r+','+g+','+b+')');  
    b-=offset;
  } 
  b = 0; 
  a.colors = colors;
  a.upRange = colors.length - 1;
  return {
    convert_to_hex:a.convert_to_hex.bind(a),
    length:colors.length,
    convert_to_rgb:a.convert_to_rgb.bind(a),
    getByBrightness:a.getByBrightness.bind(a),
    getList:a.getList.bind(a),
    getRGBNumbers:a.getRGBNumbers.bind(a),
    number_to_hex:a.number_to_hex.bind(a),
    reverse:a.reverse.bind(a),
    log:a.log.bind(a),
    getRandomColor:a.getRandomColor.bind(a),
    balance:a.balance.bind(a)
  };
}



 
