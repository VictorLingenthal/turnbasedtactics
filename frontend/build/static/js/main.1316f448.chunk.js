(this.webpackJsonptao=this.webpackJsonptao||[]).push([[0],{65:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GameService=void 0;var i=n(92),r=n(94),a=function(){var t=this;this.dispatchAbility=function(t,e,n,i){},this.callApplyAbility=function(e,n,i,r){console.log("callApplyAbility");var a=t.getUnitbyUnitID(e),l=a.abilities.filter((function(t){return t.name===n}))[0],c=t.getUnitbyUnitID(i),s=r.map((function(e){return t.getUnitbyUnitID(e)}));return t.game.applyAbility(a,l,c,s),!1},this.createUnitID=function(t){return[t.player.id,t.id]},this.getUnitbyUnitID=function(e){return t.game.units.filter((function(t){return t.player.id==e[0]&&t.id==e[1]}))[0]},this.unitCountByPlayer=function(){console.log("unitCountByPlayer");var e=t.players.map((function(e){return{player:e.name,unitCount:t.game.units.filter((function(t){return t.player.name==e.name})).length,unitlife:t.game.units.map((function(t){return t.life}))}}));console.log(e),console.log("currentTurn: "+t.game.turn)},this.players=[new r.Player1,new r.Player2],this.game=new i.Game({players:this.players})};e.GameService=a},72:function(t,e,n){},73:function(t,e,n){},74:function(t,e,n){},76:function(t,e,n){},91:function(t,e,n){},92:function(t,e,n){"use strict";var i=this&&this.__spreadArrays||function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var i=Array(t),r=0;for(e=0;e<n;e++)for(var a=arguments[e],l=0,c=a.length;l<c;l++,r++)i[r]=a[l];return i};Object.defineProperty(e,"__esModule",{value:!0}),e.Game=void 0;var r=n(93),a=function(t){var e=this;this.initializePlayers=function(){return e.players.map((function(t){return t.units=e.initializeUnits(t)}))},this.initializeUnits=function(t){var n=t.unitModels.map((function(e,n){return new r.GameUnit(n,t,e)}));return e.units=i(e.units,n),n},this.insertUnits=function(t){for(var n=function(n){var i=t[n];e.units=e.units.map((function(t){return i.id===t.id&&i.player.id===t.player.id?i:t}))},i=0;i<t.length;i++)n(i)},this.applyAbility=function(t,n,i,r){switch(n.targets[0]){case"Clicked":var a=n.ability.apply(t,n,[i]);return e.insertUnits(a),void e.changeTurn();case"All_by_Player":return a=n.ability.apply(t,n,r),e.insertUnits(a),void e.changeTurn();default:return void e.changeTurn()}},this.getUnitsByPlayer=function(t){return e.units.filter((function(e){return e.player===t}))},this.changeTurn=function(){e.checkForWinner()?console.log("TBD: proclaim winner"):(e.switchToNextPlayer(),e.turn++)},this.switchToNextPlayer=function(){var t=e.players.length,n=e.players.indexOf(e.currentPlayer)+1,i=t===n?0:n;e.currentPlayer=e.players[i]},this.checkForWinner=function(){return console.log("TBD: are there losers?"),!1},this.players=t.players,this.turn=t.turn||0,this.currentPlayer=t.currentPlayer||t.players[0],this.units=[],this.initializePlayers()};e.Game=a},93:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GameUnit=void 0;var i=function(t,e,n){this.id=t,this.player=e,console.log("Live unit"),this.name=n.name,this.life=n.maxlife,this.maxlife=n.maxlife,this.abilities=n.abilities};e.GameUnit=i},94:function(t,e,n){"use strict";var i=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.Player2=e.Player1=e.Player=void 0;var r=n(95),a=function(t){this.name=t.name,this.id=t.id,this.unitModels=t.unitModels,this.units=[],this.alive=!0};e.Player=a;var l=function(t){function e(){return t.call(this,{name:"Player1",id:1,unitModels:[r.Knight,r.Healer],units:[],alive:!0})||this}return i(e,t),e}(a);e.Player1=l;var c=function(t){function e(){return t.call(this,{name:"Player2",id:2,unitModels:[r.Knight,r.Healer],units:[],alive:!0})||this}return i(e,t),e}(a);e.Player2=c},95:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Healer=e.Knight=e.GameUnit=void 0;var i=n(96),r=function(t){this.name=t.name,this.maxlife=t.maxlife,this.abilities=t.abilities};e.GameUnit=r,e.Knight={name:"Knight",maxlife:50,abilities:[{name:i.Attack.name,damage:10,targets:["Clicked"],ability:i.Attack}]},e.Healer={name:"Healer",maxlife:30,abilities:[{name:i.Heal.name,damage:6,targets:["All_by_Player"],ability:i.Heal}]}},96:function(t,e,n){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.Heal=e.Attack=void 0,e.Attack={name:"Attack",targets:["Enemy"],apply:function(t,e,n){return n.map((function(t){return i(i({},t),{life:Math.min(t.maxlife,t.life-e.damage)})}))}},e.Heal={name:"Heal",targets:["Ally"],apply:function(t,e,n){return n.map((function(t){return i(i({},t),{life:Math.min(t.maxlife,t.life+e.damage)})}))}}},97:function(t,e,n){"use strict";n.r(e);var i,r,a,l=n(4),c=n.n(l),s=n(60),u=n.n(s),o=(n(72),n(73),n(74),n(5)),f=function(t){return Object(o.jsx)("div",{className:"Menu",children:Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{children:"Units"}),Object(o.jsx)("li",{children:"Battle"})]})})},y=n(19),h=(n(76),n(20)),p=n(61),m=n(64),d=new h.HttpLink({uri:"http://localhost:4444/graphql"}),b=new p.a({uri:"ws://localhost:4444/graphql",options:{reconnect:!0}}),v=Object(h.split)((function(t){var e=t.query,n=Object(m.a)(e);return"OperationDefinition"===n.kind&&"subscription"===n.operation}),b,d),g=new h.ApolloClient({link:v,uri:"http://localhost:4444/graphql",cache:new h.InMemoryCache}),j=n(29),O=n(30),U=function t(e){Object(O.a)(this,t),this.name=void 0,this.maxlife=void 0,this.life=void 0,this.name=e.name,this.life=e.maxlife,this.maxlife=e.maxlife},x=function t(e){var n=this;Object(O.a)(this,t),this.apolloClient=void 0,this.getUnits=function(t){return n.apolloClient.query({query:Object(h.gql)(i||(i=Object(j.a)(["{\n            units {\n              name\n              maxlife\n            }\n          }"])))}).then((function(e){return t(e.data.units)})).catch((function(){return!1}))},this.initializeUnits=function(t){return t.map((function(t){return new U(t)}))},this.apolloClient=e},A=(n(91),function(t){var e=t.gameService,n=t.unit,i=Object(y.a)(t.selectedUnit,2),r=i[0],a=i[1],l=Object(y.a)(t.selectedAbilty,2),c=l[0],s=l[1],u=Object(y.a)(t.turn,2),f=u[0],h=(u[1],function(){e.dispatchAbility(r,c,n,e.game.units.filter((function(t){return t.player.name===n.player.name}))),a(null),s(null)});return Object(o.jsxs)("div",{className:"Unit"+(r===n?" selectedUnit":""),onClick:function(t){f%2+1===n.player.id?c&&"Ally"===c.ability.targets[0]?h():null===r||n.player.id===r.player.id?(a(r===n?null:n),s(null)):console.log("no ability selected"):r?c&&"Enemy"===c.ability.targets[0]?h():console.log("Can't apply to enemy"):console.log("It's not your unit")},children:[Object(o.jsx)("h4",{children:n.name}),Object(o.jsxs)("h4",{children:["ID: ",n.id]}),Object(o.jsx)("h6",{children:n.life>0?"Alive":"Dead"}),Object(o.jsx)("h6",{children:n.player.name}),Object(o.jsxs)("h6",{children:["PlayerID: ",n.player.id]}),Object(o.jsxs)("div",{children:["Life: ",Object(o.jsx)("span",{children:n.life>0?n.life:0})]})]})}),P=n(39),D=n(67),I=n(66),_=function(t){Object(D.a)(n,t);var e=Object(I.a)(n);function n(t){var i;return Object(O.a)(this,n),(i=e.call(this)).apolloClient=void 0,i.incTurn=void 0,i.dispatchAbility=function(t,e,n,a){i.apolloClient.mutate({variables:{applyingUnitID:i.createUnitID(t),unitAbilityName:e.ability.name,recivingUnitID:i.createUnitID(n),recivingUnitIDs:a.map((function(t){return i.createUnitID(t)}))},mutation:Object(h.gql)(r||(r=Object(j.a)(["\n        mutation ApplyAbility(\n          $applyingUnitID: [ID],\n          $unitAbilityName: String,\n          $recivingUnitID: [ID],\n          $recivingUnitIDs: [[ID]]\n        ) {\n          applyAbility(\n            applyingUnitID: $applyingUnitID,\n            unitAbilityName: $unitAbilityName,\n            recivingUnitID: $recivingUnitID,\n            recivingUnitIDs: $recivingUnitIDs\n          )\n        }\n      "])))}).then((function(t){return console.log(t)})).catch((function(t){return console.log(t)}))},i.setUpSubscription=function(){var t=Object(P.a)(i);i.apolloClient.subscribe({query:Object(h.gql)(a||(a=Object(j.a)(["\n        subscription onTurn {\n          sendTurn {\n            applyingUnitID\n            unitAbilityName\n            recivingUnitID\n            recivingUnitIDs\n          }\n        }\n        "]))),variables:{}}).subscribe({next:function(e){console.log("Subscription onTurn event new");var n=e.data.sendTurn;t.unitCountByPlayer(),t.callApplyAbility(n.applyingUnitID,n.unitAbilityName,n.recivingUnitID,n.recivingUnitIDs),t.incTurn(),t.unitCountByPlayer()}})},i.apolloClient=t,i.setUpSubscription(),i.incTurn=function(){console.log("incTurn() not Set")},i}return n}(n(65).GameService);console.log("New Game Loading");var T=new _(g),w=function(t){var e;Object(l.useEffect)((function(){new x(g).getUnits((function(t){return console.log(t)}))}),[]);var n=Object(l.useState)(null===(e=T.game)||void 0===e?void 0:e.units),i=Object(y.a)(n,2),r=i[0],a=i[1],c=Object(l.useState)(T.game.turn),s=Object(y.a)(c,2),u=s[0],f=s[1];T.incTurn=function(){console.log("IncTurn!"),f(u+1)},Object(l.useEffect)((function(){u!=T.game.turn&&console.error("There was a problem with the turn system"),a(T.game.units)}),[u]);var h=Object(l.useState)(null),p=Object(y.a)(h,2),m=p[0],d=(p[1],Object(l.useState)(null)),b=Object(y.a)(d,2),v=b[0],j=b[1];return Object(o.jsxs)("div",{className:"Main",children:[Object(o.jsx)("div",{className:"Timer",children:"Timer"}),Object(o.jsxs)("div",{className:"Turn",children:["Turn: ",u," - CurrentPlayer: ",u%2]}),Object(o.jsxs)("div",{className:"Battle",children:[r.filter((function(t){return t.player.name==T.game.players[0].name})).map((function(t){return Object(o.jsx)(A,{unit:t,turn:c,gameService:T,selectedAbilty:d,selectedUnit:h},t.id)})),Object(o.jsx)("div",{className:"Divider",children:"vs"}),r.filter((function(t){return t.player.name==T.game.players[1].name})).map((function(t){return Object(o.jsx)(A,{unit:t,turn:c,gameService:T,selectedAbilty:d,selectedUnit:h},t.id)}))]}),Object(o.jsx)("div",{className:"Controls",children:null===m||void 0===m?void 0:m.abilities.map((function(t){return Object(o.jsx)("div",{className:"Control"+(v===t?" selected":""),onClick:function(e){j(t)},children:Object(o.jsxs)("span",{children:[t.ability.name,": ",t.damage]})})}))})]})};var C=function(){return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)(f,{}),Object(o.jsx)(w,{})]})},N=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,98)).then((function(e){var n=e.getCLS,i=e.getFID,r=e.getFCP,a=e.getLCP,l=e.getTTFB;n(t),i(t),r(t),a(t),l(t)}))};u.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(C,{})}),document.getElementById("root")),N()}},[[97,1,2]]]);
//# sourceMappingURL=main.1316f448.chunk.js.map