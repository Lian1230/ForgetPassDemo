export const env = process.env.APP_ENV || process.env.NODE_ENV;

const IP = process.env.IP || 'localhost';
const variables = {
  development: {
    devBox: true,
    authService: `http://${IP}:10001`,
    userService: `http://${IP}:10010`,
    storageService: `http://${IP}:8081`,
    externalService: `http://${IP}:10020`,
    reduxBrowserPlugin: true,
  },
  staging: {
    devBox: false,
    authService: 'https://stage-api.corl.io/auth',
    userService: 'https://stage-api.corl.io/user',
    storageService: 'https://stage-api.storage.corl.io',
    externalService: 'https://stage-api.external.corl.io',
    reduxBrowserPlugin: true,
  },
  production: {
    devBox: false,
    authService: 'https://api.corl.io/auth',
    userService: 'https://api.corl.io/user',
    storageService: 'https://api.storage.corl.io',
    externalService: 'https://api.external.corl.io',
    reduxBrowserPlugin: false,
  },
};

export const {
  devBox, reduxBrowserPlugin, userService, storageService, externalService, authService,
} = variables[(env as 'development' | 'staging' | 'production')];

export const credentials = {
  passwordSalt: '1mj012QtOcVQq8qmQLVfe',
  api_name: 'seedlify_front_end',
  api_key: 'gH4QeU7H',
  jwt_header: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
};

export const recaptcha: { [key: string]: ObjStr } = {
  development: {
    siteKey: '6LebVkAUAAAAAF1cScHv7oQ-d086uaW8DTEw5UYQ',
    secretKey: '6LebVkAUAAAAAMgpujBvs-PvaVhKYCRQ2Je4qatk',
  },
  staging: {
    siteKey: '6LdcRUEUAAAAAC0-BuIgURXKuOfNtaTXssrGFhNE',
    secretKey: '6LdcRUEUAAAAALE0rTQIYsrqGf9JAjGcBAx_izqK',
  },
};

export const documentTypeId: Obj = {
  government_id: 1,
  acrticle_of_incorporation: 8,
  shareholder_registry: 9,
  shareholders_photo_id: 10,
  proof_of_accreditation_status: 11,
};

export const ethAddress = '0x7c93ba062e2c3baf6eb6e95f171d1733a2036099';
export const contractAddress = {
  polymath: '0x9992eC3cF6A55b00978cdDF2b27BC6882d88D1eC',
  corl: '',
};

export const whitepaper = 'https://corl.io/whitepaper';

export const sessionCountDown = 120;

// tslint:disable-next-line:max-line-length
export const etherScanUri = (userEthAddress: string) => `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddress.polymath}&address=${userEthAddress}&tag=latest&apikey=9J944DFM47FEMR1EH1NDD4WNEJYVZNXCM5*;`;
