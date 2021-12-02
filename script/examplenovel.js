/* section for images to be preloaded*/
var preload = [
    "images/pikapika.png",
    "images/ari2.png","images/ari3.png",
    "images/HI1.png","images/HI2.png", 
    "images/HI3.png", "images/pikapi.png",
    "images/HI4.jpg",
  ];
  
  /* preloads images*/
  var preloadObj = new Array(preload.length);
  for (var i = 0; i < preload.length; i++)
  {
      preloadObj[i] = new Image();
      preloadObj[i].src = preload[i];
  }

  /* variables for characters, positions, and text blocks */
  var script; // this variable will hold your script
  var tyler;
  var gavin;
  var n; 
  var photo;
  var textBlock;
  
  var leftSide;
  var rightSide;
  var upperCenter;
  var rightTop;

  /* This function must exist for the engine */
  function prepareNovel()
  {
      novel.imagePath = "images/"; // path to image directory

      // initialize characters, positions, and text blocks 
      pikachu = new Character("Pikachu", {color: "rgb(64, 204, 64)"});
      ariana = new Character("Ariana Grande", {color: "#ffff00"});
      n = new Character("");
      
      leftSide = new Position(0, 1, 0, .90);
      rightSide = new Position(800, 450, 1, 0.8);
      upperCenter = new Position(0.5, 0.3, 0.5, 0.2);
      rightTop = new Position(1, 0.1, 1, 0);
      
      photo = new Character("");  
      titleText = new TextBlock("myText");


      
      // script command in array
      script = [
          label, "start",
          scene, "HI1.png",
          n, "That day...it wasn't just a typical day for me..",
          n, "And when that long-awaited day finally came, i felt proud in a way I can't really put into words.",
          n, "I felt like...I had just become a part of something greater than myself. Does that make sense?",
          n, "Actually, that's exactly what it was like...I was truly in a dream.",
          n, "Hyper Island...",
          n, "That place was so much more than a school for me.",
          scene, "HI2.png",
          n, "Huh...?",
          n, "There is a girl standing next to the school with some type of pet beside her..I can't really see clearly from this distance.",
          n, "She looks familliar, I can't really put my finger on where I have seen her, I should go to her and say hi.",
          scene, "HI3.png",
          ariana, {image: "ari2.png", position: leftSide},
          ariana, "Hey, Pikachu, where are you?",
          pikachu, {position: rightTop, image: "pikapika.png"},
          ariana, {image: "ari2.png"},
          pikachu, "Pika pika!",
          ariana, "Please come down here. It&rsquo;s easier to talk with you.",
          pikachu, {position: rightSide, image: "pikapi.png"},
          pikachu, "Pika pi?",
          ariana, "Much better, thanks!",
          n, "What the hell am I witnessing outside my school. The worlds most famous pop-star together with a Pokémon!? Wait, does Pokémon even exist!?",
          
          label, "menu1",
          menu, [
              "There are way too many questions going on in my head right now. What business does Ariana Grande have with Hyper island? What should I say to her?",
              "Excuse me, I am a student of Hyper Island, may I ask you why you are visiting my school?", [jump, "wild"],
              "ARI I LOVE YOU SO MUCH!!! PLEASE SIGN MY AUTOGRAPH!!", [jump, "tame"],
          ],
          
          label, "wild",
          scene, "HI3.png",
          ariana, {position: leftSide},
          pikachu, {position: rightSide},
          pikachu, "PIKA PIKA PIKA PIKA PIKAAAA PIKA PIKA PIKA PIKA PIKAAAA PIKA PIKA PIKA PIKA PIKAAAA",
          ariana, "Don't mind Pikachu, he's a special boy.",
          pikachu, "Not what you expected from seeing the cartoons, is it?",
          pikachu, "Pika pi!",
          ariana, "Aaanyways, you have to help us. The deadline for our project is coming close and we are far away from being finished!",
          ariana, "Soooo..can you help us? You look like a nerd fit for the job.",
          n, "Me? (Ouch, maybe I should have skipped the grey tshirt and jeans today..)",
          ariana, "Yuh! You! You look like you can code some LavaScript for us!",
          n, "Ah, yes sure. (You mean JavaScript...)",
          ariana, "Follow me nerd!",
          scene, "HI4.jpg",
          ariana, {image: "ari3.png", position: upperCenter},
          ariana, "I knew that I could count on you! Sooo you have help us to catch the coffee cups from Roots Café and avoid the evil bugs chasing after us while we code- U get it?",
          ariana, "To play as Me, use the keys W,A,S,D! To play as pikachu- just use the arrow keys! Press the button start game below and you will figure out the rest!",
          jump, "The End",

          titleText, {text: "Pika and Aris Great Adventure 2: Big Trouble at Hyper Island!",
              width: 0.5, color: "white", border: "1px solid black",
              backgroundColor: "#800",
              position: new Position(0.25, 0.3), align: "center"},
          
          label, "tame",
          scene, "HI3.png",
          ariana, {position: leftSide},
          pikachu, {position: rightSide},
          ariana, "EW A STALKE-I feel like the luckiest girl in the world, I have the best fans!",
          pikachu, "PIIIIKAAACHUUUUUU",
          ariana, "Thank U, next.",
          ariana, "Aaanyways, you have to help us. The deadline for our project is coming close and we are far away from being finished!",
          ariana, "Soooo..can you help us? You look like a nerd fit for the job.",
          n, "Me? (Ouch, maybe I should have skipped the grey tshirt and jeans today..)",
          ariana, "Yuh! You! You look like you can code some LavaScript for us!",
          n, "Ah, yes sure. (You mean JavaScript...)",
          ariana, "Follow me nerd!",
          scene, "HI4.jpg",
          ariana, {image: "ari3.png", position: upperCenter},
          ariana, "I knew that I could count on you! Sooo you have help us to catch the coffee cups from Roots Café and avoid the evil bugs chasing after us while we code- U get it?",
          ariana, "To play as Me, use the keys W,A,S,D! To play as pikachu- just use the arrow keys! Press the button start game below and you will figure out the rest!",
          jump, "The End",

          label, "The End",
          titleText, {text: "Pika and Aris Great Adventure 2: Big Trouble at Hyper Island!",
          width: 0.5, color: "white", border: "1px solid black",
          backgroundColor: "#800",
          position: new Position(0.25, 0.1), align: "center"},
      ];
  }
  