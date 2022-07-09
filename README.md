# OPC UA Reader

|                |                                                                                 |
| -------------- | ------------------------------------------------------------------------------- |
| Name           | OPC UA Reader                                                                   |
| Version        | v1.0.0                                                                          |
| Dockerhub Link | [weevenetwork/opcua-reader](https://hub.docker.com/r/weevenetwork/opcua-reader) |
| Authors        | Mesud Pasic                                                                     |

- [OPC UA Reader](#OPCUAReader)
  - [Description](#description)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
    - [Module Specific](#module-specific)
    - [Set by the weeve Agent on the edge-node](#set-by-the-weeve-agent-on-the-edge-node)
  - [Dependencies](#dependencies)

## Description

OPC UA Reader reads values for variables and forwards the payload to next module.

## Environment Variables

| Environment Variables | type    | Description                               |
| --------------------- | ------- | ----------------------------------------- |
| OPC_UA_SERVER         | string  | OPC UA Server endpoint                    |
| MAX_RETRY             | integer | Max retry for connection                  |
| NODE_ID               | string  | Node ID to connect to                     |
| VARIABLE_LIST         | string  | Comma separated list of variables to read |
| OPC_UA_USERNAME       | string  | Username if authentication is required    |
| OPC_UA_PASSWORD       | string  | Password if authentication is required    |

### Module Specific

### Set by the weeve Agent on the edge-node

| Environment Variables | type   | Description               |
| --------------------- | ------ | ------------------------- |
| MODULE_NAME           | string | Name of the module        |
| INGRESS_HOST          | string | Host where app is running |
| INGRESS_PORT          | string | Port where app is running |

## Output sent to next module looks like this

```js
  {
    timestamp: <timestamp value>,
    value: <value of the variable>,
    name: <name of the variable>,
  }
```

## Dependencies

```js
"dependencies": {
    "express": "^4.17.3",
    "express-winston": "^4.2.0",
    "node-fetch": "^2.6.1",
    "node-opcua": "^2.71.0"
}
```
