const { OPCUAClient, MessageSecurityMode, SecurityPolicy, UserTokenType } = require('node-opcua')

const fetch = require('node-fetch')
const {
  MAX_RETRY,
  NODE_ID,
  VARIABLE_LIST,
  EGRESS_URL,
  MODULE_NAME,
  OPC_UA_SERVER,
  OPC_UA_USERNAME,
  OPC_UA_PASSWORD,
} = require('../config/config')

const { isValidURL } = require('./util')

const connectionStrategy = {
  maxRetry: MAX_RETRY,
}

const options = {
  applicationName: MODULE_NAME,
  connectionStrategy: connectionStrategy,
  securityMode: MessageSecurityMode.None,
  securityPolicy: SecurityPolicy.None,
  endpoint_must_exist: false,
}

const processRead = async () => {
  try {
    const client = OPCUAClient.create(options)
    await client.connect(OPC_UA_SERVER)
    // we might need to specify encryptionAlgorithm and policyId as well in future, also for certificate authentication we need storage of certificates in order to use it
    /*
      for example:
      let userIdentity = {
          type: UserTokenType.Certificate,
          certificateData: fs.readFileSync('./user-certificates/file.pem'),
          privateKey: fs.readFileSync('./user-certificates/key.pem','utf8')
      }
    */
    const userIdentity = { type: UserTokenType.UserName, userName: OPC_UA_USERNAME, password: OPC_UA_PASSWORD }
    const session =
      OPC_UA_USERNAME && OPC_UA_PASSWORD ? await client.createSession(userIdentity) : await client.createSession()

    const vars = VARIABLE_LIST.split(',')
    for (let i = 0; i < vars.length; i++) {
      if (vars[i] !== '') {
        const value = await session.read(`ns=${NODE_ID};s=${vars[i]}`, 0)
        await send(vars[i], value)
      }
    }
    await session.close()
  } catch (e) {
    console.log(`Failed to create session with OPC UA server ${OPC_UA_SERVER}, error:  ${e}`)
  }
}
const send = async (name, value) => {
  if (isValidURL(EGRESS_URL)) {
    await fetch(EGRESS_URL, {
      method: 'POST',
      body: JSON.stringify({
        timestamp: Date.now(),
        value,
        name,
      }),
    })
  } else {
    console.log(
      JSON.stringify({
        timestamp: Date.now(),
        value,
        name,
      })
    )
  }
}

module.exports = {
  processRead,
}
