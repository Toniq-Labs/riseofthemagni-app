const CONFIG = {
  adventure : [
    [

      {
        type : 'title',
        title: "Chapter 1",
        subtitle: "The Invasion",
        delay : 1,
      },
      {
        type : 'overlay',
        background: "assets/bg2.jpg",
        delay : 1,
      },
      {
        type : 'chat',
        character : 'leo',
        text : "So, you want to be a commander?",
        side : "left"
      },
      {
        type : 'chat',
        character : 'leo',
        text : "Well what are you waiting for? Beat the \nenemy in this small battle now!",
        side : "left"
      },
      {
        type: 'battle',
        background: "assets/bg.jpg",
        audio: false,
        character : 'baard',
        result : {
          win : ['next', 1],
          lose : 'next',
          draw : 'next',
        },
        board: 'small',
        cards: [6,7,8,9]
      },
      {
        type : 'chat',
        background: "assets/bg2.jpg",
        character : 'leo',
        text : "Thought that would be too hard for you!",
        side : "left"
      },
      {
        type : 'chat',
        background: "assets/bg2.jpg",
        character : 'leo',
        text : "Here's an easier one for you!",
        side : "left"
      },
      {
        type : 'chat',
        character : 'baard',
        text : "I eat wannabes like you for breakfast!",
        side : "right"
      },
      {
        type: 'battle',
        backgroundColor: 'transparent',
        background: "assets/bg.jpg",
        audio: false,
        character : 'baard',
        board: 'small',
        cards: [16,17,18,19]
      },
      {
        type : 'chat',
        character : 'baard',
        text : "Wow, yyy-yo-ou beat me...?",
        side : "right"
      },
      {
        type : 'chat',
        character : 'leo',
        text : "Nice win!",
        side : "left"
      },
     {
        type : 'title',
        title: "Chapter 2",
        subtitle: "The Isles",
        backgroundColor: 'black',
        background: false,
        delay : 3,
      },
    ]
  ],
  characters : {
    leo : {
      name : "Leo",
      image : 'assets/characters/leo.png',
    },
    baard : {
      name : "Baard",
      image : 'assets/characters/baard.png',
      win: ["Easy as!", "Is that it?"],
      defeat: ["This can't be! RETREAT!"],
      draw: ["Hm... well this is awkward..."],
      thinking: ["Are you ready for this?"],
      place: ["Hah! Take that you scum!"]
    },
    unknown : {
      name : "Unknown",
      image : 'assets/characters/leo.png',
    },
  },
  colors : {
    ally : '#3f47cc',
    enemy : '#ed1b24',
    hexBg : '#ddd',
  },
  fonts : {
    units : {
      size: 12, 
      anchor:   'middle', 
      family:"Verdana", 
      weight:'bold'
    },
    buttons : {
      size: 12, 
      anchor:   'middle', 
      family:"Verdana", 
      weight:'bold'
    },
    ratings : {
      size: 18, 
      anchor:   'middle', 
      family:"Verdana", 
      weight:'bold'
    },
    messages : {
      size: 25, 
      anchor:   'middle', 
      family:"Verdana", 
      weight:'bold'
    },
    title : {
      size: 50, 
      anchor:   'middle', 
      family:"Verdana", 
      weight:'bold'
    },
    subtitle : {
      size: 22, 
      anchor:   'middle', 
      family:"Verdana", 
      weight:'bold'
    },
    chat : {
      size: 22, 
      anchor:   'left', 
      family:"Verdana", 
      weight:'bold'
    }
  },
  starters : [
    ["Aggressive", [4,1,2,5,11,14,16,17,18,19]],
    ["Defensive", [2,5,7,9,10,11,13,14,18,19]],
    ["Balanced", [4,5,7,9,10,11,13,14,18,19]]
  ],
  magni : [],
  boards : {}
};