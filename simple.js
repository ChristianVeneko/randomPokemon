import { showPkms } from "./index.js";

function randomPkm() {
  const random = Math.floor(Math.random() * 1010);
  return random;
}

function fetchPkm(rnd) {
  const url = `https://pokeapi.co/api/v2/pokemon/${rnd}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        createPkm(data);
    });
}

function createPkm(pkm) {
  pokemon = {
    id: pkm.id,
    name: pkm.name,
    img: pkm.sprites.other["official-artwork"].front_default,
  };
  showPkms(pokemon);
}

fetchPkm(randomPkm());
