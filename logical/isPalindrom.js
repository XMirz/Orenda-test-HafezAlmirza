/**
 * @param {number} num 
 * @returns boolean
 */
function isPalindrome(num) {
  const numStr = num.toString();
  const reversedStr = numStr.split('').reverse().join('');
  return numStr === reversedStr;
}

console.log(isPalindrome(123123));
console.log(isPalindrome(121));
console.log(isPalindrome(-22222));
console.log(isPalindrome(-0));