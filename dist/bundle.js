/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5872:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/@dfinity/agent/lib/esm/index.js + 28 modules
var esm = __webpack_require__(3733);
;// CONCATENATED MODULE: ./src/extjs.js
/* global BigInt */
  

//Preload IDLS against a common name
const _preloadedIdls = {

};

class ExtConnection {
  _mapIdls = {
  };

  _identity = false;
  _host = false;
  _agent = false;
  _canisters = {};
  
  constructor(host, identity) {
    if (identity) this._identity = identity;
    if (host) this._host = host;
    this._makeAgent();
  }
  idl(canister, idl) {
    this._mapIdls[canister] = idl;
    return this;
  };
  setIdentity(identity) {
    if (identity) this._identity = identity;
    else this._identity = false;
    this._makeAgent();
    return this;
  }
  setHost(host) {
    if (host) this._host = host;
    else this._host = false;
    this._makeAgent();
    return this;
  }
  canister(cid, idl) {
    if (!idl){
      if (this._mapIdls.hasOwnProperty(cid)) {
        idl = this._mapIdls[cid];
      } else {
        throw new Error(idl + " is not a preloaded IDL");
      }
    } else if (typeof idl == 'string') {
      if (_preloadedIdls.hasOwnProperty(idl)) {
        idl = _preloadedIdls[idl];
      } else {
        throw new Error(idl + " is not a preloaded IDL");
      }
    }
    if (!this._canisters.hasOwnProperty(cid)){
      this._canisters[cid] = esm/* Actor.createActor */.vt.createActor(idl, {agent : this._agent, canisterId : cid});
    }
    return this._canisters[cid];
  }

  _makeAgent() {
    var args = {};
    if (this._identity) args['identity'] = this._identity;
    if (this._host) args['host'] = this._host;
    this._agent = new esm/* HttpAgent */.i7(args);
  };
};

