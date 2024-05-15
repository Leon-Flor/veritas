export const useEncrypterHash = () => {
  const encryptedHash = (uuid: string) => {
    let encryptedUuid = "";
    for (let i = 0; i < uuid.length; i++) {
      let charCode = uuid.charCodeAt(i);
      charCode = charCode + 1;
      encryptedUuid += String.fromCharCode(charCode);
    }
    return encryptedUuid;
  };

  const decryptedHash = (encryptedUuid: string) => {
    let decryptedUuid = "";
    for (let i = 0; i < encryptedUuid.length; i++) {
      let charCode = encryptedUuid.charCodeAt(i);
      charCode = charCode - 1;
      decryptedUuid += String.fromCharCode(charCode);
    }
    return decryptedUuid;
  };

  return {
    encryptedHash,
    decryptedHash,
  };
};
