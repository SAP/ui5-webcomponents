const removeFileExtension = (fileName) => {
    let extension = fileName.split(".").pop();

    return fileName.replace(`.${extension}`, "");
}

export {
    removeFileExtension
}