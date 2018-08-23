$(document).ready(function (){
});

function searchRepositories() {
  let searchTerm = $("#searchTerms").val()
  let url = `https://api.github.com/search/repositories?q=${searchTerm}`
  $.get(url, function(response) {
    const repoList = response.items.map(function(responseItem){ return( "<p>" + responseItem.name + "</p>"
      + "<p>" + '<a href="#" data-repository="' + responseItem.name + '" data-owner="' + responseItem.owner.login + '" onclick="showCommits(this)">Get Commits</a>'  + "</p>")}).join("")

    $("#results").html(repoList)
  }).fail(function(error){
    displayError()
  })
  }

function displayError(error) {
    $("#errors").html(`I'm sorry, there's been an error. Please try again.`)
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`

  $.get(url, function(response) {
    const commitList = response.map(function(responseItem) {
      return(
        `<p> ${responseItem.sha} </p>`
      )
    }).join("")
    $("#details").html(commitList)
  })
}


//   xhr.done(function(data) {
//     console.log("WE GOT DATA");
//     data.map(result => { console.log(result) })
//     data.map(function(result) {
//       console.log(result)
//     })
//   });

//   xhr.fail(function() {
//     console.log("OH NO, WE DID NOT GET DATA");
//   });
// }
// $("#results").html(repoCollection)
// var resultElement = $("#results");
// var resultHTML = resultElement.html
// resultHTML(repoCollection)
