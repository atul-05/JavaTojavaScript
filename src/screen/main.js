import React,{useState,useRef} from "react";
import {View,Text,ActivityIndicator,TextInput, Pressable, Platform} from "react-native";
import { Hoc } from "../components/Hoc";
import { WebView } from 'react-native-webview';
import { Input,SearchIcon,useToast } from "native-base";
import { compareSpecificity } from "native-base/lib/typescript/hooks/useThemeProps/propsFlattener";





const MainView =(props)=>{
    const [canGoBack, setCanGoBack] = useState(false);
    const toast = useToast();
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [loading,setloading] = useState(false);
  const [showSearchBar,setSearchbar]  = useState(false);
  const webviewRef = useRef(null);
  const [url,seturl] = useState({
    uri:""
  })
      
        
 const onsubmit = (text)=>{
        // if(text.includes("https://")|| text.includes("https://")){
        //     //  if(text.indexOf("https://"))
        //     seturl({uri:text});
        // }else{
        //      let customeurl = "http://"+text;
             seturl({uri:text});
        // }
  }

  console.log(url);



  const GM_loadUrl = (uri,headers)=>{
     return ({
      uri,
      headers:{
        ...headers
      }
     })
  }

  const GM_loadFrame = (uri)=>{
    return({
      uri,
    })
  }


const loadFram = require("./loadFram.html");
var image_data_uri = require("./scriptparser/img/OK.png");
console.log("image_data_uri",image_data_uri)

const scriptParser = `

(function() {
  var startingTime = new Date().getTime();
  // Load the script
  var script = document.createElement("SCRIPT");
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
  script.type = 'text/javascript';
  document.getElementsByTagName("head")[0].appendChild(script);
  document.body.style.backgroundColor = 'red';

  // Poll for jQuery to come into existance
  var checkReady = function(callback) {
      if (window.jQuery) {
          callback(jQuery);
      }
      else {
          window.setTimeout(function() { checkReady(callback); }, 20);
      }
  };

  // Start polling...
  checkReady(function($) {
      $(function() {
          var endingTime = new Date().getTime();
          var tookTime = endingTime - startingTime;
          
          window.alert('typeof window.jQuery is: ' + (typeof window.jQuery));

window.alert('typeof GM_getResourceURL("image_001") is: ' + (typeof ${image_data_uri}));
window.jQuery(window.document).ready(function($) {
  var $body = $("body");

  window.alert('$("body").length is: ' + $body.length);
  window.alert('$("body").get(0) instanceof HTMLBodyElement is: ' + ($body.get(0) instanceof HTMLBodyElement));

  $body
    .html('<div><img src="${image_data_uri}" style="max-width: 90%" /><br /><br /><span>Hello from jQuery</span></div>')
    .css({textAlign: 'center', backgroundColor: 'white'});
});
      });
  });
})();




true;
`

const myScript = `


document.body.style.backgroundColor = 'red';

function GM_log(message){ 
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
};

var WebViewWM = {
  toast:(secret,messgae,duration)=>{
    const data =  JSON.stringify({secret,messgae,duration});
    window.ReactNativeWebView.postMessage(data);
    return;
  },
};

function GM_toastShort (message){
  const data  = JSON.stringify({message,duration:5000});
window.ReactNativeWebView.postMessage(data);
// return ()
};

function GM_toastLong (message){
  const data  = JSON.stringify({message,duration:3000});
window.ReactNativeWebView.postMessage(data);
// return ()
};


GM_log("typeof GM_log = "           + (typeof GM_log));
GM_log("typeof GM_toastLong = "     + (typeof GM_toastLong));

GM_log("typeof WebViewWM = "        + (typeof WebViewWM));
GM_log("typeof WebViewWM.toast = "  + (typeof WebViewWM.toast));

GM_toastLong("Hello from " + window.location.href);
GM_toastShort("Hello from " + window.location.href);

// setTimeout(function() { window.alert('hi') }, 2000);
true; 
`;

      return (
          <View style={{flex:1}}>
              <Hoc hideSearchicon={showSearchBar} onCall={()=>{
                  setSearchbar(true)
              }}>
              <View style={{flex:1}}>
             {showSearchBar && <View style={{width:"100%",paddingHorizontal:10,flexDirection:"row"}}>
                  <View style={{width:"80%"}}>
                  <TextInput 
                  defaultValue={url.uri}
                  onChangeText={(text)=>{
                    //   seturl(text);
                  }}
                  onSubmitEditing={(event)=>{
                    // seturl(text);
                    onsubmit(event.nativeEvent.text)
                    // console.log()
                  }}
                  
                    placeholder="Type url"
                    returnKeyType="search"
                  />
                  </View>
                  <Pressable onPress={()=>{setSearchbar(false)}} style={{width:"20%",justifyContent:"center",alignItems:"center"}}> 
                  <SearchIcon size="4"/>
                  </Pressable>
              </View>}
              {url !="" && 
              <WebView 
              source={url}
              originWhitelist={['*']}
              // source={{html:`${loadFram}`}}
              injectedJavaScriptBeforeContentLoaded={myScript}
              // onShouldStartLoadWithRequest={(request)=>{
              //   // if (request.url === url) return true;
              //   console.log("onShouldStartLoadWithReques",request)
              //    if(request.url !=="httpbin.org") {
              //      let data =  GM_loadUrl("https://httpbin.org/headers",{"User-Agent":"WebMonkey","X-Requested-With":"WebMonkey"});
              //             // seturl(data)
              //      }

              //    }}

              onShouldStartLoadWithRequest={(request)=>{
                console.log("onShouldStartLoadWithRequest",request);
                const urlParent = "http://example.com/parent_window.html";
                if(request.url !==urlParent){
                const data =   GM_loadFrame("http://gitcdn.link/cdn/warren-bank/Android-WebMonkey/master/tests/0006-load-frame.html")
                seturl(data) ; 
              }
               
              }}

              
              injectedJavaScript={scriptParser}
                renderLoading={()=>(<ActivityIndicator size="small" color="red"/>)}
                onMessage={(value)=>{
                      console.log("onMessage",value);
                }}
                
               
                
              
               />
                }
              </View>
              
              </Hoc>
             
          </View>
      )
}


export default MainView;