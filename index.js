const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
  "/"];


document.addEventListener("DOMContentLoaded", () => {

  // Dark-light mode logic start -----------------------

  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme : dark)")
  const icon = document.getElementById("icon");

  function calulateSettingAsTheme({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme
    }
    if (systemSettingDark.matches) {
      return "dark"
    }
    return "light"
  }

  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }

  let currentThemeSetting = calulateSettingAsTheme({ localStorageTheme, systemSettingDark });

  button.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme)
    updateThemeOnHtmlEl({ theme: newTheme });
    if (newTheme == "light") {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon")
    }
    else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
    currentThemeSetting = newTheme
  })

  // dark-light mode logic end -------------------

  const btn = document.querySelector(".btn")
  const password1 = document.getElementById("password1")
  const password2 = document.getElementById("password2")
  const length = document.getElementById("length")
  const char = document.getElementById("specialChar")
  const num = document.getElementById("numbers")
  let includeSpecial = false
  let includeNumber = false


  function getRandomChar(set) {
    return set[Math.floor(Math.random() * set.length)]
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[j];
      array[j] = array[i];
      array[i] = temp;

    }
  }

  function validate() {

    if (char.checked) {
      includeSpecial = true;
    }

    if (num.checked) {
      includeNumber = true;
    }
  }

  function generatePwd(minLength) {
    const upperCaseChar = characters.slice(0, 26)
    const lowerCaseChar = characters.slice(26, 52)
    const numberChar = characters.slice(52, 61)
    const specialChar = characters.slice(62)
    const normalRange = characters.slice(0, 52)

    let passwordArray = []

    passwordArray.push(getRandomChar(upperCaseChar))
    passwordArray.push(getRandomChar(lowerCaseChar))
    if (includeNumber) {
      passwordArray.push(getRandomChar(numberChar))
    }
    if (includeSpecial) {
      passwordArray.push(getRandomChar(specialChar))
    }

    for (let i = passwordArray.length; i < minLength; i++) {
      passwordArray.push(getRandomChar(normalRange))
    }
    shuffle(passwordArray)
    return passwordArray.join('')
  }


  btn.addEventListener("click", () => {
    const minLength = length.value ? parseInt(length.value) : 10
    validate()
    const pwd1 = generatePwd(minLength)
    const pwd2 = generatePwd(minLength)
    password1.value = pwd1
    password2.value = pwd2
  })

  password1.addEventListener("click", () => {
    navigator.clipboard.writeText(password1.value)
    alert(password1.value)
  })

  password2.addEventListener("click", () => {
    navigator.clipboard.writeText(password2.value)
    alert(password2.value)
  })
})


