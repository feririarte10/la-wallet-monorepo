import * as fs from 'fs';
import * as path from 'path';
import { simpleGit } from 'simple-git';
import { TEMPLATE_PLUGIN_REPOSITORY } from '../helpers/contants.js';
import { execCommand, installDependencies, normalizePluginName } from '../helpers/utils.js';
import { validateNpmName } from '../helpers/validate-pkg.js';
import { requestPrompt } from '../helpers/prompt.js';

let pluginPackage: string = '';

async function cloneRepository(targetDir: string, repoUrl: string) {
  const git = simpleGit();

  try {
    console.log('\x1b[33m%s\x1b[0m', 'Cloning repository plugin template ...');
    if (fs.existsSync(targetDir)) {
      console.error('Error: The destination folder already exists...');
      process.exit(0);
    }

    await git.clone(repoUrl, targetDir);
    console.log('\x1b[32m', `Cloned repository in ${targetDir}`);
  } catch (error) {
    console.error('Error with the plugin template repository: ', error);
    process.exit(1);
  }
}

function renamePluginPackageName(pluginPath: string, pluginName: string) {
  const packageJsonPath = path.join(pluginPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  packageJson.name = pluginName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

export const initializePluginRepository = async (packageName: string, targetDir: string) => {
  await cloneRepository(targetDir, TEMPLATE_PLUGIN_REPOSITORY);
  renamePluginPackageName(targetDir, packageName);

  console.log('\x1b[33m%s\x1b[0m', 'Set the plugin information');

  const title = await requestPrompt({
    message: 'Enter the title: ',
    initial: 'Plugin Title',
  });

  const description = await requestPrompt({
    message: 'Enter the description: ',
    initial: 'Plugin short description',
  });

  const author = await requestPrompt({
    message: 'Enter the author: ',
    initial: 'La Crypta Labs',
  });

  const metadataPath = path.join(targetDir, './src/manifest/metadata.json');
  fs.writeFileSync(
    metadataPath,
    `{
      "title": "${title}",
      "description": "${description}",
      "image": "", 
      "author": "${author}"
  }`,
  );

  installDependencies();
};

export async function createPlugin(rootPath: string): Promise<void> {
  const pluginName = await requestPrompt({
    message: 'What is your plugin named?',
    initial: 'my-plugin',
    customProps: {
      validate: (name: string) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return 'Invalid project name: ' + validation.problems[0];
      },
    },
  });

  if (typeof pluginName === 'string') pluginPackage = pluginName.trim();

  if (!pluginPackage) {
    console.log('\nPlease specify the project directory');
    process.exit(1);
  }

  const targetPath = path.resolve(rootPath, normalizePluginName(pluginPackage));
  await initializePluginRepository(pluginPackage, targetPath);

  execCommand(`pnpm add-plugin --name "${pluginPackage}" --w`);
}
