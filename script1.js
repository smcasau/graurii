const projects = [
    {
        title: "Familia Popescu",
        subtitle: "O familie cu 4 copii",
        mainImage: "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
        description: "Ajută această familie să treacă prin iarna friguroasă cu un trai decent",
        members: 6,
        children: 4,
        gallery: [
            "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
            "https://static4.libertatea.ro/wp-content/uploads/2022/12/familie-nevoiasa-covasna-s-59.jpg",
            "https://www.viata-libera.ro/media/k2/items/cache/0f65e6883db817431adcf6c4bfe73f0c_XL.jpg",
            "https://via.placeholder.com/800x600/900C3F/fff"
        ],
        donateLink: "#"
    },
    {
        title: "Familia Popescu",
        subtitle: "O familie cu 4 copii",
        mainImage: "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
        description: "Ajută această familie să treacă prin iarna friguroasă cu un trai decent...",
        members: 6,
        children: 4,
        gallery: [
            "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
            "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
            "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
            "https://via.placeholder.com/800x600/900C3F/fff"
        ],

    },
    {
        title: "Familia Popescu",
        subtitle: "O familie cu 4 copii",
        mainImage: "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
        description: "Ajută această familie să treacă prin iarna friguroasă cu un trai decent...",
        members: 6,
        children: 4,
        gallery: [
            "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
            "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
            "https://www.sperantapentruromania.ro/wp-content/uploads/2020/01/poza-buna.jpg",
            "https://via.placeholder.com/800x600/900C3F/fff"
        ],

    },

];

let currentProjectIndex = 0;
let currentImageIndex = 0;

function init() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = projects.map((project, index) => `
        <div class="card" data-index="${index}">
            <img src="${project.mainImage}" alt="${project.title}">
            <div class="card-content">
                <h2>${project.title}</h2>
                <h3>${project.subtitle}</h3>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            currentProjectIndex = parseInt(card.dataset.index);
            openModal();
        });
    });
}

function openModal() {
    const project = projects[currentProjectIndex];
    const modal = document.getElementById('modal');
    
    // Actualizare conținut
    document.querySelector('.modal-description').textContent = project.description;
    document.getElementById('statMembers').textContent = project.members;
    document.getElementById('statChildren').textContent = project.children;
    document.querySelector('.donate-button').href = project.donateLink;

    // Setare imagini
    currentImageIndex = 0;
    updateImages([project.mainImage, ...project.gallery]);
    
    // Afișare modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateImages(images) {
    const mainImg = document.querySelector('.modal-main-img');
    const thumbnails = document.querySelector('.thumbnail-container');
    
    // Actualizare imagine principală
    mainImg.src = images[currentImageIndex];

    // Actualizare thumbnail-uri
    thumbnails.innerHTML = images.map((img, index) => `
        <img class="thumbnail-img ${index === currentImageIndex ? 'active' : ''}" 
             src="${img}" 
             data-index="${index}"
             alt="Thumbnail">
    `).join('');

    // Adăugare evenimente pentru thumbnail-uri
    thumbnails.querySelectorAll('.thumbnail-img').forEach(thumb => {
        thumb.addEventListener('click', () => {
            currentImageIndex = parseInt(thumb.dataset.index);
            updateImages(images);
        });
    });
}

// Navigare imagini
document.querySelector('.image-nav.prev').addEventListener('click', () => {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : projects[currentProjectIndex].gallery.length;
    updateImages([projects[currentProjectIndex].mainImage, ...projects[currentProjectIndex].gallery]);
});

document.querySelector('.image-nav.next').addEventListener('click', () => {
    currentImageIndex = currentImageIndex < projects[currentProjectIndex].gallery.length ? currentImageIndex + 1 : 0;
    updateImages([projects[currentProjectIndex].mainImage, ...projects[currentProjectIndex].gallery]);
});

// Închidere modal
document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', (e) => e.target === document.getElementById('modal') && closeModal());

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Inițializare la încărcarea paginii
window.onload = init;
