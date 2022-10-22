"use strict";

const optionContainers = document.querySelectorAll(".option-container");
const selectedPerson = document.querySelector(".selected-person");
const selectedWebsite = document.querySelector(".selected-website");
const optionsContainerPerson = document.querySelector(
  ".option-container-person"
);
const optionsContainerWebsite = document.querySelector(
  ".option-container-website"
);
const formWebsiteInformation = document.querySelector(
  ".form-website-information"
);
const formIdentityInformation = document.querySelector(
  ".form-identity-information"
);
const formLegalInformation = document.querySelector(".form-legal-information");
const btnNextFirst = document.querySelector(".btn-next--first");
const btnNextSecond = document.querySelector(".btn-next--second");
const btnNextThird = document.querySelector(".btn-next--third");
const btnPrevSecond = document.querySelector(".btn-prev--second");
const btnPrevThird = document.querySelector(".btn-prev--third");
const formsContent = document.querySelectorAll(".forms__content");
const formTab = document.querySelectorAll(".forms__tab");
const inputDomain = document.querySelector(".input-domain");
const inputName = document.querySelector(".input-name");
const inputFamilyName = document.querySelector(".input-family-name");
const inputCellphone = document.querySelector(".input-cellphone");
const inputPhone = document.querySelector(".input-phone");
const inputOrganizationLevel = document.querySelector(
  ".input-organization-level"
);
const inputEmail = document.querySelector(".input-email");
const inputAddress = document.querySelector(".input-address");
const inputCompanyName = document.querySelector(".input-company-name");
const inputNationalID = document.querySelector(".input-national-ID");
const inputEconomicCode = document.querySelector(".input-economic-code");
const inputEmailSecond = document.querySelector(".input-email-second");
const inputAddressSecond = document.querySelector(".input-address-second");
const inputNameAgent = document.querySelector(".input-name-agent");
const inputFamilyNameAgent = document.querySelector(".input-family-name-agent");
const inputCellphoneAgent = document.querySelector(".input-cellphone-agent");
const inputPhoneAgent = document.querySelector(".input-phone-agent");
const inputOrganizationLevelAgent = document.querySelector(
  ".input-organization-level-agent"
);
const inputEmailAgent = document.querySelector(".input-email-agent");
const inputAddressAgent = document.querySelector(".input-address-agent");
let personType;

selectedPerson.addEventListener("click", function (e) {
  optionsContainerPerson.classList.toggle("active");
});
selectedWebsite.addEventListener("click", function (e) {
  optionsContainerWebsite.classList.toggle("active");
});
optionsContainerPerson.addEventListener("click", function (e) {
  if (!e.target) {
    return;
  }
  const clicked = e.target.closest(".option");
  personType = clicked;
  selectedPerson.innerHTML = clicked.querySelector("label").innerHTML;
  optionsContainerPerson.classList.add("has-value");
  optionsContainerPerson.classList.remove("active");
});

