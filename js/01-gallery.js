import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const container = document.querySelector(".gallery");
let lightBox; 

container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", handleClick);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        >
      </a>
    </li> `
    )
    .join("");
}

function handleClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  const originalImageURL = event.target.dataset.source;
  lightBox = basicLightbox.create(
    `<img src="${originalImageURL}" width="800" height="600">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onKeyPress);
      },
      onClose: () => {
        window.removeEventListener("keydown", onKeyPress);
      },
    }
  );

  lightBox.show();
}

function onKeyPress(event) {
  if (event.code === "Escape") {
    lightBox.close();
  }
}
