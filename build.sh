#!/bin/bash
# ouvrir un terminal Git Bash
# puis lancer la commande ./build.sh

echo "📁 Création du dossier dist..."
mkdir -p dist

echo "🧹 Nettoyage précédent (si présent)..."
rm -rf dist/*

echo "📦 Minification des fichiers HTML..."
minify index.html > dist/index.html
minify employee-list.html > dist/employee-list.html

echo "📦 Minification des fichiers JS..."
minify app.js > dist/app.js
minify employee-list.js > dist/employee-list.js
minify loadEmployees.js > dist/loadEmployees.js

echo "📦 Minification des fichiers CSS..."
minify app.css > dist/app.css
minify jquery.datetimepicker.css > dist/jquery.datetimepicker.css

echo "📄 Copie des fichiers non minifiables (JSON, JS déjà minifiés)..."
cp generated_users.json dist/
cp jquery.datetimepicker.full.min.js dist/

echo "✅ Build terminé ! Fichiers disponibles dans le dossier dist/"