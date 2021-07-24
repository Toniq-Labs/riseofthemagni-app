//Hex code
const BoardHex = Honeycomb.extendHex({ 
  size: 65, 
  orientation: 'flat',
  index : false,
  isPlayerHex : false,
  isSpecial : false,
  player : 0,
  magni : false,
  nftid : false,
  hexDraw : false,
  canvas : false,
  border : false,
  image : false,
  dx : 0,
  dy : 0,
  type : '',
  init(t, d) {
    var { x, y } = this.toPoint();
    this.dx = x + hexOffsetX;
    this.dy = y + hexOffsetY;
    this.type = t;
    const corners = this.corners()
    
    this.hexDraw = d;
    
    this.border = this.hexDraw
    .polygon(corners.map(({ x, y }) => `${x},${y}`))
    .stroke({ width: 1, color: '#fff' })
    .translate(this.dx, this.dy)
    .fill('transparent')
    .opacity(.9);
    
    this.canvas = this.hexDraw.group();
    this.hexDraw.addClass('clickable');
  },
  clear(){
    selectedHex = false;//Legacy probably want to remove
    this.removeCard();
  },
  removeCard(){
    this.magni = false;
    this.highlight('transparent');
    if (this.canvas) this.canvas.clear();
  },
  highlight(col) {
    this.border.fill(col);
  },
  unhighlight(){
    this.highlight(CONFIG.colors.hexBg);
  },
  set(magni, col) {
    this.magni = magni;
    if (!col) col = 'transparent';
    if (this.canvas) this.canvas.clear();
    this.image = currentRoom.draw.image('assets/heros/h'+magni[1].magni + '.png').translate(this.dx, this.dy);
    if (this.isPlayerHex){
      this.image.flip('x').translate(130,0);
    }
    this.canvas.add(this.image);
    var r = getCardRank(this.magni[1].magni);
    this.canvas.image('assets/heros/ring'+(r-1)+'.png').translate(this.dx, this.dy);
    var rr = '';
    for (var i = 0; i < r; i++){
      rr += "*";
    }
    var fc = "black";
    if (r == 1) fc = "white";
    this.canvas.text(rr).translate(this.dx+65, this.dy+73).font(CONFIG.fonts.units).fill("#fec80e").stroke({width:1, color:"#fec80e"});
    this.canvas.text(CONFIG.magni[this.magni[1].magni][1].toString()).translate(this.dx+28, this.dy+64).font(CONFIG.fonts.units).fill(fc);
    this.canvas.text(CONFIG.magni[this.magni[1].magni][2].toString()).translate(this.dx+28, this.dy+22).font(CONFIG.fonts.units).fill(fc);
    this.canvas.text(CONFIG.magni[this.magni[1].magni][4].toString()).translate(this.dx+100, this.dy+22).font(CONFIG.fonts.units).fill(fc);
    this.canvas.text(CONFIG.magni[this.magni[1].magni][5].toString()).translate(this.dx+100, this.dy+64).font(CONFIG.fonts.units).fill(fc);
    this.canvas.text(CONFIG.magni[this.magni[1].magni][3].toString()).translate(this.dx+64, this.dy+2).font(CONFIG.fonts.units).fill(fc);
    this.canvas.text(CONFIG.magni[this.magni[1].magni][3].toString()).translate(this.dx+64, this.dy+84).font(CONFIG.fonts.units).fill(fc);
    this.border.fill(col);
  },
  special(t,d) {
    var { x, y } = this.toPoint();
    x+=hexOffsetX;y+=hexOffsetY;
    this.magni = d;
    this.isSpecial = true;
    this.highlight('#333');
    this.canvas.text(t).translate(this.dx+65, this.dy+40).font({size: 14, anchor:   'middle', family : "Verdana", weight : "bold"}).fill("white");
  },
  place(player, magni, col) {
    this.player = player;
    this.set(magni, col);
  }
})
const Grid = Honeycomb.defineGrid(BoardHex);

const herogrid = Grid.rectangle({
  width : 5, 
  height : 4, 
  start : [6,1]
});
const playergrid = Grid([1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[2,4],[3,1],[3,2],[3,3]);
const premadegrid = Grid([6,5],[8,5],[10,5]);
document.addEventListener('click', ({ offsetX, offsetY }) => {
  if (typeof currentRoom.hexClickHandler != 'undefined'){
    const hexCoords = Grid.pointToHex(offsetX-hexOffsetX, offsetY-hexOffsetY);
    if (playergrid.get(hexCoords)) currentRoom.hexClickHandler(offsetX, offsetY, playergrid.get(hexCoords));
    if (currentRoom == rooms.lobby) {
      if (premadegrid.get(hexCoords)) currentRoom.hexClickHandler(offsetX, offsetY, premadegrid.get(hexCoords));
      if (herogrid.get(hexCoords)) currentRoom.hexClickHandler(offsetX, offsetY, herogrid.get(hexCoords));      
    }
    if (currentRoom == rooms.game) {
      if (gamegrid.get(hexCoords)) currentRoom.hexClickHandler(offsetX, offsetY, gamegrid.get(hexCoords));
    }
  }
});