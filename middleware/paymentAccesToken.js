const { base64encode, base64decode } = require('nodejs-base64')
const unirest = require('unirest')

function getAccess(req, res, next) {
  //get access token---------------

  //encoding auth basic access-------

  const accessString = `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  const basicAuth = base64encode(accessString)


  const url =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

  let request = unirest('GET', url)
    .headers({
      Authorization:
        'Basic ' + basicAuth,
    })

    .send()
    .end((resp) => {
      if (resp?.Error) {
        console.log('Having error')
        console.log(resp.Error)
      } else {
        req.token = resp.body?.access_token
        next()
      }
    })
}

module.exports = getAccess