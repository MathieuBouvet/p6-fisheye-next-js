import sharpImageProcessor from "@lib/services/imageProcessing/sharpImageProcessor";

const generatePlaceholder = sharpImageProcessor(sharp => sharp.resize(10));

export default generatePlaceholder;
