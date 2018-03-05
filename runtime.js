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
		this.state = "";
	};
	var instanceProto = pluginProto.Instance.prototype;
	instanceProto.onCreate = function()
	{
		var self = this;
		Offline.on('confirmed-up', function(){
			self.state = Offline.state;
		}, self)
		Offline.on('confirmed-down', function(){
			self.state = Offline.state;
		}, self)
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
				{"name": "State", "value": this.state, "readonly": true}
			]
		});
	};
	instanceProto.onDebugValueEdited = function (header, name, value){};
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	
	Cnds.prototype.isOnline = function ()
	{
		if (this.state == "up")
			return true
	};
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	Exps.prototype.state = function (ret)
	{
		ret.set_string(this.state);
	};
	
	pluginProto.exps = new Exps();

}());