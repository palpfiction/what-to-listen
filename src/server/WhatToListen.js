const LastFm = require("lastfm-node-client");

const LIMIT = 10;

class WhatToListen {
    /**
     * create a WhatToListen instance
     * @param {string} apiKey last.fm api key
     */
    constructor(apiKey) {
        if (apiKey === undefined) throw new Error("apiKey must be provided!");
        if (typeof apiKey !== "string")
            throw new TypeError("apiKey must be string!");

        this.lastFmClient = new LastFm(apiKey, undefined, undefined);
    }

    /**
     * returns a promise with an album to listen, with the specified params
     * @param {Object} params
     * @param {string} params.user
     * @param {number} params.minPlayCount
     * @param {("7day"|"1month"|"3month"|"6month"|"12month"|"overall")} params.period defaults to "overall"
     * @returns {Promise}
     */
    async getAlbumToListen(params) {
        if (!params.user) return error("User is required");
        if (!params.minPlayCount) params.minPlayCount = 10;
        if (!params.period) params.period = "overall";


        try {
            const totalPages = await getTotalPages(
                params.user,
                params.period,
                this.lastFmClient
            );

            if (totalPages == 0)
                return error(`User does not exist or has no scrobbles.`);

            const result = await getRandomAlbum(totalPages, params, this.lastFmClient);
            return mapToResponse(result);
        } catch (e) {
            return error(`Unkown error happened: ${e}`);
        }
    }
}

async function getRandomAlbum(maxPage, params, lastFmClient) {
    if (maxPage === 1)
        return {
            error: `Couldn't find such an album`,
        };

    const page = getRandomNumber(1, maxPage);
    const topAlbums = await getTopAlbums(
        params.user,
        params.period,
        page,
        lastFmClient
    );

    const candidates = topAlbums.album.filter(
        (album) => parseInt(album.playcount) >= params.minPlayCount
    );

    if (candidates.length <= 0)
        return getRandomAlbum(page, params, lastFmClient);

    const album = topAlbums.album[getRandomNumber(0, topAlbums.album.length)];
    return album;
}

async function getTopAlbums(user, period, page, lastFmClient) {
    const response = await lastFmClient.userGetTopAlbums({
        user,
        period,
        page,
        limit: LIMIT,
    });

    return response.topalbums;
}

async function getTotalPages(user, period, lastFmClient) {
    const response = await lastFmClient.userGetTopAlbums({
        user,
        period,
        limit: LIMIT,
    });

    return retrieveTotalPages(response.topalbums);
}

/**
 * returns a random number from `min` to `max`
 * @param {number} min
 * @param {number} max
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function retrieveTotalPages(topAlbums) {
    if (!topAlbums || !topAlbums.hasOwnProperty("@attr")) return;

    return topAlbums["@attr"].totalPages;
}

function error(message) {
    return {
        error: message,
    };
}

function mapToResponse(album) {
    if (album.error) return album;
    return {
        album: {
            name: album.name,
            artist: album.artist.name,
            image: album.image[3]['#text'],
            playcount: album.playcount
        }
    }
}

module.exports = WhatToListen;
