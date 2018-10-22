const devConfig = { 
    MONGO_URL: 'mongodb://localhost:27017/stratos-dev', 
    JWT_SECRET: 'thisisasecret',
}; 
const testConfig = { MONGO_URL: 'mongodb://172.17.0.4:27017/stratos-test', JWT_SECRET: 'thisisasecret'}; 
const prodConfig = { MONGO_URL: 'mongodb://172.17.0.4:27017/stratos-prod', JWT_SECRET: 'thisisasecret'};
const defaultConfig = {
    PORT: process.env.PORT || 3000,
};


function envConfig(env) {
     switch (env) {
         case 'development':
             return devConfig;
         case 'test':
             return testConfig;
         default:
             return prodConfig;
     }
 }
  //Take defaultConfig and make it a single object 
 //So, we have concatenated two objects into one 
 export default { ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
};