const api = {
  connect : (host, identity) => new ExtConnection(host ?? "https://boundary.ic0.app/", identity),
};
/* harmony default export */ const extjs = (api);
;// CONCATENATED MODULE: ./src/rotm.did.js
const idlFactory = ({ IDL }) => {
  const HexNeighbors = IDL.Tuple(
    IDL.Opt(IDL.Nat),
    IDL.Opt(IDL.Nat),
    IDL.Opt(IDL.Nat),
    IDL.Opt(IDL.Nat),
    IDL.Opt(IDL.Nat),
    IDL.Opt(IDL.Nat),
  );
  const BoardHex = IDL.Record({
    'sides' : HexNeighbors,
    'coords' : IDL.Tuple(IDL.Nat8, IDL.Nat8),
  });
  const Board = IDL.Record({ 'hexs' : IDL.Vec(BoardHex), 'name' : IDL.Text });
  const BoardId = IDL.Nat32;
  const MagniAttack = IDL.Tuple(
    IDL.Nat8,
    IDL.Nat8,
    IDL.Nat8,
    IDL.Nat8,
    IDL.Nat8,
  );
  const Magni = IDL.Record({
    'img' : IDL.Text,
    'name' : IDL.Text,
    'attack' : MagniAttack,
  });
  const MagniId = IDL.Nat32;
  const MagniNFTId = IDL.Nat32;
  const ItemId = IDL.Nat32;
  const MagniNFT = IDL.Record({
    'exp' : IDL.Nat32,
    'magni' : MagniId,
    'upgrades' : IDL.Vec(ItemId),
    'transferrable' : IDL.Bool,
  });
  const GameHash = IDL.Text;
  const OpponentId = IDL.Nat32;
  const GameOption = IDL.Variant({
    'pvp' : IDL.Tuple(BoardId, IDL.Opt(GameHash)),
    'practice' : BoardId,
    'opponent' : OpponentId,
  });
  const GameId = IDL.Nat32;
  const GameScore = IDL.Tuple(IDL.Nat8, IDL.Nat8);
  const GameResult = IDL.Variant({
    'result' : IDL.Tuple(GameScore, IDL.Principal, IDL.Opt(IDL.Principal)),
    'noresult' : IDL.Tuple(IDL.Principal, IDL.Opt(IDL.Principal), IDL.Text),
  });
  const GameStatus = IDL.Variant({
    'lead' : IDL.Null,
    'play' : IDL.Null,
    'ended' : GameResult,
    'lobby' : IDL.Null,
  });
  const GameState = IDL.Record({
    'status' : GameStatus,
    'moves' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Tuple(MagniNFTId, MagniNFT))),
    'option' : GameOption,
    'lead' : IDL.Vec(MagniNFT),
    'score' : GameScore,
    'players' : IDL.Vec(IDL.Principal),
    'isPlayer1' : IDL.Bool,
    'board' : Board,
  });
  const Response = IDL.Variant({
    'ok' : IDL.Tuple(GameId, GameState),
    'err' : IDL.Text,
  });
  const Move = IDL.Record({ 'hex' : IDL.Nat, 'magni' : MagniNFTId });
  const PlayerMove = IDL.Variant({ 'lead' : MagniNFTId, 'move' : Move });
  const GameData = IDL.Record({
    'magni' : IDL.Vec(IDL.Tuple(MagniId, Magni)),
    'boards' : IDL.Vec(IDL.Tuple(BoardId, Board)),
  });
  return IDL.Service({
    'addBoard' : IDL.Func([Board], [BoardId], []),
    'addMagni' : IDL.Func([Magni], [MagniId], []),
    'connect' : IDL.Func([], [IDL.Vec(IDL.Tuple(MagniNFTId, MagniNFT))], []),
    'gameCreate' : IDL.Func([GameOption, IDL.Vec(MagniNFTId)], [Response], []),
    'gameFetch' : IDL.Func([], [Response], []),
    'gameFind' : IDL.Func([IDL.Vec(MagniNFTId)], [Response], []),
    'gameJoin' : IDL.Func([GameHash, IDL.Vec(MagniNFTId)], [Response], []),
    'gameLeave' : IDL.Func([GameId], [Response], []),
    'gameMove' : IDL.Func([PlayerMove], [Response], []),
    'gamePoll' : IDL.Func([GameId], [Response], ['query']),
    'gameScore' : IDL.Func([GameId], [GameScore], ['query']),
    'getAllPlayerMagnis' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(MagniNFTId)))],
        ['query'],
      ),
    'getGameData' : IDL.Func([], [GameData], ['query']),
    'getMyMagni' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(MagniNFTId, MagniNFT))],
        ['query'],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
const init = ({ IDL }) => { return []; };
// EXTERNAL MODULE: ./node_modules/@dfinity/identity/lib/esm/index.js + 3 modules
var lib_esm = __webpack_require__(1565);
// EXTERNAL MODULE: ./node_modules/@dfinity/auth-client/lib/esm/index.js + 1 modules
var auth_client_lib_esm = __webpack_require__(3010);
// EXTERNAL MODULE: ./node_modules/howler/dist/howler.js
var howler = __webpack_require__(1766);
// EXTERNAL MODULE: ./node_modules/@toruslabs/openlogin/dist/openlogin.cjs.js
var openlogin_cjs = __webpack_require__(5747);
var openlogin_cjs_default = /*#__PURE__*/__webpack_require__.n(openlogin_cjs);
;// CONCATENATED MODULE: ./src/main.js
  
  




