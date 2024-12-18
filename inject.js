// Fonction pour obtenir un WebSocket
const originalSend = WebSocket.prototype.send;
var str = "votre text";
var strX = coordonée x;
var strY = coordonnée y;

// Fonction qui remplace WebSocket.send pour obtenir le WebSocket une fois connecté
function getWebSocket(callback) {
    // Redéfinir la méthode send pour capter le WebSocket quand il est utilisé
    WebSocket.prototype.send = function(data) {
        originalSend.call(this, data);  // Appeler la méthode originale
        WebSocket.prototype.send = originalSend;  // Rétablir la méthode originale
        callback(this);  // Passer l'objet WebSocket au callback
    };
}

// Fonction de délai utilisant Promise
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fonction pour dessiner un caractère sur la carte à des coordonnées spécifiées
async function drawChar(ws, x, y, value) {
    await sleep(10);
    var json = {
        "x": x,
        "y": y,
        "value": value
    };

    json = JSON.stringify(json);  // Convertir l'objet en chaîne JSON
    
    // Envoi du message STOMP via WebSocket
    ws.send("SEND\ndestination:/app/map/set\ncontent-length:" + new TextEncoder().encode(json).length + "\n\n" + json + "\u0000");
}

// Fonction pour dessiner une chaîne de caractères à partir de startX et startY
function drawString(ws, startX, startY, string) {
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < string.length; i++) {

        const char = string[i];

        // Si un saut de ligne (\n) est trouvé, réinitialiser currentX et incrémenter currentY
        if (char == '\n') {
            currentX = startX;  // Retour à la position de départ pour x
            currentY++;
        } else {
            // Si ce n'est pas un \n, dessiner le caractère
            drawChar(ws, currentX, currentY, char);  // Appeler drawChar
            currentX++;  // Passer à la position suivante sur x
        }
    }
}

// Récupération du WebSocket et envoi de la chaîne périodiquement
getWebSocket(
    function(ws) {

        // Envoi de la chaîne str toutes les 100 * str.length millisecondes
        setInterval(() => {
            drawString(ws, strX, strY, str);
            },
            100 * str.length
        );  // Intervalle entre chaque message, basé sur la longueur de la chaîne
    }
);
