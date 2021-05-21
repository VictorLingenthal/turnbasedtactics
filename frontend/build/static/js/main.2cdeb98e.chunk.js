(this.webpackJsonptao=this.webpackJsonptao||[]).push([[0],{102:function(e,n,t){},103:function(e,n,t){},104:function(e,n,t){"use strict";var i=this&&this.__spreadArrays||function(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var i=Array(e),r=0;for(n=0;n<t;n++)for(var a=arguments[n],s=0,c=a.length;s<c;s++,r++)i[r]=a[s];return i};Object.defineProperty(n,"__esModule",{value:!0}),n.Game=void 0;var r=t(105),a=function(e){var n=this;this.initializeGame=function(){return n.players.map((function(e){return e.units=n.initializeUnits(e)}))},this.initializeUnits=function(e){var t,a=null===(t=e.unitModels)||void 0===t?void 0:t.map((function(n,t){return new r.GameUnit(t,e,n)}));return a?(n.units=i(n.units,a),a):n.units},this.insertUnits=function(e){for(var t in e)n.units=n.units.map((function(n){return e[t].id===n.id&&e[t].player.id===n.player.id?e[t]:n}))},this.filterDeadUnits=function(e){return e.filter((function(e){return 0!=e.life}))},this.applyAbility=function(e,t,i,r){if(e.currentTurnTimeout>0||e.life<1)return!1;switch(t.targets[0]){case"Clicked":var a=t.ability.apply(e,t,n.filterDeadUnits([i]));return n.insertUnits(a),n.changeTurn(),!0;case"All_by_Player":case"All_by_Enemy":return a=t.ability.apply(e,t,n.filterDeadUnits(r)),n.insertUnits(a),n.changeTurn(),!0;default:return n.changeTurn(),!0}},this.getUnitsByPlayer=function(e){return n.units.filter((function(n){return n.player===e}))},this.changeTurn=function(){var e;n.checkForWinner()?n.winner&&(null===(e=n.gameService)||void 0===e||e.endGame(n.winner)):(n.changeTurnTimeouts(),n.switchToNextPlayer(),n.turn++)},this.changeTurnTimeouts=function(){return n.getUnitsByPlayer(n.currentPlayer).map((function(e){return e.currentTurnTimeout>0?e.currentTurnTimeout--:e}))},this.switchToNextPlayer=function(){var e=n.players.length,t=n.players.indexOf(n.currentPlayer)+1,i=e===t?0:t;n.currentPlayer=n.players[i]},this.checkForWinner=function(){var e=[];for(var t in n.remaining_players)0===n.units.filter((function(e){return e.life>0&&e.player.id===n.remaining_players[t].id})).length&&e.push(n.remaining_players[t]);for(var t in e)n.remaining_players=n.remaining_players.filter((function(n){return n.name!=e[t].name}));return 1===n.remaining_players.length&&(n.winner=n.remaining_players[0],!0)},this.getWinner=function(){return n.winner},this.gameService=e.gameService,this.players=e.players,this.remaining_players=this.players,this.turn=e.turn||0,this.currentPlayer=e.currentPlayer||e.players[0],this.units=[],this.winner=null,this.initializeGame()};n.Game=a},105:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.GameUnit=void 0;var i=function(e,n,t){this.id=e,this.player=n,this.name=t.name,this.life=t.maxlife,this.currentTurnTimeout=0,this.maxlife=t.maxlife,this.abilities=t.abilities};n.GameUnit=i},106:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Player=void 0;var i=t(107),r=function(e,n){this.name=e.username,this.id=n,this.userID=e.userID,this.unitModels=[i.Knight,i.Witch,i.Healer],this.units=[],this.alive=!0};n.Player=r},107:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Witch=n.Healer=n.Knight=n.GameUnit=void 0;var i=t(108),r=function(e){this.name=e.name,this.maxlife=e.maxlife,this.abilities=e.abilities};n.GameUnit=r,n.Knight={name:"Knight",maxlife:40,abilities:[{name:i.Attack.name,damage:12,turnTimeout:1,targets:["Clicked"],ability:i.Attack}]},n.Healer={name:"Healer",maxlife:20,abilities:[{name:i.Heal.name,damage:-6,targets:["All_by_Player"],turnTimeout:3,ability:i.Heal}]},n.Witch={name:"Witch",maxlife:20,abilities:[{name:i.Burn.name,damage:10,turnTimeout:4,targets:["All_by_Enemy"],ability:i.Burn}]}},108:function(e,n,t){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var n,t=1,i=arguments.length;t<i;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e}).apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0}),n.Burn=n.Heal=n.Attack=void 0;var r=t(45),a=function(e,n,t){return e.currentTurnTimeout=n.turnTimeout,t.map((function(e){return i(i({},e),{life:Math.min(e.maxlife,e.life-n.damage)})}))};n.Attack={name:"Attack",targets:[r.AbilityTargetsEnum.ENEMY],apply:a},n.Heal={name:"Heal",targets:[r.AbilityTargetsEnum.ALLY],apply:a},n.Burn={name:"Burn",targets:[r.AbilityTargetsEnum.ENEMY],apply:a}},109:function(e,n,t){},110:function(e,n,t){"use strict";t.r(n);var i,r=t(4),a=t.n(r),s=t(68),c=t.n(s),u=(t(82),t(10)),o=(t(83),t(84),t(41)),l=t(34),m=(t(85),t(27)),g=t.n(m),d=t(21),h=t(47),b=t(26),f=t(29),p=t(12),j=t(69),v=t(72),y=new p.HttpLink({uri:"http://"+document.location.host+"/graphql"}),O=new j.a({uri:"https:"===document.location.protocol?"wss":"ws://"+document.location.host+"/graphql",options:{reconnect:!0}}),I=Object(p.split)((function(e){var n=e.query,t=Object(v.a)(n);return"OperationDefinition"===t.kind&&"subscription"===t.operation}),O,y),D=new p.ApolloClient({link:I,uri:"http://"+document.location.host+"/graphql",cache:new p.InMemoryCache});!function(e){e.SESSIONID="SESSIONID"}(i||(i={}));var x,S,G,w=function(e,n,t){var i=new Date;i.setTime(i.getTime()+24*t*60*60*1e3);var r="expires="+i.toUTCString();document.cookie=e+"="+n+";"+r+";path=/"},T=function(e){for(var n=e+"=",t=decodeURIComponent(document.cookie).split(";"),i=0;i<t.length;i++){for(var r=t[i];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(n))return r.substring(n.length,r.length)}return""},A=function(){function e(){Object(b.a)(this,e),this.userID=void 0,this.sessionID=void 0,this.sessionID=T(i.SESSIONID)}return Object(f.a)(e,[{key:"checkAuth",value:function(){var e=Object(h.a)(g.a.mark((function e(){var n=this;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.mutate({variables:{sessionID:this.sessionID},mutation:Object(p.gql)(x||(x=Object(d.a)(["\n        mutation CheckAuth(\n          $sessionID: String\n        ) {\n          checkAuth(\n            sessionID: $sessionID\n          ) {\n            userID\n            message\n          }\n        }\n      "])))}).then((function(e){return n.userID=e.data.checkAuth.userID,e.data})).catch((function(e){var n;return console.log("checkAuth Error"),console.log(e),console.log(null===(n=e.data)||void 0===n?void 0:n.login),e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"login",value:function(){var e=Object(h.a)(g.a.mark((function e(n){var t=this;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.mutate({variables:{username:n.username,password:n.password},mutation:Object(p.gql)(S||(S=Object(d.a)(["\n        mutation Login(\n          $username: String\n          $password: String\n        ) {\n          login(\n            username: $username\n            password: $password\n          ) {\n            userID\n            sessionID\n            message\n          }\n        }\n      "])))}).then((function(e){return t.userID=e.data.login.userID,t.sessionID=e.data.login.sessionID,e.data})).catch((function(e){return console.log("Login Error"),console.log(e),console.log(e.data.login),e.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},{key:"register",value:function(){var e=Object(h.a)(g.a.mark((function e(n){var t=this;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",D.mutate({variables:{username:n.username,password:n.password,confirmPassword:n.confirmPassword},mutation:Object(p.gql)(G||(G=Object(d.a)(["\n        mutation Register(\n          $username: String\n          $password: String\n          $confirmPassword: String\n        ) {\n          register(\n            username: $username\n            password: $password\n            confirmPassword: $confirmPassword\n          ) {\n            userID\n            sessionID\n            message\n          }\n        }\n      "])))}).then((function(e){return t.userID=e.data.register.userID,t.sessionID=e.data.register.sessionID,e.data})).catch((function(e){return console.log("Register Error"),console.log(e),console.log(e.data.login),e.data})));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}],[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}();A.instance=void 0;var U=t(2),N=function(e){var n=A.getInstance(),t=Object(r.useState)(!1),a=Object(u.a)(t,2),s=a[0],c=a[1],m=Object(r.useState)(!1),g=Object(u.a)(m,2),d=g[0],h=g[1],b=Object(r.useState)({userID:null,sessionID:null,message:""}),f=Object(u.a)(b,2),p=f[0],j=f[1];Object(r.useEffect)((function(){var e=n.userID,t=n.sessionID;n.checkAuth().then((function(n){n.checkAuth.userID&&j({userID:e,sessionID:t,message:n.checkAuth.message})})).catch((function(e){console.log("checkAuth Error"),console.log(e.login)}))}),[]);var v=Object(r.useState)({username:"",password:"",confirmPassword:""}),y=Object(u.a)(v,2),O=y[0],I=y[1],D=O.username,x=O.password,S=O.confirmPassword,G=function(e){I(Object(l.a)(Object(l.a)({},O),{},Object(o.a)({},e.target.name,e.target.value)))};return Object(U.jsx)("div",{className:"auth",children:Object(U.jsxs)("div",{className:"user",children:[!p.sessionID&&Object(U.jsxs)("div",{children:[Object(U.jsxs)("div",{className:"authlinks",children:[Object(U.jsx)("span",{className:"authlink",onClick:function(e){return h(!1)},children:"Login"}),Object(U.jsx)("span",{children:" / "}),Object(U.jsx)("span",{className:"authlink",onClick:function(e){return h(!0)},children:"Register"})]}),Object(U.jsxs)("form",{onSubmit:function(e){e.preventDefault(),s?j(Object(l.a)(Object(l.a)({},p),{},{message:"Waiting for Server"})):(c(!0),d?n.register(O).then((function(e){c(!1),w(i.SESSIONID,e.register.sessionID,1),j(e.register)})).catch((function(e){c(!1),console.log("registerResult Error"),console.log(e.register)})):n.login(O).then((function(e){c(!1),w(i.SESSIONID,e.login.sessionID,1),j(e.login)})).catch((function(e){c(!1),console.log("loginResult Error"),console.log(e.login)})))},children:[Object(U.jsx)("label",{children:"Username"}),Object(U.jsx)("input",{name:"username",type:"text",value:D,onChange:G}),Object(U.jsx)("label",{children:"Password"}),Object(U.jsx)("input",{type:"password",name:"password",value:x,onChange:G}),d&&Object(U.jsxs)("div",{children:[Object(U.jsx)("label",{children:"Confirm Password"}),Object(U.jsx)("input",{type:"password",name:"confirmPassword",value:S,onChange:G})]}),Object(U.jsx)("button",{type:"submit",children:"Submit"})]})]}),Object(U.jsx)("div",{className:p.sessionID?"loginMessage success":"loginMessage failure",children:p.message})]})})},k="gameList",E="game",P=function(e){var n=Object(u.a)(e.routeState,2),t=n[0],i=n[1];return Object(U.jsxs)("div",{className:"menu",children:[Object(U.jsx)(N,{}),Object(U.jsxs)("ul",{className:"menulist",children:[Object(U.jsxs)("li",{onClick:function(e){return i(k)},children:["GameList",t===k&&Object(U.jsx)("span",{children:" <-"})]}),Object(U.jsxs)("li",{onClick:function(e){return i(E)},children:["Game",t===E&&Object(U.jsx)("span",{children:" <-"})]})]})]})},L=(t(102),t(45)),_=(t(103),function(e){var n=e.gameService,t=e.unit,i=Object(u.a)(e.selectedUnit,2),r=i[0],a=i[1],s=Object(u.a)(e.selectedAbilty,2),c=s[0],o=s[1],l=function(){console.log("executeAbility"),n.dispatchAbility(r,c,t,n.game.units.filter((function(e){return e.player.name===t.player.name}))),a(null),o(null)};return Object(U.jsxs)("div",{className:"Unit"+(r===t?" selectedUnit":""),onClick:function(e){n.game.turn%2+1===t.player.id&&A.getInstance().userID===t.player.userID?c&&c.ability.targets[0]===L.AbilityTargetsEnum.ALLY?l():null===r||t.player.id===r.player.id?t.currentTurnTimeout>0?console.log("This Unit is waiting"):(a(r!==t&&t.life>0?t:null),o(null)):console.log("no ability selected"):r?c&&c.ability.targets[0]===L.AbilityTargetsEnum.ENEMY?l():console.log("Can't apply to enemy"):console.log("It's not your unit")},children:[Object(U.jsx)("h4",{children:t.name}),Object(U.jsx)("h6",{children:t.life>0?"Alive":"Dead"}),Object(U.jsx)("h6",{children:t.player.name}),Object(U.jsxs)("div",{children:["Life: ",Object(U.jsx)("span",{children:t.life>0?t.life:0})]}),t.currentTurnTimeout>0&&Object(U.jsxs)("div",{children:["Wait",Object(U.jsx)("span",{children:t.currentTurnTimeout}),"Turns"]})]})}),$=function(){function e(){var n=this;Object(b.a)(this,e),this.displayedGameService=void 0,this.setDisplayedGameService=function(e){return n.displayedGameService=e},this.getDisplayedGameService=function(){return n.displayedGameService}}return Object(f.a)(e,null,[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}();$.instance=void 0;var C,M,q,B,H,R,W=function(e){var n=$.getInstance().getDisplayedGameService(),t=e.setRoute,i=Object(r.useState)(0),a=Object(u.a)(i,2),s=a[0],c=a[1];n.rerenderView=function(){return c(s+1)},Object(r.useEffect)((function(){}),[s]);var o=Object(r.useState)(null),l=Object(u.a)(o,2),m=l[0],g=(l[1],Object(r.useState)(null)),d=Object(u.a)(g,2),h=d[0],b=d[1];return Object(U.jsxs)("div",{className:"Game",children:[Object(U.jsx)("div",{className:"Timer",children:"Timer: Todo"}),Object(U.jsxs)("div",{className:"Turn",children:[n.game.winner&&Object(U.jsxs)("div",{children:[Object(U.jsxs)("span",{children:["The Game as Ended - The Winner is ",n.game.winner.name]}),Object(U.jsx)("button",{onClick:function(e){return t(k)},children:"Leave Game"})]}),Object(U.jsxs)("span",{children:["Turn: ",n.game.turn]}),!n.game.winner&&Object(U.jsxs)("span",{children:[" - CurrentPlayer: ",n.game.turn%2+1," ",n.game.currentPlayer.name]})]}),Object(U.jsxs)("div",{className:"Battle",children:[n.game.units.filter((function(e){return e.player.name==n.game.players[0].name})).reverse().map((function(e){return Object(U.jsx)(_,{unit:e,gameService:n,selectedAbilty:g,selectedUnit:o},e.id)})),Object(U.jsx)("div",{className:"Divider",children:"vs"}),n.game.units.filter((function(e){return e.player.name==n.game.players[1].name})).map((function(e){return Object(U.jsx)(_,{unit:e,gameService:n,selectedAbilty:g,selectedUnit:o},e.id)}))]}),Object(U.jsx)("div",{className:"Controls",children:null===m||void 0===m?void 0:m.abilities.map((function(e){return Object(U.jsxs)("div",{className:"Control"+(h===e?" selected":""),onClick:function(n){b(e)},children:[Object(U.jsxs)("span",{children:[e.ability.name,": ",e.damage]}),e.turnTimeout>1&&Object(U.jsxs)("span",{children:["Timeout: ",e.turnTimeout-1]})]})}))})]})},F=t(76),Y=t(46),V=t(77),z=t(75),J=function(e){Object(V.a)(t,e);var n=Object(z.a)(t);function t(e){var i;return Object(b.a)(this,t),(i=n.call(this,e)).rerenderView=void 0,i.dispatchAbility=function(e,n,t,r){D.mutate({variables:{gameID:i.gameID,userID:A.getInstance().userID,applyingUnitID:i.createUnitID(e),unitAbilityName:n.ability.name,receivingUnitID:i.createUnitID(t),receivingUnitIDs:r.map((function(e){return i.createUnitID(e)}))},mutation:Object(p.gql)(C||(C=Object(d.a)(["\n        mutation ApplyAbility(\n          $gameID: ID,\n          $userID: ID,\n          $applyingUnitID: [ID],\n          $unitAbilityName: String,\n          $receivingUnitID: [ID],\n          $receivingUnitIDs: [[ID]]\n        ) {\n          applyAbility(\n            gameID: $gameID,\n            userID: $userID,\n            applyingUnitID: $applyingUnitID,\n            unitAbilityName: $unitAbilityName,\n            receivingUnitID: $receivingUnitID,\n            receivingUnitIDs: $receivingUnitIDs\n          )\n        }\n      "])))}).catch((function(e){return console.log(e)}))},i.setUpSubscription=function(){var e=Object(Y.a)(i);D.subscribe({variables:{gameID:i.gameID},query:Object(p.gql)(M||(M=Object(d.a)(["\n        subscription sendTurn ($gameID: ID) {\n          sendTurn (gameID: $gameID) {\n            applyingUnitID\n            unitAbilityName\n            receivingUnitID\n            receivingUnitIDs\n          }\n        }\n        "])))}).subscribe({next:function(n){var t=n.data.sendTurn;e.callApplyAbility(t.applyingUnitID,t.unitAbilityName,t.receivingUnitID,t.receivingUnitIDs),e.rerenderView()}})},i.setUpSubscription(),i.rerenderView=function(){console.log("rerenderView() not Set")},i}return t}(t(73).GameService),K=function(){function e(){var n=this;Object(b.a)(this,e),this.activeGames=void 0,this.subscription=void 0,this.setGameList=void 0,this.getGameList=function(e,t){n.setGameList=e,n.subscription||(n.getGameListQuery(),console.log("getGameList - gameListSubscription"),n.subscription=n.gameListSubscription(t))},this.getGameListQuery=function(){return D.query({query:Object(p.gql)(q||(q=Object(d.a)(["{\n        getGameList {\n          gameID\n          gameName\n          gameState\n          players {\n            userID\n            username\n          }\n        }\n      }"])))}).then((function(e){var t=e.data.getGameList;n.activeGames=t,n.setGameList(t)})).catch((function(e){console.log("getGameList - Error: "),console.log(e)}))},this.openGame=function(){return D.mutate({variables:{userID:A.getInstance().userID},mutation:Object(p.gql)(B||(B=Object(d.a)(["\n        mutation OpenGame(\n          $userID: ID\n        ){\n          openGame(\n            userID: $userID\n          )\n        }\n      "])))}).then((function(e){return e})).catch((function(e){console.log("openGame - Error:"),console.log(e)}))},this.joinGame=function(e){return D.mutate({variables:{userID:A.getInstance().userID,gameID:e.gameID},mutation:Object(p.gql)(H||(H=Object(d.a)(["\n        mutation JoinGame(\n          $userID: ID\n          $gameID: ID\n        ){\n          joinGame(\n            userID: $userID\n            gameID: $gameID\n          )\n        }\n      "])))}).then((function(e){return e})).catch((function(e){console.log("joinGame - Error:"),console.log(e)}))},this.gameListSubscription=function(e){var t=n;return D.subscribe({variables:{userID:A.getInstance().userID},query:Object(p.gql)(R||(R=Object(d.a)(["\n        subscription onNewGame {\n          updateGameList {\n            startNewGame\n            gameName\n            gameID\n            gameState\n            players {\n              userID\n              username\n            }\n          }\n        }"])))}).subscribe({next:function(n){console.log("gameListSubscription");var i=n.data.updateGameList;console.log(i),t.updateGameList(i),i.startNewGame&&2===i.players.length&&0!=i.players.filter((function(e){return e.userID===A.getInstance().userID})).length&&t.startGame(i,e)}})},this.updateGameList=function(e){var t=n.activeGames.filter((function(n){return n.gameID!=e.gameID})),i=[].concat(Object(F.a)(t),[{gameID:e.gameID,gameName:e.gameName,gameState:e.gameState,players:e.players}]);n.activeGames=i,n.setGameList(i)},this.startGame=function(e,n){var t=new J({gameID:e.gameID,players:e.players});$.getInstance().setDisplayedGameService(t),n(E)};this.activeGames=[{gameName:"Demogame",gameID:"DemoID - 1",gameState:"Open",players:[{userID:"Test",username:"Testuser"}]}]}return Object(f.a)(e,null,[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}();K.instance=void 0;t(109);var Q=t(74),X=function(e){var n=K.getInstance(),t=Object(r.useState)(n.activeGames),i=Object(u.a)(t,2),a=(i[0],i[1]);return Object(r.useEffect)((function(){n.getGameList(a,e.setRoute)}),[]),Object(U.jsxs)("div",{className:"gameListComponent",children:[Object(U.jsx)("h1",{children:"Gamelist"}),Object(U.jsx)("div",{className:"openGame",children:Object(U.jsx)("button",{onClick:function(e){return n.openGame()},children:"Open New Game"})}),Object(U.jsxs)("table",{className:"gameList",children:[Object(U.jsxs)("tr",{children:[Object(U.jsx)("th",{children:"Game Status"}),Object(U.jsx)("th",{children:"Game Name"}),Object(U.jsx)("th",{children:"No of Players"}),Object(U.jsx)("th",{children:"Players"})]}),n.activeGames.map((function(e){return Object(U.jsxs)("tr",{children:[Object(U.jsx)("td",{children:e.gameState===Q.GameStateEnum.OPEN&&Object(U.jsx)("button",{onClick:function(t){return n.joinGame(e)},children:"Join"})||e.gameState}),Object(U.jsx)("td",{children:e.gameName}),Object(U.jsx)("td",{children:e.players.length}),Object(U.jsx)("td",{children:e.players.map((function(n,t){return n.username+(e.players.length-1===t?"":", ")}))})]})}))]})]})};var Z=function(){var e=Object(r.useState)(k),n=Object(u.a)(e,2),t=n[0],i=n[1];return Object(U.jsxs)("div",{className:"App",children:[Object(U.jsx)(P,{routeState:e}),t===k&&Object(U.jsx)(X,{setRoute:i}),t===E&&Object(U.jsx)(W,{setRoute:i})]})},ee=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,111)).then((function(n){var t=n.getCLS,i=n.getFID,r=n.getFCP,a=n.getLCP,s=n.getTTFB;t(e),i(e),r(e),a(e),s(e)}))};c.a.render(Object(U.jsx)(a.a.StrictMode,{children:Object(U.jsx)(Z,{})}),document.getElementById("root")),ee()},45:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.AbilityTargetsEnum=void 0,function(e){e.ENEMY="Enemy",e.ALLY="Ally"}(n.AbilityTargetsEnum||(n.AbilityTargetsEnum={}))},73:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.GameService=void 0;var i=t(104),r=t(106),a=function(e){var n=this;this.initPlayers=function(e){var t;null===(t=null===e||void 0===e?void 0:e.players)||void 0===t||t.map((function(e,t){return n.players[t]=new r.Player(e,t+1)}))},this.checkCurrentPlayerByID=function(e){return e===n.game.currentPlayer.userID},this.dispatchAbility=function(e,n,t,i){},this.callApplyAbility=function(e,t,i,r){var a=n.getUnitbyUnitID(e),s=a.abilities.filter((function(e){return e.name===t}))[0],c=n.getUnitbyUnitID(i),u=r.map((function(e){return n.getUnitbyUnitID(e)}));return n.game.applyAbility(a,s,c,u)},this.createUnitID=function(e){return[e.player.id,e.id]},this.getUnitbyUnitID=function(e){return n.game.units.filter((function(n){return n.player.id==e[0]&&n.id==e[1]}))[0]},this.endGame=function(e){var t;return null===(t=n.gameServiceObserver)||void 0===t?void 0:t.endGame(e)},this.players=[],this.initPlayers(e),this.gameServiceObserver=e.gameServiceObserver,this.gameID=(null===e||void 0===e?void 0:e.gameID)||"0",this.game=new i.Game({gameService:this,players:this.players})};n.GameService=a},74:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.GameStateEnum=void 0,function(e){e.OPEN="Open",e.STARTED="Started",e.FINISHED="Finished"}(n.GameStateEnum||(n.GameStateEnum={}))},82:function(e,n,t){},83:function(e,n,t){},84:function(e,n,t){},85:function(e,n,t){}},[[110,1,2]]]);
//# sourceMappingURL=main.2cdeb98e.chunk.js.map