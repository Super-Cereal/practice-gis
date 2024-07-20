"use strict";

const fp = require("fastify-plugin");

/**
 * Плагин для работы с CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
module.exports = fp(async function (fastify) {
  fastify.register(require("@fastify/cors"), {
    origin: "*",
    methods: ["GET", "POST"],
  });
});
