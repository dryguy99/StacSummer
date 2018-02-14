
var z = 0; // index of closest event to today for current month
var lastPractice = 4; // date of last Summer Practice
var firstPractice = 29; // date of first Summer Practice
var changeDate = 26; // date in June when Practice Schedule changes
var myX = false;
//---------------------------------------------------------------------------------
// on load run program
$(document).ready(function () {
  $(".home").siblings().css('display', 'none'); //only turn on home page section & turn off display on all other sections--
	setInterval(myTimer, 1000); // set interval timer
	displayUpcomming(); //display upcomming events call current practice schedule function
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
    event.preventDefault();
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

//-------------- list of events to display on home page & update every day --------------
//-------------- TO DO: set up to replace with firebase which will pull events from google calendar -------
var May = //events for May: must be in date: "event" format
		{30: "First Day of Practice", 31: "Parent's Meeting 6:15PM"},

		June = //events for June: must be in date: "event" format
		{1:"Officials Clinic - Raritan Valley Country Club 7:00PM", 6:"Summer Swim Suits - Ultimate Swim Shop 5:00PM", 8:"Officials Clinic - Cedar Hill Swim Club 7:00PM", 10:"Officials Clinic (starters & referees) - North Brunswick High School 9:00AM", 12:"Officials Clinic - Brookside Swim Club 7:00PM", 15:"Second Summer Payment Due!", 17:"Time Trials - RVCC 1:00PM", 19:"Officials Clinic - Cranford Community Center 7:00PM", 24:"Home Swim Meet - RVCC 8:30AM", 25:"Roycefield Sprint Meet 6:45AM", 28:"Home Swim Meet - RVCC 5:30PM"},
		July = //events for July: must be in date: "event" format
		{1:"AWAY Swim Meet - Cedar Hill Swim Club 8:30AM", 8:"AWAY Swim Meet - Brookside Swim Club 8:30AM", 12:"AWAY Swim Meet - Bridgewater YMCA 5:30PM", 15:"Home Swim Meet - RVCC 8:30AM", 16:"Brookside Mini Meet - 7:00AM", 19:"AWAY Swim Meet - Crystal Springs 5:30PM", 22:"Home Swim Meet - RVCC 8:30AM", 28:"Championships 13 & Over - Cedar Hill Swim Club 4:15PM", 29:"Championships 12 & Under - Cedar Hill Swim Club 6:45AM"},
		August = //events for August: must be in date: "event" format
		{1:"Conferences 12 & Under - Frog Hollow 7:00 AM",2:"Conferences - Frog Hollow<br> 13 & Over  7:00AM<br> Top 6 finishers 5:00PM", 3:"End Of the Season Party"};

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
	displayPractice();

	if (month === 4 && date > 10) {
		z = findEvent(date, may);
		var y = 4 - (may.length - z);
		for (var i = 0; i < may.length; i++){
			$("#upevents").append("<div class='month'>May " + may[i] + ":</div><div>" + May[may[i]]+ "</div>");
		}
		for (var i = z; i < y; i++){
			$("#upevents").append("<div class='month'>June " + june[i] + ":</div><div> "+ June[june[i]]+"</div>");
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
					$("#upevents").append("<br><div class='month'>June " + june[i] + ":</div><div> "+ June[june[i]] + "</div>");
				}
			}
		} else if(month === 5 && date > parseInt(june[june.length-1])) {
			for (var i = 0; i < 4; i++){
				$("#upevents").append("<div class='month'>July " + july[i] + ":</div><div> "+ July[july[i]] + "</div>");
			}
		}else if (month === 6 && date <= parseInt(july[july.length-1])) {
				z = findEvent(date, july);
				if ((z + 4) > (july.length)) {
					var y = 4 - (july.length - z);
					for (var i = z; i < july.length; i++){
						$("#upevents").append("<div class='month'>July " + july[i] + ":</div><div> "+ July[july[i]] + "</div>");
					}
					for (var i = 0; i < y; i++){
						$("#upevents").append("<div class='month'>August " + aug[i] + ":</div><div> "+ August[aug[i]] + "</div>");
					}
				} else {
					for (var i = z; i < z+4; i++){
						$("#upevents").append("<br><div class='month'>July " + july[i] + ":</div><div> "+ July[july[i]] + "</div>");
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
		$("#upevents").html("<button class='mynav' data-nav='tryouts'>Summer 2018 Information &<br/>Tryout Dates are available<br/><span class='mybold1'>Click Here for More information</span></button><hr/>");
	}
}//end of upcomming events function

//---------------------------------------------------------------------------------
 // find the index of the next event date based on this date and items this month
 function findEvent(date, month) {
 	for (var i = 0; i < parseInt(month[i]); i++) {
 		if (date === parseInt(month[i])) {
 			z = i;
 			break;
 		} else if (date > parseInt(month[i])){
 			z = i;
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
        ("#todayschedule2").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule2").append("11 & Overs: 6:45 - 8:00 PM");
				break;
			case 5:
				$("#todayschedule").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule").append("11 & Overs: 6:45 - 8:00 PM");
        $("#todayschedule2").html("10 & Unders: 6:00 - 7:15 PM<br />");
				$("#todayschedule2").append("11 & Overs: 6:45 - 8:00 PM");

		}
	} else if (month >= 0 && month < 4) {
		$("#todayschedule").html("Summer Team Practice<br>Begins on MAY 29, 2018<br>Hope to see you there!");
    $("#todayschedule2").html("Summer Team Practice<br>Begins on MAY 29, 2018<br>Hope to see you there!");
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