var AUTH, logintype;
const openlogin = new (openlogin_cjs_default())({
  clientId: "BHsvffJZzsm_Kb-xNOO9fGOZ2ciiMHlRjgBCeTRw18Io6OBE0QR4nd0R8AGZmL6wK9KFr9LbDeNNuj6yutSbTUA",
  network: "mainnet", // valid values (testnet or mainnet)
  uxMode : 'popup',
});
showLoader()
document.addEventListener('DOMContentLoaded', async () => {
  API = extjs.connect().idl('p5mob-qaaaa-aaaah-qaebq-cai', idlFactory).canister('p5mob-qaaaa-aaaah-qaebq-cai');
  AUTH = await auth_client_lib_esm/* AuthClient.create */.L.create();
  await openlogin.init();
  var GD = await API.getGameData();
  for(var i = 0; i < GD.magni.length; i++) {
    CONFIG.magni.push([GD.magni[i][1].name].concat(GD.magni[i][1].attack));
  };
  for(var i = 0; i < GD.boards.length; i++) {
    var _tb = [];
    CONFIG.boards[GD.boards[i][1].name.toLowerCase()] = GD.boards[i][1].hexs.map(a => a.coords);
  };
  document.addEventListener('click', ({ offsetX, offsetY }) => {
    if (typeof currentRoom.click != 'undefined'){
      currentRoom.click(offsetX, offsetY);
    }
  });
  hideLoader()
  rooms.login.enter();
});
window.addEventListener("beforeunload", function(e){
   unloadROTM();
}, false);
window.onbeforeunload = unloadROTM;
async function unloadROTM(){
  await ROTM.gameLeave();
  return null;
}
window.addEventListener('blur', () => {
  if (currentSound && !bgmuted) currentSound.mute(true);
});
window.addEventListener('focus', () => {
  if (currentSound && !bgmuted) currentSound.mute(false);
});
const updateGameState = (gs) => {
  if (!ROTM._intv) return;
  if (state == 'find') {
    if (gs.status.hasOwnProperty('lead')) {
      rooms.game.enter();
      SOUND.alert.play();
      ROTM._stopPolling();
      state = 'busy';
    };
  }
  if (state == 'busy') {
    if (gs.status.hasOwnProperty('lead')) {
      if (gameState == 1) { //We have submitted our lead
        if (gs.lead.length == 0 || !gs.isPlayer1) {
          //We need to resubmit ours
          gameState = 0;
          drawMessage("It was a tie - Choose another Strike Unit!");
          SOUND.alert.play();
          selectedHex.unhighlight();
          selectedHex = false;
          ROTM._stopPolling();
        } else {
          //Waiting
          //console.log("Waiting for opponent to choose their Strike Unit");
          //Keep polling
        }
      }
    };
    if (gs.status.hasOwnProperty('play')) {
      if (gameState == 1) {
        gameState = 2;
        selectedHex.clear();
        selectedHex = false;
        if (gs.isPlayer1) {
          currentPlayer = 1;
          otherPlayer = 2;
        } else {
          otherPlayer = 1;
          currentPlayer = 2;
        }
      }
      if (gs.isPlayer1 && gs.moves.length % 2 == 0) {
        isPlayersTurn = true;
        ROTM._stopPolling();
        SOUND.alert.play()
        drawMessage("It is your turn now - Deploy a Magni!");
      } else if (!gs.isPlayer1 && gs.moves.length % 2 == 1) {
        isPlayersTurn = true;
        ROTM._stopPolling();
        SOUND.alert.play()
        drawMessage("It is your turn now - Deploy a Magni!");
      } else {
        isPlayersTurn = false;
      }
    };
    if (gs.status.hasOwnProperty('ended')) {
      //state = 'free';
      ROTM._stopPolling();
      gameState = 3;
      //console.log(gs.status.ended);
      if (gs.status.ended.hasOwnProperty('noresult')) {
        drawMessage("Game over - "+gs.status.ended.noresult[2]+"!");       
        rooms.game.backButton.show()       
        SOUND.win.play()
      } else if (gs.status.ended.hasOwnProperty('result')) {
        drawMessage("Game over - you "+scoreMsg()+"!");
        if (scoreMsg() == "won") SOUND.win.play();
        else SOUND.lose.play();
        rooms.game.backButton.show()       
      }
      bgmusic();
    };
  };
  if (gs.moves.length > movesMade) {
    //console.log("Updating moves");
    for (var i = movesMade; i < gs.moves.length; i++) {
      var p = (i%2 == 0 ? 1 : 2);
      gamegrid[gs.moves[i][0]].isPlayerHex = (p == currentPlayer);
      gamegrid[gs.moves[i][0]].place(p, gs.moves[i][1], (p == currentPlayer ? CONFIG.colors.ally : CONFIG.colors.enemy));
      if (i >= 2) placeHex(gamegrid[gs.moves[i][0]]);
    }
    movesMade = gs.moves.length;
  };
  if (currentRoom == rooms.game) drawScore();
};

const fromHexString = (hex) => {
  if (hex.substr(0,2) === "0x") hex = hex.substr(2);
  for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}
