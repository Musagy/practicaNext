const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

module.exports = phase => {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER
  const images = {
    domains: ['ed.team']
  }
  const env = {
    SITE_NAME: "Diego's Blog",
    API_BLOG: (()=>{
      if (isDevelopment) {
        return "ed"
      } else {
        return ""
      }
    })()
  }

  return {
    env,
    images
  }
}