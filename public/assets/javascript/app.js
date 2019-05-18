
var z = 0; // index of closest event to today for current month
var lastPractice = 1; // date of last Summer Practice
var firstPractice = 28; // date of first Summer Practice
var changeDate = 24; // date in June when Practice Schedule changes
var myX = false;
var counter = 0;
var RVCCclosed = false;
//---------------------------------------------------------------------------------
// on load run program
$(document).ready(function () {
  $(".home").siblings().css('display', 'none'); //only turn on home page section & turn off display on all other sections--
  $(function () {                              // initialize tooltips in the bootstrap js----------------------------------
    $('[data-toggle="tooltip"]').tooltip()
  });
	setInterval(myTimer, 1000); // set interval timer
	displayUpcomming(); //display upcomming events call current practice schedule function
  displayOclinics (); // display the Officials Clinics
  displayMeets (); // display the Meets Clinics
//-------- Watch for clicks on hamburger nav button (mobile) and swap for times octogon ----------
  $(document).on('click', '#thenavbtn', function () {
    if (myX === false) {
      $("#hamburger").html('<i class="fas fa-times-octagon fa-sm"></i>');
      $('#navbarNavDropdown').addClass('d-flex flex-row-reverse');
      myX = true;
    } else {
      $('#navbarNavDropdown').removeClass('d-flex flex-row-reverse');
      $("#hamburger").html('<i class="fas fa-bars fa-sm"></i>');
      myX = false;
    }
  });
//-------- watch for clicks on Navigation items -----------------------------------------------------
  $(document).on('click', '.mynav', function () {
    //event.preventDefault();
    myX = false;
    $("#hamburger").html('<i class="fas fa-bars fa-sm"></i>');
    $('#navbarNavDropdown').removeClass('d-flex flex-row-reverse');
//-------- collapse menu on moble devices after selection is made -----------------------------------
    $("#thenavbtn").addClass('collapsed');
    $("#thenavbtn").attr('aria-expanded', 'false');
    $("#navbarNavDropdown").removeClass('collapse');
    $("#navbarNavDropdown").removeClass('collapse');
    $("#navbarNavDropdown").removeClass('show');
    $("#navbarNavDropdown").removeClass('collapsing');
    $("#navbarNavDropdown").addClass('collapse');

//-------- highlight current Nav item and remove highlighting from other nav items ------------------
    var myChoice = $(this).attr('data-nav');
    if (myChoice === "pvol" || myChoice === "officials" || myChoice === "practices" || myChoice === "meets" || myChoice === "signout" || myChoice === "scratch" || myChoice === "jobs") {
      $(this).parents('li').addClass("active");
      $(this).parents('li').siblings().removeClass("active");
      $('#myswimmer1').removeClass("active");
      $('#myswimmer2').removeClass("active");
      $('#myswimmer1').siblings().removeClass("active");
      $('#myswimmer2').siblings().removeClass("active");
      $(this).addClass("active");
    } else if (myChoice == 'directions') {
        $('#mydir').addClass("active");
        $('#mydir').siblings().removeClass("active");
        $('#myswimmer1').removeClass("active");
        $('#myswimmer1').siblings().removeClass("active");
    } else if (myChoice == 'tryouts') {
      $('#myswimmer').addClass("active");
      $('#myswimmer').siblings().removeClass("active");
      $('#myswimmer1').addClass("active");
      $('#myswimmer1').siblings().removeClass("active");
    } else if (myChoice == 'home') {
      $('#thetitle1').addClass("active");
      $('#thetitle1').siblings().removeClass("active");
      $('#myswimmer1').removeClass("active");
      $('#myswimmer1').siblings().removeClass("active");
      $('#myswimmer2').removeClass("active");
      $('#myswimmer2').siblings().removeClass("active");
    } else {
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        $('#myswimmer1').removeClass("active");
        $('#myswimmer1').siblings().removeClass("active");
        $('#myswimmer2').removeClass("active");
        $('#myswimmer2').siblings().removeClass("active");
    };

//------------- display only the selected nav section -----------------------------------------------------
    $("." + myChoice).css('display', "block");
    $("." + myChoice).siblings().css('display', 'none');

  });
});

// to add popovers to the buttons add the following code and adjust the title to display the hint needed. -------
//          data-toggle='tooltip' data-placement='bottom' title='Directions Page'