optionsContainerWebsite.addEventListener("click", function (e) {
  if (!e.target) {
    return;
  }
  const clicked = e.target.closest(".option");
  selectedWebsite.innerHTML = clicked.querySelector("label").innerHTML;
  optionsContainerWebsite.classList.add("has-value");
  optionsContainerWebsite.classList.remove("active");
});
const showError = function (input, message) {
  const inputContainer = input.closest(".input-container");
  input.classList.add("error-border");
  inputContainer.querySelector(".error").innerHTML = `${message}`;
};
const showSuccess = function (input) {
  const inputContainer = input.closest(".input-container");
  input.classList.remove("error-border");
  inputContainer.querySelector(".error").innerHTML = "";
};
const checkOption = function () {
  let valid = false;
  optionContainers.forEach(function (optionContainer) {
    if (optionContainer.classList.contains("has-value")) {
      showSuccess(optionContainer);
      valid = true;
    } else {
      showError(optionContainer, "لطفا این قسمت را خالی نگذارید");
      valid = false;
    }
  });
  return valid;
};
const checkEmpty = function (input) {
  let valid = false;
  if (input.value === "") {
    showError(input, "لطفا این قسمت را خالی نگذارید");
  } else {
    showSuccess(input);
    valid = true;
  }
  return valid;
};
const checkDomain = function (input) {
  let valid = false;
  let regexDomain = /^\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!checkEmpty(input)) {
    showError(input, "لطفا این قسمت را خالی نگذارید");
  } else if (!input.value.match(regexDomain)) {
    showError(input, "لطفا دامنه معتبر وارد کنید مثلا: www.abc.com");
  } else {
    showSuccess(input);
    valid = true;
  }
  return valid;
};
const formContentActive = function (number) {
  formsContent.forEach(function (formContent) {
    formContent.classList.remove("forms__content--active");
  });
  document
    .querySelector(`.forms__content--${number}`)
    .classList.add("forms__content--active");
  let mobileWidth = window.matchMedia("(max-width: 992px)");
  if (mobileWidth.matches) {
    formTab.forEach(function (tab) {
      tab.classList.remove("forms__tab--active");
    });
  }
  formTab.forEach(function (tab) {
    tab.classList.remove("forms__tab--active");
  });
  number = number == 3 ? (number = 2) : (number = number);
  document
    .querySelector(`.forms__tab--${number}`)
    .classList.add("forms__tab--active");
};
const tabContentActive = function (addNum, removeNum) {
  formsContent.forEach(function (formContent) {
    formContent.classList.remove("forms__content--active");
  });
  formTab.forEach(function (tab) {
    tab.classList.remove("forms__tab--active");
  });
  document
    .querySelector(`.forms__content--${addNum}`)
    .classList.add("forms__content--active");
  document
    .querySelector(`.forms__tab--${addNum}`)
    .classList.add("forms__tab--active");
  document
    .querySelector(`.forms__tab--${removeNum}`)
    .classList.remove("forms__tab--active");
};
const isFirstFormValid = function () {
  let isOptionValid = checkOption();
  let isDomainValid = checkDomain(inputDomain);
  let isValid = isOptionValid && isDomainValid;
  if (!isValid) {
    return;
  }
  let number = personType.querySelector("label").dataset.tab;
  formContentActive(number);
};
formWebsiteInformation.addEventListener("submit", function (e) {
  e.preventDefault();
  isFirstFormValid();
});
btnNextFirst.addEventListener("click", function (e) {
  e.preventDefault();
  isFirstFormValid();
});
btnPrevSecond.addEventListener("click", function (e) {
  e.preventDefault();
  tabContentActive(1, 2);
});
btnPrevThird.addEventListener("click", function (e) {
  e.preventDefault();
  tabContentActive(1, 2);
});

