//GETs in URL
var $_GET=[];
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,name,value){$_GET[name]=value;});

//App class
const App = () =>{    
    alert("hello i'm working");
};


//App();
