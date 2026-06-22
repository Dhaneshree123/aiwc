// =====================================

// ARCHAI WEBSITE JAVASCRIPT

// =====================================



// Navbar Shadow



window.addEventListener("scroll", () => {



    const navbar =

    document.querySelector(".navbar");



    if(window.scrollY > 50){



        navbar.style.boxShadow =

        "0 10px 40px rgba(0,0,0,.3)";



    }

    else{



        navbar.style.boxShadow = "none";



    }



});





// =====================================

// Smooth Scroll

// =====================================



document.querySelectorAll('a[href^="#"]')

.forEach(anchor => {



    anchor.addEventListener("click", function(e){



        e.preventDefault();



        const target =

        document.querySelector(

            this.getAttribute("href")

        );



        target.scrollIntoView({

            behavior:"smooth"

        });



    });



});





// =====================================

// FAQ Accordion

// =====================================



const faqButtons =

document.querySelectorAll(".faq-btn");



faqButtons.forEach(button => {



    button.addEventListener("click", () => {



        const item =

        button.parentElement;



        item.classList.toggle("active");



    });



});





// =====================================

// Fade In Animation

// =====================================



const observer =

new IntersectionObserver(entries => {



    entries.forEach(entry => {



        if(entry.isIntersecting){



            entry.target.classList.add("show");



        }



    });



});



document.querySelectorAll(

".feature-card,.gallery-card,.testimonial,.member,.step,.stat-card"

).forEach(el => {



    el.classList.add("hidden");



    observer.observe(el);



});





// =====================================

// Typing Effect Hero

// =====================================



const words = [



"Minimalist Living Room",

"Luxury Penthouse",

"Scandinavian Kitchen",

"Modern Home Office",

"Japandi Bedroom"



];



let wordIndex = 0;



let charIndex = 0;



const heroInput =

document.querySelector(".prompt-box input");



function typeText(){



    if(!heroInput) return;



    heroInput.placeholder =

    words[wordIndex].substring(

        0,

        charIndex++

    );



    if(charIndex >

       words[wordIndex].length){



        setTimeout(() => {



            charIndex = 0;



            wordIndex++;



            if(wordIndex >= words.length){

                wordIndex = 0;

            }



        },1500);



    }



}



setInterval(typeText,120);





// =====================================

// Gallery Hover Glow

// =====================================



document.querySelectorAll(

".gallery-card"

).forEach(card=>{



    card.addEventListener("mousemove",e=>{



        const rect =

        card.getBoundingClientRect();



        const x =

        e.clientX - rect.left;



        const y =

        e.clientY - rect.top;



        card.style.setProperty(

            "--x",

            `${x}px`

        );



        card.style.setProperty(

            "--y",

            `${y}px`

        );



    });



});





// =====================================

// Image Modal Viewer

// =====================================



const galleryImages =

document.querySelectorAll(".gallery-card img");



const modal =

document.createElement("div");



modal.classList.add("image-modal");



modal.innerHTML = `

<img id="modal-image">

`;



document.body.appendChild(modal);



galleryImages.forEach(image=>{



    image.addEventListener("click",()=>{



        modal.classList.add("active");



        document

        .getElementById("modal-image")

        .src = image.src;



    });



});



modal.addEventListener("click",()=>{



    modal.classList.remove("active");



});





// =====================================

// Counter Animation

// =====================================



const counters =

document.querySelectorAll(".stat-card h2");



counters.forEach(counter=>{



    const updateCounter = ()=>{



        const target =

        counter.innerText;



        const numeric =

        parseInt(

            target.replace(/\D/g,"")

        );



        let current = 0;



        const increment =

        numeric / 80;



        const run = ()=>{



            current += increment;



            if(current < numeric){



                counter.innerText =

                Math.floor(current) + "+";



                requestAnimationFrame(run);



            }

            else{



                counter.innerText =

                target;



            }



        };



        run();



    };



    const statObserver =

    new IntersectionObserver(entries=>{



        if(entries[0].isIntersecting){



            updateCounter();



            statObserver.disconnect();



        }



    });



    statObserver.observe(counter);



});





// =====================================

// Active Navbar Highlight

// =====================================



const sections =

document.querySelectorAll("section");



const navLinks =

document.querySelectorAll(".nav-links a");



window.addEventListener("scroll",()=>{



    let current = "";



    sections.forEach(section=>{



        const top =

        section.offsetTop - 150;



        if(window.scrollY >= top){



            current = section.id;



        }



    });



    navLinks.forEach(link=>{



        link.classList.remove("active");



        if(

            link.getAttribute("href")

            === `#${current}`

        ){



            link.classList.add("active");



        }



    });



});





// =====================================

// CTA Button

// =====================================



const generateButtons =

document.querySelectorAll(

".primary-btn,.prompt-box button"

);


async function generateImage() {
    const promptInput = document.querySelector(".prompt-box input");
    
    // 1. Ensure you have an <img> tag with id="generated-image" in your index.html
    const imageElement = document.getElementById("generated-image");

    const prompt = promptInput.value.trim();

    if (!prompt) {
        alert("Enter prompt");
        return;
    }

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        const text = await response.text(); 

        try {
            const data = JSON.parse(text); 

            if (data.error) {
                alert("Error from server: " + data.error);
                return;
            }

            // 2. Look for 'image' (Base64 data string) instead of 'image_url'
            if (data.image) {
                
                // If it's a raw base64 string, prepend the source type declaration
                if (!data.image.startsWith('data:image')) {
                    imageElement.src = "data:image/png;base64," + data.image;
                } else {
                    imageElement.src = data.image;
                }
                
                console.log("Image source updated successfully!");

            } else if (data.image_url) {
                // Fallback in case your setup sends a direct URL link instead
                imageElement.src = data.image_url;
            } else {
                alert("No image or image string found in the server response.");
                console.log("Keys received:", Object.keys(data));
            }

        } catch (e) {
            console.error("Not a valid JSON response:", text);
            alert("Server returned bad data formatting.");
        }

    } catch (error) {
        console.error("Fetch request failed:", error);
        alert("Request failed to reach local server.");
    }
}






// async function generateImage() {
//     const promptInput = document.querySelector(".prompt-box input");
//     const imageElement = document.getElementById("generated-image");

//     const prompt = promptInput.value.trim();

//     if (!prompt) {
//         alert("Enter prompt");
//         return;
//     }

//     try {
//         const response = await fetch("/generate", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ prompt })
//         });

//         const text = await response.text(); // 👈 important

//         try {
//             const data = JSON.parse(text); // try JSON

//             if (data.image_url) {
//                 imageElement.src = data.image_url;
//             } else {
//                 alert("No image returned");
//             }

//         } catch {
//             console.error("Not JSON response:", text);
//             alert("Server returned error (check backend)");
//         }

//     } catch (error) {
//         console.error(error);
//         alert("Request failed");
//     }
// }