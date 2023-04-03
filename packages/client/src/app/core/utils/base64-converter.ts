export function convertBase64(imageFile: File) {
    return new Promise<string>((res, rej) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);

        fileReader.onload = () => {
            res(fileReader.result as string);
        };

        fileReader.onerror = (err) => {
            rej(err);
        };
    });
}
