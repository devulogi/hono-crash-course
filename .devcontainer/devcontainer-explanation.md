# .devcontainer/devcontainer.json Explanation

This file configures your VS Code development container environment. Here’s what each line does:

```json
{
  "name": "Hono MiniBus API", // Name of the dev container
  "dockerComposeFile": "docker-compose.yml", // Docker Compose file to use for setup
  "service": "app", // Main service to run in the container
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}", // Workspace folder inside the container
  "shutdownAction": "stopCompose", // Action to take when shutting down the container
  "postCreateCommand": "sudo chown -R $(whoami):$(whoami) /workspaces && npm install", // Command after container creation
  "customizations": {
    "vscode": {
      "extensions": [
        // List of VS Code extensions to install
        "amazonwebservices.amazon-q-vscode",
        "arjun.swagger-viewer",
        "christian-kohler.npm-intellisense",
        "christian-kohler.path-intellisense",
        "cweijan.dbclient-jdbc",
        "cweijan.vscode-redis-client",
        "dbaeumer.vscode-eslint",
        "docker.docker",
        "dotenv.dotenv-vscode",
        "eamodio.gitlens",
        "editorconfig.editorconfig",
        "esbenp.prettier-vscode",
        "github.copilot",
        "github.copilot-chat",
        "gruntfuggly.todo-tree",
        "humao.rest-client",
        "jebbs.plantuml",
        "ms-azuretools.vscode-containers",
        "ms-azuretools.vscode-docker",
        "ms-vscode-remote.remote-containers",
        "ms-vscode.vscode-typescript-next",
        "pkief.material-icon-theme",
        "streetsidesoftware.code-spell-checker"
      ],
      "settings": {
        "typescript.preferences.importModuleSpecifier": "relative", // Use relative imports for TypeScript
        "editor.formatOnSave": true, // Format files on save
        "editor.defaultFormatter": "esbenp.prettier-vscode", // Set Prettier as the default formatter
        "plantuml.server": "https://www.plantuml.com/plantuml", // PlantUML server URL for rendering diagrams
        "plantuml.render": "PlantUMLServer" // Render PlantUML diagrams using the server
      }
    }
  },
  "forwardPorts": [3000, 5432, 6379], // Ports to forward from the container to the host
  "portsAttributes": {
    "3000": {
      "label": "Hono API", // Label for the Hono API port
      "onAutoForward": "notify" // Notify when port is auto-forwarded
    },
    "5432": {
      "label": "PostgreSQL" // Label for the PostgreSQL port
    },
    "6379": {
      "label": "Redis" // Label for the Redis port
    }
  }
}
```

---

## Summary Table

| Key                   | Purpose                                      |
| --------------------- | -------------------------------------------- |
| name                  | Name of the dev container                    |
| dockerComposeFile     | Docker Compose file for setup                |
| service               | Main service to run                          |
| workspaceFolder       | Workspace folder inside container            |
| shutdownAction        | Action on shutdown                           |
| postCreateCommand     | Command after container creation             |
| customizations.vscode | VS Code extensions and settings              |
| forwardPorts          | Ports forwarded to host                      |
| portsAttributes       | Labels and notifications for forwarded ports |

## Notes

- This file is standard JSON, so comments are not allowed in the actual file.
- Use this Markdown file for reference and documentation.