//-------------- list of events to display on home page & update every day --------------
//-------------- TO DO: set up to replace with firebase which will pull events from google calendar -------
var May = //events for May: must be in date: "event" format
		{14: "<button class='mynav' data-nav='tryouts'>Tryouts - 5:00pm @ RVCC (arrive by 4:45)</button>", 23: "<button class='mynav' data-nav='tryouts' data-toggle='tooltip' data-placement='bottom' title='Click to see the Tryouts Page'>Tryouts - 5:00pm @ RVCC (arrive by 4:45)</button>", 28: "Practice Begins Today!!<br />9 & Unders: 5:00 - 6:10 PM<br />10-13's: 6:05 - 7:15 PM<br />14 & Over: 7:10 - 8:20 PM", 30: "SWIM SUIT FITTING & Equipment Sale<br/><a class='mylink' href='https://ultimateswimshop.com/home.php' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see their website'>Ultimate Swim Shop</a> Will be at RVCC from 5:30 - 7:30PM<br/>ONE DAY ONLY!!!<br />Officials Clinic - <a class='mylink' href='https://www.google.com/maps/place/Raritan+Valley+Country+Club/@40.5781131,-74.6352269,17z/data=!3m1!4b1!4m5!3m4!1s0x89c395272882e23d:0xba5cbb3ab0cc028b!8m2!3d40.5781131!4d-74.6330382' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see Directions'>Raritan Valley Country Club</a>: 7PM"},

		June = //events for June: must be in date: "event" format
		  {5:"Officials Clinic - <a class='mylink' href='https://www.google.com/maps/place/Cedar+Hill+Club+Inc/@40.5184435,-74.5250587,16z/data=!4m8!1m2!2m1!1scedar+Hill+Swim+Club+somerset+nj!3m4!1s0x89c3c0e77a5749e5:0x6014a1807d2f0eb2!8m2!3d40.517971!4d-74.52125?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see Directions'>Cedar Hill</a>: 7PM", 11:"Officials Clinic - <a class='mylink' href='https://www.google.com/maps/dir//401+Centennial+Ave,+Cranford,+NJ+07016/@40.6484949,-74.2925137,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c3b237bdae018d:0x347c61d91953d88d!2m2!1d-74.290325!2d40.6484949?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see Directions'>Cranford Community Center</a>: 7PM", 15:"Officials Clinic (starters & referees) - <br/><a class='mylink' href='https://www.google.com/maps/place/North+Brunswick+Township+High+School/@40.4527824,-74.4711325,732m/data=!3m2!1e3!4b1!4m5!3m4!1s0x89c3c43bbc678605:0xd23820f05efe271f!8m2!3d40.4527824!4d-74.4689438' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see Directions'>North Brunswick High School</a>: 9AM", 19: "Away Meet @ <a class='mylink' href='https://www.google.com/maps/place/Woodbridge+Community+Center/@40.546369,-74.3042732,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3b5c33447b509:0x9228195486da19cd!8m2!3d40.546369!4d-74.3020845' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Woodbridge Sea Wolves</a><br/>Warm-up 5:30PM", 22: "Home Meet vs University<br/>Warm-Up 9:30AM", 26: "Away Meet @ <a class='mylink' href='https://www.google.com/maps/place/Metuchen+Municipal+Pool/@40.5292246,-74.3654143,770m/data=!3m1!1e3!4m5!3m4!1s0x89c3c82a47edcb8f:0x9f49e110b88fb6cc!8m2!3d40.5292246!4d-74.3632256' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Metuchen Blue</a><br/>Warm-up 5:30PM", 29: "BYE<br />No Meet today", 30:"<a class='mylink' href='http://roycefield.org/sprint-meet-information-packet' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Meet Information Packet (opens new tab)'>Roycefield Sprint Meet</a> @ <a class='mylink' href='https://www.google.com/maps/place/Roycefield+Swim+Club/@40.5071339,-74.649642,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3ebc95ce19cf3:0x9535d41d5e02a73c!8m2!3d40.5071339!4d-74.6474533?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Roycefield SC</a><br/>Warm-Up 6:45AM"},
		July = //events for July: must be in date: "event" format
		  {1:"Away @ <a class='mylink' href='https://www.google.com/maps/place/Shimon+and+Sara+Birnbaum+Jewish+Community+Center/@40.6122245,-74.631169,325m/data=!3m1!1e3!4m5!3m4!1s0x89c395af329ae821:0x9f70cd3e2614da00!8m2!3d40.611883!4d-74.630191' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Bridgewater JCC</a><br/>Warm-up 5:30PM(NOTE: this is a Monday!!)", 3:"Home Meet vs. Bridgewater JCC<br/>Warm-Up 5:30PM", 6:"Home Meet vs. Woodbridge Sea Wolves<br/>Warm-Up 9:30AM",10:"AWAY @ <a class='mylink' href='https://www.google.com/maps/place/Lot+48,+Piscataway,+NJ+08854/@40.5151065,-74.4625063,638m/data=!3m2!1e3!4b1!4m5!3m4!1s0x89c3c70f7adb35c5:0x8a53399ad0bc5cc5!8m2!3d40.515097!4d-74.4606289' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>University</a><br/>Warm-Up 5:30PM",13:"Home Meet vs Metuchen Blue<br />Warm-Up 9:30AM", 17:"BYE<br />No Meet Scheduled", 27:"Championships @ TBA<br/>Ages 13 & Over Swimmers", 28:"Championships @ TBA<br />Ages 12 & Under Swimmers", 30:"Conference Championships @ <a class='mylink' href='https://www.google.com/maps/place/Frog+Hollow+Swim+%26+Tennis+Club/@40.4767032,-74.2822971,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3cbb3fbc2abeb:0xfb2c2f34c9fc4602!8m2!3d40.4767032!4d-74.2801084?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Frog Hollow</a><br/>Warm-Up 7:15AM<br/>Swimmers must achieve qualifying times<br/>12 & unders Swim today, TOP 6 swim for awards<br/>July 31, 5:00PM Warm-Up", 31:"Conference Championships @ <a class='mylink' href='https://www.google.com/maps/place/Frog+Hollow+Swim+%26+Tennis+Club/@40.4767032,-74.2822971,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3cbb3fbc2abeb:0xfb2c2f34c9fc4602!8m2!3d40.4767032!4d-74.2801084?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Frog Hollow</a><br/>Warm-Up 7:15AM<br/>Swimmers must achieve qualifying times<br/>Swimmers ages 13 - 18 compete in the morning<br/>TOP 6 swim for awards at<br/>5:00PM Warm-Up<br />*****<br />Team Party Date & Times TBA"},
		August = //events for August: must be in date: "event" format
		  {1:"Team Party Date & Times TBA"};

