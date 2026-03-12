// Standaard bloemen
const bloemen = [
  { naam: "Zonnebloemen", prijs: "€5,-", foto: "./images/zonnebloemen.webp" },
  { naam: "Rode Tulpen", prijs: "€7,68", foto: "./images/tulpen.webp" },
  { naam: "Rozen bouquet", prijs: "€19,60", foto: "./images/rozen.webp" },
  { naam: "Speciaal samengestelde trouwdag bouquet", prijs: "vanaf €20,-", foto: "./images/trouwbouquet.webp" },
  { naam: "Lente bouquet", prijs: "vanaf €25,-", foto: "./images/lentebouquet.webp" },
  { naam: "Diversen vet planten", prijs: "vanaf €5,- per pot", foto: "./images/diversevet.webp" },
  { naam: "Diverse lente bloemen", prijs: "vanaf €7,50 per bos", foto: "./images/lentebloemen.webp" },
  { naam: "Paarse Allium Bloemen", prijs: "€4,- per bos", foto: "./images/allium.webp" }
];

// Laad opgeslagen bloemen uit localStorage
function laadBloemenUitLocalStorage() {
  const opgeslagen = localStorage.getItem("bloemedatabase");
  if (opgeslagen) {
    try {
      const toegevoegdeBloemen = JSON.parse(opgeslagen);
      bloemen.push(...toegevoegdeBloemen);
    } catch (e) {
      console.error("Fout bij laden bloemen:", e);
    }
  }
}

// Sla toegevoegde bloemen op in localStorage
function slaBloemenOp() {
  const toegevoegde = bloemen.slice(8); // Alles na de 8 standaard bloemen
  localStorage.setItem("bloemedatabase", JSON.stringify(toegevoegde));
}

// Maak een bloem-element aan
function maakBloemElement(bloem, index) {
  const div = document.createElement("div");
  div.className = "bloem" + (index + 1);

  const img = document.createElement("img");
  img.src = bloem.foto;
  img.alt = bloem.naam;
  img.loading = "lazy"; // Lazy loading voor snellere pagina
  img.width = 300;
  img.height = 200;

  const naam = document.createElement("p");
  naam.textContent = bloem.naam;

  const prijs = document.createElement("p");
  prijs.textContent = bloem.prijs;

  div.appendChild(img);
  div.appendChild(naam);
  div.appendChild(prijs);

  return div;
}

// Render alle bloemen in één keer (sneller dan losse appends)
function renderBloemen(container) {
  const fragment = document.createDocumentFragment();
  bloemen.forEach((bloem, index) => {
    fragment.appendChild(maakBloemElement(bloem, index));
  });
  container.appendChild(fragment);
}

// Laad bloemen bij pagina load
document.addEventListener("DOMContentLoaded", function () {
  laadBloemenUitLocalStorage();

  const divBloemen = document.getElementById("bloemenDiv");
  if (divBloemen) {
    renderBloemen(divBloemen);
  }

  // Admin formulier afhandelen
  const bloemForm = document.getElementById("bloemForm");
  if (bloemForm) {
    bloemForm.addEventListener("submit", function (event) {
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
      fileReader.onload = function (e) {
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