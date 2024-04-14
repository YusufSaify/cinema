const form = document.querySelector('#searchForm');
const imgs = document.querySelector('.imgs');
let previousResult = "";
let totalResults = 0;


const messages = [
    "We hit the jackpot with these results!",
    "Search results pouring in like gifts!",
    "Surprise, our search results are booming!",
    "Search results multiplying like rabbits!",
    "Gold found in our search results—celebrate!"
];

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

const noDataMessages = [
    "Oops! No data found for your search.",
    "Looks like we couldn't find any results. Try a different search term!",
    "Sorry, no results found. Keep searching!",
    "Hmm... It seems there's no data matching your search. Please try again!",
    "No luck this time! Maybe try a different search term?"
];

function getRandomNoDataMessage() {
    const randomIndex = Math.floor(Math.random() * noDataMessages.length);
    return noDataMessages[randomIndex];
}

const greetings = [
    "Welcome aboard! We're thrilled to have you!",
    "Hello and welcome! We're so glad you're here!",
    "Hi there! Welcome to our community!",
    "Hey, new friend! Welcome to the team!",
    "Greetings and salutations! Welcome to our family!"
];

function getRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}
showmassage(getRandomGreeting(), 2000);
fetchcall('MostPopular');


form.addEventListener('submit', async e => {
    e.preventDefault(); // Prevent form submission if Enter key is pressed
    let search = document.querySelector(".search").value;

    fetchcall(search);
})

function fetchcall(search) {

    let api_key = 'api_key=8b703a2ef56ef8b68131af06e472ff31';
    let base_url = 'https://api.themoviedb.org/3';
    let api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
    const img_url = 'https://image.tmdb.org/t/p/w500';
    let search_url = base_url + '/search/movie?' + api_key;
    getmovies(api_url);
    getmovies(search_url + '&query=' + search);
    function getmovies(url) {
        fetch(url)
            .then((res) => res.json())
            .then(data => show(data.results));

    }
}

// form.elements.query.addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//         e.preventDefault(); // Prevent form submission if Enter key is pressed
//     }
// });
const uniqueResults = new Set(); // Initialize a Set to store unique results

const show = (details) => {
    if (details.length > 0) {
        showmassage(getRandomMessage(), 10000);

        let newResultHTML = "";
        removeAllChildNodes(imgs);

        for (let result of details) {
            if (result.poster_path) {
                // console.log(result.backdrop_path)
                // Check if the result is already in the set
                if (!uniqueResults.has(result.id)) {
                    // Add the result to the set if it's not already present
                    uniqueResults.add(result.id);

                    // Creating HTML for each show
                    newResultHTML += `
                        <div class="eachShowDiv"  style="--color: ${getRandomColor()}; --bg: url('https://image.tmdb.org/t/p/w500${result.backdrop_path}');"  data-id="${result.id}">
                            <img class="poster" src="${'https://image.tmdb.org/t/p/w500' + result.poster_path
                        }"> 
                            <div class="detailsDiv" >
                                <p class="titleName"><span>NAME</span><br>${result.original_title}</p>
                                ${result.vote_average ? `<p class="language"><span>RATING</span><br>${result.vote_average}</p>` : ''}
                                ${result.original_language ? `<p class="language"><span>LANGUAGE</span><br>${result.original_language
                            }</p>` : ''}
                              
                            </div>
                        </div>`;
                }
            }
        }

        // Append previous result HTML to new result HTML
        newResultHTML += previousResult;

        // Update the .imgs element with the new result HTML
        imgs.innerHTML = newResultHTML;

        // Update previousResult to store the current result HTML
        previousResult = newResultHTML;

        effect();
    } else {
        showmassage(getRandomNoDataMessage(), 4000);
    }
}
function showmassage(massage, time) {
    if (document.querySelector(".massage").innerHTML == '' || document.querySelector(".massage").innerHTML == ' ') {

        document.querySelector(".massage").innerHTML = massage;
        setTimeout(() => {
            document.querySelector(".massage").innerHTML = "";
        }, time);
    }
}

setInterval(() => {
    showmassage("Try CINEMA by clicking on सिनेमा :)", 5000);
}, 10000)

function goto(link) {
    const newTab = window.open();
    newTab.opener = null;
    newTab.location.href = link;

}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function effect() {

    // console.log("effect chla")
    const cards = document.querySelectorAll('.eachShowDiv');

    cards.forEach(card => {
        card.addEventListener('mouseover', () => {

            const computedStyle = window.getComputedStyle(card);

            // Access the value of the CSS custom property (--bg)
            const bgValue = computedStyle.getPropertyValue('--bg');
            // Update the background image of the body
            // document.body.style.backgroundImage = `${bgValue}`;
            console.log(bgValue)

            cards.forEach(c => c.classList.add('low-opacity'));
            card.classList.remove('low-opacity');
        });
        card.addEventListener('mouseout', () => {
            cards.forEach(c => c.classList.remove('low-opacity'));
        });
    });
}

function getRandomColor() {
    const goldenRatioConjugate = 0.618033988749895;
    let hue = (Math.random() + goldenRatioConjugate) % 1; // Start at a random hue
    const saturation = 0.5; // Keep saturation constant for vibrant colors
    const lightness = 0.6; // Keep lightness constant for easy readability

    // Convert HSL to RGB
    const hslToRgb = (h, s, l) => {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // Achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    };

    const color = hslToRgb(hue, saturation, lightness);
    return color;
}
addHoverTilt();

// Function to add hover tilt effect
function addHoverTilt() {
    const cards = document.querySelectorAll('.eachShowDiv');
    const container = document.querySelector('.imgs');
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    cards.forEach(card => {
        card.addEventListener('mouseenter', function (event) {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            let rotateDirection;

            // Determine rotation direction based on card position
            if (cardCenter < containerCenter) {
                rotateDirection = 1; // Card is on the left side, rotate left
            } else if (cardCenter > containerCenter) {
                rotateDirection = -1; // Card is on the right side, rotate right
            } else {
                rotateDirection = 0; // Card is in the center, no tilt
            }

            const rotateDeg = Math.random() * 4; // Random rotation degree
            const scaleValue = 1.1; // Scale factor

            // Apply transform properties
            console.log(rotateDeg)
            card.style.setProperty('--rotate-direction', rotateDirection);
            card.style.setProperty('--rotate-deg', rotateDeg + 'deg');
            card.style.setProperty('--scale-value', scaleValue);
        });

        card.addEventListener('mouseleave', function (event) {
            // Reset transform properties on mouse leave
            card.style.setProperty('--rotate-direction', 0);
            card.style.setProperty('--rotate-deg', 0);
            card.style.setProperty('--scale-value', 1);
        });
    });
}