var Oclinicsmay = {30: "<a class='mydecoration1' href='https://www.google.com/maps/place/Raritan+Valley+Country+Club/@40.5781131,-74.6352269,770m/data=!3m2!1e3!4b1!4m5!3m4!1s0x89c395272882e23d:0xba5cbb3ab0cc028b!8m2!3d40.5781131!4d-74.6330382' target='_blank' data-toggle='tooltip' data-placement='bottom'    title='Click to see Location in Goggle Maps'>Raritan Valley Country Club</a> 7PM<br />(Men- Shirt with collars required.<br />All- NO DENIM)"}
var Oclinicsjune = {5:"<a class='mydecoration1' href='https://www.google.com/maps/place/Cedar+Hill+Club+Inc/@40.517971,-74.5234387,771m/data=!3m2!1e3!4b1!4m5!3m4!1s0x89c3c0e77a5749e5:0x6014a1807d2f0eb2!8m2!3d40.517971!4d-74.52125' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see the Location in Goggle Maps'>Cedar Hill Swim Club</a> 7PM", 11: "<a class='mydecoration1' href='https://www.google.com/maps/place/Cranford+Community+Center/@40.6518681,-74.3064513,769m/data=!3m2!1e3!4b1!4m5!3m4!1s0x89c3b22591dd21ff:0x965f7a7aa015ad02!8m2!3d40.6518681!4d-74.3042626' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see the Location in Google Maps'>Cranford Community Center</a> 7PM", 15:"<a class='mydecoration1' href='https://www.google.com/maps/place/North+Brunswick+Township+High+School/@40.4527824,-74.4711325,772m/data=!3m2!1e3!4b1!4m5!3m4!1s0x89c3c43bbc678605:0xd23820f05efe271f!8m2!3d40.4527824!4d-74.4689438' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to see the Location in Google Maps'>North Brunswick High School</a> 9AM"}

