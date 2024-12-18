import keyboard
import time

def lire_fichier(fichier):
    """Lit le contenu d'un fichier ligne par ligne et retourne une liste des lignes."""
    with open(fichier, 'r', encoding='utf-8') as f:
        return f.readlines()

def taper_et_revenir(lignes):
    """Tape chaque ligne, revient à gauche pour chaque caractère, puis descend d'une ligne."""
    for ligne in lignes:
        # Tape la ligne (espaces inclus)
        for char in ligne.rstrip("\n"):  # Conserve les espaces mais pas le retour à la ligne
            keyboard.write(char)  # Tape chaque caractère
            time.sleep(0.05)  # Pause pour simuler une saisie humaine (ajustable)
        
        # Reviens à gauche rapidement sans pause
        for _ in range(len(ligne.rstrip("\n"))):  # Compte les caractères sans le retour     à la ligne
            keyboard.press('left')
            keyboard.release('left')
            time.sleep(0.01)
        
        # Descend d'une ligne avec la flèche bas, sans pause
        keyboard.press('down')  # Utilise la flèche bas pour descendre d'une ligne
        keyboard.release('down')

        # Ajoute une petite pause avant de passer à la ligne suivante
        time.sleep(0.05)

    # Remonte d'autant de lignes qu'il a tapées
    for _ in range(len(lignes)):
        keyboard.press('up')
        keyboard.release('up')
        time.sleep(0.05)  # Pause entre chaque mouvement

# Exemple d'utilisation
time.sleep(5)  # Laisse le temps de placer ton curseur dans le champ d'entrée
fichier_dessin = "dessin.txt"  # Remplace par le chemin de ton fichier
lignes_dessin = lire_fichier(fichier_dessin)
taper_et_revenir(lignes_dessin)
