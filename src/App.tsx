/* Main component file for app. serves as the root of react application
   Define the structure and behavior of your app's UI here by combinig components
   and rendering them.
 */
"use client";
import { useState, useEffect } from "react";
import val2 from "./images/newgirl.gif";
import val1 from "./images/valentines.gif";
import flower from "./images/flower.png";
import flower1 from "./images/flower1.png";
import flower2 from "./images/flower2.png";

interface FlowerImage {
  id: number;
  src: string;
  position: string;
}



// Main function that handles the "Yes" and "No" button interaction
export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [flowerImages, setFlowerImages] = useState<FlowerImage[]>([]); // Store flower images
  const [yesPressed, setYesPressed] = useState(false);
  // const [intervals, setIntervals] = useState<Interval[]>([]); // Define the type of state
  // const [showImage, setShowImage] = useState(false); // State for delayed image
  const yesButtonSize = noCount * 20 + 16;

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

    // Return a phrase from the array based on the 'No' count, up to a max
    return phrases[Math.min(noCount, phrases.length - 1)];
  };
  // Function to add new images at random positions
  useEffect(() => {
    const timers: number[] = []; // Use 'number[]' for browser environments
    const images = [flower, flower, flower2]; // All image sources

    for (let i = 1; i <= 200; i++) {
      const delay = i * 3000; // Images appear at intervals of 3 seconds
      const timer = window.setTimeout(() => {
        setFlowerImages((prev) => [
          ...prev,
          {
            id: i,
            src: images[Math.floor(Math.random() * images.length)], // Random image
            // src: i % 2 === 0 ? val1 : val2, // Alternate between images
            position: `${Math.random() * 90}%`, // Random horizontal position
          },
        ]);
      }, delay);
      timers.push(timer); // Add timeout ID to the array
    }

    // Cleanup function to clear timeouts
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


          {/* Main Content */}
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
                bottom: 0,
                left: image.position,
              }}
              className="w-16 h-25"
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
