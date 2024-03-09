# VueJsDockerEnvVarsSSG
Example Vue 3 static site with Docker and Environment variables being picked up and doesn't require docker image rebuilds for each environment tier.

There's probably a cleaner way, if so fork it, this works for me at the moment.

## Where to look
- nginx-entrypoint.sh
- Dockerfile
- src/app.config.ts
- src/main.ts

These files contain the majority of how to understand what you need in order to inject yours.
I've included a docker compose file for some further understanding, naturally you could use a CI/CD process with this file to perform the environment value replacement for each environment tier.
