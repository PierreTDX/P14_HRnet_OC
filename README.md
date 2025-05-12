# HRnet
Welcome to HRnet! This is our company's internal application to create and view employee records.

# P14_HRnet_OC
Branche original_project

## Installation

Suivez les étapes ci-dessous pour configurer ce projet localement :

1. Clonez la branche du projet :
   ```bash
   git clone --branch original_project --single-branch https://github.com/PierreTDX/P14_HRnet_OC.git


2. Allez dans le dossier du projet :
   ```bash
   cd nom-du-dossier

## Lancer l'application

Installer un server HTTP, comme par exemple serve:
   ```bash
   npm install -g serve
   ```

Pour démarrer l'application, exécutez la commande suivante :
   ```bash
   serve
   ```

## Build pour la production

Pour créer une version optimisée de l'application pour la production,
Ouvrir un terminal Git Bash, puis exécutez :
   ```bash
   ./build.sh
   ```
   Cette commande génère un dossier dist/ contenant tous les fichiers nécessaires pour déployer l'application.  
   (réellement, il n'est pas insipensable de build cette appli)

## Déploiement

Ce projet est prêt à être déployé sur Vercel  
Pour déployer le projet sur Vercel, suivez ces étapes :

- Poussez votre code vers GitHub ou GitLab.
- Connectez votre dépôt à Vercel.

L'application est dépoyée ici : [https://p14-hrnet-jquery-oc.vercel.app/](https://p14-hrnet-jquery-oc.vercel.app/)

## Technologies utilisées

- **JQuery**          