//--------------------------------------------------------------------------------
//display Officials Clinics and strike through when completed --------------------
function displayOclinics () {

  var d = new Date();
	var month = d.getMonth();
	var date = d.getDate();
  var may = Object.keys(Oclinicsmay);
  var june = Object.keys(Oclinicsjune);
  for (var i = 0; i < (may.length + june.length); i++) {
    $("#oevents" + i).html('');
  }
  // see if there are any Officials Clinics in May and display them ---------
  if (may.length > 0) {

    for (var i = 0; i < may.length; i++) {
      $("#oevents" + i).html("<div class='month1'>May " + may[i] + ":</div><div class='officialsclinics'>" + Oclinicsmay[may[i]]+ "</div>");
      }
    counter = (may.length - 1); // adjust ids used for May clinics
  }
  // Display Officials Clinics in June ----------------------------
  for (var i = 0; i < june.length; i++) {
      counter ++;
      $("#oevents" + counter).html("<div class='month1'>June " + june[i] + ":</div><div class='officialsclinics'>" + Oclinicsjune[june[i]]+ "</div>");
  }
  //delete unused cells ---------------------------------------------

  if (counter+1 <= 5) {

    for (var i = counter+1; i < 9; i++) {
      $("#oclinics" + i).css('display', 'none');
    }
  }
  // add strike through when date passes
  var z = findEvent(date, june);
  if ((month === 4 && date > parseInt(may[may.length-1])) || month > 4) {
    for (var i = 0; i < may.length; i++) {
      $("#oevents" + i).html("<s><div class='month1'>May " + may[i] + ":</div><div class='officialsclinics'>" + Oclinicsmay[may[i]]+ "</div></s>");
      }
  }
  if (month === 5 ) {
    counter = (may.length - 1);
    for (var i = 0; i < z; i++) {
      counter ++;
      $("#oevents" + counter).html("<s><div class='month1'>June " + june[i] + ":</div><div class='officialsclinics'>" + Oclinicsjune[june[i]]+ "</div></s>");
      }
  }
  if (month === 5 && date > parseInt(june[june.length-1]) || month > 5) {
    counter = (may.length - 1);
    for (var i = 0; i <= june.length; i++) {
      counter ++;
      $("#oevents" + counter).html("<s><div class='month1'>June " + june[i] + ":</div><div class='officialsclinics'>" + Oclinicsjune[june[i]]+ "</div></s>");
      }
  }
}
//   <button class='mynav' data-nav='directions' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'></button>
var MeetsJune = {19: "Away Meet @ <a class='mylink' href='https://www.google.com/maps/place/Woodbridge+Community+Center/@40.546369,-74.3042732,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3b5c33447b509:0x9228195486da19cd!8m2!3d40.546369!4d-74.3020845' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Woodbridge Sea Wolves</a><br/>Warm-up 5:30PM", 22: "Home Meet vs University<br/>Warm-Up 9:30AM", 26: "Away Meet @ <a class='mylink' href='https://www.google.com/maps/place/Metuchen+Municipal+Pool/@40.5292246,-74.3654143,770m/data=!3m1!1e3!4m5!3m4!1s0x89c3c82a47edcb8f:0x9f49e110b88fb6cc!8m2!3d40.5292246!4d-74.3632256' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Metuchen Blue</a><br/>Warm-up 5:30PM", 29: "BYE<br />No Meet Scheduled", 30:"<a class='mylink' href='http://roycefield.org/sprint-meet-information-packet' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Meet Information Packet (opens new tab)'>Roycefield Sprint Meet</a> @ <a class='mylink' href='https://www.google.com/maps/place/Roycefield+Swim+Club/@40.5071339,-74.649642,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3ebc95ce19cf3:0x9535d41d5e02a73c!8m2!3d40.5071339!4d-74.6474533?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Roycefield SC</a><br/>Warm-Up 6:45AM"}

