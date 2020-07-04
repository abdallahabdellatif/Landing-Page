/**259050
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections=document.querySelectorAll('section');
let nextSection=1;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/*get the IDs of all sections and store them in secctionIds*/
function updatingNav(){
    const bullet=document.createElement('li');
    bullet.innerHTML=`<a id='${nextSection}' class='links'>Section ${nextSection}</a>`
    document.getElementById('navbar__list').appendChild(bullet);
}
function createNewSection(){
    const newSection=document.createElement('section');
    newSection.innerHTML=
    `<div class="landing__container">
    <h2>Section ${nextSection}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
     </div>`;
    newSection.id='section'+nextSection;
    document.body.querySelector('main').appendChild(newSection);
    nextSection++;

}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const frag=document.createDocumentFragment();
for(let i=0;i<sections.length;i++){
    const bulletPoint=document.createElement('li');
    const dataNav=sections[i].attributes.item(1).nodeValue;
    /*sections[i].attributes.item(1).nodeValue this part extracts the data-nav of the section*/
    bulletPoint.innerHTML=`<a id='${nextSection}' class='links'>${dataNav}</a>`;
    frag.appendChild(bulletPoint);
    nextSection++;
    // Section ${i+1}
}
document.getElementById('navbar__list').appendChild(frag);
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
const addSection=document.getElementById('add-section');
addSection.addEventListener('click',function(){
/*adding section to nav*/
updatingNav();
/*creating and appending sections*/
createNewSection();
});
// Scroll to section on link click
const pageHeader=document.querySelector('.page__header');
const navContainer=document.getElementById('navbar__list');
pageHeader.addEventListener('click',function(event){
    const sectionClickedLink=event.target; //returns the anchor 
    const sectionClickedIndex=sectionClickedLink.id; //section index (1,2,etc)
    const actualSection=document.getElementById('section'+sectionClickedIndex);
    const diff=actualSection.offsetTop - navContainer.offsetHeight+100;
    //the navbar height was deducted from the offset to make the section visible from it's start , so that the navbar doesn't cover 
    //its beginning
    scrollTo({
        top: diff,
        behavior:'smooth'
    });
    //now switch the active sections
    const previousSection=document.querySelector('.your-active-class');
    previousSection.classList.toggle("your-active-class");
    actualSection.classList.toggle("your-active-class");
});
//show on scrolling the section i am currently in
window.addEventListener('scroll',function(){
const currentHeight=window.scrollY;
//height of a section
const sectionHeight=document.querySelector('section').offsetHeight;
//distance from section 1 to the top
const distanceFromFirstSec=document.getElementById('section1').offsetTop;
const allSections=currentHeight-distanceFromFirstSec;
if(allSections>=0){
const sectionNumber=Math.floor(allSections/sectionHeight);
const previousSection=document.querySelector('.your-active-class');
if(previousSection.id!=('section'+(sectionNumber+1))){
previousSection.classList.toggle("your-active-class");
const currentSection=document.getElementById('section'+(sectionNumber+1));
currentSection.classList.toggle("your-active-class");
}
}
});