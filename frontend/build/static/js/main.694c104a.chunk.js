(this.webpackJsonptao=this.webpackJsonptao||[]).push([[0],{101:function(e,n,t){},102:function(e,n,t){},103:function(e,n,t){"use strict";var i=this&&this.__spreadArrays||function(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var i=Array(e),r=0;for(n=0;n<t;n++)for(var a=arguments[n],s=0,c=a.length;s<c;s++,r++)i[r]=a[s];return i};Object.defineProperty(n,"__esModule",{value:!0}),n.Game=void 0;var r=t(104),a=function(e){var n=this;this.initializeGame=function(){return n.players.map((function(e){return e.units=n.initializeUnits(e)}))},this.initializeUnits=function(e){var t=e.unitModels.map((function(n,t){return new r.GameUnit(t,e,n)}));return n.units=i(n.units,t),t},this.insertUnits=function(e){for(var t in e)n.units=n.units.map((function(n){return e[t].id===n.id&&e[t].player.id===n.player.id?e[t]:n}))},this.filterDeadUnits=function(e){return e.filter((function(e){return 0!=e.life}))},this.applyAbility=function(e,t,i,r){if(e.currentTurnTimeout>0||e.life<1)return!1;switch(t.targets[0]){case"Clicked":var a=t.ability.apply(e,t,n.filterDeadUnits([i]));return n.insertUnits(a),n.changeTurn(),!0;case"All_by_Player":case"All_by_Enemy":return a=t.ability.apply(e,t,n.filterDeadUnits(r)),n.insertUnits(a),n.changeTurn(),!0;default:return n.changeTurn(),!0}},this.getUnitsByPlayer=function(e){return n.units.filter((function(n){return n.player===e}))},this.changeTurn=function(){var e;n.checkForWinner()?null===(e=n.gameService)||void 0===e||e.endGame(n.winner):(n.changeTurnTimeouts(),n.switchToNextPlayer(),n.turn++)},this.changeTurnTimeouts=function(){return n.getUnitsByPlayer(n.currentPlayer).map((function(e){return e.currentTurnTimeout>0?e.currentTurnTimeout--:e}))},this.switchToNextPlayer=function(){var e=n.players.length,t=n.players.indexOf(n.currentPlayer)+1,i=e===t?0:t;n.currentPlayer=n.players[i]},this.checkForWinner=function(){var e=[];for(var t in n.remaining_players)0===n.units.filter((function(e){return e.life>0&&e.player.id===n.remaining_players[t].id})).length&&e.push(n.remaining_players[t]);for(var t in e)n.remaining_players=n.remaining_players.filter((function(n){return n.name!=e[t].name}));return 1===n.remaining_players.length&&(n.winner=n.remaining_players[0],!0)},this.getWinner=function(){return n.winner},this.gameService=e.gameService,this.players=e.players,this.remaining_players=this.players,this.turn=e.turn||0,this.currentPlayer=e.currentPlayer||e.players[0],this.units=[],this.initializeGame()};n.Game=a},104:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.GameUnit=void 0;var i=function(e,n,t){this.id=e,this.player=n,console.log("Live unit"),this.name=t.name,this.life=t.maxlife,this.currentTurnTimeout=0,this.maxlife=t.maxlife,this.abilities=t.abilities};n.GameUnit=i},105:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Player=void 0;var i=t(106),r=function(e,n){this.name=e.username,this.id=n,this.userID=e.userID,this.unitModels=[i.Knight,i.Witch,i.Healer],this.units=[],this.alive=!0};n.Player=r},106:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Witch=n.Healer=n.Knight=n.GameUnit=void 0;var i=t(107),r=function(e){this.name=e.name,this.maxlife=e.maxlife,this.abilities=e.abilities};n.GameUnit=r,n.Knight={name:"Knight",maxlife:40,abilities:[{name:i.Attack.name,damage:12,turnTimeout:1,targets:["Clicked"],ability:i.Attack}]},n.Healer={name:"Healer",maxlife:20,abilities:[{name:i.Heal.name,damage:6,targets:["All_by_Player"],turnTimeout:3,ability:i.Heal}]},n.Witch={name:"Witch",maxlife:20,abilities:[{name:i.Burn.name,damage:10,turnTimeout:4,targets:["All_by_Enemy"],ability:i.Burn}]}},107:function(e,n,t){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var n,t=1,i=arguments.length;t<i;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e}).apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0}),n.Burn=n.Heal=n.Attack=void 0,n.Attack={name:"Attack",targets:["Enemy"],apply:function(e,n,t){return e.currentTurnTimeout=n.turnTimeout,t.map((function(e){return i(i({},e),{life:Math.min(e.maxlife,e.life-n.damage)})}))}},n.Heal={name:"Heal",targets:["Ally"],apply:function(e,n,t){return console.log("unitAbility.turnTimeout"),console.log(n.turnTimeout),e.currentTurnTimeout=n.turnTimeout,console.log("applyingUnit.currentTurnTimeout"),console.log(e.currentTurnTimeout),t.map((function(e){return i(i({},e),{life:Math.min(e.maxlife,e.life+n.damage)})}))}},n.Burn={name:"Burn",targets:["Enemy"],apply:function(e,n,t){return e.currentTurnTimeout=n.turnTimeout,t.map((function(e){return i(i({},e),{life:Math.min(e.maxlife,e.life-n.damage)})}))}}},108:function(e,n,t){},109:function(e,n,t){"use strict";t.r(n);var i,r=t(4),a=t.n(r),s=t(67),c=t.n(s),u=(t(81),t(10)),o=(t(82),t(83),t(40)),l=t(51),m=(t(84),t(27)),g=t.n(m),h=t(21),d=t(45),f=t(26),b=t(29),p=t(12),j=t(68),v=t(71),y=new p.HttpLink({uri:"http://localhost:4444/graphql"}),O=new j.a({uri:"ws://localhost:4444/graphql",options:{reconnect:!0}}),I=Object(p.split)((function(e){var n=e.query,t=Object(v.a)(n);return"OperationDefinition"===t.kind&&"subscription"===t.operation}),O,y),D=new p.ApolloClient({link:I,uri:"http://localhost:4444/graphql",cache:new p.InMemoryCache});!function(e){e.SESSIONID="SESSIONID"}(i||(i={}));var x,S,G,w=function(e,n,t){var i=new Date;i.setTime(i.getTime()+24*t*60*60*1e3);var r="expires="+i.toUTCString();document.cookie=e+"="+n+";"+r+";path=/"},T=function(e){for(var n=e+"=",t=decodeURIComponent(document.cookie).split(";"),i=0;i<t.length;i++){for(var r=t[i];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(n))return r.substring(n.length,r.length)}return""},U=function(){function e(){Object(f.a)(this,e),this.userID=void 0,this.sessionID=void 0,this.sessionID=T(i.SESSIONID)}return Object(b.a)(e,[{key:"checkAuth",value:function(){var e=Object(d.a)(g.a.mark((function e(){var n=this;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.mutate({variables:{sessionID:this.sessionID},mutation:Object(p.gql)(x||(x=Object(h.a)(["\n        mutation CheckAuth(\n          $sessionID: String\n        ) {\n          checkAuth(\n            sessionID: $sessionID\n          ) {\n            userID\n            message\n          }\n        }\n      "])))}).then((function(e){return n.userID=e.data.checkAuth.userID,e.data})).catch((function(e){var n;return console.log("checkAuth Error"),console.log(e),console.log(null===(n=e.data)||void 0===n?void 0:n.login),e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"login",value:function(){var e=Object(d.a)(g.a.mark((function e(n){var t=this;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.mutate({variables:{username:n.username,password:n.password},mutation:Object(p.gql)(S||(S=Object(h.a)(["\n        mutation Login(\n          $username: String\n          $password: String\n        ) {\n          login(\n            username: $username\n            password: $password\n          ) {\n            userID\n            sessionID\n            message\n          }\n        }\n      "])))}).then((function(e){return t.userID=e.data.login.userID,t.sessionID=e.data.login.sessionID,e.data})).catch((function(e){return console.log("Login Error"),console.log(e),console.log(e.data.login),e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},{key:"register",value:function(){var e=Object(d.a)(g.a.mark((function e(n){var t=this;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",D.mutate({variables:{username:n.username,password:n.password,confirmPassword:n.confirmPassword},mutation:Object(p.gql)(G||(G=Object(h.a)(["\n        mutation Register(\n          $username: String\n          $password: String\n          $confirmPassword: String\n        ) {\n          register(\n            username: $username\n            password: $password\n            confirmPassword: $confirmPassword\n          ) {\n            userID\n            sessionID\n            message\n          }\n        }\n      "])))}).then((function(e){return t.userID=e.data.register.userID,t.sessionID=e.data.register.sessionID,e.data})).catch((function(e){return console.log("Register Error"),console.log(e),console.log(e.data.login),e.data})));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}],[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}();U.instance=void 0;var A=t(2),k=function(e){var n=U.getInstance(),t=Object(r.useState)(!1),a=Object(u.a)(t,2),s=a[0],c=a[1],m=Object(r.useState)({userID:null,sessionID:null,message:""}),g=Object(u.a)(m,2),h=g[0],d=g[1];Object(r.useEffect)((function(){var e=n.userID,t=n.sessionID;n.checkAuth().then((function(n){n.checkAuth.userID&&d({userID:e,sessionID:t,message:n.checkAuth.message})})).catch((function(e){console.log("checkAuth Error"),console.log(e.login)}))}),[]);var f=Object(r.useState)({username:"",password:"",confirmPassword:""}),b=Object(u.a)(f,2),p=b[0],j=b[1],v=p.username,y=p.password,O=p.confirmPassword,I=function(e){j(Object(l.a)(Object(l.a)({},p),{},Object(o.a)({},e.target.name,e.target.value)))};return Object(A.jsx)("div",{className:"auth",children:Object(A.jsxs)("div",{className:"user",children:[!h.sessionID&&Object(A.jsxs)("div",{children:[Object(A.jsxs)("div",{className:"authlinks",children:[Object(A.jsx)("span",{className:"authlink",onClick:function(e){return c(!1)},children:"Login"}),Object(A.jsx)("span",{children:" / "}),Object(A.jsx)("span",{className:"authlink",onClick:function(e){return c(!0)},children:"Register"})]}),Object(A.jsxs)("form",{onSubmit:function(e){e.preventDefault(),s?n.register(p).then((function(e){d(e.register)})).catch((function(e){console.log("registerResult Error"),console.log(e.register)})):n.login(p).then((function(e){w(i.SESSIONID,e.login.sessionID,1),d(e.login)})).catch((function(e){console.log("loginResult Error"),console.log(e.login)}))},children:[Object(A.jsx)("label",{children:"Username"}),Object(A.jsx)("input",{name:"username",type:"text",value:v,onChange:I}),Object(A.jsx)("label",{children:"Password"}),Object(A.jsx)("input",{type:"password",name:"password",value:y,onChange:I}),s&&Object(A.jsxs)("div",{children:[Object(A.jsx)("label",{children:"Confirm Password"}),Object(A.jsx)("input",{type:"password",name:"confirmPassword",value:O,onChange:I})]}),Object(A.jsx)("button",{type:"submit",children:"Submit"})]})]}),Object(A.jsx)("div",{className:h.sessionID?"loginMessage success":"loginMessage failure",children:h.message})]})})},N="gameList",P="game",_=function(e){var n=Object(u.a)(e.routeState,2),t=n[0],i=n[1];return Object(A.jsxs)("div",{className:"menu",children:[Object(A.jsx)(k,{}),Object(A.jsxs)("ul",{className:"menulist",children:[Object(A.jsxs)("li",{onClick:function(e){return i(N)},children:["GameList",t===N&&Object(A.jsx)("span",{children:" <-"})]}),Object(A.jsxs)("li",{onClick:function(e){return i(P)},children:["Game",t===P&&Object(A.jsx)("span",{children:" <-"})]})]})]})},L=(t(101),t(102),function(e){var n=e.gameService,t=e.unit,i=Object(u.a)(e.selectedUnit,2),r=i[0],a=i[1],s=Object(u.a)(e.selectedAbilty,2),c=s[0],o=s[1],l=function(){console.log("executeAbility"),n.dispatchAbility(r,c,t,n.game.units.filter((function(e){return e.player.name===t.player.name}))),a(null),o(null)};return Object(A.jsxs)("div",{className:"Unit"+(r===t?" selectedUnit":""),onClick:function(e){n.game.turn%2+1===t.player.id&&U.getInstance().userID===t.player.userID?c&&"Ally"===c.ability.targets[0]?l():null===r||t.player.id===r.player.id?(a(r!==t&&t.life>0?t:null),o(null)):console.log("no ability selected"):r?c&&"Enemy"===c.ability.targets[0]?l():console.log("Can't apply to enemy"):console.log("It's not your unit")},children:[Object(A.jsx)("h4",{children:t.name}),Object(A.jsx)("h6",{children:t.life>0?"Alive":"Dead"}),Object(A.jsx)("h6",{children:t.player.name}),Object(A.jsxs)("div",{children:["Life: ",Object(A.jsx)("span",{children:t.life>0?t.life:0})]}),t.currentTurnTimeout>0&&Object(A.jsxs)("div",{children:["Wait",Object(A.jsx)("span",{children:t.currentTurnTimeout}),"Turns"]})]})}),$=function(){function e(){var n=this;Object(f.a)(this,e),this.displayedGameService=void 0,this.setDisplayedGameService=function(e){return n.displayedGameService=e},this.getDisplayedGameService=function(){return n.displayedGameService}}return Object(b.a)(e,null,[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}();$.instance=void 0;var E,C,q,M,B,H,R=function(e){var n=$.getInstance().getDisplayedGameService(),t=e.setRoute,i=Object(r.useState)(0),a=Object(u.a)(i,2),s=a[0],c=a[1];n.rerenderView=function(){return c(s+1)},Object(r.useEffect)((function(){}),[s]);var o=Object(r.useState)(null),l=Object(u.a)(o,2),m=l[0],g=(l[1],Object(r.useState)(null)),h=Object(u.a)(g,2),d=h[0],f=h[1];return Object(A.jsxs)("div",{className:"Game",children:[Object(A.jsx)("div",{className:"Timer",children:"Timer: Todo"}),Object(A.jsxs)("div",{className:"Turn",children:[n.game.winner&&Object(A.jsxs)("div",{children:[Object(A.jsxs)("span",{children:["The Game as Ended - The Winner is ",n.game.winner.name]}),Object(A.jsx)("button",{onClick:function(e){return t(N)},children:"Leave Game"})]}),Object(A.jsxs)("span",{children:["Turn: ",n.game.turn]}),!n.game.winner&&Object(A.jsxs)("span",{children:[" - CurrentPlayer: ",n.game.turn%2+1," ",n.game.currentPlayer.name]})]}),Object(A.jsxs)("div",{className:"Battle",children:[n.game.units.filter((function(e){return e.player.name==n.game.players[0].name})).map((function(e){return Object(A.jsx)(L,{unit:e,gameService:n,selectedAbilty:g,selectedUnit:o},e.id)})),Object(A.jsx)("div",{className:"Divider",children:"vs"}),n.game.units.filter((function(e){return e.player.name==n.game.players[1].name})).map((function(e){return Object(A.jsx)(L,{unit:e,gameService:n,selectedAbilty:g,selectedUnit:o},e.id)}))]}),Object(A.jsx)("div",{className:"Controls",children:null===m||void 0===m?void 0:m.abilities.map((function(e){return Object(A.jsxs)("div",{className:"Control"+(d===e?" selected":""),onClick:function(n){f(e)},children:[Object(A.jsxs)("span",{children:[e.ability.name,": ",e.damage]}),e.turnTimeout>1&&Object(A.jsxs)("span",{children:["Timeout: ",e.turnTimeout-1]})]})}))})]})},W=t(75),F=t(44),V=t(76),z=t(74),J=function(e){Object(V.a)(t,e);var n=Object(z.a)(t);function t(e){var i;return Object(f.a)(this,t),(i=n.call(this,e)).rerenderView=void 0,i.dispatchAbility=function(e,n,t,r){console.log("this.gameID"),console.log(i.gameID),D.mutate({variables:{gameID:i.gameID,userID:U.getInstance().userID,applyingUnitID:i.createUnitID(e),unitAbilityName:n.ability.name,recivingUnitID:i.createUnitID(t),recivingUnitIDs:r.map((function(e){return i.createUnitID(e)}))},mutation:Object(p.gql)(E||(E=Object(h.a)(["\n        mutation ApplyAbility(\n          $gameID: ID,\n          $userID: ID,\n          $applyingUnitID: [ID],\n          $unitAbilityName: String,\n          $recivingUnitID: [ID],\n          $recivingUnitIDs: [[ID]]\n        ) {\n          applyAbility(\n            gameID: $gameID,\n            userID: $userID,\n            applyingUnitID: $applyingUnitID,\n            unitAbilityName: $unitAbilityName,\n            recivingUnitID: $recivingUnitID,\n            recivingUnitIDs: $recivingUnitIDs\n          )\n        }\n      "])))}).catch((function(e){return console.log(e)}))},i.setUpSubscription=function(){var e=Object(F.a)(i);console.log("clientgameService - setUpSubscription"),console.log(i.gameID),D.subscribe({variables:{gameID:i.gameID},query:Object(p.gql)(C||(C=Object(h.a)(["\n        subscription sendTurn ($gameID: ID) {\n          sendTurn (gameID: $gameID) {\n            applyingUnitID\n            unitAbilityName\n            recivingUnitID\n            recivingUnitIDs\n          }\n        }\n        "])))}).subscribe({next:function(n){var t=n.data.sendTurn;console.log("clientgameService"),console.log(t),e.callApplyAbility(t.applyingUnitID,t.unitAbilityName,t.recivingUnitID,t.recivingUnitIDs),e.rerenderView()}})},i.setUpSubscription(),i.rerenderView=function(){console.log("rerenderView() not Set")},i}return t}(t(72).GameService),K=function(){function e(){var n=this;Object(f.a)(this,e),this.activeGames=void 0,this.subscription=void 0,this.setGameList=void 0,this.getGameList=function(e,t){n.setGameList=e,n.subscription||(n.getGameListQuery(),console.log("getGameList - gameListSubscription"),n.subscription=n.gameListSubscription(t))},this.getGameListQuery=function(){return D.query({query:Object(p.gql)(q||(q=Object(h.a)(["{\n        getGameList {\n          gameID\n          gameName\n          gameState\n          players {\n            userID\n            username\n          }\n        }\n      }"])))}).then((function(e){var t=e.data.getGameList;n.activeGames=t,n.setGameList(t)})).catch((function(e){console.log("getGameList - Error: "),console.log(e)}))},this.openGame=function(){return D.mutate({variables:{userID:U.getInstance().userID},mutation:Object(p.gql)(M||(M=Object(h.a)(["\n        mutation OpenGame(\n          $userID: ID\n        ){\n          openGame(\n            userID: $userID\n          )\n        }\n      "])))}).then((function(e){return e})).catch((function(e){console.log("openGame - Error:"),console.log(e)}))},this.joinGame=function(e){return D.mutate({variables:{userID:U.getInstance().userID,gameID:e.gameID},mutation:Object(p.gql)(B||(B=Object(h.a)(["\n        mutation JoinGame(\n          $userID: ID\n          $gameID: ID\n        ){\n          joinGame(\n            userID: $userID\n            gameID: $gameID\n          )\n        }\n      "])))}).then((function(e){return e})).catch((function(e){console.log("joinGame - Error:"),console.log(e)}))},this.gameListSubscription=function(e){var t=n;return D.subscribe({variables:{userID:U.getInstance().userID},query:Object(p.gql)(H||(H=Object(h.a)(["\n        subscription onNewGame {\n          updateGameList {\n            startNewGame\n            gameName\n            gameID\n            gameState\n            players {\n              userID\n              username\n            }\n          }\n        }"])))}).subscribe({next:function(n){console.log("gameListSubscription");var i=n.data.updateGameList;console.log(i),t.updateGameList(i),i.startNewGame&&2===i.players.length&&0!=i.players.filter((function(e){return e.userID===U.getInstance().userID})).length&&t.startGame(i,e)}})},this.updateGameList=function(e){var t=n.activeGames.filter((function(n){return n.gameID!=e.gameID})),i=[].concat(Object(W.a)(t),[{gameID:e.gameID,gameName:e.gameName,gameState:e.gameState,players:e.players}]);n.activeGames=i,n.setGameList(i)},this.startGame=function(e,n){var t=new J({gameID:e.gameID,players:e.players});$.getInstance().setDisplayedGameService(t),n(P)};this.activeGames=[{gameName:"Demogame",gameID:"DemoID - 1",gameState:"Open",players:[{userID:"Test",username:"Testuser"}]}]}return Object(b.a)(e,null,[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}();K.instance=void 0;t(108);var Q=t(73),X=function(e){var n=K.getInstance(),t=Object(r.useState)(n.activeGames),i=Object(u.a)(t,2),a=(i[0],i[1]);return Object(r.useEffect)((function(){n.getGameList(a,e.setRoute)}),[]),Object(A.jsxs)("div",{className:"gameListComponent",children:[Object(A.jsx)("h1",{children:"Gamelist"}),Object(A.jsx)("div",{className:"openGame",children:Object(A.jsx)("button",{onClick:function(e){return n.openGame()},children:"Open New Game"})}),Object(A.jsxs)("table",{className:"gameList",children:[Object(A.jsxs)("tr",{children:[Object(A.jsx)("th",{children:"Game Status"}),Object(A.jsx)("th",{children:"Game Name"}),Object(A.jsx)("th",{children:"No of Players"}),Object(A.jsx)("th",{children:"Players"})]}),n.activeGames.map((function(e){return Object(A.jsxs)("tr",{children:[Object(A.jsx)("td",{children:e.gameState===Q.GameStateEnum.OPEN&&Object(A.jsx)("button",{onClick:function(t){return n.joinGame(e)},children:"Join"})||e.gameState}),Object(A.jsx)("td",{children:e.gameName}),Object(A.jsx)("td",{children:e.players.length}),Object(A.jsx)("td",{children:e.players.map((function(n,t){return n.username+(e.players.length-1===t?"":", ")}))})]})}))]})]})};var Y=function(){var e=Object(r.useState)(N),n=Object(u.a)(e,2),t=n[0],i=n[1];return Object(A.jsxs)("div",{className:"App",children:[Object(A.jsx)(_,{routeState:e}),t===N&&Object(A.jsx)(X,{setRoute:i}),t===P&&Object(A.jsx)(R,{setRoute:i})]})},Z=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,110)).then((function(n){var t=n.getCLS,i=n.getFID,r=n.getFCP,a=n.getLCP,s=n.getTTFB;t(e),i(e),r(e),a(e),s(e)}))};c.a.render(Object(A.jsx)(a.a.StrictMode,{children:Object(A.jsx)(Y,{})}),document.getElementById("root")),Z()},72:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.GameService=void 0;var i=t(103),r=t(105),a=function(e){var n=this;this.initPlayers=function(e){var t;null===(t=null===e||void 0===e?void 0:e.players)||void 0===t||t.map((function(e,t){return n.players[t]=new r.Player(e,t+1)}))},this.checkCurrentPlayerByID=function(e){return e===n.game.currentPlayer.userID},this.dispatchAbility=function(e,n,t,i){},this.callApplyAbility=function(e,t,i,r){var a=n.getUnitbyUnitID(e),s=a.abilities.filter((function(e){return e.name===t}))[0],c=n.getUnitbyUnitID(i),u=r.map((function(e){return n.getUnitbyUnitID(e)}));return a.life>0&&a.currentTurnTimeout<1&&n.game.applyAbility(a,s,c,u)},this.createUnitID=function(e){return[e.player.id,e.id]},this.getUnitbyUnitID=function(e){return n.game.units.filter((function(n){return n.player.id==e[0]&&n.id==e[1]}))[0]},this.endGame=function(e){var t;return null===(t=n.gameServiceObserver)||void 0===t?void 0:t.endGame(e)},this.players=[],this.initPlayers(e),this.gameServiceObserver=e.gameServiceObserver,this.gameID=(null===e||void 0===e?void 0:e.gameID)||"0",this.game=new i.Game({gameService:this,players:this.players})};n.GameService=a},73:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.GameStateEnum=void 0,function(e){e.OPEN="Open",e.STARTED="Started",e.FINISHED="Finished"}(n.GameStateEnum||(n.GameStateEnum={}))},81:function(e,n,t){},82:function(e,n,t){},83:function(e,n,t){},84:function(e,n,t){}},[[109,1,2]]]);
//# sourceMappingURL=main.694c104a.chunk.js.map