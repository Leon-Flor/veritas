export const useImage = () => {
  const imageCompress = (input: File, quality: number = 0.4): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx === null) {
          reject("Failed to get canvas context");
          return;
        }

        const ancho = img.width;
        const alto = img.height;

        canvas.width = ancho;
        canvas.height = alto;

        ctx.drawImage(img, 0, 0, ancho, alto);

        canvas.toBlob(
          (blob) => {
            if (blob === null) {
              reject("Failed to create blob");
              return;
            }

            const reader = new FileReader();
            reader.onload = () => {
              resolve(
                new File([blob], "compressed-image.jpeg", {
                  type: "image/jpeg",
                })
              );
            };
            reader.readAsDataURL(blob);
          },
          "image/jpeg",
          quality
        );
      };

      img.src = URL.createObjectURL(input);
    });
  };

  return {
    imageCompress,
  };
};
