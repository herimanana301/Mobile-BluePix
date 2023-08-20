import React, { useState, useEffect } from "react"
import { WebView } from 'react-native-webview';
import { SafeAreaView, View, Image, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import CookieManager from '@react-native-cookies/cookies';


export default function Bluepix(){
    const [isLoading, setIsLoading] = useState(true);
    const [isMaintenance,setIsMaintenance] = useState(false)
    const [isConnected, setIsConnected] = useState(true)
    const [cookies, setCookies] = useState([]);
    const message = ["Lany mega annnh", "Oops tu n'as pas de connexion !"]
    const noWifiImage = ["../images/nowifi2.gif","../images/nowifi.gif"]
    const injectedJavaScript = `
    const element = document.querySelector('#cookieconsent:desc');
    const elementTwo = document.querySelector('.compliance');
    if (element) {
      element.style.display = 'none';
      elemenTwot.style.display = 'none';
    }
  `;
    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const randomIndex = Math.floor(Math.random() * message.length-1);
    const randomIndexwifi = Math.floor(Math.random() * noWifiImage.length-1);

    const handleLoadEnd = () => {
        setIsLoading(false);
    }
    const handleLoadError = ()=>{
        setIsMaintenance(true)
    }
    const handleRenderError = ()=>{
        setIsMaintenance(true)
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:isLoading || isMaintenance ? "#0a61d8" : "#212121"}}>
            {isLoading&&
                <View style={{...StyleSheet.absoluteFillObject,flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#0a61d8", zIndex:1}}>
                    <Image
                        source={require("../images/chargement.gif")}
                    />
                    <Text style={{fontWeight:"bold", fontSize:20, color:"white", padding:30}}>Ça arrive...</Text>
                </View>
            }
            {isMaintenance&&
                            <View style={{...StyleSheet.absoluteFillObject,flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#0a61d8", zIndex:1}}>
                            <Image style={{width:100, height:100, borderRadius:10}}
                                source={require("../images/tv-static.gif")}
                            />
                            <Text style={{fontWeight:"bold", fontSize:20, color:"white", padding:30, paddingBottom:0}}>🔧 Maintenance de BluePix ! ⚙️</Text>
                            <Text style={{fontWeight:"bold", fontSize:20, color:"white"}}>Revenez dans un moment</Text>
                        </View>
            }
            {isConnected===false&&
                            <View style={{...StyleSheet.absoluteFillObject,flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#0a61d8", zIndex:1}}>
                            <Image style={{width:150, height:150, borderRadius:10}}
                                source={randomIndexwifi===0?require("../images/nowifi.gif"):require("../images/nowifi2.gif")}
                            />
                            <Text style={{fontWeight:"bold", fontSize:20, color:"white", padding:30, paddingBottom:0}}>{randomIndex ===0 ? "Lany mega annnh":"Oops tu n'as pas de connexion !"}</Text>
                        </View>
            }
                <WebView source={{ uri: 'https://bluepix.fr/' }} style={{ flex: 1 }}       
                sharedCookiesEnabled={true}
                thirdPartyCookiesEnabled={true}
                allowFileAccess={true} 
                onLoadEnd={handleLoadEnd} 
                injectedJavaScript={injectedJavaScript} 
                onError={handleLoadError} 
                onRenderError={handleRenderError} 
                    />
        </SafeAreaView>
    )
}
