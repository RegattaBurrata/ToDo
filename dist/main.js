(()=>{"use strict";document.querySelector(".project-items");const e=document.querySelectorAll(".add-project"),t=document.querySelector("[data-projects]"),a=document.querySelector("[data-new-project-form]"),n=document.querySelector("[data-new-project-input"),o=document.querySelector("[data-project-title]"),c=document.querySelector("[data-tasks]"),d=document.getElementById("task-template"),r=document.querySelector("[data-new-task-form"),i=document.querySelector("[data-new-task-input");e.forEach((e=>{e.addEventListener("click",(()=>{a.style.display="grid"}))})),a.addEventListener("submit",(function(e){e.preventDefault();const t=n.value;if(null===t||""===t)return;const a=(o=t,{id:Date.now().toString(),name:o,tasks:[]});var o;u.push(a),n.value=null,f()})),r.addEventListener("submit",(function(e){e.preventDefault();const t=i.value;if(null===t||""===t)return;const a=(n=t,{id:Date.now().toString(),name:n,complete:!1});var n;i.value=null,u.find((e=>e.id===m)).tasks.push(a),f()}));const s="task.projects",l="task.selectedProjectId";let u=JSON.parse(localStorage.getItem(s))||[],m=localStorage.getItem(l);function p(){localStorage.setItem(s,JSON.stringify(u)),localStorage.setItem(l,m)}function f(){p(),g()}function g(){S(t),u.forEach((e=>{const n=document.createElement("div");n.classList.add("icon-size"),n.textContent="#",e.id===m&&n.classList.add("active"),t.appendChild(n);const o=document.createElement("p");o.dataset.projectId=e.id,o.classList.add("project-name"),o.innerText=e.name,e.id===m&&o.classList.add("active"),t.appendChild(o);const c=document.createElement("img");c.src="./assets/trash.svg",c.dataset.deleteProjectButton=e.id,t.appendChild(c),a.style.display="none"}));const e=u.find((e=>e.id===m));null!=m&&(o.innerText=e.name,S(c),function(e){e.tasks.forEach((e=>{const t=document.importNode(d.content,!0),a=t.querySelector("input");a.id=e.id,a.checked=e.complete;const n=t.querySelector("label");n.htmlFor=e.id,n.append(e.name),c.appendChild(t)}))}(e))}function S(e){for(;e.firstChild;)e.removeChild(e.firstChild)}t.addEventListener("click",(e=>{"p"===e.target.tagName.toLowerCase()&&(m=e.target.dataset.projectId,f())})),t.addEventListener("click",(e=>{"img"===e.target.tagName.toLowerCase()&&(u=u.filter((t=>t.id!==e.target.dataset.deleteProjectButton)),f())})),c.addEventListener("click",(e=>{"input"===e.target.tagName.toLowerCase()&&(u.find((e=>e.id===m)).tasks.find((t=>t.id=e.target.id)).complete=e.target.checked,p())})),g(),window.localStorage.clear()})();