(this.webpackJsonptao=this.webpackJsonptao||[]).push([[0],{54:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GameService=void 0;var n=i(74),a=i(76),l=function(){var t=this;this.applyAbility=function(t,e,i,n){return n},this.callApplyAbility=function(t,e,i,n){return!1},this.createUnitID=function(t){return[t.player.id,t.id]},this.getUnitbyUnitID=function(e){return t.game.units.filter((function(t){return t.player.id==e[0]&&t.id==e[1]}))[0]},this.players=[new a.Player1,new a.Player2],this.game=new n.Game({players:this.players})};e.GameService=l},61:function(t,e,i){},62:function(t,e,i){},63:function(t,e,i){},65:function(t,e,i){},73:function(t,e,i){},74:function(t,e,i){"use strict";var n=this&&this.__spreadArrays||function(){for(var t=0,e=0,i=arguments.length;e<i;e++)t+=arguments[e].length;var n=Array(t),a=0;for(e=0;e<i;e++)for(var l=arguments[e],r=0,c=l.length;r<c;r++,a++)n[a]=l[r];return n};e.__esModule=!0,e.Game=void 0;var a=i(75),l=function(t){var e=this;this.initializePlayers=function(){return e.players.map((function(t){return t.units=e.initializeUnits(t)}))},this.initializeUnits=function(t){var i=t.unitModels.map((function(e,i){return new a.GameUnit(i,t,e)}));return e.units=n(e.units,i),i},this.applyAbility=function(t,i,n,a){switch(i.targets[0]){case"Clicked":var l=i.ability.apply(t,i,[n]);return e.changeTurn(),a.map((function(t,e){return e===n.id?l[0]:t}));case"All_by_Player":var r=i.ability.apply(t,i,a);return e.changeTurn(),r;default:return e.changeTurn(),a}},this.getUnitsByPlayer=function(t){return e.units.filter((function(e){return e.player===t}))},this.changeTurn=function(){e.checkForWinner()?console.log("TBD: proclaim winner"):(e.switchToNextPlayer(),e.turn++)},this.switchToNextPlayer=function(){var t=e.players.length,i=e.players.indexOf(e.currentPlayer)+1,n=t===i?0:i;e.currentPlayer=e.players[n]},this.checkForWinner=function(){return console.log("TBD: are there losers?"),!1},this.players=t.players,this.turn=t.turn||0,this.currentPlayer=t.currentPlayer||t.players[0],this.units=[],this.initializePlayers()};e.Game=l},75:function(t,e,i){"use strict";e.__esModule=!0,e.GameUnit=void 0;var n=function(t,e,i){this.id=t,this.player=e,console.log("Live unit"),this.name=i.name,this.life=i.maxlife,this.maxlife=i.maxlife,this.abilities=i.abilities};e.GameUnit=n},76:function(t,e,i){"use strict";var n=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}();e.__esModule=!0,e.Player2=e.Player1=e.Player=void 0;var a=i(77),l=function(t){this.name=t.name,this.id=t.id,this.unitModels=t.unitModels,this.units=[],this.alive=!0};e.Player=l;var r=function(t){function e(){return t.call(this,{name:"Player1",id:1,unitModels:[a.Knight,a.Healer],units:[],alive:!0})||this}return n(e,t),e}(l);e.Player1=r;var c=function(t){function e(){return t.call(this,{name:"Player2",id:2,unitModels:[a.Knight,a.Healer],units:[],alive:!0})||this}return n(e,t),e}(l);e.Player2=c},77:function(t,e,i){"use strict";e.__esModule=!0,e.Healer=e.Knight=e.GameUnit=void 0;var n=i(78),a=function(t){this.name=t.name,this.maxlife=t.maxlife,this.abilities=t.abilities};e.GameUnit=a,e.Knight={name:"Knight",maxlife:50,abilities:[{name:n.Attack.name,damage:10,targets:["Clicked"],ability:n.Attack}]},e.Healer={name:"Healer",maxlife:30,abilities:[{name:n.Heal.name,damage:6,targets:["All_by_Player"],ability:n.Heal}]}},78:function(t,e,i){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var a in e=arguments[i])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)};e.__esModule=!0,e.Heal=e.Attack=void 0,e.Attack={name:"Attack",targets:["Enemy"],apply:function(t,e,i){return i.map((function(t){return n(n({},t),{life:Math.min(t.maxlife,t.life-e.damage)})}))}},e.Heal={name:"Heal",targets:["Ally"],apply:function(t,e,i){return i.map((function(t){return n(n({},t),{life:Math.min(t.maxlife,t.life+e.damage)})}))}}},79:function(t,e,i){"use strict";i.r(e);var n,a,l=i(3),r=i.n(l),c=i(51),s=i.n(c),u=(i(61),i(62),i(63),i(4)),o=function(t){return Object(u.jsx)("div",{className:"Menu",children:Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:"Units"}),Object(u.jsx)("li",{children:"Battle"})]})})},y=i(16),p=(i(65),i(21)),h=new p.ApolloClient({cache:new p.InMemoryCache({addTypename:!1}),uri:"/graphql"}),f=i(35),d=i(26),m=function t(e){Object(d.a)(this,t),this.name=void 0,this.maxlife=void 0,this.life=void 0,this.name=e.name,this.life=e.maxlife,this.maxlife=e.maxlife},b=function t(e){var i=this;Object(d.a)(this,t),this.apolloClient=void 0,this.getUnits=function(t){return i.apolloClient.query({query:Object(p.gql)(n||(n=Object(f.a)(["{\n            units {\n              name\n              maxlife\n            }\n          }"])))}).then((function(e){return t(e.data.units)})).catch((function(){return!1}))},this.initializeUnits=function(t){return t.map((function(t){return new m(t)}))},this.apolloClient=e},g=(i(73),function(t){var e=t.unit,i=Object(y.a)(t.selectedUnit,2),n=i[0],a=i[1],l=Object(y.a)(t.selectedAbilty,2),r=l[0],c=l[1],s=Object(y.a)(t.turn,2),o=s[0],p=s[1],h=function(){1===t.unit.player.id&&t.dispatchMyAbility({type:"apply",applyingUnit:n,selectedAbilty:r,receivingUnit:e}),2===t.unit.player.id&&t.dispatchEnemyAbility({type:"apply",applyingUnit:n,selectedAbilty:r,receivingUnit:e}),a(null),c(null),p(o+1)};return Object(u.jsxs)("div",{className:"Unit"+(n===e?" selectedUnit":""),onClick:function(i){o%2+1===t.unit.player.id?r&&"Ally"===r.ability.targets[0]?h():null===n||t.unit.player.id===n.player.id?(a(n===e?null:e),c(null)):console.log("no ability selected"):n?r&&"Enemy"===r.ability.targets[0]?h():console.log("Can't apply to enemy"):console.log("It's not your unit")},children:[Object(u.jsx)("h4",{children:e.name}),Object(u.jsx)("h6",{children:e.life>0?"Alive":"Dead"}),Object(u.jsx)("h6",{children:t.unit.player.name}),Object(u.jsxs)("div",{children:["Life: ",Object(u.jsx)("span",{children:e.life>0?e.life:0})]})]})}),v=i(56),j=i(55),O=function(t){Object(v.a)(i,t);var e=Object(j.a)(i);function i(t){var n;return Object(d.a)(this,i),(n=e.call(this)).apolloClient=void 0,n.applyAbility=function(t,e,i,l){return console.log("ClientGameService - applyAbility"),console.log(n.createUnitID(t)),console.log(e.ability.name),console.log(n.createUnitID(i)),console.log(l.map((function(t){return n.createUnitID(t)}))),n.apolloClient.mutate({variables:{applyingUnitID:n.createUnitID(t),unitAbilityName:e.ability.name,recivingUnitID:n.createUnitID(i),recivingUnitIDs:l.map((function(t){return n.createUnitID(t)}))},mutation:Object(p.gql)(a||(a=Object(f.a)(["\n        mutation ApplyAbility(\n          $applyingUnitID: [ID],\n          $unitAbilityName: String,\n          $recivingUnitID: [ID],\n          $recivingUnitIDs: [[ID]]\n        ) {\n          applyAbility(\n            applyingUnitID: $applyingUnitID,\n            unitAbilityName: $unitAbilityName,\n            recivingUnitID: $recivingUnitID,\n            recivingUnitIDs: $recivingUnitIDs\n          )\n        }\n      "])))}).then((function(t){return console.log(t)})).catch((function(t){return console.log(t)})),n.game.applyAbility(t,e,i,l)},n.apolloClient=t,n}return i}(i(54).GameService);console.log("New Game Loading");var U=new O(h);function x(t,e){switch(e.type){case"apply":return U.applyAbility(e.applyingUnit,e.selectedAbilty,e.receivingUnit,t);default:return t}}var A=function(t){var e,i;Object(l.useEffect)((function(){new b(h).getUnits((function(t){return console.log(t)}))}),[]);var n=Object(l.useReducer)(x,null===(e=U.game)||void 0===e?void 0:e.getUnitsByPlayer(U.game.players[0])),a=Object(y.a)(n,2),r=a[0],c=a[1],s=Object(l.useReducer)(x,null===(i=U.game)||void 0===i?void 0:i.getUnitsByPlayer(U.game.players[1])),o=Object(y.a)(s,2),p=o[0],f=o[1],d=Object(l.useState)(1),m=Object(y.a)(d,2),v=m[0],j=m[1];Object(l.useEffect)((function(){console.log("Update Turn"),j(U.game.turn)}),[U]);var O=Object(l.useState)(null),A=Object(y.a)(O,2),P=A[0],_=(A[1],Object(l.useState)(null)),D=Object(y.a)(_,2),I=D[0],w=D[1];return Object(u.jsxs)("div",{className:"Main",children:[Object(u.jsx)("div",{className:"Timer",children:"Timer"}),Object(u.jsxs)("div",{className:"Turn",children:["Turn: ",v," - CurrentPlayer: ",v%2]}),Object(u.jsxs)("div",{className:"Battle",children:[r.map((function(t){return Object(u.jsx)(g,{unit:t,turn:d,dispatchMyAbility:c,dispatchEnemyAbility:f,selectedAbilty:_,selectedUnit:O},t.id)})),Object(u.jsx)("div",{className:"Divider",children:"vs"}),p.map((function(t){return Object(u.jsx)(g,{unit:t,turn:d,dispatchMyAbility:c,dispatchEnemyAbility:f,selectedAbilty:_,selectedUnit:O},t.id)}))]}),Object(u.jsx)("div",{className:"Controls",children:null===P||void 0===P?void 0:P.abilities.map((function(t){return Object(u.jsx)("div",{className:"Control"+(I===t?" selected":""),onClick:function(e){w(t)},children:Object(u.jsxs)("span",{children:[t.ability.name,": ",t.damage]})})}))})]})};var P=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(o,{}),Object(u.jsx)(A,{})]})},_=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,80)).then((function(e){var i=e.getCLS,n=e.getFID,a=e.getFCP,l=e.getLCP,r=e.getTTFB;i(t),n(t),a(t),l(t),r(t)}))};s.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(P,{})}),document.getElementById("root")),_()}},[[79,1,2]]]);
//# sourceMappingURL=main.a9f62543.chunk.js.map