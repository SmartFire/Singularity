(function(){"use strict";var e=typeof window!="undefined"?window:global;if(typeof e.require=="function")return;var t={},n={},r=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i===".."?n.pop():i!=="."&&i!==""&&n.push(i);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(n){var r=s(t),o=i(r,n);return e.require(o,t)}},u=function(e,t){var r={id:e,exports:{}};return n[e]=r,t(r.exports,o(e),r),r.exports},a=function(e,s){var o=i(e,".");s==null&&(s="/");if(r(n,o))return n[o].exports;if(r(t,o))return u(o,t[o]);var a=i(o,"./index");if(r(n,a))return n[a].exports;if(r(t,a))return u(a,t[a]);throw new Error('Cannot find module "'+e+'" from '+'"'+s+'"')},f=function(e,n){if(typeof e=="object")for(var i in e)r(e,i)&&(t[i]=e[i]);else t[e]=n},l=function(){var e=[];for(var n in t)r(t,n)&&e.push(n);return e};e.require=a,e.require.define=f,e.require.register=f,e.require.list=l,e.require.brunch=!0})(),require.register("application",function(e,t,n){var r,i,s,o,u,a,f=function(e,t){return function(){return e.apply(t,arguments)}};s=t("lib/router"),o=t("models/State"),i=t("collections/Requests"),u=t("collections/TasksActive"),a=t("collections/TasksScheduled"),r=function(){function e(){this.fetchResources=f(this.fetchResources,this),this.initialize=f(this.initialize,this)}return e.prototype.initialize=function(){var e=this;return this.views={},this.collections={},this.fetchResources(function(){return $(".page-loader.fixed").hide(),e.router=new s,Backbone.history.start({pushState:!1,root:"/singularity/"}),typeof Object.freeze=="function"?Object.freeze(e):void 0})},e.prototype.fetchResources=function(e){var t,n,r=this;return this.resolve_countdown=0,t=function(){r.resolve_countdown-=1;if(r.resolve_countdown===0)return e()},this.resolve_countdown+=1,this.state=new o,this.state.fetch({error:function(){return vex.dialog.alert("An error occurred while trying to load the Singularity state.")},success:function(){return t()}}),n=[{collection_key:"requests",collection:i,error_phrase:"requests"},{collection_key:"tasksActive",collection:u,error_phrase:"active tasks"},{collection_key:"tasksScheduled",collection:a,error_phrase:"scheduled tasks"}],_.each(n,function(e){return r.resolve_countdown+=1,r.collections[e.collection_key]=new e.collection,r.collections[e.collection_key].fetch({error:function(){return vex.dialog.alert("An error occurred while trying to load Singularity "+e.error_phrase+".")},success:function(){return t()}})})},e}(),n.exports=new r}),require.register("collections/Requests",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./collection"),i=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.url=""+env.SINGULARITY_BASE+"/"+constants.api_base+"/requests",t.prototype.parse=function(e){var t=this;return _.each(e,function(n,r){return n.id=n.id,n.deployUser=t.parseDeployUser(n),n.JSONString=utils.stringJSON(n),n.timestampHuman=moment(n.timestamp).from(),e[r]=n}),e},t.prototype.parseDeployUser=function(e){var t,n,r;return((t=(n=e.executorData)!=null?(r=n.env)!=null?r.DEPLOY_USER:void 0:void 0)!=null?t:"").split("@")[0]},t.prototype.comparator="name",t}(r),n.exports=i}),require.register("collections/Tasks",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./collection"),i=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.comparator="name",t}(r),n.exports=i}),require.register("collections/TasksActive",function(e,t,n){var r,i,s,o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./collection"),i=t("./Tasks"),s=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return u(t,e),t.prototype.url=""+env.SINGULARITY_BASE+"/"+constants.api_base+"/tasks/active",t.prototype.parse=function(e){var t=this;return _.each(e,function(t,n){var r;return t.id=t.task.taskId.value,t.name=t.task.name,t.resources=t.taskRequest.request.resources,t.host=(r=t.offer.hostname)!=null?r.split(".")[0]:void 0,t.startedAt=t.taskId.startedAt,t.startedAtHuman=moment(t.taskId.startedAt).from(),t.JSONString=utils.stringJSON(t),e[n]=t}),e},t.prototype.comparator="name",t}(i),n.exports=s}),require.register("collections/TasksScheduled",function(e,t,n){var r,i,s,o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./collection"),i=t("./Tasks"),s=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return u(t,e),t.prototype.url=""+env.SINGULARITY_BASE+"/"+constants.api_base+"/tasks/scheduled",t.prototype.parse=function(e){var t=this;return _.each(e,function(n,r){return n.id=t.parsePendingId(n.pendingTaskId),n.name=n.id,n.nextRunAt=n.pendingTaskId.nextRunAt,n.nextRunAtHuman=moment(n.nextRunAt).fromNow(),n.schedule=n.request.schedule,n.JSONString=utils.stringJSON(n),e[r]=n}),e},t.prototype.parsePendingId=function(e){return""+e.requestId+"-"+e.nextRunAt+"-"+e.instanceNo},t.prototype.comparator="nextRunAt",t}(i),n.exports=s}),require.register("collections/collection",function(e,t,n){var r,i={}.hasOwnProperty,s=function(e,t){function r(){this.constructor=e}for(var n in t)i.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return s(t,e),t}(Backbone.Collection)}),require.register("constants",function(e,t,n){var r;r={app_name:"singularity",config_server_base:"/singularity",api_base:"singularity/v1"},n.exports=r}),require.register("env",function(e,t,n){n.exports={env:"qa",SINGULARITY_BASE:""}}),require.register("initialize",function(e,t,n){window.env=t("env"),window.utils=t("utils"),window.constants=t("constants"),window.app=t("application"),_.mixin(_.string.exports()),vex.defaultOptions.className="vex-theme-default",$(function(){return app.initialize()})}),require.register("lib/login",function(e,t,n){}),require.register("lib/router",function(e,t,n){var r,i,s,o,u,a,f,l,c,h={}.hasOwnProperty,p=function(e,t){function r(){this.constructor=e}for(var n in t)h.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("views/dashboard"),u=t("views/requests"),o=t("views/request"),l=t("views/tasks"),f=t("views/task"),s=t("views/page_not_found"),i=t("views/navigation"),c=function(){return app.views.navigationView==null&&(app.views.navigationView=new i),app.views.navigationView.render()},a=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return p(n,e),n.prototype.routes={"(/)":"dashboard","requests(/)":"requests","request/:requestId":"request","tasks(/)":"tasks","task/:taskId":"task","*anything":"templateFromURLFragment"},n.prototype.dashboard=function(){return c(),app.views.dashboard==null&&(app.views.dashboard=new r),app.views.current=app.views.dashboard,app.views.dashboard.render()},n.prototype.requests=function(){return c(),app.views.requests==null&&(app.views.requests=new u),app.views.current=app.views.requests,app.views.requests.render()},n.prototype.request=function(e){return c(),app.views.requestViews||(app.views.requestViews={}),app.views.requestViews[e]||(app.views.requestViews[e]=new o({requestId:e})),app.views.current=app.views.requestViews[e],app.views.requestViews[e].render()},n.prototype.tasks=function(){return c(),app.views.tasks==null&&(app.views.tasks=new l),app.views.current=app.views.tasks,app.views.tasks.render()},n.prototype.task=function(e){return c(),app.views.taskViews||(app.views.taskViews={}),app.views.taskViews[e]||(app.views.taskViews[e]=new f({taskId:e})),app.views.current=app.views.taskViews[e],app.views.taskViews[e].render()},n.prototype.templateFromURLFragment=function(){var e;c(),app.views.current=void 0,e=void 0;try{e=t("../views/templates/"+Backbone.history.fragment)}catch(n){}if(e){$("body > .app").html(e);return}return this.show404()},n.prototype.show404=function(){return c(),app.views.pageNotFound==null&&(app.views.pageNotFound=new s),app.views.current=app.views.pageNotFound,app.views.pageNotFound.render()},n}(Backbone.Router),n.exports=a}),require.register("lib/view_helper",function(e,t,n){Handlebars.registerHelper("ifLT",function(e,t,n){return e<t?n.fn(this):n.inverse(this)}),Handlebars.registerHelper("ifGT",function(e,t,n){return e>t?n.fn(this):n.inverse(this)}),Handlebars.registerHelper("pluralize",function(e,t,n){return e===1?t:n}),Handlebars.registerHelper("hardBreak",function(e,t){return e.replace(/(:|-)/g,"$1<wbr/>")}),Handlebars.registerHelper("eachWithFn",function(e,t){var n=this;return _(e).map(function(e,n,r){return e._counter=n,e._1counter=n+1,e._first=n===0?!0:!1,e._last=n===r.length-1?!0:!1,e._even=(n+1)%2===0?!0:!1,e._thirded=(n+1)%3===0?!0:!1,e._sixthed=(n+1)%6===0?!0:!1,_.isFunction(t.hash.fn)&&t.hash.fn.apply(t,[e,n,r]),t.fn(e)}).join("")})}),require.register("models/RequestTasks",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./model"),i=function(e){function t(){return this.initialize=s(this.initialize,this),this.url=s(this.url,this),t.__super__.constructor.apply(this,arguments)}return u(t,e),t.prototype.url=function(){return""+env.SINGULARITY_BASE+"/"+constants.api_base+"/history/request/"+this.requestId+"/tasks"},t.prototype.initialize=function(){return this.requestId=this.attributes.requestId,delete this.attributes.requestId},t.prototype.parse=function(e){return _.each(e,function(e){return e.id=""+e.requestId+"-"+e.startedAt+"-"+e.instanceNo+"-"+e.rackId,e.name=e.id}),e},t}(r),n.exports=i}),require.register("models/State",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./model"),i=function(e){function t(){return this.parse=s(this.parse,this),t.__super__.constructor.apply(this,arguments)}return u(t,e),t.prototype.url=function(){return""+env.SINGULARITY_BASE+"/"+constants.api_base+"/state"},t.prototype.parse=function(e){return e.uptimeHuman=moment.duration(e.uptime).humanize(),e},t}(r),n.exports=i}),require.register("models/Task",function(e,t,n){var r,i,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};r=t("./model"),i=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.url=function(){return""+env.SINGULARITY_BASE+"/"+constants.api_base+"/task/"+this.get("name")},t}(r),n.exports=i}),require.register("models/model",function(e,t,n){var r,i={}.hasOwnProperty,s=function(e,t){function r(){this.constructor=e}for(var n in t)i.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};n.exports=r=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return s(t,e),t}(Backbone.Model)}),require.register("utils",function(e,t,n){var r;r=function(){function e(){}return e.prototype.getHTMLTitleFromHistoryFragment=function(e){return _.capitalize(e.split("/").join(" "))},e.prototype.stringJSON=function(e){return JSON.stringify(e,null,"    ")},e.prototype.viewJSON=function(e){return vex.dialog.alert({contentCSS:{width:800},message:"<pre>"+utils.stringJSON(e)+"</pre>"})},e.prototype.getAcrossCollections=function(e,t){var n;return n=void 0,_.each(e,function(e){var r;return n=(r=e.get(t))!=null?r:n}),n},e}(),n.exports=new r}),require.register("views/dashboard",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./view"),r=function(e){function n(){return this.render=s(this.render,this),n.__super__.constructor.apply(this,arguments)}return u(n,e),n.prototype.template=t("./templates/dashboard"),n.prototype.render=function(){return this.$el.html(this.template({state:app.state.toJSON()}))},n}(i),n.exports=r}),require.register("views/navigation",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./view"),r=function(e){function t(){return this.collapse=s(this.collapse,this),this.renderTheme=s(this.renderTheme,this),this.renderNavLinks=s(this.renderNavLinks,this),this.renderTitle=s(this.renderTitle,this),this.render=s(this.render,this),this.initialize=s(this.initialize,this),t.__super__.constructor.apply(this,arguments)}return u(t,e),t.prototype.el="#top-level-nav",t.prototype.initialize=function(){return $("#top-level-nav").dblclick(function(){return window.scrollTo(0,0)}),this.theme="light"},t.prototype.render=function(){return this.renderTitle(),this.renderNavLinks(),this.collapse()},t.prototype.renderTitle=function(){var e;return e=utils.getHTMLTitleFromHistoryFragment(Backbone.history.fragment),e!==""&&(e=" — "+e),$("head title").text("Singularity"+e)},t.prototype.renderNavLinks=function(){var e,t;return t=this.$el,this.renderTheme(this.theme),e=t.find('ul.nav a:not(".dont-route")'),e.each(function(){var e;return e=$(this).data("href"),$(this).attr("href","/"+constants.app_name+"/"+e).data("route",e)}),t.find("li").removeClass("active"),e.each(function(){if($(this).attr("href")==="/"+constants.app_name+"/"+Backbone.history.fragment)return $(this).parents("li").addClass("active")})},t.prototype.renderTheme=function(e){var t;return t=this.theme==="light"?"dark":"light",$("html").addClass(""+e+"strap").removeClass(""+t+"strap"),$("#theme-changer").html(_.capitalize(t)).unbind("click").click(function(){var e;return e=this.theme==="dark"?"light":"dark",this.theme=e})},t.prototype.collapse=function(){var e;e=$("#top-level-nav .nav-collapse");if(e.data().collapse)return e.collapse("hide")},t}(i),n.exports=r}),require.register("views/page_not_found",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./view"),r=function(e){function n(){return this.render=s(this.render,this),n.__super__.constructor.apply(this,arguments)}return u(n,e),n.prototype.template=t("./templates/404"),n.prototype.render=function(){return $(this.el).html(this.template)},n}(i),n.exports=r}),require.register("views/request",function(e,t,n){var r,i,s,o=function(e,t){return function(){return e.apply(t,arguments)}},u={}.hasOwnProperty,a=function(e,t){function r(){this.constructor=e}for(var n in t)u.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};s=t("./view"),r=t("../models/RequestTasks"),i=function(e){function n(){return this.render=o(this.render,this),this.initialize=o(this.initialize,this),n.__super__.constructor.apply(this,arguments)}return a(n,e),n.prototype.template=t("./templates/request"),n.prototype.initialize=function(){var e=this;return this.request=app.collections.requests.get(this.options.requestId),this.requestTasks=new r({requestId:this.options.requestId}),this.requestTasks.fetch().done(function(){return e.render()})},n.prototype.render=function(){var e;return this.request?(e={request:this.request.toJSON(),requestTasks:this.requestTasks.toJSON()},this.$el.html(this.template(e)),this.setupEvents()):!1},n.prototype.setupEvents=function(){return this.$el.find(".view-json").unbind("click").click(function(e){var t;return utils.viewJSON((t=utils.getAcrossCollections([app.collections.tasksActive,app.collections.tasksScheduled],$(e.target).data("task-id")))!=null?t.toJSON():void 0)})},n}(s),n.exports=i}),require.register("views/requests",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./view"),r=function(e){function n(){return this.setUpSearchEvents=s(this.setUpSearchEvents,this),this.render=s(this.render,this),n.__super__.constructor.apply(this,arguments)}return u(n,e),n.prototype.template=t("./templates/requests"),n.prototype.render=function(){var e;return e={requests:app.collections.requests.toJSON()},this.$el.html(this.template(e)),this.setupEvents(),this.setUpSearchEvents()},n.prototype.setupEvents=function(){return this.$el.find(".view-json").unbind("click").click(function(e){return utils.viewJSON(app.collections.requests.get($(e.target).data("request-id")).toJSON())})},n.prototype.setUpSearchEvents=function(){var e,t,n,r=this;return t=this.$el.find('input[type="search"]').focus(),e=this.$el.find("tbody > tr"),n=_.trim(t.val()),t.on("change keypress paste focus textInput input click keydown",function(){var r;r=_.trim(t.val()),r===""&&e.removeClass("filtered");if(r!==n)return e.each(function(){var e;return e=$(this),_.string.contains(e.data("request-id").toLowerCase(),r.toLowerCase())?e.removeClass("filtered"):e.addClass("filtered")})})},n}(i),n.exports=r}),require.register("views/task",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./view"),r=function(e){function n(){return this.render=s(this.render,this),this.initialize=s(this.initialize,this),n.__super__.constructor.apply(this,arguments)}return u(n,e),n.prototype.template=t("./templates/task"),n.prototype.initialize=function(){return this.task=utils.getAcrossCollections([app.collections.tasksActive,app.collections.tasksScheduled],this.options.taskId)},n.prototype.render=function(){var e;if(!this.task){vex.dialog.alert("Could not open a task by that ID. Ask <b>@wsorenson</b>...");return}return e={task:this.task.toJSON()},this.$el.html(this.template(e))},n}(i),n.exports=r}),require.register("views/tasks",function(e,t,n){var r,i,s=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty,u=function(e,t){function r(){this.constructor=e}for(var n in t)o.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};i=t("./view"),r=function(e){function n(){return this.render=s(this.render,this),n.__super__.constructor.apply(this,arguments)}return u(n,e),n.prototype.template=t("./templates/tasks"),n.prototype.render=function(){var e;return e={tasksActive:app.collections.tasksActive.toJSON(),tasksScheduled:app.collections.tasksScheduled.toJSON()},this.$el.html(this.template(e)),this.setupEvents()},n.prototype.setupEvents=function(){return this.$el.find(".view-json").unbind("click").click(function(e){var t;return utils.viewJSON((t=utils.getAcrossCollections([app.collections.tasksActive,app.collections.tasksScheduled],$(e.target).data("task-id")))!=null?t.toJSON():void 0)})},n}(i),n.exports=r}),require.register("views/templates/404",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){n=n||e.helpers;var s,o=this;return"<h1>Page not found</h1>"})}),require.register("views/templates/dashboard",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){n=n||e.helpers;var s="",o,u,a=this,f="function",l=n.helperMissing,c=void 0,h=this.escapeExpression;return s+='<header class="jumbotron subhead" id="overview">\n    <h1>Singularity</h1>\n</header>\n\n<section>\n    <div class="page-header">\n        <h1>Status Overview</h1>\n    </div>\n    <div class="row-fluid">\n        <div class="span4">\n            <div class="well">\n                <h3>Up for <span data-state-property="uptimeHuman">',u=n.state,o=u||t.state,o=o===null||o===undefined||o===!1?o:o.uptimeHuman,typeof o===f?o=o.call(t,{hash:{}}):o===c&&(o=l.call(t,"state.uptimeHuman",{hash:{}})),s+=h(o)+'</span> &nbsp;&nbsp;&nbsp;</h3>\n            </div>\n        </div>\n        <div class="span4">\n            <div class="well">\n                <h3><span data-state-property="driverStatus">',u=n.state,o=u||t.state,o=o===null||o===undefined||o===!1?o:o.driverStatus,typeof o===f?o=o.call(t,{hash:{}}):o===c&&(o=l.call(t,"state.driverStatus",{hash:{}})),s+=h(o)+'</span></h3>\n            </div>\n        </div>\n        <div class="span4"></div>\n    </div>\n</section>\n\n<section>\n    <div class="page-header">\n        <h1>Requests</h1>\n    </div>\n    <div class="row-fluid">\n        <div class="span4">\n            <div class="well">\n                <div class="big-number">\n                    <div class="number" data-state-property="requests">',u=n.state,o=u||t.state,o=o===null||o===undefined||o===!1?o:o.requests,typeof o===f?o=o.call(t,{hash:{}}):o===c&&(o=l.call(t,"state.requests",{hash:{}})),s+=h(o)+'</div>\n                    <div class="number-label">Active</div>\n                </div>\n            </div>\n        </div>\n        <div class="span4">\n            <div class="well">\n                <div class="big-number">\n                    <div class="number" data-state-property="pendingRequests">',u=n.state,o=u||t.state,o=o===null||o===undefined||o===!1?o:o.pendingRequests,typeof o===f?o=o.call(t,{hash:{}}):o===c&&(o=l.call(t,"state.pendingRequests",{hash:{}})),s+=h(o)+'</div>\n                    <div class="number-label">Pending</div>\n                </div>\n            </div>\n        </div>\n        <div class="span4">\n            <div class="well">\n                <div class="big-number">\n                    <div class="number" data-state-property="cleaningRequests">',u=n.state,o=u||t.state,o=o===null||o===undefined||o===!1?o:o.cleaningRequests,typeof o===f?o=o.call(t,{hash:{}}):o===c&&(o=l.call(t,"state.cleaningRequests",{hash:{}})),s+=h(o)+'</div>\n                    <div class="number-label">Cleaning</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n\n<section>\n    <div class="page-header">\n        <h1>Tasks</h1>\n    </div>\n    <div class="row-fluid">\n        <div class="span4">\n            <div class="well">\n                <div class="big-number">\n                    <div class="number" data-state-property="activeTasks">',u=n.state,o=u||t.state,o=o===null||o===undefined||o===!1?o:o.activeTasks,typeof o===f?o=o.call(t,{hash:{}}):o===c&&(o=l.call(t,"state.activeTasks",{hash:{}})),s+=h(o)+'</div>\n                    <div class="number-label">Active</div>\n                </div>\n            </div>\n        </div>\n        <div class="span4">\n            <div class="well">\n                <div class="big-number">\n                    <div class="number" data-state-property="scheduledTasks">',u=n.state,o=u||t.state,o=o===null||o===undefined||o===!1?o:o.scheduledTasks,typeof o===f?o=o.call(t,{hash:{}}):o===c&&(o=l.call(t,"state.scheduledTasks",{hash:{}})),s+=h(o)+'</div>\n                    <div class="number-label">Scheduled</div>\n                </div>\n            </div>\n        </div>\n        <div class="span4"></div>\n    </div>\n</section>',s})}),require.register("views/templates/request",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){function m(e,t){var n="";return n}function g(e,t){var n="";return n}function y(e,t){var r="",i,s;r+='\n        <div class="row-fluid">\n            <div class="span12">\n                <table class="table">\n                    <thead>\n                        <tr>\n                            <th>Name</th>\n                            <th>JSON</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ',a=n.requestTasks,i=a||e.requestTasks,a=n.eachWithFn,s=a||e.eachWithFn,f=l.program(6,b,t),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof s===c?i=s.call(e,i,f):i=v.call(e,s,i,f);if(i||i===0)r+=i;return r+="\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    ",r}function b(e,t){var r="",i,s;r+='\n                            <tr data-task-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">\n                                <td><span class="simptip-position-top simptip-movable" data-tooltip="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'"><a href="/singularity/task/',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" data-route="task/',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">',a=n.name,i=a||e.name,a=n.hardBreak,s=a||e.hardBreak,f=l.program(7,w,t),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof s===c?i=s.call(e,i,f):i=v.call(e,s,i,f);if(i||i===0)r+=i;return r+='</a></span></td>\n                                <td><span><a data-task-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" class="dont-route view-json">JSON</a></span></td>\n                            </tr>\n                        ',r}function w(e,t){var n="";return n}function E(e,t){return'\n        <div class="page-loader centered"></div>\n    '}n=n||e.helpers;var s="",o,u,a,f,l=this,c="function",h=n.helperMissing,p=void 0,d=this.escapeExpression,v=n.blockHelperMissing;s+='<header class="jumbotron subhead" id="overview">\n    <h1>',a=n.request,o=a||t.request,o=o===null||o===undefined||o===!1?o:o.name,a=n.hardBreak,u=a||t.hardBreak,f=l.program(1,m,i),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof u===c?o=u.call(t,o,f):o=v.call(t,u,o,f);if(o||o===0)s+=o;s+="</h1>\n    <h2>",a=n.request,o=a||t.request,o=o===null||o===undefined||o===!1?o:o.id,a=n.hardBreak,u=a||t.hardBreak,f=l.program(3,g,i),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof u===c?o=u.call(t,o,f):o=v.call(t,u,o,f);if(o||o===0)s+=o;s+='</h2>\n</header>\n\n<section>\n    <div class="page-header">\n        <h1>Tasks</h1>\n    </div>\n    ',a=n.requestTasks,o=a||t.requestTasks,u=n["if"],f=l.program(5,y,i),f.hash={},f.fn=f,f.inverse=l.program(9,E,i),o=u.call(t,o,f);if(o||o===0)s+=o;return s+='\n    <div class="page-header">\n        <h1>JSON</h1>\n    </div>\n    <div class="row-fluid">\n        <div class="span12">\n            <pre>',a=n.request,o=a||t.request,o=o===null||o===undefined||o===!1?o:o.JSONString,typeof o===c?o=o.call(t,{hash:{}}):o===p&&(o=h.call(t,"request.JSONString",{hash:{}})),s+=d(o)+"</pre>\n        </div>\n    </div>\n</section>",s})}),require.register("views/templates/requests",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){function m(e,t){var r="",i,s;r+='\n                        <tr data-request-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">\n                            <td><span class="simptip-position-top simptip-movable" data-tooltip="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'"><a href="/singularity/request/',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" data-route="request/',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">',a=n.name,i=a||e.name,a=n.hardBreak,s=a||e.hardBreak,f=l.program(2,g,t),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof s===c?i=s.call(e,i,f):i=v.call(e,s,i,f);if(i||i===0)r+=i;return r+='</a></span></td>\n                            <td><span class="simptip-position-top simptip-movable" data-tooltip="',a=n.timestamp,i=a||e.timestamp,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"timestamp",{hash:{}})),r+=d(i)+'">',a=n.timestampHuman,i=a||e.timestampHuman,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"timestampHuman",{hash:{}})),r+=d(i)+"</span></td>\n                            <td><span>",a=n.deployUser,i=a||e.deployUser,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"deployUser",{hash:{}})),r+=d(i)+"</span></td>\n                            <td><span>",a=n.instances,i=a||e.instances,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"instances",{hash:{}})),r+=d(i)+"</span></td>\n                            <td><span>",a=n.daemon,i=a||e.daemon,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"daemon",{hash:{}})),r+=d(i)+'</span></td>\n                            <td><span><a data-request-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" class="dont-route view-json">JSON</a></span><td>\n                        </tr>\n                    ',r}function g(e,t){var n="";return n}n=n||e.helpers;var s="",o,u,a,f,l=this,c="function",h=n.helperMissing,p=void 0,d=this.escapeExpression,v=n.blockHelperMissing;s+='<header class="jumbotron subhead" id="overview">\n    <h1>Requests</h1>\n</header>\n\n<section>\n    <div class="page-header">\n        <h1>Status Overview</h1>\n    </div>\n    <div class="row-fluid">\n        <input type="search" placeholder="Search requests and tasks..." required />\n    </div>\n    <div class="row-fluid">\n        <div class="span12">\n            <table class="table">\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Requested</th>\n                        <th>Deploy User</th>\n                        <th>Instances</th>\n                        <th>Daemon</th>\n                        <th>JSON</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ',a=n.requests,o=a||t.requests,a=n.eachWithFn,u=a||t.eachWithFn,f=l.program(1,m,i),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof u===c?o=u.call(t,o,f):o=v.call(t,u,o,f);if(o||o===0)s+=o;return s+="\n                </tbody>\n            </table>\n        </div>\n    </div>\n</section>",s})}),require.register("views/templates/task",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){function m(e,t){var n="";return n}function g(e,t){var n="";return n}n=n||e.helpers;var s="",o,u,a,f,l=this,c="function",h=n.blockHelperMissing,p=n.helperMissing,d=void 0,v=this.escapeExpression;s+='<header class="jumbotron subhead" id="overview">\n    <h1>',a=n.task,o=a||t.task,o=o===null||o===undefined||o===!1?o:o.name,a=n.hardBreak,u=a||t.hardBreak,f=l.program(1,m,i),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof u===c?o=u.call(t,o,f):o=h.call(t,u,o,f);if(o||o===0)s+=o;s+="</h1>\n    <h2>",a=n.task,o=a||t.task,o=o===null||o===undefined||o===!1?o:o.id,a=n.hardBreak,u=a||t.hardBreak,f=l.program(3,g,i),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof u===c?o=u.call(t,o,f):o=h.call(t,u,o,f);if(o||o===0)s+=o;return s+='</h2>\n</header>\n\n<section>\n    <div class="page-header">\n        <h1>JSON</h1>\n    </div>\n    <div class="row-fluid">\n        <div class="span12">\n            <pre>',a=n.task,o=a||t.task,o=o===null||o===undefined||o===!1?o:o.JSONString,typeof o===c?o=o.call(t,{hash:{}}):o===d&&(o=p.call(t,"task.JSONString",{hash:{}})),s+=v(o)+"</pre>\n        </div>\n    </div>\n</section>",s})}),require.register("views/templates/tasks",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){function m(e,t){var r="",i,s;r+='\n                        <tr data-task-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">\n                            <td><span><a class="simptip-position-top simptip-movable" data-tooltip="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" href="singularity/task/',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" data-route="task/',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">',a=n.name,i=a||e.name,a=n.hardBreak,s=a||e.hardBreak,f=l.program(2,g,t),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof s===c?i=s.call(e,i,f):i=v.call(e,s,i,f);if(i||i===0)r+=i;return r+="</span></a></td>\n                            <td><span>",a=n.host,i=a||e.host,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"host",{hash:{}})),r+=d(i)+"</span></td>\n                            <td><span>",a=n.resources,i=a||e.resources,i=i===null||i===undefined||i===!1?i:i.cpus,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"resources.cpus",{hash:{}})),r+=d(i)+"</span></td>\n                            <td><span>",a=n.resources,i=a||e.resources,i=i===null||i===undefined||i===!1?i:i.memoryMb,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"resources.memoryMb",{hash:{}})),r+=d(i)+'Mb</span></td>\n                            <td><span class="ellipsis simptip-position-top simptip-movable" data-tooltip="',a=n.startedAt,i=a||e.startedAt,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"startedAt",{hash:{}})),r+=d(i)+'">',a=n.startedAtHuman,i=a||e.startedAtHuman,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"startedAtHuman",{hash:{}})),r+=d(i)+'</span></td>\n                            <td><span><a data-task-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" class="dont-route view-json">JSON</a></span><td>\n                        </tr>\n                    ',r}function g(e,t){var n="";return n}function y(e,t){var r="",i,s;r+='\n                        <tr data-task-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">\n                            <td><span class="simptip-position-top simptip-movable" data-tooltip="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'">',a=n.name,i=a||e.name,a=n.hardBreak,s=a||e.hardBreak,f=l.program(5,b,t),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof s===c?i=s.call(e,i,f):i=v.call(e,s,i,f);if(i||i===0)r+=i;return r+='</span></td>\n                            <td><span class="ellipsis simptip-position-top simptip-movable" data-tooltip="',a=n.nextRunAt,i=a||e.nextRunAt,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"nextRunAt",{hash:{}})),r+=d(i)+'">',a=n.nextRunAtHuman,i=a||e.nextRunAtHuman,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"nextRunAtHuman",{hash:{}})),r+=d(i)+'</span></td>\n                            <td><span><a data-task-id="',a=n.id,i=a||e.id,typeof i===c?i=i.call(e,{hash:{}}):i===p&&(i=h.call(e,"id",{hash:{}})),r+=d(i)+'" class="dont-route view-json">JSON</a></span><td>\n                        </tr>\n                    ',r}function b(e,t){var n="";return n}n=n||e.helpers;var s="",o,u,a,f,l=this,c="function",h=n.helperMissing,p=void 0,d=this.escapeExpression,v=n.blockHelperMissing;s+='<header class="jumbotron subhead" id="overview">\n    <h1>Tasks</h1>\n</header>\n\n<section>\n    <!-- <input type="search" placeholder="Search tasks..." required /> -->\n    <div class="row-fluid">\n        <div class="span12">\n            <h2>Active Tasks</h2>\n            <table class="table">\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Host</th>\n                        <th>CPUs</th>\n                        <th>Memory</th>\n                        <th>Started</th>\n                        <th>JSON</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ',a=n.tasksActive,o=a||t.tasksActive,a=n.eachWithFn,u=a||t.eachWithFn,f=l.program(1,m,i),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof u===c?o=u.call(t,o,f):o=v.call(t,u,o,f);if(o||o===0)s+=o;s+='\n                </tbody>\n            </table>\n        </div>\n    </div>\n    <div class="row-fluid">\n        <div class="span12">\n            <h2>Scheduled Tasks</h2>\n            <table class="table">\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Scheduled</th>\n                        <th>JSON</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ',a=n.tasksScheduled,o=a||t.tasksScheduled,a=n.eachWithFn,u=a||t.eachWithFn,f=l.program(4,y,i),f.hash={},f.fn=f,f.inverse=l.noop,a&&typeof u===c?o=u.call(t,o,f):o=v.call(t,u,o,f);if(o||o===0)s+=o;return s+="\n                </tbody>\n            </table>\n        </div>\n    </div>\n</section>",s})}),require.register("views/view",function(e,t,n){var r,i=function(e,t){return function(){return e.apply(t,arguments)}},s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};t("lib/view_helper"),r=function(e){function t(){return this.routeLink=i(this.routeLink,this),t.__super__.constructor.apply(this,arguments)}return o(t,e),t.prototype.el="#page",t.prototype.events={"click a":"routeLink"},t.prototype.routeLink=function(e){var t,n;t=$(e.target),n=t.attr("href");if(t.attr("target")==="_blank"||typeof n=="undefined"||n.substr(0,4)==="http")return!0;e.preventDefault(),n.indexOf(".")===0&&(n=n.substring(1),n.indexOf("/")===0&&(n=n.substring(1)));if(t.data("route")||t.data("route")==="")n=t.data("route");return app.router.navigate(n,{trigger:!0})},t}(Backbone.View),n.exports=r})
