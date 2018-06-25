function GetPluginSettings()
{
	return {
		"name":			"Network",
		"id":			"networkAddon",
		"version":		"1.0",
		"description":	"This plugin allows to check user's network state",
		"author":		"Daniil Schetinskiy",
		"help url":		"vk.com/norman74",
		"category":		"General",
		"type":			"object",
		"rotatable":	true,
		"flags":		pf_singleglobal
	};
};
////////////////////////////////////////
// Conditions
AddCondition(0, cf_none, "Is online", "Network connection", "Is network online", "Check if network connected", "isOnline");

////////////////////////////////////////
// Actions
AddAction(0, af_none, "Check", "Network connection", "Check network connection", "Check the current status of the connection.", "check");

////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_number, "State", "Network connection", "state", "The current state of the connection '0' (offline) or '1' (online)");

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