var MeetsJuly = {1:"Away @ <a class='mylink' href='https://www.google.com/maps/place/Shimon+and+Sara+Birnbaum+Jewish+Community+Center/@40.6122245,-74.631169,325m/data=!3m1!1e3!4m5!3m4!1s0x89c395af329ae821:0x9f70cd3e2614da00!8m2!3d40.611883!4d-74.630191' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Bridgewater JCC</a><br/>Warm-up 5:30PM(NOTE: this is a Monday!!)", 3:"Home Meet vs. Bridgewater JCC<br/>Warm-Up 5:30PM", 6:"Home Meet vs. Woodbridge Sea Wolves<br/>Warm-Up 9:30AM",10:"AWAY @ <a class='mylink' href='https://www.google.com/maps/place/Lot+48,+Piscataway,+NJ+08854/@40.5151065,-74.4625063,638m/data=!3m2!1e3!4b1!4m5!3m4!1s0x89c3c70f7adb35c5:0x8a53399ad0bc5cc5!8m2!3d40.515097!4d-74.4606289' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>University</a><br/>Warm-Up 5:30PM",13:"Home Meet vs Metuchen Blue<br />Warm-Up 9:30AM", 17:"BYE<br />No Meet Scheduled", 27:"Championships @ TBA<br/>Ages 13 & Over Swimmers", 28:"Championships @ TBA<br />Ages 12 & Under Swimmers", 30:"Conference Championships @ <a class='mylink' href='https://www.google.com/maps/place/Frog+Hollow+Swim+%26+Tennis+Club/@40.4767032,-74.2822971,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3cbb3fbc2abeb:0xfb2c2f34c9fc4602!8m2!3d40.4767032!4d-74.2801084?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Frog Hollow</a><br/>Warm-Up 7:15AM<br/>Swimmers must achieve qualifying times<br/>12 & unders Swim today, TOP 6 swim for awards<br/>July 31, 5:00PM Warm-Up", 31:"Conference Championships @ <a class='mylink' href='https://www.google.com/maps/place/Frog+Hollow+Swim+%26+Tennis+Club/@40.4767032,-74.2822971,17z/data=!3m1!4b1!4m5!3m4!1s0x89c3cbb3fbc2abeb:0xfb2c2f34c9fc4602!8m2!3d40.4767032!4d-74.2801084?hl=en' target='_blank' data-toggle='tooltip' data-placement='bottom' title='Click to find Directions'>Frog Hollow</a><br/>Warm-Up 7:15AM<br/>Swimmers must achieve qualifying times<br/>Swimmers ages 13 - 18 compete in the morning<br/>TOP 6 swim for awards at<br/>5:00PM Warm-Up"}
var MeetsAug = {};
var resultsJune = ['','','','','']; // win or loss
var scoreJune = ['','','','','']; // meet score
var linkJune = ['','','','','']; // link to external site for results
var resultsJuly = ['','','','','','','','','','']; //win or loss
var scoreJuly = ['','','','','','','','','','']; // meet score
var linkJuly = ['','','','','','','','','','']; // link to external site for results
var NresultsJune = ['','','','',''] // write RESULTS this turns on the results link on the page
var NresultsJuly = ['','','','','','','','','',''];
var NresultsAug = [];
var linkAug = []; // link to external site for results
var CqualifyJuly = ['','','','','','','','','https://swimtopia.s3.amazonaws.com/3312/files/conference_qual_times2.pdf?1521587981','https://swimtopia.s3.amazonaws.com/3312/files/conference_qual_times2.pdf?1521587981']; //link to external site for qualifying times for conference meet
var Nqualifying = ['','','','','','','','','Qualifying Times','Qualifying Times',''];
var CqualifyAug = []; //link to external site for qualifying times for conference meet
var NqualifyingAug = [];
//--------------------------------------------------------------------------------
// display swim meets from upcomming season
function displayMeets() {
  var d = new Date();
  var month = d.getMonth();
	var date = d.getDate();
  var july = Object.keys(MeetsJuly);
  var june = Object.keys(MeetsJune);
  var aug = Object.keys(MeetsAug);
  // clear all cells
  for (var i = 0; i < 15; i++) {
    $("#meet" + i).html('').css('display','none');
    $("#score" + i).html('').css('display','none');
    $("#results" + i).html('').css('display','none');
    $("#qualify" + i).html('').css('display','none');
  }
  var tempLength = (june.length);
  // print meets - results and turn on needed cells for June
  for (var i = 0; i < june.length; i++) {
    $("#meet" + i).html("<div class='month1'>June " + june[i] + ":</div><div class='officialsclinics'>" + MeetsJune[june[i]]+ "</div>").css('display','block');
    $("#score" + i).html("<div class='month1'>" + resultsJune[i] + "</div><div class='officialsclinics'>" + scoreJune[i] + "</div>").css('display','block');
    $("#results" + i).html("<br/><a class='month1' href='" + linkJune[i] + "' target='_blank' data-toggle='tooltip' data-placement='bottom' title='opens new tab'>" + NresultsJune[i] + "</a>").css('display','block');
  }
  // print meets - results and turn on needed cells for July
  for (var i = 0; i < (july.length); i++) {
    $("#meet" + tempLength).html("<div class='month1'>July " + july[i] + ":</div><div class='officialsclinics'>" + MeetsJuly[july[i]]+ "</div>").css('display','block');
    $("#score" + tempLength).html("<div class='month1'>" + resultsJuly[i] + "</div><div class='officialsclinics'>" + scoreJuly[i] + "</div>").css('display','block');
    $("#results" + tempLength).html("<br/><a class='month1' href='" + linkJuly[i] + "' target='_blank' data-toggle='tooltip' data-placement='bottom' title='opens new tab'>" + NresultsJuly[i] + "</a>").css('display','block');
    $("#qualify" + tempLength).html("<br/><a class='month1' href='" + CqualifyJuly[i] + "' target='_blank' data-toggle='tooltip' data-placement='bottom' title='opens new tab'>" + Nqualifying[i] + "</a>").css('display','block');
    tempLength ++;
  }
  var tempLength = (june.length + july.length); // starts cells at the right place to add Aug
  // print meets - results and turn on needed cells for Aug
  for (var i = 0; i < (aug.length); i++) {
    $("#meet" + tempLength).html("<div class='month1'>Aug " + aug[i] + ":</div><div class='officialsclinics'>" + MeetsAug[aug[i]]+ "</div>").css('display','block');
    $("#score" + tempLength).html("<br/><div class='officialsclinics'><br/>This meet is<br/>not scored</div>").css('display','block');
    $("#results" + tempLength).html("<br/><a class='month1' href='" + linkAug[i] + "' target='_blank' data-toggle='tooltip' data-placement='bottom' title='opens new tab'>" + NresultsAug[i] + "</a>").css('display','block');
    $("#qualify" + tempLength).html("<br/><a class='month1' href='" + CqualifyAug[i] + "' target='_blank' data-toggle='tooltip' data-placement='bottom' title='opens new tab'>" + NqualifyingAug[i] + "</a>").css('display','block');
    tempLength ++;
  }
}

