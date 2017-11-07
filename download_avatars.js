const request = require('request');

require('dotenv').config();

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors: ", err)
  // console.log("Result: ", result)
  const contributors = JSON.parse(result);
  for (var i = 0; i < contributors.length; i++) {
    console.log(contributors[i].avatar_url);
  }
})