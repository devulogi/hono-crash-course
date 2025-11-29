#!/usr/bin/env node

import fs from 'fs';

/**
 * Documentation generator for Hono OpenAPI
 * Fetches OpenAPI spec from running server and generates markdown
 */

const OPENAPI_URL = 'http://localhost:3000/openapi.json';
const OUTPUT_FILE = 'API_DOCS.md';

async function fetchOpenAPISpec() {
  try {
    console.log('📡 Fetching OpenAPI specification...');
    const response = await fetch(OPENAPI_URL);
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}. Make sure server is running with: npm start`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
      throw new Error('Server not running. Please start the server first with: npm start');
    }
    throw error;
  }
}

function generateMarkdown(spec) {
  if (!spec || !spec.paths) {
    throw new Error('Invalid OpenAPI specification received');
  }
  let markdown = `# ${spec.info.title}\n\n`;
  markdown += `${spec.info.description}\n\n`;
  markdown += `**Version:** ${spec.info.version}\n\n`;
  
  if (spec.servers && spec.servers.length > 0) {
    markdown += `**Base URL:** ${spec.servers[0].url}\n\n`;
  }

  markdown += `## API Endpoints\n\n`;

  // Group paths by tags or just list them
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      markdown += `### ${method.toUpperCase()} ${path}\n\n`;
      markdown += `**Summary:** ${operation.summary}\n\n`;
      
      if (operation.description) {
        markdown += `**Description:** ${operation.description}\n\n`;
      }

      // Parameters
      if (operation.parameters || (operation.requestBody && operation.requestBody.content)) {
        markdown += `**Parameters:**\n\n`;
        
        // Path parameters
        if (operation.parameters) {
          operation.parameters.forEach(param => {
            markdown += `- **${param.name}** (${param.in}): ${param.schema?.type || 'string'} - ${param.description || 'No description'}\n`;
          });
        }

        // Request body
        if (operation.requestBody && operation.requestBody.content) {
          const contentType = Object.keys(operation.requestBody.content)[0];
          const schema = operation.requestBody.content[contentType]?.schema;
          if (schema && schema.properties) {
            markdown += `- **Request Body** (${contentType}):\n`;
            Object.entries(schema.properties).forEach(([prop, propSchema]) => {
              const required = schema.required?.includes(prop) ? ' (required)' : '';
              markdown += `  - \`${prop}\`: ${propSchema.type || 'string'}${required}\n`;
            });
          } else {
            markdown += `- **Request Body**: JSON object\n`;
          }
        }
        markdown += `\n`;
      }

      // Responses
      if (operation.responses) {
        markdown += `**Responses:**\n\n`;
        for (const [code, response] of Object.entries(operation.responses)) {
          markdown += `- **${code}**: ${response.description}\n`;
        }
        markdown += `\n`;
      }

      // Example
      markdown += `**Example:**\n`;
      markdown += `\`\`\`bash\n`;
      const examplePath = path.replace(/{([^}]+)}/g, (match, param) => {
        return operation.parameters?.find(p => p.name === param)?.example || '1';
      });
      markdown += `curl -X ${method.toUpperCase()} http://localhost:3000${examplePath}\n`;
      markdown += `\`\`\`\n\n`;
      markdown += `---\n\n`;
    }
  }

  return markdown;
}

async function main() {
  console.log('🔄 Generating API documentation...');
  
  try {
    // Fetch the actual OpenAPI spec from running server
    const spec = await fetchOpenAPISpec();
    
    // Generate markdown
    const markdown = generateMarkdown(spec);
    fs.writeFileSync(OUTPUT_FILE, markdown);
    
    console.log(`✅ Documentation generated: ${OUTPUT_FILE}`);
    console.log(`📖 Interactive docs: http://localhost:3000/docs`);
    console.log(`📋 OpenAPI spec: http://localhost:3000/openapi.json`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 To generate docs:');
    console.log('1. Start server: npm start');
    console.log('2. In another terminal: npm run docs:generate');
    process.exit(1);
  }
}

main().catch(console.error);