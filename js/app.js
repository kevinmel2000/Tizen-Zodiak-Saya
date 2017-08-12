(function() {
	
	function showZodiak(){
      	document.querySelector("#err-message").style.display = "none";
		var name=document.getElementById("text-name").value;
		var birth=document.getElementById("text-birth").value;
		
		console.log(birth);
	
		if(name.length==0 || birth.length==0 || name==null || birth==null){
	      	document.querySelector("#err-message").style.display = "block";
	      	$("#err-message").html("Complete form first!");
		}
		else{
			var part_b=birth.split("-");
			var format_birth=part_b[2]+"-"+part_b[1]+"-"+part_b[0];

	        document.querySelector("#img-load").style.display = "inline";
	        
			$.getJSON("https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w&nama="+name+"&tanggal="+format_birth, function(result){
				if(result.status=='success'){
					$("#message-header").html(result.data.zodiak);
	        	  	$("#message-content").html(result.data.lahir+". Usia: "+result.data.usia+". Ulang tahun: "+result.data.ultah+" lagi");
	        	  	
	        	  	var img_data=result.data.zodiak.toLowerCase()+".jpg";

	    	        document.querySelector("#img-load").style.display = "none";
		        	document.getElementById("message-img").src = "./image/"+img_data;
	  	        	document.querySelector("#msg-box").style.display = "block";
				}
				else{
			      	document.querySelector("#err-message").style.display = "block";
			      	$("#err-message").html("Error when fetch data!");
				}
				
			});
			
		}
	}

    function setDefaultEvents() {
        document.querySelector("#btn-show").addEventListener("click", showZodiak);

        document.addEventListener("tizenhwkey", function(e) {
            if (e.keyName === "back") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (error) {
                    console.error("getCurrentApplication(): " + error.message);
                }
            }
        });
    }

    function init() {
        setDefaultEvents();
    }

    window.onload = init;
}());