const ROTM = {
  _gameState : false,
  _gameId : false,
  _intv : false,
  _clearPolling : () => {
    isPlayersTurn = false;
    if (ROTM._intv) clearInterval(ROTM._intv);
    ROTM._intv = false;
  },
  _stopPolling : () => {
    if (ROTM._intv) clearInterval(ROTM._intv);
    ROTM._intv = false;
  },
  _startPolling : () => {
    ROTM._intv = setInterval(() => {
      API.gamePoll(ROTM._gameId).then(r => {
        //console.log(r);
        if (r.hasOwnProperty("ok")){
          ROTM._gameState = r.ok[1];
          updateGameState(ROTM._gameState);
        } else {
          console.log(r.err);
        };
      });
    }, 1*1000);
  },
  inGame : () => {
    if (!ROTM._gameState) return false;
    if (ROTM._gameState.status.hasOwnProperty("#ended")) return false;
    return true;
  },
  /*
  gameCreate : (roster, poll) => {
    if (ROTM.inGame()) return;
  },
  gameJoin : async (roster, poll) => {
    if (ROTM.inGame()) return;
  },
  */
  gameFind : (roster, poll) => {
    return new Promise(async (resolve, reject) => {    
      if (ROTM.inGame()) reject("in game");
      var mids = roster.map(m => m[0]);
      
      API.gameFind(mids).then(resp => {
        if (resp.hasOwnProperty('ok')) {
          ROTM._gameId = resp.ok[0];
          ROTM._gameState = resp.ok[1];
          ROTM._startPolling();
          updateGameState(ROTM._gameState);
          resolve(ROTM._gameState);
        } else {
          reject(resp.err);
        };
      }).catch(reject);
    });
  },
  gamePractise : (roster, poll) => {
    return new Promise(async (resolve, reject) => {    
      if (ROTM.inGame()) reject("in game");
      var mids = roster.map(m => m[0]);
      
      API.gameCreate({
        practice : 0
      }, mids).then(resp => {
        if (resp.hasOwnProperty('ok')) {
          ROTM._gameId = resp.ok[0];
          ROTM._gameState = resp.ok[1];
          ROTM._startPolling();
          updateGameState(ROTM._gameState);
          resolve(ROTM._gameState);
        } else {
          reject(resp.err);
        };
      }).catch(reject);
    });
  },
  gameMove : async (magni, position) => {
    return new Promise(async (resolve, reject) => {    
      if (position) {
        API.gameMove({"move" : { hex : position, magni : magni[0] }}).then(resp => {
          //console.log(resp);
          if (resp.hasOwnProperty('ok')) {
            ROTM._gameState = resp.ok[1];
            movesMade++;
            ROTM._startPolling();
            updateGameState(ROTM._gameState);
            resolve(ROTM._gameState);
          } else {
            reject(resp.err);
          };
        }).catch(reject);
      } else {
        API.gameMove({"lead" : magni[0]}).then(resp => {
          if (resp.hasOwnProperty('ok')) {
            ROTM._gameState = resp.ok[1];
            ROTM._startPolling();
            updateGameState(ROTM._gameState);
            resolve(ROTM._gameState);
          } else {
            reject(resp.err);
          };
        }).catch(reject);   
      }
    });
  },
  gameEnd : () => {
    ROTM._clearPolling();
    ROTM._gameId = false;
    ROTM._gameState = false;    
  },
  gameLeave : async () => {
    ROTM._clearPolling();
    if (ROTM._gameId) await API.gameLeave(ROTM._gameId);
    ROTM._gameId = false;
    ROTM._gameState = false;    
  },
  connect : async () => {
    mymagni = await API.connect();
    //console.log(mymagni);
  },
  stats : async () => {
  
  },
  gs : () => {
    return ROTM._gameState;
  }
};

