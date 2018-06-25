// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.networkAddon = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.networkAddon.prototype;
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	var typeProto = pluginProto.Type.prototype;
	typeProto.onCreate = function()
	{
		
	};
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		this.state = 0;
	};
	var instanceProto = pluginProto.Instance.prototype;
	instanceProto.onCreate = function()
	{
	};
	instanceProto.onDestroy = function (){};
	instanceProto.saveToJSON = function (){return {};};
	instanceProto.loadFromJSON = function (o){};
	instanceProto.draw = function(ctx){};
	instanceProto.drawGL = function (glw){};
	instanceProto.getDebuggerValues = function (propsections)
	{
		propsections.push({
			"title": "Network",
			"properties": [
				{
					"name": "State", 
					"value": this.state, 
					"readonly": true
				}
			]
		});
	};
	instanceProto.onDebugValueEdited = function (header, name, value){};
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	
	Cnds.prototype.isOnline = function ()
	{
		if (this.state == 1)
			return true
	};
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.check = function ()
	{
		var self = this;
		var xhr = new XMLHttpRequest();
		var file = "https://esri.github.io/offline-editor-js/tiny-image.png";
		var randomNum = Math.round(Math.random() * 10000);
	 
		xhr.open('HEAD', file + "?rand=" + randomNum, true);
		xhr.send();
		 
		xhr.addEventListener("readystatechange", processRequest, false);
	 
		function processRequest(e) {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 304) {
					self.state = 1;
				} else {
					self.state = 0;
				}
			} else {
				self.state = 0;
			}
		}
	};
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	Exps.prototype.state = function (ret)
	{
		ret.set_int(this.state);
	};
	
	pluginProto.exps = new Exps();

}());