const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

module.exports = phase => {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER
  const images = {
    domains: ['ed.team']
  }
  const env = {
    SITE_NAME: "Diego's Blog",
    SITE_URL: "https://mc.diego",
    API_BLOG: (()=>{
      if (isDevelopment) {
        return "https://jsonplaceholder.typicode.com/"
      } else {
        return "https://jsonplaceholder.typicode.com/"
      }
    })()
  }

  return {
    env,
    images
  }
}