require('dotenv').config();
const { ImgurClient } = require('imgur');
const { createReadStream } = require('fs');
const fs = require('fs');

async function uploadImage(pathToImage)
{
    const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });
    const response = await client.upload({
        image: createReadStream(pathToImage),
        type: 'stream',
    });
    return response.data.link;
}
async function deleteLocalImage(pathToImage)
{
    fs.unlink(pathToImage, (err) => {
        if(err) console.log(err);
    });
}

module.exports = {uploadImage,deleteLocalImage};