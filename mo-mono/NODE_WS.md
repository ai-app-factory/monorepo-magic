# Node & Ts Workspace
- Managed by [Nx](https://nx.dev/getting-started/intro)
- Packages managed by [PNPM](https://pnpm.io/)

Here we have information on the tools and libraries that we would be using for Node & TS workspaces

## Angular (ng-mono)
The workspaces' libraries are split into the following 4 categories:
- Utils (Can depend only other Utils)
- UI (Can depend only on other UI and any Utils )
- Data-Access (Can depend on UI, Utils)
- Features (Could depend on any Data-Access, UI and Utils)

In case of UI libraries we have the following design-systems:
- Material
- Clarity
- Tailwind

## React (Next)
Here we could have the following library classification:

- UI
- Shared Hooks

In case of UI we would implement the following:
- MUI (Material)
- SchadCN (Tailwind)