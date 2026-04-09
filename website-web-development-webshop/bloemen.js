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
  div.className = "shop-item bloem" + (index + 1);

  const img = document.createElement("img");
  img.className = "shop-item-image";
  img.src = bloem.foto;

  const naam = document.createElement("p");
  naam.className = "shop-item-title";
  naam.textContent = bloem.naam;

  const prijs = document.createElement("p");
  prijs.className = "shop-item-price";
  prijs.textContent = bloem.prijs;

  const addButton = document.createElement("button");
  addButton.className = "shop-item-button";
  addButton.textContent = "In winkelwagen";
  addButton.onclick = function() {
    // Add to cart using the addToCart function from winkelwagen.js
    if (typeof addToCart === 'function') {
      addToCart(bloem.naam, bloem.prijs, bloem.foto);
      alert(bloem.naam + ' is toegevoegd aan uw winkelwagen');
      window.location.href = 'winkelwagen.html';
    }
  };

  addButton.addEventListener("click", addToCartClicked);

  div.appendChild(img);
  div.appendChild(naam);
  div.appendChild(prijs);
  div.appendChild(addButton);

  return div;
}

document.addEventListener("DOMContentLoaded", function () {
  const divBloemen = document.getElementById("bloemenDiv");

  if (divBloemen) {
    bloemen.forEach((bloem, index) => {
      divBloemen.appendChild(maakBloemElement(bloem, index));
    });
  }
});