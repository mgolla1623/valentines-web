/* Main component file for app. serves as the root of react application
   Define the structure and behavior of your app's UI here by combinig components
   and rendering them.
 */
   "use client";
   import { useState, useEffect, useRef} from "react";
   import "./HeartAnimation.css"; // Import the CSS file
   import val1 from "./images/valentines.gif";
   import val2 from "./images/newgirl.gif";
   import flower from "./images/flower.png";
   import flower1 from "./images/flower1.png";
   import flower2 from "./images/flower2.png";
   import flower3 from "./images/flower3.png";
   import flower5 from "./images/flower5.png";
   import flower6 from "./images/flower6.webp";
   
   interface FlowerImage {
     id: number;
     src: string;
     position: { left: string; bottom: string };
     size: { width: string; height: string }; // Manually defined size
   }
   
   export default function Page() {
     const [noCount, setNoCount] = useState(0);
     const [flowerImages, setFlowerImages] = useState<FlowerImage[]>([]); // Store flower images
     const [yesPressed, setYesPressed] = useState(false);
     const yesButtonSize = noCount * 20 + 16;

     const heartContainerRef = useRef<HTMLDivElement>(null);
   
     // Array of flower image sources
     const flowerSources = [flower, flower1, flower2, flower3, flower6, flower5] // All image sources for flowers
   
     // Function to handle 'No' button click
     const handleNoClick = () => {
       setNoCount(noCount + 1);
     };
   
     // Function to return a custom phrase for the 'No' button based on the count
     const getNoButtonText = () => {
       const phrases = [
         "No",
         "Are you sure?",
         "But, ",
         "What if I asked really nicely?",
         "Pretty please",
         "What about some chipotle?",
         "Srlsly, no?!",
         "PLEASE",
         "i WILL poke you",
         "No way you pressed no again",
         "I am going to die",
         "Yep im dead",
         "ok ur talking to my ghost",
         "please babe",
         ":((((",
         "PRETTY PLEASE",
         "Estoy muerto",
         "No :(",
       ];
   
       return phrases[Math.min(noCount, phrases.length - 1)];
     };
   
     // Function to add new images at random positions with predefined sizes
     useEffect(() => {
       const timers: number[] = [];
   
       // Manually set the sizes for each flower
       const flowerSizes = [
         { width: "100px", height: "150px" },
         { width: "100px", height: "140px" },
         { width: "60px", height: "125px" },
         { width: "70px", height: "135px" },
         { width: "100px", height: "140px" },
         { width: "70px", height: "130px" },

       ];
   
       for (let i = 1; i <= 50; i++) {
         const delay = i * 4000; // Images appear at intervals of 3 seconds
         const timer = window.setTimeout(() => {
          const sizeIndex = i % flowerSizes.length;
          const srcIndex = i % flowerSources.length;
          // Set flower size and source based on the index
          const randomSize = flowerSizes[sizeIndex];
          const selectedFlower = flowerSources[srcIndex];
           //const randomSize = flowerSizes[i % flowerSizes.length]; // Alternate between predefined sizes
           setFlowerImages((prev) => [
             ...prev,
             {
               id: i,
               src: selectedFlower, 
               position: {
                 left: `${Math.random() * 90}%`, // Random horizontal position
                 bottom: "0",
               },
               size: randomSize, // Use predefined sizes
             },
           ]);
         }, delay);
         timers.push(timer); // Add timeout ID to the array
       }
   
       return () => timers.forEach(window.clearTimeout);
     }, []);

     useEffect(() => {
      const duration = 4000;
      const speed = 0.5;
      const cursorXOffset = 0;
      const cursorYOffset = -5;
      let hearts: (HTMLDivElement & { 
        time: number; 
        x: number; 
        y: number; 
        bound: number; 
        direction: number; 
        scale: number;
      })[] = [];
    
      function generateHeart(
        x: number,
        y: number,
        xBound: number,
        xStart: number,
        scale: number
      ) {
        if (!heartContainerRef.current) return;
    
        const heart = document.createElement("div") as HTMLDivElement & { 
          time: number; 
          x: number; 
          y: number; 
          bound: number; 
          direction: number; 
          scale: number;
        };
        
        heart.className = "heart";
        heartContainerRef.current.appendChild(heart);
    
        heart.time = duration;
        heart.x = x;
        heart.y = y;
        heart.bound = xBound;
        heart.direction = xStart;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.scale = scale;
        heart.style.transform = `scale(${scale}, ${scale})`;
    
        hearts.push(heart);
      }
    
      function frame() {
        hearts = hearts.filter((heart) => {
          heart.time -= 16;
          if (heart.time > 0) {
            heart.y -= speed;
            heart.style.top = `${heart.y}px`;
            heart.style.left = `${
              heart.x +
              (heart.direction * heart.bound * Math.sin((heart.y * heart.scale) / 30)) / heart.y * 200
            }px`;
            return true;
          } else {
            heart.remove();
            return false;
          }
        });
      }
    
      const onMouseMove = (e: MouseEvent) => {
        const start = 1 - Math.round(Math.random()) * 2;
        const scale = Math.random() * Math.random() * 0.8 + 0.2;
        const bound = 20 + Math.random() * 30;
        generateHeart(
          e.pageX + cursorXOffset,
          e.pageY + cursorYOffset,
          bound,
          start,
          scale
        );
      };
    
      document.addEventListener("mousemove", onMouseMove);
    
      const frameInterval = setInterval(frame, 16);
    
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        clearInterval(frameInterval);
      };
    }, []);
    
    return (
      <div className="relative flex h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-pink-200 overflow-hidden">
        
        {/* Heart animation container */}
        <div
          ref={heartContainerRef}
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        ></div>
        
        {yesPressed ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              className="w-64 h-64 shadow-lg"
              alt="Celebration GIF"
            />
            <div className="my-4 text-4xl font-bold text-white animate-bounce">
              WOOOOOO!!! THE BEST VALENTINE EVER!! I love you!!
            </div>
          </div>
        ) : (
          <>
            <img className="h-[200px]" src={val1} alt="Valentine's Image" />
    
            <h1 className="text-52xl font-extrabold text-white drop-shadow-lg">
              Will you be my Valentine?
            </h1>
            <div className="flex items-center">
              <div className="flex items-center mt-6 space-x-4">
                <button
                  className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
                  style={{ fontSize: yesButtonSize }}
                  onClick={() => setYesPressed(true)}
                >
                  Yes
                </button>
                <button
                  onClick={handleNoClick}
                  className="rounded bg-red-500 px-6 py-3 font-bold text-white shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                  {noCount === 0 ? "No" : getNoButtonText()}
                </button>
              </div>
            </div>
    
            {/* Render flower images */}
            {flowerImages.map((image) => (
              <img
                key={image.id}
                src={image.src}
                alt={`Flower ${image.id}`}
                style={{
                  position: "absolute",
                  left: image.position.left,
                  bottom: image.position.bottom,
                  width: image.size.width, // Manually set width
                  height: image.size.height, // Manually set height
                }}
              />
            ))}
          </>
        )}
      </div>
    );
    
   }
   

