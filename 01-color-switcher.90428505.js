const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");document.querySelector("body");let n=null;function o(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(()=>{n=setInterval((()=>{const t=o();document.body.style.background=t}),1e3)})),e.addEventListener("click",(()=>{clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.90428505.js.map
