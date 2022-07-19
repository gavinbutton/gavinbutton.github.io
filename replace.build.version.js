// 1: adds a build timestamp to the site.
// 2: copies the index file to a 404 file for deep links in GH pages.
const fs = require("fs");
const replace = require('replace-in-file');

var buildVersion = new Date().toISOString();
const options = {
  files: 'docs/index.html',
  from: /{BUILD_VERSION}/g,
  to: buildVersion,
  allowEmptyPaths: false,
};

try {
  // add the build timestamp to the index.html page
  let changedFiles = replace.sync(options);
  console.log('Build version set: ' + buildVersion);

  // copy the index.html to 404.html for GH page deep link issue.
  const source = "docs/index.html";
  const dest = "docs/404.html";
  fs.copyFile(source, dest , (err) => {
    if (err) throw err;
    console.log(`${source} was copied to ${dest}`);
  });
}
catch (error) {
  console.error('Error occurred:', error);
}
