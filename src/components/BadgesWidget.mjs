
const STYLES_MAP = {
    css:{
        card: {
            container: ['card-container'],
            badgeWrapper: ['card-wrapper'],
            badgeContent: ['card-content'],
            badgeImage: ['card-image'],
            badgeSummary: ['card-summary'],
            badgeName: ['card-title'],
            badgeIssuedBy: ['card-text'],

        },
        list: {
            container: ['list-container'],
            badgeWrapper: ['list-wrapper'],
            badgeContent: ['list-content'],
            badgeImage: ['list-image'],
            badgeSummary: ['list-summary'],
            badgeName: ['list-title'],
            badgeIssuedBy: ['list-issued'],
        },
    },
    bootstrap: {
        card: {
            container: ['row'],
            badgeWrapper: ['card', 'm-3', 'pt-3'],
            badgeContent: ['card-body', 'text-center'],
            badgeImage: ['card-img-top', 'mx-auto'],
            badgeSummary: ['card-text'],
            badgeName: ['card-title', 'fw-bold'],
            badgeIssuedBy: ['text-muted']
        },
        list: {
            container: ['list-unstyled', 'row'],
            badgeWrapper: ['media', 'col-md-5', "mt-4", "border", "p-3", "d-flex", 'bg-white', 'm-2'],
            badgeContent: ['media-body', 'p-3'],
            badgeImage: ['mr-3', 'align-self-start'],
            badgeName: ['mt-0', 'mb-1'],
            badgeDescription: ['mt-0', 'mb-1'],
            badgeIssuedBy: ['text-muted']
        }
    },
    tailwind: {
        card: {
            container: ['flex', 'flex-wrap', 'row'],
            badgeWrapper: ['bg-white', 'border', 'border-gray-200', 'm-3', 'p-3', 'rounded', 'shadow-md', 'items-center', 'md:w-1/4', "overflow-hidden"],
            badgeContent: ['text-center', 'flex-grow'], 
            badgeImage: ['w-full', 'mx-auto', 'block'],
            badgeSummary: ['text-gray-700', 'text-sm', 'mt-2'],
            badgeName: ['text-lg', 'font-bold', 'mt-4'],
            badgeIssuedBy: ['text-gray-600', 'text-sm', 'mt-2']
        },
        list: {
            container: ['flex', 'flex-wrap', 'list-none'],
            badgeWrapper: ['flex', 'w-full', 'lg:w-1/3', 'bg-white', 'border', 'border-gray-200','m-2', 'p-3', 'rounded', 'shadow-md'],
            badgeContent: ['flex', 'flex-col', 'ml-4'],
            badgeImage: ['border', 'border-gray-200', 'shadow-sm'],
            badgeName: ['text-lg', 'font-bold', 'mt-2'],
            badgeDescription: ['text-gray-700', 'text-sm', 'mt-1'],
            badgeIssuedBy: ['text-gray-600', 'text-sm', 'mt-2']
        }
    }
};

