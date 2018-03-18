const fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

fs.readFile('./convertcsv.json', (err, data) => {
  if (err) throw err;

  var JSONData = JSON.parse(data);

  for(i = 0; i < JSONData.length; i++)
  {
    if(JSONData[i].post_status === 'publish')
    {
      var Date = JSONData[i].post_date;
      Date = Date.split(" ");
      var FileName = JSONData[i].post_title + ".md"
      var Content =
      '---\nlayout: post\ntitle: "' + JSONData[i].post_title.replaceAll('"', '\\"') +
      '"\ndate: ' + Date[0] +
      '\nexcerpt: \'' + JSONData[i].post_excerpt.replaceAll(":", "&#58;").replaceAll("'", "&#39;") +
      '\'\n---\n\n' + JSONData[i].post_content;

      fs.writeFile('_archive/' + FileName, Content, (err) => {
          if (err) throw err;
      });
    }
  }
});
