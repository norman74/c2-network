function GetPluginSettings()
{
	return {
		"name":			"Network",
		"id":			"networkAddon",
		"version":		"0.1",
		"description":	"This plugin allows to check user's network",
		"author":		"Daniil Schetinskiy",
		"help url":		"vk.com/norman74",
		"category":		"General",
		"type":			"object",
		"rotatable":	true,
		"dependency":	"offline.min.js",
		"flags":		pf_singleglobal
	};
};

////////////////////////////////////////
// Conditions
AddCondition(0, cf_none, "Is online", "Network connection", "Is network online", "Check if network connected", "isOnline");

////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_number, "State", "Network connection", "state", "The current state of the connection 'up' or 'down'");

////////////////////////////////////////
ACESDone();
var property_list = [];
	
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	this.instance = instance;
	this.type = type;
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

IDEInstance.prototype.OnInserted = function(){}
IDEInstance.prototype.OnDoubleClicked = function(){}
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
IDEInstance.prototype.OnRendererInit = function(renderer){}
IDEInstance.prototype.Draw = function(renderer){}
IDEInstance.prototype.OnRendererReleased = function(renderer){}