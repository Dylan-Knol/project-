const bloemen = [
  {naam: "Zonnebloemen", prijs: "5,-", foto:"./images/zonnebloemen.jpg"},
  {naam: "Rode Tulpen", prijs: "7,68", foto:"./images/tulpen.jpg"},
  {naam: "Cactus", prijs: "2,-", foto:"./images/cactus.jpg"},
  {naam: "Rozen bouquet", prijs: "19,60", foto:"./images/rozen.jpg"},
  {naam: "Speciaal samengestelde trouwdag bouquet", prijs: "vanaf 20,-", foto:"./images/trouwbouquet.jpg"},
  {naam: "Lente bouquet", prijs: "vanaf 25", foto:"./images/lentebouquet.jpg"},
  {naam: "Diversen vet planten", prijs: "vanaf 5,- per pot", foto:"./images/diversevet.jpg"},
  {naam: "Diverse lente bloemen", prijs: "vanaf 7,50 per bos", foto:"./images/lentebouquet.jpg"},
  {naam: "Paarse Allium Bloemen", prijs: "4,- per bos", foto:"./images/allium.jpg"}
];

document.addEventListener("DOMContentLoaded", function() {
  const divBloemen = document.getElementById("bloemenDiv");

  bloemen.forEach((bloem, index) => {
    const div = document.createElement("div");
    div.className = "bloem" + (index + 1);

    const img = document.createElement("img");
    img.src = bloem.foto;
    img.alt = bloem.naam;

    div.appendChild(img);
    div.appendChild(document.createTextNode(bloem.naam));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode(bloem.prijs));

    divBloemen.appendChild(div);
  });
});
