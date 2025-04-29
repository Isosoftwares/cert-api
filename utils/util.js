const { default: axios } = require("axios");
const MailTM = require("mail.tm-api");
const crypto = require("crypto");

async function generateTempEmail() {
  try {
    // Step 1: Get available domains
    const domainsResponse = await axios.get("https://api.mail.tm/domains");
    const domains = domainsResponse.data["hydra:member"];
    if (!domains.length) throw new Error("No domains available");
    const domain = domains[0].domain; // Correctly extract the domain string

    // Step 2: Generate random username and password
    const username = crypto.randomBytes(5).toString("hex");
    const password = crypto.randomBytes(8).toString("hex");
    const email = `${username}@${domain}`;

    // Step 3: Create account
    const accountResponse = await axios.post("https://api.mail.tm/accounts", {
      address: email,
      password,
    });

    // Step 4: Authenticate to get token
    const tokenResponse = await axios.post("https://api.mail.tm/token", {
      address: email,
      password,
    });

    return {
      email,
      password,
      token: tokenResponse.data.token,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateTempEmail };
