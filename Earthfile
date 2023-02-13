VERSION 0.6

ARG --required DOCKER_REGISTRY_GROUP
ARG --required NEXUS_USER
ARG --required NPM_REGISTRY_GROUP
ARG --required NPM_REGISTRY_RELEASES
ARG --required NPM_REGISTRY_SNAPSHOTS
ARG --required NEXUS_REPOSITORY_URL


deps:
    ARG --required BASE_IMAGES_VERSION
    FROM ${DOCKER_REGISTRY_GROUP}/genestack-builder:${BASE_IMAGES_VERSION}

    COPY packages/ui-proxy/package.json \
         packages/ui-proxy/package-lock.json ./

    RUN --secret NEXUS_PASSWORD \
            npm-login.sh && \
            npm install

    SAVE IMAGE --cache-hint

build:
    FROM +deps

    COPY packages/ui-proxy/ ./

    # Nothing to build and test
    #RUN \
    #    npm run test && \
    #    npm run build && \
    #    npm run build:bundle

    SAVE IMAGE --cache-hint

libraries:
    FROM +build

    RUN --push \
        npm publish

main:
    BUILD +libraries
