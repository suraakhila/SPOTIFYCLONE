let currentsong=new Audio();
let s;
let songs;
let currentFolder;
function convertSecondsToMinutesSeconds(totalSeconds) {
  if(isNaN(totalSeconds) ||  totalSeconds<0)
   return "00:00";
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = Math.floor(totalSeconds % 60);
  
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return formattedMinutes + ":" + formattedSeconds;
}
async function gs(folder){
  currentFolder=folder;
    let a= await fetch(`http://127.0.0.1:3000/${folder}/`)
    let b=await a.text()
    let c=document.createElement("div")
    c.innerHTML=b
    let d=c.getElementsByTagName("a")
    console.log(d)
     songs=[] 
    for(let i=0;i<d.length;i++)
    {
      let e1=d[i]
    if(e1.href.endsWith(".mp3"))
      {
        songs.push(e1.href.split(`/${folder}/`)[1])
      }
} 
let s3= document.querySelector(".songlist").getElementsByTagName("ul")[0]
s3.innerHTML=""
for (const song of songs) {
   s3.innerHTML=s3.innerHTML+`<li><img src="music.svg" alt="" class="invert">
   <div class="info"><div>${song} </div>
<div>Song Artist</div>
</div><div class="playnow"><span>playnow</span><img src="play.svg" alt="" class="invert"></div>
</li>`

}
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
e.addEventListener("click",element=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML)
playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
})
})
}
const playMusic=(track,pause=false)=>{
  // let audio=new Audio("/songs/"+track)
  currentsong.src=`/${currentFolder}/`+track
  if(!pause)
  {
    currentsong.play()
    p1.src="pause.svg"
    
  }
 currentsong.play()
 p1.src="pause.svg"
 document.querySelector(".songinfo").innerHTML=track
 document.querySelector(".songtime").innerHTML="00:00/00:00"
}
async function main()
{
    await gs("akkey/songs")
   playMusic(songs[0],true)
    
   p1.addEventListener("click",()=>{
    if(currentsong.paused)
    {
      currentsong.play()
      p1.src="pause.svg"
    }
        
      else
      {
        currentsong.pause()
        p1.src="play.svg"
      }
        
   })
   currentsong.addEventListener("timeupdate",()=>
        {
          console.log(currentsong.currentTime,currentsong.duration)
          document.querySelector(".songtime").innerHTML=`${convertSecondsToMinutesSeconds(currentsong.currentTime)}|${convertSecondsToMinutesSeconds(currentsong.duration)}`
          document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"
        }) 
        document.querySelector(".seekbar").addEventListener("click",(e)=>
        {
          let t=(e.offsetX/e.target.getBoundingClientRect().width)*100
          document.querySelector(".circle").style.left=t+"%"
          currentsong.currentTime=((t*currentsong.duration)/100)

        })
        document.querySelector(".ham").addEventListener("click",()=>{
          document.querySelector(".left").style.left="0"
        })
        document.querySelector(".c").addEventListener("click",()=>{
          document.querySelector(".left").style.left="" /*-100% */
        })
         p.addEventListener("click",()=>
         {
          currentsong.pause()
          let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
          console.log("p")
          if((index-1)>=0)
          {
            playMusic(songs[index-1])
          }
         })
         n.addEventListener("click",()=>
         {
          console.log("n")
          currentsong.pause()
          let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0])
          if((index+1)<songs.length)
          {
            playMusic(songs[index+1])
          }
         })
         document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>
         {
          console.log(e.target.value) 
                currentsong.volume=parseInt(e.target.value)/100
         })
         document.querySelector(".volume>img").addEventListener("click",(e)=>
         {
           if(e.target.src.includes("volume.svg"))
           {
             e.target.src=e.target.src.replace("volume.svg","mute.svg")
             currentsong.volume=0
             document.querySelector(".range").getElementsByTagName("input")[0].value=0

           }
           else
           {
             e.target.src=e.target.src.replace("mute.svg","volume.svg")
             currentsong.volume=.10
             document.querySelector(".range").getElementsByTagName("input")[0].value=10

           }
         })
        Array.from(document.getElementsByClassName("card")).forEach((e)=>{
          e.addEventListener("click",async item=>{
            s=await gs(`akkey/${item.currentTarget.dataset.folder}`)
          
          })
         })
}
main()   