var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
var Webpages = [{
  'Webpage': 'Target',
  'Color': '#ce0027'
}, {
  'Webpage': 'Gamestop',
  'Color': '#dc260a'
}, {
  'Webpage': 'Barnes',
  'Color': '#143017'
}, {
  'Webpage': 'Walmart',
  'Color': '#041e42'
}, {
  'Webpage': 'Walgreens',
  'Color': '#d10429'
}]

function onLoad() {
  JSONData = ""
  getJSON('http://popfindr.com/getProducts',
    function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
        console.log('error')
      } else {
        JSONData = JSON.parse(data);
        console.log('success')
        for (var i in Webpages) {
          if (window.location.href.toLowerCase().includes(Webpages[i]['Webpage'].toLowerCase())) {
            setWebpage(Webpages[i]['Webpage'], Webpages[i]['Color']);
          } else {
            if (Webpages[i]['Webpage'] == 'Target') {
              setWebpage(Webpages[i]['Webpage'], Webpages[i]['Color']);
            }
          }
        }
      }
    });
}

function resizeMobile(numImages) {
  var screen = $(window)
  if (screen.width() < screen.height()) {
    document.getElementsByClassName('spacer')[0].style['paddingTop'] = "12.5px"
    document.getElementsByClassName('card text-center')[0].style['width'] = '95%'
    document.getElementsByClassName('card text-center')[0].style['margin'] = '0 auto'
    document.getElementsByClassName('card text-center')[0].style['float'] = 'none'
    document.getElementsByClassName('card text-center')[0].style['margin-bottom'] = '10px'
    count = 0
    while (count < 4) {
      document.getElementsByClassName('fit')[count].style['width'] = '100%';
      count++;
      console.log(count)
    }
    $('img')[0].style['cssText'] = "height: 175px;";
    count = 0
    while (count < 2) {
      document.getElementsByClassName('form-control')[count].style.fontSize = '60';
      count++;
    }
    document.getElementsByClassName('btn btn-outline-dark btn-block')[0].style.fontSize = '60';
    count = 1
    while (count < 7) {
      $('img')[count].style['cssText'] = "height: 100px;";
      count++;
    }
    document.getElementsByClassName("input-group")[0].style['cssText'] = 'padding-top:25px;padding-bottom:20px;';
    document.getElementsByClassName("input-group")[1].style['cssText'] = 'padding-bottom:20px;'
    document.getElementById('Spacer').style['cssText'] = 'width:100px;'
  }
}

function setWebpage(webpage, color) {
  document.getElementsByClassName("nav-link active")[0].className = "nav-link";
  document.getElementById(webpage).className = "nav-link active";
  document.getElementById('header').style.backgroundColor = color;
  console.log(color)
  $('input#webpage')[0].value = webpage
  console.log('test2')
  var HTMLString = ''
  for (var i in JSONData[webpage]['Frontpage']) {
    console.log(i)
    if (i == 0) {
      HTMLString += '<div class="carousel-item active">'
    } else {
      HTMLString += '<div class="carousel-item">'
    }
    HTMLString += '<center><img class="fit" src="{IMAGEHERE}" alt="{NAMEHERE}" onclick="document.getElementsByName(\'pid\')[0].value = \'{PIDHERE}\';document.getElementsByName(\'zipcode\')[0].focus();"></center></div>'.replace(
      "{IMAGEHERE}",
      JSONData[webpage]['Frontpage'][i]["Image"]).replace("{NAMEHERE}", JSONData[webpage]['Frontpage'][i]["Name"]).replace("{PIDHERE}", JSONData[webpage]['Frontpage'][i]["PID"])
    console.log(JSONData[webpage]['Frontpage'][i]["Name"]);
  }
  $('div.carousel-inner')[0].innerHTML = HTMLString
  resizeMobile(JSONData[webpage]['Frontpage'].length)
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
if (document.cookie['zipcode'] == '') {} else {
  document.getElementsByName('zipcode')[0].value = getCookie('zipcode');
}
