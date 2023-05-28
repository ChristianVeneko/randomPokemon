document.getElementById("random").addEventListener("click", (e) => {
  const imageDiv = document.getElementById("imgpkm");
  const nameDiv = document.getElementById("namepkm");
  nameDiv.innerHTML = "";
  imageDiv.innerHTML = "";
  main();
});

async function fetchPokemons() {
const pokemons= []
 const promises = []
 for(let i = 1; i <= 1010; i ++){
 const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
 promises.push(fetch(url))
 }
 const responses = await Promise.all(promises)
 for(let response of responses){
  const data = await response.json()
  pokemons.push(data)
 }
 return pokemons
}

async function createPkms() {
  const pokemons = await fetchPokemons();
  //el pokemons.map lo k esta haciendo es recorriendo cada objeto osea cada elemento del arreglo de pokemons para solo seleccionar ciertas propiedades de esos objetos y asi meterlos en objetos nuevos para un nuevo arreglo de objetos
  const simplyPkms = pokemons.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other["official-artwork"].front_default,
    };
  });
  localStorage.setItem("pokemons", JSON.stringify(simplyPkms));
  main();
}

function randomPkm(pkms) {
  const random = Math.floor(Math.random() * pkms.length);
  const pkm = pkms[random];
  showPkms(pkm);
}

function showPkms(pkm) {
  const imageDiv = document.getElementById("imgpkm");
  const nameDiv = document.getElementById("namepkm");
  nameDiv.innerHTML = "";
  imageDiv.innerHTML = "";
  const imagePkm = document.createElement("img");
  imagePkm.src = pkm.img;
  imageDiv.appendChild(imagePkm);
  const namePkm = document.createElement("h1");
  namePkm.innerText = pkm.name;
  nameDiv.appendChild(namePkm);
}

if (!localStorage.getItem("pokemons")) {
  createPkms();
} else {
  main();
}

function main() {
  const pokemons = JSON.parse(localStorage.getItem("pokemons"));
  randomPkm(pokemons);
}
