const request = require('request');
const fs = require('fs')
require('dotenv').config();
const owner = process.argv[2];
const repo = process.argv[3];

// const secrets = require('secrets');

console.log("Welcome to the GitHub Avatar Downloader!!");

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    qs: {
      access_token: process.env.GITHUB_API_TOKEN
    },
    headers: {
      'User-agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    callback(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath))
  console.log(url);
}


getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors: ", err)
  // console.log("Result: ", result)
  const contributors = JSON.parse(result);
  for (var i = 0; i < contributors.length; i++) {
    downloadImageByURL(contributors[i].avatar_url, `./downloads/${contributors[i].login}.jpg`);
  }
})