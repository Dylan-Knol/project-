const bloemen = [
  { naam: "Zonnebloemen", prijs: "€5,-", foto: "./images/zonnebloemen.webp" },
  { naam: "Rode Tulpen", prijs: "€7,68", foto: "./images/tulpen.webp" },
  { naam: "Cactus", prijs: "€2,-", foto: "./images/cactus.webp" },
  { naam: "Rozen bouquet", prijs: "€19,60", foto: "./images/rozen.webp" },
  { naam: "Speciaal samengestelde trouwdag bouquet", prijs: "vanaf €20,-", foto: "./images/trouwbouquet.webp" },
  { naam: "Lente bouquet", prijs: "vanaf €25,-", foto: "./images/lentebouquet.webp" },
  { naam: "Diversen vet planten", prijs: "vanaf €5,- per pot", foto: "./images/diversevet.webp" },
  { naam: "Diverse lente bloemen", prijs: "vanaf €7,50 per bos", foto: "./images/diverselente.webp" },
  { naam: "Paarse Allium Bloemen", prijs: "€4,- per bos", foto: "./images/allium.webp" }
];

function maakBloemElement(bloem, index) {
  const div = document.createElement("div");
  div.className = "bloem" + (index + 1);

  const img = document.createElement("img");
  img.src = bloem.foto;
  img.alt = bloem.naam;
  img.loading = "lazy"; 
  img.width = 300;
  img.height = 200;

  const naam = document.createElement("p");
  naam.textContent = bloem.naam;

  const prijs = document.createElement("p");
  prijs.textContent = bloem.prijs;

  const button = document.createElement("button");
  button.textContent = "ADD";
  button.className="shop-item-button";

  div.appendChild(img);
  div.appendChild(naam);
  div.appendChild(prijs);
  div.appendChild(button);
  return div;
}

document.addEventListener("DOMContentLoaded", function () {
  const divBloemen = document.getElementById("bloemenDiv");

  if (divBloemen) {
    const fragment = document.createDocumentFragment();
    bloemen.forEach((bloem, index) => {
      fragment.appendChild(maakBloemElement(bloem, index));
    });
    divBloemen.appendChild(fragment);
  }
});