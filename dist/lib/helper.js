function bgmusic(t) {
  var mv = 0.08;
  if (currentSound) {
    currentSound.fade(mv, 0, 1000)
    currentSound.once('fade', () => {
      currentSound.stop();
      currentSound = false;
      if (t) bgmusic(t);
    });
  } else if (t) {
    currentSound = SOUND[t];
    currentSound.play();
    currentSound.loop(true);
    currentSound.fade(0, mv, 1000)
  }
};
function showLoader(){
  document.getElementById("loader").style.display = "block";
};
function hideLoader(){
  document.getElementById("loader").style.display = "none";
};
function scoreMsg(){
  var gs = ROTM.gs();
  var myscore = gs.score[(gs.isPlayer1 ? 0 : 1)];
  var opscore = gs.score[(gs.isPlayer1 ? 1 : 0)];
  if (myscore > opscore) return "won";
  if (myscore < opscore) return "lost";
  if (myscore == opscore) return "drew";
}
function drawLocalScore(){
  var gs = ROTM.gs();
  var myscore = localScore[(gs.isPlayer1 ? 0 : 1)].toString();
  var opscore = localScore[(gs.isPlayer1 ? 1 : 0)].toString();
  if (st1) {
    st1.text(myscore)
    st2.text(opscore)
  } else {
    st1 = currentRoom.draw.text(myscore).font({size: 30}).translate(620, 170).fill(CONFIG.colors.ally);
    st2 = currentRoom.draw.text(opscore).font({size: 30}).translate(1050, 170).fill(CONFIG.colors.enemy);    
  }
};
function drawScore(){
  var gs = ROTM.gs();
  localScore = gs.score;
  var myscore = gs.score[(gs.isPlayer1 ? 0 : 1)].toString();
  var opscore = gs.score[(gs.isPlayer1 ? 1 : 0)].toString();
  if (st1) {
    st1.text(myscore)
    st2.text(opscore)
  } else {
    st1 = currentRoom.draw.text(myscore).font({size: 30}).translate(620, 170).fill(CONFIG.colors.ally);
    st2 = currentRoom.draw.text(opscore).font({size: 30}).translate(1050, 170).fill(CONFIG.colors.enemy);    
  }
}
//player 1 = 0, p2 = 1...
function getcolor(p){
  var gs = ROTM.gs();
  if (gs.isPlayer1 && p == 1) return CONFIG.colors.ally;
  if (gs.isPlayer1 && p == 2) return CONFIG.colors.enemy;
  if (!gs.isPlayer1 && p == 1) return CONFIG.colors.enemy;
  if (!gs.isPlayer1 && p == 2) return CONFIG.colors.ally;
}
function placeHex(hex, updateScore){
  var incluster = false;
  var hpsd = 0;
  var hosd = 0;
  var hexPlayer = hex.player;
  var hexOtherPlayer = (hexPlayer === 1 ? 2 : 1);
  var ns = gamegrid.neighborsOf(hex);
  var cs = hex.corners();
  var p = {x:hex.dx, y:hex.dy};
  var s = 12;
  for(i = 0; i < ns.length; i++){
    if (typeof ns[i] !== 'undefined' && ns[i].magni !== false){
      if (ns[i].player == hexPlayer){
        if (incluster) {
          var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer)).move(cs[i].x+p.x-(s/2), cs[i].y+p.y-(s/2)).stroke({width:2,color:"white"});
          hpsd++;
        } 
        if (i == 5 && typeof ns[0] !== 'undefined' && ns[0].player == hexPlayer) {
          var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer)).move(cs[0].x+p.x-(s/2), cs[0].y+p.y-(s/2)).stroke({width:2,color:"white"});
          hpsd++;
        }
        incluster = true;
      } else {
        if (i == 0) {
          if (CONFIG.magni[hex.magni[1].magni][5] > CONFIG.magni[ns[i].magni[1].magni][2]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer))
            .move(((cs[0].x+cs[1].x)/2)+p.x-(s/2), ((cs[0].y+cs[1].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hpsd++;
          } else if (CONFIG.magni[hex.magni[1].magni][5] < CONFIG.magni[ns[i].magni[1].magni][2]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexOtherPlayer))
            .move(((cs[0].x+cs[1].x)/2)+p.x-(s/2), ((cs[0].y+cs[1].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hosd++;
          }
        } else if (i == 5) {
          if (CONFIG.magni[hex.magni[1].magni][4] > CONFIG.magni[ns[i].magni[1].magni][1]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer))
            .move(((cs[5].x+cs[0].x)/2)+p.x-(s/2), ((cs[5].y+cs[0].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hpsd++;
          } else if (CONFIG.magni[hex.magni[1].magni][4] < CONFIG.magni[ns[i].magni[1].magni][1]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexOtherPlayer))
            .move(((cs[5].x+cs[0].x)/2)+p.x-(s/2), ((cs[5].y+cs[0].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hosd++;
          }
        } else if (i == 2) {
          if (CONFIG.magni[hex.magni[1].magni][1] > CONFIG.magni[ns[i].magni[1].magni][4]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer))
            .move(((cs[2].x+cs[3].x)/2)+p.x-(s/2), ((cs[2].y+cs[3].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hpsd++;
          } else if (CONFIG.magni[hex.magni[1].magni][1] < CONFIG.magni[ns[i].magni[1].magni][4]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexOtherPlayer))
            .move(((cs[2].x+cs[3].x)/2)+p.x-(s/2), ((cs[2].y+cs[3].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hosd++;
          }
        } else if (i == 3) {
          if (CONFIG.magni[hex.magni[1].magni][2] > CONFIG.magni[ns[i].magni[1].magni][5]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer))
            .move(((cs[3].x+cs[4].x)/2)+p.x-(s/2), ((cs[3].y+cs[4].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hpsd++;
          } else if (CONFIG.magni[hex.magni[1].magni][2] < CONFIG.magni[ns[i].magni[1].magni][5]){
            var circle = currentRoom.draw.circle(s).fill(getcolor(hexOtherPlayer))
            .move(((cs[3].x+cs[4].x)/2)+p.x-(s/2), ((cs[3].y+cs[4].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
            hosd++;
          }
        } else if (i == 1 || i == 4) {
          if (CONFIG.magni[hex.magni[1].magni][3] > CONFIG.magni[ns[i].magni[1].magni][3]){
            if (i == 1){
              var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer))
              .move(((cs[2].x+cs[1].x)/2)+p.x-(s/2), ((cs[2].y+cs[1].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
              hpsd++;
            } else if (i == 4){
              var circle = currentRoom.draw.circle(s).fill(getcolor(hexPlayer))
              .move(((cs[5].x+cs[4].x)/2)+p.x-(s/2), ((cs[5].y+cs[4].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
              hpsd++;
            }
          } else if (CONFIG.magni[hex.magni[1].magni][3] < CONFIG.magni[ns[i].magni[1].magni][3]){
            if (i == 1){
              var circle = currentRoom.draw.circle(s).fill(getcolor(hexOtherPlayer))
              .move(((cs[2].x+cs[1].x)/2)+p.x-(s/2), ((cs[2].y+cs[1].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
              hosd++;
            } else if (i == 4){
              var circle = currentRoom.draw.circle(s).fill(getcolor(hexOtherPlayer))
              .move(((cs[5].x+cs[4].x)/2)+p.x-(s/2), ((cs[5].y+cs[4].y)/2)+p.y-(s/2)).stroke({width:2,color:"white"});
              hosd++;
            }
          }
        }
        incluster = false;
      }
    } else {
      incluster = false;        
    }
  }
  if (updateScore){
    if (hexPlayer == 1) {
      localScore[0] += hpsd;
      localScore[1] += hosd;
    } else  {
      localScore[0] += hosd;
      localScore[1] += hpsd;
    }
    drawLocalScore();
  }
    
}
function updateSelectedTeam(){
  playergrid.map((hex, i) => {
    selectedTeam[i] = hex.magni;
  });
  drawCurrentRating();
}
function resetSelectedTeam(){
  selectedTeam = [];
}
function drawSelectedTeam(){
  teamDraw.clear();
  var r = 0;
  selectedTeam.map((magni, i) => {
    if (magni !== false){
      if (i >= 5) r = 1;
      teamDraw.image('assets/heros/'+magni[1].magni + '.png').flip('x').translate(300 + (r * 150), 100 + (150*(i - (r*5))));
    }
  });
}

function isValidTeam(){
  var cc = 0;
  selectedTeam.map(c => {
    if (c !== false) cc++;
  });
  if (cc != 10) return false;
  if (getCurrentRating() > 23) return false;
  else return true;
}
function getCardRank(c){
  return Math.ceil((CONFIG.magni[c][1] + CONFIG.magni[c][2] + (CONFIG.magni[c][3]*2) + CONFIG.magni[c][4] + CONFIG.magni[c][5])/20);
}
function getCurrentRating(){
  var cv = 0;
  selectedTeam.map(c => {
    if (c !== false) {
      cv += getCardRank(c[1].magni);
    }
  });
  return cv;
}

//Shared draw functions
function createButton(x,y,w,h,t,fn){
  var btn = currentRoom.draw.group();
  btn.rect(w, h).move(x, y).fill("#333");
  btn.text(t).font(CONFIG.fonts.buttons).translate(x+(w/2), y+8).fill("white");
  btn.click(e => {
    SOUND.select.play();
    fn(e);
  });
  btn.addClass('clickable');
  return btn;
}
function drawMessage(t){
  if (currentRoom.headerMessage) {
    currentRoom.headerMessage.text(t);
  } else {
    currentRoom.headerMessage = currentRoom.draw.text(t).font(CONFIG.fonts.messages).translate(600, 35).fill('white');
  }
}

//Lobby draw code
function drawOnlineMessage(t){
  if (omd) {
    omd.text(t);
  } else {
    omd = currentRoom.draw.text(t).font({size: 12, anchor:"middle", family : "Verdana", weight : "bold"}).translate(255, 670).fill('white');
  }
}
function clearOnlineMessage(){
  if (omd) omd.clear();
}
function drawCurrentRating(){
  var r = getCurrentRating();
  var col = '#fff';
  if (r>23) col = 'red';
  if (rd) {
    rd.text(r + "/23");
  } else {
    rd = currentRoom.draw.text(r + "/23").font(CONFIG.fonts.ratings).translate(360, 160).fill(col);
  }
}

//Campaign
function launchAdventure(c,s){
  chapter = c;
  scene = s;
  processNextScene();
}
function processNextScene(persist){
  if (scene >= CONFIG.adventure[chapter].length) {
    rooms.menu.enter();
    return;
  }
  var event = CONFIG.adventure[chapter][scene];
  //Reset scenes
  if (!persist)
    rooms.adventure.scene.clear();
  switch(event.type){
    case "title":
      rooms.adventure.scene.text(event.title).font(CONFIG.fonts.title).translate(600,200).fill('white');
      if (typeof event.backgroundColor != 'undefined') {
        setBackgroundColor(event.backgroundColor);
      } else {
        setBackgroundColor();
      }
      if (typeof event.background != 'undefined') {
        setBackground(event.background);
      } else {
        setBackground();
      }
      if (typeof event.subtitle != 'undefined') {
        rooms.adventure.scene.text(event.subtitle).font(CONFIG.fonts.subtitle).translate(600,300).fill('white');
      }
      fadeToNextEvent(event.delay);
    break;
    case "overlay":
      if (typeof event.backgroundColor != 'undefined') {
        setBackgroundColor(event.backgroundColor);
      }
      setBackground(event.background);
      fadeToNextEvent(event.delay);
    break;
    case "chat":
      if (inchat){
        chatnp.clear();
        chatnp.opacity(1);
      } else {
        inchat = true;
        rooms.adventure.scene.image('assets/chat_bg.png').translate(25, 625);
        chatnp = rooms.adventure.scene.group();
      }
      
      var chatX = 450;
      if (typeof event.side == 'undefined' || event.side == 'left'){
        chatnp.image(CONFIG.characters[event.character].image).translate(0, 570);
      } else {      
        chatX = 80;
        chatnp.image(CONFIG.characters[event.character].image).flip('x').translate(1200, 570);
      }
      chatnp.text(CONFIG.characters[event.character].name + ": " + event.text).font(CONFIG.fonts.chat).translate(chatX,670).fill('black');
      
      rooms.adventure.clickHandler = () => {
        rooms.adventure.clickHandler = false
        if (CONFIG.adventure[chapter][scene+1] && CONFIG.adventure[chapter][scene+1].type == 'chat'){
          chatnp.animate().opacity(0).after(() => {
            scene++;
            processNextScene(true);
          });
        } else {
          inchat = false;
          chatnp.clear();
          fadeToNextEvent();
        }
      };
    break;
    case "battle":
      if (typeof event.backgroundColor != 'undefined') {
        setBackgroundColor(event.backgroundColor);
      } else {
        setBackgroundColor('white');
      }
      if (typeof event.background != 'undefined') {
        setBackground(event.background);
      } else {
        setBackground('assets/bg.jpg');
      }
      if (typeof event.board == 'undefined') {
        event.board = 'standard';
      }
      var b = event.board;
      if (typeof b == 'string') b = CONFIG.boards[b];
      var afterfn = (result) => {
        fadeToBlack(() => {
          rooms.adventure.enter();
          rooms.adventure.scene.clear();
          setBackgroundColor();
          setBackground();
          fadeFromBlack(() => {
            var w = 'next',l = 'back',d = 'back', p;
            if (typeof event.result != 'undefined'){
              if (typeof event.result.win != 'undefined') w = event.result.win;
              if (typeof event.result.lose != 'undefined') l = event.result.lose;
              if (typeof event.result.draw != 'undefined') d = event.result.draw;
            }
            if (result == 1) {
              rooms.adventure.scene.text("YOU WON").font(CONFIG.fonts.title).translate(600,200).fill('white');
              p = w;
            } else if (result == 2) {
              rooms.adventure.scene.text("DRAW").font(CONFIG.fonts.title).translate(600,200).fill('white');
              p = d;
            } else {
              rooms.adventure.scene.text("DEFEATED").font(CONFIG.fonts.title).translate(600,200).fill('white');
              p = l;
            }
            if (p == 'next'){            
              fadeToNextEvent(1);
            } else if (p == 'back'){
              //Go back one
              scene -= 2;       
              fadeToNextEvent(1);
            } else {
              var s = p[1];
              if (p[0] == 'back'){
                //Go s back
                scene -= (s+2);       
                fadeToNextEvent(1);
              } else if (p[0] == 'next'){
                //Go s forward
                scene +=s;
                fadeToNextEvent(1);
              } else if (p[0] == 'goto'){
                //Goto s
                scene = s;
                fadeToNextEvent(1);
              }  
            }
          });
        });
      }
      var c = event.cards.slice();
      if (typeof event.character != 'undefined') 
        rooms.game.enter(0, "Continue", afterfn, c, b, event.character);
      else
        rooms.game.enter(0, "Continue", afterfn, c, b);
    break;
    case "video":
    
    break;
    case "audioStart":
    
    break;
    case "audioEnd":
    
    break;
  }
}

//Other
function setBackground(a){
  if (!a){
    document.getElementById('gameContainer').getElementsByClassName('gameView')[0].style.backgroundImage = '';
  } else {
    document.getElementById('gameContainer').getElementsByClassName('gameView')[0].style.backgroundImage = "url('"+a+"')";
  }
}
function setBackgroundColor(a){
  if (!a) a = 'black';
  document.getElementById('gameContainer').getElementsByClassName('gameView')[0].style.backgroundColor = a;
}
function fadeToBlack(fn){
  FOREGROUND.show().animate(1000).opacity(1).after(fn);
}
function fadeFromBlack(fn){
  FOREGROUND.animate(1000).opacity(0).after(() => {
    FOREGROUND.hide();
    fn()
  });
}
function fadeToNextEvent(s){
  var fn = () => {
    FOREGROUND.show().animate(2000).opacity(1).after(() => {
      scene++;
      processNextScene();
      FOREGROUND.animate(2000).opacity(0).after(() => {
        FOREGROUND.hide();
      });
    });
  }
  if (s) {
    setTimeout(fn, s*1000);
  } else {
    fn();
  }
}