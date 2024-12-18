// Variable pour la div
let div;
let str = "";  // Contenu du fichier
let strX = 0;  // Coordonnée X
let strY = 0;  // Coordonnée Y

// Fonction pour styliser un élément de manière générique
function applyStyles(element, styles) {
    Object.assign(element.style, styles);
}

// Fonction pour créer un élément input de type texte avec un style
function createInput(type, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    applyStyles(input, {
        marginBottom: '10px',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd'
    });
    return input;
}

// Fonction pour créer un bouton avec un style
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    applyStyles(button, {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: 'rgba(100, 100, 100, 0.6)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    });
    button.addEventListener('click', onClick);
    return button;
}

// Fonction pour créer la div avec tous les éléments nécessaires
function createDiv() {
    // Créer la div principale
    div = document.createElement('div');
    applyStyles(div, {
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '25%',
        height: '15vh',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease'
    });

    // Créer et styliser le bouton d'import
    const customButton = createButton('Charger un fichier .txt', () => fileInput.click());
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', handleFileInput);

    // Ajouter le bouton et l'input caché à la div
    div.appendChild(customButton);
    div.appendChild(fileInput);

    // Ajouter la div au document
    document.body.appendChild(div);
}

// Fonction pour gérer l'importation du fichier
function handleFileInput(event) {
    const file = event.target.files[0];
    
    if (file && file.type === 'text/plain') {
        console.clear(); // Effacer la console avant de traiter le nouveau fichier
        const reader = new FileReader();
        reader.onload = function(e) {
            str = e.target.result; // Charger le contenu du fichier dans `str`
            console.log('Contenu du fichier importé :');
            console.log(str); // Afficher le contenu du fichier dans la console
            hideButtonAndAskCoordinates(); // Masquer le bouton et demander les coordonnées
        };
        reader.readAsText(file);
    } else {
        console.log('Veuillez sélectionner un fichier .txt');
    }
}

// Fonction pour cacher le bouton et demander les coordonnées X et Y
function hideButtonAndAskCoordinates() {
    const customButton = div.querySelector('button');
    const fileInput = div.querySelector('input[type="file"]');
    customButton.style.display = 'none';
    fileInput.style.display = 'none';

    const xInput = createInput('text', 'Coordonnée X (entier)');
    const yInput = createInput('text', 'Coordonnée Y (entier)');
    const submitButton = createButton('Valider', () => {
        const xCoord = parseInt(xInput.value.trim(), 10);
        const yCoord = parseInt(yInput.value.trim(), 10);

        if (!Number.isInteger(xCoord) || !Number.isInteger(yCoord)) {
            alert("Les coordonnées doivent être des entiers !");
            return;
        }

        // Affichage des coordonnées dans la console
        console.log(`Coordonnée X : ${xCoord}`);
        console.log(`Coordonnée Y : ${yCoord}`);

        // Mettre à jour les coordonnées et lancer le dessin
        strX = xCoord;
        strY = yCoord;
        div.style.display = 'none'; // Cacher la div après validation
        // Fonction pour obtenir un WebSocket
        const originalSend = WebSocket.prototype.send;
        getWebSocket(ws => drawString(ws, strX, strY, str)); // Lancer le dessin
    });

    div.appendChild(xInput);
    div.appendChild(yInput);
    div.appendChild(submitButton);
}

// Fonction pour obtenir un WebSocket
function getWebSocket(callback) {
    WebSocket.prototype.send = function(data) {
        originalSend.call(this, data);
        WebSocket.prototype.send = originalSend;
        callback(this);
    };
}

// Fonction pour dessiner un caractère sur la carte
function drawChar(ws, x, y, value) {
    const json = JSON.stringify({ x, y, value });
    ws.send(`SEND\ndestination:/app/map/set\ncontent-length:${new TextEncoder().encode(json).length}\n\n${json}\u0000`);
}

// Fonction pour dessiner une chaîne de caractères
function drawString(ws, startX, startY, string) {
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (char === '\n') {
            currentX = startX;
            currentY++;
        } else {
            drawChar(ws, currentX, currentY, char);
            currentX++;
        }
    }

    // Effacer la console avant de réafficher la div
    console.clear();
    
    // Réafficher la div avec le bouton et les champs après un court délai
    setTimeout(() => {
        div.style.display = 'flex';
    }, 1000);
}

console.clear()
// Initialisation de la div
createDiv();
