const regexUrl = /^https?:\/\/(w{3}\.)?[a-z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/i;
const regexHex = /^[0-9,a-f]{24}$/i;

module.exports = {
  regexUrl,
  regexHex,
};
