function validateFile(file) {
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  const maxSizeInBytes = 3 * 1024 * 1024; // 5MB

  const fileType = file.type;
  const fileSize = file.size;

  // Check file type
  if (!allowedTypes.includes(fileType)) {
    return "Invalid file type. Allowed types are: PNG, JPG, PDF";
  }

  // Check file size
  if (fileSize > maxSizeInBytes) {
    const maxSizeInMB = maxSizeInBytes / (1024 * 1024);
    return `File size exceeds the limit of ${maxSizeInMB}MB`;
  }

  // If the file is valid, return null
  return null;
}

export default validateFile;
