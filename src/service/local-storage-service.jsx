const email = 'email';
const applicantId = 'applicantId';

function getLS(key) {
  return window.localStorage.getItem(key);
}

function setLS(key, value) {
  window.localStorage.setItem(key, value);
}

export function getEmail() {
  return getLS(email);
}

export function setEmail(value) {
  setLS(email, value);
}

export function getApplicantId() {
  return getLS(applicantId);
}

export function setApplicantId(value) {
  setLS(applicantId, value);
}
