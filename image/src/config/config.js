const env = require('../utils/env')

module.exports = {
  INGRESS_HOST: env('INGRESS_HOST', '127.0.0.1'),
  INGRESS_PORT: env('INGRESS_PORT', '8080'),
  MODULE_NAME: env('MODULE_NAME', 'OPC UA Reader'),
  EGRESS_URL: env('EGRESS_URL', ''),
  OPC_UA_SERVER: env('OPC_UA_SERVER', 'opc.tcp://localhost:26543'),
  MAX_RETRY: env('MAX_RETRY', 1),
  NODE_ID: env('NODE_ID', 3),
  VARIABLE_LIST: env('VARIABLE_LIST', 'Scalar_Simulation_Float'),
  OPC_UA_PASSWORD: env('OPC_UA_PASSWORD', ''),
  OPC_UA_USERNAME: env('OPC_UA_USERNAME', ''),
  REQUIRES_AUTHENTICATION: env('REQUIRES_AUTHENTICATION', 'no'),
}
