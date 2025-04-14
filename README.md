# monorepo-magic
A magical mono repo for developing websites, apps, microservices and more.

## This mono-repo would contain the following workspaces managed by Nx

### Node Workspaces:
- ``Nx`` would be used for workspace management
- ``PNPM`` to be used for package management
- Frontend frameworks like:
    1. ``Angular`` mono-repo (ng-mono)
    2. ``Next`` and  mono-repos for ``React``
    3. ``Expo`` mono-repo for `react-native`
    4. ``Svelte``
    5. ``Nuxt`` mono-repo for ``Vue``

- Backend frameworks:
    1. ``Nest`` for ``Node`` backend microservices

    ### Java Workspace
    - This workspace would have various microservices based on ``spring-boot`` and ``Quarkus``
    - Package management would be done by ``maven`` or ``gradle``
    - Could also contain ``Kotlin`` packages

    ### Python Workspace
    - Package management would be done by ``poetry``

    ### Go Workspace

    ### Flutter workspace
    - ``melos`` could be used for package management