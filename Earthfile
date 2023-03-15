VERSION 0.7

IMPORT ./packages/ui-proxy

ARG --global --required HARBOR_DOCKER_SNAPSHOTS
ARG --global --required HARBOR_DOCKER_RELEASES
ARG --global --required HARBOR_DOCKER_CACHE
ARG --global --required HARBOR_DOCKER_HUB_MIRROR
ARG --global --required NPM_REGISTRY_GROUP
ARG --global --required NPM_REGISTRY_RELEASES
ARG --global --required NPM_REGISTRY_SNAPSHOTS
ARG --global --required NEXUS_REPOSITORY_URL

main:
    ARG --required BASE_IMAGES_VERSION
    BUILD ui-proxy+main \
        --HARBOR_DOCKER_SNAPSHOTS=${HARBOR_DOCKER_SNAPSHOTS} \
        --HARBOR_DOCKER_RELEASES=${HARBOR_DOCKER_RELEASES} \
        --NEXUS_USER=${NEXUS_USER} \
        --NEXUS_PASSWORD=${NEXUS_PASSWORD} \
        --NPM_REGISTRY_GROUP=${NPM_REGISTRY_GROUP} \
        --NPM_REGISTRY_RELEASES=${NPM_REGISTRY_RELEASES} \
        --NPM_REGISTRY_SNAPSHOTS=${NPM_REGISTRY_SNAPSHOTS} \
        --NEXUS_REPOSITORY_URL=${NEXUS_REPOSITORY_URL} \
        --BASE_IMAGES_VERSION=${BASE_IMAGES_VERSION}
