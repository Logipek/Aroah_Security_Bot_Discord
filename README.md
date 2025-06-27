
# Aroah Security Bot

**Aroah** est un bot Discord de sécurité avancée conçu pour protéger efficacement les serveurs contre les raids, spams, comptes malveillants et abus en tout genre. Pensé pour être simple à utiliser, hautement configurable et fiable, Aroah agit comme un véritable pare-feu pour votre communauté.

---

## 🔒 Fonctionnalités principales

- **Détection de raids**  
  Blocage automatique des entrées massives et suspectes.  
- **Anti-spam & flood**  
  Suppression des messages répétitifs, pubs, liens, mentions abusives, etc.  
- **Contrôle des nouveaux comptes**  
  Filtrage par date de création, photo de profil, etc.  
- **Journal de modération complet**  
  Logs précis des actions prises par le bot (kicks, bans, suppressions, alertes).  
- **Système de sanctions personnalisables**  
  Timeout, kick, ban ou simple avertissement selon les seuils définis.  
- **Mode surveillance 24/7**  
  Fonctionne automatiquement sans intervention nécessaire, même en ton absence.

---

## ⚙️ Prérequis

- Python 3.10+
- Un bot Discord avec les intents suivants activés :
  - `MESSAGE CONTENT INTENT`
  - `GUILD MEMBERS INTENT`
- Un token Discord valide
- Les permissions de gestion suffisantes sur le serveur

---

## 🛠️ Installation

```bash
git clone https://github.com/Logipek/Aroah_Security_Bot_Discord.git
cd Aroah_Security_Bot_Discord
pip install -r requirements.txt
```

Crée un fichier `.env` contenant ton token :

```env
DISCORD_TOKEN=ton_token_ici
```

Lance le bot :

```bash
python main.py
```

---

## ⚡ Commandes de base

| Commande              | Description                                 |
|-----------------------|---------------------------------------------|
| `/setup`              | Configure les options de sécurité de base   |
| `/antiraid on/off`    | Active ou désactive la détection de raid    |
| `/logchannel`         | Définit le salon de logs de modération      |
| `/sanction`           | Définit la sanction par défaut              |
|-----------------------|---------------------------------------------|

---

## 📸 Exemple en action

https://user-images.githubusercontent.com/65201353/114320333-cebc5680-9b15-11eb-9328-c37d0f56f8ea.png

---

## 🧑‍💻 Développement

Le bot est encore en évolution. Les contributions sont les bienvenues via issues ou pull requests.

---

## 🧠 À propos

Projet maintenu par [Logipek](https://github.com/Logipek).  
Inspiré par les besoins de vraies communautés Discord exposées à des attaques, ce bot vise à rendre la sécurité accessible et automatisée.

---

## 📄 Licence

Ce projet est open-source, distribué sous licence MIT.
