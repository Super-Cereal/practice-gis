"use strict";
const { find } = require("geo-tz");

module.exports = async function (fastify, opts) {
  /** Возвращает список таймзон */
  fastify.post("/api/find-timezone", async function (request, reply) {
    const { lat, long } = request.body;

    return { timezone: find(lat, long) };
  });
};
