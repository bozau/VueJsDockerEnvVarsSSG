# VueJsDockerEnvVarsSSG
Example Vue 3 static site with Docker and Environment variables being picked up and doesn't require docker image rebuilds for each environment tier.

There's probably a cleaner way if so, fork it, this works for me at the moment 😅 .

## Where to look

- nginx-entrypoint.sh
- Dockerfile
- src/app.config.ts
- src/main.ts

These files contain the majority of how to understand what you need in order to inject yours.
I've included a docker compose file for some further understanding, naturally you could use a CI/CD process with this file to perform the environment value replacement for each environment tier.

# Why Though?

So there might be people that stumble across this and say 'But why, why not build an image for each environment', its understandable, but... build once deploy multiple times, it's all about immutability of your image, each time you build, there's a chance you introduce something, either a change in the build agent you're using, the tools that underly it etc. Any potential rebuild introduces a risk to consistency.

You can checkout some articles and discussions on this;

- [Build Once, Deploy Many : r/devops](https://www.reddit.com/r/devops/comments/d9ln04/build_once_deploy_many/)
- [Giulio Vian - Build once, deploy everywhere — part 1](https://medium.com/@giuliovdev/build-once-deploy-everywhere-part-1-706d7affaf0f)
- [Redhat - Build Once, Deploy Anywhere!](https://www.redhat.com/en/blog/build-once-deploy-anywhere)

The original Stack Overflow question that this helped with to offer this example: [StackOverflow - Pass environment variable into a Vue App at runtime - Johann](https://stackoverflow.com/q/53010064/7030317)
