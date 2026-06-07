# Portofoliu Web – Anne-Marÿ Predoi

Pagină web personală de tip CV/Portofoliu cu integrare dinamică a proiectelor din GitHub API.

## Tehnologii folosite

- HTML5 semantic
- CSS3 (Flexbox, Grid, responsive design)
- JavaScript (Vanilla JS, Fetch API, async/await)
- GitHub REST API v3

## Funcționalități

- Profil – nume, rol, tehnologii, descriere și link-uri
- Educație și Voluntariat prezentate ca timeline
- Proiecte GitHub încărcate dinamic prin fetch
- Excludere automată fork-uri
- Sortare după ultima actualizare / stele / nume
- Filtrare în timp real după limbaj și cuvânt cheie
- Spinner loading și mesaj de eroare prietenos
- Buton Load More (6 proiecte pe pagină)
- Fallback cu proiecte hardcodate dacă API-ul nu răspunde

## Instalare locală

```bash
git clone https://github.com/AnnePredoi15/portofoliu-web.git
cd portofoliu-web
# deschide index.html în browser sau folosește Live Server în VS Code
```

Nu sunt necesare dependențe sau pași de build.

## Deploy

Pagina este hostată pe GitHub Pages:
https://annepredoi15.github.io/portofoliu-web/

## Structura fișierelor

```
├── index.html
├── style.css
├── script.js
└── README.md
```
