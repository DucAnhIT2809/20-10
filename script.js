document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector(".scene");
  const envelope = document.querySelector(".envelope");
  const messageEl = document.querySelector(".message");
  const button = document.getElementById("openLetter");
  const gallery = document.getElementById("photoGallery");

  const messageText =
    "Hôm nay là một ngày đặc biệt. Chúc em ngày 20/10 thật vui vẻ và hạnh phúc. Mãi yêu em.";

  const imageFiles = [
    "375E2F58-9B6D-4B81-9C20-44E7F44A1818.JPG",
    "DSCN8801.JPG",
    "IMG_8534.JPG",
    "IMG_9582.JPG",
    "att.GH9grxQIEWpxG5FlJYBL4reVC9UtRX_gSivfEHvtBuM.JPG",
    "att.Hy44czGiLYuUFDFN45Z0U3XEbQ-i1vkd-npBfJ8ytwU.JPG",
    "att.LvJYzBWNeOVrsPAJWwnmdCVepQ-XGeKFuoSw0UytGbw.JPG",
    "att.RWht4NRhJDnGPeitfK1TFCQqpHzwkll3VDvEnUhsqxw.JPG",
    "att.TJesot2S5IdMp_9FaEtLfKJhdZhTRrmP4frJUeR4e9k.JPG",
    "att.U1-1w9fA78ofiVQ6TMmuXT3S3OEQb5iu4NGoAPGJmbo.JPG",
    "att.VyXTAshv37EE32ZWD9U0lfCq6tiDRPYnrxEIaeQNZKo.JPG",
    "att.ZZJeogR8G2rJK_aISizY-VemNM4RTIRTFF7QAKuaKoY.JPG",
    "att.jbWLg4rz5fG3c-4kAMtX7fvg47LXqwyEBqDWwL01HxY.JPG",
    "att.o5MvXxqqfU4_wZAzovyhJwwoiqfOALF8CoEmWE1wAr0 2.JPG",
    "att.o5MvXxqqfU4_wZAzovyhJwwoiqfOALF8CoEmWE1wAr0.JPG",
    "att.qdkl8FIJGHtyuYHQUdnd9Y6xxCwwrZh53GA5DyFfj2c.JPG",
    "fa4f7cf814f83974780204b2d8021c9e.JPG",
  ];

  let phase = "closed";

  const shapes = ["shape-heart", "shape-circle", "shape-portrait", "shape-petal"];

  const typewriter = (text) =>
    new Promise((resolve) => {
      if (!messageEl) {
        resolve();
        return;
      }
      messageEl.textContent = "";

      const characters = [...text];
      const writeChar = (index) => {
        if (index >= characters.length) {
          resolve();
          return;
        }
        messageEl.textContent += characters[index];
        messageEl.scrollTop = messageEl.scrollHeight;
        const delay = Math.random() * 90 + 45;
        setTimeout(() => writeChar(index + 1), delay);
      };

      writeChar(0);
    });

  const populateGallery = () => {
    if (!gallery || gallery.dataset.populated === "true") return;

    const totalCards = Math.max(imageFiles.length * 2, 30);

    for (let i = 0; i < totalCards; i += 1) {
      const file = imageFiles[i % imageFiles.length];
      const card = document.createElement("div");
      const shapeClass = shapes[i % shapes.length];
      card.className = `photo-card ${shapeClass}`;
      const duration = 14 + Math.random() * 10;
      const delay = Math.random() * 4;
      const left = 8 + Math.random() * 84;
      const tilt = (Math.random() * 14 - 7).toFixed(1);
      const scale = (0.68 + Math.random() * 0.2).toFixed(2);

      card.style.left = `${left}%`;
      card.style.setProperty("--float-duration", `${duration.toFixed(2)}s`);
      card.style.setProperty("--float-delay", `${delay.toFixed(2)}s`);
      card.style.setProperty("--float-tilt", `${tilt}deg`);
      card.style.setProperty("--float-scale", scale);

      const img = document.createElement("img");
      img.src = encodeURI(file);
      img.alt = "Khoảnh khắc ngọt ngào của chúng ta";
      img.loading = "lazy";

      card.appendChild(img);
      gallery.appendChild(card);
    }

    gallery.dataset.populated = "true";
  };

  const openEnvelope = () => {
    if (phase !== "closed" || !envelope) return;
    phase = "opening";
    envelope.classList.add("open");

    if (button) {
      button.classList.add("activated");
      button.setAttribute("disabled", "true");
      button.textContent = "Phong thư đang mở...";
    }

    setTimeout(() => {
      typewriter(messageText).then(() => {
        if (button) {
          button.textContent = "Ấn vào đây";
          button.removeAttribute("disabled");
        }
        phase = "letterOpen";
      });
    }, 900);
  };

  const showGallery = () => {
    if (phase !== "letterOpen") return;
    phase = "gallery";

    if (button) {
      button.setAttribute("disabled", "true");
      button.textContent = "Đang mở kỷ niệm...";
    }

    populateGallery();
    gallery?.setAttribute("aria-hidden", "false");
    scene?.classList.add("gallery-active");

    if (button) {
      setTimeout(() => {
        button.textContent = "Yêu em nhiều 💗";
      }, 1200);
    }
  };

  button?.addEventListener("click", () => {
    if (phase === "closed") {
      openEnvelope();
      return;
    }

    if (phase === "letterOpen") {
      showGallery();
    }
  });
});
