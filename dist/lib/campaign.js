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