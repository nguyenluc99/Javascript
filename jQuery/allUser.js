var DOMParser = require('xmldom').DOMParser;
var fs = require('fs');
var o2x = require('object-to-xml');
var xml2js = require('xml2js');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function createUser(username, password) {
  this.username = username;
  this.password = password;
}
var allUser = [];
function getUser(index) {
  return allUser[index];
}
function addUser(usr, passwd) {
  allUser.push(createUser(usr, passwd));
  console.log(allUser.length);
}
var password,
  confirmPassword,
  strong = 0;
function checkPasswordStrength() {
  var number = /([0-9])/;
  var alphabets = /([a-zA-Z])/;
  var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
  password = $("#password").val();
  if ($('#password').val().length < 6) {
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('weak');
    $('#password-strength-status').html("Weak (should be at least 6 characters.)");
    strong = 0;
  } else if ($('#password').val().match(number) && $('#password').val().match(alphabets) && $('#password').val().match(special_characters)) {
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('strong');
    $('#password-strength-status').html("Strong");
    strong = 1;
  } else {
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('medium');
    $('#password-strength-status').html("Medium (should include alphabets, numbers and special characters.)");
    strong = 0;
  }
  if (confirmPassword) checkSamePassword();
}
function checkSamePassword() {
  confirmPassword = $("#confirmPassword").val();
  if (password != confirmPassword) {
    $("#samePassStatus").removeClass();
    $("#samePassStatus").addClass("weak");
    $("#samePassStatus").html("Passwords do not match!");
  } else {
    $("#samePassStatus").removeClass();
    $("#samePassStatus").addClass("strong");
    $("#samePassStatus").html("Passwords match.");
  }
}
function register() {
  if (strong === 1) {
    if (password === confirmPassword) {
      addUser($("#username").val(), $("#password").val());
      alert("registration finished");
      //window.open( "register.html")
      window.location = "login.html";
    } else alert("Password not match!");
  } else {
    alert("Password is not strong enough!");
  }

}
function backToLogin() {
  window.location = "login.html"
}
// function readXML2(path) {
//   var parser = new xml2js.Parser();
//   fs.readFile(path, function(err, data) {
//     parser.parseString(data, function(err, result) {
//       var xml = o2x(result);
//       xmlData = (new DOMParser()).parseFromString(xml, 'text/html');
//       var emp = xmlData.getElementsByTagName("allUser");
//       var pass = emp[0].getElementsByTagName("usr1")[0].firstChild.data;
//     //   console.log("pass is "+pass)
//     //   console.log(typeof(pass))
//     });
//   });
// }
//readXML2("allUser.xml");
function loginWith(username, password) {
  var parser = new xml2js.Parser();
  var path = "allUser.xml";
  fs.readFile(path, function(err, data) {
    if (!err) {
      parser.parseString(data, function(err, result) {
        if (!err) {
          var xml = o2x(result);
          var xmlData = (new DOMParser()).parseFromString(xml, 'text/html');
          var emp = xmlData.getElementsByTagName("allUser");
          var infor = emp[0].getElementsByTagName(username);
          if (infor == undefined) {
            console.log("Account not found!");
          } else { 
            console.log(infor[0])
            console.log(typeof(infor[0]));
            pass = infor[0].firstChild.data;
            console.log(pass);
            if (pass === password) {
              console.log("Login successfully!")
            } else {
              console.log(" Password incorrect!")
            }
          }
        } else {
          callback('error while parsing assertion' + err)
        }
      });
    }else {
        callback('error while reading file' + err)
      }

  });
}
//loginWith("u1a", "p1");









 // $.get("./allUser.xml", function(data, status){
          //   alert("Data is" + data);
          //   alert("status is" + status);
          // });
          // $.ajax({
          //   type: 'GET',
          //   url: './allUser.xml',
          //   dataType: 'xml',
          //   success: function(xml) {
          //     var username = $('#username').val();
          //     var password = $('#password').val();
          //     xmlData = new DOMParser().parseFromString(xml, 'text/html');
          //     var emp = xmlData.getElementsByTagName('allUser');
          //     var pass = emp[0].getElementsByTagName(username)[0].firstChild.data;
          //     console.log("pass is "+pass);
          //   }
          // });
          //console.log("username is " + window.allUser[0].username+", pass is " +window.allUser[0].password)
          //addUser('usr', 'pass');
          //console.log(getUser(0));
          //checkPassword(, );
          // var DOMParser = require('xmldom').DOMParser();
          // var fs = require('fs');
          // var o2x = require('object-to-xml');
          // var xml2js = require('xml2js');
          // var username = $('#username').val();
          // var password = $('#password').val();
          // var parser = new xml2js.Parser();
          // var path = 'allUser.xml';
          // fs.readFile(path, function(err, data) {
          // console.log('star');
          // $.get('./allUser.xml', function(data){
          //   if (err) {console.log("error")}
          //   else {
          //   console.log(typeof(data))
          //   parser.parseString(data, function(err, result) {
          //     if (!err) {
          //       console.log(typeof(result))
          //       var xml = o2x(result);
          //       // xmlData = new DOMParser().parseFromString(xml, 'text/html');
          //       // var emp = xmlData.getElementsByTagName('allUser');
          //       // var pass = emp[0].getElementsByTagName(username)[0].firstChild.data;
          //       // console.log("pass is "+pass)
          //       // console.log(typeof(pass))
          //       xmlDoc = $.parseXML(xml);
          //       if (xml) {console.log("xml is" + xml)};
          //       $xml = $(xmlDoc);
          //       if (xml) {console.log("xml is" + xml)};
          //       $pass = xml.find("allUser").find(username).text();
          //       if (pass) {console.log("pass is "+ pass)};
          //       if (pass === undefined) {
          //         console.log('Account not found!');
          //       } else if (pass === password) {
          //         console.log('Login successfully!');
          //       } else {
          //         console.log(' Password incorrect!');
          //       }
          //     } else {
          //       callback('error while parsing assertion' + err);
          //     }
          //   });
          // }}, 'text');
          // $('#div1').get("./allUser.xml", function(responseTxt, statusTxt, xhr) {
          //   console.log(responseTxt, statusTxt, xhr)
          //   if (statusTxt == "success") {
          //     console.log("load success");
          //   } else {console.log("Unload");}
          //   if (responseTxt) {
          //     console.log("2load success");
          //   } else {console.log("2Unload");}
          // });