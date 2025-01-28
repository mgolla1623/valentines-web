/* Main component file for app. serves as the root of react application
   Define the structure and behavior of your app's UI here by combinig components
   and rendering them.
 */
   "use client";
   import { useState, useEffect } from "react";
   import val1 from "./images/valentines.gif";
   import val2 from "./images/newgirl.gif";
   import flower from "./images/flower.png";
   import flower1 from "./images/flower1.png";
   import flower2 from "./images/flower2.png";
   import flower3 from "./images/flower3.png";
   import flower4 from "./images/flower4.png";
   import flower5 from "./images/flower5.png";
   
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
   
     // Array of flower image sources
     const flowerSources = [flower, flower1, flower2, flower3, flower4, flower5]; // All image sources for flowers
   
     // Function to handle 'No' button click
     const handleNoClick = () => {
       setNoCount(noCount + 1);
     };
   
     // Function to return a custom phrase for the 'No' button based on the count
     const getNoButtonText = () => {
       const phrases = [
         "No",
         "Are you sure?",
         "What if I asked really nicely?",
         "Pretty please",
         "What about some chipotle?",
         "Srlsly, no?!",
         "PLEASE POOKIE",
         "But, ",
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
         { width: "90px", height: "140px" },
         { width: "60px", height: "140px" },
         { width: "60px", height: "100px" },
         { width: "70px", height: "140px" },
         { width: "70px", height: "140px" },
         { width: "70px", height: "140px" },

       ];
   
       for (let i = 1; i <= 50; i++) {
         const delay = i * 3000; // Images appear at intervals of 3 seconds
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
   
     return (
       <div className="relative flex h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-pink-200 overflow-hidden">
         {yesPressed ? (
           <div className="flex flex-col items-center justify-center">
             <img
               src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
               className="w-64 h-64 rounded-full shadow-lg"
               alt="Celebration GIF"
             />
             <div className="my-4 text-4xl font-bold text-white animate-bounce">
               WOOOOOO!!! I love you pookie!! ;))
             </div>
           </div>
         ) : (
           <>
             <img className="h-[200px]" src={val1} alt="Valentine's Image" />
   
             <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
               Will you be my Valentine? 💘
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
   


/*
 const scatteredImages = [
  { src: val1, alt: "Valentine's GIF 1", style: { top: "5%", left: "5%" } },
  { src: val2, alt: "New Girl GIF", style: { top: "5%", right: "5%" } },
  { src: val1, alt: "Hearts GIF", style: { bottom: "5%", left: "5%" } },
  { src: val2, alt: "Love Bear GIF", style: { bottom: "5%", right: "5%" } },
];
 
{scatteredImages.map((img, index) => (
  <img
    key={index}
    src={img.src}
    alt={img.alt}
    className="absolute w-40 h-40 rounded-full shadow-lg"
    style={img.style}
  />
))}
*/
