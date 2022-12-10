VERSION 0.6

IMPORT ./packages/ui-proxy AS ui-proxy

ARG --required DOCKER_REGISTRY_GROUP

test:
  BUILD ui-proxy+test --DOCKER_REGISTRY_GROUP=${DOCKER_REGISTRY_GROUP}

publish:
  BUILD ui-proxy+publish --DOCKER_REGISTRY_GROUP=${DOCKER_REGISTRY_GROUP}
