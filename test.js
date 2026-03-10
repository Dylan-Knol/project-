const bloemen = [
  {naam: "Zonnebloemen", prijs: "€5,-", foto:"./images/zonnebloemen.jpg"},
  {naam: "Rode Tulpen", prijs: "€7,68", foto:"./images/tulpen.jpg"},

  {naam: "Rozen bouquet", prijs: "€19,60", foto:"./images/rozen.jpg"},
  {naam: "Speciaal samengestelde trouwdag bouquet", prijs: "vanaf €20,-", foto:"./images/trouwbouquet.jpg"},
  {naam: "Lente bouquet", prijs: "vanaf €25", foto:"./images/lentebouquet.jpg"},
  {naam: "Diversen vet planten", prijs: "vanaf €5,- per pot", foto:"./images/diversevet.jpg"},
  {naam: "Diverse lente bloemen", prijs: "vanaf €7,50 per bos", foto:"./images/lentebouquet.jpg"},
  {naam: "Paarse Allium Bloemen", prijs: "€4,- per bos", foto:"./images/allium.jpg"}
];

// Laad opgeslagen bloemen uit localStorage
function laadBloemenUitLocalStorage() {
  const opgeslagen = localStorage.getItem("bloemedatabase");
  if (opgeslagen) {
    const toegevoegdeBloemen = JSON.parse(opgeslagen);
    bloemen.push(...toegevoegdeBloemen);
  }
}

// Sla bloemen op in localStorage
function slaBloemenOp() {
  const toegevoegde = bloemen.slice(9); // Alles na de standaard bloemen
  localStorage.setItem("bloemedatabase", JSON.stringify(toegevoegde));
}

// Laad bloemen bij pagina load
document.addEventListener("DOMContentLoaded", function() {
  laadBloemenUitLocalStorage();
  
  const divBloemen = document.getElementById("bloemenDiv");
  
  if (divBloemen) {
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
  }

  // Admin formulier afhandelen
  const bloemForm = document.getElementById("bloemForm");
  if (bloemForm) {
    bloemForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const bloemnaam = document.getElementById("bloemnaam").value.trim();
      const prijs = document.getElementById("prijs").value.trim();
      const fotoInput = document.getElementById("foto");
      const beschrijving = document.getElementById("beschrijving").value.trim();
      const successMessage = document.getElementById("successMessage");
      const errorMessage = document.getElementById("errorMessage");

      if (!bloemnaam || !prijs || !fotoInput.files.length) {
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
        return;
      }

      // Zet foto om naar Base64
      const fileReader = new FileReader();
      fileReader.onload = function(e) {
        const base64Foto = e.target.result;

        // Voeg bloem toe
        bloemen.push({
          naam: bloemnaam,
          prijs: "€" + prijs,
          foto: base64Foto,
          beschrijving: beschrijving
        });

        // Sla op in localStorage
        slaBloemenOp();

        // Toon succes
        successMessage.style.display = "block";
        errorMessage.style.display = "none";
        bloemForm.reset();

        // Verberg bericht na 2 seconden
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 2000);
      };

      fileReader.readAsDataURL(fotoInput.files[0]);
    });
  }
});