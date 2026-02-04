// Check Palindrome by Filtering Non-Letters
// Given a string containing letters, digits, and symbols, determine if it reads the same forwards and backwards when considering only alphabetic characters (case-insensitive).

function isAlphabeticPalindrome(code) {
  let newCode = "";

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
      newCode += ch.toLowerCase();
    }
  }

  for (let i = 0; i < newCode.length / 2; i++) {
    if (newCode[i] !== newCode[newCode.length - 1 - i]) {
      return false;
    }
  }

  return true;
}
console.log(isAlphabeticPalindrome("abc123cba"));
console.log(isAlphabeticPalindrome("abc123cba"));
console.log(isAlphabeticPalindrome("abc123cb3"));