const checkName = function (input, name) {
  const inputLength = input.value.length;
  let valid = false;
  if (!checkEmpty(input)) {
    showError(input, "لطفا این قسمت را خالی نگذارید");
  } else if (inputLength < 2 || inputLength > 25) {
    showError(input, ` ${name} باید بین دو تا بیست و پنج حرف باشد `);
  } else {
    showSuccess(input);
    valid = true;
  }
  return valid;
};
const checkCellphone = function (input) {
  let valid = false;
  const persianToEnglish = (s) =>
    s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const regexCellphone = new RegExp("(^(\\+98|0098|98|0)?9\\d{9}$)");
  const cellphoneNumber = persianToEnglish(input.value);
  if (!checkEmpty(input)) {
    showError(input, "لطفا این قسمت را خالی نگذارید");
  } else if (!regexCellphone.test(cellphoneNumber)) {
    showError(input, "لطفا تلفن همراه معتبر وارد کنید");
  } else {
    showSuccess(input);
    valid = true;
  }
  return valid;
};
const checkPhone = function (input) {
  let valid = false;
  const persianToEnglish = (s) =>
    s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const regexPhone = new RegExp("(^0[0-9]{2,}[0-9]{7,}$)");
  const phoneNumber = persianToEnglish(input.value);
  if (!checkEmpty(input)) {
    showError(input, "لطفا این قسمت را خالی نگذارید");
  } else if (!regexPhone.test(phoneNumber)) {
    showError(input, "لطفا تلفن معتبر وارد کنید");
  } else {
    showSuccess(input);
    valid = true;
  }
  return valid;
};
const checkEmail = function (input) {
  let valid = false;
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!checkEmpty(input)) {
    showError(input, "لطفا این قسمت را خالی نگذارید");
  } else if (!input.value.match(regexEmail)) {
    showError(input, "لطفا ایمیل معتبر وارد کنید");
  } else {
    showSuccess(input);
    valid = true;
  }
  return valid;
};
const isSecondFormValid = function () {
  let isNameValid = checkName(inputName, "نام");
  let isFamilyNameValid = checkName(inputFamilyName, "نام خانوادگی");
  let isCellphoneValid = checkCellphone(inputCellphone);
  let isPhoneValid = checkPhone(inputPhone);
  let isInputOrganizationLevelValid = checkEmpty(inputOrganizationLevel);
  let isEmailValid = checkEmail(inputEmail);
  let isAddressValid = checkEmpty(inputAddress);
  let isValid =
    isNameValid &&
    isFamilyNameValid &&
    isCellphoneValid &&
    isPhoneValid &&
    isInputOrganizationLevelValid &&
    isEmailValid &&
    isAddressValid;
  if (!isValid) {
    return;
  }
};
btnNextSecond.addEventListener("click", function (e) {
  e.preventDefault();
  isSecondFormValid();
});
formIdentityInformation.addEventListener("submit", function (e) {
  e.preventDefault();
  isSecondFormValid();
});

const checkCode = function (input, codeLength) {
  let valid = false;
  if (!checkEmpty(input)) {
    showError(input, "لطفا این قسمت را خالی نگذارید");
  } else if (isNaN(+input.value)) {
    showError(input, "لطفا مقدار معتبر وارد کنید");
  } else if (+input.value.length !== codeLength) {
    showError(input, "لطفا کد معتبر وارد کنید");
  } else {
    showSuccess(input);
    valid = true;
  }
  return valid;
};
const isThirdFormValid = function () {
  let isCompanyNameValid = checkName(inputCompanyName, " نام شرکت");
  let isNationalIDValid = checkCode(inputNationalID, 11);
  let isEconomicCodeValid = checkCode(inputEconomicCode, 12);
  let isEmailSecondValid = checkEmail(inputEmailSecond);
  let isAddressSecondValid = checkEmpty(inputAddressSecond);
  let isNameValid = checkName(inputNameAgent, "نام");
  let isFamilyNameValid = checkName(inputFamilyNameAgent, "نام خانوادگی");
  let isCellphoneValid = checkCellphone(inputCellphoneAgent);
  let isPhoneValid = checkPhone(inputPhoneAgent);
  let isInputOrganizationLevelValid = checkEmpty(inputOrganizationLevelAgent);
  let isEmailValid = checkEmail(inputEmailAgent);
  let isAddressValid = checkEmpty(inputAddressAgent);
  let isValid =
    isCompanyNameValid &&
    isNationalIDValid &&
    isEconomicCodeValid &&
    isEmailSecondValid &&
    isAddressSecondValid &&
    isNameValid &&
    isFamilyNameValid &&
    isCellphoneValid &&
    isPhoneValid &&
    isInputOrganizationLevelValid &&
    isEmailValid &&
    isAddressValid;
  if (!isValid) {
    return;
  }
};
btnNextThird.addEventListener("click", function (e) {
  e.preventDefault();
  isThirdFormValid();
});
formLegalInformation.addEventListener("submit", function (e) {
  e.preventDefault();
  isThirdFormValid();
});
