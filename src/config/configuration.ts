export default () => ({
    server: {
      port: parseInt(process.env.SERVER_PORT, 10) || 4000,
    },
    client:{
      url:process.env.CLIENT_URL
    },
    email:{
      apiKey:process.env.API_KEY_PEPIPOST,
      url:process.env.PEPIPOST_URL
    }
  });
  