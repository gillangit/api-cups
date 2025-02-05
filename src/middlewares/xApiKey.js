const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const authApiKey = async (req) => {
  // const xapiKey = config.webhook.xApiKey;
  const allowedDomains = (config.webhook.allowDomains || '').split(',').map((domain) => domain.trim());

  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'API Key is missing');
  }

  // if (apiKey !== xapiKey) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid API Key');
  // }

  // Check if the API key has expired
  // if (new Date() > keyRecord.expiresAt) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'API Key has expired');
  // }

  const { origin } = req.headers;
  if (allowedDomains && allowedDomains.length > 0) {
    if (!origin || !allowedDomains.includes(origin)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Access from this domain is not allowed');
    }
  }
};

module.exports = authApiKey;