var rooms = {
  login : {
    draw : INNERDRAW.group(),
    enter : async () => {
      if (currentRoom) currentRoom.exit();
      currentRoom = rooms.login;
      currentRoom.draw.clear();
      
      showLoader();
      var id = await AUTH.getIdentity();
      if (id.getPrincipal().toString() != '2vxsx-fae') {
        logintype = 'ii';
        identity = id;
        API = extjs.connect("https://boundary.ic0.app/",identity).idl('p5mob-qaaaa-aaaah-qaebq-cai', idlFactory).canister('p5mob-qaaaa-aaaah-qaebq-cai');
        await ROTM.connect();
        setTimeout(() => {
          rooms.menu.enter();
          bgmusic('lobby');
        }, 200);
      };
      if (openlogin.privKey) {
        logintype = 'openlogin';
        identity = lib_esm/* Ed25519KeyIdentity.generate */.RM.generate(new Uint8Array(fromHexString(openlogin.privKey)));
        
        API = extjs.connect("https://boundary.ic0.app/",identity).idl('p5mob-qaaaa-aaaah-qaebq-cai', idlFactory).canister('p5mob-qaaaa-aaaah-qaebq-cai');
        await ROTM.connect();
        setTimeout(() => {
          rooms.menu.enter();
          bgmusic('lobby');
        }, 200);
      }
      hideLoader();
      setBackground('assets/bgs/menu.jpg');
      createButton(500,500,200,40,'Internet Identity', async () => {
        if (!identity) {
          showLoader();
          AUTH.login({
            maxTimeToLive : BigInt(24*60*60*1000000000),
            identityProvider: "https://identity.ic0.app/",
            onSuccess: async () => {
              logintype = 'ii';
              identity = await AUTH.getIdentity()
              
              API = extjs.connect("https://boundary.ic0.app/",identity).idl('p5mob-qaaaa-aaaah-qaebq-cai', idlFactory).canister('p5mob-qaaaa-aaaah-qaebq-cai');
              await ROTM.connect()
              hideLoader();
              rooms.menu.enter();
              bgmusic('lobby');
            },
            onError : () => {
              hideLoader();
              alert("Error logging in...");
            }
          });
        }
      });
      createButton(500,560,200,40,'Open Login', async () => {
        if (!identity) {
          showLoader();
          await openlogin.login();
          if (openlogin.privKey) {
            logintype = 'openlogin';
            identity = lib_esm/* Ed25519KeyIdentity.generate */.RM.generate(new Uint8Array(fromHexString(openlogin.privKey)));
            
            API = extjs.connect("https://boundary.ic0.app/",identity).idl('p5mob-qaaaa-aaaah-qaebq-cai', idlFactory).canister('p5mob-qaaaa-aaaah-qaebq-cai');
            await ROTM.connect()
            hideLoader();
            rooms.menu.enter();
            bgmusic('lobby');
          } else {
            hideLoader();
            alert("Error logging in...");
          }
          
        }
      });
      createButton(500,680,200,40,'Help', () => {
        window.open('https://toniqlabs.gitbook.io/rise-of-the-magni/', '_blank').focus();
      });
    },
    exit : () => {
      currentRoom.draw.clear();
    }
  },
  menu : {
    draw : INNERDRAW.group(),
    enter : () => {
      if (currentRoom) currentRoom.exit();
      currentRoom = rooms.menu;
      currentRoom.draw.clear();
      
      setBackground('assets/bgs/menu.jpg');
      createButton(500,500,200,40,'Adventure', () => {
        alert("Sorry, not available yet...!");
        //setTimeout(() => rooms.lobby.enter(0), 100);
      });
      createButton(500,560,200,40,'Training', () => {
        setTimeout(() => rooms.lobby.enter(1), 100);
      });
      createButton(500,620,200,40,'Online', () => {
        setTimeout(() => rooms.lobby.enter(2), 100);
      });
      createButton(500,680,200,40,'Settings', () => {
        setTimeout(() => rooms.settings.enter(), 100);
      });
      createButton(500,740,200,40,'Logout', () => {
        setTimeout(async () => {
          if (logintype == 'ii') {
            await AUTH.logout();            
          } else {
            await openlogin.logout();
          };
          identity = false;
          API = extjs.connect().idl('p5mob-qaaaa-aaaah-qaebq-cai', idlFactory).canister('p5mob-qaaaa-aaaah-qaebq-cai');
          rooms.login.enter()
        }, 100);
      });
    },
    exit : () => {
      currentRoom.draw.clear();
    }
  },
  settings : {
    draw : INNERDRAW.group(),
    enter : () => {
      if (currentRoom) currentRoom.exit();
      currentRoom = rooms.settings;
      currentRoom.draw.clear();
      
      setBackground('assets/bgs/menu.jpg');
      var msfx, umsfx, mbg, umbg; 
      msfx = createButton(500,500,200,40,'Mute SFX', () => {
        SOUND.alert.mute(true);
        SOUND.select.mute(true);
        SOUND.place.mute(true);
        SOUND.lose.mute(true);
        SOUND.win.mute(true);
        msfx.hide();
        umsfx.show();
        sfxmuted = true;
      });
      umsfx = createButton(500,500,200,40,'Unmute SFX', () => {
        SOUND.alert.mute(false);
        SOUND.select.mute(false);
        SOUND.place.mute(false);
        SOUND.lose.mute(false);
        SOUND.win.mute(false);
        umsfx.hide();
        msfx.show();
        sfxmuted = false;
      });
      if (sfxmuted) msfx.hide();
      else umsfx.hide();
      mbg = createButton(500,560,200,40,'Mute BG Music', () => {
        bgmuted = true;
        currentSound.mute(true)
        mbg.hide();
        umbg.show();
      });
      umbg = createButton(500,560,200,40,'Unmute BG Music', () => {
        bgmuted = false;
        currentSound.mute(false)
        mbg.show();
        umbg.hide();
      });
      if (bgmuted) mbg.hide();
      else umbg.hide();
      createButton(500,620,200,40,'Help', () => {
        window.open('https://toniqlabs.gitbook.io/rise-of-the-magni/', '_blank').focus();
      });
      createButton(500,680,200,40,'Back', () => {
        setTimeout(() => rooms.menu.enter(), 100);
      });
    },
    exit : () => {
      currentRoom.draw.clear();
    }
  },
  adventure : {
    draw : INNERDRAW.group(),
    chapter : false,
    stage : false,
    scene : false,
    clickHandler : false,
    inAdventureMode : false,
    enter : (c,s) => {
      if (currentRoom) currentRoom.exit();
      currentRoom = rooms.adventure;
      if (rooms.adventure.inAdventureMode) {
        currentRoom.draw.show();
      } else {
        rooms.adventure.inAdventureMode = true;
        currentRoom.draw.clear();
        
        rooms.adventure.scene = currentRoom.draw.group();
        
        rooms.adventure.chapter = 0;
        rooms.adventure.stage = 0;
        
        launchAdventure(c,s);
      }
    },
    exit : () => {
      if (!rooms.adventure.inAdventureMode)
        currentRoom.draw.clear();
      else
        currentRoom.draw.hide();
    },
    click : (offsetX, offsetY) => {
      if (rooms.adventure.clickHandler) {
        rooms.adventure.clickHandler();
      }
    }
  },
  lobby : {
    headerMessage : false,
    draw : INNERDRAW.group(),
    hexClickHandler : (offsetX, offsetY, hex) => {
      if (currentRoom != rooms.lobby) return;
      if (!buttonIsFree) return;
      buttonIsFree = false;
      var hexCoordinates = { x : hex.x, y : hex.y };
      //console.log(hex);
      if (hex.type == 'hero') {
        for(var i = 0; i < playergrid.length; i++) {
          if (playergrid[i].magni == false) {
            playergrid[i].isPlayerHex = true;
            playergrid[i].set(hex.magni, CONFIG.colors.hexBg);
            hex.removeCard();
            SOUND.select.play();
            updateSelectedTeam();
            break;
          }         
        }
      } else if (hex.type == 'team'){
        if (hex.magni !== false){
          for(var i = 0; i < herogrid.length; i++) {
            if (herogrid[i].magni == false) {
              herogrid[i].set(hex.magni, CONFIG.colors.hexBg);
              break;
            }         
          }
          hex.removeCard();
          SOUND.select.play();
          updateSelectedTeam();
        }
      } else if (hex.type == 'special'){
        var magnitomove = []
        SOUND.select.play();
        for(var i = 0; i < playergrid.length; i++) {
          if (playergrid[i].magni !== false) {
            magnitomove.push(playergrid[i].magni);
            playergrid[i].removeCard();
          } 
        }
        if (magnitomove.length > 0) {
          for(var i = 0; i < herogrid.length; i++) {
            if (herogrid[i].magni == false) {
              herogrid[i].set(magnitomove.pop(), CONFIG.colors.hexBg);
              if (magnitomove.length == 0) break;
            } 
          }
        }
        for(var i = 0; i < herogrid.length; i++) {
          if (CONFIG.starters[hex.magni][1].indexOf(herogrid[i].magni[1].magni) >= 0) {
            magnitomove.push(herogrid[i].magni);
            herogrid[i].removeCard();
            if (magnitomove.length == 10) break;
          }
        };
        for(var i = 0; i < magnitomove.length; i++) {
          playergrid[i].isPlayerHex = true;
          playergrid[i].set(magnitomove[i], CONFIG.colors.hexBg);
        };
        updateSelectedTeam();
      }
      drawCurrentRating();
      buttonIsFree = true;
    },
    gameMode : 0,
    enter : (gm) => {
      if (currentRoom) currentRoom.exit();
      currentRoom = rooms.lobby;
      currentRoom.draw.clear();
      if (typeof gm != 'undefined' && gm !== false) rooms.lobby.gameMode = gm;
      setBackground('assets/bgs/lobby.jpg');
      drawMessage("Select your team!");
      
      //Buttons
      var playOnlineBtn, backBtn, cancelBtn;
      if (rooms.lobby.gameMode == 0){
        createButton(1020,10,150,40,'Start Adventure', function(){
          if (isValidTeam()) {
            rooms.adventure.enter(0,0);
          } else {
            alert("Please select a full team with a rating of 23 or less");
          }
        });  
      } else if (rooms.lobby.gameMode == 1){
        createButton(1020,10,150,40,'Start Training', function(){
          if (isValidTeam()) {
            if (state != 'free') return;
            showLoader();
            ROTM.gamePractise(selectedTeam, updateGameState).then(() => {
              rooms.game.enter();
              SOUND.alert.play();
              ROTM._stopPolling();
              state = 'busy';
            }).catch(e => {
              state = 'free';
              alert(e);
            }).finally(() => {
              hideLoader();
            });
          } else {
            alert("Please select a full team with a rating of 23 or less");
          }
        });        
      } else if (rooms.lobby.gameMode == 2){
        playOnlineBtn = createButton(1020,10,150,40,'Play Online', () => {
          if (isValidTeam()) {
            if (state != 'free') return;
            showLoader();
            ROTM.gameFind(selectedTeam, updateGameState).then(() => {
              state = 'find';
              drawMessage("Finding a match...");
              playOnlineBtn.hide();
              backBtn.hide();
              cancelBtn.show();
            }).catch(e => {
              alert(e);
            }).finally(() => {
              hideLoader();
            });
          } else {
            alert("Please select a full team with a rating of 23 or less");
          }
        });
        cancelBtn = createButton(1020,60,150,40,'Cancel', () => {
          showLoader();
          ROTM.gameLeave().then(() => {
            state = 'free';
            drawMessage("Select your team!");
            cancelBtn.hide();
            playOnlineBtn.show();
            backBtn.show();
          }).catch(e => {
            alert(e);
          }).finally(() => {
            hideLoader();
          });
        });
        cancelBtn.hide();
        
      }
      
      backBtn = createButton(1020,60,150,40,'Back', function(){
        rooms.menu.enter();
      });  
      
      selectedHex = false;
      state = 'free';
      herogrid.map((hex, i) => {
        hex.init('hero', currentRoom.draw.group());
        if (i < mymagni.length) {
          if (selectedTeam.indexOf(mymagni[i]) < 0) hex.set(mymagni[i], CONFIG.colors.hexBg);
        }
      });
      playergrid.map((hex, i) => {
        hex.isPlayerHex = true;
        hex.init('team', currentRoom.draw.group());
        if (selectedTeam.length > i)
          hex.set(selectedTeam[i], CONFIG.colors.hexBg);
      });
      premadegrid.map((hex, i) => {
        hex.init('special', currentRoom.draw.group());
        hex.special(CONFIG.starters[i][0], i);
      });
      drawCurrentRating()
    },
    click : (offsetX, offsetY) => {

    },
    exit : () => {
      currentRoom.draw.clear();
      currentRoom.headerMessage = false;
      omd = false;
      rd = false;
    }
  },
  game : {
    headerMessage : false,
    draw : INNERDRAW.group(),
    hexClickHandler : (offsetX, offsetY, hex) => {
      if (gameState == 3) return;
      var hexCoordinates = { x : hex.x, y : hex.y };
      if (gameState == 0){
        if (hex.type == 'team') {
          selectedHex = hex;
          selectedHex.highlight(CONFIG.colors.ally)
          gameState = 1;
          drawMessage("Waiting for other player...");
          ROTM.gameMove(selectedHex.magni);
          SOUND.select.play();
        }
      } else if (gameState == 2){
        if (isPlayersTurn){
          if (hex.type == 'game') {
            if (hex.player == 0){
              if (selectedHex) {
                ROTM.gameMove(selectedHex.magni, hex.index);
                hex.isPlayerHex = true;
                isPlayersTurn = false;
                hex.place(currentPlayer, selectedHex.magni, CONFIG.colors.ally);
                SOUND.place.play();
                placeHex(hex, true);
                selectedHex.clear();
                drawMessage("Waiting for other player...");
              }
            }
          }
          if (hex.type == 'team' && hex.magni !== false) {
            if (selectedHex) selectedHex.unhighlight();
            hex.highlight(CONFIG.colors.ally)
            selectedHex = hex;
            SOUND.select.play();
          }
        }
      }
    },
    character : false,
    board : false,
    result : 0,
    playerScore : 0,
    opponentScore : 0,
    enter : (bbt, bbfn, board, character) => {
      if (currentRoom) currentRoom.exit();
      currentRoom = rooms.game;
      currentRoom.draw.clear();
      localScore = [0,0];
      bgmusic('battle');
      setBackground('assets/bgs/arena.jpg');
      selectedHex = false;
      gameState = 0;
      movesMade = 0;
      if (character) rooms.game.character = character;
      if (!bbt) bbt = "Back";
      if (!bbfn) bbfn = (r) => {    
        bgmusic('lobby');
        ROTM.gameEnd();
        rooms.lobby.enter()
      };
      if (!board) board = CONFIG.boards.standard;
      gamegrid = Grid(board);
      rooms.game.board = board;
      rooms.game.backButton = createButton(1020,10,150,40, bbt, () => {
        bbfn(rooms.game.result);
      });
      rooms.game.backButton.hide();
      
      //Draw game grid
      gamegrid.map((hex, i) => {
        hex.index = i;
        hex.magni = false;
        hex.player = 0;
        hex.init('game', currentRoom.draw.group());
      });
      var c = 0;
      playergrid.map(hex => {
        hex.isPlayerHex = true;
        hex.init('team', currentRoom.draw.group());
        hex.set(selectedTeam[c++], CONFIG.colors.hexBg);
      });
      
      //Reset variables
      drawMessage("Game found - Select your Strike Unit");
    },
    exit : () => {
      currentRoom.draw.clear();
      currentRoom.headerMessage = false;
      st1 = false;
      st2 = false;
      omd = false;
    }
  }
}
window.rooms = rooms;
window.ROTM = ROTM;


window.SOUND = {
  alert : new howler.Howl({src: ['assets/sounds/alert.mp3']}),
  battle : new howler.Howl({src: ['assets/sounds/battle.wav']}),
  lobby : new howler.Howl({src: ['assets/sounds/lobby.wav']}),
  lose : new howler.Howl({src: ['assets/sounds/lose.wav']}),
  place : new howler.Howl({src: ['assets/sounds/place.wav']}),
  select : new howler.Howl({src: ['assets/sounds/select.mp3']}),
  win : new howler.Howl({src: ['assets/sounds/win.mp3']}),
};
SOUND.battle.volume(0.5);
SOUND.alert.volume(0.2);
SOUND.select.volume(0.4);
SOUND.place.volume(0.1);
SOUND.lose.volume(0.1);
SOUND.win.volume(0.1);


/***/ }),

/***/ 6641:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 6601:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 9214:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 1156:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 2361:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 4616:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 5024:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			296: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkrotm_v2"] = self["webpackChunkrotm_v2"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [38], () => (__webpack_require__(5872)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map