export const validateInput = (text: string, setIsInputValid: (valid: boolean) => void) => {
  if (text && text.trim().length > 0) {
    setIsInputValid(true);
  } else {
    setIsInputValid(false);
  }
};