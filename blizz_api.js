var getJSON = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};



var getCharacterData = function (server, username, callback) {
  getJSON('https://us.api.battle.net/wow/character/' + server + '/' + username + '?locale=en_US&apikey=d2v725c8mbg5st8gq8vmawq9a8sgy3qe', (err, data) => {
    callback(err, data);
  });
}

var getLeaderboard =  function (bracket, callback) {
  getJSON('https://us.api.battle.net/wow/leaderboard/' + bracket + '?locale=en_US&apikey=d2v725c8mbg5st8gq8vmawq9a8sgy3qe', (err, data) => {
    callback(err, data);
  });
}

getLeaderboard('3v3', (err, data) => {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    var classIdToName = ["", "#C79C6E", "#F58CBA", "#ABD473", "#FFF569", "#FFFFFF", "#C41F3B", "#0070DE", "#69CCF0", "#9482C9", "#00FF96", "#FF7D0A", "#A330C9"];
    for (var i = 0; i < 10; i++) {
      document.getElementById('tbody').innerHTML += "<tr><td style=\"color: #665200\">" + data.rows[i].ranking +
                                                    "</td><td style=\"color: " + classIdToName[data.rows[i].classId] + "\";>" + data.rows[i].name +
                                                    "</td><td style=\"color: brown\">" + data.rows[i].realmName +
                                                    "</td><td style=\"color: #00802b\">" + data.rows[i].seasonWins +
                                                    "</td><td style=\"color: #800000\">" + data.rows[i].seasonLosses +
                                                    "</td><td style=\"color: #665200\">" + data.rows[i].rating + "</td></td>";
    }
  }
});