//--------------------------------------------------------------------------------
//display next 4 upcomming events to the page for events in May - August
 function displayUpcomming () {
	 $("#upevents").html('');
 	var d = new Date();
	var month = d.getMonth();
	var date = d.getDate();
	var may = Object.keys(May);
	var june = Object.keys(June);
	var july = Object.keys(July);
	var aug = Object.keys(August);
  //date = 7; // for testing ----------------------
	displayPractice();

	if (month === 4 && date > 8) {
		var z = findEvent(date, may);
    if ((z + 4) > (may.length)) {
  		var y = 4 - (may.length - z);
  		for (var i = z; i < may.length; i++){
  			$("#upevents").append("<div class='month'>May " + may[i] + ":</div><div>" + May[may[i]]+ "</div>");
  		}
      for (var i = 0; i < y; i++){
  			$("#upevents").append("<div class='month'>June " + june[i] + ":</div><div> "+ June[june[i]]+"</div>");
  		}
    }else {
      for (var i = z; i < z+4; i++){
        $("#upevents").append("<div class='month'>May " + may[i] + ":</div><div> "+ May[may[i]] + "</div>");
      }
    }

	} else if(month === 5 && date <= parseInt(june[june.length-1])) {
			z = findEvent(date, june);
			if ((z + 4) > (june.length)) {
				var y = 4 - (june.length - z);
				for (var i = z; i < june.length; i++){
					$("#upevents").append("<div class='month'>June " + june[i] + ":</div><div> "+ June[june[i]] + "</div>");
				}
				for (var i = 0; i < y; i++){
					$("#upevents").append("<div class='month'>July " + july[i] + ":</div><div> "+ July[july[i]] + "</div>");
				}
			} else {
				for (var i = z; i < z+4; i++){
					$("#upevents").append("<div class='month'>June " + june[i] + ":</div><div> "+ June[june[i]] + "</div>");
				}
			}
		} else if(month === 5 && date > parseInt(june[june.length-1])) {
			for (var i = 0; i < 4; i++){
				$("#upevents").append("<div class='month'>July " + july[i] + ":</div><div> "+ July[july[i]] + "</div>");
			}
		}else if (month === 6 && date <= parseInt(july[july.length-1])) {
				z = findEvent(date, july);
				if ((z + 4) > (july.length)) {
          if (aug.length > 3) {
              y = 4 - (july.length - z);
          } else {
              y = aug.length;
          }
					for (var i = z; i < july.length; i++){
						$("#upevents").append("<div class='month'>July " + july[i] + ":</div><div> "+ July[july[i]] + "</div>");
					}
					for (var i = 0; i < y; i++){
						$("#upevents").append("<div class='month'>August " + aug[i] + ":</div><div> "+ August[aug[i]] + "</div>");
					}
				} else {
					for (var i = z; i < z+4; i++){
						$("#upevents").append("<div class='month'>July " + july[i] + ":</div><div> "+ July[july[i]] + "</div>");
					}
				}

	} else if(month === 6 && date > parseInt(july[july.length-1])) {

		for (var i = 0; i < aug.length; i++){
			$("#upevents").append("<div class='month'>August " + aug[i] + ":</div><div> "+ August[aug[i]] + "</div>");
		}
	}else if ( month === 7 && date <= parseInt(aug[aug.length-1])) {
			z = findEvent(date, aug);
			for (var i = z; i < aug.length; i++){
				$("#upevents").append("<span class='month'>August " + aug[i] + ":</span><br> "+ August[aug[i]] + "<br>");
			}
	} else if (month === 7 && date > parseInt(aug[aug.length-1]) || month > 7){
		$("#upevents").html("<div>Thanks for a Great Season!<br>No Upcomming Events<br>until Next Year!</div>");
	}else {
		$("#upevents").html("<button class='mynav' data-nav='tryouts'>Summer 2018 Information &<br/>Tryout Dates are available<br/><span class='mybold1'>Click Here for More Information</span></button><hr/>");
	}
}//end of upcomming events function

