var link = "http://127.0.0.1:8080/quotes/"
var door = "off"
var doorC = "off"
var language;
var chapter;
function addChapter(e) {

  if(door==="on"){
    link+="/";
  }

  if(doorC === "off"){
    link = link + "chapter="+e.target.value;
    document.getElementById("apiLink").value = link;
    doorC = "on";
    chapter = e.target.value;
  }
  else{
    link = link.replace("chapter="+chapter,"chapter="+e.target.value);
    console.log(link);
    document.getElementById("apiLink").value = link;
    chapter = e.target.value;
  }

}

function addLanguage(e){
  if(doorC==="on"){
    link+="/"
  }
    language = e.target.value;
    if(door==="off"){
      link = link + "lang="+e.target.value
      document.getElementById("apiLink").value = link
      console.log(e);
      door = "on";
    }
    else{
      link = link.replace("lang="+language,"");
      document.getElementById("apiLink").value = link;
      door = "off";
    }

}