export default class BadgesWidget {
    constructor() {
        this.customClasses = {}; 
        this.customStyles = {}; 
        this.displayStyle = 'card'; 
    }
    configure(options) {
        this.overrideClasses = options.overrideClasses || false;
        this.customClasses = options.customClasses || this.customClasses;
        Object.assign(this, options);
    }
    async initialize() {
        const data = await fetchData(this.email, this.apiKey);
        this.render(data);
    }
    render(data) {
        const targetElement = document.getElementById(this.containerId);
        if (!targetElement) return console.error('Target element not found!');
        targetElement.innerHTML = '';
        let container;
        if (this.displayStyle === 'card') {
            container = document.createElement('div');
            data.forEach(badgeData => {
                const badgeCard = this.createBadgeCard(badgeData);
                container.appendChild(badgeCard);
            });
        } else if (this.displayStyle === 'list') {
            container = document.createElement('ul');
            data.forEach(badgeData => {
                const badgeListItem = this.createBadgeListItem(badgeData);
                container.appendChild(badgeListItem);
            });
        }
        this.applyStyles(container, 'container');
        targetElement.appendChild(container);
    }
    createBadgeCard(badgeData) {
        console.log(badgeData);
        const card = document.createElement('div');
        this.applyStyles(card, 'badgeWrapper');
        card.style.width = '18rem';
    
        const img = document.createElement('img');
        img.src = badgeData.bakedBadgeUrl; 
        img.alt = "Card image cap";
        img.style.height = "100px"
        img.style.width = "100px"
        this.applyStyles(img, 'badgeImage');
        card.appendChild(img);     
        const cardBody = document.createElement('div');
        this.applyStyles(cardBody, 'badgeContent');
        const cardName = document.createElement('h5');
        cardName.innerText = badgeData.badgeName;
        this.applyStyles(cardName, 'badgeName');
      //  const cardDescription = document.createElement('p');
       // cardDescription.innerText = badgeData.badgeDescription;
     //   this.applyStyles(cardDescription, 'badgeDescription');

        const cardIssuedBy = document.createElement('p');
        cardIssuedBy.innerText = "Issued by " + badgeData.issuedByName; 
        this.applyStyles(cardIssuedBy, 'badgeIssuedBy');
        cardBody.appendChild(cardName);
      //  cardBody.appendChild(cardDescription);
        cardBody.appendChild(cardIssuedBy);
        card.appendChild(cardBody); 
        return card;
    }
    
    createBadgeListItem(badgeData) {
        const listItem = document.createElement('li');
        this.applyStyles(listItem, 'badgeWrapper');

        const img = document.createElement('img');
        img.src = badgeData.bakedBadgeUrl;
        img.alt = "Badge";
        img.width = 90; 
        img.height = 90; 
        this.applyStyles(img, 'badgeImage');
        listItem.appendChild(img);      
        const mediaBody = document.createElement('div');
        mediaBody.classList.add('media-body'); 
        this.applyStyles(mediaBody, 'badgeContent');
    
        const title = document.createElement('h5');
        title.innerText = badgeData.badgeName;
        this.applyStyles(title, 'badgeName');
        mediaBody.appendChild(title);
    
      //  const description = document.createElement('p');
      //  description.innerText = badgeData.badgeDescription;
      // this.applyStyles(description, 'badgeDescription');
      //mediaBody.appendChild(description);

        const cardIssuedBy = document.createElement('p');
        cardIssuedBy.innerText = "Issued by " + badgeData.issuedByName; 
        this.applyStyles(cardIssuedBy, 'badgeIssuedBy');
    
        listItem.appendChild(mediaBody);      
        mediaBody.appendChild(cardIssuedBy);
        return listItem;
    }

    applyStyles(element, styleKey) {
        const currentStyle = this.displayStyle || 'card';
        const currentTheme = this.theme || 'bootstrap'; 
    
        if (!STYLES_MAP[currentTheme] || !STYLES_MAP[currentTheme][currentStyle]) {
            console.error('Invalid style or theme:', currentStyle, currentTheme);
            return;
        }
    
        const themeClasses = STYLES_MAP[currentTheme][currentStyle][styleKey];
        if (themeClasses) element.classList.add(...themeClasses);
    
        const customClasses = this.customClasses[styleKey];
    
        if (this.overrideClasses && customClasses) {
            themeClasses.forEach(cls => element.classList.remove(cls));
            element.classList.add(...customClasses);
        } else if (customClasses) {
            element.classList.add(...customClasses);
        }
    
        const styles = this.customStyles[styleKey];
        if (styles) Object.assign(element.style, styles);
    }
}
    

function formatDateToLocale(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(navigator.language).format(date);
}

export async function fetchData(email, token) { 
    const endpoint = `https://badges.openbadges.me/api/issuedbadgesexternal/email?email=${encodeURIComponent(email)}`;

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