//---------------------------------------------------------------------------------
//find the index of the next event date based on this date and items this month
 function findEvent(date, month) {
 	for (var i = 0; i < parseInt(month[i]); i++) {
 		if (date === parseInt(month[i])) {
 			z = i;
 			break;
 		// } else if (date > parseInt(month[i])){
 		// 	z = month.length;
 		} else if (date < parseInt(month[i])){
			z = i;
 			break;
 		}
 	}
	return z;
 }
//-----------------------------------------------------------
// display daily practice schedule in season and appropriate messages out of season
function displayPractice() {
	var d = new Date();
	var day = d.getDay();
	var month = d.getMonth();
	var date = d.getDate();
  // in case of pool closing set day = 8 practice canceled for repairs; day=9 practice canceled for meet  -------------------------------------------------
  if (month == 6 && date == lastPractice) {day = 7};
  if (RVCCclosed === true) {day = 8};

	if (month === 4 && date < firstPractice) {
		$("#todayschedule").html("Summer Team Practice<br>BEGINS MAY " + firstPractice + "!");
    $("#todayschedule2").html("Summer Team Practice<br>BEGINS MAY " + firstPractice + "!");
	} else if(month === 7 && date > lastPractice || month > 7) {
				$("#todayschedule").html("Thank you for a Great Season!<br>See You next Summer.");
        $("#todayschedule2").html("Thank you for a Great Season!<br>See You next Summer.");
	}else if ((month === 4 && date >= firstPractice) || (month === 5 && date < changeDate)) {
		switch (day) {
			default:
				$("#todayschedule").html("No Summer Team Practice Today!");
        $("#todayschedule2").html("No Summer Team Practice Today!");
				break;
			case 2:
				$("#todayschedule").html("9 & Unders: 5:00 - 6:10 PM<br />");
				$("#todayschedule").append("10-13's: 6:05 - 7:15 PM<br />");
				$("#todayschedule").append("14 & Over: 7:10 - 8:20 PM");
        $("#todayschedule2").html("9 & Unders: 5:00 - 6:10 PM<br />");
        $("#todayschedule2").append("10-13's: 6:05 - 7:15 PM<br />");
				$("#todayschedule2").append("14 & Over: 7:10 - 8:20 PM");
				break;
			case 4:
				$("#todayschedule").html("9 & Unders: 5:00 - 6:10 PM<br />");
				$("#todayschedule").append("10-13's: 6:05 - 7:15 PM<br />");
				$("#todayschedule").append("14 & Over: 7:10 - 8:20 PM");
        $("#todayschedule2").html("9 & Unders: 5:00 - 6:10 PM<br />");
				$("#todayschedule2").append("10-13's: 6:05 - 7:15 PM<br />");
				$("#todayschedule2").append("14 & Over: 7:10 - 8:20 PM");
				break;
			case 5:
				$("#todayschedule").html("9 & Unders: 5:00 - 6:10 PM<br />");
				$("#todayschedule").append("10-13's: 6:05 - 7:15 PM<br />");
				$("#todayschedule").append("14 & Over: 7:10 - 8:20 PM");
        $("#todayschedule2").html("9 & Unders: 5:00 - 6:10 PM<br />");
				$("#todayschedule2").append("10-13's: 6:05 - 7:15 PM<br />");
				$("#todayschedule2").append("14 & Over: 7:10 - 8:20 PM");
        break;
      case 8:
        $("#todayschedule").html("The RVCC Pool is CLOSED<br />");
        $("#todayschedule").append("No Practice Today");
        $("#todayschedule2").html("The RVCC Pool is CLOSED<br />");
				$("#todayschedule2").append("No Practice Today");
        break;
      case 9:
        $("#todayschedule").html("Practice Canceled today<br />");
        $("#todayschedule").append("due to Swim Meet");
        $("#todayschedule2").html("Practice Canceled today<br />");
    		$("#todayschedule2").append("due to Swim Meet");
        break;

		}
	} else if ( month === 5 && date >= changeDate || month === 6 || month === 7 && date <= lastPractice) {
			switch (day) {
			default:
				$("#todayschedule").html("No Summer Team Practice Today!");
        $("#todayschedule2").html("No Summer Team Practice Today!");
				break;
				case 1:
					$("#todayschedule").html("10 & Unders: 6:00 - 7:15 PM<br />");
					$("#todayschedule").append("11 & Overs: 6:45 - 8:00 PM");
          $("#todayschedule2").html("10 & Unders: 6:00 - 7:15 PM<br />");
					$("#todayschedule2").append("11 & Overs: 6:45 - 8:00 PM");
					break;
			case 2:
				$("#todayschedule").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule").append("11 & Overs: 6:45 - 8:00 PM");
        $("#todayschedule2").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule2").append("11 & Overs: 6:45 - 8:00 PM");
				break;
			case 4:
				$("#todayschedule").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule").append("11 & Overs: 6:45 - 8:00 PM");
        $("#todayschedule2").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule2").append("11 & Overs: 6:45 - 8:00 PM");
				break;
			case 5:
				$("#todayschedule").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule").append("11 & Overs: 6:45 - 8:00 PM");
        $("#todayschedule2").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule2").append("11 & Overs: 6:45 - 8:00 PM");
        break;
        case 7:
          $("#todayschedule").html("Only Conference Qualifiers: 5:00 - 6:00 PM<br />");
          $("#todayschedule2").html("Only Conference Qualifiers: 5:00 - 6:00 PM<br />");
          break;
      case 8:
        $("#todayschedule").html("RVCC Closed for Repairs<br />");
        $("#todayschedule").append("No Practice Today");
        $("#todayschedule2").html("RVCC Closed for Repairs<br />");
				$("#todayschedule2").append("No Practice Today");
        break;
      case 9:
        $("#todayschedule").html("Practice Canceled today<br />");
        $("#todayschedule").append("due to Swim Meet");
        $("#todayschedule2").html("Practice Canceled today<br />");
  			$("#todayschedule2").append("due to Swim Meet");

		}
	} else if (month >= 0 && month < 4) {
		$("#todayschedule").html("Summer Team Practice<br>Begins in May, 2019<br/>Check back after April 15 for more details.<br/>Hope to see you there!");
    $("#todayschedule2").html("Summer Team Practice<br>Begins in May, 2019<br/>Check back after April 15 for more details.<br/>Hope to see you there!");
	} else {
    $("#todayschedule").html("No Summer Team Practice Today!");
    $("#todayschedule2").html("No Summer Team Practice Today!");
  }
}
//------------------------------------------------------------------------------------
//set interval timer for clock on web page and display clock in line
function myTimer() {
	var d = new Date();
	var date = d.getDate();
	var days = ["Sun.","Mon.","Tues.","Wed.","Thurs.","Fri.","Sat."];
	var year = d.getYear() + 2000 - 100;
	var months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
	var month = d.getMonth();
	var hour = d.getHours();
	var min = d.getMinutes();
	var am = "AM";
	if (min < 10) {
		min = "0" + min;
	}
	var seconds = d.getSeconds();
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
if (hour === 12) {
	am = "PM";
} else if (hour === 0) {
	hour = 12;
}else if (hour > 12) {
		hour = hour - 12;
		am = "PM";
	} else { am = "AM";}
	$("#today").html(days[d.getDay()] + " " + months[month] + " " + date + ", " + year + " - ");
	$("#today").append(hour + ":" + min + "." + seconds + " " + am + "<br>");
  $("#today1").html(days[d.getDay()] + " " + months[month] + " " + date + ", " + year + " - ");
	$("#today1").append(hour + ":" + min + "." + seconds + " " + am + "<br>");
}
