const crypto = require('crypto');
const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // Ambil API Key dari header
  const storedApiKey = config.xapikey; // API Key dari config

  if (!apiKey) {
    throw new ApiError(httpStatus.FORBIDDEN, 'API Key is required');
  }

  // Konversi API Key ke buffer
  const apiKeyBuffer = Buffer.from(apiKey, 'utf-8');
  const storedApiKeyBuffer = Buffer.from(storedApiKey, 'utf-8');

  // Cegah perbedaan panjang buffer
  if (apiKeyBuffer.length !== storedApiKeyBuffer.length) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid API Key');
  }

  // Bandingkan secara aman untuk mencegah timing attack
  if (!crypto.timingSafeEqual(apiKeyBuffer, storedApiKeyBuffer)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid API Key');
  }

  next(); // API Key valid, lanjut ke route berikutnya
};

module.exports = verifyApiKey;
