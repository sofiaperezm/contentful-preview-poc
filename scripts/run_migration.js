const path = require('path');
const { execSync } = require('child_process');

const timeStamp = Math.floor(Date.now() / 1000);
const folder = path.resolve(process.cwd(), 'migrations');
const filename = `${timeStamp}-from-${process.env.SOURCE_ENVIRONMENT_ID}-to-${process.env.TARGET_ENVIRONMENT_ID}.js`;

const exportCommand = `contentful merge export --yes --output-file ${folder}/${filename} --te ${process.env.TARGET_ENVIRONMENT_ID} --se ${process.env.SOURCE_ENVIRONMENT_ID} --management-token ${process.env.MANAGEMENT_TOKEN} --space-id ${process.env.SPACE_ID}`;

const migrateCommand = `contentful space migration --yes --management-token ${process.env.MANAGEMENT_TOKEN} --environment-id ${process.env.TARGET_ENVIRONMENT_ID} --space-id ${process.env.SPACE_ID} ${folder}/${filename}`;

try {
  console.log('Running export command...');
  execSync(exportCommand, { stdio: 'inherit' });
  console.log('Export successful. Running migration command...');
  execSync(migrateCommand, { stdio: 'inherit' });
  console.log('Migration successful.');
} catch (error) {
  console.error('Error during migration:', error);
  process.exit(1);
}